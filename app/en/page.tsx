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
  title: "AI Safety Colombia — Towards safe artificial intelligence",
  description:
    "A community in Colombia of researchers, engineers and public policy professionals working to make artificial intelligence advance safely and beneficially.",
  alternates: { canonical: "/en", languages: alternativas("/en") },
};

/* Tres puertas, no una copia del menu: son las tres preguntas que el sitio tiene
   que responderle a quien llega por primera vez. */
const PUERTAS = [
  {
    href: "/en/ai-safety",
    Icon: IconSeguridad,
    title: "What is AI safety?",
    body: "What the field is, why it matters and where the discussion stands today.",
  },
  {
    href: "/en/research",
    Icon: IconActualidad,
    title: "Research",
    body: "What people here publish: papers, working documents and research reports.",
  },
  {
    href: "/en/join",
    Icon: IconUnete,
    title: "Join us",
    body: "Programmes, events and the four ways in.",
  },
  {
    href: "/en/about",
    Icon: IconQuienesSomos,
    title: "About us",
    body: "Who is behind this, since when and who we work with.",
  },
];

/** el problema en tres piezas */
const PIEZAS = [
  {
    title: "The systems move faster than our understanding of them",
    body: "Every year models do things their own builders did not anticipate. Understanding what they compute inside, getting them to pursue what we want and keeping them under supervision are still open research problems.",
  },
  {
    title: "The decisions are already delegated",
    body: "Hiring, credit, health, public services. Those systems already run in Colombia, almost always bought abroad and tuned on data that is not ours.",
  },
  {
    title: "The rules are being written now",
    body: "Much of AI governance will be settled over the next few years, and very few people from the region are at that table. Training the people who could sit there is part of the work, not an annex.",
  },
];

/** fotos reales de encuentros de AISC */
const FOTOS = [
  { src: "/aisc/eventos/panel-gobernanza.jpg", alt: "Panel on AI governance in Colombia" },
  { src: "/aisc/eventos/connect-latam.jpg", alt: "AI Safety Connect LATAM meeting" },
  { src: "/aisc/eventos/algoritmo-a-la-ley.jpg", alt: "From the algorithm to the law session" },
  { src: "/aisc/eventos/cena-politica.jpg", alt: "Dinner discussion on AI and public policy" },
];

/** aliados de la organizacion. el hackathon tiene los suyos, y no van aca */
const ALIADOS = [
  {
    name: "Apart Research",
    logo: "/aisc/aliados/apart.png",
    href: "https://apartresearch.com",
    body: "Convenes AI safety research hackathons, open to participants anywhere in the world.",
  },
  {
    name: "BlueDot Impact",
    logo: "/aisc/aliados/bluedot.png",
    href: "https://bluedot.org/grants/rapid",
    body: "Their free courses are the standard way into the field. Through Rapid Grants they fund concrete work: USD 1.4 million awarded in total, with decisions in three days on average.",
  },
  {
    name: "Kairos",
    logo: "/aisc/aliados/kairos.png",
    href: "https://kairos-project.org",
    body: "Mentorship programmes and support for university AI safety groups.",
  },
  {
    name: "Coefficient Giving",
    logo: "/aisc/aliados/coefficient-giving.svg",
    href: "https://www.coefficientgiving.org",
    body: "In 2024 alone it committed around USD 50 million to technical AI safety research. Until 2025 it was called Open Philanthropy.",
  },
];

/** las dos tarjetas de programas, ambas sobre verde */
const PROGRAMAS = [
  {
    kicker: "With Apart Research",
    title: "Research hackathons",
    body: "A weekend to go from reading about AI safety to producing work of your own. Apart Research convenes them globally and we open the in-person hub in Bogotá.",
  },
  {
    kicker: "Every Friday",
    title: "Reading group",
    body: "We meet to read and discuss recent technical safety work. Open, in Spanish, and with no prior requirements.",
  },
];

const CARD_BASE =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col";

export default function Home() {
  return (
    <main lang="en" className="aisc-page flex flex-col">
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
              Artificial intelligence will be the most consequential technology of our time. That it goes well is not
              guaranteed.
            </h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              We are the community working on it from Colombia: training, research and open events you can walk into
              today.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-t-[40px] bg-aisc-cream text-aisc-ink">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 py-12 md:py-14 lg:py-16">
          <nav aria-label="Site sections">
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
              <h2 className="text-display-2 md:text-display-2-lg text-balance">What is all this about?</h2>
              <div className="flex max-w-[760px] flex-col gap-4">
                <p className="text-body md:text-body-lg text-aisc-ink">
                  This is not a discussion about robots or about a distant future. It is the work of getting
                  increasingly capable systems to do what is expected of them, of making sure whoever uses them
                  understands their limits, and of having rules in place before they cause harm. It runs from technical
                  research through to public policy.
                </p>
                <Link
                  className="text-body md:text-body-lg group inline-flex min-h-11 w-fit items-center gap-2 text-aisc-forest underline underline-offset-[5px] transition-colors hover:text-aisc-forest-deep"
                  href="/en/ai-safety"
                >
                  Read the long version
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
              <h2 className="text-display-2 md:text-display-2-lg">Programmes</h2>
              <div className="flex max-w-[760px] flex-col gap-5">
                <p className="text-body md:text-body-lg text-aisc-ink">
                  Training and group work for people who want to get into this seriously, without needing to have
                  started earlier.
                </p>
                <Link
                  className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                  href="/en/join"
                >
                  See everything that is open
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
            {PROGRAMAS.map((programa) => (
              <Link
                key={programa.title}
                className="group flex min-w-0 flex-col rounded-[8px] border border-aisc-forest bg-aisc-forest-deep p-6 text-aisc-sand transition-colors hover:bg-aisc-night md:min-h-[240px] md:p-8 lg:p-10"
                href="/en/join"
              >
                <span className="text-kicker text-aisc-sand/70">{programa.kicker}</span>
                <span className="mt-auto flex max-w-[560px] flex-col gap-3 pt-16 md:pt-20">
                  <span className="text-display-3 md:text-display-3-lg block">{programa.title}</span>
                  <span className="text-body-sm block max-w-[560px] text-aisc-sand/90">{programa.body}</span>
                </span>
                <span className="text-display-4 md:text-display-4-lg mt-10 w-fit self-start text-aisc-sand transition-colors group-hover:text-aisc-sand/72">
                  Find out more
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
                <h2 className="text-display-2 md:text-display-2-lg text-balance">Community and events</h2>
                <div className="text-body md:text-body-lg flex max-w-[720px] flex-col gap-2 text-aisc-ink">
                  <p>Open talks, workshops and discussion dinners in Bogotá.</p>
                  <p>
                    Meetings with researchers and with policy people already working on the subject in the country.
                  </p>
                </div>
              </div>
              <Link
                className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                href="/en/join"
              >
                See what is coming up
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
              <h2 className="text-display-2 md:text-display-2-lg text-balance">We work with</h2>
              <p className="text-body md:text-body-lg max-w-[760px] text-aisc-ink">
                Organisations we sustain continuous work with. We have also received funding from all four. The
                partners of each hackathon are announced in its own call.
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
        title="Want in?"
        body="You do not need to be a researcher, and you do not need to have studied artificial intelligence."
      >
        <a className={CTA_LINK_PRIMARY} href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer">
          Join the WhatsApp group
        </a>
        <a className={CTA_LINK} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Book 20 minutes
        </a>
        <a className={CTA_LINK} href="mailto:contacto@aisafetycolombia.org">
          Write to us
        </a>
      </CtaPanel>
      <SiteFooter idioma="en" />
    </main>
  );
}
