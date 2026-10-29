import { FOCO, LINK, TENUE } from "@/components/eventos-estilos";
import { ANCHO, Icono as IconoSvg, type Icono } from "@/components/oportunidades-iconos";
import OportunidadesListado, { type Detalle, type Faceta, type ProgramaVista, type TextosListado } from "@/components/oportunidades-listado";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import type { Idioma } from "@/lib/idiomas";
import { FUENTE, type Programa, actualizado, cargarOportunidades } from "@/lib/oportunidades";
import traducciones from "@/lib/oportunidades-traducciones.json";

/* La página de oportunidades en los tres idiomas, calcada de
   aisafety.com/training: mismas secciones, filtros, tarjetas y orden, con los
   colores y letras del sitio. Todo va en el idioma de la página, también las
   descripciones de los programas, traducidas aparte. */

const LOCALES: Record<Idioma, string> = { es: "es-CO", en: "en-GB", pt: "pt-BR" };

const AIRTABLE = {
  agregar: {
    upcoming: "https://airtable.com/appF8XfZUGXtfi40E/pagSB4ucUn38CvXFD/form",
    recurring: "https://airtable.com/appF8XfZUGXtfi40E/pagMXYNesOJse9Ga0/form",
  },
  corregir: "https://airtable.com/appF8XfZUGXtfi40E/pagndDvdya1DSqoxN/form",
  datos: {
    upcoming: "https://airtable.com/appF8XfZUGXtfi40E/shrripC3ZUNDHqZkU/tbli1YSCpIuNY2DvL?viewControls=on",
    recurring: "https://airtable.com/appF8XfZUGXtfi40E/shrjEwxwchrKPvnDO/tblEEIbj6dW5oS4cX?viewControls=on",
  },
};

type Textos = {
  titulo: string;
  descripcion: string;
  intro: [string, string];
  eventos: [string, string];
  boletin: [string, string];
  credito: (hace: string) => [string, string];
  fechas: {
    empieza: (x: string) => string;
    el: (x: string) => string;
    meses: (n: number) => string;
    anios: (n: number) => string;
    semanas: (n: number) => string;
    dias: (n: number) => string;
  };
  meta: {
    nivel: (x: string) => string;
    enfoque: (x: string) => string;
    aunNo: string;
    hasta: (x: string) => string;
    cerradas: string;
  };
  destacado: (tipo: string | null) => string;
  contribuir: { titulo: string; agregar: string; corregir: string; datos: string; pasados: string };
  listado: TextosListado;
};

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

