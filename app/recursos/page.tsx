import type { Metadata } from "next";
import type { ReactNode } from "react";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { IconCursos, IconLibros, IconPodcasts, IconVideos } from "@/components/section-icons";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Lecturas, videos, podcasts, libros y cursos sobre seguridad de la IA, escogidos por la comunidad. Empieza por las cinco lecturas de entrada.",
};

/* Las cinco lecturas de entrada van en lista, sin tarjeta y sin icono: son lo
   primero que alguien abre y lo unico que aca se ordena por prioridad. */
const LECTURAS = [
  {
    href: "https://80000hours.org/problem-profiles/artificial-intelligence/",
    title: "Preventing an AI-related catastrophe",
    quien: "80,000 Hours",
  },
  {
    href: "https://www.cold-takes.com/most-important-century/",
    title: "The Most Important Century",
    quien: "Holden Karnofsky, Cold Takes",
  },
  {
    href: "https://www.cold-takes.com/why-ai-alignment-could-be-hard-with-modern-deep-learning/",
    title: "Why AI alignment could be hard with modern deep learning",
    quien: "Ajeya Cotra, Cold Takes",
  },
  {
    href: "https://www.anthropic.com/news/core-views-on-ai-safety",
    title: "Core Views on AI Safety",
    quien: "Anthropic",
  },
  {
    href: "https://www.alignmentforum.org/s/mzgtmmTKKn5MuCzFJ",
    title: "AGI Safety from First Principles",
    quien: "Richard Ngo, Alignment Forum",
  },
];

type Grupo = {
  id: string;
  titulo: string;
  lead: string;
  icono: () => ReactNode;
  /* La proporcion de la miniatura es del grupo, no de la pieza: asi la fila
     entera se lee pareja. Los canales y las caratulas son cuadrados; las
     portadas de libro van 2:3. Un grupo sin miniaturas la omite. */
  forma?: "cuadro" | "libro";
  items: { href: string; title: string; quien: string; body: string; miniatura?: string }[];
};

