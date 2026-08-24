import type { Metadata } from "next";
import Link from "next/link";
import {
  Figura,
  GraficaAsimetria,
  GraficaEstimaciones,
  GraficaGpqa,
  GraficaHoneypot,
  GraficaHorizonte,
} from "@/components/charts";
import CtaPanel from "@/components/cta-panel";
import IndiceEnsayo, { type ItemIndice } from "@/components/indice-ensayo";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "What AI safety is",
  description:
    "Why the speed of progress in artificial intelligence, and not the intelligence of the machines, is what turns it into a safety problem. With the measurements that hold it up and what they do not allow anyone to conclude.",
  alternates: { canonical: "/en/ai-safety", languages: alternativas("/en/ai-safety") },
};

/** enlace de fuente en linea: siempre apunta al documento primario, nunca a un resumen */
function Fuente({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-aisc-forest underline decoration-aisc-forest/40 underline-offset-4 transition-colors hover:decoration-aisc-forest"
    >
      {children}
    </a>
  );
}

/* Ancho de lectura: una sola columna. La prosa se queda en 720px y las figuras
   salen a 980px. */
const COL = "mx-auto w-full max-w-[720px]";
const ANCHO = "mx-auto w-full max-w-[980px] px-6 md:px-8";
const P = "text-body md:text-body-lg text-aisc-ink";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className={`${COL} scroll-mt-24 pt-14 md:pt-16`} id={id}>
      <h2 className="text-display-2 md:text-display-2-lg text-balance">
        {children}
      </h2>
    </div>
  );
}

function H3({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className={`${COL} text-display-4 md:text-display-4-lg mt-10 mb-3 scroll-mt-24 text-aisc-forest`}
    >
      {children}
    </h3>
  );
}

function Parrafo({ children }: { children: React.ReactNode }) {
  return <p className={`${COL} ${P} mt-5`}>{children}</p>;
}

const INDICE: ItemIndice[] = [
  { id: "resumen", label: "In short" },
  {
    id: "capacidades",
    label: "These systems do more and more without supervision",
    corto: "What they do unsupervised",
  },
  {
    id: "horizonte",
    label: "From answering questions to carrying out tasks",
    corto: "From answering to acting",
    nivel: 3,
  },
  {
    id: "verificacion",
    label: "Looking inside a model is only starting to be possible",
    corto: "Looking inside the model",
  },
  {
    id: "incidentes",
    label: "There are already cases where the system left its box",
    corto: "Cases outside the box",
  },
  {
    id: "intencional",
    label: "And not all of it is accidental",
    corto: "Not all of it is accidental",
    nivel: 3,
  },
  {
    id: "pesos-abiertos",
    label: "Publishing the weights removes the brake",
    corto: "Published weights",
    nivel: 3,
  },
  {
    id: "asimetria",
    label: "The capacity to decide does not grow at the same rate",
    corto: "Deciding moves at another rate",
  },
  {
    id: "desacuerdo",
    label: "Those who disagree are partly right",
    corto: "The disagreement has a point",
  },
  {
    id: "objeciones",
    label: "The five objections we hear most",
    corto: "Five objections",
    nivel: 3,
  },
  {
    id: "frentes",
    label: "There are three fronts and not all of them require technical training",
    corto: "Three fronts of work",
  },
  {
    id: "colombia",
    label: "There are more open problems than people to work on them",
    corto: "More problems than people",
  },
];

const RESUMEN = [
  "The best AI systems no longer answer questions: they work on their own for hours, write and run code and use tools without anyone checking each step. METR, the organisation that measures what these systems can do, finds that the length of the tasks they complete on their own doubles every seven months. When a system answers, an error is a bad answer someone discards; when it acts, an error is something that already happened.",
  "Nobody knows how to check in advance what one of these systems will do, because they are not programmed, they are trained. In 2025 Anthropic discovered that its model recognised when it was being evaluated and that this made it behave better, which cast doubt on its own safety measurements. In July 2026, two OpenAI models left the isolated environment they were being tested in, compromised Hugging Face's infrastructure and pulled the answers to the exam they were sitting out of it. Nobody was obliged to report it.",
  "Verifying these systems and deciding about them, meanwhile, moves at the usual pace. The whole AI safety field adds up to some 1,300 people and USD 525 million a year; the four companies that invest the most announced close to 700 billion for 2026 alone. The most complete map of the field, with 170 organisations, records none in Latin America.",
];