export const TEXTOS: Record<Idioma, Textos> = {
  es: {
    titulo: "Oportunidades",
    descripcion:
      "Becas, bootcamps y cursos de seguridad de la IA en todo el mundo, en línea y presenciales, con sus fechas y convocatorias. Listado de AISafety.com.",
    intro: ["Becas, bootcamps y cursos", " de seguridad de la IA para formarte y construir tu carrera. En línea y presenciales."],
    eventos: ["Para conferencias, charlas, talleres y más, ve a ", "Eventos"],
    boletin: ["Recibe cada semana un resumen de los programas nuevos en AISafety.com.", "Suscríbete en AISafety.com"],
    credito: (hace) => [`Actualizado ${hace} · Listado de `, "."],
    fechas: {
      empieza: (x) => `Empieza ${x}`,
      el: (x) => `el ${x}`,
      meses: (n) => plural(n, "mes", "meses"),
      anios: (n) => plural(n, "año", "años"),
      semanas: (n) => plural(n, "semana", "semanas"),
      dias: (n) => plural(n, "día", "días"),
    },
    meta: {
      nivel: (x) => `Nivel de entrada: ${x}`,
      enfoque: (x) => `Enfoque: ${x}`,
      aunNo: "Convocatoria aún no abierta",
      hasta: (x) => `Postula hasta el ${x}`,
      cerradas: "Convocatoria cerrada",
    },
    destacado: (tipo) =>
      ({ Fellowship: "Beca destacada", Course: "Curso destacado", Bootcamp: "Bootcamp destacado", "Immersive workshop": "Taller inmersivo destacado" })[tipo ?? ""] ??
      "Programa destacado",
    contribuir: {
      titulo: "Contribuye a este listado",
      agregar: "Agregar un programa",
      corregir: "Sugerir una corrección",
      datos: "Ver los datos en Airtable",
      pasados: "(incluye programas pasados)",
    },
    listado: {
      pestanas: { upcoming: "Próximos", recurring: "Recurrentes" },
      facetas: {
        applications: "Convocatoria",
        type: "Tipo",
        focus: "Enfoque",
        entryBar: "Nivel de entrada",
        stipend: "Apoyo económico",
        length: "Duración",
        location: "Modalidad",
      },
      opciones: {
        Open: "Abierta",
        Closed: "Cerrada",
        Fellowship: "Beca",
        Course: "Curso",
        Bootcamp: "Bootcamp",
        "Immersive workshop": "Taller inmersivo",
        Other: "Otro",
        General: "General",
        Technical: "Técnico",
        Governance: "Gobernanza",
        Low: "Bajo",
        Mid: "Medio",
        High: "Alto",
        "No stipend": "Sin apoyo económico",
        "Expenses covered": "Gastos cubiertos",
        "Stipend included": "Con estipendio",
        "Under 1 month": "Menos de 1 mes",
        "1–3 months": "1–3 meses",
        "3+ months": "Más de 3 meses",
        Online: "En línea",
        "In person": "Presencial",
        Hybrid: "Híbrido",
        "Full-time": "Tiempo completo",
        "Part-time": "Medio tiempo",
      },
      limpiar: "Quitar filtros",
      conteo: { upcoming: ["{n} programa próximo", "{n} programas próximos"], recurring: ["{n} programa recurrente", "{n} programas recurrentes"] },
      grupos: { open: "Convocatoria abierta", notYetOpen: "Convocatoria aún no abierta", closed: "Convocatoria cerrada" },
      sinResultados: "No hay resultados con estos filtros. Prueba a ajustarlos.",
      sinProgramas: { upcoming: "No hay programas próximos por ahora.", recurring: "No hay programas recurrentes por ahora." },
      destacados: "Destacados",
    },
  },
  en: {
    titulo: "Opportunities",
    descripcion:
      "AI safety fellowships, bootcamps and courses worldwide, online and in person, with dates and application deadlines. Listing from AISafety.com.",
    intro: ["Fellowships, bootcamps, and courses", " in AI safety to upskill and build career capital. Both online and in person."],
    eventos: ["For conferences, talks, workshops, and more go to ", "Events"],
    boletin: ["Get a weekly summary of all new training programs on AISafety.com.", "Subscribe on AISafety.com"],
    credito: (hace) => [`Updated ${hace} · Listing from `, "."],
    fechas: {
      empieza: (x) => `Starts ${x}`,
      el: (x) => `on ${x}`,
      meses: (n) => plural(n, "month", "months"),
      anios: (n) => plural(n, "year", "years"),
      semanas: (n) => plural(n, "week", "weeks"),
      dias: (n) => plural(n, "day", "days"),
    },
    meta: {
      nivel: (x) => `Entry bar: ${x}`,
      enfoque: (x) => `Focus: ${x}`,
      aunNo: "Applications not yet open",
      hasta: (x) => `Apply by ${x}`,
      cerradas: "Applications closed",
    },
    destacado: (tipo) => `Featured ${(tipo ?? "program").toLowerCase()}`,
    contribuir: {
      titulo: "Contribute to this page",
      agregar: "Add a program",
      corregir: "Suggest a correction",
      datos: "View data in Airtable",
      pasados: "(includes past programs)",
    },
    listado: {
      pestanas: { upcoming: "Upcoming", recurring: "Recurring" },
      facetas: {
        applications: "Applications",
        type: "Type",
        focus: "Focus",
        entryBar: "Entry bar",
        stipend: "Stipend",
        length: "Length",
        location: "Location",
      },
      opciones: {},
      limpiar: "Clear filters",
      conteo: { upcoming: ["{n} upcoming training program", "{n} upcoming training programs"], recurring: ["{n} recurring training program", "{n} recurring training programs"] },
      grupos: { open: "Applications open", notYetOpen: "Applications not yet open", closed: "Applications closed" },
      sinResultados: "No results found based on these filters. Try adjusting them.",
      sinProgramas: { upcoming: "No upcoming training programs right now.", recurring: "No recurring training programs right now." },
      destacados: "Featured",
    },
  },
  pt: {
    titulo: "Oportunidades",
    descripcion:
      "Bolsas, bootcamps e cursos de segurança da IA no mundo todo, online e presenciais, com datas e prazos de inscrição. Lista do AISafety.com.",
    intro: ["Bolsas, bootcamps e cursos", " de segurança da IA para se capacitar e construir sua carreira. Online e presenciais."],
    eventos: ["Para conferências, palestras, oficinas e mais, vá para ", "Eventos"],
    boletin: ["Receba toda semana um resumo dos novos programas no AISafety.com.", "Inscreva-se no AISafety.com"],
    credito: (hace) => [`Atualizado ${hace} · Lista do `, "."],
    fechas: {
      empieza: (x) => `Começa ${x}`,
      el: (x) => `em ${x}`,
      meses: (n) => plural(n, "mês", "meses"),
      anios: (n) => plural(n, "ano", "anos"),
      semanas: (n) => plural(n, "semana", "semanas"),
      dias: (n) => plural(n, "dia", "dias"),
    },
    meta: {
      nivel: (x) => `Nível de entrada: ${x}`,
      enfoque: (x) => `Foco: ${x}`,
      aunNo: "Inscrições ainda não abertas",
      hasta: (x) => `Inscrições até ${x}`,
      cerradas: "Inscrições encerradas",
    },
    destacado: (tipo) =>
      ({ Fellowship: "Bolsa em destaque", Course: "Curso em destaque", Bootcamp: "Bootcamp em destaque", "Immersive workshop": "Oficina imersiva em destaque" })[tipo ?? ""] ??
      "Programa em destaque",
    contribuir: {
      titulo: "Contribua com esta lista",
      agregar: "Adicionar um programa",
      corregir: "Sugerir uma correção",
      datos: "Ver os dados no Airtable",
      pasados: "(inclui programas anteriores)",
    },
    listado: {
      pestanas: { upcoming: "Próximos", recurring: "Recorrentes" },
      facetas: {
        applications: "Inscrições",
        type: "Tipo",
        focus: "Foco",
        entryBar: "Nível de entrada",
        stipend: "Apoio financeiro",
        length: "Duração",
        location: "Modalidade",
      },
      opciones: {
        Open: "Abertas",
        Closed: "Encerradas",
        Fellowship: "Bolsa",
        Course: "Curso",
        Bootcamp: "Bootcamp",
        "Immersive workshop": "Oficina imersiva",
        Other: "Outro",
        General: "Geral",
        Technical: "Técnico",
        Governance: "Governança",
        Low: "Baixo",
        Mid: "Médio",
        High: "Alto",
        "No stipend": "Sem apoio financeiro",
        "Expenses covered": "Despesas cobertas",
        "Stipend included": "Com bolsa-auxílio",
        "Under 1 month": "Menos de 1 mês",
        "1–3 months": "1–3 meses",
        "3+ months": "Mais de 3 meses",
        Online: "Online",
        "In person": "Presencial",
        Hybrid: "Híbrido",
        "Full-time": "Tempo integral",
        "Part-time": "Meio período",
      },
      limpiar: "Limpar filtros",
      conteo: { upcoming: ["{n} programa próximo", "{n} programas próximos"], recurring: ["{n} programa recorrente", "{n} programas recorrentes"] },
      grupos: { open: "Inscrições abertas", notYetOpen: "Inscrições ainda não abertas", closed: "Inscrições encerradas" },
      sinResultados: "Nenhum resultado com esses filtros. Tente ajustá-los.",
      sinProgramas: { upcoming: "Nenhum programa próximo no momento.", recurring: "Nenhum programa recorrente no momento." },
      destacados: "Destaques",
    },
  },
};