const GRUPOS: Grupo[] = [
  {
    id: "videos",
    titulo: "Videos",
    lead: "Para entender el campo sin leer un artículo entero.",
    icono: IconVideos,
    forma: "cuadro",
    items: [
      {
        href: "https://www.youtube.com/@RobertMilesAI/videos",
        title: "Robert Miles AI Safety",
        miniatura: "/aisc/recursos/robert-miles.webp",
        quien: "Robert Miles",
        body: "La biblioteca de referencia en video sobre alineación, control y los problemas que siguen abiertos.",
      },
      {
        href: "https://www.youtube.com/@AI_In_Context",
        title: "AI In Context",
        miniatura: "/aisc/recursos/ai-in-context.webp",
        quien: "80,000 Hours",
        body: "Documentales largos sobre hacia dónde va la IA. El primero, sobre el escenario IA 2027, pasó los diez millones de reproducciones.",
      },
      {
        href: "https://www.youtube.com/@RationalAnimations",
        title: "Rational Animations",
        miniatura: "/aisc/recursos/rational-animations.webp",
        quien: "YouTube",
        body: "Animaciones que adaptan ensayos clásicos sobre IA, racionalidad y riesgo existencial.",
      },
      {
        href: "https://www.youtube.com/@Siliconversations",
        title: "Siliconversations",
        miniatura: "/aisc/recursos/siliconversations.webp",
        quien: "YouTube",
        body: "Explicadores animados y cortos, cada uno sobre un riesgo o una propuesta concreta.",
      },
      {
        href: "https://www.youtube.com/@DoomDebates",
        title: "Doom Debates",
        miniatura: "/aisc/recursos/doom-debates.webp",
        quien: "Liron Shapira",
        body: "Debates y entrevistas donde las dos posiciones sobre el riesgo se discuten de frente.",
      },
    ],
  },
  {
    id: "podcasts",
    titulo: "Podcasts",
    lead: "Conversaciones largas, buenas para trayecto o gimnasio.",
    icono: IconPodcasts,
    forma: "cuadro",
    items: [
      {
        href: "https://axrp.net/",
        title: "AXRP",
        miniatura: "/aisc/recursos/axrp.webp",
        quien: "Daniel Filan",
        body: "El podcast de referencia en alineación técnica: entrevistas extensas con quienes hacen la investigación.",
      },
      {
        href: "https://80000hours.org/podcast/",
        title: "The 80,000 Hours Podcast",
        miniatura: "/aisc/recursos/80k-podcast.webp",
        quien: "80,000 Hours",
        body: "Conversaciones con investigadores, fundadores y gente de política sobre qué hacer con la carrera propia.",
      },
      {
        href: "https://www.cognitiverevolution.ai/",
        title: "The Cognitive Revolution",
        miniatura: "/aisc/recursos/cognitive-revolution.webp",
        quien: "Nathan Labenz",
        body: "Semanal, con gente de los laboratorios de frontera. Sirve para seguirle el paso a lo que sale.",
      },
      {
        href: "https://futureoflife.org/podcast/",
        title: "Future of Life Institute Podcast",
        miniatura: "/aisc/recursos/fli-podcast.webp",
        quien: "Future of Life Institute",
        body: "Entrevistas con investigadores, reguladores y filósofos sobre riesgo existencial.",
      },
    ],
  },
  {
    id: "libros",
    titulo: "Libros",
    lead: "Cuando ya quieres el argumento completo y no un resumen.",
    icono: IconLibros,
    forma: "libro",
    items: [
      {
        href: "https://brianchristian.org/the-alignment-problem/",
        title: "The Alignment Problem",
        miniatura: "/aisc/recursos/alignment-problem.webp",
        quien: "Brian Christian",
        body: "Una narración accesible de por qué es difícil alinear un sistema con lo que de verdad queremos.",
      },
      {
        href: "https://people.eecs.berkeley.edu/~russell/hc.html",
        title: "Human Compatible",
        miniatura: "/aisc/recursos/human-compatible.webp",
        quien: "Stuart Russell",
        body: "El argumento de uno de los autores del manual clásico de IA para redefinir el campo alrededor de la incertidumbre.",
      },
      {
        href: "https://nickbostrom.com/superintelligence",
        title: "Superintelligence",
        miniatura: "/aisc/recursos/superintelligence.webp",
        quien: "Nick Bostrom",
        body: "El libro que llevó la discusión sobre IA general al debate público. Es de 2014 y se nota, pero fija el vocabulario.",
      },
      {
        href: "https://ifanyonebuildsit.com/",
        title: "If Anyone Builds It, Everyone Dies",
        miniatura: "/aisc/recursos/if-anyone-builds-it.webp",
        quien: "Yudkowsky y Soares, 2025",
        body: "La versión más directa del caso pesimista. Útil incluso si no se comparte la conclusión.",
      },
    ],
  },
  {
    id: "cursos",
    titulo: "Cursos",
    lead: "Con fechas, tareas y alguien al otro lado.",
    icono: IconCursos,
    items: [
      {
        href: "https://bluedot.org/courses/agi-strategy",
        title: "AGI Strategy",
        quien: "BlueDot Impact, unas 25 horas",
        body: "El punto de entrada que más recomendamos: hacia dónde va la IA avanzada y qué puede desviarla.",
      },
      {
        href: "https://bluedot.org/courses/ai-governance",
        title: "Frontier AI Governance",
        quien: "BlueDot Impact, unas 30 horas",
        body: "Qué se está decidiendo sobre los modelos de frontera y en qué mesas se decide.",
      },
      {
        href: "https://bluedot.org/courses/technical-ai-safety",
        title: "Technical AI Safety",
        quien: "BlueDot Impact, unas 30 horas",
        body: "Alineación, interpretabilidad, evaluaciones y control. Pide saber cómo se entrena un modelo.",
      },
      {
        href: "https://deepmindsafetyresearch.medium.com/introducing-our-short-course-on-agi-safety-1072adb7912c",
        title: "AGI Safety Course",
        quien: "Google DeepMind",
        body: "Curso corto del equipo de seguridad de DeepMind sobre los riesgos de una IA de nivel humano.",
      },
      {
        href: "https://aisafetybook.com/",
        title: "AI Safety, Ethics and Society",
        quien: "Center for AI Safety",
        body: "Libro de texto y curso abierto que cubre los riesgos catastróficos con más orden que cualquier lista de enlaces.",
      },
      {
        href: "https://arena.education/curriculum",
        title: "ARENA",
        quien: "Cinco semanas, para quien ya programa",
        body: "Currículo intensivo de interpretabilidad, evaluaciones y aprendizaje por refuerzo.",
      },
    ],
  },
];

/* El marco recorta la miniatura, que va a sangre hasta el borde redondeado;
   el relleno vive en el cuerpo para que la imagen no lo herede. */
const CARD =
  "flex h-full flex-col overflow-hidden rounded-[12px] border border-aisc-forest-deep/20 bg-aisc-cream transition-colors hover:border-aisc-forest-deep";