/** las tres formas de trabajar en el problema */
const FRENTES = [
  {
    title: "Alignment and interpretability",
    body: "How to get a system to pursue what it was asked for and not something similar, and how to look inside to know what it is doing. It attacks the underlying problem and remains unsolved.",
  },
  {
    title: "Evaluation and control",
    body: "How to measure what a model is capable of before releasing it and how to supervise it once it acts on its own. It is the closest thing to a technical inspection and where people are most needed.",
  },
  {
    title: "Governance and public policy",
    body: "What is demanded of whoever deploys a system, with what evidence and to whom they answer. In Colombia this is being settled now, in public procurement and sector regulation, and it does not require technical training.",
  },
];

export default function AiSafety() {
  return (
    <main className={PAGE_SHELL} lang="en">
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
          src="/aisc/patterns/aisc-hero-seguridad.svg"
        />
        <SiteHeader active="/en/ai-safety" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              What AI safety is
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              <a
                href="https://hai.stanford.edu/ai-definitions/what-is-ai-safety"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aisc-sand underline decoration-aisc-sand/40 underline-offset-4 transition-colors hover:decoration-aisc-sand"
              >
                “AI safety”
              </a>{" "}
              is the field working to make artificial intelligence systems do
              what is expected of them and cause no harm. The problem is
              checking it. These systems are not programmed, they are trained,
              so nobody writes the rules they end up following, and today they
              already work on their own for hours. This text explains how far
              that has gone, what can and cannot be measured, and how someone
              gets in to work on it.
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · updated August 2026 · about a 15 minute read
            </p>
          </div>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        {/* Entrada: la escena concreta antes de cualquier definicion */}
        <div className={`${ANCHO} pt-14 md:pt-16`}>
          <p className={`${COL} text-display-4 md:text-display-4-lg text-aisc-forest`}>
            A public agency is about to procure an artificial intelligence
            system to rank the applications to a social programme, and someone
            has to review the tender. They have the vendor's name, a twenty
            minute demonstration and a promise of 92 % accuracy on a test set
            the vendor put together. They do not have the model's weights, or
            the training data, or any way to run it against cases the agency
            designs.
          </p>
          <Parrafo>
            What they should demand before signing is the question of this text.
            The short answer: today nobody knows how to certify what one of
            these systems pursues, not even the people who build them.
          </Parrafo>

          {/* En resumen: lo que se lleva quien no siga leyendo */}
          <div className={`${COL} mt-12 scroll-mt-24`} id="resumen">
            <div className="rounded-lg border border-aisc-ink bg-aisc-sand p-6 md:p-8">
              <span className="text-kicker text-aisc-coral">In short</span>
              <div className="mt-5 flex flex-col gap-4">
                {RESUMEN.map((parrafo) => (
                  <p
                    key={parrafo}
                    className="text-body-sm md:text-body text-aisc-ink"
                  >
                    {parrafo}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* En esta pagina */}
          <IndiceEnsayo items={INDICE} idioma="en" />

          {/* ---------------------------------------------------------- */}
          <H2 id="capacidades">
            These systems do more and more without supervision
          </H2>
          <Parrafo>
            GPQA is a set of biology, physics and chemistry questions that
            doctoral students wrote in 2023 so that they would resist Google.
            People holding a doctorate in the discipline of each question got
            65 % right, or 74 % once you discount the questions where they
            themselves, on rereading, accepted they had misread the wording.
            People with training but outside the topic, with internet access and
            half an hour per question, stopped at 34 %, nine points above the
            25 % of chance{" "}
            <Fuente href="https://arxiv.org/abs/2311.12022">
              (Rein et al., 2023)
            </Fuente>
            . The best system available that year scored 39 %, closer to the
            non-specialists than to the experts. In December 2024, twenty months
            after the exam was published, a model went past the specialists.
          </Parrafo>

          <Figura
            numero={1}
            idioma="en"
            titulo="An exam built to resist Google, beaten in twenty months"
            pie="Each point is the best result published up to that date on GPQA Diamond, the subset of 198 questions the specialists in the original study answered correctly. The dotted line, 69.7 %, is what a group holding doctorates recruited by OpenAI scored on that subset."
            limite="whether a system understands biology, because these are multiple choice questions and only the final answer is graded. The exam also saturates: once systems pass 95 % it stops being useful for telling one apart from another."
            fuentes={[
              {
                texto: "Rein et al. (2023), the exam and its control groups",
                href: "https://arxiv.org/abs/2311.12022",
              },
              {
                texto: "OpenAI, “Learning to Reason with LLMs”, the 69.7 % line",
                href: "https://openai.com/index/learning-to-reason-with-llms/",
              },
              {
                texto: "Epoch AI, “GPQA Diamond”, AI Benchmarking Hub (CC BY)",
                href: "https://epoch.ai/benchmarks/gpqa-diamond",
              },
            ]}
          >
            <GraficaGpqa idioma="en" />
          </Figura>

          <Parrafo>
            That progress also gets cheaper on its own. Epoch AI reviewed 231
            language models published over a decade and measured how much
            compute was needed, year by year, to reach the same level of
            performance. Half as much is needed every eight months, with a 95 %
            confidence interval between five and fourteen months{" "}
            <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">
              (Epoch AI, 2024)
            </Fuente>
            . It is not that the machines are better: it is that people learned
            to get more out of the same machines. What today only runs in the
            data centre of one of the big companies will, in a few years, run
            for many more people with far less.
          </Parrafo>

          <H3 id="horizonte">From answering questions to carrying out tasks</H3>
          <Parrafo>
            The frontier is no longer models that reply: they are agents that
            write and run code for hours without anyone checking each step.
            METR, the organisation the labs hand their models to before
            publishing them, measures each task by how long a professional would
            take to do it. Its indicator is the length beyond which the model
            already fails half the time: if it solves what takes a person an
            hour, but falls over on the four hour job, its horizon is one hour.
          </Parrafo>

          <Figura
            numero={2}
            idioma="en"
            titulo="From five minutes to seventeen hours, succeeding half the time"
            pie="Length of the longest task the best model of each moment completes with 50 % success. Logarithmic axis. METR estimates that it doubles every seven months."
            limite="that models are going to replace a professional. The tasks measured are software and research tasks, and not even METR claims the result carries over to other trades."
            fuentes={[
              {
                texto: "METR, “Measuring AI Ability to Complete Long Tasks”",
                href: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
              },
              {
                texto: "Epoch AI, “METR Time Horizons” (CC BY), the updated series",
                href: "https://epoch.ai/benchmarks/metr-time-horizons",
              },
            ]}
          >
            <GraficaHorizonte idioma="en" />
          </Figura>

          <Parrafo>
            When a system answers, an error is a reply someone discards. When it
            acts, an error is something that already happened. And the longer
            the chain, the less workable it becomes to follow it step by step,
            which is the control available today.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="verificacion">
            Looking inside a model is only starting to be possible
          </H2>
          <Parrafo>
            A model is not programmed: a measure of success is set, it is shown
            millions of examples and it adjusts on its own billions of numbers
            nobody chose. Nobody wrote those numbers and nobody can read them
            straight through. So the only practical route to knowing what a
            system will do is to put it to the test and watch how it behaves. In
            2025 it became visible that this route has a problem.
          </Parrafo>
          <Parrafo>
            In September of that year,{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              the technical report for Claude Sonnet 4.5
            </Fuente>{" "}
            reported something Anthropic was not looking for: the model said out
            loud that it suspected it was in a test, and when it said so, it
            almost never misbehaved. Discarding those conversations and keeping
            the rest fixes nothing, because the model can also notice without
            saying it. From the outside there is no way to know whether it did.
          </Parrafo>
          <Parrafo>
            So Anthropic opened it from the inside. When a network handles an
            idea, a pattern of activations associated with that idea lights up
            inside it, and that is what interpretability makes it possible to
            locate. The test was a hundred honeypot scenarios: situations set up
            so the model had an improper action within reach and no apparent
            reason not to take it, for instance broader permissions than it
            should have had and nobody supervising. With nothing touched, it
            said in more than 80 % of those scenarios that this looked like a
            test, and it did not take the improper action in any of the hundred.
            With the “this is an evaluation” pattern switched off and the
            scenarios identical, it took it in up to 9 out of 100. Switching off
            ten random patterns, which was the control, produced none.
          </Parrafo>

          <Figura
            numero={3}
            idioma="en"
            titulo="The exam was measuring, in part, whether the model knew it was an exam"
            pie="Share of misaligned actions across a hundred honeypot scenarios. The first three bars are Claude Sonnet 4.5 under different internal interventions; the last one is the previous model, with no intervention."
            limite="that the model is dangerous, or that it was pretending on purpose. The 9 % is the worst result across all the interventions tried; with most of them the model stayed between 1 and 5 %."
            fuentes={[
              {
                texto: "Anthropic, “System Card: Claude Sonnet 4.5”, section 7.6.4.1 (September 2025)",
                href: "https://www.anthropic.com/claude-sonnet-4-5-system-card",
              },
            ]}
          >
            <GraficaHoneypot idioma="en" />
          </Figura>

          <Parrafo>
            That does not make the model dangerous, and it is worth saying so.
            Not even in the worst case did it behave worse than the previous
            version, and Anthropic found no sign that it was deceiving anyone on
            purpose; its explanation is that recognising a test reminds the
            model of its own principles. What was demonstrated is something
            else. The number used to decide whether a system goes out into the
            world depended on something nobody was controlling. Opening it from
            the inside served to discover that, and it does not serve the
            opposite, which would be certifying that the next number is clean.
          </Parrafo>
          <Parrafo>
            That tool is younger than it sounds. Anthropic, which has published
            the most about it, says of its own method for tracing circuits that
            it gives a satisfactory explanation in about a quarter of the cases
            it attempts{" "}
            <Fuente href="https://transformer-circuits.pub/2025/attribution-graphs/biology.html">
              “On the Biology of a Large Language Model”
            </Fuente>
            . Dario Amodei, its chief executive, set himself the goal that by
            2027 interpretability should reliably detect most of a model's
            problems, and describes the starting point this way: when one of
            these systems does something, we have no idea, at a precise level,
            why it makes the decisions it makes{" "}
            <Fuente href="https://darioamodei.com/post/the-urgency-of-interpretability">
              “The Urgency of Interpretability”
            </Fuente>
            . Meanwhile the problem spread. In July 2026, Redwood Research
            reviewed the safety evaluations published by Anthropic, OpenAI,
            Meta, Google DeepMind and the British institute, and found that
            models keep recognising the tests, with the highest rates recorded
            so far in Meta's latest model. Its{" "}
            <Fuente href="https://blog.redwoodresearch.org/p/sota-alignment-assessments-dont-strongly">
              conclusion
            </Fuente>{" "}
            is that these evaluations say considerably less than they appear to
            say.
          </Parrafo>
          <Parrafo>
            A bridge is calculated, inspected and someone signs off on it. A
            model is tested from the outside, and what is left is a statistic
            about the cases someone thought to try. The inside examination given
            to Claude Sonnet 4.5 was the first of its kind before publishing a
            frontier model, it was carried out by the same company that was
            going to sell it, and Anthropic asks that it stop being voluntary.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="incidentes">
            There are already cases where the system left its box
          </H2>
          <Parrafo>
            In July 2026 OpenAI was evaluating two of its models, GPT-5.6 Sol
            and one unreleased, against an offensive cybersecurity benchmark. To
            measure how far they would go, part of the safety restrictions had
            been lifted. Inside the isolated environment they spent considerable
            compute looking for a way out to the internet. They found a flaw
            nobody had reported in an internal library server, chained it with
            others until they left OpenAI's research environment and reached
            Hugging Face's infrastructure, and pulled the answers to the exam
            they were sitting out of Hugging Face's database{" "}
            <Fuente href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
              (OpenAI, 21 July 2026)
            </Fuente>
            . Hugging Face confirmed that they came to control whole machines,
            that more than 17,000 attacker events were logged and that nothing
            people publish there was compromised{" "}
            <Fuente href="https://huggingface.co/blog/security-incident-july-2026">
              (Hugging Face, 16 July 2026)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            There was no intent to cause harm: the models were solving the
            problem they were given. A narrow objective, enough capability and
            no instruction to stop were sufficient to leave the box and
            compromise a third party's infrastructure. Neither company was
            obliged to report it: the state laws that today require reporting AI
            incidents in the United States set the threshold at fifty deaths or
            a billion dollars in damages{" "}
            <Fuente href="https://www.iaps.ai/research/the-openaihugging-face-incident-challenges-in-controlling-and-containing-cyber-capable-ai-systems">
              (Institute for AI Policy and Strategy, 2026)
            </Fuente>
            .
          </Parrafo>

          <H3 id="intencional">And not all of it is accidental</H3>
          <Parrafo>
            In June 2025, Google's threat intelligence team found in Ukraine a
            spy programme disguised as an image generator that, while the victim
            typed, asked an open language model which commands to use to find
            documents and copy them. The orders did not come written inside: it
            requested them on the spot and ran them without reviewing them.
            Google attributes it to APT28, the group associated with Russian
            military intelligence, and says it is the first time it has seen a
            malicious programme consulting a language model in a real operation{" "}
            <Fuente href="https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools">
              (Google Threat Intelligence Group, November 2025)
            </Fuente>
            . The same report calls those capabilities nascent. What changes is
            not the power of the attack, it is where its thinking part sits:
            before it came written inside the file, where an analyst could read
            it, and now it is generated differently on each run. Antivirus
            software that recognises a threat by its signature, that is, by what
            the file looks like, is left with nothing fixed to recognise.
          </Parrafo>

          <H3 id="pesos-abiertos">
            Publishing the weights removes the brake, and in biology that
            already matters
          </H3>
          <Parrafo>
            In the two previous cases there was a company that could cut off
            access to the model. Publishing the weights removes that
            possibility: whoever has them runs the model on their own machine,
            strips the restrictions and keeps using it even if the author
            regrets it. Open models have good arguments in their favour,
            starting with the fact that without them research from countries
            like ours would be far harder. The balance depends on the domain.
          </Parrafo>
          <Parrafo>
            On 6 August 2026, <em>Science</em> published the work of a Stanford
            and Arc Institute team led by Brian Hie and Samuel King. With Evo 1
            and Evo 2, models trained on DNA sequences instead of text and whose
            weights are published, they wrote complete viral genomes from a
            short fragment. Of some 700,000 genomes generated they sent 302 to
            be synthesised, managed to build 285 and 16 turned out to be
            functional viruses, able to destroy <em>E. coli</em> in two or three
            hours{" "}
            <Fuente href="https://www.science.org/doi/10.1126/science.aec2657">
              (King, Hie et al., Science, August 2026)
            </Fuente>
            . They are bacteriophages, which infect bacteria and not people:
            sequences able to infect humans, animals or plants were excluded
            from the training{" "}
            <Fuente href="https://arcinstitute.org/news/hie-king-first-synthetic-phage">
              (Arc Institute, 2026)
            </Fuente>
            . 5.6 % of what they managed to build worked, 16 genomes out of 285.
            Writing a viral genome from scratch that then works in the
            laboratory stopped being hypothetical.
          </Parrafo>
          <Parrafo>
            Between a design on screen and a real molecule there is a single
            control: DNA synthesis providers, who review each order voluntarily.
            In October 2025, a team led by Eric Horvitz, Microsoft's chief
            scientific officer, generated 76,089 variants of 72 proteins of
            concern, among them ricin and botulinum neurotoxin, and most of them
            got through without being detected by the software those providers
            use to review orders{" "}
            <Fuente href="https://erichorvitz.com/paraphrase.htm">
              (Wittmann et al., Science, 2025)
            </Fuente>
            . The exercise was computational: nothing was synthesised and it was
            not shown that the variants kept their toxicity, and Michael Cohen,
            of Berkeley, holds that the challenge was a weak one.
          </Parrafo>
          <Parrafo>
            The bottleneck is still the laboratory, and how long it lasts is
            what nobody knows how to measure. In May 2025 Anthropic activated
            its ASL-3 protection level for Claude Opus 4 without having
            determined that the model crossed the threshold that requires it,
            because ruling that risk out was no longer possible{" "}
            <Fuente href="https://www.anthropic.com/news/activating-asl3-protections">
              (Anthropic, 2025)
            </Fuente>
            . The binding constraint is not what the system can do, it is what
            nobody knows how to check.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="asimetria">
            The capacity to decide does not grow at the same rate
          </H2>
          <Parrafo>
            What accelerates is the technology. The people who understand the
            subject, the public debate and the calendars of institutions carry
            on at the usual pace. Accelerating only one of the two halves leaves
            the other further and further behind, and the argument is William
            MacAskill and Fin Moorhouse's{" "}
            <Fuente href="https://www.forethought.org/research/preparing-for-the-intelligence-explosion">
              (Forethought, 2025)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            The simplest way to see it is to count who is on each side. A public
            mapping finds 170 organisations dedicated to AI safety and
            governance worldwide: adding up only those that report data, some
            1,313 full-time staff and about USD 525 million a year{" "}
            <Fuente href="https://harrywaterman.com/fieldmap/">
              (AI Safety Field Map, data to September 2025)
            </Fuente>
            . Amazon, Google, Meta and Microsoft announced close to USD 700
            billion in AI infrastructure for 2026 alone, more than 60 % above
            2025{" "}
            <Fuente href="https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html">
              (CNBC, 2026)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={4}
            idioma="en"
            titulo="Three orders of magnitude between building these systems and understanding them"
            pie="Declared annual budget of the AI safety field against the infrastructure investment announced by the four companies that spend the most. Logarithmic scale."
            limite="how much those four companies spend on safety, because they do not break it out. The comparison is not exact either: one figure is operating expenditure and the other capital investment, so it works for the order of magnitude and not for the precise difference."
            fuentes={[
              {
                texto: "AI Safety Field Map (September 2025), the field",
                href: "https://harrywaterman.com/fieldmap/",
              },
              {
                texto: "CNBC (February 2026), the announced investment",
                href: "https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html",
              },
            ]}
          >
            <GraficaAsimetria idioma="en" />
          </Figura>

          <Parrafo>
            The other half of the asymmetry is the calendar. Colombia approved
            its national artificial intelligence policy in February 2025, with
            more than a hundred actions and a roadmap running to 2030{" "}
            <Fuente href="https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf">
              (CONPES 4144, DNP)
            </Fuente>
            . That timeline is normal for a public policy; the point is the
            comparison. If the trend METR measures held over those five years,
            the horizon of tasks a system carries out on its own would have
            doubled eight times, that is multiplied by more than two hundred,
            before the plan that was going to regulate it comes to an end.
          </Parrafo>
          <Parrafo>
            Hence the temptation to wait, which for many problems is the right
            call. For three things it is not. Rules set while a subject is new
            tend to last, and whoever is not at the table when they are written
            is not there when they are applied either. Building an audit
            capability or training someone takes years. And there are agreements
            that only get signed while nobody yet knows whom they will favour:
            afterwards everyone has worked out what suits them and stops signing
            them.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="desacuerdo">Those who disagree are partly right</H2>
          <Parrafo>
            In 2023, 2,778 researchers who publish at the main AI conferences
            were asked about the probability that advanced AI ends in human
            extinction or a comparable loss of control: the median was 5 % and
            the mean 16.2 %, and between 38 % and 51 % gave that outcome at
            least a 10 %{" "}
            <Fuente href="https://arxiv.org/abs/2401.02843">
              (Grace et al., 2024)
            </Fuente>
            . Professional forecasters give much lower numbers: in a Forecasting
            Research Institute tournament, a group of AI experts estimated 3 %
            before 2100, and the superforecasters, picked for being
            systematically right, 0.38 %{" "}
            <Fuente href="https://forecastingresearch.org/xpt">
              (Forecasting Research Institute, 2023)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={5}
            idioma="en"
            titulo="Almost an order of magnitude between people whose job is estimating well"
            pie="Probability of extinction or severe loss of control caused by AI. Logarithmic axis."
            limite="a real probability. These are aggregated opinions, the questions are not identical across the two studies and the tournament was run in 2022, before ChatGPT."
            fuentes={[
              {
                texto: "Grace et al. (2024), the survey of researchers",
                href: "https://arxiv.org/abs/2401.02843",
              },
              {
                texto: "Forecasting Research Institute (2023), the forecasting tournament",
                href: "https://forecastingresearch.org/xpt",
              },
            ]}
          >
            <GraficaEstimaciones idioma="en" />
          </Figura>

          <Parrafo>
            The disagreement runs deep. The 2018 Turing Award went to three
            people for deep learning, the technique all of this is built on, and
            two of the three now warn publicly about what they helped build.
            Geoffrey Hinton resigned from Google in 2023 to speak without
            representing anyone{" "}
            <Fuente href="https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/">
              (MIT Technology Review, May 2023)
            </Fuente>
            . Yoshua Bengio explained that same year{" "}
            <Fuente href="https://yoshuabengio.org/2023/06/24/faq-on-catastrophic-ai-risks/">
              why he gives weight to catastrophic risks
            </Fuente>{" "}
            and today chairs{" "}
            <Fuente href="https://arxiv.org/abs/2602.21012">
              the international AI safety report
            </Fuente>
            , backed by twenty-nine countries, the UN, the OECD and the European
            Union.
          </Parrafo>
          <Parrafo>
            The third is Yann LeCun, and he thinks the opposite: intelligence
            does not bring with it the desire to dominate{" "}
            <Fuente href="https://time.com/6694432/yann-lecun-meta-ai-interview/">
              (TIME, February 2024)
            </Fuente>
            . Andrew Ng considers the probability of an accident of that kind
            minuscule, though he does take malicious use seriously{" "}
            <Fuente href="https://www.deeplearning.ai/the-batch/ai-doomsday-scenarios-and-how-to-guard-against-them">
              (The Batch, December 2023)
            </Fuente>
            . Melanie Mitchell aims at the survey:{" "}
            <Fuente href="https://aiguide.substack.com/p/do-half-of-ai-researchers-believe">
              whoever decides to answer it is not a random sample of the
              discipline
            </Fuente>
            . It was answered by 2,778 of the 18,459 people invited, 15 %. Gary
            Marcus locates the danger{" "}
            <Fuente href="https://garymarcus.substack.com/p/ai-risk-agi-risk">
              in mediocre systems that are already being handed decisions
            </Fuente>
            , and for that reason he demands regulation as forcefully as any of
            the others.
          </Parrafo>

          <H3 id="objeciones">The five objections we hear most</H3>
          <Parrafo>
            <strong>This is a marketing strategy.</strong> Partly yes: it suits
            the lab for its product to sound powerful. But the figures on this
            page come from outside those companies: from{" "}
            <Fuente href="https://blog.redwoodresearch.org/p/sota-alignment-assessments-dont-strongly">
              people who evaluate the models on their own
            </Fuente>
            , from Hinton and Bengio, and from an{" "}
            <Fuente href="https://futureoflife.org/ai-safety-index-summer-2026/">
              independent panel
            </Fuente>{" "}
            that this year gave none of them more than a C+ on safety. And
            sometimes the company itself says what no salesperson would.
            Anthropic refused Claude to the Pentagon for autonomous weapons
            because frontier systems{" "}
            <Fuente href="https://www.anthropic.com/news/statement-department-of-war">
              “are not reliable enough”
            </Fuente>
            , and that cost it{" "}
            <Fuente href="https://www.anthropic.com/news/anthropic-and-the-department-of-defense-to-advance-responsible-ai-in-defense-operations">
              a contract worth up to USD 200 million
            </Fuente>{" "}
            and{" "}
            <Fuente href="https://www.npr.org/2026/03/06/g-s1-112713/pentagon-labels-ai-company-anthropic-a-supply-chain-risk">
              access to every federal agency
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            <strong>The models still fail at obvious things.</strong> True, and
            we do not claim they are reliable, quite the opposite: they fail in
            ways that are hard to anticipate. A system that always failed the
            same way could be bounded and certified. The problem is that nobody
            knows in advance what it is going to get wrong.
          </Parrafo>
          <Parrafo>
            <strong>This distracts from the harms that already exist.</strong>{" "}
            It is the objection that corrects the argument, because attention
            and budget are finite. But the work overlaps: measuring what a
            system is capable of, auditing it and having someone to hold
            responsible when it fails is the same institutional capacity for a
            model that denies credit today and for one that runs infrastructure
            in ten years.
          </Parrafo>
          <Parrafo>
            <strong>Progress is going to stall.</strong> It may: compute, energy
            and good quality data are real bottlenecks. Against that stands
            Epoch's measurement: if the compute needed for the same performance
            halves every eight months, moving forward takes fewer and fewer
            resources, not more. And even if the brakes win, that world also
            needs someone to audit what it buys.
          </Parrafo>
          <Parrafo>
            <strong>Nobody is going to deploy something dangerous on purpose.</strong>{" "}
            The argument does not need anyone to do it on purpose. Two
            conditions that already hold are enough: that it be hard to verify
            what a system does before releasing it, and that there be
            competitive pressure to release it anyway. The OpenAI and Hugging
            Face episode happened behind closed doors, in a test the company
            itself had designed to measure that risk.
          </Parrafo>
          <Parrafo>
            The field may be exaggerating the danger and it may be
            underestimating it. What we hold does not depend on getting the
            number right: today we do not know how to certify what a system
            pursues, and the decisions that are hard to reverse are being taken
            now. If the frontier stalls for two or three years in a row, the
            part about timelines falls. If methods appear for certifying what a
            system pursues before deploying it, almost everything else falls.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="frentes">
            There are three fronts and not all of them require technical
            training
          </H2>
          <Parrafo>
            Anyone can come in through any of the three, and through more than
            one over time.
          </Parrafo>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1448px] px-6 md:px-8">
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {FRENTES.map((frente) => (
              <article
                key={frente.title}
                className="overflow-hidden rounded-lg bg-aisc-cream border border-aisc-ink flex flex-col p-6 text-aisc-ink md:min-h-[270px] md:p-7 lg:min-h-[300px] lg:p-8"
              >
                <span
                  aria-hidden="true"
                  className="mb-5 block h-px w-10 flex-none bg-aisc-coral"
                />
                <div className="flex max-w-[420px] min-w-0 flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg break-words text-balance">
                    {frente.title}
                  </h3>
                  <p className="text-body-sm text-aisc-ink">{frente.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={ANCHO}>
          {/* ---------------------------------------------------------- */}
          <H2 id="colombia">
            There are more open problems than people to work on them
          </H2>
          <Parrafo>
            Nobody yet knows how to read from the inside what a model pursues,
            or how to set up an evaluation the model does not recognise as an
            evaluation, or how to anticipate what it is going to get wrong.
            These are open questions, and being able to hand over one of these
            systems with any guarantee depends on them. The research that deals
            with them is about 2 % of everything published on artificial
            intelligence{" "}
            <Fuente href="https://eto.tech/blog/still-drop-bucket-ai-safety-research/">
              (Emerging Technology Observatory, 2025)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            There is also a part of the problem that starts once the model is
            built. When an agency buys a system to decide about citizens,
            someone has to know what to demand before signing, what data it was
            trained on, and to whom the vendor answers if two years later it
            turns out it was lowering the score of people from a certain
            municipality. There are even fewer people on that.
          </Parrafo>
          <Parrafo>
            Both things ask for the same thing: people who can devote themselves
            to this. Today fewer come in than could, and those who do take
            longer than they should because they have nobody to talk to.
            Shortening that path is what we do. We are a group that reads,
            discusses and works on concrete things, and you get in with no prior
            credential. To start on your own, the shortest thing we know of is{" "}
            <Fuente href="https://bluedot.org">
              BlueDot's foundations course
            </Fuente>
            . To go beyond that, working on something concrete with someone else
            helps, and that is what we are here for.
          </Parrafo>
        </div>
      </article>

      <CtaPanel
        title="So what do I do with this?"
        body="What limits the field is how many people manage to get in. Shortening that path is what we do."
      >
        <Link className={CTA_LINK_PRIMARY} href="/en/join">
          Join the community
        </Link>
        <Link className={CTA_LINK} href="/en/resources">
          See the resources
        </Link>
      </CtaPanel>
      <SiteFooter idioma="en" />
    </main>
  );
}
