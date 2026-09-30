/* El sitio vive en tres idiomas. El español no lleva prefijo porque es el que
   ya está indexado y el que reciben los enlaces que circulan; el inglés cuelga
   de /en y el portugués de /pt.

   Cada página aparece una sola vez acá, con su dirección y su nombre de menú en
   los tres. El selector del encabezado se mueve por esta tabla: busca la fila a
   la que pertenece la dirección actual y salta a la columna del idioma que le
   pidan. Una página que todavía no esté traducida no tiene fila y el selector
   lleva al inicio de ese idioma. */

export type Idioma = "es" | "en" | "pt";

export const IDIOMAS: Idioma[] = ["es", "en", "pt"];

/* Los que ya tienen todas sus páginas escritas y por tanto aparecen en el
   selector. Un idioma entra acá cuando su árbol está completo: ofrecer una
   dirección que todavía no existe es peor que no ofrecer nada. */
export const IDIOMAS_LISTOS: Idioma[] = ["es", "en", "pt"];

/** Cómo se llama cada idioma en su propia lengua, para el menú del selector. */
export const NOMBRE_IDIOMA: Record<Idioma, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

/** El código de dos letras que acompaña a la bandera en el botón. */
export const SIGLA_IDIOMA: Record<Idioma, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

/** Lo que dice el lector de pantalla al llegar al control. */
export const ETIQUETA_SELECTOR: Record<Idioma, string> = {
  es: "Cambiar de idioma",
  en: "Change language",
  pt: "Mudar de idioma",
};

export const INICIO: Record<Idioma, string> = {
  es: "/",
  en: "/en",
  pt: "/pt",
};

type Pagina = {
  ruta: Record<Idioma, string>;
  /** Si la página está en el menú, cómo se llama en cada idioma. */
  nav?: Record<Idioma, string>;
  /** Si va dentro de un submenú del encabezado, cuál, y la línea que la
      describe ahí. El pie la muestra suelta, como las demás. */
  grupo?: Grupo;
  detalle?: Record<Idioma, string>;
};

type Grupo = "seminarios";

const GRUPOS: Record<Grupo, Record<Idioma, string>> = {
  seminarios: { es: "Seminarios", en: "Seminars", pt: "Seminários" },
};

/* El orden es el del menú: qué está abierto ahora mismo, qué sale de acá, con
   qué estudiar, cómo entrar y quiénes somos. Lo abierto ahora son los dos
   cursos, juntos bajo «Seminarios» como el «Get Involved» de MIT. El sprint y
   «¿Qué es AI safety?» salieron del menú, pero sus páginas siguen en la tabla,
   igual que el inicio y los formularios, porque el selector tiene que saber a
   dónde mandarlas. */
