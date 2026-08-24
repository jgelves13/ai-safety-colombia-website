import type { Metadata } from "next";
import type { ReactNode } from "react";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { IconCursos, IconLibros, IconPodcasts, IconVideos } from "@/components/section-icons";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Reading, videos, podcasts, books and courses on AI safety, chosen by the community. Start with the five entry readings.",
  alternates: { canonical: "/en/resources", languages: alternativas("/en/resources") },
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
    lead: "To get a feel for the field without reading a whole article.",
    icono: IconVideos,
    forma: "cuadro",
    items: [
      {
        href: "https://www.youtube.com/@RobertMilesAI/videos",
        title: "Robert Miles AI Safety",
        miniatura: "/aisc/recursos/robert-miles.webp",
        quien: "Robert Miles",
        body: "The reference video library on alignment, control and the problems that are still open.",
      },
      {
        href: "https://www.youtube.com/@AI_In_Context",
        title: "AI In Context",
        miniatura: "/aisc/recursos/ai-in-context.webp",
        quien: "80,000 Hours",
        body: "Long documentaries on where AI is heading. The first one, on the AI 2027 scenario, passed ten million views.",
      },
      {
        href: "https://www.youtube.com/@RationalAnimations",
        title: "Rational Animations",
        miniatura: "/aisc/recursos/rational-animations.webp",
        quien: "YouTube",
        body: "Animations adapting classic essays on AI, rationality and existential risk.",
      },
      {
        href: "https://www.youtube.com/@Siliconversations",
        title: "Siliconversations",
        miniatura: "/aisc/recursos/siliconversations.webp",
        quien: "YouTube",
        body: "Short animated explainers, each on one concrete risk or proposal.",
      },
      {
        href: "https://www.youtube.com/@DoomDebates",
        title: "Doom Debates",
        miniatura: "/aisc/recursos/doom-debates.webp",
        quien: "Liron Shapira",
        body: "Debates and interviews where both positions on the risk are argued face to face.",
      },
    ],
  },
  {
    id: "podcasts",
    titulo: "Podcasts",
    lead: "Long conversations, good for a commute or the gym.",
    icono: IconPodcasts,
    forma: "cuadro",
    items: [
      {
        href: "https://axrp.net/",
        title: "AXRP",
        miniatura: "/aisc/recursos/axrp.webp",
        quien: "Daniel Filan",
        body: "The reference podcast on technical alignment: long interviews with the people doing the research.",
      },
      {
        href: "https://80000hours.org/podcast/",
        title: "The 80,000 Hours Podcast",
        miniatura: "/aisc/recursos/80k-podcast.webp",
        quien: "80,000 Hours",
        body: "Conversations with researchers, founders and policy people about what to do with your own career.",
      },
      {
        href: "https://www.cognitiverevolution.ai/",
        title: "The Cognitive Revolution",
        miniatura: "/aisc/recursos/cognitive-revolution.webp",
        quien: "Nathan Labenz",
        body: "Weekly, with people from the frontier labs. Useful for keeping up with what comes out.",
      },
      {
        href: "https://futureoflife.org/podcast/",
        title: "Future of Life Institute Podcast",
        miniatura: "/aisc/recursos/fli-podcast.webp",
        quien: "Future of Life Institute",
        body: "Interviews with researchers, regulators and philosophers on existential risk.",
      },
    ],
  },
  {
    id: "libros",
    titulo: "Books",
    lead: "For when you want the whole argument and not a summary.",
    icono: IconLibros,
    forma: "libro",
    items: [
      {
        href: "https://brianchristian.org/the-alignment-problem/",
        title: "The Alignment Problem",
        miniatura: "/aisc/recursos/alignment-problem.webp",
        quien: "Brian Christian",
        body: "An accessible account of why it is hard to align a system with what we actually want.",
      },
      {
        href: "https://people.eecs.berkeley.edu/~russell/hc.html",
        title: "Human Compatible",
        miniatura: "/aisc/recursos/human-compatible.webp",
        quien: "Stuart Russell",
        body: "The case, from one of the authors of the classic AI textbook, for rebuilding the field around uncertainty.",
      },
      {
        href: "https://nickbostrom.com/superintelligence",
        title: "Superintelligence",
        miniatura: "/aisc/recursos/superintelligence.webp",
        quien: "Nick Bostrom",
        body: "The book that brought the discussion of general AI into public debate. It is from 2014 and it shows, but it fixed the vocabulary.",
      },
      {
        href: "https://ifanyonebuildsit.com/",
        title: "If Anyone Builds It, Everyone Dies",
        miniatura: "/aisc/recursos/if-anyone-builds-it.webp",
        quien: "Yudkowsky and Soares, 2025",
        body: "The most direct version of the pessimistic case. Worth reading even if you do not share the conclusion.",
      },
    ],
  },
  {
    id: "cursos",
    titulo: "Courses",
    lead: "With deadlines, assignments and someone on the other side.",
    icono: IconCursos,
    items: [
      {
        href: "https://bluedot.org/courses/agi-strategy",
        title: "AGI Strategy",
        quien: "BlueDot Impact",
        body: "The entry point we recommend most. You work in groups of eight with a facilitator, taking a threat apart step by step to see which of those steps is worth intervening on.",
      },
      {
        href: "https://bluedot.org/courses/ai-governance",
        title: "Frontier AI Governance",
        quien: "BlueDot Impact",
        body: "Every unit leaves something finished: a brief aimed at someone who decides, a map of who has authority over frontier models, and a position of your own defended in writing.",
      },
      {
        href: "https://bluedot.org/courses/technical-ai-safety",
        title: "Technical AI Safety",
        quien: "BlueDot Impact",
        body: "It runs through alignment, interpretability, evaluations and control so you can tell which one fits you. Whoever finishes can apply to BlueDot's project sprint.",
      },
      {
        href: "https://deepmindsafetyresearch.medium.com/introducing-our-short-course-on-agi-safety-1072adb7912c",
        title: "AGI Safety Course",
        quien: "Google DeepMind",
        body: "Seventy-five minutes of recorded talks with exercises. It separates two ways an objective goes wrong: the model gaming the criterion it is rewarded on, or the model learning a different objective.",
      },
      {
        href: "https://aisafetybook.com/",
        title: "AI Safety, Ethics and Society",
        quien: "Center for AI Safety",
        body: "It treats safety as an engineering problem and not only a machine learning one: it carries over to AI what aviation and the nuclear industry learned about accidents.",
      },
      {
        href: "https://arena.education/curriculum",
        title: "ARENA",
        quien: "Five weeks, for people who already code",
        body: "You write code from day one: train a transformer, open it up to see what it computes inside, and build a test that measures a model.",
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

export default function Resources() {
  return (
    <main lang="en" className={PAGE_SHELL}>
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
        <SiteHeader active="/en/resources" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Resources</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              What we send to someone who asks where to start. Almost all of it is in English, which is where the
              field publishes.
            </p>
          </div>
        </div>
      </section>

      <section id="lecturas" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-12 md:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-6 pt-5 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Five readings to start with</h2>
            <p className="text-body-sm text-aisc-muted lg:pt-3">
              In this order. The first two assume nothing; the last one is a sequence and takes several sittings.
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
            <h2 className="text-display-3 md:text-display-3-lg text-balance">If you want to see the whole field</h2>
            <p className="text-body-sm text-aisc-ink lg:pt-2">
              <a className={ENLACE} href="https://aisafety.com/" target="_blank" rel="noopener noreferrer">
                aisafety.com
              </a>{" "}
              is an open directory with hundreds of organisations, programmes and projects, and with who funds each
              one.
            </p>
          </div>
        </div>
      </section>

      <CtaPanel
        kicker="They go further with company"
        title="Go through them with someone else"
        body="The reading group discusses one every fortnight, and the WhatsApp group is where you ask what does not add up."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the reading group
        </a>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the general group
        </a>
      </CtaPanel>
      <SiteFooter idioma="en" />
    </main>
  );
}
