/* Recibe la entrega de un equipo del DefAcc Hackathon.

   Multipart: los campos de texto, la lista de integrantes en JSON y la ficha
   técnica en PDF. Como en la plantilla V4 de Apart, los participantes no
   editan su entrega: un envío por equipo, y si llega otro con el mismo
   nombre se guarda aparte marcado como posible duplicado para que la
   organización lo limpie después del cierre. Después de guardar, dispara en
   segundo plano la revisión automática, que solo levanta banderas para el
   jurado. */

import { NextResponse, after } from "next/server";
import { CORREO_HACKATHON } from "@/app/defacchackathon/datos";
import {
  CIERRE_ENTREGAS_ISO,
  PDF_MAX_BYTES,
  TRACKS_VALIDOS,
  entregasAbiertas,
  esTokenPrueba,
  iguales,
  ipDeLaPeticion,
  leerEntrega,
  pasaElLimite,
  slugDe,
  subir,
  subirJson,
  type Entrega,
  type Integrante,
} from "@/lib/defacc-entregas";
import { NOMBRES_TRACKS, revisarConGemini } from "@/lib/defacc-revision";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const REMITENTE = "AI Safety Colombia <equipo@aisafetycolombia.org>";
const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mal(error: string, mensaje: string, status = 400, campo?: string) {
  return NextResponse.json({ ok: false, error, mensaje, ...(campo ? { campo } : {}) }, { status });
}

function texto(v: FormDataEntryValue | null, max = 4000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function palabras(s: string): number {
  return s.split(/\s+/).filter(Boolean).length;
}

function esUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

async function avisarAlEquipo(e: Entrega): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const correos = e.integrantes.map((i) => i.correo).filter(Boolean);
  if (correos.length === 0) return;
  const lineas = [
    `Hola, equipo ${e.equipo}:`,
    "",
    "Recibimos su entrega para el Defensive Acceleration Hackathon.",
    "",
    `Proyecto: ${e.titulo}`,
    `Track: ${NOMBRES_TRACKS[e.track] ?? e.track}`,
    `Enlace: ${e.enlace}`,
    `Ficha técnica: ${e.pdf ? "recibida" : "no adjunta"}`,
    "",
    `Es un solo envío por equipo. Si necesitan corregir algo, escríbannos a ${CORREO_HACKATHON} antes de las 5:00 p.m.`,
    "",
    "AI Safety Colombia",
  ];
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REMITENTE,
        to: correos,
        reply_to: CORREO_HACKATHON,
        subject: `Entrega recibida: ${e.titulo}`,
        text: lineas.join("\n"),
      }),
    });
  } catch {
    /* el correo es cortesía; la entrega ya quedó guardada */
  }
}

