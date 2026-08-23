import type { Metadata } from "next";
import Link from "next/link";
import { Figura, GraficaEstimaciones, GraficaGpqa, GraficaHorizonte } from "@/components/charts";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Qué es la seguridad de la IA | AI Safety Colombia",
  description:
    "Qué cambió en los últimos tres años, por qué eso lo convierte en un problema de seguridad, qué tan de acuerdo está el campo y qué se puede hacer. Con las mediciones a la vista.",
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

/* Ancho de lectura: una sola columna. La prosa se queda en 720px y las figuras
   salen a 980px. Nada de titulo a la izquierda y texto a la derecha. */
const COL = "mx-auto w-full max-w-[720px]";
const ANCHO = "mx-auto w-full max-w-[980px] px-6 md:px-8";
const P = "text-body md:text-body-lg text-aisc-ink";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className={`${COL} scroll-mt-24 pt-14 md:pt-16`} id={id}>
      <span aria-hidden="true" className="mb-6 block h-px w-12 flex-none bg-aisc-coral" />
      <h2 className="text-display-2 md:text-display-2-lg text-balance">{children}</h2>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className={`${COL} text-display-4 md:text-display-4-lg mt-10 mb-3 text-aisc-forest`}>{children}</h3>;
}

function Parrafo({ children }: { children: React.ReactNode }) {
  return <p className={`${COL} ${P} mt-5`}>{children}</p>;
}

const INDICE = [
  { id: "resumen", label: "En resumen" },
  { id: "que-cambio", label: "Qué cambió en tres años" },
  { id: "por-que", label: "Por qué es un problema de seguridad" },
  { id: "desacuerdo", label: "Qué tan de acuerdo está el campo" },
  { id: "objeciones", label: "Objeciones y respuestas" },
  { id: "frentes", label: "Cómo se trabaja en esto" },
  { id: "colombia", label: "Y por qué desde Colombia" },
  { id: "recursos", label: "Por dónde seguir" },
];

const RESUMEN = [
  "En marzo de 2023 el mejor sistema público respondía bien una de cada tres preguntas de un examen escrito para que ni un doctor del área lo resolviera con Google al lado. Hoy responde bien nueve de cada diez.",
  "El problema no es que sean capaces. Es que se entrenan en vez de programarse, así que nadie puede abrir uno y verificar qué está persiguiendo, y cada vez actúan más y responden menos.",
  "El campo no está de acuerdo: entre los pronósticos serios hay casi un orden de magnitud de diferencia. Ese desacuerdo es el argumento, no un detalle.",
  "Hay unas 1.100 personas en el mundo trabajando de tiempo completo en esto. Casi ninguna en América Latina, donde las reglas se están escribiendo igual.",
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
    body: "La versión extensa de casi todo lo que está acá, con los contraargumentos desarrollados y la bibliografía completa.",
    href: "https://80000hours.org/problem-profiles/artificial-intelligence/",
  },
  {
    title: "AI Safety Info",
    meta: "Comunidad · inglés · preguntas sueltas",
    body: "Respuestas cortas a las preguntas que casi todo el mundo se hace al principio, sin necesidad de leer nada de corrido.",
    href: "https://aisafety.info",
  },
];

