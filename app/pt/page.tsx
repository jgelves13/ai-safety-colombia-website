import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import HackathonBanner from "@/components/hackathon-banner";
import { IconActualidad, IconQuienesSomos, IconSeguridad, IconUnete } from "@/components/section-icons";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, FILL_IMAGE, HERO_CORNER_CLASS } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "AI Safety Colombia — Rumo a uma inteligência artificial segura",
  description:
    "Comunidade na Colômbia de pesquisadores, engenheiros e profissionais de políticas públicas dedicada a que a inteligência artificial avance de forma segura e benéfica.",
  alternates: { canonical: "/pt", languages: alternativas("/pt") },
};

/* Tres puertas, no una copia del menu: son las tres preguntas que el sitio tiene
   que responderle a quien llega por primera vez. */
const PUERTAS = [
  {
    href: "/pt/seguranca-da-ia",
    Icon: IconSeguridad,
    title: "O que é AI safety?",
    body: "O que é o campo, por que importa e em que ponto está a discussão hoje.",
  },
  {
    href: "/pt/pesquisa",
    Icon: IconActualidad,
    title: "Pesquisa",
    body: "O que publica a gente daqui: artigos, documentos de trabalho e relatórios de pesquisa.",
  },
  {
    href: "/pt/participe",
    Icon: IconUnete,
    title: "Participe",
    body: "Programas, eventos e as quatro formas de entrar.",
  },
  {
    href: "/pt/quem-somos",
    Icon: IconQuienesSomos,
    title: "Quem somos",
    body: "Quem está por trás, desde quando e com quem trabalhamos.",
  },
];

/** el problema en tres piezas */
const PIEZAS = [
  {
    title: "Os sistemas vão mais rápido do que a nossa compreensão deles",
    body: "Todo ano os modelos fazem coisas que os próprios criadores não anteciparam. Entender por dentro como funcionam, conseguir que persigam o que queremos e mantê-los sob supervisão são problemas de pesquisa ainda abertos.",
  },
  {
    title: "As decisões já estão delegadas",
    body: "Seleção de pessoal, crédito, saúde, atendimento ao cidadão. Na Colômbia esses sistemas já operam, quase sempre comprados fora e ajustados com dados que não são os nossos.",
  },
  {
    title: "As regras estão sendo escritas agora",
    body: "Boa parte da governança da IA se define nos próximos anos, e nessa mesa há muito pouca gente da região. Formar quem possa sentar ali é parte do trabalho, não um anexo.",
  },
];

/** fotos reales de encuentros de AISC */
const FOTOS = [
  { src: "/aisc/eventos/panel-gobernanza.jpg", alt: "Painel sobre governança da IA na Colômbia" },
  { src: "/aisc/eventos/connect-latam.jpg", alt: "Encontro AI Safety Connect LATAM" },
  { src: "/aisc/eventos/algoritmo-a-la-ley.jpg", alt: "Sessão Do algoritmo à lei" },
  { src: "/aisc/eventos/cena-politica.jpg", alt: "Jantar de discussão sobre IA e políticas públicas" },
];

/** aliados de la organizacion. el hackathon tiene los suyos, y no van aca */
const ALIADOS = [
  {
    name: "Apart Research",
    logo: "/aisc/aliados/apart.png",
    href: "https://apartresearch.com",
    body: "Convoca hackathons de pesquisa em segurança da IA, abertos a participantes do mundo todo.",
  },
  {
    name: "BlueDot Impact",
    logo: "/aisc/aliados/bluedot.png",
    href: "https://bluedot.org/grants/rapid",
    body: "Seus cursos gratuitos são a entrada padrão no campo. Com os Rapid Grants financiam trabalho concreto: USD 1,4 milhão concedido no total e decisões em apenas três dias em média.",
  },
  {
    name: "Kairos",
    logo: "/aisc/aliados/kairos.png",
    href: "https://kairos-project.org",
    body: "Programas de mentoria e apoio a grupos universitários de segurança da IA.",
  },
  {
    name: "Coefficient Giving",
    logo: "/aisc/aliados/coefficient-giving.svg",
    href: "https://www.coefficientgiving.org",
    body: "Só em 2024 comprometeu cerca de 50 milhões de dólares em pesquisa técnica de segurança da IA. Até 2025 se chamava Open Philanthropy.",
  },
];