/* «4 Jan 2027», «4 ene 2027», «4 jan 2027», en UTC como AISafety.com. */
function fecha(iso: string, idioma: Idioma) {
  const d = new Date(`${iso.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALES[idioma], { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    .format(d)
    .replace(/ de /g, " ")
    .replace(/\./g, "");
}

/* Los datos llegan en inglés; lo que se puede traducir sin ayuda (meses,
   duraciones, países y ciudades) se traduce acá, y las descripciones salen de
   oportunidades-traducciones.json mientras su inglés siga siendo el mismo. Un
   programa nuevo o reescrito en AISafety.com se ve en inglés hasta que se
   vuelva a traducir. */
const MESES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MESES: Record<"es" | "pt", string[]> = {
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  pt: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
};

const DESCRIPCIONES = traducciones as Record<string, { en: string; es?: string; pt?: string }>;

function descripcion(p: Programa, idioma: Idioma) {
  if (idioma === "en" || !p.description) return p.description;
  const t = DESCRIPCIONES[p.id];
  return t && t.en === p.description && t[idioma] ? t[idioma]! : p.description;
}

/* «January 2027», «in April 2027», «early 2027», «beginning of October 2026»: ya con su preposición, «en enero de 2027». */
function inicioAprox(x: string, idioma: Idioma) {
  if (idioma === "en") return x;
  const meses = MESES[idioma];
  const mes = (m: string) => {
    const i = MESES_EN.findIndex((n) => n.toLowerCase() === m.toLowerCase());
    return i < 0 ? null : meses[i];
  };
  const en = idioma === "es" ? "en" : "em";
  const s = x.trim();
  let m = s.match(/^(?:in\s+)?([A-Za-z]+)\s+(\d{4})$/i);
  if (m && mes(m[1])) return `${en} ${mes(m[1])} de ${m[2]}`;
  m = s.match(/^(?:in\s+)?(\d{4})$/i);
  if (m) return `${en} ${m[1]}`;
  m = s.match(/^(early|beginning of|start of|mid|middle of|late|end of)\s+(?:([A-Za-z]+)\s+)?(\d{4})$/i);
  if (m && (!m[2] || mes(m[2]))) {
    const cuando = /^(early|beginning|start)/i.test(m[1]) ? 0 : /^mid/i.test(m[1]) ? 1 : 2;
    const giro = (idioma === "es" ? ["a principios de", "a mediados de", "a finales de"] : ["no início de", "em meados de", "no fim de"])[cuando];
    return `${giro} ${m[2] ? `${mes(m[2])} de ` : ""}${m[3]}`;
  }
  return s.replace(/\b[A-Z][a-z]+\b/g, (n) => mes(n) ?? n).replace(/^in\s+/i, `${en} `);
}

/* «4 weeks», «1–5 weeks», «Up to 2 years». */
const UNIDADES: Record<"es" | "pt", [RegExp, string][]> = {
  es: [
    [/\bUp to\b/i, "Hasta"],
    [/\bweeks\b/g, "semanas"],
    [/\bweek\b/g, "semana"],
    [/\bmonths\b/g, "meses"],
    [/\bmonth\b/g, "mes"],
    [/\byears\b/g, "años"],
    [/\byear\b/g, "año"],
    [/\bdays\b/g, "días"],
    [/\bday\b/g, "día"],
  ],
  pt: [
    [/\bUp to\b/i, "Até"],
    [/\bweeks\b/g, "semanas"],
    [/\bweek\b/g, "semana"],
    [/\bmonths\b/g, "meses"],
    [/\bmonth\b/g, "mês"],
    [/\byears\b/g, "anos"],
    [/\byear\b/g, "ano"],
    [/\bdays\b/g, "dias"],
    [/\bday\b/g, "dia"],
  ],
};

function largoTipico(x: string, idioma: Idioma) {
  return idioma === "en" ? x : UNIDADES[idioma].reduce((s, [re, por]) => s.replace(re, por), x);
}

/* Los lugares, de lo más largo a lo más corto para que «New York» no se lea como «New». */
const LUGARES: [RegExp, string, string][] = [
  [/\bNew city each cohort\b/i, "una ciudad distinta en cada cohorte", "uma cidade diferente a cada turma"],
  [/\bNew country each year\b/i, "un país distinto cada año", "um país diferente a cada ano"],
  [/\bWashington D\.C\./g, "Washington D. C.", "Washington, D.C."],
  [/\bBay Area\b/g, "Área de la Bahía", "Área da Baía"],
  [/\bNew York\b/g, "Nueva York", "Nova York"],
  [/\bCape Town\b/g, "Ciudad del Cabo", "Cidade do Cabo"],
  [/\bSouth Africa\b/g, "Sudáfrica", "África do Sul"],
  [/\bCzech Republic\b/g, "República Checa", "República Tcheca"],
  [/\bNew Zealand\b/g, "Nueva Zelanda", "Nova Zelândia"],
  [/\bLondon\b/g, "Londres", "Londres"],
  [/\bPrague\b/g, "Praga", "Praga"],
  [/\bBrussels\b/g, "Bruselas", "Bruxelas"],
  [/\bBerlin\b/g, "Berlín", "Berlim"],
  [/\bBeijing\b/g, "Pekín", "Pequim"],
  [/\bGermany\b/g, "Alemania", "Alemanha"],
  [/\bBelgium\b/g, "Bélgica", "Bélgica"],
  [/\bFrance\b/g, "Francia", "França"],
  [/\bAustralia\b/g, "Australia", "Austrália"],
  [/\bAsia\b/g, "Asia", "Ásia"],
  [/\bUSA\b/g, "EE. UU.", "EUA"],
  [/\bUK\b/g, "Reino Unido", "Reino Unido"],
  [/\bOnline\b/g, "en línea", "online"],
  [/\bVarious\b/g, "varios lugares", "vários lugares"],
  [/\+ more\b/g, "+ más", "+ outros"],
];

function lugar(x: string, idioma: Idioma) {
  if (idioma === "en") return x;
  const i = idioma === "es" ? 1 : 2;
  const s = LUGARES.reduce((s, fila) => s.replace(fila[0], fila[i]), x).replace(/\s*&\s*/g, " · ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* La duración a partir de las fechas, con las mismas reglas de AISafety.com. */
function duracion(inicio: string | null | undefined, fin: string | null | undefined, t: Textos) {
  if (!inicio || !fin) return null;
  const a = Date.parse(inicio.slice(0, 10));
  const b = Date.parse(fin.slice(0, 10));
  if (Number.isNaN(a) || Number.isNaN(b) || b < a) return null;
  const dias = Math.round((b - a) / 864e5) + 1;
  if (dias >= 330) return t.fechas.anios(Math.max(1, Math.round(dias / 365.25)));
  const meses = Math.round(dias / 30.44);
  if (dias > 56 || (meses >= 1 && Math.abs(dias - 30.44 * meses) <= 4)) return t.fechas.meses(Math.max(1, meses));
  if (dias >= 14) return t.fechas.semanas(Math.round(dias / 7));
  return t.fechas.dias(dias);
}

/* Los enlaces salen con las UTM de AISafety.com, para que el programa sepa de dónde llegó la gente. */
function conUtm(url: string | null) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!/^https?:$/.test(u.protocol)) return url;
    for (const k of [...u.searchParams.keys()]) if (k.toLowerCase().startsWith("utm_")) u.searchParams.delete(k);
    u.searchParams.set("utm_source", "aisafety.com");
    u.searchParams.set("utm_medium", "referral");
    u.searchParams.set("utm_campaign", "training");
    return u.toString();
  } catch {
    return url;
  }
}

/* «Online or in person» cuenta para las dos modalidades. */
const modalidades = (mode: string | null) => (!mode ? [] : mode === "Online or in person" ? ["Online", "In person"] : [mode]);

/* El rango de duración, con el guion que sea («1–3 months», «1-3 months»). */
const rango = (x: string | null) => (x ? [x.replace(/\s*[-‐‑‒–—]\s*/, "–")] : []);

function grupo(p: Programa): ProgramaVista["grupo"] {
  return p.notYetOpen ? "notYetOpen" : p.applicationStatus === "Open" ? "open" : "closed";
}

const ORDEN_GRUPO = { open: 0, notYetOpen: 1, closed: 2 };

/* Nulos al final, como el comparador de AISafety.com. */
function comparar(a: string | null | undefined, b: string | null | undefined) {
  if (a === b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return a.localeCompare(b);
}

function ordenarProximos(ps: Programa[]) {
  return [...ps].sort((a, b) => {
    const ga = ORDEN_GRUPO[grupo(a)!];
    const gb = ORDEN_GRUPO[grupo(b)!];
    if (ga !== gb) return ga - gb;
    if (ga === 0) {
      const c = comparar(a.applicationsClose, b.applicationsClose);
      if (c) return c;
    }
    return comparar(a.startDate, b.startDate);
  });
}

const ICONO_NIVEL: Record<string, Detalle["icono"]> = { Low: "nivelBajo", Mid: "nivelMedio", High: "nivelAlto" };

function vista(p: Programa, idioma: Idioma, t: Textos, proximo: boolean): ProgramaVista {
  const o = t.listado.opciones;
  const tr = (x: string) => o[x] ?? x;
  const minus = (x: string) => tr(x).toLowerCase();

  /* Destacados: los marcados 1 y 2 en AISafety.com, si su convocatoria sigue abierta. */
  const destaca = (p.featured === 1 || p.featured === 2) && (!p.applicationStatus || p.applicationStatus === "Open");

  let fechas: string | null = null;
  if (proximo) {
    const empieza = p.startDateApprox ? inicioAprox(p.startDateApprox, idioma) : p.startDate ? t.fechas.el(fecha(p.startDate, idioma)) : null;
    const largo = duracion(p.startDate, p.endDate, t);
    fechas = [largo, empieza ? t.fechas.empieza(empieza) : null].filter(Boolean).join(" · ") || null;
  } else fechas = p.typicalLength ? largoTipico(p.typicalLength, idioma) : null;

  const detalles: (Detalle | null)[] = [
    p.stipend ? { icono: p.stipend === "No stipend" ? "sinDinero" : "dinero", texto: tr(p.stipend) } : null,
    p.timeCommitment ? { icono: p.timeCommitment === "Part-time" ? "relojMedio" : "reloj", texto: tr(p.timeCommitment) } : null,
    p.entryBar ? { icono: ICONO_NIVEL[p.entryBar] ?? "nivelMedio", texto: t.meta.nivel(minus(p.entryBar)) } : null,
    p.focus.length ? { icono: "enfoque", texto: t.meta.enfoque(p.focus.map(minus).join(", ")) } : null,
  ];
  if (proximo) {
    if (p.notYetOpen) detalles.push({ icono: "papel", texto: t.meta.aunNo });
    else if (p.applicationsClose)
      detalles.push({ icono: "papel", texto: p.applicationStatus === "Open" ? t.meta.hasta(fecha(p.applicationsClose, idioma)) : t.meta.cerradas });
  }

  const valores: Record<Faceta, string[]> = {
    applications: p.applicationStatus ? [p.applicationStatus] : [],
    type: p.type,
    focus: p.focus,
    entryBar: p.entryBar ? [p.entryBar] : [],
    stipend: p.stipend ? [p.stipend] : [],
    length: rango(p.lengthBucket),
    location: modalidades(p.mode),
  };

  return {
    id: p.id,
    name: p.name,
    description: descripcion(p, idioma),
    href: conUtm(p.url),
    logo: p.logo,
    types: p.type,
    destacado: destaca ? t.destacado(p.type[0] ?? null) : null,
    grupo: proximo ? grupo(p) : null,
    lugar: p.mode === "Online" ? tr("Online") : p.location ? lugar(p.location, idioma) : null,
    fechas,
    detalles: detalles.filter((x): x is Detalle => !!x),
    valores,
  };
}

/* «hoy», «ayer», «hace 3 días». */
function hace(iso: string | null, idioma: Idioma, ahora: Date) {
  if (!iso) return "";
  const dias = Math.max(0, Math.floor((ahora.getTime() - Date.parse(iso.slice(0, 10))) / 864e5));
  return new Intl.RelativeTimeFormat(LOCALES[idioma], { numeric: "auto" }).format(-dias, "day");
}

/* Un renglón de la caja de contribuir: el ícono en su círculo y el texto. */
function Contribuir({ href, icono, children }: { href: string; icono: Icono; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2.5 ${LINK} ${FOCO}`}>
      <span className="grid size-6 flex-none place-items-center rounded-full bg-[#8cc9a0]/12">
        <IconoSvg nombre={icono} className="size-3.5" />
      </span>
      {children}
    </a>
  );
}

