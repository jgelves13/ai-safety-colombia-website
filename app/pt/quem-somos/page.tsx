import type { Metadata } from "next";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "A primeira organização que trabalha para que na Colômbia haja gente dedicada à segurança da inteligência artificial. Formamos pessoas, apoiamos pesquisa e sustentamos a conversa pública sobre essas questões.",
  alternates: { canonical: "/pt/quem-somos", languages: alternativas("/pt/quem-somos") },
};

const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

type Persona = {
  nombre: string;
  rol: string;
  foto?: string;
  linkedin?: string;
  bio: React.ReactNode;
};

/* La ficha del sprint, tal cual: retrato cuadrado, nombre, rol y bio. Las dos
   filas usan la misma rejilla de cuatro columnas para que las seis fichas
   midan igual. */
function Ficha({ p }: { p: Persona }) {
  return (
    <li className="flex flex-col gap-3">
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
        {p.foto ? (
          <img
            alt={p.nombre}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
            src={p.foto}
          />
        ) : (
          <span aria-hidden="true" className="text-display-2 md:text-display-2-lg text-aisc-forest/45">
            {iniciales(p.nombre)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-display-4 font-semibold text-aisc-forest">
          {p.linkedin ? (
            <a
              className="underline decoration-aisc-forest/30 underline-offset-4 transition-colors hover:text-aisc-coral hover:decoration-aisc-coral"
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.nombre}
            </a>
          ) : (
            p.nombre
          )}
        </h3>
        <p className="text-body-sm text-aisc-muted">{p.rol}</p>
        <p className="text-body-sm mt-2 text-aisc-ink">{p.bio}</p>
      </div>
    </li>
  );
}

const EQUIPO: Persona[] = [
  {
    nombre: "Jose Gelves",
    rol: "Cofundador e diretor",
    foto: "/aisc/equipo/jose-gelves.png",
    linkedin: "https://www.linkedin.com/in/josegelves/",
    bio: (
      <>
        Consultor de transformação digital da{" "}
        <a className={ENLACE} href="https://uniandes.edu.co/" target="_blank" rel="noopener noreferrer">
          Universidad de los Andes
        </a>{" "}
        para o{" "}
        <a className={ENLACE} href="https://www.mintic.gov.co/" target="_blank" rel="noopener noreferrer">
          MinTIC
        </a>
        , o ministério de tecnologia da Colômbia. Bolsista Pathfinder do{" "}
        <a className={ENLACE} href="https://kairos-project.org" target="_blank" rel="noopener noreferrer">
          Kairos
        </a>{" "}
        e embaixador da{" "}
        <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
          Apart Research
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Fernando Avalos",
    rol: "Cofundador (in memoriam)",
    foto: "/aisc/equipo/fernando-avalos.png",
    linkedin: "https://www.linkedin.com/in/fernando-avalos-lopez/",
    bio: (
      <>
        Foi pesquisador da{" "}
        <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
          Apart Research
        </a>{" "}
        e engenheiro de pesquisa e analista de riscos no{" "}
        <a className={ENLACE} href="https://www.orcg.info/" target="_blank" rel="noopener noreferrer">
          Observatório de Riscos Catastróficos Globais
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Camila Beltrán",
    rol: "Grupo de leitura de AI control",
    foto: "/aisc/mentores/camila-beltran.png",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        Assessora sênior de IA no{" "}
        <a
          className={ENLACE}
          href="https://www.mintic.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MinTIC
        </a>{" "}
        e especialista da{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OCDE
        </a>
        . Como Winter Fellow do{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>
        , pesquisou as{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          regras europeias
        </a>{" "}
        sobre cenários de perda de controle.
      </>
    ),
  },
  {
    nombre: "Sofía Botia",
    rol: "Voluntária",
    foto: "/aisc/equipo/sofia-botia.png",
    linkedin:
      "https://www.linkedin.com/in/karen-sof%C3%ADa-botia-vizcaya-2898b334b/",
    bio: (
      <>
        Estudante de Direito na{" "}
        <a className={ENLACE} href="https://uniandes.edu.co/" target="_blank" rel="noopener noreferrer">
          Universidad de los Andes
        </a>
        . Assistente de pesquisa na{" "}
        <a className={ENLACE} href="https://www.psu.edu/" target="_blank" rel="noopener noreferrer">
          Penn State
        </a>{" "}
        e monitora de pesquisa na{" "}
        <a className={ENLACE} href="https://www.hbs.edu/" target="_blank" rel="noopener noreferrer">
          Harvard Business School
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Leonardo Párraga",
    rol: "Voluntário",
    foto: "/aisc/equipo/leonardo-parraga.png",
    linkedin: "https://www.linkedin.com/in/leonardoparraga/",
    bio: (
      /* La Coalición no tiene sitio propio, así que el nombre va sin enlace. */
      <>
        Cofundador e codiretor da Coalizão Colombiana de Juventudes, Paz e Segurança. Mestrado em política
        educativa internacional pela{" "}
        <a className={ENLACE} href="https://www.gse.harvard.edu/" target="_blank" rel="noopener noreferrer">
          Harvard Graduate School of Education
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Manuel Cabrera",
    rol: "Voluntário",
    foto: "/aisc/equipo/manuel-cabrera.png",
    linkedin: "https://www.linkedin.com/in/manueloff14/",
    bio: (
      <>
        Trabalhou recentemente como programador full stack no{" "}
        <a className={ENLACE} href="https://www.linkedin.com/company/aeuniandes" target="_blank" rel="noopener noreferrer">
          Altruísmo Eficaz Uniandes
        </a>
        . Acaba de terminar o ensino médio.
      </>
    ),
  },
];

/* Cuantas fichas van arriba. El resto baja a la segunda fila. */
const EN_PRIMERA_FILA = 2;

const ALIADOS = [
  {
    name: "Apart Research",
    body: "Convocam hackathons de pesquisa abertos a qualquer pessoa no mundo. Nós abrimos o hub presencial em Bogotá e acompanhamos as equipes que competem daqui.",
    logo: "/aisc/aliados/apart.png",
    href: "https://apartresearch.com",
  },
  {
    name: "BlueDot Impact",
    body: "Seus cursos gratuitos são a porta de entrada padrão do campo. Pelos Rapid Grants financiam trabalho concreto: 1,4 milhão de dólares concedidos e decisões em três dias.",
    logo: "/aisc/aliados/bluedot.png",
    href: "https://bluedot.org/grants/rapid",
  },
  {
    name: "Kairos",
    body: "Seu programa Pathfinder financia e acompanha quem constrói comunidades de segurança da IA: este ano, 69 organizadores de 50 universidades em 12 países.",
    logo: "/aisc/aliados/kairos.png",
    href: "https://kairos-project.org",
  },
  {
    name: "Coefficient Giving",
    body: "Respondem por boa parte do financiamento filantrópico do campo: só em 2024 comprometeram cerca de 50 milhões de dólares em pesquisa técnica de segurança da IA.",
    logo: "/aisc/aliados/coefficient-giving.svg",
    href: "https://www.coefficientgiving.org",
  },
];

export default function QuemSomos() {
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
          src="/aisc/patterns/aisc-hero-quienes-somos.svg"
        />
        <SiteHeader active="/pt/quem-somos" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Desde 2024</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">Quem somos</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              A primeira organização que trabalha para que na Colômbia haja gente dedicada à segurança da inteligência
              artificial.
            </p>
          </div>
        </div>
      </section>

      <section id="mision" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="flex flex-col gap-8 md:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg">Por que existimos</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
              <p>
                Os sistemas de inteligência artificial ganham capacidades mais rápido do que cresce nossa compreensão
                sobre eles, e muito pouca gente trabalha nos riscos que isso cria. Na Colômbia, quem já estava na área
                trabalhava sobretudo por conta própria e, até 2024, nenhuma organização se dedicava a conectar esses
                esforços.
              </p>
              <p>
                Isso pesa num país de 52 milhões de pessoas que vão usar esses sistemas, regulá-los e ser afetadas por
                eles. Criamos a AI Safety Colombia para que quem queira trabalhar nesses problemas tenha por onde
                entrar, e para que, quando se decidir sobre IA, haja aqui gente que entenda o que está em jogo.
              </p>
              <p>
                Somos uma organização pequena e voluntária. Nosso trabalho é concreto: formar pessoas, apoiar pesquisa
                e sustentar a conversa pública sobre essas questões na Colômbia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="equipo" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-0 pb-14 md:pb-20 lg:pb-24">
          <div className="flex flex-col gap-8 md:gap-10">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] sm:items-start sm:gap-8">
              <h2 className="text-display-2 md:text-display-2-lg">A equipe</h2>
              <p className="text-body-sm text-aisc-ink md:text-body md:text-body-lg">
                As pessoas que mantêm isto de pé. Somos todos voluntários, e a organização se financia com doações e
                com o orçamento dos programas que realizamos.
              </p>
            </div>
          </div>
          {/* La misma rejilla del sprint (dos, tres y cinco columnas) para que
              el retrato mida lo mismo alli y aca. La primera fila ocupa dos de
              los cinco puestos y la segunda, cuatro. */}
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-16 lg:mt-20 lg:grid-cols-5">
            {EQUIPO.slice(0, EN_PRIMERA_FILA).map((p) => (
              <Ficha key={p.nombre} p={p} />
            ))}
          </ul>

          {/* La segunda fila siempre tiene cuatro puestos. Los que aun no
              tienen nombre quedan marcados, no escondidos. */}
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-10 lg:grid-cols-5">
            {EQUIPO.slice(EN_PRIMERA_FILA).map((p) => (
              <Ficha key={p.nombre} p={p} />
            ))}
            {Array.from({ length: Math.max(0, 4 - (EQUIPO.length - EN_PRIMERA_FILA)) }).map((_, i) => (
              <li className="flex flex-col gap-3" key={`por-anunciar-${i}`}>
                <div className="flex aspect-square w-full items-center justify-center rounded-[8px] border border-dashed border-aisc-forest/40 p-4 text-center">
                  <span className="text-body-sm text-aisc-muted">A anunciar</span>
                </div>
              </li>
            ))}
          </ul>

        </div>
      </section>

      <section id="aliados" className="bg-aisc-cream px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] md:items-start md:gap-6">
              <h2 className="text-display-2 md:text-display-2-lg">Com quem trabalhamos</h2>
              <p className="text-body-sm text-aisc-ink md:text-body md:text-body-lg">
                Quatro organizações do campo com as quais sustentamos trabalho, e das quais também recebemos
                financiamento.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-3 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
              {ALIADOS.map((aliado) => (
                <a
                  key={aliado.name}
                  href={aliado.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[190px] flex-col justify-between gap-8 rounded-[12px] border border-aisc-forest-deep bg-transparent p-7 transition-colors hover:bg-aisc-cream lg:p-9"
                >
                  <div className="flex h-[42px] items-center">
                    <img src={aliado.logo} alt={aliado.name} className="max-h-[38px] w-auto object-contain" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-display-4 md:text-display-4-lg text-balance">{aliado.name}</h3>
                    <p className="text-body-sm text-aisc-ink">{aliado.body}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Quer ser voluntário?"
        body="Não há filiação nem edital: você aparece num evento, num programa ou numa conversa."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://cal.com/josegelves/meeting"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conversar 20 minutos
        </a>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar no grupo
        </a>
      </CtaPanel>
      <SiteFooter idioma="pt" />
    </main>
  );
}
