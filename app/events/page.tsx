import type { Metadata } from "next";
import PastEvents from "./past-events";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Events | AI Safety Colombia",
  description:
    "Conferencias, talleres, clubes de lectura, charlas abiertas y sesiones a puerta cerrada para investigadores, responsables de política pública y profesionales.",
};

const FORMATS = [
  {
    icon: "/sash/icons/icon07_sash.svg",
    title: "Talks and lectures",
    body: "Public talks and lectures from leading researchers and practitioners working on AI safety, governance, and policy. Held twice a year.",
  },
  {
    icon: "/sash/icons/icon10_sash.svg",
    title: "Workshops",
    body: "Hands-on sessions, paper clubs, and reading groups on technical and governance topics. Held every 1-2 months.",
  },
  {
    icon: "/sash/icons/icon08_sash.svg",
    title: "Closed-door briefings",
    body: "Policy and technical briefings for government and institutional partners on AI safety and governance topics. Held 3-4 times a year.",
  },
  {
    icon: "/sash/icons/icon05_sash.svg",
    title: "Community socials",
    body: "Informal gatherings for the AI safety and governance community, often timed around major events.",
  },
];

export default function Events() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img alt="" aria-hidden="true" loading="lazy" width="1697" height="1415" decoding="async" data-nimg="1" className={HERO_CORNER_CLASS} style={{ color: "transparent" }} src="/sash/patterns/sash-corner-pattern.svg" />
        <SiteHeader active="/events" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[650px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-sash-frost">Events</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-sash-frost">SASH convenes researchers, policymakers, and practitioners through conferences, workshops, paper clubs, public talks, and closed-door briefings.</p>
          </div>
        </div>
      </section>
      <section id="upcoming">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-8 py-12 md:py-14 lg:py-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-8">
            <h2 className="text-display-2 md:text-display-2-lg">Upcoming Events</h2>
            <p className="text-display-4 md:text-display-4-lg text-sash-graphite">
              See our upcoming events on our
              {" "}
              <a target="_blank" rel="noopener noreferrer" className="text-sash-cobalt underline underline-offset-[3px] transition-colors hover:text-sash-midnight" href="https://luma.com/sash">Luma event page here</a>
            </p>
          </div>
        </div>
      </section>
      <section id="types" className="bg-white px-6 py-12 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-sash-frost px-6 py-12 text-sash-graphite md:px-10 lg:py-[70px]">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
            <h2 className="text-display-2 md:text-display-2-lg">Event Formats</h2>
            <div className="mt-14 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-2 lg:mt-20 xl:grid-cols-4">
              {FORMATS.map((format) => (
                <article key={format.title} className="flex min-h-[210px] flex-col gap-6 rounded-[12px] border border-sash-midnight bg-transparent p-7 md:min-h-[245px] lg:p-9 xl:min-h-[270px]">
                  <img src={format.icon} alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
                  <div className="mt-auto flex flex-col gap-4">
                    <h3 className="text-display-4 md:text-display-4-lg">{format.title}</h3>
                    <p className="text-body-sm text-sash-graphite">{format.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PastEvents />
      <CtaPanel title="Follow SASH events" body="See upcoming talks, workshops, and convenings as they are posted.">
        <a href="https://luma.com/sash" target="_blank" rel="noopener noreferrer" className={CTA_LINK}>See on Luma</a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
