import Link from "next/link";
import CtaPanel from "./cta-panel";
import Puntos, { type Patron } from "./puntos";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, CTA_LINK_VERDE } from "./ui";
import { type Idioma, rutaEn } from "@/lib/idiomas";

/* La portada, en los tres idiomas. La estructura es la de apartresearch.com
   (tesis, quién nos apoya, los programas, la comunidad y lo que se ha
   publicado) y la estética la de aisafety.sg: papel blanco, verde
   muy oscuro, dibujos de líneas finas e íconos de puntos. La letra, el ancho de
   columna, los bordes y el ritmo entre secciones son los de las páginas
   interiores, para que la portada no se lea como otro sitio.
   Las tres app/…/page.tsx solo ponen los metadatos y llaman a esta. */

const WHATSAPP = "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF";
const AGENDAR = "https://cal.com/josegelves/meeting";

type Textos = {
  hero: { titulo: string; texto: string; programas: string; unete: string };
  aliados: string;
  investigacion: { titulo: string; texto: string; piezas: { tipo: string; fecha: string; venue: string; autores: string }[] };
  programas: {
    titulo: string;
    texto: string;
    tarjetas: { kicker: string; titulo: string; texto: string; enlaces: string[] }[];
  };
  comunidad: { titulo: string; texto: string; eventos: string; fotos: string[] };
  cierre: { titulo: string; texto: string; whatsapp: string; agendar: string; escribir: string };
};

