import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { cursosCerrados } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Join us",
  description:
    "Three steps into AI safety with AI Safety Colombia: explore the community, learn in the AGI Strategy and Technical AI Safety courses, and do research at the hackathons. Each with its time commitment, requirements and cost.",
  alternates: { canonical: "/en/join", languages: alternativas("/en/join") },
};

/* Se renderiza en cada visita: el aviso de los cursos se apaga solo cuando
   cierran las aplicaciones, el 11 de octubre. */
export const dynamic = "force-dynamic";

/* La escalera: explorar sin compromiso, aprender en un curso con cohorte e
   investigar en un hackathon. Cada opción dice lo mismo en el mismo orden,
   dedicación, requisitos y costo, para que se puedan comparar de un vistazo. */
const PASOS = [
  {
    id: "explora",
    numero: "01",
    titulo: "Explore",
    entrada: "To get to know the field and the people, with no commitment.",
    opciones: [
      {
        titulo: "The WhatsApp group",
        cuerpo: "Where you ask what you don't understand and discuss what just came out. It's also where sessions, events and calls are announced first.",
        dedicacion: "As much as you like",
        requisitos: "None",
        costo: "Free",
        href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
        cta: "Join the group",
        externo: true,
      },
      {
        titulo: "Reading group: AI Control",
        cuerpo: "We discuss a reading on how to oversee an AI system that acts on its own. You can come just to listen or bring a reading and present it.",
        dedicacion: "Every two weeks, Fridays at 6:30 pm Colombia time, online: one hour plus the reading",
        requisitos: "None; any level of background is welcome",
        costo: "Free",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        cta: "Join the reading group",
        externo: true,
      },
      {
        titulo: "Talks and workshops",
        cuerpo: "You hear first-hand from someone working on the problem and ask them anything in person. It's where people in the community meet.",
        dedicacion: "One or two hours per event",
        requisitos: "Register on Luma",
        costo: "Free",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        cta: "See upcoming events",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    numero: "02",
    titulo: "Learn",
    entrada: "Cohort-based courses with a facilitator, using BlueDot Impact's materials. Applications are open until Sunday 11 October at 11:59 pm, Colombia time.",
    opciones: [
      {
        titulo: "AGI Strategy",
        cuerpo: "Why there is a race to AGI, what drives progress, what the risks are and what defences exist. The starting point whatever field you come from.",
        dedicacion: "Five weeks from Monday 12 October, about 5 hours a week",
        requisitos: "Apply; no technical background needed",
        costo: "Free, with an AI Safety Colombia certificate",
        href: "/en/courses/agi-strategy",
        cta: "See the course",
        externo: false,
      },
      {
        titulo: "Technical AI Safety",
        cuerpo: "How safer models are trained, how they are evaluated, mechanistic interpretability and AI control. For people who already know why the problem matters and want to get into the technical side.",
        dedicacion: "Six weeks from Monday 12 October, about 5 hours a week",
        requisitos: "Apply; understand the basics of how models are trained. If not, start with AGI Strategy",
        costo: "Free, with an AI Safety Colombia certificate",
        href: "/en/courses/technical-ai-safety",
        cta: "See the course",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    numero: "03",
    titulo: "Research",
    entrada: "To leave with your own work that you can show.",
    opciones: [
      {
        titulo: "Research hackathons",
        cuerpo: "We host the in-person Bogotá hub for Apart Research's hackathons. Teams leave with published work and written feedback from outside judges. The next one is announced in the WhatsApp group.",
        dedicacion: "A full weekend, Friday to Sunday",
        requisitos: "Apply for the Bogotá hub, where there is a selection",
        costo: "Free",
        href: "/en/sprint",
        cta: "See the latest sprint",
        externo: false,
      },
    ],
  },
];

const CARD =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col p-6 md:p-7 lg:p-8";
const ENLACE_CARD =
  "text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";
const CHIP =
  "text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep";

export default function Join() {
  const abiertos = !cursosCerrados();
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
          src="/aisc/patterns/aisc-hero-unete.svg"
        />
        <SiteHeader active="/en/join" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Join us</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Three steps, depending on how much time you want to put in. Each option says what it takes, what you need and what it costs.
            </p>
            <nav aria-label="The three steps">
              <ul className="flex flex-wrap gap-2">
                {PASOS.map((paso) => (
                  <li key={paso.id}>
                    <a className={CHIP} href={`#${paso.id}`}>
                      {paso.numero} · {paso.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {abiertos ? (
              <a
                className="text-body-sm inline-flex w-fit items-center gap-2 rounded-full bg-aisc-coral px-4 py-1.5 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85"
                href="#aprende"
              >
                Course applications open until Sunday 11 October →
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {PASOS.map((paso) => (
        <section id={paso.id} key={paso.id} className="scroll-mt-6 bg-aisc-cream">
          <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-4 md:pt-16">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-4 pt-5 pb-10 md:gap-10 md:pt-7 md:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">
                <span className="text-aisc-forest">{paso.numero}</span> {paso.titulo}
              </h2>
              <p className="text-body md:text-body-lg self-end text-aisc-ink">{paso.entrada}</p>
            </div>
            <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-3">
              {paso.opciones.map((item) => (
                <li className="flex" key={item.titulo}>
                  <article className={CARD}>
                    <h3 className="text-display-3 md:text-display-3-lg text-balance">{item.titulo}</h3>
                    <p className="text-body-sm mt-3 text-aisc-ink">{item.cuerpo}</p>
                    <dl className="text-body-sm mt-6 flex flex-col gap-3 border-t border-aisc-line pt-5">
                      <div>
                        <dt className="text-meta text-aisc-muted">Time</dt>
                        <dd className="text-aisc-ink">{item.dedicacion}</dd>
                      </div>
                      <div>
                        <dt className="text-meta text-aisc-muted">Requirements</dt>
                        <dd className="text-aisc-ink">{item.requisitos}</dd>
                      </div>
                      <div>
                        <dt className="text-meta text-aisc-muted">Cost</dt>
                        <dd className="text-aisc-ink">{item.costo}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto pt-7">
                      {item.externo ? (
                        <a className={ENLACE_CARD} href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.cta}
                        </a>
                      ) : (
                        <Link className={ENLACE_CARD} href={item.href}>
                          {item.cta}
                        </Link>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="bg-aisc-cream pt-10" />
      <CtaPanel
        kicker="Not sure where to start?"
        title="Talk to us"
        body="Book a short call with Jose Gelves, co-founder and director of AI Safety Colombia. Together you'll pick the step that fits what you already know and the time you have."
      >
        <a className={CTA_LINK_PRIMARY} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Book a call
        </a>
        <a className={CTA_LINK} href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer">
          Join the WhatsApp group
        </a>
      </CtaPanel>
      <SiteFooter idioma="en" />
    </main>
  );
}
