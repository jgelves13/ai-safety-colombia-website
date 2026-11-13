import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_ADMIN, SLUG_VALIDO, cookieAdminValida, leerEntrega, subirJson } from "@/lib/defacc-entregas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fallo(status: number, error: string, mensaje: string) {
  return NextResponse.json({ ok: false, error, mensaje }, { status });
}

/* Descarta o restaura una entrega. No borra nada: solo la marca para que
   salga del ranking y de la lista de los jurados. */
export async function POST(req: Request) {
  const galleta = (await cookies()).get(COOKIE_ADMIN)?.value;
  if (!cookieAdminValida(galleta)) return fallo(401, "sesion", "Inicia sesión de nuevo.");

  let slug = "";
  let descartar = true;
  try {
    const j = (await req.json()) as { slug?: unknown; descartar?: unknown };
    slug = String(j.slug ?? "");
    descartar = j.descartar !== false;
  } catch {
    return fallo(400, "formato", "La petición no es JSON válido.");
  }
  const e = SLUG_VALIDO.test(slug) ? await leerEntrega(slug) : null;
  if (!e) return fallo(404, "entrega", "Esa entrega no existe.");

  if (descartar) {
    e.descartada = true;
    e.descartadaEn = new Date().toISOString();
  } else {
    delete e.descartada;
    delete e.descartadaEn;
  }
  await subirJson(`entregas/${slug}.json`, e);
  return NextResponse.json({ ok: true, descartada: !!e.descartada });
}
