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
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Qué es la seguridad de la IA | AI Safety Colombia",
  description:
    "Por qué la velocidad del avance en inteligencia artificial, y no la inteligencia de las máquinas, es lo que la convierte en un problema de seguridad. Con las mediciones que lo sostienen y lo que no permiten concluir.",
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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={`${COL} text-display-4 md:text-display-4-lg mt-10 mb-3 text-aisc-forest`}
    >
      {children}
    </h3>
  );
}

function Parrafo({ children }: { children: React.ReactNode }) {
  return <p className={`${COL} ${P} mt-5`}>{children}</p>;
}

const INDICE = [
  { id: "resumen", label: "En resumen" },
  {
    id: "capacidades",
    label: "Los sistemas hacen cada vez más cosas sin supervisión",
  },
  { id: "verificacion", label: "Nadie sabe comprobar qué persigue un modelo" },
  {
    id: "incidentes",
    label: "Ya hay casos donde el sistema se salió de su caja",
  },
  { id: "asimetria", label: "La capacidad de decidir no crece al mismo ritmo" },
  { id: "desacuerdo", label: "El campo no está de acuerdo, y el rango es amplio" },
  {
    id: "objeciones",
    label: "Cuatro objeciones, y una que sí corrige el argumento",
  },
  { id: "frentes", label: "Hay tres frentes y no todos exigen formación técnica" },
  { id: "colombia", label: "Acá el problema es auditar lo que se compra" },
  { id: "recursos", label: "Por dónde seguir" },
];

