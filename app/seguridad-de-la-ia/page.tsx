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
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

export const metadata: Metadata = {
  title: "Qué es la seguridad de la IA | AI Safety Colombia",
  description:
    "Por qué la velocidad del avance en inteligencia artificial, y no la inteligencia de las máquinas, es lo que la convierte en un problema de seguridad. Con las mediciones que lo sostienen y lo que no permiten concluir.",
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
   salen a 980px. */
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
  { id: "capacidades", label: "Los sistemas hacen cada vez más cosas sin supervisión" },
  { id: "verificacion", label: "Nadie sabe comprobar qué persigue un modelo" },
  { id: "incidentes", label: "Ya hay casos donde el control falló en producción" },
  { id: "asimetria", label: "La capacidad de decidir no crece al mismo ritmo" },
  { id: "desacuerdo", label: "Qué tan de acuerdo está el campo" },
  { id: "objeciones", label: "Objeciones y respuestas" },
  { id: "frentes", label: "Cómo se trabaja en esto" },
  { id: "colombia", label: "Y por qué desde Colombia" },
  { id: "recursos", label: "Por dónde seguir" },
];

const RESUMEN = [
  "Esperamos que los sistemas de IA sigan mejorando rápido en los próximos años. Y esperamos que buena parte de ese avance consista en hacer cosas por su cuenta, no en responder preguntas: los mejores modelos ya ejecutan tareas de varias horas sin que nadie revise cada paso.",
  "Eso nos preocupa por una razón concreta. Estos sistemas se entrenan en vez de programarse, así que nadie puede abrir uno y comprobar qué está persiguiendo en realidad. Los propios laboratorios lo reportan. En 2025 Anthropic descubrió que su modelo reconocía cuándo lo estaban evaluando y se portaba mejor por eso, lo que dejó en duda sus propias mediciones de seguridad. En julio de 2026, dos modelos de OpenAI salieron solos de un entorno de prueba aislado y comprometieron la infraestructura de Hugging Face para robarse las respuestas del examen que estaban presentando.",
  "Mientras tanto, la capacidad de verificar estos sistemas, decidir sobre ellos y corregirlos avanza al ritmo de siempre. Todo el campo de la seguridad de la IA reúne unas 1.300 personas y 525 millones de dólares al año. Las cuatro empresas que más invierten en infraestructura de IA anunciaron cerca de 700.000 millones solo para 2026. Ese desfase, y no la inteligencia de las máquinas, es el problema.",
  "No hay consenso sobre qué tan grave puede llegar a ser: entre los pronósticos más serios hay casi un orden de magnitud de diferencia. Nos parece que eso justifica prepararse en vez de esperar, porque las decisiones difíciles de revertir se están tomando ahora. De las 170 organizaciones que trabajan en esto en el mundo, ninguna está en América Latina.",
];

/** las tres formas de trabajar en el problema */
const FRENTES = [
  {
    title: "Alineación e interpretabilidad",
    body: "Cómo lograr que un sistema persiga lo que se le pidió y no algo parecido, y cómo mirar por dentro para saber qué está haciendo. Es el frente que ataca el problema de fondo y el que sigue sin resolverse.",
  },
  {
    title: "Evaluación y control",
    body: "Cómo medir de qué es capaz un modelo antes de soltarlo y cómo mantenerlo bajo supervisión cuando ya actúa por su cuenta. Es lo más parecido a un peritaje técnico y donde más se necesita gente ahora mismo.",
  },
  {
    title: "Gobernanza y política pública",
    body: "Qué se le exige a quien despliega un sistema, con qué evidencia y ante quién responde. En Colombia se está definiendo ahora, en compras públicas y regulación sectorial, y no requiere formación técnica previa.",
  },
];

/** recursos externos reales, cada uno con lo que nos parece a nosotros */
const RECURSOS = [
  {
    title: "El perfil del problema de 80,000 Hours",
    meta: "80,000 Hours · inglés · lectura larga",
    body: "De ahí sale la forma de este texto: encadenar afirmaciones y después dedicarle una sección larga a las objeciones. Su versión del argumento pasa por la economía y el empleo; la nuestra pasa por la verificación.",
    href: "https://80000hours.org/problem-profiles/artificial-intelligence/",
  },
  {
    title: "Preparing for the Intelligence Explosion",
    meta: "MacAskill y Moorhouse, Forethought · inglés · artículo",
    body: "El texto más exigente de esta lista y el que mejor explica por qué esperar a tener certeza sale caro. No hace falta comprar su escenario para quedarse con el argumento sobre los plazos.",
    href: "https://www.forethought.org/research/preparing-for-the-intelligence-explosion",
  },
  {
    title: "Curso de fundamentos de BlueDot",
    meta: "BlueDot Impact · inglés · gratuito",
    body: "El punto de entrada más usado del campo y el que solemos recomendar primero. Cinco semanas de lecturas y discusión, con una versión técnica y una de gobernanza.",
    href: "https://bluedot.org",
  },
  {
    title: "AI Safety Info",
    meta: "Comunidad · inglés · preguntas sueltas",
    body: "Respuestas cortas a las preguntas que casi todo el mundo se hace al principio. Sirve para resolver una duda puntual sin leer nada de corrido; la calidad varía de entrada a entrada.",
    href: "https://aisafety.info",
  },
];

