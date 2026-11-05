import { NextResponse } from "next/server";

// Exporta las aplicaciones del hackathon DefAcc para la hoja de Google
// que mantiene equipo@. Sin secreto compartido: el Apps Script de la hoja
// manda su token de identidad de Google (ScriptApp.getIdentityToken) y aquí
// se valida con Google que pertenezca a una cuenta autorizada.

export const dynamic = "force-dynamic";

const TABLA = "defacc_applications";
const CORREOS_AUTORIZADOS = ["equipo@aisafetycolombia.org"];

async function correoVerificado(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!token) return null;
  const r = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );
  if (!r.ok) return null;
  const info = (await r.json()) as {
    iss?: string;
    email?: string;
    email_verified?: string | boolean;
    exp?: string;
  };
  const emisorOk = info.iss === "https://accounts.google.com" || info.iss === "accounts.google.com";
  const verificado = info.email_verified === true || info.email_verified === "true";
  const vigente = Number(info.exp ?? 0) * 1000 > Date.now();
  const correo = (info.email ?? "").toLowerCase();
  if (!emisorOk || !verificado || !vigente || !CORREOS_AUTORIZADOS.includes(correo)) return null;
  return correo;
}

export async function GET(req: Request) {
  const correo = await correoVerificado(req);
  if (!correo) return NextResponse.json({ error: "no autorizado" }, { status: 401 });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "configuración incompleta" }, { status: 500 });

  const r = await fetch(`${url}/rest/v1/${TABLA}?select=*&order=submitted_at.asc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!r.ok) {
    console.error("[defacc/exportar] Supabase respondió error", r.status, await r.text());
    return NextResponse.json({ error: "no se pudo leer" }, { status: 502 });
  }
  const filas = await r.json();
  return NextResponse.json({ filas }, { headers: { "Cache-Control": "no-store" } });
}
