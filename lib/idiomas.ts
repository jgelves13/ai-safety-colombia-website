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
  /** La página y sus tres direcciones. Una entrada de menú que no es una
      página propia (un ancla dentro de otra) no la lleva: usa `enlace`. */
  ruta?: Record<Idioma, string>;
  enlace?: Record<Idioma, string>;
  /** Si la página está en el menú, cómo se llama en cada idioma. */
  nav?: Record<Idioma, string>;
  /** Si va dentro de un submenú del encabezado, cuál, en qué sección de ese
      submenú y la línea que la describe ahí. El pie la muestra suelta, como
      las demás. */
  grupo?: Grupo;
  seccion?: Seccion;
  detalle?: Record<Idioma, string>;
};

type Grupo = "programas" | "aprende";

const GRUPOS: Record<Grupo, Record<Idioma, string>> = {
  programas: { es: "Programas", en: "Programs", pt: "Programas" },
  aprende: { es: "Aprende", en: "Learn", pt: "Aprenda" },
};

type Seccion = "hackatones" | "seminarios";

const SECCIONES: Record<Seccion, Record<Idioma, string>> = {
  hackatones: { es: "Hackatones", en: "Hackathons", pt: "Hackathons" },
  seminarios: { es: "Seminarios", en: "Seminars", pt: "Seminários" },
};

/* El orden es el del menú:
   1. Programas, como el de Apart: los tres hackatones, del más reciente al
      primero, y los dos seminarios
   2. Eventos
   3. Investigación
   4. Aprende (Recursos, Oportunidades)
   5. Únete
   6. ¿Quiénes somos? */
