import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Investigación",
  description:
    "Lo que publican los miembros de AI Safety Colombia: artículos revisados por pares, documentos de trabajo y reportes de investigación.",
};

/* Publicaciones firmadas por miembros de la comunidad.
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
    body: "Los grupos armados ilegales en Colombia ya atacan con drones comerciales modificados. El equipo armó un conjunto de datos abierto con 42 ataques documentados para responder la pregunta de la que depende cómo se regula esto: quién escoge el blanco y quién aprieta el gatillo.",
    href: "https://apartresearch.com/project/coldron-lj2w",
  },
  {
    titulo: "Identidad colombiana en las representaciones internas de un modelo",
    premio: "Premio de Latinoamérica",
    ciudad: "Cali",
    equipo:
      "Gilber Alexis Corrales Gallego, Pablo Santiago Potes Velasco, Jhoan Stevan Mosquera Ortiz, Nicolás Lozano Mazuera, María del Mar García Matabanchoy y Óscar Julián Pérez Ladino",
    body: "Un modelo puede deducir de quién le escribe cosas que nadie le dijo. El equipo midió si Qwen2.5-7B representa por dentro la identidad colombiana y el estrato social a partir de pistas del habla, y si eso arrastra estereotipos.",
    href: "https://apartresearch.com/project/probing-latent-colombian-identity-inferences-in-qwen257b-with-natural-language-autoencoders-mucf",
  },
  {
    titulo: "Qué pasos del razonamiento producen el sesgo",
    premio: "Premio de Latinoamérica",
    ciudad: "Bogotá",
    equipo: "Andres Felipe Mosquera Hernandez",
    body: "Los modelos que razonan en voz alta dejan un rastro de pasos intermedios. El trabajo identifica cuáles de esos pasos son los que terminan produciendo respuestas estereotipadas en escenarios latinoamericanos, en vez de medir solo el resultado final.",
    href: "https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti",
  },
  {
    titulo: "¿Por qué los agentes obedecen?",
    premio: "Mención de honor",
    ciudad: "Bogotá",
    equipo: "Helen Stefany Penagos y Juan Esteban Leiva",
    body: "Un modelo rechaza una petición dañina en un chat y la cumple cuando opera como agente con herramientas. El equipo midió por dentro qué cambia: el mecanismo interno de rechazo se debilita en formato agéntico.",
    href: "https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70",
  },
  {
    titulo: "JusticIA",
    premio: "Mención de honor",
    ciudad: "Bogotá",
    equipo: "Lina Gomez, Brenda Barahona y Ernesto Duarte",
    body: "Una prueba para justicia transicional colombiana: se le pide a seis modelos una recomendación de sanción y se cambia un solo dato de contexto, la región, el actor armado o el perfil de la víctima, dejando intacto lo jurídicamente relevante. Se mide cuánto cambia la respuesta.",
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

/** cifras que se pueden comprobar una por una en el catálogo público de Apart */
const CIFRAS = [
  { dato: "3", pie: "los tres premios de Latinoamérica fueron para equipos colombianos" },
  { dato: "2", pie: "menciones de honor, de siete en todo el mundo" },
  { dato: "216", pie: "proyectos entregados en todo el hackathon" },
];

