import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { PORTADAS } from "@/lib/portadas";

export const metadata: Metadata = {
  title: "Investigación",
  description:
    "Lo que publican los miembros de AI Safety Colombia: artículos revisados por pares, documentos de trabajo, reportes de investigación y los productos de nuestras hackathones.",
  alternates: { canonical: "/investigacion", languages: alternativas("/investigacion") },
};

/* Publicaciones en las que alguien de la comunidad aparece como autor.
   `miembros` marca en negrilla a quien es de acá dentro de la lista de autores,
   que se transcribe completa y en el orden en que la publicó el editor. */
const PUBLICACIONES = [
  {
    titulo: "AI Benefit-Sharing Framework: Balancing Access and Safety",
    tipo: "Documento de trabajo",
    editor: "Oxford Martin AI Governance Initiative, Universidad de Oxford",
    fecha: "Diciembre de 2025",
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
    body: "Propone un marco para repartir los beneficios de la IA sin bajar el estándar de seguridad. Se apoya en tres piezas: redistribuir parte de los retornos económicos, compartir tecnología y capacidad técnica, y contener la difusión de capacidades peligrosas. El argumento de fondo es que la gobernanza actual no resuelve quién accede a esos beneficios, y que los países de la mayoría global son los que quedan por fuera.",
    href: "https://aigi.ox.ac.uk/publications/ai-benefit-sharing-framework-balancing-access-and-safety/",
  },
  {
    titulo: "Approximating Human Preferences Using a Multi-Judge Learned System",
    tipo: "Artículo aceptado en taller",
    editor: "arXiv. Aceptado en dos talleres de NeurIPS 2025: Reliable ML from Unreliable Data y Latinx in AI",
    fecha: "Octubre de 2025",
    autores: [
      "Eitán Sprejer",
      "Fernando Avalos",
      "Augusto Bernardi",
      "Jose Pedro Brito de Azevedo Faustino",
      "Jacob Haimes",
      "Narmeen Fatimah Oozeer",
    ],
    miembros: ["Fernando Avalos"],
    body: "Cada vez se usan más modelos de lenguaje como jueces que califican las respuestas de otros modelos. El problema es que califican mal: cambian de criterio según cómo esté redactada la rúbrica, arrastran sesgos y son inestables. El trabajo propone no confiar en un solo juez sino combinar varios, cada uno con su rúbrica, y aprender cuánto pesa cada uno. El sistema resultante deja ver qué juez pesó más en cada decisión, así que se puede revisar por qué calificó como calificó.",
    href: "https://arxiv.org/abs/2510.25884",
  },
  {
    titulo: "La securitización de la inteligencia artificial: un análisis de sus impulsores y sus consecuencias",
    tipo: "Artículo revisado por pares",
    editor: "Revista de Estudios Sociales n.º 93, Universidad de los Andes",
    fecha: "Julio de 2025",
    autores: ["Mónica A. Ulloa Ruiz", "Guillem Bas Graells"],
    miembros: ["Mónica A. Ulloa Ruiz"],
    body: "Estudia qué pasa cuando en Estados Unidos se habla de la inteligencia artificial como un asunto de seguridad nacional. Los autores revisan veinticinco declaraciones públicas de agencias del gobierno, organizaciones técnicas y medios, y encuentran dos maneras de plantear el problema: una habla de amenazas, señala a un adversario concreto y sirve para justificar medidas excepcionales; la otra habla de riesgos y cabe dentro de la regulación de siempre. La conclusión es que la segunda sostiene mejor la cooperación a largo plazo.",
    href: "https://revistas.uniandes.edu.co/index.php/res/article/view/10754",
  },
];

/* Lo premiado. Cada tarjeta enlaza al reporte publico en Apart, que es donde se
   puede comprobar el premio y leer el trabajo completo. */
const PREMIADOS = [
  {
    titulo: "ColDron",
    premio: "Premio de Latinoamérica",
    ciudad: "Bogotá",
    equipo: "Leonardo Párraga, Angie Giraldo y Víctor Gelves",
    body: "Un conjunto de datos abierto con 42 ataques con drones comerciales en Colombia, para saber quién escoge el blanco y quién dispara.",
    href: "https://apartresearch.com/project/coldron-lj2w",
  },
  {
    titulo: "Identidad colombiana en las representaciones internas de un modelo",
    premio: "Premio de Latinoamérica",
    ciudad: "Cali",
    equipo:
      "Gilber Alexis Corrales Gallego, Pablo Santiago Potes Velasco, Jhoan Stevan Mosquera Ortiz, Nicolás Lozano Mazuera, María del Mar García Matabanchoy y Óscar Julián Pérez Ladino",
    body: "Mide si Qwen2.5-7B infiere por dentro la identidad colombiana y el estrato de quien le escribe, y si eso arrastra estereotipos.",
    href: "https://apartresearch.com/project/probing-latent-colombian-identity-inferences-in-qwen257b-with-natural-language-autoencoders-mucf",
  },
  {
    titulo: "Qué pasos del razonamiento producen el sesgo",
    premio: "Premio de Latinoamérica",
    ciudad: "Bogotá",
    equipo: "Andres Felipe Mosquera Hernandez",
    body: "Identifica qué pasos intermedios del razonamiento producen respuestas estereotipadas en escenarios latinoamericanos.",
    href: "https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti",
  },
  {
    titulo: "¿Por qué los agentes obedecen?",
    premio: "Mención de honor",
    ciudad: "Bogotá",
    equipo: "Helen Stefany Penagos y Juan Esteban Leiva",
    body: "Muestra que el mecanismo interno de rechazo de un modelo se debilita cuando opera como agente con herramientas.",
    href: "https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70",
  },
  {
    titulo: "JusticIA",
    premio: "Mención de honor",
    ciudad: "Bogotá",
    equipo: "Lina Gomez, Brenda Barahona y Ernesto Duarte",
    body: "Una prueba para justicia transicional: cambia un solo dato de contexto y mide cuánto se mueve la sanción que recomiendan seis modelos.",
    href: "https://apartresearch.com/project/justicia-a-counterfactual-benchmark-for-auditing-contextual-biases-in-language-models-for-transitional-justice-jjvl",
  },
];

