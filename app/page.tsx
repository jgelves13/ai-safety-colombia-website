import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK } from "@/components/ui";

export const metadata: Metadata = {
  title: "AI Safety Colombia — Hacia una inteligencia artificial segura",
  description:
    "Comunidad en Colombia de investigadores, ingenieros y profesionales de política pública dedicada a que la inteligencia artificial avance de forma segura y beneficiosa.",
};

export default function Home() {
  return (
    <main className="sash-page flex flex-col">
      <section className="relative overflow-hidden bg-sash-midnight text-sash-frost">
        <SiteHeader />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 relative flex min-h-[560px] items-center overflow-hidden pt-28 pb-20 md:min-h-[590px] md:pt-36 md:pb-24 lg:min-h-[620px]">
          <div aria-hidden="true" className="pointer-events-none absolute right-[-34%] bottom-0 block h-[78%] w-[115%] max-w-none select-none opacity-55 [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_12%,rgba(0,0,0,0.45)_28%,black_46%)] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.08)_12%,rgba(0,0,0,0.45)_28%,black_46%)] sm:right-[-22%] sm:w-[92%] md:top-0 md:right-0 md:bottom-auto md:h-full md:w-[42%] md:opacity-100">
            <div className="h-full w-full object-cover object-left">
              <canvas style={{ width: "100%", height: "100%" }} width="608" height="620" />
            </div>
          </div>
          <div className="relative z-10 flex w-full max-w-[690px] flex-col items-start gap-6 text-left">
            <div className="flex flex-col items-start gap-5 md:gap-6">
              <h1 className="text-display-1 md:text-display-1-lg max-w-[720px] text-balance text-sash-frost">Building a global ecosystem for trustworthy AI</h1>
              <p className="text-body md:text-body-lg max-w-[600px] text-sash-frost">
                We bridge governments, academics and industry across East and West to ensure frontier AI systems benefit everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="rounded-t-[40px] bg-white text-sash-graphite">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 py-12 md:py-14 lg:py-16">
          <nav aria-label="Explore SASH">
            <ul className="grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
              <li className="flex">
                <a className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite group flex w-full flex-col gap-5 p-6 transition-colors hover:bg-sash-frost focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sash-cobalt md:min-h-[180px] md:p-7" href="/research">
                  <img src="/sash/icons/icon01_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
                  <div className="mt-auto flex flex-col gap-2">
                    <h2 className="text-display-4 md:text-display-4-lg break-words text-sash-cobalt transition-colors group-hover:text-sash-midnight">Research</h2>
                    <p className="text-body-sm text-sash-graphite">Applied technical governance research across regions.</p>
                  </div>
                </a>
              </li>
              <li className="flex">
                <a className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite group flex w-full flex-col gap-5 p-6 transition-colors hover:bg-sash-frost focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sash-cobalt md:min-h-[180px] md:p-7" href="/programs">
                  <img src="/sash/icons/icon04_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
                  <div className="mt-auto flex flex-col gap-2">
                    <h2 className="text-display-4 md:text-display-4-lg break-words text-sash-cobalt transition-colors group-hover:text-sash-midnight">Programs</h2>
                    <p className="text-body-sm text-sash-graphite">Fellowships and upskilling for policymakers and practitioners.</p>
                  </div>
                </a>
              </li>
              <li className="flex">
                <a className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite group flex w-full flex-col gap-5 p-6 transition-colors hover:bg-sash-frost focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-sash-cobalt md:min-h-[180px] md:p-7" href="/events">
                  <img src="/sash/icons/icon07_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
                  <div className="mt-auto flex flex-col gap-2">
                    <h2 className="text-display-4 md:text-display-4-lg break-words text-sash-cobalt transition-colors group-hover:text-sash-midnight">Events</h2>
                    <p className="text-body-sm text-sash-graphite">Talks, workshops, briefings and convenings.</p>
                  </div>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="bg-white text-sash-graphite">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 py-12 md:gap-16 md:py-14 lg:gap-20 lg:py-16">
          <div className="flex flex-col gap-7">
            <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg">Research</h2>
              <div className="flex max-w-[760px] flex-col gap-3">
                <p className="text-body md:text-body-lg text-sash-graphite">
                  Practical technical governance research for challenges that cross borders, built on proofs of concept the wider ecosystem can act on.
                </p>
                <a className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-sash-cobalt transition-colors hover:text-sash-midnight" href="/research">View All Research</a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            <article className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite flex flex-col p-6 md:min-h-[270px] md:p-7 lg:min-h-[310px] lg:p-8 xl:min-h-[340px]">
              <img src="/sash/icons/icon11_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
              <div className="mt-20 flex max-w-[420px] min-w-0 flex-col gap-5 md:mt-24 lg:mt-28">
                <div className="flex flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg break-words">Verification Mechanisms</h3>
                  <p className="text-body-sm text-sash-graphite">
                    Tools and protocols that prove whether AI systems meet their safety claims across training, evaluation and deployment, promoting greater diffusion, international coordination and shared best practice.
                  </p>
                </div>
              </div>
            </article>
            <article className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite flex flex-col p-6 md:min-h-[270px] md:p-7 lg:min-h-[310px] lg:p-8 xl:min-h-[340px]">
              <img src="/sash/icons/icon12_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
              <div className="mt-20 flex max-w-[420px] min-w-0 flex-col gap-5 md:mt-24 lg:mt-28">
                <div className="flex flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg break-words">Frontier Safety</h3>
                  <p className="text-body-sm text-sash-graphite">
                    Safety evaluations that can check model safeguards for frontier risks such as Loss of Control and Harmful Manipulation in a diverse range of deployment contexts, before models move into public and commercial use.{" "}
                  </p>
                </div>
              </div>
            </article>
            <article className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite flex flex-col p-6 md:min-h-[270px] md:p-7 lg:min-h-[310px] lg:p-8 xl:min-h-[340px]">
              <img src="/sash/icons/icon13_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
              <div className="mt-20 flex max-w-[420px] min-w-0 flex-col gap-5 md:mt-24 lg:mt-28">
                <div className="flex flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg break-words">Agent Governance</h3>
                  <p className="text-body-sm text-sash-graphite">
                    Solutions that can identify, supervise and constrain autonomous agents across regions, actors and use cases, enabling users to integrate them confidently into high-stakes and dynamic use cases.{" "}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-white text-sash-graphite">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 py-12 md:gap-16 md:py-14 lg:gap-20 lg:py-16">
          <div className="flex flex-col gap-9">
            <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:items-start">
              <h2 className="text-display-2 md:text-display-2-lg">Programs</h2>
              <div className="flex max-w-[760px] flex-col gap-5">
                <p className="text-body md:text-body-lg text-sash-graphite">Fellowships and upskilling for policymakers and practitioners.</p>
                <a className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-sash-cobalt transition-colors hover:text-sash-midnight" href="/programs">View All Programs</a>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
            <a className="group flex min-w-0 flex-col rounded-[8px] border border-sash-cobalt p-6 transition-colors md:min-h-[240px] md:p-8 lg:p-10 bg-sash-midnight text-sash-frost hover:bg-sash-midnight-deep" href="/programs/singapore-ai-safety-fellowship">
              <img src="/sash/icons/icon04_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 shrink-0 object-contain brightness-0 invert" />
              <div className="mt-auto flex max-w-[560px] flex-col gap-3 pt-16 md:pt-20">
                <h3 className="text-display-3 md:text-display-3-lg">The Singapore AI Safety Fellowship</h3>
                <p className="text-body-sm max-w-[560px] text-sash-frost">
                  Training researchers who make international AI safety research cooperation possible
                </p>
              </div>
              <span className="text-display-4 md:text-display-4-lg mt-10 w-fit self-start transition-colors text-sash-frost group-hover:text-sash-frost/72">Learn More</span>
            </a>
            <a target="_blank" rel="noopener noreferrer" className="group flex min-w-0 flex-col rounded-[8px] border border-sash-cobalt p-6 transition-colors md:min-h-[240px] md:p-8 lg:p-10 bg-white text-sash-graphite hover:bg-sash-frost" href="https://securefast.ai">
              <img src="/sash/icons/icon09_sash.svg" alt="" aria-hidden="true" loading="lazy" className="size-9 shrink-0 object-contain" />
              <div className="mt-auto flex max-w-[560px] flex-col gap-3 pt-16 md:pt-20">
                <h3 className="text-display-3 md:text-display-3-lg">Frontier AI Security Training (FAST)</h3>
                <p className="text-body-sm max-w-[560px] text-sash-graphite">
                  Training the practitioners who secure frontier AI systems and the policymakers who govern them
                </p>
              </div>
              <span className="text-display-4 md:text-display-4-lg mt-10 w-fit self-start transition-colors text-sash-cobalt group-hover:text-sash-midnight">Learn More</span>
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-12 rounded-[var(--radius)] bg-sash-frost px-6 py-8 md:px-10 md:py-12 lg:gap-16 lg:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.95fr)] lg:items-center lg:gap-16">
            <div className="grid min-w-0 grid-cols-6 gap-2 md:gap-3">
              <div className="col-span-3 aspect-[1.16] relative overflow-hidden rounded-[var(--radius)] bg-sash-midnight">
                <img alt="SASH event audience gathered in a lounge discussion" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" style={{ position: "absolute", height: "100%", width: "100%", left: "0", top: "0", right: "0", bottom: "0", objectPosition: "center", color: "transparent" }} src="/sash/media/f4675313-1800x1013-629b1f.jpg" />
              </div>
              <div className="col-span-3 aspect-[1.16] relative overflow-hidden rounded-[var(--radius)] bg-sash-midnight">
                <img alt="Group photo at an AI safety social co-hosted by SASH" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" style={{ position: "absolute", height: "100%", width: "100%", left: "0", top: "0", right: "0", bottom: "0", objectPosition: "center", color: "transparent" }} src="/sash/media/061b1786-1800x1201-c2996f.jpg" />
              </div>
              <div className="col-span-3 aspect-[1.16] relative overflow-hidden rounded-[var(--radius)] bg-sash-midnight">
                <img alt="Audience seated for an AI safety presentation" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" style={{ position: "absolute", height: "100%", width: "100%", left: "0", top: "0", right: "0", bottom: "0", objectPosition: "center", color: "transparent" }} src="/sash/media/a7f20ad2-1800x1013-629b1f.jpg" />
              </div>
              <div className="col-span-3 aspect-[1.16] relative overflow-hidden rounded-[var(--radius)] bg-sash-midnight">
                <img alt="Participants working in groups during a SASH event" loading="lazy" decoding="async" data-nimg="fill" className="object-cover" style={{ position: "absolute", height: "100%", width: "100%", left: "0", top: "0", right: "0", bottom: "0", objectPosition: "center", color: "transparent" }} src="/sash/media/533aa80a-1800x1013-629b1f.jpg" />
              </div>
            </div>
            <div className="flex max-w-[700px] flex-col gap-7 lg:justify-self-start">
              <div className="flex flex-col gap-5">
                <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
                <h2 className="text-display-2 md:text-display-2-lg text-balance">Community &amp; Events</h2>
                <div className="text-body md:text-body-lg flex max-w-[720px] flex-col gap-2 text-sash-graphite">
                  <p>Public talks and workshops for our community.</p>
                  <p>Private convenings and briefings for international experts and governments.</p>
                </div>
              </div>
              <a className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-sash-cobalt transition-colors hover:text-sash-midnight" href="/events">See Upcoming Events</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white text-sash-graphite">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 py-12 md:gap-12 md:py-14 lg:gap-14 lg:py-16">
          <div className="flex flex-col gap-8">
            <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
            <div className="mx-auto flex max-w-[640px] flex-col items-center gap-5 text-center">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">Our collaborators</h2>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]" aria-label="SASH collaborators">
              <div className="sash-logo-strip flex w-max items-center gap-x-12 md:gap-x-16 lg:gap-x-20" style={{ "--sash-logo-strip-duration": "55s", animationDelay: "-0s" } as CSSProperties}>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Singapore AI Safety Institute logo" aria-hidden="false" loading="lazy" width="514" height="118" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/51ae832d-514x118.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Infocomm Media Development Authority (IMDA) logo" aria-hidden="false" loading="lazy" width="277" height="70" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/9885a5a5-277x70.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Cybersecurity Agency of Singapore (CSA) logo" aria-hidden="false" loading="lazy" width="896" height="390" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/45910925-896x390.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Ministry of Digital Development and Information (MDDI) logo" aria-hidden="false" loading="lazy" width="256" height="96" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/bc6ea7de-256x96.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="GovTech Singapore logo" aria-hidden="false" loading="lazy" width="280" height="120" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/a294364b-280x120.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="514" height="118" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/51ae832d-514x118.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="277" height="70" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/9885a5a5-277x70.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="896" height="390" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/45910925-896x390.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="256" height="96" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/bc6ea7de-256x96.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="280" height="120" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/a294364b-280x120.png" />
                </div>
              </div>
            </div>
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]" aria-label="SASH collaborators">
              <div className="sash-logo-strip flex w-max items-center gap-x-12 md:gap-x-16 lg:gap-x-20" style={{ "--sash-logo-strip-duration": "45s", animationDelay: "-6s" } as CSSProperties}>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Korea AISI logo" aria-hidden="false" loading="lazy" width="270" height="97" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/6ccd3452-270x97.svg" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Institute for AI Policy and Strategy (IAPS) logo" aria-hidden="false" loading="lazy" width="1500" height="332" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/fa5bcf0f-1500x332.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Concordia AI logo" aria-hidden="false" loading="lazy" width="3308" height="1064" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/28c7ffa8-3308x1064.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Oxford Martin AIGI logo" aria-hidden="false" loading="lazy" width="330" height="130" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/95489a4a-330x130.jpg" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="UNDP logo" aria-hidden="false" loading="lazy" width="1200" height="609" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/24cbb724-1200x609.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="BlueDot Impact logo" aria-hidden="false" loading="lazy" width="1800" height="239" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/0ce13482-1800x239.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="270" height="97" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/6ccd3452-270x97.svg" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="1500" height="332" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/fa5bcf0f-1500x332.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="3308" height="1064" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/28c7ffa8-3308x1064.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="330" height="130" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/95489a4a-330x130.jpg" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="1200" height="609" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/24cbb724-1200x609.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="1800" height="239" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/0ce13482-1800x239.png" />
                </div>
              </div>
            </div>
            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]" aria-label="SASH collaborators">
              <div className="sash-logo-strip flex w-max items-center gap-x-12 md:gap-x-16 lg:gap-x-20" style={{ "--sash-logo-strip-duration": "60s", animationDelay: "-12s" } as CSSProperties}>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Apart Research logo" aria-hidden="false" loading="lazy" width="338" height="126" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/b6ad1edf-338x126.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="TARA logo" aria-hidden="false" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/f0316ff9-500x500.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="ERA Fellowship logo" aria-hidden="false" loading="lazy" width="1500" height="1511" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/6fa599de-1500x1511.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Future Impact Group logo" aria-hidden="false" loading="lazy" width="887" height="185" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/389f3af7-887x185.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="The Future Society logo" aria-hidden="false" loading="lazy" width="821" height="654" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/b42f7b4c-821x654.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="Lorong AI logo" aria-hidden="false" loading="lazy" width="3229" height="978" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/6ec6fb28-3229x978.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="SAIF logo" aria-hidden="false" loading="lazy" width="1200" height="632" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/bf99813f-1200x632.jpg" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="338" height="126" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/b6ad1edf-338x126.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/f0316ff9-500x500.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="1500" height="1511" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/6fa599de-1500x1511.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="887" height="185" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/389f3af7-887x185.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="821" height="654" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/b42f7b4c-821x654.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="3229" height="978" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/6ec6fb28-3229x978.png" />
                </div>
                <div className="flex h-10 w-[170px] shrink-0 items-center justify-center md:h-12 md:w-[220px]">
                  <img alt="" aria-hidden="true" loading="lazy" width="1200" height="632" decoding="async" data-nimg="1" className="h-full w-auto max-w-full object-contain " style={{ color: "transparent" }} src="/sash/media/bf99813f-1200x632.jpg" />
                </div>
              </div>
            </div>
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
