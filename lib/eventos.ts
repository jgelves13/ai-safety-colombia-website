import snapshot from "./luma-snapshot.json";

/**
 * Eventos de AI Safety Colombia. Dos fuentes:
 *  - el calendario de Luma (`cal-K1XAPsokjf8C20J`), que se lee al construir la
 *    página y se refresca cada hora; si Luma no responde, vale la copia guardada
 *    en `luma-snapshot.json`;
 *  - `EVENTOS_MANUALES`, los de antes de Luma y los que viven en otro
 *    calendario (el de OpenAI está en el del SIMG).
 */

export type Idioma = "es" | "en" | "pt";

export type Tipo = "Charla" | "Cena" | "Panel" | "Conversatorio" | "Taller";

export type Evento = {
  id: string;
  /** ISO en UTC. */
  inicio: string;
  fin: string | null;
  tipo: Tipo;
  titulo: string;
  resumen: Record<Idioma, string> | null;
  lugar: Record<Idioma, string>;
  enLinea: boolean;
  url: string | null;
  inscritos: number | null;
  imagen: string | null;
  destacado: boolean;
  /** Recorte 16:9 del flyer (título y ponentes) para la tarjeta de destacado. */
  portada?: string;
  /** La descripción que el evento tiene en Luma, en español, sin la logística. */
  descripcion?: Parrafo[] | null;
};

/** Un tramo de texto con su negrita y su enlace, como lo escribe el editor de Luma. */
export type Tramo = { texto: string; negrita?: boolean; href?: string };

/** Un párrafo partido en renglones; `rotulo` si es un titulillo corto («Charlas»). */
export type Parrafo = { renglones: Tramo[][]; rotulo?: boolean };

export const LUMA_CALENDARIO = "cal-K1XAPsokjf8C20J";
export const LUMA_PERFIL = "https://luma.com/user/usr-TMDEtNWA1TozP77";
export const LUMA_ICS = `https://api.lu.ma/ics/get?entity=calendar&id=${LUMA_CALENDARIO}`;
export const LUMA_WEBCAL = LUMA_ICS.replace("https://", "webcal://");

const EN_LINEA: Record<Idioma, string> = { es: "En línea", en: "Online", pt: "Online" };

/** Categoría y resumen de los eventos que vienen de Luma, por slug. Lo que no
 *  esté aquí entra como «Charla» sin resumen. */
const LUMA_EXTRAS: Record<string, { tipo?: Tipo; resumen?: Record<Idioma, string>; destacado?: boolean; portada?: string }> = {
  z5akx0st: {
    tipo: "Charla",
    resumen: {
      es: "Primera charla de investigación de la serie mensual: agentes de IA, negociación y supervisión. Quince minutos de presentación y luego preguntas.",
      en: "First research talk of the monthly series: AI agents, negotiation and oversight. Fifteen minutes of presentation, then questions.",
      pt: "Primeira palestra de pesquisa da série mensal: agentes de IA, negociação e supervisão. Quinze minutos de apresentação e depois perguntas.",
    },
  },
  "60o0v4o1": { destacado: true, portada: "/aisc/eventos/destacados/hackeando-agentes.jpg" },
  vb88ho9c: { destacado: true, portada: "/aisc/eventos/destacados/resiliencia-cooperativa.jpg" },
};

const SPRINT_RESUMEN: Record<Idioma, string> = {
  es: "Charla abierta del sprint de investigación de septiembre de 2026, transmitida en línea.",
  en: "Open talk from the September 2026 research sprint, streamed online.",
  pt: "Palestra aberta do sprint de pesquisa de setembro de 2026, transmitida online.",
};