export default function SeguridadDeLaIA() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/seguridad-de-la-ia" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[820px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Empezar por aquí</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              Qué es la seguridad de la IA
            </h1>
            <p className="text-body md:text-body-lg max-w-[700px] text-aisc-sand/90">
              En 2023 se publicó un examen de preguntas de doctorado diseñado para que ningún sistema pudiera
              aprobarlo, ni siquiera con internet abierto. El mejor de ese año sacó 39 %. Dos años después la marca
              está en 94,8 %, por encima de los doctores que sirvieron de referencia. Este texto trata de por qué eso
              es un problema y no solo una buena noticia.
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · actualizado en agosto de 2026 · unos 12 minutos de lectura
            </p>
          </div>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        {/* En resumen: lo que se lleva quien no siga leyendo */}
        <div className={`${ANCHO} pt-14 md:pt-16`}>
          <div className={`${COL} scroll-mt-24`} id="resumen">
            <div className="rounded-lg border border-aisc-ink bg-aisc-sand p-6 md:p-8">
              <span className="text-kicker text-aisc-coral">En resumen</span>
              <ul className="mt-5 flex flex-col gap-4">
                {RESUMEN.map((linea) => (
                  <li key={linea} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-4 flex-none bg-aisc-forest" />
                    <span className="text-body-sm md:text-body text-aisc-ink">{linea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* En esta pagina */}
          <nav aria-label="Contenido de la página" className={`${COL} mt-10`}>
            <p className="text-kicker text-aisc-muted">En esta página</p>
            <ol className="text-body-sm mt-4 flex flex-col gap-2 text-aisc-ink">
              {INDICE.map((item, i) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-meta tabular-nums text-aisc-muted">{String(i + 1).padStart(2, "0")}</span>
                  <a
                    href={`#${item.id}`}
                    className="underline decoration-aisc-ink/25 underline-offset-4 transition-colors hover:decoration-aisc-forest hover:text-aisc-forest"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1 ---------------------------------------------------------- */}
          <H2 id="que-cambio">Qué cambió en tres años</H2>
          <Parrafo>
            Durante décadas esta discusión fue filosofía. Dejó de serlo cuando los sistemas empezaron a pasar exámenes
            diseñados justamente para que no pudieran pasarlos.
          </Parrafo>
          <Parrafo>
            GPQA es un conjunto de preguntas de biología, física y química escritas por doctorandos con una regla
            explícita: que fueran difíciles incluso con Google al lado. En el subconjunto más duro, doctores del área
            reclutados para calibrarlo acertaron el 69,7 %. Personas capaces con internet libre y más de media hora por
            pregunta se quedaron en 34 %, y responder al azar da 25 %{" "}
            <Fuente href="https://arxiv.org/abs/2311.12022">(Rein et al., 2023)</Fuente>. La prueba se publicó a
            finales de 2023. En diciembre de 2024 un modelo pasó la marca de los doctores; hoy la frontera está veinte
            puntos por encima.
          </Parrafo>

          <Figura
            numero={1}
            titulo="Un examen que se diseñó para ser imposible, resuelto en veinte meses"
            pie="Cada punto es el mejor resultado publicado hasta esa fecha en GPQA Diamond, 198 preguntas de nivel doctoral. La línea punteada es el desempeño de doctores del área."
            fuente="Epoch AI, «AI Benchmarking Hub» (CC BY)"
            href="https://epoch.ai/data/ai-benchmarking-dashboard"
          >
            <GraficaGpqa />
          </Figura>

          <Parrafo>
            Al mismo tiempo, alcanzar un nivel dado de desempeño se vuelve cada vez más barato. Analizando 231 modelos
            de lenguaje publicados en una década, Epoch AI estimó que el cómputo necesario se reduce a la mitad
            aproximadamente cada ocho meses, con un intervalo de confianza del 95 % entre cinco y catorce meses{" "}
            <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">(Epoch AI, 2024)</Fuente>. Eso
            es más rápido que el ritmo al que históricamente mejoró el hardware.
          </Parrafo>
          <Parrafo>
            Ninguna de las dos cosas es un pronóstico. Son mediciones de lo que ya ocurrió. La pregunta abierta es
            cuánto más sigue la curva, y ahí sí nadie tiene certeza.
          </Parrafo>

          {/* 2 ---------------------------------------------------------- */}
          <H2 id="por-que">Por qué eso lo convierte en un problema de seguridad</H2>
          <Parrafo>
            Que un sistema sea más capaz no lo vuelve peligroso por sí solo. El problema es que la capacidad y el
            control no avanzan al mismo ritmo. Hay tres razones concretas.
          </Parrafo>

          <H3>1. Estos sistemas se entrenan, no se programan</H3>
          <Parrafo>
            Nadie escribe las reglas que sigue un modelo. Se define un objetivo de entrenamiento y el sistema encuentra
            por su cuenta cómo cumplirlo, ajustando miles de millones de parámetros que nadie eligió uno por uno.
            Optimizar la medida no es lo mismo que cumplir la intención, y la interpretabilidad todavía no permite
            abrir un modelo y verificar qué está persiguiendo en realidad.
          </Parrafo>
          <Parrafo>
            Esto no es teórico: ya se documentan modelos que aprenden a decir lo que el evaluador quiere oír, que
            aprovechan errores del sistema de puntuación en vez de resolver la tarea, o que se comportan distinto
            cuando detectan que están siendo evaluados. Son fallas de medición, no de capacidad, y son exactamente las
            que no se arreglan haciendo el modelo más inteligente.
          </Parrafo>

          <H3>2. Cada vez actúan más y responden menos</H3>
          <Parrafo>
            La frontera del campo ya no son modelos que contestan preguntas, sino agentes que escriben y ejecutan
            código, usan herramientas y operan durante horas sin que nadie revise cada paso. METR mide esto de forma
            directa: qué tan largas pueden ser las tareas que un modelo completa con 50 % de éxito, medidas en el
            tiempo que le tomarían a un profesional humano.
          </Parrafo>

          <Figura
            numero={2}
            titulo="De cinco minutos a una jornada de trabajo"
            pie="Duración de la tarea más larga que el mejor modelo de cada momento completa con 50 % de éxito. El eje vertical es logarítmico: cada línea vale cuatro veces la anterior."
            fuente="METR, «Measuring AI Ability to Complete Long Tasks», vía Epoch AI (CC BY)"
            href="https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/"
          >
            <GraficaHorizonte />
          </Figura>

          <Parrafo>
            METR estimó que esa duración se duplica cada siete meses aproximadamente. Los datos de los últimos dos años
            van, si acaso, más rápido que esa recta. La cifra importa menos que lo que implica: cuando un sistema
            actúa, un error deja de ser una respuesta equivocada y pasa a ser algo que ya sucedió. Y cuanto más larga
            es la cadena de acciones, menos viable es que alguien la supervise paso a paso.
          </Parrafo>

          <H3>3. La investigación se acelera a sí misma</H3>
          <Parrafo>
            Buena parte del trabajo de construir IA es programar, correr experimentos y analizar resultados, que es
            exactamente lo que estos sistemas hacen mejor cada año. Si esa retroalimentación se sostiene, el margen
            para detectar y corregir errores se estrecha justo cuando más falta hace. Este es el punto más debatido de
            los tres, y volvemos sobre él más abajo.
          </Parrafo>

          {/* 3 ---------------------------------------------------------- */}
          <H2 id="desacuerdo">Qué tan de acuerdo está el campo</H2>
          <Parrafo>
            Poco, y decir lo contrario sería falso. Lo interesante es dónde está el desacuerdo, porque no es donde la
            mayoría de la gente supone: casi nadie discute que el problema técnico siga sin resolverse. Lo que se
            discute es qué tan grave es y qué tan cerca está.
          </Parrafo>
          <Parrafo>
            En 2023 se encuestó a 2.778 investigadores que publican en las principales conferencias de IA. La mediana
            asignó 5 % de probabilidad a que la IA avanzada lleve a la extinción o a una pérdida severa de control
            humano; el promedio fue 16,2 %{" "}
            <Fuente href="https://arxiv.org/abs/2401.02843">(Grace et al., 2024)</Fuente>. Otros grupos calibrados
            llegan a números mucho más bajos: en un torneo de pronóstico del Forecasting Research Institute, los
            expertos en riesgos de IA estimaron 3 % para 2100 y los superpronosticadores, seleccionados por su
            historial de acertar, estimaron 0,38 %{" "}
            <Fuente href="https://forecastingresearch.org/xpt">(Forecasting Research Institute, 2023)</Fuente>.
          </Parrafo>

          <Figura
            numero={3}
            titulo="Casi un orden de magnitud entre gente que se dedica a estimar bien"
            pie="Probabilidad de extinción o pérdida severa de control causada por IA. Eje logarítmico. Las preguntas no son idénticas entre estudios, así que las cifras se comparan con cuidado."
            fuente="Grace et al. (2024) y Forecasting Research Institute (2023)"
            href="https://arxiv.org/abs/2401.02843"
          >
            <GraficaEstimaciones />
          </Figura>

          <Parrafo>
            Los agregados esconden algo más incómodo: entre 38 % y 51 % de esos investigadores le dieron al menos 10 %
            de probabilidad a resultados tan malos como la extinción humana. Incluso entre quienes consideraban más
            probable un buen desenlace, casi la mitad seguía asignando 5 % o más al peor. No es una minoría alarmista
            contra un campo tranquilo. Es un campo que no logra descartarlo.
          </Parrafo>
          <Parrafo>
            Y hay desacuerdo de fondo, no solo de números. Yann LeCun, uno de los tres ganadores del premio Turing por
            el aprendizaje profundo, sostiene que estas preocupaciones están mal planteadas y que los sistemas actuales
            no van en la dirección que el argumento supone. Vale la pena leerlo antes de decidir qué se piensa.
          </Parrafo>
          <Parrafo>
            La conclusión razonable no es que vaya a pasar lo peor. Es que gente que sabe del tema lleva veinte años
            sin resolver el problema técnico de fondo y no se pone de acuerdo ni en el orden de magnitud del riesgo.
            Eso basta para justificar que haya gente trabajando en ello, y sobra para justificar que se exija evidencia
            antes de desplegar.
          </Parrafo>

          {/* 4 ---------------------------------------------------------- */}
          <H2 id="objeciones">Objeciones y respuestas</H2>
          <Parrafo>
            Estas son las cuatro que más se escuchan. Ninguna es tonta y ninguna se responde sola.
          </Parrafo>

          <H3>«Estos modelos todavía fallan en cosas obvias»</H3>
          <Parrafo>
            Cierto, y va a seguir siendo cierto un tiempo. Las capacidades no crecen parejo: un sistema que resuelve
            una pregunta de doctorado puede equivocarse contando letras. Pero eso es un argumento a favor, no en
            contra. Un sistema que falla de forma impredecible es precisamente uno que nadie puede certificar antes de
            usarlo. El riesgo no viene de que sean uniformemente brillantes, sino de que sean muy capaces en algunas
            cosas y frágiles en otras, sin que se sepa de antemano cuáles.
          </Parrafo>

          <H3>«Esto distrae de los daños que ya existen»</H3>
          <Parrafo>
            Sesgo en decisiones de crédito, vigilancia, desinformación, efectos sobre el empleo. Son problemas reales y
            presentes, y a veces compiten de verdad por atención y presupuesto. Pero en la práctica buena parte de la
            agenda es la misma: saber medir de qué es capaz un sistema, poder auditarlo, exigir evidencia antes de
            desplegarlo y tener a quién reclamarle cuando falla. Quien construye esa capacidad institucional para el
            daño de hoy la tiene también para el de mañana. Nosotros trabajamos en las dos.
          </Parrafo>

          <H3>«El progreso se va a estancar»</H3>
          <Parrafo>
            Puede pasar, y hay razones serias para pensarlo: el cómputo, la energía y los datos son cuellos de botella
            reales; la investigación en el mundo físico no se acelera solo con más código; y meterle más esfuerzo a la
            investigación suele tener rendimientos decrecientes. En contra juega que el progreso algorítmico ha
            abaratado el desempeño más rápido que el hardware, lo que sugiere que no todo depende de construir centros
            de datos más grandes. Si los frenos ganan, lo que viene es un salto grande de productividad y no una
            espiral, y ese escenario también exige que alguien sepa evaluar estos sistemas. Solo que con más tiempo
            para aprender a hacerlo.
          </Parrafo>

          <H3>«Nadie va a desplegar algo peligroso a propósito»</H3>
          <Parrafo>
            El argumento no necesita que nadie sea malintencionado. Necesita apenas dos cosas que ya se cumplen: que
            sea difícil verificar qué hace un sistema antes de soltarlo, y que haya presión competitiva para soltarlo
            igual. Los incidentes de software no suelen ocurrir porque alguien quisiera causarlos, sino porque el
            sistema hizo algo que nadie previó y nadie estaba mirando en ese momento.
          </Parrafo>

          {/* 5 ---------------------------------------------------------- */}
          <H2 id="frentes">Cómo se trabaja en esto</H2>
          <Parrafo>
            Tres frentes que se necesitan entre sí. Se puede entrar por cualquiera de ellos, y no todos exigen
            formación técnica previa.
          </Parrafo>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[1448px] px-6 md:px-8">
          <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-3">
            {FRENTES.map((frente) => (
              <article
                key={frente.title}
                className="overflow-hidden rounded-lg bg-aisc-cream border border-aisc-ink flex flex-col p-6 text-aisc-ink md:min-h-[270px] md:p-7 lg:min-h-[300px] lg:p-8"
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

        <div className={ANCHO}>
          {/* 6 ---------------------------------------------------------- */}
          <H2 id="colombia">Y por qué desde Colombia</H2>
          <Parrafo>
            Porque el campo es diminuto. Una estimación de 2025 cuenta cerca de 1.100 personas trabajando de tiempo
            completo en seguridad de la IA en todo el mundo, unas 600 en trabajo técnico y 500 en gobernanza y
            estrategia, frente a unas 400 tres años antes{" "}
            <Fuente href="https://forum.effectivealtruism.org/posts/nH8SnriBBhehsuvvo/ai-safety-field-growth-analysis-2025">
              (AI Safety Field Growth Analysis, 2025)
            </Fuente>
            . Crece rápido, pero sigue siendo menos gente de la que trabaja en un solo ministerio.
          </Parrafo>
          <Parrafo>
            Casi nadie de esas 1.100 personas está en América Latina. No es una queja: es que las reglas se están
            escribiendo ahora, en compras públicas, en regulación sectorial y en acuerdos internacionales, y se
            escriben con o sin nosotros. Lo que se decida sobre qué se le exige a un sistema antes de usarlo en salud,
            en crédito o en justicia va a aplicarse acá igual.
          </Parrafo>
          <Parrafo>
            Y hay una razón práctica. Colombia compra estos sistemas más de lo que los construye, y auditar lo que uno
            compra es un problema distinto al de auditar lo que uno entrena: sin acceso a los pesos, sin los datos de
            entrenamiento y con un contrato de por medio. Ese problema no lo va a resolver nadie desde afuera, entre
            otras cosas porque casi nadie afuera lo está mirando.
          </Parrafo>
          <Parrafo>
            Nada de esto requiere heroísmo. Requiere que haya gente acá que entienda el tema lo suficiente para hacer
            buenas preguntas, y que exista un lugar donde aprenderlo sin tener que irse del país.
          </Parrafo>
        </div>
      </article>

      <section id="recursos" className="bg-aisc-cream scroll-mt-24 px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <span aria-hidden="true" className="mb-6 block h-px w-12 flex-none bg-aisc-coral" />
          <h2 className="text-display-2 md:text-display-2-lg max-w-[560px] text-balance">Por dónde seguir</h2>
          <p className="text-body md:text-body-lg mt-4 max-w-[640px] text-aisc-ink">
            Tres recursos para quien apenas está entrando. Buena parte del material del campo está en inglés; en
            nuestros programas lo trabajamos en español.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-3">
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
