import { NextResponse } from "next/server";
import { verificarInvitacion } from "@/lib/confirmar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORREO_CONTACTO = "equipo@aisafetycolombia.org";
const REMITENTE = "AI Safety Colombia <equipo@aisafetycolombia.org>";
const TABLA = "sprint_confirmations";

/* Límite por IP más flojo que el de la aplicación: acá varias personas confirman
   desde la misma red (una universidad, un coworking) y el día del cierre se
   amontonan. En junio el tope de ocho dejó a gente por fuera con un 429. La
   identidad ya viene firmada en el token, así que el riesgo real de abuso es
   bajo y lo que importa es no rechazar a nadie. */
const VENTANA_MS = 10 * 60 * 1000;
const TOPE = 60;
const visitas = new Map<string, number[]>();

function pasaElLimite(ip: string): boolean {
  const ahora = Date.now();
  const previas = (visitas.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  if (previas.length >= TOPE) {
    visitas.set(ip, previas);
    return false;
  }
  previas.push(ahora);
  visitas.set(ip, previas);
  if (visitas.size > 5000) visitas.clear();
  return true;
}

function ipDeLaPeticion(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "desconocida";
}

function texto(valor: unknown, tope: number): string {
  return typeof valor === "string" ? valor.trim().slice(0, tope) : "";
}

const HOSPEDAJE = ["bogota", "necesito", "resuelvo"];

/* Los mismos ids del formulario. Acá no bloquea: quien tuviera la página
   abierta desde antes de que existiera la pregunta manda el campo vacío, y
   perder ese dato sale más barato que rechazarle la confirmación. */
const ENTERADO = [
  "whatsapp",
  "correo",
  "persona",
  "universidad",
  "redes",
  "apart",
  "otro",
];

/* Flojo a propósito, igual que en el formulario: acá solo descarta basura. */
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Confirmacion = {
  nombre: string;
  correo: string;
  /* De dónde vino: 'enlace' es el correo de aceptación, con la identidad
     firmada; 'abierto' es /sprint/confirmar/abierto, donde la persona escribió
     su nombre a mano y nadie verificó que sea quien dice. La columna existe
     para poder revisar esas filas contra la lista de seleccionados. */
  origen: "enlace" | "abierto";
  /* Los dos enlaces que pide el registro de Apart y que solo se preguntan en el
     formulario abierto; por el enlace firmado llegan vacíos. */
  linkedin: string;
  scholar: string;
  disponible: boolean;
  grupo: boolean;
  lectura: boolean;
  hospedaje: string;
  /* Por dónde se enteró del sprint, y la precisión que se le pidió: cuál grupo
     de WhatsApp, de quién era el correo. Es la única medición de difusión que
     tenemos; la aplicación nunca lo preguntó. */
  enterado: string;
  enteradoDetalle: string;
  nota: string;
};

async function guardar(c: Confirmacion): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("[confirmar] faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
    return false;
  }

  const fila = {
    confirmed_at: new Date().toISOString(),
    sprint: "ai-incident-response-2026-09",
    name: c.nombre,
    email: c.correo,
    available_all_weekend: c.disponible,
    joined_whatsapp: c.grupo,
    will_read: c.lectura,
    lodging: c.hospedaje,
    note: c.nota || null,
    source: c.origen,
    linkedin: c.linkedin || null,
    scholar: c.scholar || null,
    heard_about: c.enterado || null,
    heard_detail: c.enteradoDetalle || null,
  };

  /* Upsert por correo: quien abra el enlace dos veces —porque cambió de opinión
     sobre el hospedaje, o porque no supo si el primer envío entró— reemplaza su
     fila en vez de duplicarla. La restricción única va sobre (sprint, email). */
  const enviar = (cuerpo: object) =>
    fetch(`${url}/rest/v1/${TABLA}?on_conflict=sprint,email`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal,resolution=merge-duplicates",
      },
      body: JSON.stringify(cuerpo),
    });

  /* La misma red de seguridad que en /api/aplicar. Si la tabla se creó sin
     alguna de estas columnas, la confirmación se guarda sin ese dato en vez de
     devolverle un 502 a alguien que ya cumplió su parte. Perder el cupo de un
     seleccionado sale mucho más caro que perder una casilla. */
  const APLAZABLES = [
    "heard_about",
    "heard_detail",
    "linkedin",
    "scholar",
    "source",
    "lodging",
    "note",
    "joined_whatsapp",
    "will_read",
  ];

  try {
    const cuerpo: Record<string, unknown> = { ...fila };
    const quitadas: string[] = [];

    for (let intento = 0; intento <= APLAZABLES.length; intento += 1) {
      const r = await enviar(cuerpo);
      if (r.ok) {
        if (quitadas.length > 0) {
          console.error(
            `[confirmar] faltan columnas en la tabla (${quitadas.join(", ")}); se guardó sin ellas. Corre: ${quitadas
              .map((col) => `alter table public.${TABLA} add column if not exists ${col} text;`)
              .join(" ")}`,
          );
          await avisarDeLoQueNoCupo(c, quitadas);
        }
        return true;
      }

      const motivo = await r.text();
      const falta = APLAZABLES.find((col) => col in cuerpo && motivo.includes(col));
      if (!falta) {
        console.error("[confirmar] Supabase respondió", r.status, motivo);
        return false;
      }
      delete cuerpo[falta];
      quitadas.push(falta);
    }

    return false;
  } catch (e) {
    console.error("[confirmar] falló el insert", e);
    return false;
  }
}

