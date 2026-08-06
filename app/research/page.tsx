import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Research | AI Safety Colombia",
  description:
    "Investigación práctica para los mayores retos de coordinación de la inteligencia artificial.",
};

const FEATURED = [
  {
    title: "Detecting Offensive Cyber Agents",
    authors: "IAPS, Singapore Cyber Security Agency, SASH",
    body: "AI agents can now orchestrate cyberattacks, changing the speed and scale of cyber threats. This report proposes detection-in-depth as a strategic framework for defenders and policymakers.",
    href: "https://arxiv.org/abs/2605.21956",
  },
  {
    title: "Evaluating DeepSeek v4 Pro For Frontier Risk",
    authors: "Neo Research, SASH",
    body: "We carry out an independent safety evaluation of DSv4 Pro across CBRN, cyber, harmful manipulation, and loss-of-control. Our findings show that while capability is near-frontier; safeguards do not hold under trivial attack.",
    href: "https://neoresearch.ai/research/deepseek-v4-pro-safety-evaluation/",
  },
  {
    title: "Building the trust layer for AI agents",
    authors: "SASH, Singapore AISI, Korea AISI",
    body: "As AI agents begin to take action in the real world, the services and people they interact with need to know who they are, who instructed them, what they are allowed to do and what should happen if something goes wrong. We propose a design logic to direct the development of agent IDs.",
    href: "https://agent-id.org/memo",
  },
];

const FOCUS = [
  {
    icon: "/sash/icons/icon11_sash.svg",
    title: "Verification Mechanisms",
    body: "Tools and protocols that prove whether AI systems meet their safety claims across training, evaluation and deployment, promoting greater diffusion, international coordination and shared best practice.",
  },
  {
    icon: "/sash/icons/icon12_sash.svg",
    title: "Frontier Safety",
    body: "Safety evaluations that can check model safeguards for frontier risks such as Loss of Control and Harmful Manipulation in a diverse range of deployment contexts, before models move into public and commercial use.",
  },
  {
    icon: "/sash/icons/icon13_sash.svg",
    title: "Agent Governance",
    body: "Solutions that can identify, supervise and constrain autonomous agents across regions, actors and use cases, enabling users to integrate them confidently into high-stakes and dynamic use cases.",
  },
];

export default function Research() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/research" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[650px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-sash-frost">Research</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-sash-frost">Practical research for AI&#39;s biggest coordination challenges.</p>
          </div>
        </div>
      </section>
      <section id="approach" className="bg-white">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-16 md:gap-10 md:pt-7 md:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg">Our Approach</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-5 text-sash-graphite">
              <p>Our research focuses on mitigating large-scale risks from frontier AI that require international coordination. We take a collaborative approach, bridging between stakeholders, regions and technical &amp; policy solutions.</p>
              <p>Our work aims to be solutions-oriented and practical, emphasizing technical proofs of concepts over theory, such that we can catalyse action by the wider ecosystem.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="featured" className="bg-white px-6 py-12 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-sash-frost px-6 py-12 text-sash-graphite md:px-10 lg:py-[70px]">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-14 md:gap-10 md:pt-7 md:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6 lg:pb-20">
            <h2 className="text-display-2 md:text-display-2-lg">Featured Research</h2>
            <p className="text-body md:text-body-lg text-sash-graphite">Recent publications and working papers from SASH and our collaborators.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
            {FEATURED.map((paper) => (
              <a key={paper.href} target="_blank" rel="noopener noreferrer" className="group border-sash-cobalt block min-h-[120px] min-w-0 rounded-[8px] border bg-sash-frost p-6 transition-colors hover:bg-white md:p-8 lg:p-10" href={paper.href}>
                <div className="min-w-0">
                  <h3 className="text-display-4 md:text-display-4-lg text-sash-cobalt transition-colors group-hover:text-sash-midnight">{paper.title}</h3>
                  <p className="text-meta md:text-meta-lg mt-3 text-sash-graphite">{paper.authors}</p>
                  <p className="text-body-sm mt-2 max-w-[1080px] text-sash-graphite">{paper.body}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section id="focus" className="bg-white">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 pb-20 md:gap-16 md:pb-24 lg:gap-20">
          <div aria-hidden="true" className="h-px w-full flex-none bg-sash-midnight" />
          <div className="grid grid-cols-1 gap-8 pt-5 md:gap-10 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg">Research Focus</h2>
          </div>
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {FOCUS.map((area) => (
              <article key={area.title} className="overflow-hidden rounded-lg bg-white border border-sash-graphite flex flex-col p-6 text-sash-graphite md:min-h-[270px] md:p-7 lg:min-h-[310px] lg:p-8 xl:min-h-[335px]">
                <img src={area.icon} alt="" aria-hidden="true" loading="lazy" className="size-9 object-contain" />
                <div className="mt-20 flex max-w-[420px] min-w-0 flex-col gap-5 md:mt-24 lg:mt-28">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-display-3 md:text-display-3-lg break-words">{area.title}</h3>
                    <p className="text-body-sm text-sash-graphite">{area.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="flex flex-col gap-8 md:gap-10" />
        </div>
      </section>
      <CtaPanel
        title="Interested in doing the work?"
        body="We are looking for partners, researchers and builders with a solutions mindset and strong bias towards action."
        actionsClassName="flex flex-wrap justify-center gap-y-3 mt-8 items-start gap-x-16"
      >
        <Link className={CTA_LINK} href="/contact">Contact Us</Link>
        <span className="flex flex-col items-center gap-1.5">
          <Link className={CTA_LINK} href="/careers">See Open Roles</Link>
          <span className="text-body md:text-body-lg text-sash-frost">(hiring globally!)</span>
        </span>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