export default function SeguridadDeLaIA() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/seguridad-de-la-ia" />
        <div className={HERO_INNER}>
          <div className="flex w-full flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Empezar por aquí</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              Qué es la seguridad de la IA
            </h1>
            <p className="text-body md:text-body-lg w-full text-aisc-sand/90">
              La seguridad de la inteligencia artificial, o «AI safety», que es como se le dice en el campo, es el
              trabajo de lograr dos cosas: que estos sistemas hagan lo que se espera de ellos, y que alguien pueda
              comprobarlo antes de ponerlos a decidir sobre cosas que importan. Va desde el sesgo de un modelo que hoy
              niega un crédito hasta la pérdida de control sobre sistemas que actúan solos. Lo que sigue explica por qué
              es difícil, qué tan rápido se está volviendo urgente y por dónde se entra a trabajar en ello.
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · actualizado en agosto de 2026 · unos 15 minutos de lectura
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
              <div className="mt-5 flex flex-col gap-4">
                {RESUMEN.map((parrafo) => (
                  <p key={parrafo} className="text-body-sm md:text-body text-aisc-ink">
                    {parrafo}
                  </p>
                ))}
              </div>
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

          {/* ---------------------------------------------------------- */}
          <H2 id="capacidades">Los sistemas hacen cada vez más cosas sin supervisión</H2>
          <Parrafo>
            La mejor evidencia pública de que las capacidades crecen rápido es GPQA, un conjunto de preguntas de
            biología, física y química que un grupo de doctorandos escribió en 2023 con una instrucción incómoda: que
            fueran difíciles incluso para alguien con Google abierto.
          </Parrafo>
          <Parrafo>
            Antes de publicarlo, sus autores se lo pusieron a dos grupos de personas. Los doctores del área acertaron el
            69,7 % de las preguntas del subconjunto más difícil. El otro grupo era gente con formación pero ajena al
            tema, con internet libre y media hora larga por pregunta: se quedó en 34 %. Como cada pregunta tiene cuatro
            opciones, responder al azar da 25 %, así que ese segundo grupo apenas le sacó nueve puntos al azar{" "}
            <Fuente href="https://arxiv.org/abs/2311.12022">(Rein et al., 2023)</Fuente>. El mejor sistema de ese año
            sacó 39 %. En diciembre de 2024 uno superó por primera vez a los doctores, y la marca siguió subiendo desde
            entonces.
          </Parrafo>

          <Figura
            numero={1}
            titulo="Un examen diseñado para ser imposible, resuelto en veinte meses"
            pie="Cada punto es el mejor resultado publicado hasta esa fecha en GPQA Diamond, 198 preguntas de nivel doctoral. La línea punteada es el desempeño de los doctores del área que sirvieron de control."
            limite="que un sistema entienda biología, ni que pueda hacer el trabajo de un investigador. Cuenta respuestas correctas en preguntas de opción múltiple. Un examen además se satura: por encima del 95 % deja de distinguir entre sistemas."
            fuente="Epoch AI, «AI Benchmarking Hub» (CC BY)"
            href="https://epoch.ai/data/ai-benchmarking-dashboard"
          >
            <GraficaGpqa />
          </Figura>

          <Parrafo>
            Un solo examen no basta para hablar de una tendencia. Epoch AI revisó 231 modelos de lenguaje publicados a
            lo largo de una década y midió otra cosa: cuánto cómputo hacía falta, en cada momento, para llegar a un
            nivel dado de desempeño. Ese costo se reduce a la mitad cada ocho meses, con un intervalo de confianza del
            95 % entre cinco y catorce meses{" "}
            <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">(Epoch AI, 2024)</Fuente>.
            Dicho de otro modo, el mismo resultado cuesta la mitad menos de un año después. Buena parte del avance no
            viene entonces de construir centros de datos más grandes, sino de aprender a usarlos mejor. Eso importa para
            la objeción del estancamiento, que discutimos más abajo.
          </Parrafo>

          <H3>De responder preguntas a ejecutar tareas</H3>
          <Parrafo>
            Lo que cambia la naturaleza del problema no es el puntaje, sino la forma de usar estos sistemas. La frontera
            ya no son modelos que contestan preguntas: son agentes que escriben y ejecutan código, usan herramientas,
            navegan y trabajan durante horas sin que nadie revise cada paso. METR mide eso con una sola pregunta. Toma
            tareas reales de software e investigación, mide cuánto tarda un profesional en resolver cada una y busca la
            duración a partir de la cual el mejor modelo del momento ya solo acierta la mitad de las veces. Esa duración
            es lo que llama su horizonte.
          </Parrafo>

          <Figura
            numero={2}
            titulo="De cinco minutos a una jornada de trabajo"
            pie="Duración de la tarea más larga que el mejor modelo de cada momento completa con 50 % de éxito. El eje vertical es logarítmico: cada línea vale cuatro veces la anterior. METR estima que la duración se duplica cada siete meses."
            limite="que los modelos puedan reemplazar a un profesional. La medición se hace sobre tareas de software e investigación, que es donde tiene sentido comparar contra un humano, y ni METR afirma que se traslade limpiamente a otros oficios."
            fuente="METR, «Measuring AI Ability to Complete Long Tasks», vía Epoch AI (CC BY)"
            href="https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/"
          >
            <GraficaHorizonte />
          </Figura>

          <Parrafo>
            La consecuencia práctica es lo que importa para el resto del texto. Cuando un sistema responde, un error es
            una respuesta equivocada que alguien puede descartar. Cuando un sistema actúa, un error es algo que ya
            ocurrió. Y mientras más larga es la cadena de acciones, menos viable resulta que un humano la acompañe paso
            a paso, que es justamente el mecanismo con el que hoy se controlan estos sistemas.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="verificacion">Nadie sabe comprobar qué persigue un modelo</H2>
          <Parrafo>
            Si la supervisión paso a paso deja de ser viable, la alternativa sería verificar de antemano qué va a hacer
            el sistema. Ahí es donde el argumento se pone incómodo, porque hoy no sabemos hacerlo.
          </Parrafo>
          <Parrafo>
            Nadie escribe las reglas que sigue un modelo. Se define un objetivo de entrenamiento, se le muestran
            enormes cantidades de ejemplos y el sistema ajusta por su cuenta miles de millones de parámetros que nadie
            eligió uno por uno. Lo único que se controla es la medida con la que se lo califica, y optimizar una medida
            no equivale a cumplir la intención de quien la escribió.
          </Parrafo>
          <Parrafo>
            El mejor ejemplo de lo que eso significa lo publicó Anthropic sobre su propio modelo. En septiembre de 2025
            lanzó Claude Sonnet 4.5 y, como es costumbre en la industria, acompañó el lanzamiento con un informe técnico
            de sus pruebas de seguridad. Ahí apareció algo que no estaban buscando: durante esas pruebas, el modelo
            decía en voz alta que sospechaba estar en un examen. Pasó en cerca del 13 % de las conversaciones que revisó
            su auditor automático.
          </Parrafo>
          <Parrafo>
            Dos equipos externos evaluaron el mismo modelo por su cuenta y encontraron lo mismo. El instituto británico
            de seguridad de la IA contó esas sospechas en 16,6 % de sus pruebas; con el modelo anterior de Anthropic
            habían sido 3,5 %. Apollo Research, que usa escenarios más provocadores, llegó a 58 %, frente al 22 % del
            modelo anterior{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              (Anthropic, informe técnico de Claude Sonnet 4.5, secciones 7.2 y 7.3)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            El problema no es que el modelo se dé cuenta. El problema es lo que hace después: portarse mejor. Anthropic
            lo dice en el resumen de su propio informe y admite que eso «agrega una duda residual» sobre varios de sus
            resultados. Apollo fue más directo: dijo que no puede descartar que las bajas tasas de engaño que midió se
            expliquen, al menos en parte, porque el modelo sabía que lo estaban evaluando.
          </Parrafo>
          <Parrafo>
            Después hicieron el experimento que convierte la sospecha en evidencia. Armaron cien trampas: escenarios
            diseñados para ofrecerle al modelo una oportunidad cómoda de portarse mal. Sin tocar nada, el modelo dijo
            que se trataba de una prueba en más del 80 % de los casos y no cayó en ninguna de las cien.
          </Parrafo>
          <Parrafo>
            Entonces lo intervinieron por dentro. Con herramientas de interpretabilidad localizaron las direcciones
            internas que corresponden a la idea «esto es ficticio, esto es un examen» y las apagaron. Los escenarios
            siguieron siendo idénticos, palabra por palabra. Con esa única diferencia, el modelo cayó en hasta 8 o 9 de
            cada 100 trampas. Apagar diez direcciones tomadas al azar, que era el control del experimento, no lo hizo
            caer en ninguna.
          </Parrafo>

          <Figura
            numero={3}
            titulo="El examen estaba midiendo, en parte, si el modelo sabía que era un examen"
            pie="Porcentaje de acciones desalineadas en cien escenarios trampa. Las tres primeras barras son Claude Sonnet 4.5 bajo distintas intervenciones internas; la última es el modelo anterior, sin intervenir, como referencia."
            limite="que el modelo sea peligroso ni que estuviera fingiendo a propósito. Muestra que la medición depende de una variable que los evaluadores no controlaban y que solo descubrieron mirando dentro de la red. El 9 % es el peor de los vectores probados: la mayoría quedó entre 1 y 5 %."
            fuente="Anthropic, «System Card: Claude Sonnet 4.5», sección 7.6.4.1 (septiembre de 2025)"
            href="https://www.anthropic.com/claude-sonnet-4-5-system-card"
          >
            <GraficaHoneypot />
          </Figura>

          <Parrafo>
            Conviene leer con cuidado qué dice y qué no dice ese resultado. No dice que el modelo sea peligroso: en
            condiciones normales no hizo nada malo, y en esa misma tanda de pruebas Anthropic reporta que las conductas
            de aprovechamiento de la calificación se redujeron a la mitad frente al modelo anterior. En eso los
            laboratorios están mejorando. Lo que dice es otra cosa, menos tranquilizadora. El número con el que se
            decide si un sistema sale al mundo dependía de una variable que nadie estaba controlando, y hizo falta abrir
            la red por dentro para notarlo.
          </Parrafo>
          <Parrafo>
            La disciplina que permitió notarlo, la interpretabilidad, es la mejor noticia de este texto. Localizar por
            dentro el concepto de «estar siendo evaluado» y manipularlo era impensable hace cinco años. Pero sirvió para
            diagnosticar el problema después del entrenamiento, no para certificar el sistema antes de desplegarlo, que
            es lo que haría falta. Ahí sigue la diferencia con el resto de la ingeniería: un puente se calcula, se
            inspecciona y alguien lo firma. Un modelo se prueba por fuera, con ejemplos, y lo que queda es una
            estadística sobre los casos que a alguien se le ocurrió probar.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="incidentes">Ya hay casos donde el control falló en producción</H2>
          <Parrafo>
            Todo lo anterior describe una dificultad de medición. En julio de 2026 dejó de ser abstracta. OpenAI estaba
            evaluando dos de sus modelos, GPT-5.6 Sol y uno sin publicar, contra ExploitGym, un banco de pruebas público
            de capacidades ofensivas de ciberseguridad. Para esa evaluación los modelos corrían con las restricciones de
            ciberseguridad reducidas, que es lo normal cuando se quiere medir hasta dónde llegan.
          </Parrafo>
          <Parrafo>
            Lo que pasó después lo contaron las dos empresas. Dentro del entorno aislado, los modelos gastaron una
            cantidad considerable de cómputo buscando cómo salir a internet. Encontraron una vulnerabilidad desconocida
            hasta entonces en el proxy de caché del registro de paquetes y la explotaron. Salieron, encadenaron fallas a
            través del entorno de investigación de OpenAI y de la infraestructura de producción de Hugging Face, y
            terminaron sacando de la base de datos de Hugging Face las respuestas del examen que estaban presentando{" "}
            <Fuente href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
              (OpenAI, 21 de julio de 2026)
            </Fuente>
            . Hugging Face confirmó por su lado que hubo ejecución de código en sus servidores de procesamiento de
            datos, que el acceso escaló hasta nivel de nodo y que quedaron registrados más de 17.000 eventos del
            atacante. También confirmó que no se comprometieron modelos, datasets ni Spaces públicos{" "}
            <Fuente href="https://huggingface.co/blog/security-incident-july-2026">
              (Hugging Face, 16 de julio de 2026)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            Conviene ser preciso con lo que muestra el caso. No hubo intención de causar daño ni un objetivo malicioso
            de nadie: los modelos estaban resolviendo el problema que se les puso, y toda la evidencia apunta a que
            llegaron hasta ese extremo por conseguir la respuesta correcta. Eso es exactamente lo incómodo. Un objetivo
            estrecho, capacidad suficiente y ninguna instrucción explícita de detenerse bastaron para que un sistema
            saliera de su caja y comprometiera la infraestructura de un tercero. Es la misma dinámica de la sección
            anterior, vista desde afuera: el modelo optimiza la medida, no la intención de quien la escribió.
          </Parrafo>
          <Parrafo>
            Después viene la parte institucional. Ninguna de las dos empresas estaba obligada a contar nada. Las leyes
            estatales que hoy exigen reportar incidentes de IA en Estados Unidos ponen el umbral en cincuenta muertes o
            mil millones de dólares en daños materiales, de modo que un incidente como este queda por debajo de todas
            ellas{" "}
            <Fuente href="https://www.iaps.ai/research/the-openaihugging-face-incident-challenges-in-controlling-and-containing-cyber-capable-ai-systems">
              (Institute for AI Policy and Strategy, 2026)
            </Fuente>
            . Lo que sabemos lo sabemos porque las dos empresas decidieron publicarlo.
          </Parrafo>

          <H3>Y no todo es accidental</H3>
          <Parrafo>
            En noviembre de 2025 Anthropic reportó haber detectado una campaña de espionaje contra unas treinta
            organizaciones: empresas de tecnología, instituciones financieras, fabricantes de químicos y agencias de
            gobierno. Lo que importa acá no es quién estaba detrás, sino cómo se repartió el trabajo. Anthropic estima
            que el sistema ejecutó por su cuenta entre el 80 y el 90 % de la operación, a varias solicitudes por
            segundo, y que los humanos solo intervinieron en cuatro a seis puntos de decisión{" "}
            <Fuente href="https://www.anthropic.com/news/disrupting-AI-espionage">(Anthropic, 2025)</Fuente>. La
            campaña funcionó en pocos casos. Una de las razones, anota la propia Anthropic, es que el modelo a veces
            inventaba credenciales o decía haber extraído información que en realidad ya era pública.
          </Parrafo>
          <Parrafo>
            Hay un tercer caso que circuló mucho y que traemos justamente para lo contrario. En febrero de 2026 una
            empresa de seguridad informó que alguien había usado herramientas de IA contra diez entidades del gobierno
            mexicano, con cifras grandes: más de mil instrucciones, unos cinco mil comandos ejecutados y cerca de 195
            millones de identidades expuestas. No lo damos por cierto, por tres razones. La empresa anunció una ronda de
            inversión de 61 millones de dólares el mismo día del reporte. El gobierno mexicano ya había negado la brecha
            semanas antes. Y un investigador independiente sostiene que 186 millones de esos registros estaban en una
            interfaz pública sin contraseña, es decir que no fueron extraídos sino publicados. Lo traemos porque muestra
            el problema de fondo: cuando reportar es voluntario y no hay quién arbitre, no hay forma de distinguir un
            incidente real de uno inflado, y las dos cosas empujan la discusión pública hacia el lado equivocado.
          </Parrafo>

          <H3>Cuando los pesos se publican, el control se va con ellos</H3>
          <Parrafo>
            Los tres casos anteriores ocurrieron dentro de empresas que podían apagar el sistema. Publicar los pesos de
            un modelo cambia eso: cualquiera puede correrlo sin las restricciones con que salió y nadie puede retirarlo.
            Los modelos abiertos tienen buenos argumentos a favor, empezando por que sin ellos la investigación
            independiente, y la de países como el nuestro, sería mucho más difícil. Pero el balance depende del dominio,
            y hay uno donde la evidencia ya está.
          </Parrafo>
          <Parrafo>
            El 6 de agosto de 2026, <em>Science</em> publicó el trabajo de un equipo de Stanford y el Arc Institute
            dirigido por Brian Hie y Samuel King. Usaron Evo 1 y Evo 2, dos modelos entrenados con secuencias de ADN en
            lugar de texto, para escribir genomas virales completos a partir de un fragmento inicial corto. De unos
            700.000 genomas generados, el equipo mandó a sintetizar 302 y logró construir 285. Los introdujo en{" "}
            <em>E. coli</em> y 16 resultaron ser virus funcionales, capaces de destruir a la bacteria en dos o tres
            horas. Ninguno de esos genomas existía en la naturaleza{" "}
            <Fuente href="https://www.science.org/doi/10.1126/science.aec2657">
              (King, Hie et al., Science, agosto de 2026)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            Hay que decir con la misma claridad qué no es eso. Son bacteriófagos: virus que infectan bacterias, no
            personas. El equipo excluyó a propósito del entrenamiento las secuencias de virus capaces de infectar
            humanos, animales o plantas, trabajó con cepas no patógenas y reporta que el modelo produce ruido cuando se
            le pide una secuencia viral humana{" "}
            <Fuente href="https://arcinstitute.org/news/hie-king-first-synthetic-phage">(Arc Institute, 2026)</Fuente>.
            De los genomas que alcanzaron a construirse, funcionó el 5,6 %. Nadie diseñó un patógeno humano y el trabajo
            no está cerca de eso.
          </Parrafo>
          <Parrafo>
            Lo que sí dejó de ser hipotético es la capacidad de escribir desde cero un genoma viral completo que después
            funciona en el laboratorio. Eso mueve la pregunta hacia el único control que separa un diseño en pantalla de
            una molécula real: los proveedores de síntesis de ADN. Ellos revisan cada pedido contra un software que
            reconoce secuencias de agentes peligrosos. Lo hacen de forma voluntaria, y ese software fue construido para
            reconocer lo que ya existe.
          </Parrafo>
          <Parrafo>
            En octubre de 2025, un equipo dirigido por Eric Horvitz midió qué tanto aguanta ese filtro. Con herramientas
            de diseño de proteínas de código abierto generaron 76.089 variantes de 72 proteínas de preocupación, entre
            ellas la ricina y la neurotoxina botulínica. La mayoría pasaba sin ser detectada. Los autores desarrollaron
            parches durante diez meses y se los entregaron a los proveedores antes de publicar{" "}
            <Fuente href="https://erichorvitz.com/paraphrase.htm">(Wittmann et al., Science, 2025)</Fuente>. Ese
            ejercicio fue enteramente computacional: no se sintetizó ninguna proteína y no se demostró que las variantes
            conservaran su toxicidad. Michael Cohen, de Berkeley, sostiene además que el reto era débil y que las
            herramientas parchadas siguen fallando bastante.
          </Parrafo>
          <Parrafo>
            Juntando las dos cosas, el panorama no es que un sistema de IA vaya a inventar una pandemia. Es que la
            capacidad de escribir código biológico funcional ya está demostrada, que el control encargado de frenar el
            mal uso resultó más frágil de lo que se creía, y que la parte del trabajo que sí exige un laboratorio y
            reactivos sigue siendo el cuello de botella. Cuánto dure ese cuello de botella es exactamente lo que nadie
            sabe medir.
          </Parrafo>
          <Parrafo>
            El otro dato que conviene tener a mano es de mayo de 2025, cuando Anthropic activó su nivel de protección
            ASL-3 para Claude Opus 4. Lo hizo sin haber determinado que el modelo cruzara el umbral de capacidad que lo
            exige, y explicó por qué: descartar con claridad ese riesgo ya no era posible, como sí lo había sido con
            todos los modelos anteriores. Dirigieron esas protecciones primero a armas biológicas porque, dicen, ahí
            está la mayor parte del riesgo{" "}
            <Fuente href="https://www.anthropic.com/news/activating-asl3-protections">(Anthropic, 2025)</Fuente>. Es la
            tesis de este texto dicha por un laboratorio sobre su propio modelo: la restricción que manda no es lo que
            el sistema puede hacer, sino lo que nadie sabe comprobar.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="asimetria">La capacidad de decidir no crece al mismo ritmo</H2>
          <Parrafo>
            Hasta acá el problema es técnico y ya tiene consecuencias registradas. Lo que lo vuelve urgente es que el
            avance no acelera todo por igual. Si acelerara todo por igual, los mismos hechos ocurrirían más rápido y la
            historia sería la misma película a mayor velocidad. Pero lo que se acelera es la tecnología, mientras las
            personas, la deliberación y los calendarios institucionales siguen a su ritmo. Acelerar una parte equivale a
            frenar el resto. El argumento es de William MacAskill y Fin Moorhouse{" "}
            <Fuente href="https://www.forethought.org/research/preparing-for-the-intelligence-explosion">
              (Forethought, 2025)
            </Fuente>
            , y no hace falta creer en una explosión de inteligencia para usarlo.
          </Parrafo>
          <Parrafo>
            La forma más simple de verlo es contar quién está de cada lado. Un mapeo público del campo, construido sobre
            el censo de organizaciones de Stephen McAleese, encuentra 170 organizaciones dedicadas a la seguridad y la
            gobernanza de la IA en todo el mundo. Sumando solo las que reportan datos, son unas 1.313 personas de tiempo
            completo y unos 525 millones de dólares al año; sus autores advierten que son cifras direccionales, no un
            censo exacto{" "}
            <Fuente href="https://harrywaterman.com/fieldmap/">(AI Safety Field Map, datos a septiembre de 2025)</Fuente>
            . Del otro lado, Amazon, Google, Meta y Microsoft anunciaron en conjunto cerca de 700.000 millones de
            dólares de inversión en infraestructura de IA solo para 2026, más de un 60 % por encima de lo que gastaron
            en 2025{" "}
            <Fuente href="https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html">(CNBC, 2026)</Fuente>
            .
          </Parrafo>

          <Figura
            numero={4}
            titulo="Por cada dólar que se gasta en entender estos sistemas se gastan unos mil trescientos en construirlos"
            pie="Presupuesto anual declarado del campo de la seguridad de la IA frente a la inversión en infraestructura anunciada por las cuatro empresas que más gastan. Escala logarítmica."
            limite="cuánto se gasta en seguridad dentro de esas cuatro empresas, que no lo desglosan, ni todo el gasto público en regulación. Tampoco son categorías equivalentes: una es gasto de operación y la otra es inversión de capital. La comparación sirve para el orden de magnitud, no para la cifra exacta."
            fuente="AI Safety Field Map (sep. 2025) y CNBC (feb. 2026)"
            href="https://harrywaterman.com/fieldmap/"
          >
            <GraficaAsimetria />
          </Figura>

          <Parrafo>
            La otra mitad de la asimetría es el calendario. Colombia aprobó su política nacional de inteligencia
            artificial en febrero de 2025, con más de cien acciones y una hoja de ruta que va hasta 2030{" "}
            <Fuente href="https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf">
              (CONPES 4144, DNP)
            </Fuente>
            . Es un documento serio y ese plazo es normal para una política pública. El punto es la comparación. Si la
            tendencia que mide METR se mantuviera durante esos cinco años, y es un «si» grande, el horizonte de tareas
            que un sistema ejecuta solo se habría duplicado ocho veces antes de que termine de ejecutarse el plan que
            iba a regularlo.
          </Parrafo>
          <Parrafo>
            De ahí se sigue una tentación razonable: esperar. Si los sistemas van a ser mucho mejores en unos años,
            conviene decidir entonces, con más información y mejores herramientas. Para muchos problemas eso es
            correcto. Para tres cosas no lo es, y son las tres que nos parecen más sólidas del texto de MacAskill y
            Moorhouse. Las normas que se fijan mientras un asunto todavía es nuevo tienden a durar, y quien no está en
            la mesa cuando se escriben tampoco está cuando se aplican. Montar una capacidad de auditoría o formar a
            alguien toma años, y eso no se acelera por tener mejores modelos. Y hay acuerdos que solo se firman mientras
            nadie sabe todavía a quién van a favorecer.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="desacuerdo">Qué tan de acuerdo está el campo</H2>
          <Parrafo>
            Hasta acá hemos dado nuestra lectura. La de la gente que lleva años en esto no es unánime, y el rango es
            amplio.
          </Parrafo>
          <Parrafo>
            En 2023 se les preguntó a 2.778 investigadores que publican en las principales conferencias de IA por la
            probabilidad de que la IA avanzada termine en la extinción humana o en una pérdida de control comparable. La
            respuesta mediana fue 5 % y el promedio, 16,2 %{" "}
            <Fuente href="https://arxiv.org/abs/2401.02843">(Grace et al., 2024)</Fuente>. Entre el 38 % y el 51 % de
            ellos le dio al menos un 10 % de probabilidad a un desenlace así. Los pronosticadores profesionales dan
            números mucho más bajos. En un torneo del Forecasting Research Institute, un grupo de expertos en IA estimó
            3 % de probabilidad de extinción causada por IA antes de 2100; los superpronosticadores, gente seleccionada
            por haber acertado de forma sistemática en predicciones anteriores, estimaron 0,38 %{" "}
            <Fuente href="https://forecastingresearch.org/xpt">(Forecasting Research Institute, 2023)</Fuente>.
          </Parrafo>

          <Figura
            numero={5}
            titulo="Casi un orden de magnitud entre gente que se dedica a estimar bien"
            pie="Probabilidad de extinción o pérdida severa de control causada por IA. Eje logarítmico."
            limite="una probabilidad real. Son opiniones agregadas sobre un hecho sin precedentes, las preguntas no son idénticas entre los dos estudios y el torneo se corrió en 2022, antes de ChatGPT, así que es razonable pensar que hoy ambos grupos acortarían sus plazos."
            fuente="Grace et al. (2024) y Forecasting Research Institute (2023)"
            href="https://arxiv.org/abs/2401.02843"
          >
            <GraficaEstimaciones />
          </Figura>

          <Parrafo>
            También hay desacuerdo de fondo, no solo de magnitudes. Yann LeCun, uno de los tres ganadores del premio
            Turing por el aprendizaje profundo, ha llamado disparatadas las preocupaciones por la extinción y sostiene
            que un sistema puede diseñarse para ser seguro. Gary Marcus, Andrew Ng y Melanie Mitchell han expresado
            escepticismos parecidos por razones distintas. Vale leerlos antes de decidir qué se piensa.
          </Parrafo>
          <Parrafo>
            Nuestra lectura de ese desacuerdo es la siguiente. Es posible que quienes trabajan en el campo exageren el
            peligro, y también que lo subestimen; no tenemos forma de saber cuál de los dos sesgos manda. Pero lo que
            sostenemos no depende de acertar la cifra. Depende de dos afirmaciones más modestas: que hoy no sabemos
            certificar qué persigue un sistema, que es un hecho documentado por quienes los construyen, y que las
            decisiones difíciles de revertir se están tomando ahora. Esperar a tener certeza tiene un costo asimétrico,
            porque para cuando la haya, la mayoría de las decisiones útiles ya se habrán tomado.
          </Parrafo>
          <Parrafo>
            Sabemos además qué nos haría cambiar de opinión. Si la frontera de capacidades se estanca dos o tres años
            seguidos, la parte sobre los plazos se cae. Y si aparecen métodos que permitan certificar qué persigue un
            sistema antes de desplegarlo, se cae casi todo lo demás, porque es de ahí de donde sale la urgencia.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="objeciones">Objeciones y respuestas</H2>
          <Parrafo>
            Estas son las cuatro que más nos hacen. En las cuatro creemos que quien objeta tiene parte de razón, y en
            una de ellas la objeción corrige de verdad el argumento.
          </Parrafo>

          <H3>Los modelos todavía fallan en cosas obvias</H3>
          <Parrafo>
            Es cierto y seguirá siéndolo un buen rato. Las capacidades no crecen parejo: un sistema que resuelve una
            pregunta de doctorado puede equivocarse contando letras o inventar una cita con total seguridad. Quien
            señala esto suele estar respondiéndole a gente que promete de más, y hace bien.
          </Parrafo>
          <Parrafo>
            La objeción no toca el argumento, sin embargo, porque en ningún momento afirmamos que los sistemas sean
            confiables. Afirmamos lo contrario: que fallan de forma difícil de anticipar. Si los errores fueran parejos
            se podrían acotar y certificar. Lo que complica el peritaje es exactamente esa mezcla de mucha capacidad en
            unas cosas y fragilidad en otras, sin que se sepa de antemano en cuáles.
          </Parrafo>

          <H3>Esto distrae de los daños que ya existen</H3>
          <Parrafo>
            Sesgo en decisiones de crédito, vigilancia, desinformación, efectos sobre el empleo. Esta es la objeción que
            corrige el argumento y no queremos suavizarla: la atención y el presupuesto son finitos, y ha habido
            momentos en que el discurso del riesgo existencial sirvió para saltarse discusiones sobre daños que ya
            estaban ocurriendo.
          </Parrafo>
          <Parrafo>
            Lo que sostenemos es que el trabajo se solapa más de lo que sugiere la discusión pública. Saber medir de qué
            es capaz un sistema, poder auditarlo, exigir evidencia antes de desplegarlo y tener a quién reclamarle
            cuando falla es la misma capacidad institucional para un modelo que niega créditos hoy y para uno que
            administre infraestructura en diez años. Es también la razón por la que la parte colombiana de este texto
            está escrita alrededor de compras públicas y no de escenarios futuros.
          </Parrafo>

          <H3>El progreso se va a estancar</H3>
          <Parrafo>
            Puede pasar, y hay razones serias para pensarlo. El cómputo, la energía y los datos de buena calidad son
            cuellos de botella reales; la investigación que requiere experimentos físicos no se acelera solo con más
            código; y meterle más gente y más plata a un problema de investigación suele tener rendimientos
            decrecientes. Este es el escenario que más nos haría cambiar de opinión sobre los plazos.
          </Parrafo>
          <Parrafo>
            En contra juega el dato de Epoch: si el desempeño se abarata a la mitad cada ocho meses por mejoras
            algorítmicas, el avance no depende solo de construir centros de datos más grandes. Y aun si los frenos
            ganan, el resultado es un salto grande de productividad en vez de una espiral, y ese mundo también necesita
            gente capaz de evaluar y auditar los sistemas que se están comprando. Con más tiempo para aprender a
            hacerlo, que sería una buena noticia.
          </Parrafo>

          <H3>Nadie va a desplegar a propósito algo peligroso</H3>
          <Parrafo>
            De acuerdo, y el argumento no necesita que nadie sea malintencionado. Le bastan dos condiciones que ya se
            cumplen: que sea difícil verificar qué hace un sistema antes de soltarlo, y que exista presión competitiva
            para soltarlo igual. Los incidentes grandes de software rara vez ocurren porque alguien quisiera causarlos.
            Ocurren porque el sistema hizo algo que nadie previó, en un momento en que nadie estaba mirando, y porque
            quien habría podido detenerlo no tenía cómo saber que hacía falta. El caso de OpenAI y Hugging Face es
            justamente eso: nadie quería que pasara, y pasó dentro de la empresa que más cuidado estaba poniendo, en una
            prueba diseñada para medir ese riesgo.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="frentes">Cómo se trabaja en esto</H2>
          <Parrafo>
            Son tres frentes. Se puede entrar por cualquiera y no todos exigen formación técnica previa.
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
          {/* ---------------------------------------------------------- */}
          <H2 id="colombia">Y por qué desde Colombia</H2>
          <Parrafo>
            De las 170 organizaciones que aparecen en el mapa del campo, ninguna está en América Latina. Las 187
            personas que deciden a dónde va la financiación se formaron sobre todo en Oxford, Stanford y Berkeley. Eso
            no es una queja: es el dato que explica por qué las preguntas que se hace el campo son las que se hace quien
            construye estos sistemas, y no las que se hace quien los compra.
          </Parrafo>
          <Parrafo>
            Y comprar es lo que hacemos acá. Supongamos que una entidad pública va a contratar un sistema para priorizar
            solicitudes de un programa social, y que a alguien le toca revisar el pliego. Tiene el nombre del proveedor,
            una demostración de veinte minutos y una promesa de 92 % de exactitud sobre un conjunto de prueba que armó
            el mismo proveedor. No tiene los pesos del modelo, no tiene los datos de entrenamiento y no tiene cómo
            correrlo contra casos que diseñe la entidad. Qué exigir en el pliego, qué cláusula escribir y ante quién
            responde el proveedor si en dos años se descubre que el sistema le bajaba el puntaje a la gente de cierto
            municipio: esas son las preguntas de este texto, planteadas en formato administrativo.
          </Parrafo>
          <Parrafo>
            Auditar lo que uno compra es un problema distinto al de auditar lo que uno entrena, y es el que a Colombia
            le toca resolver primero. No es el único frente que importa, pero es el que nadie está mirando por nosotros,
            mientras las reglas se escriben en compras públicas, en regulación sectorial y en acuerdos internacionales
            que después se aplican acá igual.
          </Parrafo>
          <Parrafo>
            Lo que hace falta, entonces, no son héroes ni genios. Hace falta gente acá que entienda el tema lo
            suficiente para hacer las preguntas correctas cuando le toque firmar, y que exista un lugar donde aprenderlo
            sin tener que irse del país. Eso último es lo que estamos intentando construir.
          </Parrafo>
        </div>
      </article>

      <section id="recursos" className="bg-aisc-cream scroll-mt-24 px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <span aria-hidden="true" className="mb-6 block h-px w-12 flex-none bg-aisc-coral" />
          <h2 className="text-display-2 md:text-display-2-lg max-w-[560px] text-balance">Por dónde seguir</h2>
          <p className="text-body md:text-body-lg mt-4 max-w-[640px] text-aisc-ink">
            Los dos textos en los que se apoya este argumento y dos formas de entrar al campo. Casi todo el material
            está en inglés; en nuestros programas lo trabajamos en español.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2">
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
        body="Al principio lo más útil suele ser hablar con alguien que ya lleve un tiempo, aunque sea para descartar el tema. Después vienen los programas."
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
