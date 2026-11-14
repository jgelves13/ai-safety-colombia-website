/* Registro de equipos del DefAcc Hackathon.

   Cada equipo se registra una vez (nombre, integrantes y track) antes de las
   10:00 a. m. del sábado. Con esa lista se sortea el orden de los pitches,
   que se publica a las 2:00 p. m. Si llega otro registro con el mismo nombre
   se guarda aparte marcado como duplicado: nunca se sobrescribe. */

import { NextResponse, after } from "next/server";
import { CORREO_HACKATHON } from "@/app/defacchackathon/datos";
import {
  TRACKS_VALIDOS,
  esTokenPrueba,
  firmaRegistro,
  iguales,
  ipDeLaPeticion,
  pasaElLimite,
  slugDe,
  subirJson,
  type Integrante,
} from "@/lib/defacc-entregas";
import { leerRegistro, registroAbierto, type Registro } from "@/lib/defacc-registro";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REMITENTE = "AI Safety Colombia <equipo@aisafetycolombia.org>";
const SITIO = "https://aisafetycolombia.org";
const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mal(error: string, mensaje: string, status = 400, campo?: string) {
  return NextResponse.json({ ok: false, error, mensaje, ...(campo ? { campo } : {}) }, { status });
}

function texto(v: unknown, max = 4000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

async function avisarAlEquipo(r: Registro): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const correos = r.integrantes.map((i) => i.correo).filter(Boolean);
  if (correos.length === 0) return;
  const enlace = `${SITIO}/defacchackathon/entregar?registro=${r.slug}.${firmaRegistro(r.slug)}`;
  const lineas = [
    `Hola, equipo ${r.equipo}:`,
    "",
    "Quedaron registrados en el Defensive Acceleration Hackathon.",
    "",
    `Track: ${NOMBRES_TRACKS[r.track] ?? r.track}`,
    `Integrantes: ${r.integrantes.map((i) => i.nombre).join(", ")}`,
    "",
    "A las 2:00 p. m. publicamos el orden de los pitches en el grupo de WhatsApp y en la guía.",
    "",
    "Para entregar a las 5:00 p. m., usen este enlace. Ya trae su nombre, track e integrantes:",
    enlace,
    "",
    `Si algo quedó mal, escríbannos a ${CORREO_HACKATHON}.`,
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
        subject: `Registro recibido: ${r.equipo}`,
        text: lineas.join("\n"),
      }),
    });
  } catch {
    /* el correo es cortesía; el registro ya quedó guardado */
  }
}

export async function POST(req: Request) {
  if (!pasaElLimite(ipDeLaPeticion(req), 12)) {
    return mal("limite", "Demasiados intentos. Esperen unos minutos.", 429);
  }

  let datos: Record<string, unknown>;
  try {
    datos = (await req.json()) as Record<string, unknown>;
  } catch {
    return mal("formato", "No pudimos leer el formulario.");
  }

  if (texto(datos.website)) return NextResponse.json({ ok: true });

  const bypassEsperado = process.env.APPLY_BYPASS_TOKEN;
  const bypassDado = texto(datos.bypass) || req.headers.get("x-bypass") || "";
  const esPrueba = esTokenPrueba(bypassDado);
  const conBypass = esPrueba || (!!bypassEsperado && !!bypassDado && iguales(bypassDado, bypassEsperado));

  if (!conBypass && !registroAbierto()) {
    return mal("cerrado", "El registro cerró a las 10:00 a. m.", 403);
  }

  const equipo = texto(datos.equipo, 80);
  const track = texto(datos.track, 20);
  const base = slugDe(equipo);
  const slug = base && esPrueba ? `prueba-${base}`.slice(0, 60) : base;
  if (!equipo || !slug) return mal("campo", "Escriban el nombre del equipo.", 400, "equipo");
  if (!(TRACKS_VALIDOS as readonly string[]).includes(track)) return mal("campo", "Elijan un track.", 400, "track");

  const crudos = Array.isArray(datos.integrantes) ? datos.integrantes : [];
  const integrantes: Integrante[] = crudos
    .map((i) => {
      const o = (i ?? {}) as Record<string, unknown>;
      return { nombre: texto(o.nombre, 120), correo: texto(o.correo, 200).toLowerCase() };
    })
    .filter((i) => i.nombre || i.correo);
  if (integrantes.length < 2 || integrantes.length > 5) {
    return mal("campo", "El equipo debe tener entre 2 y 5 integrantes.", 400, "integrantes");
  }
  if (integrantes.some((i) => !i.nombre || !CORREO_RE.test(i.correo))) {
    return mal("campo", "Cada integrante necesita nombre y un correo válido.", 400, "integrantes");
  }

  let slugFinal = slug;
  let duplicadoDe: string | undefined;
  try {
    for (let i = 2; await leerRegistro(slugFinal); i++) {
      if (i > 50) return mal("campo", "Ya hay demasiados equipos con ese nombre.", 409, "equipo");
      const sufijo = `-${i}`;
      slugFinal = `${slug.slice(0, 60 - sufijo.length)}${sufijo}`;
      duplicadoDe = slug;
    }
  } catch {
    return mal("almacenamiento", "No pudimos guardar el registro. Intenten de nuevo.", 502);
  }

  const registro: Registro = {
    slug: slugFinal,
    equipo,
    track,
    integrantes,
    creada: new Date().toISOString(),
    ...(esPrueba ? { prueba: true } : {}),
    ...(duplicadoDe ? { duplicadoDe } : {}),
  };

  try {
    await subirJson(`registros/${slugFinal}.json`, registro);
  } catch {
    return mal("almacenamiento", "No pudimos guardar el registro. Intenten de nuevo.", 502);
  }

  after(async () => {
    if (!conBypass) await avisarAlEquipo(registro);
  });

  return NextResponse.json({ ok: true, slug: slugFinal });
}
