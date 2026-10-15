import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import PremiadosHackathon, { type Premiado } from "@/components/premiados-hackathon";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { PORTADAS } from "@/lib/portadas";

export const metadata: Metadata = {
  title: "Research",
  description:
    "What the members of AI Safety Colombia publish: peer-reviewed articles, working papers, research reports and the output of our hackathons.",
  alternates: { canonical: "/en/research", languages: alternativas("/en/research") },
};

/* Publicaciones en las que alguien de la comunidad aparece como autor.
   `miembros` marca en negrilla a quien es de acá dentro de la lista de autores,
   que se transcribe completa y en el orden en que la publicó el editor. Los
   títulos van como los publicó cada editor, sin traducir. */
const PUBLICACIONES = [
  {
    titulo: "AI Benefit-Sharing Framework: Balancing Access and Safety",
    tipo: "Working paper",
    editor: "Oxford Martin AI Governance Initiative, University of Oxford",
    fecha: "December 2025",
    autores: [
      "Sumaya Nur Adan",
      "Joanna Wiaterek",
      "Varun Sen Bahl",
      "Ima Bello",
      "Camila Beltran",
      "Tobias Dierks",
      "Luise Eder",
      "Liam Epstein",
      "Abra Ganz",
      "Natalie Kiilu",
      "Marianne Lu",
      "Chinasa T. Okolo",
      "Sydney Reis",
      "Said Saillant",
      "Krishna Sharma",
      "Marjia Siddik",
      "Jan Pieter Snoeij",
      "José Jaime Villalobos",
      "Anna Yelizarova",
    ],
    miembros: ["Camila Beltran"],
    body: "It proposes a framework for sharing the benefits of AI without lowering the safety standard. It rests on three pieces: redistributing part of the economic returns, sharing technology and technical capacity, and containing the spread of dangerous capabilities. The underlying argument is that current governance does not settle who gets access to those benefits, and that countries of the global majority are the ones left out.",
    href: "https://aigi.ox.ac.uk/publications/ai-benefit-sharing-framework-balancing-access-and-safety/",
  },
  {
    titulo: "Approximating Human Preferences Using a Multi-Judge Learned System",
    tipo: "Workshop paper",
    editor: "arXiv. Accepted at two NeurIPS 2025 workshops: Reliable ML from Unreliable Data and Latinx in AI",
    fecha: "October 2025",
    autores: [
      "Eitán Sprejer",
      "Fernando Avalos",
      "Augusto Bernardi",
      "Jose Pedro Brito de Azevedo Faustino",
      "Jacob Haimes",
      "Narmeen Fatimah Oozeer",
    ],
    miembros: ["Fernando Avalos"],
    body: "Language models are increasingly used as judges that grade the answers of other models. The problem is that they grade badly: they shift criteria depending on how the rubric is worded, they carry biases and they are unstable. The paper proposes not trusting a single judge but combining several, each with its own rubric, and learning how much each one weighs. The resulting system shows which judge weighed most in each decision, so you can check why it graded the way it did.",
    href: "https://arxiv.org/abs/2510.25884",
  },
  {
    titulo: "La securitización de la inteligencia artificial: un análisis de sus impulsores y sus consecuencias",
    tipo: "Peer-reviewed article",
    editor: "Revista de Estudios Sociales no. 93, Universidad de los Andes",
    fecha: "July 2025",
    autores: ["Mónica A. Ulloa Ruiz", "Guillem Bas Graells"],
    miembros: ["Mónica A. Ulloa Ruiz"],
    body: "It studies what happens when artificial intelligence is framed in the United States as a matter of national security. The authors review twenty-five public statements from government agencies, technical organisations and the press, and find two ways of posing the problem: one speaks of threats, points at a specific adversary and serves to justify exceptional measures; the other speaks of risks and fits inside ordinary regulation. The conclusion is that the second sustains long-term cooperation better.",
    href: "https://revistas.uniandes.edu.co/index.php/res/article/view/10754",
  },
];

/* AI Incident Response Sprint, septiembre de 2026. Ningun equipo colombiano
   quedo entre los premiados; van los tres que quedaron en el 10 % mejor por el
   puntaje de los jurados. */
