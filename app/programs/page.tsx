import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CARD_LINK_COBALT, CARD_LINK_FROST, CTA_LINK, FILL_IMAGE, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Programs | AI Safety Colombia",
  description:
    "Formando a quienes cerrarán las mayores brechas en la gobernanza de la inteligencia artificial.",
};

const CARD_BASE =
  "focus-visible:outline-sash-cobalt flex min-h-[235px] w-full flex-col justify-between rounded-[var(--radius)] border p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[3px] md:min-h-[285px] md:p-8 lg:min-h-[320px] lg:p-10";

const PROGRAMS = [
  {
    href: "/programs/singapore-ai-safety-fellowship",
    external: false,
    kind: "Fellowship",
    title: "The Singapore AI Safety Fellowship",
    body: "Training researchers who make international AI safety research cooperation possible",
    icon: "/sash/icons/icon04_sash.svg",
    /* the midnight card inverts its icon so the mark reads on the dark fill */
    iconClass: "object-contain object-left-top brightness-0 invert",
    cardClass: "border-sash-midnight bg-sash-midnight text-sash-frost hover:bg-sash-midnight-deep",
    textClass: "text-sash-frost",
    linkClass: CARD_LINK_FROST,
  },
  {
    href: "https://securefast.ai",
    external: true,
    kind: "Bootcamp",
    title: "Frontier AI Security Training (FAST)",
    body: "Training the practitioners who secure frontier AI systems and the policymakers who govern them",
    icon: "/sash/icons/icon04_sash.svg",
    iconClass: "object-contain object-left-top",
    cardClass: "border-sash-graphite bg-white text-sash-graphite hover:bg-sash-frost",
    textClass: "text-sash-graphite",
    linkClass: CARD_LINK_COBALT,
  },
];

const PILLARS = [
  {
    icon: "/sash/icons/icon07_sash.svg",
    title: "Built to bridge",
    body: "Designed for international collaboration through cohorts that put researchers, policymakers, and industry in the same room.",
  },
  {
    icon: "/sash/icons/icon01_sash.svg",
    title: "Built for action",
    body: "Structured to tackle real AI safety and governance problems, designed with leading experts that are already doing the work.",
  },
  {
    icon: "/sash/icons/icon06_sash.svg",
    title: "Built to convene",
    body: "Modular programs bringing together the right set of people to take that action together, anywhere in the world.",
  },
];

const PAST_PROGRAMS = [
  {
    title: "TARA Singapore",
    body: "A 14-week part-time program with the Technical Alignment Research Accelerator for participants building technical AI safety skills.",
  },
  {
    title: "ML4Good Singapore",
    body: "A week-long Singapore bootcamp combining technical foundations and governance context in AI safety.",
  },
  {
    title: "RECAP",
    body: "The Research Engineering Camp for Alignment Practitioners, a month-long program based on ARENA's curriculum.",
  },
];

export default function Programs() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/programs" />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 relative flex min-h-[560px] items-center overflow-hidden pt-28 pb-20 md:min-h-[590px] md:pt-36 md:pb-24 lg:min-h-[620px]">
          <div aria-hidden="true" className="pointer-events-none absolute right-[-34%] bottom-0 block h-[78%] w-[115%] max-w-none select-none opacity-55 [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_12%,rgba(0,0,0,0.45)_28%,black_46%)] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_12%,rgba(0,0,0,0.45)_28%,black_46%)] sm:right-[-22%] sm:w-[92%] md:top-0 md:right-0 md:bottom-auto md:h-full md:w-[42%] md:opacity-100">
            <div className="h-full w-full object-cover object-left">
              <canvas style={{ width: "100%", height: "100%" }} width="608" height="620" />
            </div>
          </div>
          <div className="relative z-10 flex w-full max-w-[690px] flex-col items-start gap-6 text-left">
            <div className="flex flex-col items-start gap-5 md:gap-6">
              <h1 className="text-display-1 md:text-display-1-lg">Programs</h1>
              <p className="text-body md:text-body-lg max-w-[640px] text-sash-frost">Training those who will close AI governance&#39;s biggest gaps.</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col py-12 md:py-14 lg:py-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <div className="flex flex-col gap-10 pt-6 lg:pt-8">
            <h2 className="text-display-2 md:text-display-2-lg min-w-0 break-words">Active &amp; Upcoming Programs</h2>
            <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
              {PROGRAMS.map((program) => {
                /* one card points at another route, the other off-site */
                const Card = program.external ? "a" : Link;
                return (
                <Card
                  key={program.href}
                  href={program.href}
                  {...(program.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`${CARD_BASE} ${program.cardClass}`}
                >
                  <div className="flex flex-col gap-10">
                    <span className="relative block size-9">
                      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className={program.iconClass} style={FILL_IMAGE} src={program.icon} />
                    </span>
                    <div className="flex flex-col gap-4">
                      <p className={`text-body md:text-body-lg ${program.textClass}`}>{program.kind} · Active and upcoming</p>
                      <h3 className="text-display-3 md:text-display-3-lg break-words">{program.title}</h3>
                      <p className={`text-body md:text-body-lg ${program.textClass}`}>{program.body}</p>
                    </div>
                  </div>
                  <span className={program.linkClass}>Learn More</span>
                </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section id="program-pillars" className="bg-white px-6 py-12 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-sash-frost px-6 py-12 text-sash-graphite md:px-10 lg:py-[70px]">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-6">
              <h2 className="text-display-2 md:text-display-2-lg break-words">Program Pillars</h2>
            </div>
            <div className="gap-3 md:mt-16 lg:mt-20 mt-14 grid grid-cols-1 lg:grid-cols-3">
              {PILLARS.map((pillar) => (
                <article key={pillar.title} className="flex flex-col rounded-[12px] border border-sash-midnight bg-transparent min-h-[210px] p-7 md:min-h-[245px] lg:p-9 xl:min-h-[270px]">
                  <img src={pillar.icon} alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
                  <div className="flex max-w-[900px] flex-col gap-4 mt-auto">
                    <h3 className="text-display-4 md:text-display-4-lg break-words">{pillar.title}</h3>
                    <p className="text-body-sm text-sash-graphite">{pillar.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col py-12 md:py-14 lg:py-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-2 lg:items-start lg:gap-6 lg:pt-8">
            <h2 className="text-display-2 md:text-display-2-lg">Past Programs</h2>
            <p className="text-body md:text-body-lg max-w-[470px] text-sash-graphite">These programs have concluded. Check back for future editions.</p>
          </div>
          <div className="mt-14 flex flex-col gap-2.5 md:mt-16 lg:mt-20">
            {PAST_PROGRAMS.map((program) => (
              <div key={program.title} className="flex min-h-[96px] w-full items-center rounded-[var(--radius)] border border-sash-cobalt bg-white px-6 py-5 md:min-h-[112px] md:px-10">
                <div className="flex w-full min-w-0 flex-col gap-1">
                  <h3 className="text-display-4 md:text-display-4-lg break-words text-sash-cobalt">{program.title}</h3>
                  <p className="text-body-sm break-words text-sash-graphite">{program.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaPanel title="Build with us" body="Work with policymakers, researchers, builders and operators around the world to ensure AI is safe, secure and trustworthy.">
        <span className="flex flex-col items-center gap-1.5">
          <Link className={CTA_LINK} href="/careers#open-roles">See Open Roles</Link>
          <span className="text-body md:text-body-lg text-sash-frost">(hiring globally!)</span>
        </span>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