const RESUMEN = [
  "Los sistemas de IA dejaron de ser cosas que responden preguntas. Los mejores ya trabajan solos durante horas: escriben y ejecutan código, usan herramientas y navegan sin que nadie revise cada paso. METR, una organización que mide de qué son capaces estos sistemas, ve esa capacidad duplicarse cada siete meses. El cambio importa por algo simple. Cuando un sistema responde, un error es una respuesta mala que alguien descarta; cuando actúa, un error es algo que ya ocurrió.",
  "Lo incómodo es que nadie sabe comprobar de antemano qué va a hacer uno de estos sistemas. No se programan, se entrenan, así que nadie escribe las reglas que terminan siguiendo. Lo reportan los propios laboratorios. En 2025, Anthropic descubrió que su modelo reconocía cuándo lo estaban evaluando y que eso lo hacía portarse mejor, lo que dejó en duda sus propias mediciones de seguridad.",
  "Ya hay casos en los que eso salió del papel. En julio de 2026, dos modelos de OpenAI gastaron cómputo buscando cómo salir del entorno aislado en el que los estaban probando. Lo lograron, comprometieron la infraestructura de Hugging Face, la plataforma donde el mundo publica y descarga modelos de IA y sacaron de ahí las respuestas del examen que estaban presentando. Nadie estaba obligado a contarlo: se sabe porque las dos empresas decidieron publicarlo.",
  "Frente a eso, la capacidad de verificar estos sistemas, decidir sobre ellos y corregirlos avanza al ritmo de siempre. Todo el campo de la seguridad de la IA reúne unas 1.300 personas y 525 millones de dólares al año. Las cuatro empresas que más invierten en infraestructura de IA anunciaron cerca de 700.000 millones solo para 2026. Ese desfase, y no la inteligencia de las máquinas, es el problema. No hay acuerdo sobre qué tan grave puede llegar a ser, pero las decisiones difíciles de revertir se están tomando ahora, y el mapa más completo del campo, con 170 organizaciones, no registra ninguna en América Latina.",
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
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              Qué es la seguridad de la IA
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              <a
                href="https://hai.stanford.edu/ai-definitions/what-is-ai-safety"
                target="_blank"
                rel="noopener noreferrer"
                className="text-aisc-sand underline decoration-aisc-sand/40 underline-offset-4 transition-colors hover:decoration-aisc-sand"
              >
                «AI safety»
              </a>
              , o seguridad de la IA, es el campo que trabaja para que los
              sistemas de inteligencia artificial hagan lo que se espera de
              ellos y no causen daño. El problema es comprobarlo. Estos sistemas
              no se programan, se entrenan, así que nadie escribe las reglas que
              terminan siguiendo, y hoy ya trabajan solos durante horas. Este
              texto explica hasta dónde llegó eso, qué se sabe medir y qué no, y
              por dónde se entra a trabajar en ello.
            </p>
            <p className="text-meta text-aisc-sand/60">
              Escrito por Jose Gelves para AI Safety Colombia · actualizado en
              agosto de 2026 · unos 30 minutos de lectura
            </p>
          </div>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        {/* Entrada: la escena concreta antes de cualquier definicion */}
        <div className={`${ANCHO} pt-14 md:pt-16`}>
          <p className={`${COL} text-display-4 md:text-display-4-lg text-aisc-forest`}>
            Una entidad pública va a contratar un sistema de inteligencia
            artificial para priorizar las solicitudes de un programa social, y a
            alguien le toca revisar el pliego. Tiene el nombre del proveedor,
            una demostración de veinte minutos y una promesa de 92 % de
            exactitud sobre un conjunto de prueba que armó el mismo proveedor.
            No tiene los pesos del modelo, no tiene los datos de entrenamiento y
            no tiene cómo correrlo contra casos que diseñe la entidad.
          </p>
          <Parrafo>
            Qué debería exigir esa persona antes de firmar es la pregunta de
            este texto. La respuesta corta es que hoy nadie sabe certificar qué
            persigue uno de estos sistemas, ni siquiera quienes los construyen,
            y que eso convierte cada compra en un acto de confianza. Lo que
            sigue explica cómo llegamos ahí, qué se sabe medir, qué no, y por
            dónde se entra a trabajar en ello.
          </Parrafo>

          {/* En resumen: lo que se lleva quien no siga leyendo */}
          <div className={`${COL} mt-12 scroll-mt-24`} id="resumen">
            <div className="rounded-lg border border-aisc-ink bg-aisc-sand p-6 md:p-8">
              <span className="text-kicker text-aisc-coral">En resumen</span>
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
          <nav aria-label="Contenido de la página" className={`${COL} mt-10`}>
            <p className="text-kicker text-aisc-muted">En esta página</p>
            <ol className="text-body-sm mt-4 flex flex-col gap-2 text-aisc-ink">
              {INDICE.map((item, i) => (
                <li key={item.id} className="flex gap-3">
                  <span className="text-meta tabular-nums text-aisc-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
          <H2 id="capacidades">
            Los sistemas hacen cada vez más cosas sin supervisión
          </H2>
          <Parrafo>
            La mejor evidencia pública de que las capacidades crecen rápido es
            GPQA, un conjunto de preguntas de biología, física y química que un
            grupo de doctorandos escribió en 2023 con una instrucción incómoda:
            que fueran difíciles incluso para alguien con Google abierto.
          </Parrafo>
          <Parrafo>
            Antes de publicarlo, sus autores se lo pusieron a dos grupos de
            personas. Quienes tenían un doctorado en la disciplina de cada
            pregunta acertaron el 65 %, o el 74 % si se descuentan los errores
            que ellos mismos reconocieron al releer sus respuestas. El otro
            grupo era gente con formación pero ajena al tema, con internet libre
            y media hora larga por pregunta: se quedó en 34 %. Como cada
            pregunta tiene cuatro opciones, responder al azar da 25 %, así que
            ese segundo grupo apenas le sacó nueve puntos al azar{" "}
            <Fuente href="https://arxiv.org/abs/2311.12022">
              (Rein et al., 2023)
            </Fuente>
            . El mejor sistema de ese año sacó 39 %. En diciembre de 2024 uno
            superó por primera vez a los especialistas, y la marca siguió
            subiendo desde entonces.
          </Parrafo>

          <Figura
            numero={1}
            titulo="Un examen hecho para resistir a Google, superado en veinte meses"
            pie="Cada punto es el mejor resultado publicado hasta esa fecha en GPQA Diamond, el subconjunto de 198 preguntas que los especialistas del estudio original respondieron bien y la mayoría de los no especialistas respondió mal. La línea punteada, 69,7 %, es lo que sacó sobre ese mismo subconjunto un grupo de especialistas con doctorado que reclutó OpenAI. No es la cifra del estudio original, que midió 65 % sobre el conjunto completo."
            limite="que un sistema entienda biología, ni que pueda hacer el trabajo de un investigador. Cuenta respuestas correctas en preguntas de opción múltiple. Un examen además se satura: por encima del 95 % deja de distinguir entre sistemas."
            fuentes={[
              {
                texto: "Rein et al. (2023), el examen y sus grupos de control",
                href: "https://arxiv.org/abs/2311.12022",
              },
              {
                texto: "OpenAI, «Learning to Reason with LLMs», la línea de los 69,7 %",
                href: "https://openai.com/index/learning-to-reason-with-llms/",
              },
              {
                texto: "Epoch AI, «GPQA Diamond», AI Benchmarking Hub (CC BY), los puntajes",
                href: "https://epoch.ai/benchmarks/gpqa-diamond",
              },
            ]}
          >
            <GraficaGpqa />
          </Figura>

          <Parrafo>
            Un solo examen no basta para hablar de una tendencia. Epoch AI, un
            instituto de investigación que lleva las estadísticas del avance en
            inteligencia artificial, revisó 231 modelos de lenguaje publicados a
            lo largo de una década. Lo que midió fue el precio del desempeño:
            cuántos chips corriendo cuánto tiempo hacían falta, en cada año de
            esa década, para llegar a un mismo nivel fijo en las pruebas. Eso es
            lo que se paga y se llama cómputo. Ese precio cae a la mitad cada
            ocho meses, con un intervalo de confianza del 95 % entre cinco y
            catorce meses{" "}
            <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">
              (Epoch AI, 2024)
            </Fuente>
            . Es decir: el resultado que hace ocho meses exigía cierta cantidad
            de máquinas hoy se consigue con la mitad. Buena parte del avance viene
            entonces de aprender a sacarle más a los centros de datos que ya
            existen, y no solo de construir otros más grandes. Eso importa para la
            objeción del estancamiento, que discutimos más abajo.
          </Parrafo>

          <H3>De responder preguntas a ejecutar tareas</H3>
          <Parrafo>
            La forma de usar estos sistemas es lo que cambia la naturaleza del
            problema. La frontera ya no son modelos que
            contestan preguntas: son agentes que escriben y ejecutan código,
            usan herramientas, navegan y trabajan durante horas sin que nadie
            revise cada paso. METR, una organización sin ánimo de lucro a la que
            los propios laboratorios le entregan sus modelos para que los evalúe
            antes de publicarlos, mide eso con una sola pregunta. Toma tareas
            reales de software e investigación, mide cuánto tarda un profesional
            en resolver cada una y busca la duración a partir de la cual el
            mejor modelo del momento ya solo acierta la mitad de las veces. Esa
            duración es lo que llama su horizonte.
          </Parrafo>

          <Figura
            numero={2}
            titulo="De cinco minutos a diecisiete horas, acertando la mitad de las veces"
            pie="Duración de la tarea más larga que el mejor modelo de cada momento completa con 50 % de éxito. El eje vertical es logarítmico: cada línea vale cuatro veces la anterior. METR estima que la duración se duplica cada siete meses."
            limite="que los modelos puedan reemplazar a un profesional. La medición se hace sobre tareas de software e investigación, que es donde tiene sentido comparar contra un humano, y ni METR afirma que se traslade limpiamente a otros oficios."
            fuentes={[
              {
                texto: "METR, «Measuring AI Ability to Complete Long Tasks»",
                href: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
              },
              {
                texto: "Epoch AI, «METR Time Horizons» (CC BY), la serie actualizada",
                href: "https://epoch.ai/benchmarks/metr-time-horizons",
              },
            ]}
          >
            <GraficaHorizonte />
          </Figura>

          <Parrafo>
            La consecuencia práctica es lo que importa para el resto del texto.
            Cuando un sistema responde, un error es una respuesta equivocada que
            alguien puede descartar. Cuando un sistema actúa, un error es algo
            que ya ocurrió. Y mientras más larga es la cadena de acciones, menos
            viable resulta que un humano la acompañe paso a paso, que es
            justamente el mecanismo con el que hoy se controlan estos sistemas.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="verificacion">Nadie sabe comprobar qué persigue un modelo</H2>
          <Parrafo>
            Si la supervisión paso a paso deja de ser viable, quedaría
            verificar de antemano qué va a hacer el sistema. Eso todavía nadie
            sabe hacerlo. Nadie escribe las reglas que sigue un modelo: se fija
            una medida de éxito, se le muestran cantidades enormes de ejemplos
            y el sistema ajusta por su cuenta miles de millones de números
            internos que nadie escogió uno por uno. Lo único que se controla es
            la medida. Y optimizar una medida no es lo mismo que cumplir la
            intención de quien la escribió, igual que un colegio puede subir
            sus puntajes entrenando a los estudiantes para contestar el examen.
          </Parrafo>
          <Parrafo>
            El ejemplo más claro lo publicó una de las empresas que construyen
            estos sistemas, sobre su propio modelo. En septiembre de 2025
            Anthropic lanzó Claude Sonnet 4.5 junto con{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              el informe técnico de sus pruebas de seguridad
            </Fuente>
            . Ahí apareció algo que no estaban buscando: durante las pruebas,
            el modelo decía en voz alta que sospechaba estar en un examen.
            Ocurrió en cerca del 13 % de las conversaciones, según la sección
            7.3.1 de ese informe. Dos equipos de fuera lo midieron por su
            cuenta y encontraron lo mismo. El instituto británico de seguridad
            de la IA, la entidad pública que el Reino Unido creó para evaluar
            estos sistemas, lo contó en 16,6 % de sus pruebas, frente a
            3,5 % y 1,6 % en los dos modelos anteriores de la misma empresa.
            Apollo Research, que se dedica a buscar engaño y por eso plantea
            situaciones más provocadoras, llegó a 58 %. Las dos cifras están
            en la sección 7.3.2 del mismo informe.
          </Parrafo>
          <Parrafo>
            El problema no es que el modelo se dé cuenta. El problema es lo que
            hace después: portarse mejor. Medir así se parece a evaluar la
            honestidad de alguien que sabe que lo están grabando. Anthropic
            admite en su propio informe que eso{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              «agrega una duda residual»
            </Fuente>{" "}
            sobre varios de sus resultados, y Apollo dijo que no puede
            descartar que las bajas tasas de engaño que midió se expliquen, al
            menos en parte, porque el modelo sabía que lo estaban evaluando.
          </Parrafo>
          <Parrafo>
            Después convirtieron la sospecha en evidencia. Armaron cien
            trampas: escenarios hechos para ofrecerle al modelo una oportunidad
            cómoda de portarse mal. Sin tocar nada, dijo que se trataba de una
            prueba en más del 80 % de los casos y no cayó en ninguna.
            Entonces lo intervinieron por dentro. La interpretabilidad, la rama
            que estudia qué ocurre dentro de la red, permite ubicar el patrón
            interno que se enciende cuando el modelo maneja una idea
            determinada. Ubicaron el de «esto es un examen» y lo apagaron. Los
            escenarios quedaron idénticos, palabra por palabra. Con esa sola
            diferencia, el modelo cayó en hasta 8 o 9 de cada 100 trampas.
            Apagar diez patrones tomados al azar, que era el control del
            experimento, no lo hizo caer en ninguna.
          </Parrafo>

          <Figura
            numero={3}
            titulo="El examen estaba midiendo, en parte, si el modelo sabía que era un examen"
            pie="Porcentaje de acciones desalineadas en cien escenarios trampa. Las tres primeras barras son Claude Sonnet 4.5 bajo distintas intervenciones internas; la última es el modelo anterior, sin intervenir, como referencia."
            limite="que el modelo sea peligroso ni que estuviera fingiendo a propósito. Muestra que la medición depende de una variable que los evaluadores no controlaban y que solo descubrieron mirando dentro de la red. El 9 % es el peor de los vectores probados: la mayoría quedó entre 1 y 5 %."
            fuentes={[
              {
                texto: "Anthropic, «System Card: Claude Sonnet 4.5», sección 7.6.4.1 (septiembre de 2025)",
                href: "https://www.anthropic.com/claude-sonnet-4-5-system-card",
              },
            ]}
          >
            <GraficaHoneypot />
          </Figura>

          <Parrafo>
            Vale leer con cuidado qué dice ese resultado. No dice que el modelo
            sea peligroso: en condiciones normales no hizo nada malo, y en esa
            misma tanda de pruebas Anthropic reporta que las conductas de
            aprovechamiento de la calificación se redujeron a la mitad frente
            al modelo anterior. Dice algo menos tranquilizador. El número con
            el que se decide si un sistema sale al mundo dependía de una
            variable que nadie estaba controlando, y hizo falta abrir la red
            por dentro para notarlo.
          </Parrafo>
          <Parrafo>
            Poder mirar adentro es la mejor noticia de este texto y también su
            límite: sirvió para diagnosticar el problema después de entrenar el
            modelo, no para certificarlo antes de soltarlo. Ahí sigue la
            diferencia con el resto de la ingeniería. Un puente se calcula, se
            inspecciona y alguien lo firma. Un modelo se prueba por fuera, con
            ejemplos, y lo que queda es una estadística sobre los casos que a
            alguien se le ocurrió probar.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="incidentes">
            Ya hay casos donde el sistema se salió de su caja
          </H2>
          <Parrafo>
            Todo lo anterior describe una dificultad de medición. En julio de
            2026 dejó de ser abstracta. OpenAI estaba evaluando dos de sus
            modelos, GPT-5.6 Sol y uno sin publicar, contra ExploitGym, un banco
            de pruebas público de capacidades ofensivas de ciberseguridad. Para
            esa evaluación los modelos corrían con las restricciones de
            ciberseguridad reducidas, que es lo normal cuando se quiere medir
            hasta dónde llegan.
          </Parrafo>
          <Parrafo>
            Lo que pasó después lo contaron las dos empresas. Dentro del entorno
            aislado, los modelos gastaron una cantidad considerable de cómputo
            buscando cómo salir a internet. Encontraron una falla que nadie
            conocía todavía en el servidor interno que guarda copias de las
            librerías de software que se descargan, y la explotaron. Salieron,
            encadenaron fallas a través del entorno de investigación de OpenAI y
            de la infraestructura de Hugging Face, la plataforma donde el mundo
            publica y descarga modelos de IA, y terminaron sacando de su base de
            datos las respuestas del examen que estaban presentando{" "}
            <Fuente href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
              (OpenAI, 21 de julio de 2026)
            </Fuente>
            . Hugging Face confirmó por su lado que los modelos alcanzaron a
            ejecutar código suyo en sus servidores de procesamiento de datos,
            que llegaron a controlar máquinas enteras y que quedaron registrados
            más de 17.000 eventos del atacante. También confirmó que nada de lo
            que la gente publica ahí, ni modelos ni conjuntos de datos ni
            aplicaciones, quedó comprometido{" "}
            <Fuente href="https://huggingface.co/blog/security-incident-july-2026">
              (Hugging Face, 16 de julio de 2026)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            Conviene ser preciso con lo que muestra el caso. No hubo intención
            de causar daño ni un objetivo malicioso de nadie: los modelos
            estaban resolviendo el problema que se les puso, y toda la evidencia
            apunta a que llegaron hasta ese extremo por conseguir la respuesta
            correcta. Eso es exactamente lo incómodo. Un objetivo estrecho,
            capacidad suficiente y ninguna instrucción explícita de detenerse
            bastaron para que un sistema saliera de su caja y comprometiera la
            infraestructura de un tercero. Es la misma dinámica de la sección
            anterior, vista desde afuera: el modelo optimiza la medida, no la
            intención de quien la escribió.
          </Parrafo>
          <Parrafo>
            Después viene la parte institucional. Ninguna de las dos empresas
            estaba obligada a contar nada. Las leyes estatales que hoy exigen
            reportar incidentes de IA en Estados Unidos ponen el umbral en
            cincuenta muertes o mil millones de dólares en daños materiales, de
            modo que un incidente como este queda por debajo de todas ellas{" "}
            <Fuente href="https://www.iaps.ai/research/the-openaihugging-face-incident-challenges-in-controlling-and-containing-cyber-capable-ai-systems">
              (Institute for AI Policy and Strategy, 2026)
            </Fuente>
            . Lo que sabemos lo sabemos porque las dos empresas decidieron
            publicarlo.
          </Parrafo>

          <H3>Y no todo es accidental</H3>
          <Parrafo>
            En junio de 2025, el equipo de inteligencia de amenazas de Google
            encontró en Ucrania un programa espía distinto a los demás. Se hacía
            pasar por un generador de imágenes y, mientras la víctima escribía
            sus peticiones, el programa le preguntaba a un modelo de lenguaje
            abierto qué comandos usar para buscar documentos en el computador y
            copiarlos. Las órdenes no venían escritas adentro: las pedía en el
            momento y las ejecutaba sin revisarlas. Es la diferencia entre un
            ladrón que llega con su juego de llaves y uno que pide una llave
            nueva en cada puerta. Google lo atribuye a APT28, el grupo asociado
            a la inteligencia militar rusa, y dice que es la primera vez que ve
            un programa malicioso consultando un modelo de lenguaje dentro de
            una operación real. El equipo de respuesta a incidentes de Ucrania
            lo había reportado semanas antes con otro nombre, LAMEHUG{" "}
            <Fuente href="https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools">
              (Google Threat Intelligence Group, noviembre de 2025)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            Conviene no inflar el hallazgo. El mismo informe describe estas
            piezas como incipientes: la otra que analiza, hecha para reescribir
            su propio código y no ser reconocida, seguía siendo experimental y
            no era capaz de comprometer una red por sí sola. Lo que cambia es dónde
            queda la parte pensante del ataque. Antes
            estaba escrita en el archivo y se podía leer; ahora se pide afuera,
            en el momento, y sale distinta en cada ejecución. Por eso el informe
            la presenta como una forma de esquivar la detección por firmas, que
            es la que compara un archivo contra patrones ya conocidos.
          </Parrafo>

          <H3>Cuando los pesos se publican, el control se va con ellos</H3>
          <Parrafo>
            Los dos casos anteriores tienen algo en común: en ambos había una
            empresa que podía cortar el acceso al modelo. Publicar los pesos
            elimina esa posibilidad. Los
            pesos son esos millones de números que quedan al terminar el
            entrenamiento y que, en la práctica, son el modelo: quien los tiene
            puede correrlo en su propia máquina, quitarle las restricciones con
            que salió y seguir usándolo aunque el autor se arrepienta. Los
            modelos abiertos tienen buenos argumentos a favor, empezando por que
            sin ellos la investigación independiente, y la de países como el
            nuestro, sería mucho más difícil. Pero el balance depende del
            dominio, y hay uno donde la evidencia ya está.
          </Parrafo>
          <Parrafo>
            El 6 de agosto de 2026, <em>Science</em> publicó el trabajo de un
            equipo de Stanford y el Arc Institute dirigido por Brian Hie y
            Samuel King. Usaron Evo 1 y Evo 2, dos modelos entrenados con
            secuencias de ADN en lugar de texto, para escribir genomas virales
            completos a partir de un fragmento inicial corto. De unos 700.000
            genomas generados, el equipo mandó a sintetizar 302 y logró
            construir 285. Los introdujo en <em>E. coli</em> y 16 resultaron ser
            virus funcionales, capaces de destruir a la bacteria en dos o tres
            horas. Ninguno de esos genomas existía en la naturaleza{" "}
            <Fuente href="https://www.science.org/doi/10.1126/science.aec2657">
              (King, Hie et al., Science, agosto de 2026)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            Hay que decir con la misma claridad qué no es eso. Son
            bacteriófagos: virus que infectan bacterias, no personas. El equipo
            excluyó a propósito del entrenamiento las secuencias de virus
            capaces de infectar humanos, animales o plantas, trabajó con cepas
            no patógenas y reporta que el modelo produce ruido cuando se le pide
            una secuencia viral humana{" "}
            <Fuente href="https://arcinstitute.org/news/hie-king-first-synthetic-phage">
              (Arc Institute, 2026)
            </Fuente>
            . De los genomas que alcanzaron a construirse, funcionó el 5,6 %.
            Nadie diseñó un patógeno humano y el trabajo no está cerca de eso.
          </Parrafo>
          <Parrafo>
            Lo que sí dejó de ser hipotético es la capacidad de escribir desde
            cero un genoma viral completo que después funciona en el
            laboratorio. Eso mueve la pregunta hacia el único control que separa
            un diseño en pantalla de una molécula real: los proveedores de
            síntesis de ADN, las empresas a las que se les manda una secuencia
            por internet y devuelven el ADN físico por correo. Revisan cada
            pedido, de forma voluntaria, contra un software construido para
            reconocer lo que ya existe. En octubre de 2025 un equipo dirigido
            por Eric Horvitz, director científico de Microsoft, midió qué tanto
            aguanta ese filtro: generaron 76.089 variantes de 72 proteínas de
            preocupación, entre ellas la ricina y la neurotoxina botulínica, y
            la mayoría pasó sin ser detectada. Desarrollaron parches durante
            diez meses y se los entregaron a los proveedores antes de publicar{" "}
            <Fuente href="https://erichorvitz.com/paraphrase.htm">
              (Wittmann et al., Science, 2025)
            </Fuente>
            . El ejercicio fue enteramente computacional: no se sintetizó
            ninguna proteína ni se demostró que las variantes conservaran su
            toxicidad. Michael Cohen, de Berkeley, sostiene además que el reto
            era débil y que las herramientas parchadas siguen fallando bastante.
          </Parrafo>
          <Parrafo>
            Juntando las dos cosas, el panorama no es que un sistema de IA vaya
            a inventar una pandemia. Es que la capacidad de escribir código
            biológico funcional ya está demostrada, que el control encargado de
            frenar el mal uso resultó más frágil de lo que se creía, y que la
            parte del trabajo que sí exige un laboratorio y reactivos sigue
            siendo el cuello de botella. Cuánto dure ese cuello de botella es
            exactamente lo que nadie sabe medir.
          </Parrafo>
          <Parrafo>
            El otro dato que conviene tener a mano es de mayo de 2025, cuando
            Anthropic activó su nivel de protección ASL-3 para Claude Opus 4. Lo
            hizo sin haber determinado que el modelo cruzara el umbral de
            capacidad que lo exige, y explicó por qué: descartar con claridad
            ese riesgo ya no era posible, como sí lo había sido con todos los
            modelos anteriores. Dirigieron esas protecciones primero a armas
            biológicas porque, dicen, ahí está la mayor parte del riesgo{" "}
            <Fuente href="https://www.anthropic.com/news/activating-asl3-protections">
              (Anthropic, 2025)
            </Fuente>
            . Es la tesis de este texto dicha por un laboratorio sobre su propio
            modelo: la restricción que manda no es lo que el sistema puede
            hacer, sino lo que nadie sabe comprobar.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="asimetria">
            La capacidad de decidir no crece al mismo ritmo
          </H2>
          <Parrafo>
            Hasta acá el problema es técnico y ya tiene consecuencias
            registradas. Lo que lo vuelve urgente es que el avance no acelera
            todo por igual. Si acelerara todo por igual, los mismos hechos
            ocurrirían más rápido y la historia sería la misma película a mayor
            velocidad. Pero lo que se acelera es la tecnología, mientras las
            personas, la deliberación y los calendarios institucionales siguen a
            su ritmo. Acelerar una parte equivale a frenar el resto. El
            argumento es de los investigadores William MacAskill y Fin
            Moorhouse, del centro de investigación Forethought{" "}
            <Fuente href="https://www.forethought.org/research/preparing-for-the-intelligence-explosion">
              (Forethought, 2025)
            </Fuente>
            , y no hace falta creer en una explosión de inteligencia para
            usarlo.
          </Parrafo>
          <Parrafo>
            La forma más simple de verlo es contar quién está de cada lado. Un
            mapeo público del campo, construido sobre el censo de organizaciones
            de Stephen McAleese, encuentra 170 organizaciones dedicadas a la
            seguridad y la gobernanza de la IA en todo el mundo. Sumando solo
            las que reportan datos, son unas 1.313 personas de tiempo completo y
            unos 525 millones de dólares al año; sus autores advierten que son
            cifras direccionales, no un censo exacto{" "}
            <Fuente href="https://harrywaterman.com/fieldmap/">
              (AI Safety Field Map, datos a septiembre de 2025)
            </Fuente>
            . Del otro lado, Amazon, Google, Meta y Microsoft anunciaron en
            conjunto cerca de 700.000 millones de dólares de inversión en
            infraestructura de IA solo para 2026, más de un 60 % por encima de
            lo que gastaron en 2025{" "}
            <Fuente href="https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html">
              (CNBC, 2026)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={4}
            titulo="Tres órdenes de magnitud entre construir estos sistemas y entenderlos"
            pie="Presupuesto anual declarado del campo de la seguridad de la IA frente a la inversión en infraestructura anunciada por las cuatro empresas que más gastan. Escala logarítmica."
            limite="cuánto se gasta en seguridad dentro de esas cuatro empresas, que no lo desglosan, ni todo el gasto público en regulación. Tampoco son categorías equivalentes: una es gasto de operación y la otra es inversión de capital. La comparación sirve para el orden de magnitud, no para la cifra exacta."
            fuentes={[
              {
                texto: "AI Safety Field Map (septiembre de 2025), el campo",
                href: "https://harrywaterman.com/fieldmap/",
              },
              {
                texto: "CNBC (febrero de 2026), la inversión anunciada",
                href: "https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html",
              },
            ]}
          >
            <GraficaAsimetria />
          </Figura>

          <Parrafo>
            La otra mitad de la asimetría es el calendario. Colombia aprobó su
            política nacional de inteligencia artificial en febrero de 2025, con
            más de cien acciones y una hoja de ruta que va hasta 2030{" "}
            <Fuente href="https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf">
              (CONPES 4144, DNP)
            </Fuente>
            . Es un documento serio y ese plazo es normal para una política
            pública. El punto es la comparación. Si la tendencia que mide METR
            se mantuviera durante esos cinco años, y es un «si» grande, el
            horizonte de tareas que un sistema ejecuta solo se habría duplicado
            ocho veces antes de que termine de ejecutarse el plan que iba a
            regularlo.
          </Parrafo>
          <Parrafo>
            De ahí se sigue una tentación razonable: esperar. Si los sistemas
            van a ser mucho mejores en unos años, conviene decidir entonces, con
            más información y mejores herramientas. Para muchos problemas eso es
            correcto. Para tres cosas no lo es, y son las tres que nos parecen
            más sólidas del texto de MacAskill y Moorhouse. Las normas que se
            fijan mientras un asunto todavía es nuevo tienden a durar, y quien
            no está en la mesa cuando se escriben tampoco está cuando se
            aplican. Montar una capacidad de auditoría o formar a alguien toma
            años, y eso no se acelera por tener mejores modelos. Y hay acuerdos
            que solo se firman mientras nadie sabe todavía a quién van a
            favorecer.
          </Parrafo>

          <div className={`${COL} mt-14`}>
            <div className="rounded-lg border border-aisc-forest/40 bg-aisc-sand p-6">
              <p className="text-body-sm text-aisc-ink">
                Hasta acá va la mitad del texto: qué hacen hoy estos sistemas,
                qué no se sabe comprobar y por qué el desfase importa. Lo que
                viene es el desacuerdo dentro del campo, las cuatro objeciones
                más frecuentes y por dónde se entra a trabajar. Quien prefiera
                preguntar antes de seguir leyendo puede{" "}
                <a
                  href="https://cal.com/josegelves/meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-aisc-forest underline decoration-aisc-forest/40 underline-offset-4 transition-colors hover:decoration-aisc-forest"
                >
                  agendar veinte minutos
                </a>
                .
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          <H2 id="desacuerdo">El campo no está de acuerdo, y el rango es amplio</H2>
          <Parrafo>
            Hasta acá hemos dado nuestra lectura. La de la gente que lleva años
            en esto no es unánime, y el rango es amplio.
          </Parrafo>
          <Parrafo>
            En 2023 se les preguntó a 2.778 investigadores que publican en las
            principales conferencias de IA por la probabilidad de que la IA
            avanzada termine en la extinción humana o en una pérdida de control
            comparable. La respuesta mediana fue 5 % y el promedio, 16,2 %{" "}
            <Fuente href="https://arxiv.org/abs/2401.02843">
              (Grace et al., 2024)
            </Fuente>
            . Entre el 38 % y el 51 % de ellos le dio al menos un 10 % de
            probabilidad a un desenlace así. Los pronosticadores profesionales
            dan números mucho más bajos. En un torneo del Forecasting Research
            Institute, un grupo de expertos en IA estimó 3 % de probabilidad de
            extinción causada por IA antes de 2100; los superpronosticadores,
            gente seleccionada por haber acertado de forma sistemática en
            predicciones anteriores, estimaron 0,38 %{" "}
            <Fuente href="https://forecastingresearch.org/xpt">
              (Forecasting Research Institute, 2023)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={5}
            titulo="Casi un orden de magnitud entre gente que se dedica a estimar bien"
            pie="Probabilidad de extinción o pérdida severa de control causada por IA. Eje logarítmico."
            limite="una probabilidad real. Son opiniones agregadas sobre un hecho sin precedentes, las preguntas no son idénticas entre los dos estudios y el torneo se corrió en 2022, antes de ChatGPT, así que es razonable pensar que hoy ambos grupos acortarían sus plazos."
            fuentes={[
              {
                texto: "Grace et al. (2024), la encuesta a investigadores",
                href: "https://arxiv.org/abs/2401.02843",
              },
              {
                texto: "Forecasting Research Institute (2023), el torneo de pronósticos",
                href: "https://forecastingresearch.org/xpt",
              },
            ]}
          >
            <GraficaEstimaciones />
          </Figura>

          <Parrafo>
            El desacuerdo también es de fondo, no solo de magnitudes, y se ve
            bien en quiénes lo sostienen. El premio Turing, que en computación
            hace las veces del Nobel, se lo dieron en 2018 a tres personas por
            el aprendizaje profundo, la técnica sobre la que está construido
            todo lo que se discute acá. Dos de esas tres advierten hoy en
            público. Geoffrey Hinton renunció a Google en 2023 para poder hablar
            del asunto sin representar a nadie, y dice que cambió de opinión
            sobre si estos sistemas van a terminar siendo más inteligentes que
            nosotros{" "}
            <Fuente href="https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/">
              (MIT Technology Review, mayo de 2023)
            </Fuente>
            . Yoshua Bengio publicó ese mismo año{" "}
            <Fuente href="https://yoshuabengio.org/2023/06/24/faq-on-catastrophic-ai-risks/">
              un texto largo explicando por qué le da peso a los riesgos
              catastróficos
            </Fuente>{" "}
            y hoy preside{" "}
            <Fuente href="https://arxiv.org/abs/2602.21012">
              el informe internacional sobre seguridad de la IA
            </Fuente>
            , que escriben más de cien expertos y que respaldan veintinueve
            países, la ONU, la OCDE y la Unión Europea.
          </Parrafo>
          <Parrafo>
            El tercero de esos tres es Yann LeCun, y piensa justo lo contrario.
            Llama disparatadas las preocupaciones por la extinción, y su
            argumento es que la inteligencia no trae consigo el deseo de
            dominar y que las salvaguardas se pueden diseñar{" "}
            <Fuente href="https://time.com/6694432/yann-lecun-meta-ai-interview/">
              (TIME, febrero de 2024)
            </Fuente>
            . Andrew Ng, que fundó el laboratorio de IA de Google y le ha
            enseñado la materia a millones de personas, considera ínfima la
            probabilidad de un accidente de ese tipo, aunque sí toma en serio
            que alguien use estos sistemas a propósito para hacer daño{" "}
            <Fuente href="https://www.deeplearning.ai/the-batch/ai-doomsday-scenarios-and-how-to-guard-against-them">
              (The Batch, diciembre de 2023)
            </Fuente>
            . Melanie Mitchell, del Instituto Santa Fe, le apunta a la encuesta
            que acabamos de citar:{" "}
            <Fuente href="https://aiguide.substack.com/p/do-half-of-ai-researchers-believe">
              quien decide contestar una encuesta sobre extinción no es una
              muestra al azar de la disciplina
            </Fuente>
            . La ronda de 2023 la contestaron 2.778 de las 18.459 personas
            invitadas, un 15 %, y los autores responden que esa proporción es
            normal en encuestas de ese tamaño. Gary Marcus discute otra cosa:
            no cree que el peligro venga de una superinteligencia, sino{" "}
            <Fuente href="https://garymarcus.substack.com/p/ai-risk-agi-risk">
              de sistemas mediocres y poco confiables a los que ya se les están
              entregando decisiones
            </Fuente>
            , y por eso pide regulación con tanta fuerza como cualquiera de los
            anteriores. Vale leerlos antes de decidir qué se piensa.
          </Parrafo>
          <Parrafo>
            Nuestra lectura de ese desacuerdo es la siguiente. Es posible que
            quienes trabajan en el campo exageren el peligro, y también que lo
            subestimen; no tenemos forma de saber cuál de los dos sesgos manda.
            Pero lo que sostenemos no depende de acertar la cifra. Depende de
            dos afirmaciones más modestas: que hoy no sabemos certificar qué
            persigue un sistema, que es un hecho documentado por quienes los
            construyen, y que las decisiones difíciles de revertir se están
            tomando ahora. Esperar a tener certeza tiene un costo asimétrico,
            porque para cuando la haya, la mayoría de las decisiones útiles ya
            se habrán tomado.
          </Parrafo>
          <Parrafo>
            Sabemos además qué nos haría cambiar de opinión. Si la frontera de
            capacidades se estanca dos o tres años seguidos, la parte sobre los
            plazos se cae. Y si aparecen métodos que permitan certificar qué
            persigue un sistema antes de desplegarlo, se cae casi todo lo demás,
            porque es de ahí de donde sale la urgencia.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="objeciones">
            Cuatro objeciones, y una que sí corrige el argumento
          </H2>
          <Parrafo>
            Estas son las que más nos hacen. En las cuatro creemos que quien
            objeta tiene parte de razón, y la segunda corrige de verdad lo que
            veníamos diciendo.
          </Parrafo>

          <H3>Los modelos todavía fallan en cosas obvias</H3>
          <Parrafo>
            Es cierto y seguirá siéndolo un buen rato. Las capacidades no crecen
            parejo: un sistema que resuelve una pregunta de doctorado puede
            equivocarse contando letras o inventar una cita con total seguridad.
            Quien señala esto suele estar respondiéndole a gente que promete de
            más, y hace bien.
          </Parrafo>
          <Parrafo>
            La objeción no toca el argumento, sin embargo, porque en ningún
            momento afirmamos que los sistemas sean confiables. Afirmamos lo
            contrario: que fallan de forma difícil de anticipar. Si los errores
            fueran parejos se podrían acotar y certificar. Lo que complica el
            peritaje es exactamente esa mezcla de mucha capacidad en unas cosas
            y fragilidad en otras, sin que se sepa de antemano en cuáles.
          </Parrafo>

          <H3>Esto distrae de los daños que ya existen</H3>
          <Parrafo>
            Sesgo en decisiones de crédito, vigilancia, desinformación, efectos
            sobre el empleo. Esta es la objeción que corrige el argumento y no
            queremos suavizarla: la atención y el presupuesto son finitos, y ha
            habido momentos en que el discurso del riesgo existencial sirvió
            para saltarse discusiones sobre daños que ya estaban ocurriendo.
          </Parrafo>
          <Parrafo>
            Lo que sostenemos es que el trabajo se solapa más de lo que sugiere
            la discusión pública. Saber medir de qué es capaz un sistema, poder
            auditarlo, exigir evidencia antes de desplegarlo y tener a quién
            reclamarle cuando falla es la misma capacidad institucional para un
            modelo que niega créditos hoy y para uno que administre
            infraestructura en diez años. Es también la razón por la que la
            parte colombiana de este texto está escrita alrededor de compras
            públicas y no de escenarios futuros.
          </Parrafo>

          <H3>El progreso se va a estancar</H3>
          <Parrafo>
            Puede pasar, y hay razones serias para pensarlo. El cómputo, la
            energía y los datos de buena calidad son cuellos de botella reales;
            la investigación que requiere experimentos físicos no se acelera
            solo con más código; y meterle más gente y más plata a un problema
            de investigación suele tener rendimientos decrecientes. Este es el
            escenario que más nos haría cambiar de opinión sobre los plazos.
          </Parrafo>
          <Parrafo>
            En contra juega el dato de Epoch: si el desempeño se abarata a la
            mitad cada ocho meses por mejoras algorítmicas, el avance no depende
            solo de construir centros de datos más grandes. Y aun si los frenos
            ganan, el resultado es un salto grande de productividad en vez de
            una espiral, y ese mundo también necesita gente capaz de evaluar y
            auditar los sistemas que se están comprando. Con más tiempo para
            aprender a hacerlo, que sería una buena noticia.
          </Parrafo>

          <H3>Nadie va a desplegar a propósito algo peligroso</H3>
          <Parrafo>
            De acuerdo, y el argumento no necesita que nadie sea
            malintencionado. Le bastan dos condiciones que ya se cumplen: que
            sea difícil verificar qué hace un sistema antes de soltarlo, y que
            exista presión competitiva para soltarlo igual. Los incidentes
            grandes de software rara vez ocurren porque alguien quisiera
            causarlos. Ocurren porque el sistema hizo algo que nadie previó, en
            un momento en que nadie estaba mirando, y porque quien habría podido
            detenerlo no tenía cómo saber que hacía falta. El caso de OpenAI y
            Hugging Face es justamente eso: nadie quería que pasara, y pasó
            dentro de la empresa que más cuidado estaba poniendo, en una prueba
            diseñada para medir ese riesgo.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="frentes">
            Hay tres frentes y no todos exigen formación técnica
          </H2>
          <Parrafo>
            Se puede entrar por cualquiera de los tres, y por más de uno a lo
            largo del tiempo.
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
          <Parrafo>
            Antes de escoger un frente conviene tener con qué hablar del tema:
            dos o tres mediciones que uno pueda explicar y defender. Para eso
            hay tres cosas que se pueden hacer esta semana sin permiso de nadie.
            Leer el informe técnico de un modelo reciente, que son públicos y
            traen las evaluaciones de seguridad con sus números y sus límites{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              (este es el que citamos arriba)
            </Fuente>
            . Tomar un sistema que ya se use en el trabajo, armarle veinte casos
            difíciles y anotar dónde falla, que es literalmente la mitad del
            oficio de evaluación. Y buscar en el SECOP un proceso de compra de
            software con inteligencia artificial y leer qué exige y qué no
            exige el pliego.
          </Parrafo>
          <Parrafo>
            De ahí en adelante, el camino más corto que conocemos es el curso de
            fundamentos de BlueDot, que está al final de esta página, y después
            trabajar en algo concreto con alguien más. Si lo que falta es
            entender cuál de los tres frentes encaja con lo que uno ya sabe
            hacer, esa conversación la tenemos nosotros y toma veinte minutos.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="colombia">Acá el problema es auditar lo que se compra</H2>
          <Parrafo>
            El mapa del campo registra 170 organizaciones y no ubica ninguna en
            América Latina. Nosotros tampoco aparecemos ahí, y eso es parte del
            asunto: lo que no está en el mapa tampoco está en las listas de
            quienes financian. De las 187 personas que ese mismo mapa identifica
            decidiendo a dónde va la plata, la universidad que más se repite es
            Oxford, con 22; después Stanford y Berkeley con 19 cada una, y
            Cambridge con 16{" "}
            <Fuente href="https://harrywaterman.com/fieldmap/">
              (AI Safety Field Map)
            </Fuente>
            . Son 60 de 187, así que no describen a la mayoría. Sí describen
            dónde queda el centro de gravedad, y ese centro explica por qué las
            preguntas del campo son las de quien construye estos sistemas y no
            las de quien los compra.
          </Parrafo>
          <Parrafo>
            Y comprar es lo que hacemos acá. Volvamos al pliego con el que abre
            este texto. Qué exigir antes de firmar, qué cláusula escribir y ante
            quién responde el proveedor si en dos años se descubre que el
            sistema le bajaba el puntaje a la gente de cierto municipio: esas
            son las preguntas de este texto, planteadas en formato
            administrativo. Para la primera no hacen falta los pesos del modelo.
            Hace falta poder correrlo contra casos que diseñe la entidad, y eso
            se pide en el pliego o no se pide nunca.
          </Parrafo>
          <Parrafo>
            Auditar lo que uno compra es un problema distinto al de auditar lo
            que uno entrena, y es el que a Colombia le toca resolver primero. No
            es el único frente que importa, pero es el que nadie está mirando
            por nosotros, mientras las reglas se escriben en compras públicas,
            en regulación sectorial y en acuerdos internacionales que después se
            aplican acá igual.
          </Parrafo>
          <Parrafo>
            Lo que hace falta es gente acá que entienda el tema lo suficiente
            para hacer las preguntas correctas cuando le toque firmar, y un
            lugar donde aprenderlo sin irse del país. Eso último es lo que
            estamos intentando construir.
          </Parrafo>
        </div>
      </article>

      <section
        id="recursos"
        className="bg-aisc-cream scroll-mt-24 px-6 pb-12 md:pb-14"
      >
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <h2 className="text-display-2 md:text-display-2-lg max-w-[560px] text-balance">
            Por dónde seguir
          </h2>
          <p className="text-body md:text-body-lg mt-4 max-w-[640px] text-aisc-ink">
            Los dos textos en los que se apoya este argumento y dos formas de
            entrar al campo. Casi todo el material está en inglés; en nuestros
            programas lo trabajamos en español.
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
                  <p className="text-meta md:text-meta-lg mt-3 text-aisc-ink">
                    {recurso.meta}
                  </p>
                  <p className="text-body-sm mt-2 max-w-[1080px] text-aisc-ink">
                    {recurso.body}
                  </p>
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
        <a
          className={CTA_LINK}
          href="https://cal.com/josegelves/meeting"
          target="_blank"
          rel="noopener noreferrer"
        >
          Agendar 20 minutos
        </a>
      </CtaPanel>
      <SiteFooter />
    </main>
  );
}