const INCIDENTES: Premiado[] = [
  {
    titulo: "CanaryForge",
    premio: "Top 10% of submissions",
    ciudad: "Bogotá",
    equipo: "Sergio Alejandro Castaño Arcila, Angie Camila Gutierrez Trujillo, Juan Esteban Triviño Nieves, Sofia Rodriguez Chaparro and Daniel Felipe Diab Gonzalez",
    body: "Measures how long it takes to notice that an agent has left its sandbox. In 183 of 197 leaks the data left through file and folder names, a channel a network proxy cannot see.",
    href: "https://apartresearch.com/project/canaryforge-xi71",
  },
  {
    titulo: "Cooperation when it costs",
    premio: "Top 10% of submissions",
    ciudad: "Bogotá",
    equipo: "David José Daza Jaimes, Andres Felipe Mosquera Hernandez and Víctor Gelves",
    body: "An experiment in which helping another agent always costs the helper, to measure when models cooperate anyway and how much the price matters.",
    href: "https://apartresearch.com/project/rare-once-it-costs-anything-costly-cooperation-between-llm-agents-loz0",
  },
  {
    titulo: "The Certified Effect",
    premio: "Top 10% of submissions",
    ciudad: "Bogotá",
    equipo: "Carlos Eduardo Sinuco Agudelo and Juan David Rengifo Traslaviña",
    body: "Simulates what happens when passing the onboarding evaluation gives an agent more privileges: data exfiltration rises two to three times compared with evaluating without a reward.",
    href: "https://apartresearch.com/project/the-certified-effect-why-testing-ai-agents-at-onboarding-shifts-risk-instead-of-reducing-it-9eyr",
  },
];

/* Lo premiado. Cada tarjeta enlaza al reporte publico en Apart, que es donde se
   puede comprobar el premio y leer el trabajo completo. */
const PREMIADOS: Premiado[] = [
  {
    titulo: "ColDron",
    premio: "Latin America prize",
    ciudad: "Bogotá",
    equipo: "Leonardo Párraga, Angie Giraldo and Víctor Gelves",
    body: "An open dataset of 42 commercial drone attacks in Colombia, to establish who picks the target and who pulls the trigger.",
    href: "https://apartresearch.com/project/coldron-lj2w",
  },
  {
    titulo: "Colombian identity in a model's internal representations",
    premio: "Latin America prize",
    ciudad: "Cali",
    equipo:
      "Gilber Alexis Corrales Gallego, Pablo Santiago Potes Velasco, Jhoan Stevan Mosquera Ortiz, Nicolás Lozano Mazuera, María del Mar García Matabanchoy and Óscar Julián Pérez Ladino",
    body: "Measures whether Qwen2.5-7B internally infers the Colombian identity and social class of whoever writes to it, and whether that carries stereotypes.",
    href: "https://apartresearch.com/project/probing-latent-colombian-identity-inferences-in-qwen257b-with-natural-language-autoencoders-mucf",
  },
  {
    titulo: "Which reasoning steps produce the bias",
    premio: "Latin America prize",
    ciudad: "Bogotá",
    equipo: "Andres Felipe Mosquera Hernandez",
    body: "Identifies which intermediate reasoning steps produce stereotyped answers in Latin American scenarios.",
    href: "https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti",
  },
  {
    titulo: "Why do agents obey?",
    premio: "Honourable mention",
    ciudad: "Bogotá",
    equipo: "Helen Stefany Penagos and Juan Esteban Leiva",
    body: "Shows that a model's internal refusal mechanism weakens when it operates as an agent with tools.",
    href: "https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70",
  },
  {
    titulo: "JusticIA",
    premio: "Honourable mention",
    ciudad: "Bogotá",
    equipo: "Lina Gomez, Brenda Barahona and Ernesto Duarte",
    body: "A transitional justice test: change a single piece of context and measure how far the sentence recommended by six models moves.",
    href: "https://apartresearch.com/project/justicia-a-counterfactual-benchmark-for-auditing-contextual-biases-in-language-models-for-transitional-justice-jjvl",
  },
];