export const TEXTOS: Record<Idioma, Textos> = {
  es: {
    hero: {
      titulo: "De Colombia a la frontera de la seguridad de la IA",
      texto: "Si te interesa que la inteligencia artificial avance de forma segura, acá encuentras con quién estudiar y por dónde empezar a investigar.",
      programas: "Ver los programas",
      unete: "Únete a la comunidad",
    },
    aliados: "Trabajamos con",
    investigacion: {
      titulo: "Investigación",
      texto: "Miembros de la comunidad han publicado con la Oxford Martin AI Governance Initiative, en talleres de NeurIPS y en revistas con revisión de pares.",
      piezas: [
        { tipo: "Documento de trabajo", fecha: "Diciembre de 2025", venue: "Oxford Martin AI Governance Initiative", autores: "Camila Beltran y 18 coautores" },
        { tipo: "Artículo aceptado en taller", fecha: "Octubre de 2025", venue: "Dos talleres de NeurIPS 2025", autores: "Fernando Avalos y 5 coautores" },
        { tipo: "Artículo revisado por pares", fecha: "Julio de 2025", venue: "Revista de Estudios Sociales, Universidad de los Andes", autores: "Mónica A. Ulloa Ruiz y Guillem Bas Graells" },
      ],
    },
    programas: {
      titulo: "Programas",
      texto: "Para estudiar el campo en grupo, sacar adelante un primer proyecto o escuchar a quienes ya investigan.",
      tarjetas: [
        {
          kicker: "Con BlueDot Impact",
          titulo: "Seminarios",
          texto: "Lees los cursos de BlueDot y los discutes cada semana en grupo, con facilitación en español.",
          enlaces: ["Técnico", "Futuro y riesgos"],
        },
        {
          kicker: "Con Apart Research",
          titulo: "Sprints y hackatones",
          texto: "Un fin de semana para pasar de leer sobre seguridad de la IA a terminar un proyecto propio, desde el hub presencial de Bogotá.",
          enlaces: ["Proyectos premiados"],
        },
        {
          kicker: "Todos los viernes",
          titulo: "Grupo de lectura",
          texto: "Leemos y discutimos trabajos recientes de seguridad técnica. Abierto, en español y sin requisitos previos.",
          enlaces: ["Cómo unirte"],
        },
        {
          kicker: "Una vez al mes",
          titulo: "Charlas de investigación",
          texto: "Alguien que investiga en seguridad de la IA presenta su trabajo en quince minutos y después responde preguntas.",
          enlaces: ["Ver el calendario"],
        },
      ],
    },
    comunidad: {
      titulo: "Comunidad y eventos",
      texto: "Charlas, cenas de discusión y paneles en Bogotá, para conocer a quienes trabajan en esto y discutir con ellos.",
      eventos: "Ver los eventos",
      fotos: [
        "Panel sobre gobernanza de la IA en Colombia",
        "Encuentro AI Safety Connect LATAM",
        "Sesión Del algoritmo a la ley",
        "Cena de discusión sobre IA y política pública",
      ],
    },
    cierre: {
      titulo: "¿Quieres entrar?",
      texto: "No hace falta ser investigador ni haber estudiado inteligencia artificial.",
      whatsapp: "Entrar al grupo de WhatsApp",
      agendar: "Agendar 20 minutos",
      escribir: "Escribirnos",
    },
  },
  en: {
    hero: {
      titulo: "From Colombia to the frontier of AI safety",
      texto: "If you care about artificial intelligence going well, this is where you find people to study with and a place to start doing research.",
      programas: "See the programs",
      unete: "Join the community",
    },
    aliados: "We work with",
    investigacion: {
      titulo: "Research",
      texto: "Community members have published with the Oxford Martin AI Governance Initiative, at NeurIPS workshops and in peer-reviewed journals.",
      piezas: [
        { tipo: "Working paper", fecha: "December 2025", venue: "Oxford Martin AI Governance Initiative", autores: "Camila Beltran and 18 co-authors" },
        { tipo: "Workshop paper", fecha: "October 2025", venue: "Two NeurIPS 2025 workshops", autores: "Fernando Avalos and 5 co-authors" },
        { tipo: "Peer-reviewed article", fecha: "July 2025", venue: "Revista de Estudios Sociales, Universidad de los Andes", autores: "Mónica A. Ulloa Ruiz and Guillem Bas Graells" },
      ],
    },
    programas: {
      titulo: "Programs",
      texto: "To study the field in a group, get a first project done, or hear from the people already doing research.",
      tarjetas: [
        {
          kicker: "With BlueDot Impact",
          titulo: "Seminars",
          texto: "You read the BlueDot courses and discuss them every week in a group, facilitated in Spanish.",
          enlaces: ["Technical", "Future and risks"],
        },
        {
          kicker: "With Apart Research",
          titulo: "Sprints and hackathons",
          texto: "A weekend to go from reading about AI safety to finishing a project of your own, from the in-person hub in Bogotá.",
          enlaces: ["Award-winning projects"],
        },
        {
          kicker: "Every Friday",
          titulo: "Reading group",
          texto: "We read and discuss recent technical safety work. Open, in Spanish and with no prerequisites.",
          enlaces: ["How to join"],
        },
        {
          kicker: "Once a month",
          titulo: "Research talks",
          texto: "Someone doing AI safety research presents their work in fifteen minutes and then takes questions.",
          enlaces: ["See the calendar"],
        },
      ],
    },
    comunidad: {
      titulo: "Community and events",
      texto: "Talks, discussion dinners and panels in Bogotá, to meet the people working on this and argue with them.",
      eventos: "See the events",
      fotos: [
        "Panel on AI governance in Colombia",
        "AI Safety Connect LATAM gathering",
        "From the Algorithm to the Law session",
        "Discussion dinner on AI and public policy",
      ],
    },
    cierre: {
      titulo: "Want in?",
      texto: "You do not need to be a researcher, and you do not need to have studied artificial intelligence.",
      whatsapp: "Join the WhatsApp group",
      agendar: "Book 20 minutes",
      escribir: "Write to us",
    },
  },
  pt: {
    hero: {
      titulo: "Da Colômbia à fronteira da segurança da IA",
      texto: "Se te interessa que a inteligência artificial avance de forma segura, aqui você encontra com quem estudar e por onde começar a pesquisar.",
      programas: "Ver os programas",
      unete: "Entre na comunidade",
    },
    aliados: "Trabalhamos com",
    investigacion: {
      titulo: "Pesquisa",
      texto: "Membros da comunidade publicaram com a Oxford Martin AI Governance Initiative, em workshops da NeurIPS e em revistas com revisão por pares.",
      piezas: [
        { tipo: "Documento de trabalho", fecha: "Dezembro de 2025", venue: "Oxford Martin AI Governance Initiative", autores: "Camila Beltran e 18 coautores" },
        { tipo: "Artigo aceito em workshop", fecha: "Outubro de 2025", venue: "Dois workshops da NeurIPS 2025", autores: "Fernando Avalos e 5 coautores" },
        { tipo: "Artigo revisado por pares", fecha: "Julho de 2025", venue: "Revista de Estudios Sociales, Universidad de los Andes", autores: "Mónica A. Ulloa Ruiz e Guillem Bas Graells" },
      ],
    },
    programas: {
      titulo: "Programas",
      texto: "Para estudar a área em grupo, tirar do papel um primeiro projeto ou ouvir quem já pesquisa.",
      tarjetas: [
        {
          kicker: "Com a BlueDot Impact",
          titulo: "Seminários",
          texto: "Você lê os cursos da BlueDot e os discute toda semana em grupo, com facilitação em espanhol.",
          enlaces: ["Técnico", "Futuro e riscos"],
        },
        {
          kicker: "Com a Apart Research",
          titulo: "Sprints e hackathons",
          texto: "Um fim de semana para passar de ler sobre segurança da IA a terminar um projeto próprio, a partir do hub presencial de Bogotá.",
          enlaces: ["Projetos premiados"],
        },
        {
          kicker: "Toda sexta-feira",
          titulo: "Grupo de leitura",
          texto: "Lemos e discutimos trabalhos recentes de segurança técnica. Aberto, em espanhol e sem pré-requisitos.",
          enlaces: ["Como participar"],
        },
        {
          kicker: "Uma vez por mês",
          titulo: "Palestras de pesquisa",
          texto: "Alguém que pesquisa segurança da IA apresenta seu trabalho em quinze minutos e depois responde perguntas.",
          enlaces: ["Ver o calendário"],
        },
      ],
    },
    comunidad: {
      titulo: "Comunidade e eventos",
      texto: "Palestras, jantares de discussão e painéis em Bogotá, para conhecer quem trabalha nisso e discutir com essas pessoas.",
      eventos: "Ver os eventos",
      fotos: [
        "Painel sobre governança da IA na Colômbia",
        "Encontro AI Safety Connect LATAM",
        "Sessão Do algoritmo à lei",
        "Jantar de discussão sobre IA e políticas públicas",
      ],
    },
    cierre: {
      titulo: "Quer entrar?",
      texto: "Não é preciso ser pesquisador nem ter estudado inteligência artificial.",
      whatsapp: "Entrar no grupo de WhatsApp",
      agendar: "Agendar 20 minutos",
      escribir: "Escrever para nós",
    },
  },
};

