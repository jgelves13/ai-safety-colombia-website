import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Join us",
  description:
    "The four things open at AI Safety Colombia: the WhatsApp group, the Friday reading group on AI control, the talks in Bogotá and the research hackathons.",
  alternates: { canonical: "/en/join", languages: alternativas("/en/join") },
};

/* Las cuatro cosas que están abiertas ahora mismo. Nada de formularios: todo
   apunta a canales que ya existen. */
const ABIERTO = [
  {
    href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
    external: true,
    title: "The WhatsApp group",
    cta: "Join the group",
    body: "This is where you ask what you did not follow and argue about what just came out, with people who are on the same thing. It is also where you hear first about sessions, events and open calls.",
  },
  {
    href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
    external: true,
    title: "Reading group: AI control",
    cta: "Join the reading group",
    body: "An open space to discuss how you supervise an AI system that acts on its own. Any level of background is fine, and you can come only to listen or bring a reading and present it.",
  },
  {
    href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
    external: true,
    title: "Talks and workshops",
    cta: "See what is coming up",
    body: "You hear first hand from someone who works on the topic and you get to ask them whatever you want, in person. It is also where people in the community meet each other and collaborations start.",
  },
  {
    href: "/en/sprint",
    external: false,
    title: "Research hackathons",
    cta: "See the September one",
    body: "You leave with work of your own, published and with written feedback from outside judges. For a lot of people it has been the first concrete thing they can show in the field.",
  },
];

const CARD =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col p-6 md:p-7 lg:p-8";
const ENLACE_CARD =
  "text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";

export default function Join() {
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
          src="/aisc/patterns/aisc-hero-unete.svg"
        />
        <SiteHeader active="/en/join" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Join us</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              There are several ways to become part of the community and to start learning. These are the ones open
              right now.
            </p>
          </div>
        </div>
      </section>

      <section id="abierto" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">What is open</h2>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-4">
            {ABIERTO.map((item) => (
              <li className="flex" key={item.title}>
                <article className={CARD}>
                  <h3 className="text-display-3 md:text-display-3-lg text-balance">{item.title}</h3>
                  <p className="text-body-sm mt-3 text-aisc-ink">{item.body}</p>
                  <div className="mt-auto pt-7">
                    {item.external ? (
                      <a
                        className={ENLACE_CARD}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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

      <CtaPanel
        kicker="Where to start"
        title="Join the group and see what is coming"
        body="Everything is announced there first: the reading sessions, the talks and the open calls."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the group
        </a>
        <a
          className={CTA_LINK}
          href="https://luma.com/user/usr-TMDEtNWA1TozP77"
          target="_blank"
          rel="noopener noreferrer"
        >
          See the upcoming events
        </a>
      </CtaPanel>
      <SiteFooter idioma="en" />
    </main>
  );
}