/* El resto de equipos con integrantes en Colombia, en el orden en que aparecen
   en el catalogo publico de Apart. */
const OTROS = [
  {
    titulo: "An ethical framework for AI applied to Panama's Guna language",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/marco-tico-para-ia-aplicada-a-la-preservacin-lingstica-guna-de-panam-6uxw",
    equipo: "Ana María González Aldana, Kelvin Alvarado and Mariana Zuluaga Abril",
  },
  {
    titulo: "Governance Drift Evaluation Framework",
    ciudad: "Colombia",
    href: "https://apartresearch.com/project/governance-drift-evaluation-framework-gdef-vfzj",
    equipo: "Andrés Mogollón, Juan Manuel Cortes Jimenez, Oscar Poveda, Devesh Sawant and Liliana Isabel Salazar",
  },
  {
    titulo: "A two-classifier system for language model security",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/dualclassifier-system-for-llm-security-s491",
    equipo: "Nicolás David Galindo, Daniel Libardo Diaz Gonzalez, Juan Jacobo Izquierdo Becerra and David Andrés Ramírez",
  },
  {
    titulo: "Los peajes de los de abajo",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/los-peajes-de-los-de-abajo-i6wx",
    equipo: "Mongui Rogers",
  },
  {
    titulo: "Algorithmic contestability in the Colombian state",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/contestabilidad-algortmica-en-el-estado-colombiano-un-canal-de-objecin-asistido-por-ia-lbsm",
    equipo: "Emely Condor and Federico Perez",
  },
  {
    titulo: "Agentic commerce and consumer protection",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/agentic-commerce-and-consumer-protection-emerging-risks-and-regulatory-gaps-be7b",
    equipo: "Francely Carreño, Sofía Botía and Vanessa Reyes",
  },
  {
    titulo: "JurisGuard-LATAM",
    ciudad: "Jamundí",
    href: "https://apartresearch.com/project/jurisguardlatam-sadx",
    equipo: "Jhon Harvey Tejada Tabares",
  },
  {
    titulo: "Honest-Code",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/honestcode-8pnk",
    equipo: "Yoel Alfonso",
  },
  {
    titulo: "Mapping AI tools in Colombian call centres",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/mapeo-de-herramientas-ia-en-contextos-laborales-el-caso-de-los-call-centers-en-colombia-k1kk",
    equipo: "Daniel Bravo",
  },
  {
    titulo: "Confía-CO",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/confaco-a-reliability-evaluation-for-an-ai-customerservice-assistant-operating-in-colombian-spanish-vfxt",
    equipo: "Marlon Naranjo",
  },
  {
    titulo: "Assessing responsible AI use in Latin American small businesses",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/herramienta-de-evaluacin-y-recomendacin-para-la-promocin-de-uso-responsable-de-ia-en-pymes-latinoamericanas-1gvb",
    equipo: "Diana Marcela Daza Jaimes, David José Daza Jaimes, Juan Camilo Medina Moreno, Luis Carlos Ordoñez Montenegro and Ángela Pinilla Parra",
  },
  {
    titulo: "Structural jailbreaks in Spanish",
    ciudad: "Cali",
    href: "https://apartresearch.com/project/beyond-english-assessing-the-robustness-of-llm-safety-mechanisms-against-structural-jailbreaks-in-spanish-s4zk",
    equipo: "Jonathan Narvaez",
  },
  {
    titulo: "Guardian LATAM",
    ciudad: "Armenia",
    href: "https://apartresearch.com/project/guardian-latam-early-detection-of-hallucination-risk-in-spanishspeaking-multiagent-ai-systems-using-consensus-geometry-5lzw",
    equipo: "Edwin Hernan Cedeño Vargas",
  },
];

const ENLACE =
  "text-aisc-forest transition-colors hover:text-aisc-coral";

