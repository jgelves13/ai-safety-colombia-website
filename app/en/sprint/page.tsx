import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HeroHackathon } from "@/components/hero-hackathon";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  CTA_PATTERN_BOTTOM,
  CTA_PATTERN_TOP,
  HERO_FUGA_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { APART_SPRINT_URL, CIERRE_TEXTO_IDIOMA } from "@/app/sprint/datos";
import { alternativas } from "@/lib/idiomas";

const CIERRE_TEXTO = CIERRE_TEXTO_IDIOMA.en;

export const metadata: Metadata = {
  title: "AI Incident Response Sprint",
  description:
    "11 to 13 September 2026. Apart Research and CeSIA convene the sprint on AI incident response. We open the in-person hub in Bogotá; applications close at midnight on Sunday 6 September.",
  alternates: { canonical: "/en/sprint", languages: alternativas("/en/sprint") },
};

const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* Los tres datos que alguien busca antes de leer nada más. Una cifra grande y
   una línea de apoyo, sin más: es lo que hace que se lean de un vistazo. */
const DATOS = [
  {
    valor: "11 to 13 September",
    nota: "Three days, from Friday afternoon to Sunday night",
  },
  {
    valor: "Bogotá and online",
    nota: "In-person hub in Bogotá, venue to be confirmed",
  },
  {
    valor: "USD 2,000 in prizes",
    nota: "Five winners worldwide, picked by Apart across the whole sprint",
  },
];

/* Los cinco tracks son de Apart. La descripción resume lo que su convocatoria
   pide como entregable, no lo que a nosotros nos parece interesante. */
const TRACKS = [
  {
    id: "contencion",
    titulo: "Containment standards",
    body: "Write the minimum any sandboxed evaluation should run under. This track is for whoever can propose a control matrix by attack phase, or package mitigations so that a third party can verify they are met.",
  },
  {
    id: "analisis",
    titulo: "Incident analysis",
    body: "Reconstruct what happened and where the monitoring failed. What is wanted here: questions someone can actually answer, checks that can be run tomorrow, and causal explanations that predict something.",
  },
  {
    id: "regulacion",
    titulo: "Regulatory response",
    body: "Draft information requests a regulator could use almost unedited, stress-test the reporting systems that already exist, and point at the legal gaps they leave behind.",
  },
  {
    id: "comunicacion",
    titulo: "Communication strategy",
    body: "Audit how the press covered the incident and build the kit for communicating the next one. What counts here is staying anchored to the record of what actually happened.",
  },
  {
    id: "abierto",
    titulo: "Open track",
    body: "Any other angle on the same problem. The condition is the usual one: an artefact someone can use and an honest sentence about how far what it shows really goes.",
  },
];

/* Quién convoca el sprint y quién pone la plata del hub. Los logos viven en
   public/aisc/aliados/. */
const GRUPOS = [
  {
    rotulo: "Sprint organisers",
    orgs: [
      {
        name: "Apart Research",
        body: "AI safety research lab. Convenes the sprint, defines the five tracks, puts up the prizes and publishes the reports.",
        logo: "/aisc/aliados/apart.png",
        href: "https://apartresearch.com",
      },
      {
        name: "CeSIA",
        body: "France's centre for AI safety. Co-organises the sprint and takes the material that comes out of it to European regulators.",
        logo: "/aisc/aliados/cesia.svg",
        href: "https://www.securite-ia.fr",
      },
    ],
  },
  {
    rotulo: "Funding the hub in Bogotá",
    orgs: [
      {
        name: "Apart Research",
        body: "Beyond convening the sprint, it supports the groups that open an in-person hub over the weekend.",
        logo: "/aisc/aliados/apart.png",
        href: "https://apartresearch.com",
      },
      {
        name: "BlueDot Impact",
        body: "Their free courses are the standard way into the field. Through Rapid Grants they fund concrete work: 1.4 million dollars awarded in total and decisions in three days on average.",
        logo: "/aisc/aliados/bluedot.png",
        href: "https://bluedot.org/grants/rapid",
      },
      {
        name: "Pathfinder Fellowship",
        body: "Kairos fellowship for people building AI safety communities. It contributes mentorship and funding for their activities.",
        logo: "/aisc/aliados/pathfinder.png",
        href: "https://pathfinder.kairos-project.org",
      },
    ],
  },
];