export const PAGINAS: Pagina[] = [
  {
    ruta: { es: "/", en: "/en", pt: "/pt" },
  },
  {
    ruta: { es: "/seguridad-de-la-ia", en: "/en/ai-safety", pt: "/pt/seguranca-da-ia" },
  },
  {
    ruta: { es: "/cursos/agi-strategy", en: "/en/courses/agi-strategy", pt: "/pt/cursos/agi-strategy" },
    nav: { es: "Seminario de futuro y riesgos de la IA", en: "Seminar on the Future and Risks of AI", pt: "Seminário de futuro e riscos da IA" },
    grupo: "seminarios",
  },
  {
    ruta: {
      es: "/cursos/technical-ai-safety",
      en: "/en/courses/technical-ai-safety",
      pt: "/pt/cursos/technical-ai-safety",
    },
    nav: { es: "Seminario técnico de seguridad de la IA", en: "Technical AI Safety Seminar", pt: "Seminário técnico de segurança da IA" },
    grupo: "seminarios",
  },
  {
    ruta: { es: "/investigacion", en: "/en/research", pt: "/pt/pesquisa" },
    nav: { es: "Investigación", en: "Research", pt: "Pesquisa" },
  },
  {
    ruta: { es: "/recursos", en: "/en/resources", pt: "/pt/recursos" },
    nav: { es: "Recursos", en: "Resources", pt: "Recursos" },
  },
  {
    ruta: { es: "/unete", en: "/en/join", pt: "/pt/participe" },
    nav: { es: "Únete", en: "Join us", pt: "Participe" },
  },
  {
    ruta: { es: "/quienes-somos", en: "/en/about", pt: "/pt/quem-somos" },
    nav: { es: "¿Quiénes somos?", en: "About us", pt: "Quem somos?" },
  },
  {
    ruta: { es: "/sprint", en: "/en/sprint", pt: "/pt/sprint" },
  },
  {
    ruta: { es: "/sprint/aplicar", en: "/en/sprint/apply", pt: "/pt/sprint/inscricao" },
  },
  {
    ruta: { es: "/cursos/aplicar", en: "/en/courses/apply", pt: "/pt/cursos/inscricao" },
  },
  /* La version corta del formulario, la que se manda por enlace a quien llega
     recomendado. No se enlaza desde ninguna pagina ni sale en buscadores, pero
     tiene que estar aca para que el selector de idioma la sepa cruzar. */
  {
    ruta: {
      es: "/sprint/aplicar/recomendacion",
      en: "/en/sprint/apply/referral",
      pt: "/pt/sprint/inscricao/indicacao",
    },
  },
];

/** Las entradas del menú, ya en el idioma que se pida. */
export function menu(idioma: Idioma): { href: string; label: string }[] {
  return PAGINAS.filter((p) => p.nav).map((p) => ({
    href: p.ruta[idioma],
    label: p.nav![idioma],
  }));
}

export type EntradaMenu =
  | { href: string; label: string }
  | { label: string; hijos: { href: string; label: string; detalle?: string }[] };

/** El menú del encabezado: las páginas de un mismo grupo van juntas en un
    submenú, en el lugar de la primera. */
export function menuAgrupado(idioma: Idioma): EntradaMenu[] {
  const salida: EntradaMenu[] = [];
  const vistos = new Map<Grupo, { href: string; label: string; detalle?: string }[]>();
  for (const p of PAGINAS) {
    if (!p.nav) continue;
    const item = { href: p.ruta[idioma], label: p.nav[idioma] };
    if (!p.grupo) {
      salida.push(item);
      continue;
    }
    let hijos = vistos.get(p.grupo);
    if (!hijos) {
      hijos = [];
      vistos.set(p.grupo, hijos);
      salida.push({ label: GRUPOS[p.grupo][idioma], hijos });
    }
    hijos.push({ ...item, detalle: p.detalle?.[idioma] });
  }
  return salida;
}

/** A qué idioma pertenece una dirección. Todo lo que no cuelgue de /en o /pt
    es español. */
export function idiomaDe(ruta: string): Idioma {
  if (ruta === "/en" || ruta.startsWith("/en/")) return "en";
  if (ruta === "/pt" || ruta.startsWith("/pt/")) return "pt";
  return "es";
}

/** La misma página en otro idioma. Si esa página todavía no existe traducida,
    el inicio de ese idioma, que es mejor que un 404. */
export function rutaEn(idioma: Idioma, rutaActual: string): string {
  const limpia = rutaActual.length > 1 ? rutaActual.replace(/\/+$/, "") : rutaActual;
  const fila = PAGINAS.find((p) =>
    IDIOMAS.some((i) => p.ruta[i] === limpia),
  );
  return fila ? fila.ruta[idioma] : INICIO[idioma];
}

/** Las tres direcciones de una misma página, para el hreflang de los metadatos.
    El x-default apunta al español, que es la versión que reciben los buscadores
    cuando el idioma del visitante no es ninguno de los tres. */
export function alternativas(rutaActual: string): Record<string, string> {
  const salida: Record<string, string> = {};
  for (const i of IDIOMAS) salida[i] = rutaEn(i, rutaActual);
  salida["x-default"] = rutaEn("es", rutaActual);
  return salida;
}
