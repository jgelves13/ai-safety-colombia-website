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
  destacado?: boolean;
};

type Grupo = "participa" | "aprende";

const GRUPOS: Record<Grupo, Record<Idioma, string>> = {
  participa: { es: "Participa", en: "Get Involved", pt: "Participe" },
  aprende: { es: "Aprende", en: "Learn", pt: "Aprenda" },
};

/* El orden es el del menú:
   1. Participa (Hackatón [destacado], Seminario técnico, Seminario futuro)
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
    nav: { es: "Hackatón de Aceleración Defensiva", en: "Defensive Acceleration Hackathon", pt: "Hackathon de Aceleração Defensiva" },
    grupo: "participa",
    detalle: { es: "14 nov · Presencial Uniandes · COP 3.000.000+ en premios", en: "Nov 14 · In person Uniandes · COP 3,000,000+ in prizes", pt: "14 nov · Presencial Uniandes · COP 3.000.000+ em prêmios" },
    destacado: true,
  },
  {
    ruta: {
      es: "/seminarios/tecnico",
      en: "/en/seminars/technical",
      pt: "/pt/seminarios/tecnico",
    },
    nav: { es: "Seminario técnico de seguridad de la IA", en: "Technical AI Safety Seminar", pt: "Seminário técnico de segurança da IA" },
    grupo: "participa",
    detalle: { es: "Curso intensivo en español de BlueDot Impact", en: "Intensive course in Spanish from BlueDot Impact", pt: "Curso intensivo em espanhol da BlueDot Impact" },
  },
  {
    ruta: { es: "/seminarios/futuro-y-riesgos", en: "/en/seminars/future-and-risks", pt: "/pt/seminarios/futuro-e-riscos" },
    nav: { es: "Seminario de futuro y riesgos de la IA", en: "Seminar on the Future and Risks of AI", pt: "Seminário de futuro e riscos da IA" },
    grupo: "participa",
    detalle: { es: "Gobernanza y estrategia de IA avanzada", en: "Governance and strategy for advanced AI", pt: "Governança e estratégia de IA avançada" },
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
    nav: { es: "Recursos de estudio", en: "Study resources", pt: "Recursos de estudo" },
    grupo: "aprende",
    detalle: { es: "Lecturas, videos, libros y cursos", en: "Readings, videos, books and courses", pt: "Leituras, vídeos, livros e cursos" },
  },
  {
    ruta: { es: "/oportunidades", en: "/en/opportunities", pt: "/pt/oportunidades" },
    nav: { es: "Oportunidades globales", en: "Global opportunities", pt: "Oportunidades globais" },
    grupo: "aprende",
    detalle: { es: "Becas, bootcamps y convocatorias", en: "Fellowships, bootcamps and grants", pt: "Bolsas, bootcamps e chamadas" },
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
    ruta: { es: "/seguridad-de-la-ia", en: "/en/ai-safety", pt: "/pt/seguranca-da-ia" },
  },
  {
    ruta: { es: "/sprint", en: "/en/sprint", pt: "/pt/sprint" },
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
    href: p.ruta[idioma],
    label: p.nav![idioma],
  }));
}

export type EntradaMenu =
  | { href: string; label: string }
  | { label: string; hijos: { href: string; label: string; detalle?: string; destacado?: boolean }[] };

/** El menú del encabezado: las páginas de un mismo grupo van juntas en un
    submenú, en el lugar de la primera. */
export function menuAgrupado(idioma: Idioma): EntradaMenu[] {
  const salida: EntradaMenu[] = [];
  const vistos = new Map<Grupo, { href: string; label: string; detalle?: string; destacado?: boolean }[]>();
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
    hijos.push({ ...item, detalle: p.detalle?.[idioma], destacado: p.destacado });
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