const CARD_CUERPO = "flex flex-1 flex-col gap-5 p-6 md:p-7";
const MINIATURA = "block w-full border-b border-aisc-forest-deep/20 object-cover";
const ENLACE = "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* La rejilla se ajusta al numero de piezas para que cada grupo quepa en una
   sola fila en pantalla ancha. Las clases van escritas enteras porque Tailwind
   las busca en el codigo fuente. */
const REJILLA = "mt-8 grid grid-cols-1 gap-[10px] md:mt-10 md:grid-cols-2 lg:grid-cols-3";
const COLUMNAS: Record<number, string> = {
  5: "xl:grid-cols-5",
  6: "xl:grid-cols-6",
};

export default function Recursos() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="1415"
          decoding="async"
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-recursos.svg"
        />
        <SiteHeader active="/recursos" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Recursos</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Lo que le pasamos a alguien que pregunta por dónde empezar. Casi todo está en inglés, que es donde se
              publica el campo.
            </p>
          </div>
        </div>
      </section>

      <section id="lecturas" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-12 md:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-6 pt-5 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Cinco lecturas para empezar</h2>
            <p className="text-body-sm text-aisc-muted lg:pt-3">
              En este orden. Las dos primeras no suponen nada; la última es una secuencia y toma varias sesiones.
            </p>
          </div>
          <ul className="mt-10 flex flex-col gap-4 md:mt-12">
            {LECTURAS.map((l, i) => (
              <li className="text-body md:text-body-lg flex gap-4" key={l.href}>
                <span className="text-meta text-aisc-coral pt-2 tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <a className={ENLACE} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.title}
                  </a>{" "}
                  <span className="text-aisc-muted">({l.quien})</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {GRUPOS.map((grupo, i) => {
        const Icono = grupo.icono;
        return (
          <section id={grupo.id} key={grupo.id} className={i % 2 === 0 ? "bg-aisc-sand" : "bg-aisc-cream"}>
            <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 py-12 md:py-14">
              <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep/25" />
              <div className="flex flex-col gap-3 pt-5 md:flex-row md:items-baseline md:justify-between md:gap-10 md:pt-6">
                <div className="flex items-center gap-3 text-aisc-forest">
                  <Icono />
                  <h2 className="text-display-3 md:text-display-3-lg text-aisc-ink text-balance">{grupo.titulo}</h2>
                </div>
                <p className="text-body-sm text-aisc-muted">{grupo.lead}</p>
              </div>
              <ul className={`${REJILLA} ${COLUMNAS[grupo.items.length] ?? "xl:grid-cols-4"}`}>
                {grupo.items.map((item) => (
                  <li className="flex" key={item.href}>
                    <article className={CARD}>
                      {item.miniatura ? (
                        <img
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          width={grupo.forma === "libro" ? 600 : 800}
                          height={grupo.forma === "libro" ? 900 : 800}
                          src={item.miniatura}
                          className={`${MINIATURA} ${grupo.forma === "libro" ? "aspect-[2/3]" : "aspect-square"}`}
                        />
                      ) : null}
                      <div className={CARD_CUERPO}>
                        <div className="flex flex-col gap-1.5">
                          <h3 className="text-display-4 md:text-display-4-lg text-balance">
                            <a className={ENLACE} href={item.href} target="_blank" rel="noopener noreferrer">
                              {item.title}
                            </a>
                          </h3>
                          <span className="text-meta text-aisc-muted">{item.quien}</span>
                        </div>
                        <p className="text-body-sm text-aisc-ink">{item.body}</p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section id="mapa" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep/25" />
          <div className="grid grid-cols-1 gap-4 pt-5 md:pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-10">
            <h2 className="text-display-3 md:text-display-3-lg text-balance">Si quieres ver el campo completo</h2>
            <p className="text-body-sm text-aisc-ink lg:pt-2">
              <a className={ENLACE} href="https://aisafety.com/" target="_blank" rel="noopener noreferrer">
                aisafety.com
              </a>{" "}
              es un directorio abierto con cientos de organizaciones, programas y proyectos, y con quién financia cada
              cosa.
            </p>
          </div>
        </div>
      </section>

      <CtaPanel
        kicker="Rinden más acompañados"
        title="Recórrelos con alguien más"
        body="En el grupo de lectura se discute uno cada quince días, y en el de WhatsApp se pregunta lo que no cuadra."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar al grupo de lectura
        </a>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar al grupo general
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