export const EVENTOS_MANUALES: Evento[] = [
  {
    id: "openai-bogota-2026",
    inicio: "2026-08-18T19:00:00.000Z",
    fin: "2026-08-18T23:00:00.000Z",
    tipo: "Conversatorio",
    titulo: "De OpenAI a Bogotá: conversaciones sobre el futuro de la IA",
    resumen: {
      es: "Encuentro presencial organizado con el Semillero de Investigación de Modelos Generativos (SIMG) de la Universidad Nacional.",
      en: "In-person event organized with the Generative Models Research Group (SIMG) at Universidad Nacional.",
      pt: "Encontro presencial organizado com o Grupo de Pesquisa em Modelos Generativos (SIMG) da Universidad Nacional.",
    },
    lugar: { es: "Teusaquillo, Bogotá", en: "Teusaquillo, Bogotá", pt: "Teusaquillo, Bogotá" },
    enLinea: false,
    url: "https://luma.com/04s63gm5",
    inscritos: 217,
    imagen: "https://images.lumacdn.com/uploads/61/5a6733ec-055c-406e-8a73-64a90a1834a2.png",
    destacado: true,
    portada: "/aisc/eventos/destacados/openai-bogota.jpg",
  },
  {
    id: "cena-politica-2026",
    inicio: "2026-04-17T23:00:00.000Z",
    fin: null,
    tipo: "Cena",
    titulo: "Colombia e IA: la política detrás de la tecnología",
    resumen: {
      es: "Cena de diálogo con Viviana Vanegas (consultora TIC de la Unión Europea, ex-directora de Desarrollo Digital del DNP) y Hugo Arenas (asesor del despacho de la Ministra TIC, ex-coordinador del CONPES de IA), sobre cómo se construyó la política nacional de IA de Colombia.",
      en: "Dinner conversation with Viviana Vanegas (ICT consultant for the European Union, former director of Digital Development at the DNP) and Hugo Arenas (adviser to the ICT Minister's office, former coordinator of the AI CONPES), on how Colombia's national AI policy was built.",
      pt: "Jantar de diálogo com Viviana Vanegas (consultora de TIC da União Europeia, ex-diretora de Desenvolvimento Digital do DNP) e Hugo Arenas (assessor do gabinete da Ministra de TIC, ex-coordenador do CONPES de IA), sobre como foi construída a política nacional de IA da Colômbia.",
    },
    lugar: { es: "Restaurante Origen Bistro, Bogotá", en: "Origen Bistro restaurant, Bogotá", pt: "Restaurante Origen Bistro, Bogotá" },
    enLinea: false,
    url: "https://www.instagram.com/aisafetycolombia/p/DXNOo7DljSh/",
    inscritos: null,
    imagen: "/aisc/eventos/cena-politica.jpg",
    destacado: false,
  },
  {
    id: "algoritmo-a-la-ley-2025",
    inicio: "2025-08-15T22:00:00.000Z",
    fin: null,
    tipo: "Charla",
    titulo: "Del algoritmo a la ley: beneficios, riesgos y cómo auditar la IA",
    resumen: {
      es: "Conversatorio sobre los beneficios, riesgos técnicos y efectos legales del uso de la IA, con Catalina Bernal y Melissa Robles (Quantil) y Natalia Alarcón (Posse Herrera Ruiz).",
      en: "Conversation on the benefits, technical risks and legal effects of using AI, with Catalina Bernal and Melissa Robles (Quantil) and Natalia Alarcón (Posse Herrera Ruiz).",
      pt: "Conversa sobre os benefícios, riscos técnicos e efeitos jurídicos do uso da IA, com Catalina Bernal e Melissa Robles (Quantil) e Natalia Alarcón (Posse Herrera Ruiz).",
    },
    lugar: { es: "Salón Aulas 203, Universidad de los Andes", en: "Room Aulas 203, Universidad de los Andes", pt: "Sala Aulas 203, Universidad de los Andes" },
    enLinea: false,
    url: "https://www.instagram.com/aisafetycolombia/p/DNOyrukPEnp/",
    inscritos: null,
    imagen: "/aisc/eventos/algoritmo-a-la-ley.jpg",
    destacado: false,
  },
  {
    id: "connect-latam-2025",
    inicio: "2025-05-30T14:00:00.000Z",
    fin: null,
    tipo: "Conversatorio",
    titulo: "AI Safety Connect: Latinoamérica y más allá",
    resumen: {
      es: "Discusión en línea con Luis E. Urtubey (Good Judgement) sobre gobernanza de IA en Brasil y Nikolaus Howe (Mila / FAR AI) sobre cómo el escalamiento de modelos afecta la seguridad de la IA. En inglés.",
      en: "Online discussion with Luis E. Urtubey (Good Judgement) on AI governance in Brazil and Nikolaus Howe (Mila / FAR AI) on how model scaling affects AI safety. In English.",
      pt: "Discussão online com Luis E. Urtubey (Good Judgement) sobre governança de IA no Brasil e Nikolaus Howe (Mila / FAR AI) sobre como a escala dos modelos afeta a segurança da IA. Em inglês.",
    },
    lugar: EN_LINEA,
    enLinea: true,
    url: "https://www.instagram.com/aisafetycolombia/p/DKIQoQhvoQN/",
    inscritos: null,
    imagen: "/aisc/eventos/connect-latam.jpg",
    destacado: false,
  },
  {
    id: "cena-juan-david-2025",
    inicio: "2025-03-07T22:30:00.000Z",
    fin: null,
    tipo: "Cena",
    titulo: "Cena con Juan David Gutiérrez",
    resumen: {
      es: "Cena de diálogo con Juan David Gutiérrez, profesor de la Escuela de Gobierno de Uniandes, PhD de Oxford y miembro del Global Partnership on AI, sobre regulación de la IA y política pública.",
      en: "Dinner conversation with Juan David Gutiérrez, professor at the Uniandes School of Government, Oxford PhD and member of the Global Partnership on AI, on AI regulation and public policy.",
      pt: "Jantar de diálogo com Juan David Gutiérrez, professor da Escola de Governo da Uniandes, PhD por Oxford e membro da Global Partnership on AI, sobre regulação da IA e política pública.",
    },
    lugar: { es: "Restaurante Mangiamo, Bogotá", en: "Mangiamo restaurant, Bogotá", pt: "Restaurante Mangiamo, Bogotá" },
    enLinea: false,
    url: "https://www.instagram.com/aisafetycolombia/p/DGysBZPvyUb/",
    inscritos: null,
    imagen: "/aisc/eventos/cena-juan-david.jpg",
    destacado: false,
  },
  {
    id: "panel-gobernanza-2024",
    inicio: "2024-11-08T23:00:00.000Z",
    fin: null,
    tipo: "Panel",
    titulo: "Gobernanza de la inteligencia artificial en Colombia",
    resumen: {
      es: "Panel sobre el desarrollo ético y responsable de la IA en Colombia, con María Antonia Carvajal (IN SITU), María Paula Mujica (UNDP) y Valeria Soler (Women in AI).",
      en: "Panel on the ethical and responsible development of AI in Colombia, with María Antonia Carvajal (IN SITU), María Paula Mujica (UNDP) and Valeria Soler (Women in AI).",
      pt: "Painel sobre o desenvolvimento ético e responsável da IA na Colômbia, com María Antonia Carvajal (IN SITU), María Paula Mujica (UNDP) e Valeria Soler (Women in AI).",
    },
    lugar: { es: "Salón ML-510, Universidad de los Andes", en: "Room ML-510, Universidad de los Andes", pt: "Sala ML-510, Universidad de los Andes" },
    enLinea: false,
    url: "https://www.instagram.com/aisafetycolombia/p/DCAiVLnvGpN/",
    inscritos: null,
    imagen: "/aisc/eventos/panel-gobernanza.jpg",
    destacado: true,
    portada: "/aisc/eventos/destacados/gobernanza.jpg",
  },
  {
    id: "cena-maria-paula-2024",
    inicio: "2024-10-07T23:00:00.000Z",
    fin: null,
    tipo: "Cena",
    titulo: "Cena con María Paula Mujica",
    resumen: {
      es: "Cena de diálogo con María Paula Mujica, asesora de políticas de IA en el UNDP y autora del Marco Ético para la Inteligencia Artificial en Colombia.",
      en: "Dinner conversation with María Paula Mujica, AI policy adviser at UNDP and author of Colombia's Ethical Framework for Artificial Intelligence.",
      pt: "Jantar de diálogo com María Paula Mujica, assessora de políticas de IA no UNDP e autora do Marco Ético para a Inteligência Artificial na Colômbia.",
    },
    lugar: { es: "Crepes & Waffles, Bogotá", en: "Crepes & Waffles, Bogotá", pt: "Crepes & Waffles, Bogotá" },
    enLinea: false,
    url: "https://www.instagram.com/aisafetycolombia/p/DAttjF_Ro76/",
    inscritos: null,
    imagen: null,
    destacado: false,
  },
  {
    id: "superinteligencia-2024",
    inicio: "2024-09-20T23:00:00.000Z",
    fin: null,
    tipo: "Charla",
    titulo: "El valor de la humanidad ante la superinteligencia artificial",
    resumen: {
      es: "Charla con Said Saillant, PhD en Filosofía del MIT e investigador postdoctoral en Harvard, sobre los dilemas éticos del desarrollo de superinteligencias.",
      en: "Talk by Said Saillant, MIT PhD in Philosophy and postdoctoral researcher at Harvard, on the ethical dilemmas of developing superintelligence.",
      pt: "Palestra com Said Saillant, PhD em Filosofia pelo MIT e pesquisador de pós-doutorado em Harvard, sobre os dilemas éticos do desenvolvimento de superinteligências.",
    },
    lugar: { es: "Universidad de los Andes", en: "Universidad de los Andes", pt: "Universidad de los Andes" },
    enLinea: false,
    url: "https://www.instagram.com/aisafetycolombia/p/C_0sc3mOlfX/",
    inscritos: null,
    imagen: null,
    destacado: false,
  },
];