/* Correo interno: la fila quedó guardada pero incompleta y esas respuestas no
   están en ningún otro lado. */
async function avisarDeLoQueNoCupo(c: Confirmacion, quitadas: string[]): Promise<void> {
  await correoInterno(
    `Confirmación guardada sin ${quitadas.join(", ")}`,
    [
      `${c.nombre} <${c.correo}> confirmó, pero la tabla no tiene estas columnas: ${quitadas.join(", ")}.`,
      "",
      `Fin de semana completo: ${c.disponible ? "sí" : "no"}`,
      `Entró al grupo: ${c.grupo ? "sí" : "no"}`,
      `Se compromete con el material: ${c.lectura ? "sí" : "no"}`,
      `Hospedaje: ${c.hospedaje}`,
      `Se enteró por: ${c.enterado || "(vacío)"} — ${c.enteradoDetalle || "sin detalle"}`,
      `Nota: ${c.nota || "(vacía)"}`,
      `Entró por: ${c.origen}`,
    ].join("\n"),
  );
}

/* Si Supabase se cae, la confirmación no se pierde: llega por correo y se
   repone a mano. Es el único respaldo que hay. */
async function avisarDeLaFalla(c: Confirmacion): Promise<void> {
  await correoInterno(
    `NO SE GUARDÓ la confirmación de ${c.nombre}`,
    [
      `${c.nombre} <${c.correo}> confirmó su cupo y Supabase rechazó la fila.`,
      "",
      `Fin de semana completo: ${c.disponible ? "sí" : "no"}`,
      `Entró al grupo: ${c.grupo ? "sí" : "no"}`,
      `Se compromete con el material: ${c.lectura ? "sí" : "no"}`,
      `Hospedaje: ${c.hospedaje}`,
      `Se enteró por: ${c.enterado || "(vacío)"} — ${c.enteradoDetalle || "sin detalle"}`,
      `Nota: ${c.nota || "(vacía)"}`,
      `Entró por: ${c.origen}`,
      /* Estos dos solo existen aquí: si la fila no se guardó, este correo es
         el único registro de lo que Apart necesita para inscribirla. */
      `LinkedIn: ${c.linkedin || "(no lo pidió el enlace)"}`,
      `Scholar: ${c.scholar || "(no lo pidió el enlace)"}`,
    ].join("\n"),
  );
}

async function correoInterno(asunto: string, cuerpo: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REMITENTE,
        to: [CORREO_CONTACTO],
        subject: `[sprint] ${asunto}`,
        text: cuerpo,
      }),
    });
  } catch (e) {
    console.error("[confirmar] no salió el aviso interno", e);
  }
}

/* Acuse de recibo para quien confirma. Es un extra: si no sale, la confirmación
   ya quedó guardada y nadie se entera de la falla. */
