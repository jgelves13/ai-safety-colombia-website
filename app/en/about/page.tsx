import type { Metadata } from "next";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "About us",
  description:
    "The first organisation working to build a community in Colombia dedicated to the safety of artificial intelligence. We train people, support research and sustain the public conversation on these questions.",
  alternates: { canonical: "/en/about", languages: alternativas("/en/about") },
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
    rol: "Co-founder and director",
    foto: "/aisc/equipo/jose-gelves.png",
    linkedin: "https://www.linkedin.com/in/josegelves/",
    bio: (
      <>
        Digital transformation consultant at{" "}
        <a className={ENLACE} href="https://uniandes.edu.co/" target="_blank" rel="noopener noreferrer">
          Universidad de los Andes
        </a>{" "}
        for{" "}
        <a className={ENLACE} href="https://www.mintic.gov.co/" target="_blank" rel="noopener noreferrer">
          MinTIC
        </a>
        , Colombia&rsquo;s ICT ministry. Pathfinder fellow at{" "}
        <a className={ENLACE} href="https://kairos-project.org" target="_blank" rel="noopener noreferrer">
          Kairos
        </a>{" "}
        and ambassador for{" "}
        <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
          Apart Research
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Fernando Avalos",
    rol: "Co-founder (in memoriam)",
    foto: "/aisc/equipo/fernando-avalos.png",
    linkedin: "https://www.linkedin.com/in/fernando-avalos-lopez/",
    bio: (
      <>
        He was a researcher at{" "}
        <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
          Apart Research
        </a>{" "}
        and a research engineer and risk analyst at the{" "}
        <a className={ENLACE} href="https://www.orcg.info/" target="_blank" rel="noopener noreferrer">
          Observatory of Global Catastrophic Risks
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Camila Beltrán",
    rol: "AI control reading group",
    foto: "/aisc/mentores/camila-beltran.png",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        Senior AI adviser at{" "}
        <a
          className={ENLACE}
          href="https://www.mintic.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MinTIC
        </a>{" "}
        and an expert with the{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OECD
        </a>
        . As a Winter Fellow at{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>
        , she researched the{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          European rules
        </a>{" "}
        on loss-of-control scenarios.
      </>
    ),
  },
  {
    nombre: "Sofía Botia",
    rol: "Volunteer",
    foto: "/aisc/equipo/sofia-botia.png",
    linkedin:
      "https://www.linkedin.com/in/karen-sof%C3%ADa-botia-vizcaya-2898b334b/",
    bio: (
      <>
        Law student at{" "}
        <a className={ENLACE} href="https://uniandes.edu.co/" target="_blank" rel="noopener noreferrer">
          Universidad de los Andes
        </a>
        . Research assistant at{" "}
        <a className={ENLACE} href="https://www.psu.edu/" target="_blank" rel="noopener noreferrer">
          Penn State
        </a>{" "}
        and research monitor at{" "}
        <a className={ENLACE} href="https://www.hbs.edu/" target="_blank" rel="noopener noreferrer">
          Harvard Business School
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Leonardo Párraga",
    rol: "Volunteer",
    foto: "/aisc/equipo/leonardo-parraga.png",
    linkedin: "https://www.linkedin.com/in/leonardoparraga/",
    bio: (
      /* La Coalición no tiene sitio propio, así que el nombre va sin enlace. */
      <>
        Co-founder and co-director of the Colombian Coalition on Youth, Peace and Security. Master&rsquo;s in
        international education policy from the{" "}
        <a className={ENLACE} href="https://www.gse.harvard.edu/" target="_blank" rel="noopener noreferrer">
          Harvard Graduate School of Education
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Manuel Cabrera",
    rol: "Volunteer",
    foto: "/aisc/equipo/manuel-cabrera.png",
    linkedin: "https://www.linkedin.com/in/manueloff14/",
    bio: (
      <>
        Recently worked as a full stack developer at{" "}
        <a className={ENLACE} href="https://www.linkedin.com/company/aeuniandes" target="_blank" rel="noopener noreferrer">
          Effective Altruism Uniandes
        </a>
        . He has just finished secondary school.
      </>
    ),
  },
];

/* Cuantas fichas van arriba. El resto baja a la segunda fila. */
const EN_PRIMERA_FILA = 2;

const ALIADOS = [
  {
    name: "Apart Research",
    body: "They convene research hackathons open to anyone in the world. We open the in-person hub in Bogotá and support the teams competing from here.",
    logo: "/aisc/aliados/apart.png",
    href: "https://apartresearch.com",
  },
  {
    name: "BlueDot Impact",
    body: "Their free courses are the standard way into the field. Through Rapid Grants they fund concrete work: 1.4 million dollars awarded and decisions in three days.",
    logo: "/aisc/aliados/bluedot.png",
    href: "https://bluedot.org/grants/rapid",
  },
  {
    name: "Kairos",
    body: "Their Pathfinder programme funds and supports people who build AI safety communities: this year, 69 organisers from 50 universities in 12 countries.",
    logo: "/aisc/aliados/kairos.png",
    href: "https://kairos-project.org",
  },
  {
    name: "Coefficient Giving",
    body: "They account for much of the philanthropic funding in the field: in 2024 alone they committed some 50 million dollars to technical AI safety research.",
    logo: "/aisc/aliados/coefficient-giving.svg",
    href: "https://www.coefficientgiving.org",
  },
];

export default function About() {
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
          src="/aisc/patterns/aisc-hero-quienes-somos.svg"
        />
        <SiteHeader active="/en/about" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Since 2024</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">About us</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              The first organisation working to build a community in Colombia dedicated to the safety of artificial
              intelligence.
            </p>
          </div>
        </div>
      </section>

      <section id="mision" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="flex flex-col gap-8 md:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg">Why we exist</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
              <p>
                Artificial intelligence systems gain capabilities faster than our understanding of them grows, and
                very few people are working on the risks this creates. In Colombia, those already in the area worked
                mostly on their own and, until 2024, no organisation was dedicated to connecting those efforts.
              </p>
              <p>
                That matters in a country of 52 million people who will use these systems, regulate them and be
                affected by them. We created AI Safety Colombia so that anyone who wants to work on these problems has
                a way in, and so that when decisions about AI are made there are people here who understand what is at
                stake.
              </p>
              <p>
                We are a small, volunteer organisation. Our work is concrete: training people, supporting research and
                sustaining the public conversation on these questions in Colombia.
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
              <h2 className="text-display-2 md:text-display-2-lg">The team</h2>
              <p className="text-body-sm text-aisc-ink md:text-body md:text-body-lg">
                The people who keep this running. We are all volunteers, and the organisation is funded by donations
                and by the budgets of the programmes we run.
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
                  <span className="text-body-sm text-aisc-muted">To be announced</span>
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
              <h2 className="text-display-2 md:text-display-2-lg">Who we work with</h2>
              <p className="text-body-sm text-aisc-ink md:text-body md:text-body-lg">
                Four organisations in the field with whom we sustain work, and from whom we have also received
                funding.
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
        title="Want to volunteer?"
        body="There is no membership and no open call: you turn up at an event, a programme or a conversation."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://cal.com/josegelves/meeting"
          target="_blank"
          rel="noopener noreferrer"
        >
          Talk for 20 minutes
        </a>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the group
        </a>
      </CtaPanel>
      <SiteFooter idioma="en" />
    </main>
  );
}