/** Los logos van en el idioma que sea: son nombres propios. */
const ALIADOS = [
  { name: "Apart Research", logo: "/aisc/aliados/apart.png", href: "https://apartresearch.com", alto: "h-9" },
  { name: "BlueDot Impact", logo: "/aisc/aliados/bluedot.png", href: "https://bluedot.org", alto: "h-6" },
  { name: "Kairos", logo: "/aisc/aliados/kairos.png", href: "https://kairos-project.org", alto: "h-7" },
  { name: "Coefficient Giving", logo: "/aisc/aliados/coefficient-giving.svg", href: "https://www.coefficientgiving.org", alto: "h-7" },
];

/** Las tres publicaciones de /investigacion, en el mismo orden. */
const PUBLICACIONES = [
  {
    titulo: "AI Benefit-Sharing Framework: Balancing Access and Safety",
    href: "https://aigi.ox.ac.uk/publications/ai-benefit-sharing-framework-balancing-access-and-safety/",
    arte: "/aisc/patterns/aisc-investigacion-1.svg",
  },
  {
    titulo: "Approximating Human Preferences Using a Multi-Judge Learned System",
    href: "https://arxiv.org/abs/2510.25884",
    arte: "/aisc/patterns/aisc-investigacion-2.svg",
  },
  {
    titulo: "La securitización de la inteligencia artificial: un análisis de sus impulsores y sus consecuencias",
    href: "https://revistas.uniandes.edu.co/index.php/res/article/view/10754",
    arte: "/aisc/patterns/aisc-investigacion-3.svg",
  },
];