export const PAGINAS: Pagina[] = [
  {
    ruta: { es: "/", en: "/en", pt: "/pt" },
  },
  {
    ruta: { es: "/defacchackathon", en: "/en/defacchackathon", pt: "/pt/defacchackathon" },
    nav: {
      es: "Defensive Acceleration Hackathon",
      en: "Defensive Acceleration Hackathon",
      pt: "Defensive Acceleration Hackathon",
    },
    grupo: "programas",
    seccion: "hackatones",
    detalle: {
      es: "Bogotá, noviembre de 2026",
      en: "Bogotá, November 2026",
      pt: "Bogotá, novembro de 2026",
    },
  },
  {
    ruta: { es: "/sprint", en: "/en/sprint", pt: "/pt/sprint" },
    nav: {
      es: "AI Incident Response Sprint",
      en: "AI Incident Response Sprint",
      pt: "AI Incident Response Sprint",
    },
    grupo: "programas",
    seccion: "hackatones",
    detalle: {
      es: "Con Apart Research y CeSIA, septiembre de 2026",
      en: "With Apart Research and CeSIA, September 2026",
      pt: "Com Apart Research e CeSIA, setembro de 2026",
    },
  },
  {
    enlace: {
      es: "/investigacion#hackathons",
      en: "/en/research#hackathons",
      pt: "/pt/pesquisa#hackathons",
    },
    nav: {
      es: "Global South AI Safety Hackathon",
      en: "Global South AI Safety Hackathon",
      pt: "Global South AI Safety Hackathon",
    },
    grupo: "programas",
    seccion: "hackatones",
    detalle: {
      es: "Bogotá, junio de 2026",
      en: "Bogotá, June 2026",
      pt: "Bogotá, junho de 2026",
    },
  },
  {
    ruta: {
      es: "/seminarios/tecnico",
      en: "/en/seminars/technical",
      pt: "/pt/seminarios/tecnico",
    },
    nav: { es: "Seminario técnico", en: "Technical Seminar", pt: "Seminário técnico" },
    grupo: "programas",
    seccion: "seminarios",
    detalle: {
      es: "Seis semanas: alineación, evaluaciones e interpretabilidad",
      en: "Six weeks: alignment, evaluations and interpretability",
      pt: "Seis semanas: alinhamento, avaliações e interpretabilidade",
    },
  },
  {
    ruta: { es: "/seminarios/futuro-y-riesgos", en: "/en/seminars/future-and-risks", pt: "/pt/seminarios/futuro-e-riscos" },
    nav: { es: "Seminario futuro y riesgos", en: "Future & Risks Seminar", pt: "Seminário futuro e riscos" },
    grupo: "programas",
    seccion: "seminarios",
    detalle: {
      es: "Cinco semanas sobre hacia dónde va la IA avanzada",
      en: "Five weeks on where advanced AI is heading",
      pt: "Cinco semanas sobre para onde vai a IA avançada",
    },
  },
  {
    ruta: { es: "/eventos", en: "/en/events", pt: "/pt/eventos" },
    nav: { es: "Eventos", en: "Events", pt: "Eventos" },
  },
  {
    ruta: { es: "/investigacion", en: "/en/research", pt: "/pt/pesquisa" },
    nav: { es: "Investigación", en: "Research", pt: "Pesquisa" },
  },
  {
    ruta: { es: "/recursos", en: "/en/resources", pt: "/pt/recursos" },
    nav: { es: "Recursos", en: "Resources", pt: "Recursos" },
    grupo: "aprende",
  },
  {
    ruta: { es: "/oportunidades", en: "/en/opportunities", pt: "/pt/oportunidades" },
    nav: { es: "Oportunidades", en: "Opportunities", pt: "Oportunidades" },
    grupo: "aprende",
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
    ruta: { es: "/defacchackathon/aplicar", en: "/en/defacchackathon/apply", pt: "/pt/defacchackathon/inscricao" },
  },
  {
    ruta: { es: "/defacchackathon/entregar", en: "/en/defacchackathon/submit", pt: "/pt/defacchackathon/entrega" },
  },
  {
    ruta: { es: "/seguridad-de-la-ia", en: "/en/ai-safety", pt: "/pt/seguranca-da-ia" },
  },
  {
    ruta: { es: "/sprint/aplicar", en: "/en/sprint/apply", pt: "/pt/sprint/inscricao" },
  },
  {
    ruta: { es: "/seminarios/aplicar", en: "/en/seminars/apply", pt: "/pt/seminarios/inscricao" },
  },
  {
    ruta: {
      es: "/sprint/aplicar/recomendacion",
      en: "/en/sprint/apply/referral",
      pt: "/pt/sprint/inscricao/indicacao",
    },
  },
  {
    ruta: { es: "/privacidad", en: "/en/privacy", pt: "/pt/privacidade" },
  },
];

/** Las entradas del menú, ya en el idioma que se pida. */
export function menu(idioma: Idioma): { href: string; label: string }[] {
  return PAGINAS.filter((p) => p.nav).map((p) => ({
    href: (p.enlace ?? p.ruta)![idioma],
    label: p.nav![idioma],
  }));
}

export type HijoMenu = { href: string; label: string; detalle?: string; seccion?: string };

export type EntradaMenu = { href: string; label: string } | { label: string; hijos: HijoMenu[] };

/** El menú del encabezado: las páginas de un mismo grupo van juntas en un
    submenú, en el lugar de la primera, cada una con el nombre de su sección. */
export function menuAgrupado(idioma: Idioma): EntradaMenu[] {
  const salida: EntradaMenu[] = [];
  const vistos = new Map<Grupo, HijoMenu[]>();
  for (const p of PAGINAS) {
    if (!p.nav) continue;
    const item = { href: (p.enlace ?? p.ruta)![idioma], label: p.nav[idioma] };
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
    hijos.push({
      ...item,
      detalle: p.detalle?.[idioma],
      seccion: p.seccion ? SECCIONES[p.seccion][idioma] : undefined,
    });
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
  const fila = PAGINAS.find((p) => p.ruta && IDIOMAS.some((i) => p.ruta![i] === limpia));
  return fila?.ruta ? fila.ruta[idioma] : INICIO[idioma];
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