type LumaEntry = {
  api_id: string;
  slug: string;
  name: string;
  start_at: string;
  end_at: string | null;
  location_type: string | null;
  city: string | null;
  cover_url: string | null;
  guest_count: number | null;
  /** El documento de ProseMirror de la descripción (`description_mirror`). */
  descripcion?: NodoProse | null;
};

type NodoProse = {
  type: string;
  text?: string;
  marks?: { type: string; attrs?: { href?: string } }[];
  content?: NodoProse[];
};

/* Lo que Luma pone al final para la logística («📅 Miércoles 7 de octubre»,
   «Organiza AI Safety Colombia.») ya está en la fila del evento. */
const LOGISTICA = /^(\p{Extended_Pictographic}|Organizan?\b)/u;

/** Los tramos de un nodo de texto en línea, partidos en renglones por los saltos. */
function renglones(nodo: NodoProse, salida: Tramo[][] = [[]]): Tramo[][] {
  for (const hijo of nodo.content ?? []) {
    if (hijo.type === "hard_break") salida.push([]);
    else if (hijo.type === "text" && hijo.text) {
      const marcas = hijo.marks ?? [];
      salida[salida.length - 1].push({
        texto: hijo.text,
        negrita: marcas.some((m) => m.type === "bold") || undefined,
        href: marcas.find((m) => m.type === "link")?.attrs?.href,
      });
    } else renglones(hijo, salida);
  }
  return salida;
}

