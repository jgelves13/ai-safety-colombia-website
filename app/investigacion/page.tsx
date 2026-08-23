import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Investigación | AI Safety Colombia",
  description:
    "Los reportes de los equipos colombianos en el hackathon Global South de Apart Research: tres premios de Latinoamérica, dos menciones de honor y dieciocho equipos en total.",
};

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
    ciudad: "Colombia",
    href: "https://apartresearch.com/project/marco-tico-para-ia-aplicada-a-la-preservacin-lingstica-guna-de-panam-6uxw",
  },
  {
    titulo: "Governance Drift Evaluation Framework",
    ciudad: "Colombia",
    href: "https://apartresearch.com/project/governance-drift-evaluation-framework-gdef-vfzj",
  },
  {
    titulo: "Sistema de dos clasificadores para seguridad en modelos de lenguaje",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/dualclassifier-system-for-llm-security-s491",
  },
  {
    titulo: "Los peajes de los de abajo",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/los-peajes-de-los-de-abajo-i6wx",
  },
  {
    titulo: "Contestabilidad algorítmica en el Estado colombiano",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/contestabilidad-algortmica-en-el-estado-colombiano-un-canal-de-objecin-asistido-por-ia-lbsm",
  },
  {
    titulo: "Comercio agéntico y protección al consumidor",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/agentic-commerce-and-consumer-protection-emerging-risks-and-regulatory-gaps-be7b",
  },
  {
    titulo: "JurisGuard-LATAM",
    ciudad: "Jamundí",
    href: "https://apartresearch.com/project/jurisguardlatam-sadx",
  },
  {
    titulo: "Honest-Code",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/honestcode-8pnk",
  },
  {
    titulo: "Mapeo de herramientas de IA en los call centers colombianos",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/mapeo-de-herramientas-ia-en-contextos-laborales-el-caso-de-los-call-centers-en-colombia-k1kk",
  },
  {
    titulo: "Confía-CO",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/confaco-a-reliability-evaluation-for-an-ai-customerservice-assistant-operating-in-colombian-spanish-vfxt",
  },
  {
    titulo: "Evaluación de uso responsable de IA en pymes latinoamericanas",
    ciudad: "Bogotá",
    href: "https://apartresearch.com/project/herramienta-de-evaluacin-y-recomendacin-para-la-promocin-de-uso-responsable-de-ia-en-pymes-latinoamericanas-1gvb",
  },
  {
    titulo: "Jailbreaks estructurales en español",
    ciudad: "Cali",
    href: "https://apartresearch.com/project/beyond-english-assessing-the-robustness-of-llm-safety-mechanisms-against-structural-jailbreaks-in-spanish-s4zk",
  },
  {
    titulo: "Guardian LATAM",
    ciudad: "Armenia",
    href: "https://apartresearch.com/project/guardian-latam-early-detection-of-hallucination-risk-in-spanishspeaking-multiagent-ai-systems-using-consensus-geometry-5lzw",
  },
];

/** cifras que se pueden comprobar una por una en el catálogo público de Apart */
const CIFRAS = [
  { dato: "18", pie: "equipos con integrantes en Colombia" },
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
          src="/aisc/patterns/aisc-corner-lattice.svg"
        />
        <SiteHeader active="/investigacion" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Lo que sale de acá</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">Investigación</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              Lo que se investiga desde acá sale de los hackathons que organizamos. Un fin de semana, equipos que se
              arman en el momento y un reporte publicado y evaluado al final. Estos son los de la última edición.
            </p>
          </div>
        </div>
      </section>

      <section id="la-edicion" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(400px,0.95fr)] lg:gap-10">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Cómo se produce esto</h2>
            <div className="text-body md:text-body-lg flex flex-col gap-4 text-aisc-ink">
              <p>
                <a className={ENLACE} href="https://apartresearch.com" target="_blank" rel="noopener noreferrer">
                  Apart Research
                </a>{" "}
                convoca estos hackathons a nivel global. Nosotros abrimos el espacio presencial en Bogotá para
                participar desde acá. Viernes en la noche se arman los equipos, domingo en la noche se entrega un
                reporte, y la semana siguiente lo califican jurados de fuera.
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
          <dl className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {CIFRAS.map((c) => (
              <div key={c.pie} className="rounded-[8px] border border-aisc-forest bg-aisc-sand p-6 md:p-7">
                <dt className="text-display-1 md:text-display-1-lg tabular-nums text-aisc-forest">{c.dato}</dt>
                <dd className="text-body-sm mt-3 text-aisc-ink">{c.pie}</dd>
              </div>
            ))}
          </dl>
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
              Trece proyectos más de esa misma edición, entre presenciales y remotos. Algunos hoy están buscando quién
              los continúe.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
            {OTROS.map((o) => (
              <li key={o.href} className="border-t border-aisc-forest-deep/25 first:border-t-0 md:[&:nth-child(2)]:border-t-0">
                <a
                  className="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-aisc-forest"
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-body-sm md:text-body">{o.titulo}</span>
                  <span className="text-meta shrink-0 text-aisc-muted">{o.ciudad}</span>
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
        kicker="Se entra trabajando"
        title="El próximo reporte puede ser tuyo"
        body="La mayoría de quienes ganaron llegaron sin haber leído nada del campo. Entra al grupo o agenda veinte minutos y te contamos cómo prepararte."
      >
        {/* TODO: reemplazar por el enlace permanente del grupo de WhatsApp */}
        <a className={CTA_LINK_PRIMARY} href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer">
          Entrar al grupo de WhatsApp
        </a>
        <a className={CTA_LINK} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar 20 minutos
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