/** Para cada programa, su ícono y a dónde lleva cada enlace (rutas en español; se traducen abajo). */
const PROGRAMAS: { patron: Patron; rutas: string[] }[] = [
  { patron: "seminarios", rutas: ["/seminarios/tecnico", "/seminarios/futuro-y-riesgos"] },
  { patron: "sprints", rutas: ["/investigacion"] },
  { patron: "lectura", rutas: ["/unete"] },
  { patron: "charlas", rutas: ["/eventos"] },
];

/* Mientras llegan las fotos de los encuentros, los flyers de esos mismos eventos. */
const FOTOS = [
  "/aisc/eventos/panel-gobernanza.jpg",
  "/aisc/eventos/connect-latam.jpg",
  "/aisc/eventos/algoritmo-a-la-ley.jpg",
  "/aisc/eventos/cena-politica.jpg",
];

const COLUMNA = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const ENLACE_SERIF = "text-display-4 md:text-display-4-lg transition-colors hover:text-aisc-coral";

/** El encabezado de sección de aisafety.sg: filete arriba, título a la izquierda, texto a la derecha. */
function Cabecera({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-5 border-t border-aisc-forest/50 pt-8 md:grid-cols-2 md:gap-16 md:pt-10">
      <h2 className="text-display-2 md:text-display-2-lg text-balance">{titulo}</h2>
      <p className="text-body md:text-body-lg max-w-[560px] text-aisc-ink/85">{children}</p>
    </div>
  );
}

