import { COLUMNA, FILETE, LINK, TENUE } from "@/components/eventos-estilos";
import OportunidadesListado, { type Faceta, type ProgramaVista, type TextosListado } from "@/components/oportunidades-listado";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import type { Idioma } from "@/lib/idiomas";
import { FUENTE, type Programa, actualizado, cargarOportunidades } from "@/lib/oportunidades";

/* La página de oportunidades en los tres idiomas, calcada de
   aisafety.com/training: mismas secciones, filtros, tarjetas y orden, con los
   colores y letras del sitio. Los programas se quedan en inglés, como llegan de
   AISafety.com; los rótulos, filtros y fechas van en el idioma de la página. */

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
  intro: string;
  eventos: [string, string];
  boletin: string;
  credito: (hace: string) => [string, string];
  fechas: {
    empieza: (x: string) => string;
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
      "Becas, bootcamps y cursos de seguridad de la IA en todo el mundo, en línea y presenciales, con sus fechas y convocatorias. Listado de AISafety.com, sincronizado automáticamente.",
    intro: "Becas, bootcamps y cursos de seguridad de la IA para formarte y construir tu carrera. En línea y presenciales.",
    eventos: ["Para conferencias, charlas, talleres y más, ve a ", "Eventos"],
    boletin: "Recibe cada semana un resumen de los programas nuevos en AISafety.com",
    credito: (hace) => [`Actualizado ${hace} · Listado de `, ", sincronizado automáticamente."],
    fechas: {
      empieza: (x) => `Empieza ${x}`,
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
    destacado: (tipo) => (tipo ? `Destacado · ${tipo}` : "Programa destacado"),
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
      "AI safety fellowships, bootcamps and courses worldwide, online and in person, with dates and application deadlines. Listing from AISafety.com, synced automatically.",
    intro: "Fellowships, bootcamps, and courses in AI safety to upskill and build career capital. Both online and in person.",
    eventos: ["For conferences, talks, workshops, and more go to ", "Events"],
    boletin: "Get a weekly summary of all new training programs on AISafety.com",
    credito: (hace) => [`Updated ${hace} · Listing from `, ", synced automatically."],
    fechas: {
      empieza: (x) => `Starts ${x}`,
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
    destacado: (tipo) => (tipo ? `Featured ${tipo}` : "Featured program"),
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
      "Bolsas, bootcamps e cursos de segurança da IA no mundo todo, online e presenciais, com datas e prazos de inscrição. Lista do AISafety.com, sincronizada automaticamente.",
    intro: "Bolsas, bootcamps e cursos de segurança da IA para se capacitar e construir sua carreira. Online e presenciais.",
    eventos: ["Para conferências, palestras, oficinas e mais, vá para ", "Eventos"],
    boletin: "Receba toda semana um resumo dos novos programas no AISafety.com",
    credito: (hace) => [`Atualizado ${hace} · Lista do `, ", sincronizada automaticamente."],
    fechas: {
      empieza: (x) => `Começa ${x}`,
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
    destacado: (tipo) => (tipo ? `Destaque · ${tipo}` : "Programa em destaque"),
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

function vista(p: Programa, idioma: Idioma, t: Textos, proximo: boolean): ProgramaVista {
  const o = t.listado.opciones;
  const tr = (x: string) => o[x] ?? x;
  const minus = (x: string) => tr(x).toLowerCase();

  /* Destacados: los marcados 1 y 2 en AISafety.com, si su convocatoria sigue abierta. */
  const destaca = (p.featured === 1 || p.featured === 2) && (!p.applicationStatus || p.applicationStatus === "Open");

  let fechas: string | null = null;
  if (proximo) {
    const empieza = p.startDateApprox || (p.startDate ? fecha(p.startDate, idioma) : null);
    const largo = duracion(p.startDate, p.endDate, t);
    fechas = [largo, empieza ? t.fechas.empieza(empieza) : null].filter(Boolean).join(" · ") || null;
  } else fechas = p.typicalLength || null;

  const meta = [
    p.stipend && tr(p.stipend),
    p.timeCommitment && tr(p.timeCommitment),
    p.entryBar && t.meta.nivel(minus(p.entryBar)),
    p.focus.length ? t.meta.enfoque(p.focus.map(minus).join(", ")) : null,
  ];
  if (proximo) {
    if (p.notYetOpen) meta.push(t.meta.aunNo);
    else if (p.applicationsClose) meta.push(p.applicationStatus === "Open" ? t.meta.hasta(fecha(p.applicationsClose, idioma)) : t.meta.cerradas);
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
    description: p.description,
    href: conUtm(p.url),
    logo: p.logo,
    types: p.type,
    destacado: destaca ? t.destacado(p.type[0] ? minus(p.type[0]) : null) : null,
    grupo: proximo ? grupo(p) : null,
    lugar: p.mode === "Online" ? tr("Online") : p.location || null,
    fechas,
    meta: meta.filter((x): x is string => !!x),
    valores,
  };
}

/* «hoy», «ayer», «hace 3 días». */
function hace(iso: string | null, idioma: Idioma, ahora: Date) {
  if (!iso) return "";
  const dias = Math.max(0, Math.floor((ahora.getTime() - Date.parse(iso.slice(0, 10))) / 864e5));
  return new Intl.RelativeTimeFormat(LOCALES[idioma], { numeric: "auto" }).format(-dias, "day");
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

  return (
    <main className="aisc-page min-h-screen" style={{ background: "var(--color-aisc-night)", color: "var(--color-aisc-sand)" }}>
      <section className="relative bg-aisc-night pt-32 pb-10 md:pt-40">
        <SiteHeader active={active} />
        <div className={COLUMNA}>
          <h1 className="font-display text-[clamp(2.75rem,7vw,4rem)] leading-[1.05] font-semibold">{t.titulo}</h1>
          <p className={`mt-3 text-[0.9rem] ${TENUE}`}>
            {antes}
            <a className={LINK} href={FUENTE} target="_blank" rel="noopener noreferrer">
              AISafety.com
            </a>
            {despues}
          </p>
          <p className="mt-5 max-w-[640px] text-[1.05rem] leading-relaxed text-aisc-sand/85">{t.intro}</p>
          <p className={`mt-2 text-[1rem] ${TENUE}`}>
            {t.eventos[0]}
            <a className={LINK} href={eventos}>
              {t.eventos[1]} →
            </a>
          </p>
          <a
            href={FUENTE}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 inline-flex items-center gap-2 rounded-xl border ${FILETE} bg-white/[0.03] px-4 py-3 text-[0.95rem] transition-colors hover:border-[#8cc9a0]/60`}
          >
            <span>{t.boletin}</span>
            <span className="text-[#8cc9a0]" aria-hidden>
              →
            </span>
          </a>
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
      />

      <aside className={`${COLUMNA} pb-24`}>
        <div className={`rounded-2xl border ${FILETE} p-6`}>
          <h2 className="font-display text-[1.3rem] font-semibold">{t.contribuir.titulo}</h2>
          <ul className="mt-3 grid gap-2 text-[0.95rem]">
            <li>
              <a className={LINK} href={AIRTABLE.agregar.upcoming} target="_blank" rel="noopener noreferrer">
                {t.contribuir.agregar} ({t.listado.pestanas.upcoming.toLowerCase()})
              </a>
              {" · "}
              <a className={LINK} href={AIRTABLE.agregar.recurring} target="_blank" rel="noopener noreferrer">
                {t.listado.pestanas.recurring.toLowerCase()}
              </a>
            </li>
            <li>
              <a className={LINK} href={AIRTABLE.corregir} target="_blank" rel="noopener noreferrer">
                {t.contribuir.corregir}
              </a>
            </li>
            <li>
              <a className={LINK} href={AIRTABLE.datos.upcoming} target="_blank" rel="noopener noreferrer">
                {t.contribuir.datos} ({t.listado.pestanas.upcoming.toLowerCase()})
              </a>{" "}
              <span className={TENUE}>{t.contribuir.pasados}</span>
              {" · "}
              <a className={LINK} href={AIRTABLE.datos.recurring} target="_blank" rel="noopener noreferrer">
                {t.listado.pestanas.recurring.toLowerCase()}
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
