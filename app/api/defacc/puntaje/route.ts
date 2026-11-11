import { NextResponse } from "next/server";
import {
  ipDeLaPeticion,
  juezDelToken,
  leerEntrega,
  pasaElLimite,
  subirJson,
  type Puntaje,
} from "@/lib/defacc-entregas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fallo(status: number, error: string, mensaje: string, campo?: string) {
  return NextResponse.json({ ok: false, error, mensaje, ...(campo ? { campo } : {}) }, { status });
}

function nota(v: unknown): number | null | "mal" {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : "mal";
}

export async function POST(req: Request) {
  if (!pasaElLimite(`puntaje:${ipDeLaPeticion(req)}`, 200)) {
    return fallo(429, "limite", "Demasiados intentos. Espera unos minutos.");
  }

  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await req.json()) as Record<string, unknown>;
  } catch {
    return fallo(400, "formato", "La petición no es JSON válido.");
  }

  const juez = juezDelToken(String(cuerpo.token ?? ""));
  if (!juez) return fallo(403, "token", "El enlace de jurado no es válido.");

  const slug = String(cuerpo.slug ?? "");
  const entrega = await leerEntrega(slug);
  if (!entrega) return fallo(404, "entrega", "Esa entrega no existe.");

  const abstiene = cuerpo.abstiene === true;
  const noElegible = cuerpo.noElegible === true;
  const comentario = String(cuerpo.comentario ?? "").trim().slice(0, 3000);

  const notas = {
    impacto: nota(cuerpo.impacto),
    ejecucion: nota(cuerpo.ejecucion),
    presentacion: nota(cuerpo.presentacion),
  };

  let puntaje: Puntaje;
  if (abstiene) {
    puntaje = {
      impacto: null,
      ejecucion: null,
      presentacion: null,
      comentario,
      abstiene: true,
      noElegible: false,
      actualizado: new Date().toISOString(),
    };
  } else {
    for (const [campo, v] of Object.entries(notas)) {
      if (v === "mal" || v === null) {
        return fallo(400, "campo", "Califica los tres criterios de 1 a 5, o marca que te abstienes.", campo);
      }
    }
    puntaje = {
      impacto: notas.impacto as number,
      ejecucion: notas.ejecucion as number,
      presentacion: notas.presentacion as number,
      comentario,
      abstiene: false,
      noElegible,
      actualizado: new Date().toISOString(),
    };
  }

  try {
    await subirJson(`puntajes/${juez.id}/${entrega.slug}.json`, puntaje);
  } catch {
    return fallo(502, "almacenamiento", "No se pudo guardar. Intenta de nuevo.");
  }
  return NextResponse.json({ ok: true, puntaje });
}