export default function Portada({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma];
  const ruta = (r: string) => rutaEn(idioma, r);

  return (
    <main className="aisc-page flex flex-col">
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden bg-aisc-forest-deep text-aisc-sand">
        <img
          src="/aisc/patterns/aisc-triangulo-haces.svg"
          alt=""
          aria-hidden="true"
          width={1060}
          height={680}
          className="pointer-events-none absolute top-0 -right-[55%] h-full w-auto max-w-none select-none opacity-35 sm:-right-[30%] md:-right-[14%] md:opacity-100 xl:right-0"
        />
        <SiteHeader />
        <div className={`${COLUMNA} relative z-10 flex min-h-[540px] flex-col justify-end pt-32 pb-16 md:min-h-[600px] md:pb-20`}>
          <h1 className="text-display-1 md:text-display-1-lg max-w-[720px] text-balance">{t.hero.titulo}</h1>
          <p className="text-body md:text-body-lg mt-6 max-w-[540px] text-aisc-sand/80">{t.hero.texto}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className={CTA_LINK_PRIMARY} href="#programas">
              {t.hero.programas}
            </a>
            <Link className={CTA_LINK} href={ruta("/unete")}>
              {t.hero.unete}
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- aliados */}
      <section className="border-b border-aisc-line">
        <div className={`${COLUMNA} flex flex-col gap-6 py-9 md:flex-row md:items-center md:gap-10 md:py-10`}>
          <span className="text-kicker shrink-0 text-aisc-muted">{t.aliados}</span>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-6 md:gap-x-10">
            {ALIADOS.map((a) => (
              <li key={a.name}>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="block w-fit">
                  <img
                    src={a.logo}
                    alt={a.name}
                    className={`${a.alto} w-auto max-w-[170px] object-contain`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- programas */}
      <section id="programas" className="scroll-mt-24 pt-14 md:pt-16">
        <div className={COLUMNA}>
          <Cabecera titulo={t.programas.titulo}>{t.programas.texto}</Cabecera>
          <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
            {PROGRAMAS.map((p, i) => {
              const d = t.programas.tarjetas[i];
              const oscura = i === 0;
              return (
                <li
                  key={p.patron}
                  className={`flex flex-col rounded-[var(--radius)] p-7 md:p-8 ${
                    oscura ? "bg-aisc-forest-deep text-aisc-sand" : "border border-aisc-forest-deep/25"
                  }`}
                >
                  <Puntos patron={p.patron} className={`size-9 ${oscura ? "text-aisc-mint" : "text-aisc-forest"}`} />
                  <span className={`text-kicker mt-8 ${oscura ? "text-aisc-mint" : "text-aisc-muted"}`}>{d.kicker}</span>
                  <h3 className="text-display-3 md:text-display-3-lg mt-3">{d.titulo}</h3>
                  <p className={`text-body-sm mt-3 ${oscura ? "text-aisc-sand/80" : "text-aisc-ink/80"}`}>{d.texto}</p>
                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-8">
                    {p.rutas.map((r, j) => (
                      <Link key={r} href={ruta(r)} className={`${ENLACE_SERIF} ${oscura ? "text-aisc-sand" : "text-aisc-forest"}`}>
                        {d.enlaces[j]}
                      </Link>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- comunidad */}
      <section className="pt-14 md:pt-16">
        <div className="mx-auto w-full max-w-[1448px] px-4 md:px-8">
          <div className="grid items-center gap-10 rounded-[var(--radius)] bg-aisc-sand px-4 py-10 md:px-8 md:py-14 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
            <ul className="grid grid-cols-2 gap-3 md:gap-4">
              {FOTOS.map((src, i) => (
                <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-aisc-forest-deep">
                  <img src={src} alt={t.comunidad.fotos[i]} className="absolute inset-0 h-full w-full object-cover" />
                </li>
              ))}
            </ul>
            <div className="border-t border-aisc-forest/50 pt-8">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">{t.comunidad.titulo}</h2>
              <p className="text-body md:text-body-lg mt-5 max-w-[520px] text-aisc-ink/85">{t.comunidad.texto}</p>
              <Link className={`${CTA_LINK_VERDE} mt-8`} href={ruta("/eventos")}>
                {t.comunidad.eventos}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- investigación */}
      <section className="pt-14 pb-14 md:pt-16 md:pb-16">
        <div className={COLUMNA}>
          <Cabecera titulo={t.investigacion.titulo}>{t.investigacion.texto}</Cabecera>
          <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
            {PUBLICACIONES.map((p, i) => {
              const d = t.investigacion.piezas[i];
              return (
                <li key={p.href} className="flex">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full flex-col overflow-hidden rounded-[var(--radius)] border border-aisc-forest-deep/25 transition-colors hover:border-aisc-forest-deep/60"
                  >
                    <img src={p.arte} alt="" aria-hidden="true" width={600} height={340} className="aspect-[600/340] w-full border-b border-aisc-forest-deep/25 object-cover" />
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <span className="text-meta text-aisc-muted">
                        {d.tipo} · {d.fecha}
                      </span>
                      <h3 className="text-display-4 md:text-display-4-lg mt-3 text-balance transition-colors group-hover:text-aisc-forest">
                        {p.titulo}
                      </h3>
                      <div className="text-body-sm mt-auto flex flex-col gap-0.5 pt-6 text-aisc-muted">
                        <span>{d.venue}</span>
                        <span>{d.autores}</span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaPanel title={t.cierre.titulo} body={t.cierre.texto}>
        <a className={CTA_LINK_PRIMARY} href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          {t.cierre.whatsapp}
        </a>
        <a className={CTA_LINK} href={AGENDAR} target="_blank" rel="noopener noreferrer">
          {t.cierre.agendar}
        </a>
        <a className={CTA_LINK} href="mailto:contacto@aisafetycolombia.org">
          {t.cierre.escribir}
        </a>
      </CtaPanel>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