const ENLACE =
  "text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";

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
              trabajo y reportes de investigación, cada uno con la institución que lo publicó.
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
                Trabajos firmados por miembros de AI Safety Colombia.
              </p>
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
                    <span className="text-display-4 md:text-display-4-lg mt-6 text-aisc-forest underline underline-offset-4">
                      Leer el documento
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="la-edicion" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <div className="flex flex-col gap-8 md:gap-10">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">Lo que sale de los hackathons</h2>
              <figure className="bg-aisc-forest-deep max-w-[440px] overflow-hidden rounded-[10px]">
                <figcaption className="text-kicker border-aisc-sand/20 border-b px-6 py-4 text-aisc-sand/70">
                  Resultados de nuestro último hackathon, en junio de 2026
                </figcaption>
                <dl className="px-6">
                  {CIFRAS.map((c) => (
                    <div
                      key={c.pie}
                      className="border-aisc-sand/15 flex items-baseline gap-5 border-b py-5 last:border-b-0"
                    >
                      <dt className="text-display-2 md:text-display-2-lg w-[96px] flex-none tabular-nums text-aisc-coral">
                        {c.dato}
                      </dt>
                      <dd className="text-body-sm text-aisc-sand/85">{c.pie}</dd>
                    </div>
                  ))}
                </dl>
              </figure>
            </div>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
                  Apart Research
                </a>{" "}
                convoca estos hackathons a nivel global. Nosotros abrimos el espacio presencial en Bogotá para
                participar desde acá. Es un fin de semana para salir con un trabajo propio: viernes en la noche se
                arman los equipos, domingo en la noche se entrega un reporte, y la semana siguiente lo califican
                jurados de fuera.
              </p>
              <p>
                La mayoría de quienes llegan nunca había trabajado en seguridad de la IA. Salen con un trabajo firmado,
                publicado y con retroalimentación escrita.
              </p>
              <p>
                La última edición fue el{" "}
                <a
                  className={ENLACE}
                  href="https://apartresearch.com/sprints/global-south-ais-hackathon-2026-06-19-to-2026-06-21"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Global South AI Safety Hackathon, del 19 al 21 de junio de 2026
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="premiados" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Los trabajos premiados</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Los jurados eran externos y evaluaron a ciegas los proyectos de toda Latinoamérica. Cada reporte está
              publicado completo en el sitio de Apart.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2">
            {PREMIADOS.map((p) => (
              <li className="flex" key={p.href}>
                <a
                  className="focus-visible:outline-aisc-forest flex w-full flex-col rounded-lg border border-aisc-ink bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand focus-visible:outline-2 focus-visible:outline-offset-[3px] md:p-7 lg:p-8"
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-kicker text-aisc-coral">
                    {p.premio} · {p.ciudad}
                  </span>
                  <h3 className="text-display-3 md:text-display-3-lg mt-4 text-balance">{p.titulo}</h3>
                  <p className="text-body-sm mt-3 text-aisc-ink">{p.body}</p>
                  <p className="text-meta mt-5 text-aisc-muted">{p.equipo}</p>
                  <span className="text-display-4 md:text-display-4-lg mt-7 text-aisc-forest underline underline-offset-4">
                    Leer el reporte
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="otros" className="bg-aisc-cream px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-10 md:gap-10 md:pt-7 md:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Los demás equipos colombianos</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Trece proyectos más de esa misma edición, entre presenciales y remotos.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {OTROS.map((o) => (
              <li key={o.href} className="border-t border-aisc-forest-deep/25 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                <a
                  className="group flex flex-col gap-1 py-4 transition-colors hover:text-aisc-forest"
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-body-sm md:text-body">{o.titulo}</span>
                  <span className="text-meta text-aisc-muted">
                    {o.equipo} · {o.ciudad}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="lo-que-viene" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 md:gap-10 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">La próxima edición</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                Del 11 al 13 de septiembre de 2026 abrimos el espacio en Bogotá para el sprint de{" "}
                <a
                  className={ENLACE}
                  href="https://apartresearch.com/sprints/ai-incident-response-sprint-2026-09-11-to-2026-09-13"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  respuesta a incidentes de IA
                </a>
                . El tema es qué se hace cuando un sistema de IA falla en producción y hay que reaccionar.
              </p>
              <p>
                No hace falta experiencia previa ni saber programar. Los equipos se arman ahí y hay mentoría durante
                todo el fin de semana.
              </p>
              <p>
                <Link className={ENLACE} href="/unete">
                  Acá están las formas de entrar
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        title="Participa en el próximo"
        body="Del 11 al 13 de septiembre es el AI Incident Response Sprint, que convoca Apart Research. Abrimos el espacio en Bogotá y en el grupo de WhatsApp avisamos cuándo abre la inscripción y qué leer antes."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://apartresearch.com/sprints/ai-incident-response-sprint-2026-09-11-to-2026-09-13"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver el hackathon
        </a>
        <a
          className={CTA_LINK}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar al grupo de WhatsApp
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