/* El resto de equipos con integrantes en Colombia, en el orden en que aparecen
   en el catalogo publico de Apart. */
const OTROS = [
  {
    titulo: "Marco ético para IA aplicada a la lengua guna de Panamá",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/marco-tico-para-ia-aplicada-a-la-preservacin-lingstica-guna-de-panam-6uxw",
    equipo: "Ana María González Aldana, Kelvin Alvarado y Mariana Zuluaga Abril",
  },
  {
    titulo: "Governance Drift Evaluation Framework",
    ciudad: "Colombia",
    href: "https://apartresearch.com/project/governance-drift-evaluation-framework-gdef-vfzj",
    equipo: "Andrés Mogollón, Juan Manuel Cortes Jimenez, Oscar Poveda, Devesh Sawant y Liliana Isabel Salazar",
  },
  {
    titulo: "Sistema de dos clasificadores para seguridad en modelos de lenguaje",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/dualclassifier-system-for-llm-security-s491",
    equipo: "Nicolás David Galindo, Daniel Libardo Diaz Gonzalez, Juan Jacobo Izquierdo Becerra y David Andrés Ramírez",
  },
  {
    titulo: "Los peajes de los de abajo",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/los-peajes-de-los-de-abajo-i6wx",
    equipo: "Mongui Rogers",
  },
  {
    titulo: "Contestabilidad algorítmica en el Estado colombiano",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/contestabilidad-algortmica-en-el-estado-colombiano-un-canal-de-objecin-asistido-por-ia-lbsm",
    equipo: "Emely Condor y Federico Perez",
  },
  {
    titulo: "Comercio agéntico y protección al consumidor",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/agentic-commerce-and-consumer-protection-emerging-risks-and-regulatory-gaps-be7b",
    equipo: "Francely Carreño, Sofía Botía y Vanessa Reyes",
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
    titulo: "Mapeo de herramientas de IA en los call centers colombianos",
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
    titulo: "Evaluación de uso responsable de IA en pymes latinoamericanas",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/herramienta-de-evaluacin-y-recomendacin-para-la-promocin-de-uso-responsable-de-ia-en-pymes-latinoamericanas-1gvb",
    equipo: "Diana Marcela Daza Jaimes, David José Daza Jaimes, Juan Camilo Medina Moreno, Luis Carlos Ordoñez Montenegro y Ángela Pinilla Parra",
  },
  {
    titulo: "Jailbreaks estructurales en español",
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

export default function Investigacion() {
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
          src="/aisc/patterns/aisc-hero-investigacion.svg"
        />
        <SiteHeader active="/investigacion" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">Investigación</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              Acá está lo que publica la gente de la comunidad: artículos revisados por pares, documentos de
              trabajo, reportes de investigación y los productos de nuestras hackathones.
            </p>
          </div>
        </div>
      </section>

      <section id="publicaciones" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Publicaciones de la comunidad</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                La lista está abierta. Si eres de la comunidad y publicaste algo,{" "}
                <a className={ENLACE} href="mailto:contacto@aisafetycolombia.org">
                  escríbenos
                </a>{" "}
                y lo agregamos.
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
                      Leer el documento
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
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Proyectos de hackathon</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Equipos de la comunidad en los hackathons de{" "}
              <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
                Apart Research
              </a>
              , con el reporte publicado y la evaluación de jurados externos.
            </p>
          </div>

          <a
            className="text-meta text-aisc-muted transition-colors hover:text-aisc-forest"
            href="https://apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21"
            target="_blank"
            rel="noopener noreferrer"
          >
            Global South AI Safety Hackathon · junio de 2026
          </a>
          <ul className="mt-3 border-t border-aisc-forest-deep/15">
            {PREMIADOS.map((p) => (
              <li key={p.href} className="border-b border-aisc-forest-deep/15">
                <a
                  className="group grid grid-cols-1 gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,220px)] md:gap-10"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <h3 className="font-display text-[1.15rem] leading-snug font-semibold text-balance text-aisc-ink transition-colors group-hover:text-aisc-forest">
                      {p.titulo}
                    </h3>
                    <p className="text-body-sm mt-1.5 max-w-[68ch] text-aisc-ink">{p.body}</p>
                    <p className="text-meta mt-2 text-aisc-muted">
                      {p.equipo} · {p.ciudad}
                    </p>
                  </div>
                  <span className="text-kicker order-first text-aisc-coral md:order-none md:pt-1.5 md:text-right">
                    {p.premio}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <details className="mt-6">
            <summary className="font-display inline-block cursor-pointer list-none text-[1.05rem] font-semibold text-aisc-forest transition-colors hover:text-aisc-coral [&::-webkit-details-marker]:hidden">
              Ver los otros {OTROS.length} proyectos colombianos de esta edición
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

      <CtaPanel title="Participa en el próximo hackathon" body="Abrimos el hub en Bogotá para cada hackathon de Apart Research y lo anunciamos primero en el grupo de WhatsApp.">
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar al grupo de WhatsApp
        </a>
        <Link className={CTA_LINK} href="/unete">
          Ver cómo unirte
        </Link>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