/** El comienzo de la descripción de Luma, sin renglones vacíos ni logística. */
function descripcion(doc: NodoProse | null | undefined): Parrafo[] | null {
  const parrafos: Parrafo[] = [];
  const recorrer = (nodo: NodoProse) => {
    if (nodo.type === "paragraph" || nodo.type === "heading") {
      const lineas = renglones(nodo)
        .map((r) => r.filter((t) => t.texto.trim()))
        .filter((r) => r.length && !LOGISTICA.test(r[0].texto.trim()));
      if (!lineas.length) return;
      const plano = lineas.map((r) => r.map((t) => t.texto).join("")).join(" ").trim();
      const rotulo = nodo.type === "heading" || (lineas.length === 1 && plano.length <= 40 && !/[.?!:;,]$/.test(plano));
      parrafos.push({ renglones: lineas, rotulo: rotulo || undefined });
    } else (nodo.content ?? []).forEach(recorrer);
  };
  if (doc) recorrer(doc);
  /* Basta el arranque: los dos primeros párrafos de prosa, que en Luma son el
     planteamiento. Lo demás (ponentes, programa) queda en «Ver en Luma». */
  const fin = parrafos.findIndex((p) => p.rotulo || p.renglones.length > 1);
  const resumen = parrafos.slice(0, fin === -1 ? parrafos.length : fin).slice(0, 2);
  return resumen.length ? resumen : null;
}

function desdeLuma(e: LumaEntry): Evento {
  const extra = LUMA_EXTRAS[e.slug] ?? {};
  const enLinea = e.location_type !== "offline";
  const ciudad = e.city ?? "Bogotá";
  const esSprint = e.start_at.startsWith("2026-09-12") || e.start_at.startsWith("2026-09-13");
  return {
    id: `luma-${e.slug}`,
    inicio: e.start_at,
    fin: e.end_at,
    tipo: extra.tipo ?? "Charla",
    titulo: e.name,
    resumen: extra.resumen ?? (esSprint ? SPRINT_RESUMEN : null),
    lugar: enLinea ? EN_LINEA : { es: ciudad, en: ciudad, pt: ciudad },
    enLinea,
    url: `https://luma.com/${e.slug}`,
    inscritos: e.guest_count,
    imagen: e.cover_url,
    destacado: extra.destacado ?? false,
    portada: extra.portada,
    descripcion: descripcion(e.descripcion),
  };
}

