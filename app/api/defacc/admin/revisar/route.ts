import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_ADMIN, SLUG_VALIDO, cookieAdminValida, leerEntrega } from "@/lib/defacc-entregas";
import { revisarConGemini } from "@/lib/defacc-revision";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

function fallo(status: number, error: string, mensaje: string) {
  return NextResponse.json({ ok: false, error, mensaje }, { status });
}

export async function POST(req: Request) {
  const galleta = (await cookies()).get(COOKIE_ADMIN)?.value;
  if (!cookieAdminValida(galleta)) return fallo(401, "sesion", "Inicia sesión de nuevo.");

  let slug = "";
  try {
    slug = String(((await req.json()) as { slug?: unknown }).slug ?? "");
  } catch {
    return fallo(400, "formato", "La petición no es JSON válido.");
  }
  if (!SLUG_VALIDO.test(slug) || !(await leerEntrega(slug))) {
    return fallo(404, "entrega", "Esa entrega no existe.");
  }

  const revision = await revisarConGemini(slug);
  if (!revision) return fallo(502, "revision", "No se pudo revisar la entrega.");
  return NextResponse.json({ ok: true, revision });
}
