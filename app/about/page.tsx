import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { FILL_IMAGE, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "About | AI Safety Colombia",
  description:
    "Somos una organización de investigación y construcción de campo que prueba innovaciones en gobernanza de la inteligencia artificial y cierra la mayor brecha de coordinación del sector.",
};

/** The original serves these from a CMS; the port ships them as local copy. */
const TEAM = [
  {
    name: "Miro Plueckebaum",
    role: "Director of Strategy & Research, Founder",
    photo: "/sash/team/ca18da25-600x600.png",
    bio: "Miro leads strategy and research management at SASH, alongside his role at the Oxford Martin AI Governance Initiative. He has seven years of experience in AI governance and product management across Europe and Asia, including roles at Conjecture and ByteDance.",
    linkedin: "https://www.linkedin.com/in/miro-pluckebaum/",
  },
  {
    name: "Vivian Leung",
    role: "Director of Programmes",
    photo: "/sash/team/9697ec0a-600x600.png",
    bio: "Vivian is Director of Programmes at SASH, leading programmes, partnerships, and operations. She brings 12 years of experience in the UN and multilateral system, specializing in programme management, emerging technology governance, and international stakeholder engagement.",
  },
  {
    name: "Valerie Pang",
    role: "Program Manager",
    photo: "/sash/team/f74c9686-600x600.png",
    bio: "Valerie is Program Manager at SASH, overseeing memberships, marketing, events, and community-building. She brings extensive experience across the technology and non-profit sectors in the US and Singapore, with expertise in corporate engagement and organizing large-scale events and conferences.",
  },
  {
    name: "Clement Neo",
    role: "Research Advisor",
    photo: "/sash/team/2e9a3ac8-600x600.png",
    bio: "Clement is a Research Advisor at SASH, where he incubates early-stage technical AI safety research, focusing on mechanistic interpretability, model evaluations, and AI agent safety. He is the founder of Neo Research, an independent research and evaluations lab built in and for Asia. Clement is also a Research Advisor at Apart Research, and previously a Research Engineer at the Singapore AI Safety Institute.",
  },
  {
    name: "Red Bermejo",
    role: "Operations Manager",
    photo: "/sash/team/0614fa1f-600x600.png",
    bio: "Red leads operations at SASH. He brings extensive years of experience spanning international software and IT consulting and support for AI safety organizations, combining systems thinking with strong execution.",
  },
  {
    name: "Zac Richardson",
    role: "Special Projects Manager",
    photo: "/sash/team/4e832c92-600x600.png",
    bio: "Zac is the Special Projects Manager at SASH, where he works across research streams. Previously, Zac was a fellow at GovAI, and worked as a Program Specialist at 80,000 Hours. He also completed fellowships with SPAR and FIG.",
  },
  {
    name: "Amin Oueslati",
    role: "Governance Lead, AI Agents",
    photo: "/sash/team/19b2e6eb-600x600.png",
    bio: "Amin co-leads agent governance at SASH and is a Research Affiliate at the Oxford Martin AI Governance Initiative. He previously advised the EU on AI regulation at The Future Society and led software development programmes at McKinsey. At SASH, he is currently building an open-source protocol for identifying, authorizing and managing AI agents, together with a global consortium of governments and industry.",
  },
  {
    name: "Aya Lowe",
    role: "Program Manager",
    photo: "/sash/team/588f80e7-600x600.png",
    bio: "Aya is Program Manager at SASH, supporting the AI Safety Fellowship, programmes, and communications initiatives across the organisation. She brings over 15 years of experience spanning technology, online safety, media, and public interest work across the Asia-Pacific region, specializing in programme management, stakeholder engagement, and building trusted relationships across governments, industry, and civil society.",
  },
  {
    name: "Sam Boger",
    role: "Technical Lead, AI Agents",
    photo: "/sash/team/e1eea822-600x600.png",
    bio: "Sam co-leads AI agent governance at SASH. He previously worked in AI governance at The Future Society, served as a legislative staffer in the U.S. Senate, and was a Senior Software Engineer at Google. He holds undergraduate and master's degrees in computer science from Brown University. At SASH, he is building infrastructure for AI agents that promotes transparency, accountability, and security.",
  },
  {
    name: "Wayne Tee",
    role: "Researcher, Verification",
    photo: "/sash/team/95ca10ad-600x600.png",
    bio: "Wayne is working on GPU Verification at SASH to detect unauthorised workloads. He has previously completed the Pivotal Fellowship and has experience in entrepreneurship as well as cybersecurity research within the Singapore Government.",
  },
  {
    name: "Ze Shen Chin",
    role: "Researcher, AI Agents",
    photo: "/sash/team/c49ae0b8-600x600.png",
    bio: "Ze Shen works on AI agent infrastructure at SASH and co-leads AI Standards Lab, while serving as a Research Affiliate with the Oxford Martin AI Governance Initiative. He has three years of experience in AI governance, specializing in EU AI policy and frontier AI risk management. He previously spent over a decade as a reservoir engineer in the oil and gas industry.",
  },
];

