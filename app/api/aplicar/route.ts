import { NextResponse } from "next/server";
import { CIERRE_ISO, TRACKS_FORM, VIAJE_FORM } from "@/app/hackathon/datos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORREO_CONTACTO = "contacto@aisafetycolombia.org";
const REMITENTE = "AI Safety Colombia <contacto@aisafetycolombia.org>";
const TABLA = "sprint_applications";

/* Límite por IP: ocho envíos cada diez minutos. Vive en memoria, así que solo
   cubre la instancia que atienda la petición. Es suficiente para frenar un
   script torpe; lo que de verdad filtra bots es el campo trampa. */
const VENTANA_MS = 10 * 60 * 1000;
const TOPE = 8;
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

const LIMITES: Record<string, number> = {
  firstName: 100,
  lastName: 100,
  email: 200,
  location: 200,
  linkedin: 300,
  scholar: 300,
  career: 800,
  reason: 1500,
  hubProblem: 1500,
  hubAccess: 800,
  hubExtra: 800,
};

const OBLIGATORIOS = ["firstName", "lastName", "email", "location", "career", "reason", "hubProblem"];

const TRACKS = new Set(TRACKS_FORM.map((t) => t.id as string));
const VIAJES = new Set(VIAJE_FORM.map((t) => t.id as string));

type Crudo = Record<string, unknown>;

function texto(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function validar(raw: Crudo): { ok: true; datos: Record<string, string> } | { ok: false; campo: string } {
  const datos: Record<string, string> = {};

  for (const [campo, tope] of Object.entries(LIMITES)) {
    const valor = texto(raw[campo]);
    if (valor.length > tope) return { ok: false, campo };
    datos[campo] = valor;
  }
  for (const campo of OBLIGATORIOS) {
    if (!datos[campo]) return { ok: false, campo };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) return { ok: false, campo: "email" };

  const track = texto(raw.hubTrack);
  if (!TRACKS.has(track)) return { ok: false, campo: "hubTrack" };
  datos.hubTrack = track;

  const viaje = texto(raw.hubTravel);
  if (!VIAJES.has(viaje)) return { ok: false, campo: "hubTravel" };
  datos.hubTravel = viaje;

  if (texto(raw.aiConfirm) !== "si") return { ok: false, campo: "aiConfirm" };
  datos.aiConfirm = "si";

  return { ok: true, datos };
}

async function guardar(datos: Record<string, string>): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("[aplicar] faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
    return false;
  }

  const fila = {
    submitted_at: new Date().toISOString(),
    sprint: "ai-incident-response-2026-09",
    first_name: datos.firstName,
    last_name: datos.lastName,
    email: datos.email,
    location: datos.location,
    linkedin: datos.linkedin || null,
    scholar: datos.scholar || null,
    career: datos.career,
    reason: datos.reason,
    hub_problem: datos.hubProblem,
    hub_track: datos.hubTrack,
    hub_travel: datos.hubTravel,
    hub_access: datos.hubAccess || null,
    hub_extra: datos.hubExtra || null,
    ai_confirmed: true,
  };

  try {
    const r = await fetch(`${url}/rest/v1/${TABLA}`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(fila),
    });
    if (!r.ok) {
      console.error("[aplicar] Supabase respondió", r.status, await r.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[aplicar] falló el insert", e);
    return false;
  }
}

/* La confirmación es un extra: si el correo no sale, la aplicación ya quedó
   guardada y no se le dice a nadie que falló. */
async function confirmar(datos: Record<string, string>): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const cuerpo = [
    `Hola ${datos.firstName},`,
    "",
    "Recibimos tu aplicación al espacio presencial del AI Incident Response Sprint, del 11 al 13 de septiembre en Bogotá.",
    "",
    "Revisamos las aplicaciones a medida que llegan y te respondemos antes del sprint, quedes o no. Cuando confirmemos la sede la anunciamos por correo y por el grupo de WhatsApp.",
    "",
    `Si algo cambia o quieres corregir una respuesta, escríbenos a ${CORREO_CONTACTO}.`,
    "",
    "AI Safety Colombia",
  ].join("\n");

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REMITENTE,
        to: [datos.email],
        reply_to: CORREO_CONTACTO,
        subject: "Recibimos tu aplicación al sprint de septiembre",
        text: cuerpo,
      }),
    });
  } catch (e) {
    console.error("[aplicar] no salió la confirmación", e);
  }
}

/* Aviso interno para no perder una aplicación si Supabase se cae. */
async function avisarDeLaFalla(datos: Record<string, string>): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: REMITENTE,
        to: [CORREO_CONTACTO],
        subject: "Falló una aplicación al sprint",
        text: `No se pudo guardar en Supabase. Datos:\n\n${JSON.stringify(datos, null, 2)}`,
      }),
    });
  } catch {
    /* si esto también falla, ya solo quedan los logs */
  }
}

export async function POST(req: Request) {
  if (Date.now() > Date.parse(CIERRE_ISO)) {
    return NextResponse.json({ ok: false, error: "closed" }, { status: 403 });
  }

  if (!pasaElLimite(ipDeLaPeticion(req))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let raw: Crudo;
  try {
    raw = (await req.json()) as Crudo;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  /* Campo trampa: un bot lo llena. Se responde que todo salió bien para que no
     reintente, y no se guarda nada. */
  if (texto(raw.website)) return NextResponse.json({ ok: true });

  const revisado = validar(raw);
  if (!revisado.ok) {
    return NextResponse.json({ ok: false, error: "invalid", campo: revisado.campo }, { status: 400 });
  }

  const guardado = await guardar(revisado.datos);
  if (!guardado) {
    await avisarDeLaFalla(revisado.datos);
    return NextResponse.json({ ok: false, error: "submission_failed" }, { status: 502 });
  }

  await confirmar(revisado.datos);
  return NextResponse.json({ ok: true });
}