export default async function OportunidadesPagina({ idioma, active }: { idioma: Idioma; active: string }) {
  const t = TEXTOS[idioma];
  const datos = await cargarOportunidades();
  const [antes, despues] = t.credito(hace(actualizado(datos), idioma, new Date()));
  const eventos = idioma === "es" ? "/eventos" : idioma === "en" ? "/en/events" : "/pt/eventos";

  /* Destacados primero, por su número; luego el resto en el orden de AISafety.com. */
  const destacadosPrimero = (vs: ProgramaVista[], ps: Programa[]) =>
    vs
      .map((v, i) => ({ v, f: v.destacado ? (ps[i].featured ?? 9) : 99, i }))
      .sort((a, b) => a.f - b.f || a.i - b.i)
      .map((x) => x.v);

  const proximos = ordenarProximos(datos.programs);
  const recurrentes = datos.recurring;

  const lateral = (
    <>
      <div className="rounded-2xl border border-aisc-sand/15 px-4 pt-3 pb-4 text-[13px] font-light">
        <p className={TENUE}>{t.contribuir.titulo}</p>
        <div className="mt-3 grid gap-2.5">
          <Contribuir href={AIRTABLE.agregar.upcoming} icono="mas">
            {t.contribuir.agregar}
          </Contribuir>
          <Contribuir href={AIRTABLE.corregir} icono="lapiz">
            {t.contribuir.corregir}
          </Contribuir>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-aisc-sand/15 px-4 py-3 text-[13px] font-light">
        <Contribuir href={AIRTABLE.datos.upcoming} icono="tabla">
          <span>
            {t.contribuir.datos} <span className={TENUE}>{t.contribuir.pasados}</span>
          </span>
        </Contribuir>
      </div>
    </>
  );

  return (
    <main className="aisc-page min-h-screen" style={{ background: "var(--color-aisc-night)", color: "var(--color-aisc-sand)" }}>
      <section className="relative bg-aisc-night pt-32 pb-14 md:pt-40">
        <SiteHeader active={active} />
        <div className={ANCHO}>
          <h1 className="font-display text-[clamp(3rem,7vw,4.5rem)] leading-[1.15] font-semibold">{t.titulo}</h1>
          <p className={`mt-2 mb-10 text-[15px] font-light ${TENUE}`}>
            {antes}
            <a className={LINK} href={FUENTE} target="_blank" rel="noopener noreferrer">
              AISafety.com
            </a>
            {despues}
          </p>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-8">
              <p className="max-w-[690px] text-[clamp(1.375rem,2.6vw,1.75rem)] leading-[1.2] font-light">
                <span className="text-[#8cc9a0]">{t.intro[0]}</span>
                {t.intro[1]}
              </p>
              <p className={`mt-5 text-[15px] font-light ${TENUE}`}>
                {t.eventos[0]}
                <a className={LINK} href={eventos}>
                  {t.eventos[1]} →
                </a>
              </p>
            </div>
            <a
              href={FUENTE}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-2xl border border-[#8cc9a0]/30 p-4 text-[15px] font-light transition-colors hover:border-[#8cc9a0]/70 lg:col-span-4 ${FOCO}`}
            >
              <span className="block">{t.boletin[0]}</span>
              <span className="mt-3 flex items-center justify-between rounded-full border border-[#1f4d32] bg-[#143620] px-4 py-2 text-[13px] font-semibold text-[#8cc9a0]">
                {t.boletin[1]}
                <span aria-hidden>→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <OportunidadesListado
        upcoming={destacadosPrimero(
          proximos.map((p) => vista(p, idioma, t, true)),
          proximos,
        )}
        recurring={destacadosPrimero(
          recurrentes.map((p) => vista(p, idioma, t, false)),
          recurrentes,
        )}
        t={t.listado}
        lateral={lateral}
      />
      <SiteFooter idioma={idioma} />
    </main>
  );
}