export async function POST(req: Request) {
  if (!pasaElLimite(ipDeLaPeticion(req), 12)) {
    return mal("limite", "Demasiados intentos. Esperen unos minutos.", 429);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return mal("formato", "No pudimos leer el formulario.");
  }

  if (texto(form.get("website"))) return NextResponse.json({ ok: true });

  const bypassEsperado = process.env.APPLY_BYPASS_TOKEN;
  const bypassDado = texto(form.get("bypass")) || req.headers.get("x-bypass") || "";
  const esPrueba = esTokenPrueba(bypassDado);
  const conBypass = esPrueba || (!!bypassEsperado && !!bypassDado && iguales(bypassDado, bypassEsperado));

  if (!conBypass && !entregasAbiertas()) {
    return mal("cerrado", "Las entregas no están abiertas en este momento.", 403);
  }

  const equipo = texto(form.get("equipo"), 80);
  const titulo = texto(form.get("titulo"), 160);
  const track = texto(form.get("track"), 20);
  const resumen = texto(form.get("resumen"), 4000);
  const enlace = texto(form.get("enlace"), 500);

  /* En modo prueba el slug lleva el prefijo prueba- para que nunca choque
     con un equipo real y se pueda borrar todo junto. */
  const base = slugDe(equipo);
  const slug = base && esPrueba ? `prueba-${base}`.slice(0, 60) : base;
  if (!equipo || !slug) return mal("campo", "Escriban el nombre del equipo.", 400, "equipo");
  if (!titulo) return mal("campo", "Escriban el título del proyecto.", 400, "titulo");
  if (!(TRACKS_VALIDOS as readonly string[]).includes(track)) return mal("campo", "Elijan un track.", 400, "track");
  const n = palabras(resumen);
  if (n < 150 || n > 250) {
    return mal("campo", `El resumen debe tener entre 150 y 250 palabras (tiene ${n}).`, 400, "resumen");
  }
  if (!esUrl(enlace)) return mal("campo", "El enlace debe empezar con http:// o https://.", 400, "enlace");

  let integrantes: Integrante[];
  try {
    const crudo = JSON.parse(texto(form.get("integrantes"), 5000) || "[]") as unknown;
    if (!Array.isArray(crudo)) throw new Error();
    integrantes = crudo
      .map((x) => ({
        nombre: String((x as Integrante)?.nombre ?? "").trim().slice(0, 120),
        correo: String((x as Integrante)?.correo ?? "").trim().toLowerCase().slice(0, 200),
      }))
      .filter((x) => x.nombre || x.correo);
  } catch {
    return mal("campo", "No pudimos leer la lista de integrantes.", 400, "integrantes");
  }
  if (integrantes.length < 2 || integrantes.length > 5) {
    return mal("campo", "El equipo debe tener entre 2 y 5 integrantes.", 400, "integrantes");
  }
  if (integrantes.some((i) => !i.nombre || !CORREO_RE.test(i.correo))) {
    return mal("campo", "Cada integrante necesita nombre y un correo válido.", 400, "integrantes");
  }

  const archivo = form.get("pdf");
  let pdf: ArrayBuffer | null = null;
  if (archivo && typeof archivo !== "string" && archivo.size > 0) {
    if (archivo.size > PDF_MAX_BYTES) return mal("campo", "La ficha técnica pesa más de 10 MB.", 400, "pdf");
    pdf = await archivo.arrayBuffer();
    const cabeza = new TextDecoder("latin1").decode(pdf.slice(0, 5));
    if (!cabeza.startsWith("%PDF")) return mal("campo", "La ficha técnica debe ser un PDF.", 400, "pdf");
  }

  if (!pdf) return mal("campo", "Adjunten la ficha técnica en PDF.", 400, "pdf");

  /* Nunca se sobrescribe una entrega. Si el nombre ya existe, esta se guarda
     con el siguiente slug libre y queda marcada como posible duplicado. */
  let slugFinal = slug;
  let duplicadoDe: string | undefined;
  try {
    for (let i = 2; await leerEntrega(slugFinal); i++) {
      if (i > 50) return mal("almacenamiento", "Demasiados envíos con ese nombre de equipo.", 409, "equipo");
      const sufijo = `-${i}`;
      slugFinal = `${slug.slice(0, 60 - sufijo.length)}${sufijo}`;
      duplicadoDe = slug;
    }
  } catch {
    return mal("almacenamiento", "No pudimos consultar las entregas. Intenten de nuevo.", 502);
  }

  const ahora = new Date().toISOString();
  const tardia = Date.now() > new Date(CIERRE_ENTREGAS_ISO).getTime();
  const ruta = `fichas/${slugFinal}.pdf`;
  const entrega: Entrega = {
    slug: slugFinal,
    equipo,
    titulo,
    track,
    resumen,
    enlace,
    integrantes,
    pdf: { ruta, bytes: pdf.byteLength },
    creada: ahora,
    actualizada: ahora,
    version: 1,
    ...(duplicadoDe ? { duplicadoDe } : {}),
    ...(tardia ? { tardia: true } : {}),
    ...(esPrueba ? { prueba: true } : {}),
  };

  try {
    await subir(ruta, new Uint8Array(pdf), "application/pdf");
    await subirJson(`entregas/${slugFinal}.json`, entrega);
  } catch {
    return mal("almacenamiento", "No pudimos guardar la entrega. Intenten de nuevo.", 502);
  }

  after(async () => {
    if (!conBypass) await avisarAlEquipo(entrega);
    try {
      await revisarConGemini(slugFinal);
    } catch {
      /* la revisión se puede repetir desde la página de resultados */
    }
  });

  return NextResponse.json({ ok: true, slug: slugFinal });
}