const FOCUS = [
  {
    number: "01",
    title: "Bridging Stakeholders",
    body: "We bridge East and West and stakeholders across government, civil society and industry through convenings and collaborative projects.",
  },
  {
    number: "02",
    title: "Fostering Ecosystems",
    body: "We act as a force-multiplier by developing talent, convening communities, and helping new organisations and capacity take root.",
  },
  {
    number: "03",
    title: "Turning research into practice",
    body: "We tackle practical governance problems and ship proofs of concept beyond theory, giving the ecosystem something concrete to build on.",
  },
];

export default function About() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img alt="" aria-hidden="true" loading="lazy" width="1697" height="1415" decoding="async" data-nimg="1" className={HERO_CORNER_CLASS} style={{ color: "transparent" }} src="/sash/patterns/sash-corner-pattern.svg" />
        <SiteHeader active="/about" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[650px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-sash-frost">About SASH</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-sash-frost">
              We are a research and field-building organisation, testing AI governance innovations and closing the field&#39;s biggest coordination gap.
            </p>
          </div>
        </div>
      </section>
      <section id="mission" className="bg-white">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-10 pt-14 pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] sm:items-start sm:gap-8">
            <h2 className="text-display-2 md:text-display-2-lg">Mission</h2>
            <div className="flex flex-col gap-5 text-body-sm text-sash-graphite md:text-body md:text-body-lg">
              <p>Governing advanced AI will take technical solutions, policy judgement and above all: coordination across regions.</p>
              <p>Rooted in Singapore, at the intersection of East and West, we build ecosystems and explore technical solutions that can mitigate risks from frontier AI.</p>
              <p>Founded in 2024 as a physical hub in central Singapore we are now a global team spanning Asia-Pacific, Europe and North America.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="focus" className="bg-white">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-8 pt-0 pb-10 md:gap-10 md:pb-12 lg:pb-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <h2 className="text-display-2 md:text-display-2-lg">Focus</h2>
          <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-3">
            {FOCUS.map((item) => (
              <article key={item.number} className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite flex min-h-[190px] flex-col justify-between gap-8 p-6 md:min-h-[245px] md:p-8 lg:min-h-[300px]">
                <p className="text-display-2 md:text-display-2-lg tabular-nums text-sash-cobalt">{item.number}</p>
                <div className="flex flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg">{item.title}</h3>
                  <p className="text-body-sm text-sash-graphite">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="team" className="bg-white">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-0 pb-14 md:pb-20 lg:pb-24">
          <div className="flex flex-col gap-8 md:gap-10">
            <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(280px,0.92fr)] sm:items-start sm:gap-8">
              <h2 className="text-display-2 md:text-display-2-lg">Team</h2>
              <div className="flex flex-col gap-4 sm:justify-self-stretch">
                <p className="text-body-sm text-sash-graphite md:text-body md:text-body-lg">SASH&#39;s team brings together a unique blend of policy, engineering and operations expertise. Based in Singapore, London and remotely around the world, we plug both into hyperlocal and international ecosystems.</p>
                <Link className="text-display-4 md:text-display-4-lg inline-flex min-h-10 w-fit items-center text-sash-cobalt transition-colors hover:text-sash-midnight" href="/careers#open-roles">See open roles</Link>
              </div>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-[10px] sm:grid-cols-2 md:mt-16 lg:mt-20">
            {TEAM.map((person) => (
              <article key={person.name} className="overflow-hidden rounded-lg bg-white text-sash-graphite border border-sash-graphite flex min-w-0 flex-col gap-5 p-4 md:p-6">
                <div className="relative size-[150px] shrink-0 overflow-hidden rounded-[8px] bg-[#d9d9d9] md:size-[190px]">
                  <img alt={`Portrait of ${person.name}`} loading="lazy" decoding="async" data-nimg="fill" className="object-cover" style={FILL_IMAGE} src={person.photo} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <header className="flex min-w-0 flex-col gap-1.5">
                    <h3 className="text-display-3 md:text-display-3-lg break-words">{person.name}</h3>
                    <p className="text-body-sm text-sash-cobalt">{person.role}</p>
                  </header>
                  <p className="text-body-sm text-sash-graphite">{person.bio}</p>
                  {person.linkedin && (
                    <a target="_blank" rel="noopener noreferrer" className="text-body-sm mt-auto w-fit text-sash-cobalt underline underline-offset-[3px] transition-colors hover:text-sash-midnight" href={person.linkedin}>LinkedIn</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