/** las dos tarjetas de programas, ambas sobre verde */
const PROGRAMAS = [
  {
    kicker: "Com a Apart Research",
    title: "Hackathons de pesquisa",
    body: "Um fim de semana para sair de ler sobre segurança da IA e produzir um trabalho próprio. A Apart Research os convoca globalmente e nós abrimos o hub presencial em Bogotá.",
  },
  {
    kicker: "Toda sexta-feira",
    title: "Grupo de leitura",
    body: "Nos reunimos para ler e discutir trabalhos recentes de segurança técnica. Aberto, em espanhol e sem requisitos prévios.",
  },
];

const CARD_BASE =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col";

export default function Home() {
  return (
    <main lang="pt" className="aisc-page flex flex-col">
      {/* mientras el sprint de septiembre siga abierto, manda sobre el hero */}
      <section className="relative bg-aisc-forest-deep text-aisc-sand">
        <SiteHeader />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-24 md:pt-28">
          <HackathonBanner />
        </div>
      </section>

      <section className="relative overflow-hidden bg-aisc-forest-deep text-aisc-sand">
        <img
          alt=""
          aria-hidden="true"
          width={1697}
          height={1415}
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-portada.svg"
        />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 relative z-10 flex min-h-[400px] items-center pt-12 pb-20 md:min-h-[460px] md:pt-16 md:pb-24">
          <div className="flex w-full max-w-[860px] flex-col items-start gap-5 text-left md:gap-6">
            <h1 className="text-display-1 md:text-display-1-lg max-w-[900px] text-balance text-aisc-sand">
              A inteligência artificial será a tecnologia mais determinante do nosso tempo. Que dê certo não está
              garantido.
            </h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Somos a comunidade que trabalha nisso desde a Colômbia: formação, pesquisa e eventos abertos em que dá
              para entrar hoje.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-t-[40px] bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 py-12 md:py-14 lg:py-16">
          <nav aria-label="Seções do site">
            <ul className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
              {PUERTAS.map((p) => (
                <li className="flex" key={p.href}>
                  <Link
                    className={`${CARD_BASE} group gap-6 p-6 transition-colors hover:bg-aisc-sand focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-forest md:min-h-[200px] md:p-7`}
                    href={p.href}
                  >
                    <span className="text-aisc-coral transition-colors group-hover:text-aisc-forest">
                      <p.Icon />
                    </span>
                    <span className="mt-auto flex flex-col gap-2">
                      <span className="text-display-4 md:text-display-4-lg block break-words text-aisc-forest transition-colors group-hover:text-aisc-forest-deep">
                        {p.title}
                      </span>
                      <span className="text-body-sm block text-aisc-ink">{p.body}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 py-12 md:gap-16 md:py-14 lg:gap-20 lg:py-16">
          <div className="flex flex-col gap-7">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">Do que se trata tudo isso?</h2>
              <div className="flex max-w-[760px] flex-col gap-4">
                <p className="text-body md:text-body-lg text-aisc-ink">
                  Não é uma discussão sobre robôs nem sobre um futuro distante. É o trabalho de fazer com que sistemas
                  cada vez mais capazes façam o que se espera deles, que quem os usa entenda seus limites e que existam
                  regras antes que causem dano. Vai da pesquisa técnica às políticas públicas.
                </p>
                <Link
                  className="text-body md:text-body-lg group inline-flex min-h-11 w-fit items-center gap-2 text-aisc-forest underline underline-offset-[5px] transition-colors hover:text-aisc-forest-deep"
                  href="/pt/seguranca-da-ia"
                >
                  Ler a versão longa
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {PIEZAS.map((pieza) => (
              <article
                className={`${CARD_BASE} p-6 md:min-h-[260px] md:p-7 lg:min-h-[290px] lg:p-8`}
                key={pieza.title}
              >
                <div className="flex max-w-[420px] min-w-0 flex-col gap-3">
                  <span aria-hidden="true" className="mb-2 block h-px w-10 bg-aisc-coral" />
                  <h3 className="text-display-3 md:text-display-3-lg break-words text-balance">{pieza.title}</h3>
                  <p className="text-body-sm text-aisc-ink">{pieza.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 py-12 md:gap-16 md:py-14 lg:gap-20 lg:py-16">
          <div className="flex flex-col gap-9">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg">Programas</h2>
              <div className="flex max-w-[760px] flex-col gap-5">
                <p className="text-body md:text-body-lg text-aisc-ink">
                  Formação e trabalho em grupo para quem quer entrar nisso de verdade, sem precisar ter começado antes.
                </p>
                <Link
                  className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                  href="/pt/participe"
                >
                  Ver tudo o que está aberto
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
            {PROGRAMAS.map((programa) => (
              <Link
                key={programa.title}
                className="group flex min-w-0 flex-col rounded-[8px] border border-aisc-forest bg-aisc-forest-deep p-6 text-aisc-sand transition-colors hover:bg-aisc-night md:min-h-[240px] md:p-8 lg:p-10"
                href="/pt/participe"
              >
                <span className="text-kicker text-aisc-sand/70">{programa.kicker}</span>
                <span className="mt-auto flex max-w-[560px] flex-col gap-3 pt-16 md:pt-20">
                  <span className="text-display-3 md:text-display-3-lg block">{programa.title}</span>
                  <span className="text-body-sm block max-w-[560px] text-aisc-sand/90">{programa.body}</span>
                </span>
                <span className="text-display-4 md:text-display-4-lg mt-10 w-fit self-start text-aisc-sand transition-colors group-hover:text-aisc-sand/72">
                  Saber mais
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream px-6 py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-12 rounded-[var(--radius)] bg-aisc-sand px-6 py-8 md:px-10 md:py-12 lg:gap-16 lg:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.95fr)] lg:items-center lg:gap-16">
            <div className="grid min-w-0 grid-cols-6 gap-2 md:gap-3">
              {FOTOS.map((foto) => (
                <div
                  className="col-span-3 aspect-[1.16] relative overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep"
                  key={foto.src}
                >
                  <img
                    alt={foto.alt}
                    loading="lazy"
                    decoding="async"
                    className="object-cover"
                    style={{ ...FILL_IMAGE, objectPosition: "center" }}
                    src={foto.src}
                  />
                </div>
              ))}
            </div>
            <div className="flex max-w-[700px] flex-col gap-7 lg:justify-self-start">
              <div className="flex flex-col gap-5">
                <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
                <h2 className="text-display-2 md:text-display-2-lg text-balance">Comunidade e eventos</h2>
                <div className="text-body md:text-body-lg flex max-w-[720px] flex-col gap-2 text-aisc-ink">
                  <p>Palestras abertas, oficinas e jantares de discussão em Bogotá.</p>
                  <p>
                    Encontros com pesquisadores e com gente de políticas públicas que já está trabalhando o tema no
                    país.
                  </p>
                </div>
              </div>
              <Link
                className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                href="/pt/participe"
              >
                Ver o que vem a seguir
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 py-12 md:gap-12 md:py-14 lg:gap-14 lg:py-16">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">Trabalhamos com</h2>
              <p className="text-body md:text-body-lg max-w-[760px] text-aisc-ink">
                Organizações com as quais mantemos trabalho contínuo. Das quatro também recebemos financiamento. Os
                aliados de cada hackathon são anunciados na chamada correspondente.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-4">
            {ALIADOS.map((aliado) => (
              <li className="flex" key={aliado.name}>
                <a
                  className={`${CARD_BASE} gap-6 p-6 transition-colors hover:bg-aisc-sand md:min-h-[210px] md:p-7`}
                  href={aliado.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex h-9 items-center md:h-10">
                    <img
                      src={aliado.logo}
                      alt={aliado.name}
                      loading="lazy"
                      className="h-full w-auto max-w-[220px] object-contain object-left"
                    />
                  </span>
                  <span className="text-body-sm mt-auto block max-w-[380px] text-aisc-ink">{aliado.body}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        title="Quer entrar?"
        body="Não é preciso ser pesquisador nem ter estudado inteligência artificial."
      >
        <a className={CTA_LINK_PRIMARY} href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer">
          Entrar no grupo de WhatsApp
        </a>
        <a className={CTA_LINK} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar 20 minutos
        </a>
        <a className={CTA_LINK} href="mailto:contacto@aisafetycolombia.org">
          Escrever para nós
        </a>
      </CtaPanel>
      <SiteFooter idioma="pt" />
    </main>
  );
}