/* Lo que ponemos nosotros. Cada línea es una cosa que el sitio se compromete a
   dar; lo que aún no está cerrado se dice que no está cerrado. */
const HUB = [
  {
    titulo: "Meals",
    body: "We cover meals for all three days, so teams do not have to leave the room to sort it out.",
  },
  {
    titulo: "Compute support",
    body: "We cover part of the teams' compute costs. The figure is confirmed before applications close.",
  },
  {
    titulo: "Mentorship in the room",
    body: "People who work in incident response, offensive security and regulation come through the hub over the weekend.",
  },
  {
    titulo: "Room and connectivity",
    body: "A workspace for the whole weekend, with tables for teams and somewhere to plug in.",
  },
  {
    titulo: "People to build a team with",
    body: "Teams form on Friday night, in the room. Plenty of people arrive alone and leave with a team.",
  },
  {
    titulo: "Limited places",
    body: "The hub has a capacity, so there is a selection process. You apply through the form and we let you know by email.",
  },
];

/* Premios de Apart, tal como los publica su convocatoria. */
const PREMIOS = [
  { puesto: "First place", monto: "1,000" },
  { puesto: "Second place", monto: "500" },
  { puesto: "Third place", monto: "300" },
  { puesto: "Fourth place", monto: "100" },
  { puesto: "Fifth place", monto: "100" },
];

/* Los mentores, al modo de SASH: retrato cuadrado, nombre, rol y una bio de
   dos o tres frases. Mientras no tengamos la foto de alguien se muestra la
   tarjeta con sus iniciales; el archivo va en public/aisc/mentores/. */
