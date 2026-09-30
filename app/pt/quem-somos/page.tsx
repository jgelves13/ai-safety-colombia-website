import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Quem somos?",
  description:
    "Comunidade na Colômbia que trabalha para reduzir os riscos da inteligência artificial avançada: formamos quem quer entrar no campo, apoiamos pesquisa e organizamos eventos abertos.",
  alternates: { canonical: "/pt/quem-somos", languages: alternativas("/pt/quem-somos") },
};

const ENLACE =
  "text-aisc-forest transition-colors hover:text-aisc-coral";

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
              className="text-aisc-forest transition-colors hover:text-aisc-coral"
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
    rol: "Grupo de AI Control",
    foto: "/aisc/mentores/camila-beltran.png",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        Consultora em governança de IA para várias organizações. Membro do grupo
        de especialistas da{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OCDE
        </a>{" "}
        e pesquisadora associada do{" "}
        <a
          className={ENLACE}
          href="https://aiforgood.itu.int/multimedia-authenticity/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AMAS Young Research Programme
        </a>{" "}
        da UIT. Como Winter Fellow do{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>{" "}
        pesquisou a{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          regulação europeia
        </a>{" "}
        dos cenários de perda de controle.
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
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">Quem somos?</h1>
            <nav aria-label="Nesta página">
              <ul className="flex flex-wrap gap-2">
                <li>
                  <a className="text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep" href="#sobre">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a className="text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep" href="#que-hacemos">
                    O que fazemos
                  </a>
                </li>
                <li>
                  <a className="text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep" href="#equipo">
                    Equipe
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,1.4fr)] md:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg">Sobre nós</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
              <p>A AI Safety Colombia é uma comunidade, criada em 2024, que trabalha para reduzir os riscos da inteligência artificial avançada. Formamos quem quer entrar no campo, apoiamos pesquisa e organizamos eventos abertos.</p>
              <p>
                A comunidade reúne estudantes, pesquisadores, engenheiros e profissionais de políticas públicas. A participação é pelo grupo de leitura, pelas palestras e pelos hackathons de pesquisa: <Link className={ENLACE} href="/pt/participe">veja como entrar</Link>.
              </p>
              <p>
                Trabalhamos com a <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">Apart Research</a> e a <a className={ENLACE} href="https://bluedot.org" target="_blank" rel="noopener noreferrer">BlueDot Impact</a>, com apoio da <a className={ENLACE} href="https://kairos-project.org" target="_blank" rel="noopener noreferrer">Kairos</a> e da <a className={ENLACE} href="https://www.coefficientgiving.org" target="_blank" rel="noopener noreferrer">Coefficient Giving</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="que-hacemos" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-4 pb-14 md:pb-20 lg:pb-24">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <h2 className="text-display-2 md:text-display-2-lg">O que fazemos</h2>
          <ul className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Grupo de leitura de AI Control</h3>
              <p className="text-body text-aisc-ink">A cada quinze dias, às sextas-feiras, discutimos uma leitura sobre como supervisionar sistemas de IA que agem por conta própria. Qualquer nível de conhecimento é bem-vindo.</p>
              <span className="text-body-sm"><a className={ENLACE} href="https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB" target="_blank" rel="noopener noreferrer">Entrar no grupo de leitura →</a></span>
            </li>
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Hackathons de pesquisa</h3>
              <p className="text-body text-aisc-ink">Abrimos em Bogotá o hub presencial dos hackathons da Apart Research. As equipes saem com um trabalho próprio e retorno escrito de jurados de fora.</p>
              <span className="text-body-sm"><Link className={ENLACE} href="/pt/sprint">Ver o sprint →</Link></span>
            </li>
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Palestras e oficinas</h3>
              <p className="text-body text-aisc-ink">Pesquisadores da área apresentam seu trabalho e respondem perguntas pessoalmente.</p>
              <span className="text-body-sm"><a className={ENLACE} href="https://luma.com/user/usr-TMDEtNWA1TozP77" target="_blank" rel="noopener noreferrer">Ver os próximos →</a></span>
            </li>
            <li className="flex flex-col gap-3 border-t border-aisc-forest-deep/30 pt-6">
              <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">Pesquisa</h3>
              <p className="text-body text-aisc-ink">Trabalhos publicados por pessoas da comunidade.</p>
              <span className="text-body-sm"><Link className={ENLACE} href="/pt/pesquisa">Ver as publicações →</Link></span>
            </li>
          </ul>
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
