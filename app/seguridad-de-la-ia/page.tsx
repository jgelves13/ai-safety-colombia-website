import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Qué es la seguridad de la IA | AI Safety Colombia",
  description:
    "Qué pasó en los últimos tres años, por qué se volvió un problema de seguridad, qué tan de acuerdo está el campo y qué se está haciendo. Con las fuentes a la vista.",
};

/** enlace de fuente en linea: siempre apunta al documento primario, nunca a un resumen */
function Fuente({ href, children }: { href: string; children: React.ReactNode }) {
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

/* Tres cifras verificadas en fuente primaria. Si alguna cambia, se cambia aca y en el
   texto que la acompana, no en uno solo de los dos lugares. */
const CIFRAS = [
  {
    valor: "8 meses",
    label:
      "Lo que tarda en reducirse a la mitad el cómputo necesario para alcanzar un nivel dado de desempeño, según 231 modelos de lenguaje analizados por Epoch AI.",
  },
  {
    valor: "38-51 %",
    label:
      "De 2.778 investigadores de IA encuestados en 2023 le dan al menos 10 % de probabilidad a que la IA avanzada lleve a resultados tan malos como la extinción humana.",
  },
  {
    valor: "1.100",
    label:
      "Personas en el mundo trabajando de tiempo completo en reducir esos riesgos, contra unas 400 en 2022.",
  },
];

/** recursos externos reales para empezar, con su idioma marcado */
const RECURSOS = [
  {
    title: "Curso de fundamentos de BlueDot",
    meta: "BlueDot Impact · inglés · gratuito",
    body: "El punto de entrada más usado del campo. Cinco semanas de lecturas y discusión, con versiones técnicas y de gobernanza.",
    href: "https://bluedot.org",
  },
  {
    title: "El perfil del problema de 80,000 Hours",
    meta: "80,000 Hours · inglés · lectura larga",
    body: "La versión extensa de casi todo lo que está en esta página, con los contraargumentos desarrollados y la bibliografía completa.",
    href: "https://80000hours.org/problem-profiles/artificial-intelligence/",
  },
  {
    title: "AI Safety Info",
    meta: "Comunidad · inglés · preguntas sueltas",
    body: "Respuestas cortas a las preguntas que casi todo el mundo se hace al principio, sin necesidad de leer nada de corrido.",
    href: "https://aisafety.info",
  },
];

/** las tres formas de trabajar en el problema, sin que ninguna pese mas que las otras */
const FRENTES = [
  {
    title: "Alineación e interpretabilidad",
    body: "Cómo lograr que un sistema persiga lo que se le pidió y no algo parecido, y cómo mirar por dentro para saber qué está haciendo en realidad. Es el corazón técnico del campo y sigue sin resolverse.",
  },
  {
    title: "Evaluación y control",
    body: "Cómo medir de qué es capaz un modelo antes de soltarlo y cómo mantenerlo bajo supervisión cuando ya actúa por su cuenta. Es lo más cercano a un peritaje técnico, y hoy hace falta gente que lo sepa hacer.",
  },
  {
    title: "Gobernanza y política pública",
    body: "Qué se le exige a quien despliega un sistema, con qué evidencia y ante quién responde. En Colombia esto se está definiendo ahora, en compras públicas y en regulación sectorial.",
  },
];

const SECTION_HEAD =
  "grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6";
const PROSA = "text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink";

export default function SeguridadDeLaIA() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/seguridad-de-la-ia" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Empezar por aquí</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              Qué es la seguridad de la IA
            </h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Sin jerga y sin dramatismo, pero también sin suavizar lo que dice la evidencia. Todas las cifras de esta
              página están enlazadas a su fuente.
            </p>
          </div>
        </div>
      </section>

      <section id="punto-de-partida" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className={SECTION_HEAD}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">El punto de partida</h2>
            <div className={PROSA}>
              <p>
                La inteligencia artificial no es una tecnología más. Los sistemas actuales aprenden de ejemplos en vez
                de seguir instrucciones, y por eso ni quienes los construyen pueden decir con precisión qué van a hacer
                en una situación nueva.
              </p>
              <p>
                La seguridad de la IA es el campo que trabaja para que esos sistemas sean confiables antes de que las
                apuestas sean altas: entender por dentro cómo funcionan, lograr que persigan lo que de verdad queremos,
                mantenerlos bajo supervisión aunque nos superen en su tarea y construir las instituciones que respondan
                cuando algo sale mal. Es un campo técnico con una pata de política pública, no una postura a favor o en
                contra de la tecnología.
              </p>
              <p>
                Nada de esto es futurología. Los sistemas que hoy filtran hojas de vida, asignan crédito o priorizan
                atención en salud ya toman decisiones sobre personas. Los que vienen actuarán con más autonomía y sobre
                más cosas, y ninguno de estos problemas se resuelve solo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="que-cambio" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className={SECTION_HEAD}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Qué cambió en los últimos años</h2>
            <div className={PROSA}>
              <p>
                Durante décadas esta discusión fue filosofía. Dejó de serlo cuando los sistemas empezaron a pasar
                exámenes diseñados justamente para que no pudieran pasarlos.
              </p>
              <p>
                GPQA es un conjunto de preguntas escritas por doctorandos para que fueran difíciles incluso con Google
                al lado. Quienes tienen doctorado en el área aciertan el 65 %; personas capaces con internet libre y más
                de media hora por pregunta se quedan en 34 %. Cuando la prueba se publicó, a finales de 2023, el mejor
                sistema disponible sacaba 39 %{" "}
                <Fuente href="https://arxiv.org/abs/2311.12022">(Rein et al., 2023)</Fuente>. Dos años después varios
                modelos superan la marca de los expertos.
              </p>
              <p>
                Al mismo tiempo, alcanzar un nivel dado de desempeño se vuelve cada vez más barato. Analizando 231
                modelos de lenguaje publicados en una década, Epoch AI estimó que el cómputo necesario se reduce a la
                mitad aproximadamente cada ocho meses, con un intervalo de confianza del 95 % entre cinco y catorce
                meses{" "}
                <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">(Epoch AI, 2024)</Fuente>.
                Eso es más rápido que el ritmo al que históricamente mejoró el hardware.
              </p>
              <p>
                Ninguna de las dos cosas es un pronóstico. Son mediciones de lo que ya ocurrió. La pregunta abierta es
                cuánto más sigue esa curva, y ahí sí nadie tiene certeza.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px] pb-16 sm:grid-cols-3 md:pb-20">
            {CIFRAS.map((cifra) => (
              <article
                key={cifra.valor}
                className="flex min-h-[170px] flex-col justify-between gap-6 overflow-hidden rounded-lg border border-aisc-ink bg-aisc-cream p-6 text-aisc-ink md:min-h-[200px] md:p-8"
              >
                <p className="text-display-2 md:text-display-2-lg tabular-nums text-aisc-forest">{cifra.valor}</p>
                <p className="text-body-sm text-aisc-ink">{cifra.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="por-que-seguridad" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className={SECTION_HEAD}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">
              Por qué eso lo convierte en un problema de seguridad
            </h2>
            <div className={PROSA}>
              <p>
                Que un sistema sea más capaz no lo vuelve peligroso por sí solo. El problema es que la capacidad y el
                control no avanzan al mismo ritmo, y hay tres razones concretas de por qué.
              </p>
              <p>
                <strong className="font-semibold">Estos sistemas se entrenan, no se programan.</strong> Nadie escribe
                las reglas que sigue un modelo: se define un objetivo de entrenamiento y el sistema encuentra por su
                cuenta cómo cumplirlo. Optimizar la medida no es lo mismo que cumplir la intención, y hoy la
                interpretabilidad todavía no permite abrir un modelo y verificar qué está persiguiendo en realidad.
              </p>
              <p>
                <strong className="font-semibold">Cada vez actúan más y responden menos.</strong> La frontera del campo
                ya no son modelos que contestan preguntas, sino agentes que escriben y ejecutan código, usan
                herramientas y operan durante horas sin que nadie revise cada paso. Cuando un sistema actúa, un error
                deja de ser una respuesta equivocada y pasa a ser algo que ya sucedió.
              </p>
              <p>
                <strong className="font-semibold">La investigación se acelera a sí misma.</strong> Buena parte del
                trabajo de construir IA es programar, experimentar y analizar resultados, exactamente lo que estos
                sistemas hacen mejor cada año. Si esa retroalimentación se sostiene, el margen para detectar y corregir
                errores se estrecha justo cuando más falta hace.
              </p>
              <p>
                Hay razones serias para dudar de este último punto, y vale la pena decirlas: el cómputo, la energía y
                los datos son cuellos de botella reales; la investigación en el mundo físico no se acelera solo con más
                código; y el rendimiento de invertir más esfuerzo en investigación suele ser decreciente. Si esos frenos
                pesan más, lo que viene es un salto grande de productividad y no una espiral. Ese escenario también
                exige que alguien sepa evaluar y auditar estos sistemas, solo que con más tiempo para hacerlo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="desacuerdo" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className={SECTION_HEAD}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Qué tan de acuerdo está el campo</h2>
            <div className={PROSA}>
              <p>
                Poco, y decir lo contrario sería falso. Lo interesante es dónde está el desacuerdo, porque no es donde
                la mayoría de la gente supone.
              </p>
              <p>
                En 2023 se encuestó a 2.778 investigadores que publican en las principales conferencias de IA. Entre 38
                % y 51 % le dio al menos 10 % de probabilidad a que la IA avanzada lleve a resultados tan malos como la
                extinción humana. Incluso entre quienes consideraban más probable un buen resultado, casi la mitad
                seguía asignando 5 % o más a un desenlace extremadamente malo{" "}
                <Fuente href="https://arxiv.org/abs/2401.02843">(Grace et al., 2024)</Fuente>.
              </p>
              <p>
                Otros grupos calibrados llegan a números mucho más bajos. En un torneo de pronóstico organizado por el
                Forecasting Research Institute, los expertos en riesgos de IA estimaron un 3 % de probabilidad de
                extinción causada por IA para 2100, mientras que los superpronosticadores, seleccionados por su historial
                de acertar, estimaron 0,38 %{" "}
                <Fuente href="https://forecastingresearch.org/xpt">(Forecasting Research Institute, 2023)</Fuente>. Es
                casi un orden de magnitud de diferencia entre personas que se dedican profesionalmente a estimar bien.
              </p>
              <p>
                Y hay desacuerdo de fondo, no solo de números. Yann LeCun, uno de los tres ganadores del premio Turing
                por el aprendizaje profundo, sostiene que estas preocupaciones están mal planteadas y que los sistemas
                actuales no van en la dirección que el argumento supone.
              </p>
              <p>
                La conclusión razonable no es que vaya a pasar lo peor. Es que un campo entero de gente que sabe del tema
                no logra descartarlo, lleva veinte años sin resolver el problema técnico de fondo y no se pone de acuerdo
                ni en el orden de magnitud. Eso basta para justificar que haya gente trabajando en ello, y sobra para
                justificar que se exija evidencia antes de desplegar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="frentes" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 flex flex-col gap-14 pb-16 md:gap-16 md:pb-20 lg:gap-20">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 md:gap-10 md:pt-7 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Cómo se trabaja en esto</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Tres frentes que se necesitan entre sí. Se puede entrar por cualquiera de ellos, y no todos exigen
              formación técnica previa.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {FRENTES.map((frente) => (
              <article
                key={frente.title}
                className="overflow-hidden rounded-lg bg-aisc-cream border border-aisc-ink flex flex-col p-6 text-aisc-ink md:min-h-[270px] md:p-7 lg:min-h-[310px] lg:p-8 xl:min-h-[335px]"
              >
                <span aria-hidden="true" className="mb-5 block h-px w-10 flex-none bg-aisc-coral" />
                <div className="flex max-w-[420px] min-w-0 flex-col gap-3">
                  <h3 className="text-display-3 md:text-display-3-lg break-words text-balance">{frente.title}</h3>
                  <p className="text-body-sm text-aisc-ink">{frente.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="desde-colombia" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className={SECTION_HEAD}>
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Y por qué desde Colombia</h2>
            <div className={PROSA}>
              <p>
                Porque el campo es diminuto. Una estimación de 2025 cuenta cerca de 1.100 personas trabajando de tiempo
                completo en seguridad de la IA en todo el mundo, unas 600 en trabajo técnico y 500 en gobernanza y
                estrategia, frente a unas 400 tres años antes{" "}
                <Fuente href="https://forum.effectivealtruism.org/posts/nH8SnriBBhehsuvvo/ai-safety-field-growth-analysis-2025">
                  (AI Safety Field Growth Analysis, 2025)
                </Fuente>
                . Crece rápido, pero sigue siendo menos gente de la que trabaja en un solo ministerio.
              </p>
              <p>
                Casi nadie de esas 1.100 personas está en América Latina. No es una queja: es que las reglas se están
                escribiendo ahora, en compras públicas, en regulación sectorial y en acuerdos internacionales, y se
                escriben con o sin nosotros. Las decisiones que se tomen sobre qué se le exige a un sistema antes de
                usarlo en salud, en crédito o en justicia van a aplicarse acá igual.
              </p>
              <p>
                Y hay una razón práctica. Colombia compra estos sistemas más de lo que los construye, y auditar lo que
                uno compra es un problema distinto al de auditar lo que uno entrena. Ese problema no lo va a resolver
                nadie desde afuera, entre otras cosas porque casi nadie afuera lo está mirando.
              </p>
              <p>
                Nada de esto requiere heroísmo. Requiere que haya gente acá que entienda el tema lo suficiente para
                hacer buenas preguntas, y que exista un lugar donde aprenderlo sin tener que irse del país.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos" className="bg-aisc-cream px-6 pt-2 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-14 md:gap-10 md:pt-7 md:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6 lg:pb-20">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">Por dónde seguir</h2>
            <p className="text-body md:text-body-lg text-aisc-ink">
              Tres recursos que recomendamos a quien apenas está entrando. Buena parte del material del campo está en
              inglés; en nuestros programas lo trabajamos en español.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
            {RECURSOS.map((recurso) => (
              <a
                key={recurso.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-aisc-forest block min-h-[120px] min-w-0 rounded-[8px] border bg-aisc-sand p-6 transition-colors hover:bg-aisc-cream md:p-8 lg:p-10"
                href={recurso.href}
              >
                <div className="min-w-0">
                  <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest transition-colors group-hover:text-aisc-forest-deep">
                    {recurso.title}
                  </h3>
                  <p className="text-meta md:text-meta-lg mt-3 text-aisc-ink">{recurso.meta}</p>
                  <p className="text-body-sm mt-2 max-w-[1080px] text-aisc-ink">{recurso.body}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        title="¿Y qué hago con esto?"
        body="Lo más útil que puedes hacer al principio es hablar con alguien que ya lleve un tiempo. Después vienen los programas."
      >
        <Link className={CTA_LINK_PRIMARY} href="/programas">
          Ver los programas
        </Link>
        <a className={CTA_LINK} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar 20 minutos
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
