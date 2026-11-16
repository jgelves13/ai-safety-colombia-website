/* Las descripciones de AISafety.com llegan en inglés. Las que ya están en
   oportunidades-traducciones.json salen de ahí; las que faltan, o cuyo inglés
   cambió desde la última vez, se traducen acá con Claude a través de AI
   Gateway y quedan guardadas en la caché de datos de Vercel con el inglés como
   llave: cada texto se traduce una sola vez, y si el programa reescribe su
   descripción, la llave cambia y se traduce de nuevo.

   Si la traducción falla (sin credenciales en local, un tiempo de espera, una
   respuesta que no es JSON), se lanza el error para que no quede en la caché y
   la página muestra el inglés hasta la próxima revalidación. */

import { generateText } from "ai";
import { unstable_cache } from "next/cache";
import traducciones from "@/lib/oportunidades-traducciones.json";
import type { Programa } from "@/lib/oportunidades";

export type Traduccion = { es: string; pt: string };

const ESTATICAS = traducciones as Record<string, { en: string; es?: string; pt?: string }>;

const MODELO = "anthropic/claude-sonnet-5.5";

const INSTRUCCIONES = `Translate this short description of an AI safety program into Spanish and Portuguese.

Rules:
- Spanish: natural Latin American Spanish. Portuguese: natural Brazilian Portuguese.
- Keep official names untranslated: program names, organization names, course names, curricula and their acronyms (for example BlueDot Impact, ARENA, GovAI, Kairos).
- Do not use any dashes (no em dash, en dash or hyphen used as punctuation). Rewrite with commas, colons or a new sentence instead.
- Keep the meaning and length close to the original. Do not add information.
- Reply with only a JSON object: {"es": "...", "pt": "..."}. No other text.

Description:
`;

function sinGuiones(s: string) {
  return s.replace(/\s*[–—]\s*/g, ", ").replace(/\s+/g, " ").trim();
}

async function traducir(en: string): Promise<Traduccion> {
  const { text } = await generateText({
    model: MODELO,
    prompt: INSTRUCCIONES + en,
    abortSignal: AbortSignal.timeout(20000),
  });
  const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  const r = JSON.parse(json) as Partial<Traduccion>;
  if (typeof r.es !== "string" || typeof r.pt !== "string" || !r.es.trim() || !r.pt.trim()) {
    throw new Error("traducción incompleta");
  }
  return { es: sinGuiones(r.es), pt: sinGuiones(r.pt) };
}

const traducirGuardado = unstable_cache(traducir, ["oportunidades-traduccion-v1"], { revalidate: false });

function faltaEstatica(p: Programa) {
  const t = ESTATICAS[p.id];
  return !t || t.en !== p.description || !t.es || !t.pt;
}

/** Las traducciones de las descripciones que el archivo estático no cubre,
    por id de programa. Las que no se pudieron traducir no aparecen. */
export async function traduccionesFaltantes(programas: Programa[]): Promise<Record<string, Traduccion>> {
  const pendientes = programas.filter((p) => p.description && faltaEstatica(p));
  if (pendientes.length === 0) return {};
  const resultados = await Promise.allSettled(pendientes.map((p) => traducirGuardado(p.description!)));
  const salida: Record<string, Traduccion> = {};
  resultados.forEach((r, i) => {
    if (r.status === "fulfilled") salida[pendientes[i].id] = r.value;
    else console.warn("oportunidades: sin traducción para", pendientes[i].id, String(r.reason).slice(0, 200));
  });
  return salida;
}