type LumaApiEntry = {
  event: {
    api_id: string;
    url: string;
    name: string;
    start_at: string;
    end_at: string | null;
    location_type: string | null;
    cover_url: string | null;
    geo_address_info: { city?: string | null } | null;
  };
  guest_count: number | null;
};

async function leerLuma(periodo: "past" | "future"): Promise<LumaEntry[]> {
  const url = `https://api.lu.ma/calendar/get-items?calendar_api_id=${LUMA_CALENDARIO}&period=${periodo}&pagination_limit=50`;
  const res = await fetch(url, { next: { revalidate: 3600 }, headers: { "user-agent": "Mozilla/5.0 aisafetycolombia.org" } });
  if (!res.ok) throw new Error(`Luma ${periodo}: ${res.status}`);
  const data = (await res.json()) as { entries: LumaApiEntry[] };
  return data.entries.map(({ event, guest_count }) => ({
    api_id: event.api_id,
    slug: event.url,
    name: event.name,
    start_at: event.start_at,
    end_at: event.end_at,
    location_type: event.location_type,
    city: event.geo_address_info?.city ?? null,
    cover_url: event.cover_url,
    guest_count,
  }));
}

/** La descripción vive en la ficha de cada evento, no en el listado del calendario. */
async function leerDescripcion(apiId: string): Promise<NodoProse | null> {
  const res = await fetch(`https://api.lu.ma/event/get?event_api_id=${apiId}`, {
    next: { revalidate: 3600 },
    headers: { "user-agent": "Mozilla/5.0 aisafetycolombia.org" },
  });
  if (!res.ok) throw new Error(`Luma ${apiId}: ${res.status}`);
  return ((await res.json()) as { description_mirror?: NodoProse | null }).description_mirror ?? null;
}

/** Todos los eventos, de Luma y manuales, del más reciente al más viejo. */
export async function cargarEventos(): Promise<Evento[]> {
  const copia = snapshot.entries as LumaEntry[];
  let luma: LumaEntry[];
  try {
    const [futuros, pasados] = await Promise.all([leerLuma("future"), leerLuma("past")]);
    luma = await Promise.all(
      [...futuros, ...pasados].map(async (e) => ({
        ...e,
        descripcion: await leerDescripcion(e.api_id).catch(() => copia.find((c) => c.slug === e.slug)?.descripcion ?? null),
      })),
    );
  } catch {
    luma = copia;
  }
  const todos = [...luma.map(desdeLuma), ...EVENTOS_MANUALES];
  todos.sort((a, b) => b.inicio.localeCompare(a.inicio));
  return todos;
}

export function partirEventos(eventos: Evento[], ahora = new Date()) {
  const corte = ahora.toISOString();
  const proximos = eventos.filter((e) => (e.fin ?? e.inicio) >= corte).sort((a, b) => a.inicio.localeCompare(b.inicio));
  const pasados = eventos.filter((e) => (e.fin ?? e.inicio) < corte);
  return { proximos, pasados };
}

const LOCALES: Record<Idioma, string> = { es: "es-CO", en: "en-US", pt: "pt-BR" };
const ZONA = "America/Bogota";

/** «mié 7 oct» / «Wed, Oct 7» / «qua, 7 de out». */
export function fechaCorta(iso: string, idioma: Idioma) {
  return new Intl.DateTimeFormat(LOCALES[idioma], { weekday: "short", day: "numeric", month: "short", timeZone: ZONA }).format(new Date(iso));
}

/** «7 de octubre de 2026». */
export function fechaLarga(iso: string, idioma: Idioma) {
  return new Intl.DateTimeFormat(LOCALES[idioma], { day: "numeric", month: "long", year: "numeric", timeZone: ZONA }).format(new Date(iso));
}

/** «6:00 p. m.» / «6:00 PM» / «18:00». */
export function hora(iso: string, idioma: Idioma) {
  return new Intl.DateTimeFormat(LOCALES[idioma], { hour: "numeric", minute: "2-digit", timeZone: ZONA }).format(new Date(iso));
}

export function anio(iso: string) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: ZONA }).format(new Date(iso));
}
