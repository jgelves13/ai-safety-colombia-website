import type { Metadata } from "next";
import type { ReactNode } from "react";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { IconCursos, IconLibros, IconPodcasts, IconVideos } from "@/components/section-icons";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Leituras, vídeos, podcasts, livros e cursos sobre segurança da IA, escolhidos pela comunidade. Comece pelas cinco leituras de entrada.",
  alternates: { canonical: "/pt/recursos", languages: alternativas("/pt/recursos") },
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
    titulo: "Vídeos",
    lead: "Para entender o campo sem ler um artigo inteiro.",
    icono: IconVideos,
    forma: "cuadro",
    items: [
      {
        href: "https://www.youtube.com/@RobertMilesAI/videos",
        title: "Robert Miles AI Safety",
        miniatura: "/aisc/recursos/robert-miles.webp",
        quien: "Robert Miles",
        body: "A biblioteca de referência em vídeo sobre alinhamento, controle e os problemas que seguem abertos.",
      },
      {
        href: "https://www.youtube.com/@AI_In_Context",
        title: "AI In Context",
        miniatura: "/aisc/recursos/ai-in-context.webp",
        quien: "80,000 Hours",
        body: "Documentários longos sobre para onde vai a IA. O primeiro, sobre o cenário IA 2027, passou dos dez milhões de reproduções.",
      },
      {
        href: "https://www.youtube.com/@RationalAnimations",
        title: "Rational Animations",
        miniatura: "/aisc/recursos/rational-animations.webp",
        quien: "YouTube",
        body: "Animações que adaptam ensaios clássicos sobre IA, racionalidade e risco existencial.",
      },
      {
        href: "https://www.youtube.com/@Siliconversations",
        title: "Siliconversations",
        miniatura: "/aisc/recursos/siliconversations.webp",
        quien: "YouTube",
        body: "Explicações animadas e curtas, cada uma sobre um risco ou uma proposta concreta.",
      },
      {
        href: "https://www.youtube.com/@DoomDebates",
        title: "Doom Debates",
        miniatura: "/aisc/recursos/doom-debates.webp",
        quien: "Liron Shapira",
        body: "Debates e entrevistas em que as duas posições sobre o risco se discutem de frente.",
      },
    ],
  },
  {
    id: "podcasts",
    titulo: "Podcasts",
    lead: "Conversas longas, boas para o trajeto ou a academia.",
    icono: IconPodcasts,
    forma: "cuadro",
    items: [
      {
        href: "https://axrp.net/",
        title: "AXRP",
        miniatura: "/aisc/recursos/axrp.webp",
        quien: "Daniel Filan",
        body: "O podcast de referência em alinhamento técnico: entrevistas extensas com quem faz a pesquisa.",
      },
      {
        href: "https://80000hours.org/podcast/",
        title: "The 80,000 Hours Podcast",
        miniatura: "/aisc/recursos/80k-podcast.webp",
        quien: "80,000 Hours",
        body: "Conversas com pesquisadores, fundadores e gente de política pública sobre o que fazer com a própria carreira.",
      },
      {
        href: "https://www.cognitiverevolution.ai/",
        title: "The Cognitive Revolution",
        miniatura: "/aisc/recursos/cognitive-revolution.webp",
        quien: "Nathan Labenz",
        body: "Semanal, com gente dos laboratórios de fronteira. Serve para acompanhar o que vai saindo.",
      },
      {
        href: "https://futureoflife.org/podcast/",
        title: "Future of Life Institute Podcast",
        miniatura: "/aisc/recursos/fli-podcast.webp",
        quien: "Future of Life Institute",
        body: "Entrevistas com pesquisadores, reguladores e filósofos sobre risco existencial.",
      },
    ],
  },
  {
    id: "libros",
    titulo: "Livros",
    lead: "Quando você já quer o argumento completo e não um resumo.",
    icono: IconLibros,
    forma: "libro",
    items: [
      {
        href: "https://brianchristian.org/the-alignment-problem/",
        title: "The Alignment Problem",
        miniatura: "/aisc/recursos/alignment-problem.webp",
        quien: "Brian Christian",
        body: "Uma narrativa acessível de por que é difícil alinhar um sistema com o que de fato queremos.",
      },
      {
        href: "https://people.eecs.berkeley.edu/~russell/hc.html",
        title: "Human Compatible",
        miniatura: "/aisc/recursos/human-compatible.webp",
        quien: "Stuart Russell",
        body: "O argumento de um dos autores do manual clássico de IA para redefinir o campo em torno da incerteza.",
      },
      {
        href: "https://nickbostrom.com/superintelligence",
        title: "Superintelligence",
        miniatura: "/aisc/recursos/superintelligence.webp",
        quien: "Nick Bostrom",
        body: "O livro que levou a discussão sobre IA geral ao debate público. É de 2014 e se nota, mas fixa o vocabulário.",
      },
      {
        href: "https://ifanyonebuildsit.com/",
        title: "If Anyone Builds It, Everyone Dies",
        miniatura: "/aisc/recursos/if-anyone-builds-it.webp",
        quien: "Yudkowsky e Soares, 2025",
        body: "A versão mais direta do caso pessimista. Útil mesmo para quem não compartilha a conclusão.",
      },
    ],
  },
  {
    id: "cursos",
    titulo: "Cursos",
    lead: "Com prazos, tarefas e alguém do outro lado.",
    icono: IconCursos,
    items: [
      {
        href: "https://bluedot.org/courses/agi-strategy",
        title: "AGI Strategy",
        quien: "BlueDot Impact",
        body: "A porta de entrada que mais recomendamos. Trabalha-se em grupos de oito com um facilitador, desmontando uma ameaça passo a passo para ver em qual desses passos convém intervir.",
      },
      {
        href: "https://bluedot.org/courses/ai-governance",
        title: "Frontier AI Governance",
        quien: "BlueDot Impact",
        body: "Cada unidade deixa algo pronto: um relatório dirigido a quem decide, um mapa de quem manda sobre os modelos de fronteira e uma posição própria defendida por escrito.",
      },
      {
        href: "https://bluedot.org/courses/technical-ai-safety",
        title: "Technical AI Safety",
        quien: "BlueDot Impact",
        body: "Percorre alinhamento, interpretabilidade, avaliações e controle para que você saiba em qual se encaixa. Quem termina pode se candidatar ao sprint de projetos da BlueDot.",
      },
      {
        href: "https://deepmindsafetyresearch.medium.com/introducing-our-short-course-on-agi-safety-1072adb7912c",
        title: "AGI Safety Course",
        quien: "Google DeepMind",
        body: "Setenta e cinco minutos de palestras gravadas com exercícios. Separa duas maneiras de um objetivo dar errado: o modelo explorar o critério pelo qual é premiado, ou aprender outro objetivo.",
      },
      {
        href: "https://aisafetybook.com/",
        title: "AI Safety, Ethics and Society",
        quien: "Center for AI Safety",
        body: "Trata a segurança como um problema de engenharia e não só de aprendizado de máquina: leva para a IA o que a aviação e a indústria nuclear aprenderam sobre acidentes.",
      },
      {
        href: "https://arena.education/curriculum",
        title: "ARENA",
        quien: "Cinco semanas, para quem já programa",
        body: "Programa-se desde o primeiro dia: treinar um transformador, abri-lo para ver o que calcula por dentro e montar um teste que meça um modelo.",
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
    <main lang="pt" className={PAGE_SHELL}>
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
        <SiteHeader active="/pt/recursos" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Recursos</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              O que passamos a quem pergunta por onde começar. Quase tudo está em inglês, que é onde o campo publica.
            </p>
          </div>
        </div>
      </section>

      <section id="lecturas" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-12 md:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-6 pt-5 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Cinco leituras para começar</h2>
            <p className="text-body-sm text-aisc-muted lg:pt-3">
              Nesta ordem. As duas primeiras não pressupõem nada; a última é uma sequência e leva várias sessões.
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
            <h2 className="text-display-3 md:text-display-3-lg text-balance">Se você quiser ver o campo inteiro</h2>
            <p className="text-body-sm text-aisc-ink lg:pt-2">
              <a className={ENLACE} href="https://aisafety.com/" target="_blank" rel="noopener noreferrer">
                aisafety.com
              </a>{" "}
              é um diretório aberto com centenas de organizações, programas e projetos, e com quem financia cada
              coisa.
            </p>
          </div>
        </div>
      </section>

      <CtaPanel
        kicker="Rendem mais acompanhados"
        title="Percorra-os com mais alguém"
        body="No grupo de leitura se discute um a cada quinze dias, e no de WhatsApp se pergunta o que não fecha."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar no grupo de leitura
        </a>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar no grupo geral
        </a>
      </CtaPanel>
      <SiteFooter idioma="pt" />
    </main>
  );
}
