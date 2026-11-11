import { NextResponse } from "next/server";
import {
  COOKIE_ADMIN,
  claveAdminValida,
  ipDeLaPeticion,
  pasaElLimite,
  valorCookieAdmin,
} from "@/lib/defacc-entregas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fallo(status: number, error: string, mensaje: string) {
  return NextResponse.json({ ok: false, error, mensaje }, { status });
}

export async function POST(req: Request) {
  if (!pasaElLimite(`admin:${ipDeLaPeticion(req)}`, 10)) {
    return fallo(429, "limite", "Demasiados intentos. Espera unos minutos.");
  }

  let clave = "";
  try {
    const cuerpo = (await req.json()) as { clave?: unknown };
    clave = String(cuerpo.clave ?? "");
  } catch {
    return fallo(400, "formato", "La petición no es JSON válido.");
  }

  if (!claveAdminValida(clave)) return fallo(401, "clave", "Clave incorrecta.");

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_ADMIN, valorCookieAdmin(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3 * 24 * 3600,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_ADMIN, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