const MENTORES: {
  nombre: string;
  rol: string;
  foto?: string;
  linkedin?: string;
  bio?: React.ReactNode;
}[] = [
  {
    nombre: "Camila Beltrán",
    rol: "Mentor and speaker",
    foto: "/aisc/mentores/camila-beltran.png",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        AI governance consultant for several organisations. Member of the{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OECD
        </a>{" "}
        expert group and head of the AI Control group at AIS Colombia. As a
        Winter Fellow at{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>{" "}
        she researched the{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          European regulation
        </a>{" "}
        of loss-of-control scenarios.
      </>
    ),
  },
  {
    nombre: "Luis Cosio",
    rol: "Mentor and speaker",
    foto: "/aisc/mentores/luis-cosio.png",
    linkedin: "https://www.linkedin.com/in/luiscosio/",
    bio: (
      <>
        Member of the technical team at{" "}
        <a
          className={ENLACE}
          href="https://sl5.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Security Level 5
        </a>
        , an initiative that protects advanced AI systems from state
        adversaries. Co-author of the{" "}
        <a
          className={ENLACE}
          href="https://arxiv.org/abs/2605.08449"
          target="_blank"
          rel="noopener noreferrer"
        >
          SL5 standard
        </a>
        . He has also mentored at{" "}
        <a
          className={ENLACE}
          href="https://sparai.org/projects/sp26/recXdgQxof26exbLh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SPAR
        </a>{" "}
        and{" "}
        <a
          className={ENLACE}
          href="https://www.matsprogram.org/stream/thiergart-11"
          target="_blank"
          rel="noopener noreferrer"
        >
          MATS
        </a>{" "}
        on datacenter security projects.
      </>
    ),
  },
  {
    nombre: "Manuela Chacón",
    rol: "Speaker",
    foto: "/aisc/mentores/manuela-chacon.png",
    linkedin:
      "https://www.linkedin.com/in/manuela-viviana-chac%C3%B3n-chamorro-04b0621bb/",
    bio: (
      <>
        Engineering PhD candidate at{" "}
        <a
          className={ENLACE}
          href="https://uniandes.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad de los Andes
        </a>{" "}
        and a{" "}
        <a
          className={ENLACE}
          href="https://ingenieria.uniandes.edu.co/es/noticias/ganadores-becas-deepmind-cinfonia"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google DeepMind scholar
        </a>
        . First author of an{" "}
        <a
          className={ENLACE}
          href="https://ieeexplore.ieee.org/document/10988739/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE paper
        </a>{" "}
        on cooperative resilience in multi-agent systems and a
        participant in the{" "}
        <a
          className={ENLACE}
          href="https://www.cooperativeai.com/summer-school/summer-school-2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cooperative AI Summer School
        </a>
        .
      </>
    ),
  },
];

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

/* Cada perfil con el rótulo por el que alguien se reconoce de un vistazo. */
const PERFILES = [
  {
    rotulo: "Technical profiles",
    body: "Engineering, data science or information security: containment and incident analysis need hands on the keyboard for all three days.",
  },
  {
    rotulo: "Law, public policy and journalism",
    body: "The regulation and communication tracks are won by writing well and understanding the record, not by programming.",
  },
  {
    rotulo: "People who already respond to incidents",
    body: "From banking to health, incident response is already a trade. Here it is about seeing what changes when the thing that failed is an AI system.",
  },
  {
    rotulo: "People coming to the topic for the first time",
    body: "You do not need to have read anything about AI safety. You come in through what you already know how to do, and whatever is missing you ask about in the room. A good share of the people working in the field today came in through a weekend like this one.",
  },
];

const FAQ = [
  {
    q: "Can I apply if I have never worked in AI safety?",
    a: "Yes, and that is the case for a good share of the people who take part. The projects that turn out best usually mix someone who knows the field with someone who is very good at something else: writing, litigating, building infrastructure, reading a case file. What we do ask is that you can be there all three days.",
  },
  {
    q: "Do I need to know how to code?",
    a: "Not for every track. Regulation and communication are won by writing well and understanding the record. Containment and analysis do need hands on the keyboard, though teams usually mix profiles.",
  },
  {
    q: "Do I have to arrive with a team?",
    a: "No. Teams are one to five people and they form on Friday night, in the room and on Apart's Discord. Plenty of people arrive alone and leave with a team.",
  },
  {
    q: "What is the difference between applying here and taking part online?",
    a: "The sprint is the same one and the deliverable goes to the same place. Applying here is for the in-person hub in Bogotá, which has limited capacity and therefore a selection process. At the hub we cover meals, compute support and mentorship in the room. Taking part online with Apart has no selection and no cap.",
  },
  {
    q: "How long does the application take?",
    a: "About twenty minutes. We read the whole application and everything you write counts for the selection. We are not expecting a finished proposal; we want to see how you think about the problem.",
  },
  {
    q: "Can I apply if I do not live in Bogotá?",
    a: "Yes. In the form you tell us where you would be coming from. Travel to Bogotá and your stay there are on you.",
  },
];

const SECCION = "bg-aisc-cream";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
/* El encabezado de dos columnas de SASH: el titular a la izquierda, todo el
   texto a la derecha en una medida corta. */
const ENCABEZADO =
  "mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6";
const COLUMNA = "flex min-w-0 flex-col gap-6";
const PROSA =
  "text-body md:text-body-lg flex max-w-[640px] flex-col gap-5 text-aisc-ink";
/* La tarjeta de contorno con la que SASH lista lo que recibe cada persona. */
const TARJETA =
  "flex min-h-[104px] flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-5 md:min-h-[114px] md:p-6";
const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";

export default function Hackathon() {
  return (
    <main lang="en" className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <HeroHackathon className={HERO_FUGA_CLASS} />
        <SiteHeader active="/en/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[860px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              AI Incident Response Sprint
            </h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/90">
              A weekend to turn the first incidents in which an AI system acted
              on its own against a third party into material that is useful to
              whoever has to respond.
            </p>
            <p className="text-body-sm mt-1 w-fit text-aisc-sand/75">
              {CIERRE_TEXTO}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link className={CTA_LINK_PRIMARY} href="/en/sprint/apply">
                Apply to the Bogotá hub
              </Link>
              <a
                className={CTA_LINK}
                href={APART_SPRINT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Take part online with Apart
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Las tres cifras duras, en tarjetas oscuras pegadas al hero. */}
      <section className={`${SECCION} pt-9 pb-10 md:pt-10 md:pb-12`}>
        <div className={`${CONTENEDOR} flex flex-col gap-12 md:gap-14`}>
          <dl className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
            {DATOS.map((d) => (
              <div
                className="flex min-h-[122px] flex-col justify-start rounded-[8px] bg-aisc-forest-deep px-5 py-5 text-aisc-sand md:min-h-[142px] md:px-7 md:py-7"
                key={d.valor}
              >
                <dt className="text-display-4 md:text-display-4-lg break-words">
                  {d.valor}
                </dt>
                <dd className="text-body-sm mt-3 text-aisc-sand">{d.nota}</dd>
              </div>
            ))}
          </dl>

          {/* De qué se trata */}
          <section id="que-es" className="flex flex-col gap-5">
            <div aria-hidden="true" className={HAIRLINE} />
            <div className="mt-5 flex flex-col gap-6">
              <h2 className="text-display-2 md:text-display-2-lg break-words">
                What this is about
              </h2>
              <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
                <p>
                  There are already documented cases in which an AI system
                  attacked a third party on its own. In July 2026, models that
                  were being evaluated broke out of their test environment and
                  chained failures until they reached Hugging Face&apos;s
                  production infrastructure. It was reported by{" "}
                  <a
                    className={ENLACE}
                    href="https://openai.com/index/hugging-face-model-evaluation-security-incident/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenAI
                  </a>{" "}
                  and by{" "}
                  <a
                    className={ENLACE}
                    href="https://huggingface.co/blog/security-incident-july-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hugging Face
                  </a>{" "}
                  separately. No law obliged them to do it.
                </p>
                <p>
                  When something like that happens, almost nobody has the
                  procedure to hand: it is not written down how to contain it,
                  nor how to reconstruct what failed, nor what a regulator can
                  demand of the provider, nor how to tell the story without
                  exaggerating or playing it down.
                </p>
                <p>
                  The sprint exists to fill that gap with concrete pieces. Five
                  tracks run in parallel over three days. Each team delivers
                  something someone else can use: a standard, a test bench, a
                  questionnaire for a regulator, a tabletop exercise. After the
                  weekend the work is graded by judges who were not in the room.
                  Feedback arrives in writing and the report is published under
                  your name. Apart Research and CeSIA convene the sprint
                  worldwide; we open the in-person hub in Bogotá.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Los cinco frentes */}
      <section id="tracks" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              The five tracks
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Each team picks one. In the form you tell us which one appeals
                to you, and that tells us what profiles will be in the room and
                which mentors we still need to invite. Apart publishes the
                detail of each track in{" "}
                <a
                  className={ENLACE}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the sprint call
                </a>
                .
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <li className="flex" key={t.id}>
                <article className="flex min-h-[180px] w-full flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 md:min-h-[200px] md:p-7">
                  <span
                    className="text-display-4 tabular-nums text-aisc-coral"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-4 md:text-display-4-lg text-balance">
                    {t.titulo}
                  </h3>
                  <p className="text-body-sm text-aisc-ink">{t.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* El hub en Bogotá */}
      <section id="bogota" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              What you find in Bogotá
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Working three days straight is easier in company than alone at
                  home. That is why we open a room in Bogotá for the whole
                  weekend.
                </p>
                <p>
                  The venue is confirmed in the coming days. We announce it by
                  email to whoever is selected and through the{" "}
                  <a
                    className={ENLACE}
                    href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp group
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {HUB.map((h) => (
              <li className="flex" key={h.titulo}>
                <article className={`${TARJETA} w-full`}>
                  <h3 className="text-display-4 text-balance">{h.titulo}</h3>
                  <p className="text-body-sm text-aisc-muted">{h.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mentoría */}
      <section id="mentores" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Mentors and speakers
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Over the weekend, people who work on the subjects of the five
                  tracks come through the room. Some open with a short talk.
                  Others sit down with the teams to support whatever they are
                  building.
                </p>
                <p>
                  If you work in incident response, offensive security,
                  regulation or risk communication and you would like to give a
                  talk or accompany a team, write to us at{" "}
                  <a
                    className={ENLACE}
                    href="mailto:contacto@aisafetycolombia.org"
                  >
                    contacto@aisafetycolombia.org
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
            {MENTORES.map((m) => (
              <li className="flex flex-col gap-3" key={m.nombre}>
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
                  {m.foto ? (
                    <img
                      alt={m.nombre}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                      src={m.foto}
                    />
                  ) : (
                    <span
                      className="text-display-2 md:text-display-2-lg text-aisc-forest/45"
                      aria-hidden="true"
                    >
                      {iniciales(m.nombre)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-display-4 font-semibold text-aisc-forest">
                    {m.linkedin ? (
                      <a
                        className="underline decoration-aisc-forest/30 underline-offset-4 transition-colors hover:text-aisc-coral hover:decoration-aisc-coral"
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {m.nombre}
                      </a>
                    ) : (
                      m.nombre
                    )}
                  </span>
                  <span className="text-body-sm text-aisc-muted">{m.rol}</span>
                  {m.bio ? (
                    <p className="text-body-sm mt-2 text-aisc-ink">{m.bio}</p>
                  ) : null}
                </div>
              </li>
            ))}
            <li className="flex flex-col gap-3">
              <div className="flex aspect-square w-full items-center justify-center rounded-[8px] border border-dashed border-aisc-forest/40 p-4 text-center">
                <span className="text-body-sm text-aisc-muted">
                  More names announced soon.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Quién puede aplicar: banda oscura, para que la página respire entre
          tanto papel crema y para que los cuatro perfiles no queden en viñetas. */}
      <section
        id="quien"
        className="relative overflow-hidden bg-aisc-forest-deep py-14 text-aisc-sand md:py-16"
      >
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="995"
          decoding="async"
          className={CTA_PATTERN_TOP}
          style={{ color: "transparent" }}
          src={PATRON}
        />
        <div className={`${CONTENEDOR} relative z-10`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Who can apply
            </h2>
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                No previous experience in AI safety is required, and no degree
                in anything. What is required is that you can be there all three
                days and that you arrive with an idea of what you would like to
                work on.
              </p>
              <p className="text-body-sm text-aisc-sand/70">
                The application takes about twenty minutes and you do not need
                to prepare anything beforehand.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 md:mt-14 lg:mt-16 lg:grid-cols-2">
            {PERFILES.map((p) => (
              <li
                className="flex flex-col gap-1.5 border-t border-aisc-sand/25 py-6"
                key={p.rotulo}
              >
                <h3 className="text-display-4 md:text-display-4-lg text-balance">
                  {p.rotulo}
                </h3>
                <p className="text-body-sm text-aisc-sand/75">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link className={CTA_LINK_PRIMARY} href="/en/sprint/apply">
              Apply to the Bogotá hub
            </Link>
            <span className="text-body-sm text-aisc-sand/70">
              {CIERRE_TEXTO}
            </span>
          </div>
        </div>
      </section>

      {/* Premios */}
      <section id="premios" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Prizes and what happens next
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Apart splits USD 2,000 among the top five places across the
                  whole sprint. The judges evaluate the projects the following
                  week and the grading is blind: they do not know where each
                  team comes from.
                </p>
                <p>
                  Beyond the prize, the teams with the best results go on the
                  fast track for Apart&apos;s research fellowship and stay
                  connected to mentors in the field. Every report is published
                  in full, with the names of its authors.
                </p>
              </div>
            </div>
          </div>
          {/* La escalera de premios: el primer puesto lleno, los otros cuatro de
              contorno, con la cifra como lo primero que se ve. */}
          <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
            {PREMIOS.map((p, i) => (
              <li className="flex" key={p.puesto}>
                <article
                  className={`flex min-h-[150px] w-full flex-col justify-between rounded-[8px] p-5 md:min-h-[172px] md:p-6 ${
                    i === 0
                      ? "bg-aisc-forest text-aisc-sand"
                      : "border border-aisc-forest/55 bg-aisc-cream text-aisc-ink"
                  }`}
                >
                  <span
                    className={`text-meta font-semibold tracking-widest uppercase ${
                      i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"
                    }`}
                  >
                    {p.puesto}
                  </span>
                  <span className="mt-6 flex flex-col">
                    <span
                      className={`text-meta ${i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"}`}
                    >
                      USD
                    </span>
                    <span
                      className={`text-display-2 md:text-display-2-lg tabular-nums ${
                        i === 0 ? "text-aisc-sand" : "text-aisc-forest"
                      }`}
                    >
                      {p.monto}
                    </span>
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quién convoca y quién financia */}
      <section id="organizan" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Who is behind it
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Apart Research and CeSIA convene the sprint worldwide. We open
                the in-person hub in Bogotá, and these are the organisations
                that make it possible.
              </p>
            </div>
          </div>
          {GRUPOS.map((g) => (
            <div className="mt-12 flex flex-col gap-5 md:mt-14" key={g.rotulo}>
              <h3 className="text-kicker text-aisc-muted">{g.rotulo}</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.orgs.map((o) => (
                  <li className="flex" key={o.name}>
                    <a
                      className="flex min-h-[190px] w-full flex-col justify-between gap-8 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand md:p-7"
                      href={o.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-[42px] items-center">
                        <img
                          alt={o.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-[38px] w-auto object-contain"
                          src={o.logo}
                        />
                      </span>
                      <span className="flex flex-col gap-2">
                        <span className="text-display-4 md:text-display-4-lg text-balance">
                          {o.name}
                        </span>
                        <span className="text-body-sm text-aisc-ink">
                          {o.body}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="mt-5 flex flex-col gap-8">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Frequently asked questions
            </h2>
            <ul className="flex flex-col">
              {FAQ.map((f) => (
                <li key={f.q}>
                  <details className="group border-t border-aisc-ink/20">
                    <summary className="text-display-4 md:text-display-4-lg flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                      <span className="text-balance">{f.q}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-aisc-coral transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-body-sm max-w-[860px] pb-5 text-aisc-muted">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="h-px w-full flex-none bg-aisc-ink/20"
            />
          </div>
        </div>
      </section>

      {/* El cierre: panel alto y centrado, como el de SASH */}
      <section className="bg-aisc-cream px-6">
        <div className="mx-auto w-full max-w-[1400px] py-12 md:py-14 lg:py-16">
          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep px-6 py-16 text-center text-aisc-sand md:py-20">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_TOP}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_BOTTOM}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-6">
              <span className="text-body-sm text-aisc-sand/70">
                {CIERRE_TEXTO}
              </span>
              <h2 className="text-display-2 md:text-display-2-lg text-balance">
                Apply to the Bogotá hub
              </h2>
              <p className="text-body md:text-body-lg text-aisc-sand/85">
                We read the whole application and all of it counts for the
                selection. We are not looking for a finished proposal.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link className={CTA_LINK_PRIMARY} href="/en/sprint/apply">
                  Apply
                </Link>
                <a
                  className={CTA_LINK}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Take part online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter idioma="en" />
    </main>
  );
}