export default function Research() {
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
          src="/aisc/patterns/aisc-hero-investigacion.svg"
        />
        <SiteHeader active="/en/research" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">Research</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              Here is what the people in the community publish: peer-reviewed articles, working papers, research
              reports and the output of our hackathons.
            </p>
          </div>
        </div>
      </section>

      <section id="publicaciones" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Publications from the community</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                The list is open. If you are part of the community and you published something,{" "}
                <a className={ENLACE} href="mailto:contacto@aisafetycolombia.org">
                  write to us
                </a>{" "}
                and we will add it.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-[10px]">
            {PUBLICACIONES.map((p) => (
              <li className="flex" key={p.href}>
                <a
                  className="focus-visible:outline-aisc-forest grid w-full grid-cols-1 gap-6 rounded-lg border border-aisc-ink bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand focus-visible:outline-2 focus-visible:outline-offset-[3px] md:p-7 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10 lg:p-8"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-kicker text-aisc-forest">{p.tipo}</span>
                    <span className="text-meta text-aisc-muted">{p.editor}</span>
                    <span className="text-meta text-aisc-muted">{p.fecha}</span>
                    {PORTADAS[p.href] ? (
                      <img
                        src={PORTADAS[p.href]}
                        alt=""
                        aria-hidden="true"
                        width={900}
                        height={1165}
                        loading="lazy"
                        className="mt-5 hidden w-full max-w-[200px] shadow-[0_10px_30px_-8px_rgba(20,54,32,0.35)] ring-1 ring-aisc-forest-deep/10 lg:block"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-display-3 md:text-display-3-lg text-balance">{p.titulo}</h3>
                    <p className="text-meta mt-3 text-aisc-muted">
                      {p.autores.map((autor, i) => (
                        <span key={autor}>
                          {i > 0 ? ", " : ""}
                          {p.miembros.includes(autor) ? (
                            <strong className="font-semibold text-aisc-forest">{autor}</strong>
                          ) : (
                            autor
                          )}
                        </span>
                      ))}
                    </p>
                    <p className="text-body-sm mt-4 text-aisc-ink">{p.body}</p>
                    <span className="text-display-4 md:text-display-4-lg mt-6 text-aisc-forest transition-colors hover:text-aisc-coral">
                      Read the document
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="hackathons" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-10 md:gap-10 md:pt-7 md:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Hackathon projects</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Community teams in the hackathons run by{" "}
              <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
                Apart Research
              </a>
              , each with a published report and an evaluation by external judges.
            </p>
          </div>

          <a
            className="text-meta text-aisc-muted transition-colors hover:text-aisc-forest"
            href="https://apartresearch.com/sprints/ai-incident-response-sprint-2026-09-11-to-2026-09-13"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Incident Response Sprint · September 2026
          </a>
          <div className="mt-4 mb-12 md:mb-14">
            <PremiadosHackathon premiados={INCIDENTES} />
          </div>

          <a
            className="text-meta text-aisc-muted transition-colors hover:text-aisc-forest"
            href="https://apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21"
            target="_blank"
            rel="noopener noreferrer"
          >
            Global South AI Safety Hackathon · June 2026
          </a>
          <div className="mt-4">
            <PremiadosHackathon premiados={PREMIADOS} />
          </div>

          <details className="mt-6">
            <summary className="font-display inline-block cursor-pointer list-none text-[1.05rem] font-semibold text-aisc-forest transition-colors hover:text-aisc-coral [&::-webkit-details-marker]:hidden">
              See the other {OTROS.length} Colombian projects from this edition
            </summary>
            <ul className="mt-4 grid grid-cols-1 gap-x-10 md:grid-cols-2">
              {OTROS.map((o) => (
                <li key={o.href} className="border-t border-aisc-forest-deep/15">
                  <a
                    className="flex flex-col gap-1 py-3.5 transition-colors hover:text-aisc-forest"
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-body-sm">{o.titulo}</span>
                    <span className="text-meta text-aisc-muted">
                      {o.equipo} · {o.ciudad}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <CtaPanel title="Take part in the next hackathon" body="We open the Bogotá hub for every Apart Research hackathon and announce it first in the WhatsApp group.">
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the WhatsApp group
        </a>
        <Link className={CTA_LINK} href="/en/join">
          See how to join
        </Link>
      </CtaPanel>
      <SiteFooter idioma="en" />
    </main>
  );
}