async function acusar(c: Confirmacion): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const cuerpo = [
    `Hola ${c.nombre.trim().split(/\s+/)[0]},`,
    "",
    "Tu cupo en el AI Incident Response Sprint queda confirmado.",
    "",
    "Viernes 11 de septiembre, 5:00 p. m. — Calle 98 # 11B-48, Bogotá.",
    "Sábado 12 y domingo 13, días completos.",
    "",
    c.hospedaje === "necesito"
      ? "Anotamos que necesitas hospedaje. Te escribimos con los detalles antes del jueves."
      : "",
    c.grupo
      ? ""
      : "Todavía no marcaste que entraste al grupo de WhatsApp. Es por donde sale toda la logística del fin de semana: https://chat.whatsapp.com/K22KSUQeM1158NZBVrPPsB",
    "",
    "El miércoles te mandamos el material de preparación y la guía para participantes.",
    "",
    `Si algo cambia y ya no puedes venir, avísanos a ${CORREO_CONTACTO} lo antes posible.`,
    "",
    "AI Safety Colombia",
  ]
    .filter((linea, i, todas) => linea !== "" || todas[i - 1] !== "")
    .join("\n");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REMITENTE,
        to: [c.correo],
        reply_to: CORREO_CONTACTO,
        subject: "Confirmado: nos vemos el viernes en el sprint",
        text: cuerpo,
      }),
    });
    if (!r.ok) console.error("[confirmar] Resend rechazó el acuse", r.status, await r.text());
  } catch (e) {
    console.error("[confirmar] no salió el acuse", e);
  }
}

export async function POST(req: Request) {
  if (!pasaElLimite(ipDeLaPeticion(req)))
    return NextResponse.json({ error: "demasiadas" }, { status: 429 });

  let crudo: Record<string, unknown>;
  try {
    crudo = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "json" }, { status: 400 });
  }

  /* Dos caminos de identidad. Con token manda el token: el nombre y el correo
     salen de la firma y no de lo que mande el navegador, y un token que no
     cuadre se rechaza en vez de degradarse a confirmación abierta —si se
     degradara, firmar los enlaces no serviría de nada. Sin token, la petición
     viene de /sprint/confirmar/abierto y la persona escribió sus datos. */
  const enviado = texto(crudo.token, 2000);
  const invitada = enviado ? verificarInvitacion(enviado) : null;
  if (enviado && !invitada) return NextResponse.json({ error: "enlace" }, { status: 403 });

  /* El bot que llenó la trampa se va con un 200: si le devolvemos un error,
     el siguiente intento viene corregido. */
  if (texto(crudo.website, 100)) return NextResponse.json({ ok: true });

  const hospedaje = texto(crudo.hospedaje, 20);
  if (!HOSPEDAJE.includes(hospedaje))
    return NextResponse.json({ error: "hospedaje" }, { status: 400 });

  /* Las dos casillas obligatorias se revisan también acá: el navegador ya las
     validó, pero la ruta no puede confiar en eso. La del grupo de WhatsApp no
     bloquea a propósito —quien no pudo abrir el enlace desde el celular igual
     confirma— y queda registrada como false para poder insistirle por correo. */
  const disponible = crudo.disponible === true;
  const lectura = crudo.lectura === true;
  if (!disponible || !lectura) return NextResponse.json({ error: "casillas" }, { status: 400 });

  /* El correo va en minúsculas en los dos caminos: es media llave del upsert
     (sprint, email), así que si alguien escribe Nombre@Gmail.com en el
     formulario abierto no puede quedar como una fila aparte. */
  const nombre = invitada ? invitada.nombre : texto(crudo.nombre, 120);
  const correo = (invitada ? invitada.correo : texto(crudo.correo, 200)).toLowerCase();
  if (nombre.length < 3 || !CORREO.test(correo))
    return NextResponse.json({ error: "datos" }, { status: 400 });

  const confirmacion: Confirmacion = {
    nombre,
    correo,
    origen: invitada ? "enlace" : "abierto",
    linkedin: invitada ? "" : texto(crudo.linkedin, 200),
    scholar: invitada ? "" : texto(crudo.scholar, 200),
    disponible,
    grupo: crudo.grupo === true,
    lectura,
    hospedaje,
    enterado: ENTERADO.includes(texto(crudo.enterado, 20)) ? texto(crudo.enterado, 20) : "",
    enteradoDetalle: texto(crudo.enteradoDetalle, 200),
    nota: texto(crudo.nota, 1200),
  };

  const guardada = await guardar(confirmacion);
  if (!guardada) {
    await avisarDeLaFalla(confirmacion);
    return NextResponse.json({ error: "guardar" }, { status: 502 });
  }

  await acusar(confirmacion);
  return NextResponse.json({ ok: true });
}
