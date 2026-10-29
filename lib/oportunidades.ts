import snapshot from "./oportunidades-snapshot.json";

/**
 * Programas de formación en seguridad de IA, tomados del listado de
 * AISafety.com (aisafety.com/training). Esa página no tiene API: los datos van
 * dentro del HTML, en el payload RSC de Next (`self.__next_f.push([1,"…"])`),
 * como props `{"programs":[…],"recurring":[…]}` del listado. Se lee al
 * construir la página y se refresca cada hora; si AISafety.com no responde o
 * cambia el formato, vale la copia guardada en `oportunidades-snapshot.json`.
 */

export const FUENTE = "https://aisafety.com/training";

export type Programa = {
  id: string;
  name: string;
  description: string | null;
  url: string | null;
  type: string[];
  location: string | null;
  mode: string | null;
  focus: string[];
  entryBar: string | null;
  timeCommitment: string | null;
  stipend: string | null;
  logo: string | null;
  featured: number | null;
  lastModified: string | null;
  lengthBucket: string | null;
  /* Solo los próximos. */
  startDate?: string | null;
  startDateApprox?: string | null;
  endDate?: string | null;
  applicationStatus?: string | null;
  applicationsClose?: string | null;
  notYetOpen?: boolean | null;
  /* Solo los recurrentes. */
  typicalLength?: string | null;
};

export type Oportunidades = { programs: Programa[]; recurring: Programa[] };

const comoLista = (v: unknown) => (Array.isArray(v) ? v : typeof v === "string" && v ? [v] : []);

function limpiar(p: Record<string, unknown>): Programa {
  return {
    ...(p as Programa),
    type: comoLista(p.type),
    focus: comoLista(p.focus),
    featured: p.featured == null || p.featured === "" ? null : Number(p.featured),
  };
}

/** Lee el arreglo JSON que empieza en `desde`, contando corchetes fuera de las cadenas. */
function arreglo(texto: string, desde: number): unknown[] | null {
  if (texto[desde] !== "[") return null;
  let nivel = 0;
  let enCadena = false;
  for (let i = desde; i < texto.length; i++) {
    const c = texto[i];
    if (enCadena) {
      if (c === "\\") i++;
      else if (c === '"') enCadena = false;
    } else if (c === '"') enCadena = true;
    else if (c === "[" || c === "{") nivel++;
    else if (c === "]" || c === "}") {
      nivel--;
      if (nivel === 0) return JSON.parse(texto.slice(desde, i + 1));
    }
  }
  return null;
}

export function extraer(html: string): Oportunidades | null {
  let payload = "";
  for (const m of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) payload += JSON.parse(m[1]);
  const i = payload.indexOf('{"programs":[');
  if (i < 0) return null;
  const programs = arreglo(payload, i + '{"programs":'.length);
  const j = payload.indexOf('"recurring":[', i);
  const recurring = j < 0 ? [] : arreglo(payload, j + '"recurring":'.length);
  if (!programs?.length) return null;
  return {
    programs: programs.map((p) => limpiar(p as Record<string, unknown>)),
    recurring: (recurring ?? []).map((p) => limpiar(p as Record<string, unknown>)),
  };
}

export async function cargarOportunidades(): Promise<Oportunidades> {
  try {
    const res = await fetch(FUENTE, {
      next: { revalidate: 3600 },
      headers: { "user-agent": "Mozilla/5.0 aisafetycolombia.org" },
    });
    if (!res.ok) throw new Error(`AISafety.com respondió ${res.status}`);
    const datos = extraer(await res.text());
    if (!datos) throw new Error("No se encontró el listado en AISafety.com");
    return datos;
  } catch (e) {
    console.error("[oportunidades] usando la copia guardada:", e);
    return snapshot as unknown as Oportunidades;
  }
}

/** La última vez que AISafety.com tocó el listado, en ISO. */
export function actualizado({ programs, recurring }: Oportunidades): string | null {
  const fechas = [...programs, ...recurring].map((p) => p.lastModified).filter((f): f is string => !!f);
  return fechas.length ? fechas.reduce((a, b) => (a > b ? a : b)) : null;
}
