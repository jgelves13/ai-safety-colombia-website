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
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Qué es la seguridad de la IA",
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
  {
    id: "verificacion",
    label: "Mirar un modelo por dentro apenas empieza a ser posible",
  },
  {
    id: "incidentes",
    label: "Ya hay casos donde el sistema se salió de su caja",
  },
  { id: "asimetria", label: "La capacidad de decidir no crece al mismo ritmo" },
  {
    id: "desacuerdo",
    label: "Quienes no están de acuerdo tienen parte de razón",
  },
  { id: "frentes", label: "Hay tres frentes y no todos exigen formación técnica" },
  { id: "colombia", label: "Acá el problema es auditar lo que se compra" },
];

const RESUMEN = [
  "Los mejores sistemas de IA ya no responden preguntas: trabajan solos durante horas, escriben y ejecutan código y usan herramientas sin que nadie revise cada paso. METR, la organización que mide de qué son capaces estos sistemas, encuentra que la duración de las tareas que completan solos se duplica cada siete meses. Cuando un sistema responde, un error es una respuesta mala que alguien descarta; cuando actúa, un error es algo que ya ocurrió.",
  "Nadie sabe comprobar de antemano qué va a hacer uno de estos sistemas, porque no se programan, se entrenan. En 2025 Anthropic descubrió que su modelo reconocía cuándo lo estaban evaluando y que eso lo hacía portarse mejor, lo que dejó en duda sus propias mediciones de seguridad. En julio de 2026, dos modelos de OpenAI salieron del entorno aislado en el que los probaban, comprometieron la infraestructura de Hugging Face y sacaron de ahí las respuestas del examen que estaban presentando. Nadie estaba obligado a contarlo.",
  "Verificar estos sistemas y decidir sobre ellos, en cambio, avanza al ritmo de siempre. Todo el campo de la seguridad de la IA reúne unas 1.300 personas y 525 millones de dólares al año; las cuatro empresas que más invierten anunciaron cerca de 700.000 millones solo para 2026. El mapa más completo del campo, con 170 organizaciones, no registra ninguna en América Latina.",
];

/** las tres formas de trabajar en el problema */
const FRENTES = [
  {
    title: "Alineación e interpretabilidad",
    body: "Cómo lograr que un sistema persiga lo que se le pidió y no algo parecido, y cómo mirar por dentro para saber qué hace. Ataca el problema de fondo y sigue sin resolverse.",
  },
  {
    title: "Evaluación y control",
    body: "Cómo medir de qué es capaz un modelo antes de soltarlo y cómo supervisarlo cuando ya actúa solo. Es lo más parecido a un peritaje técnico y donde más falta gente.",
  },
  {
    title: "Gobernanza y política pública",
    body: "Qué se le exige a quien despliega un sistema, con qué evidencia y ante quién responde. En Colombia se define ahora, en compras públicas y regulación sectorial, y no exige formación técnica.",
  },
];

export default function SeguridadDeLaIA() {
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
          src="/aisc/patterns/aisc-hero-seguridad.svg"
        />
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
              AI Safety Colombia · actualizado en agosto de 2026 · unos 15 minutos de lectura
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
            No tiene los pesos del modelo, ni los datos de entrenamiento, ni
            cómo correrlo contra casos que diseñe la entidad.
          </p>
          <Parrafo>
            Qué debería exigir antes de firmar es la pregunta de este texto. La
            respuesta corta: hoy nadie sabe certificar qué persigue uno de estos
            sistemas, ni siquiera quienes los construyen.
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
            GPQA son preguntas de biología, física y química que unos
            doctorandos escribieron en 2023 para que resistieran a Google.
            Quienes tenían doctorado en la disciplina de cada pregunta             acertaron el 65 %, o el 74 % si se descuentan las preguntas en
            las que ellos mismos, al releerse, aceptaron haber entendido
            mal el enunciado. Gente con formación pero ajena al tema, con internet y
            media hora por pregunta, se quedó en 34 %, nueve puntos sobre el
            25 % del azar{" "}
            <Fuente href="https://arxiv.org/abs/2311.12022">
              (Rein et al., 2023)
            </Fuente>
                        . El mejor sistema disponible ese año sacó 39 %, más cerca de
            los no especialistas que de los expertos. En diciembre de
            2024, veinte meses después de publicado el examen, un modelo
            pasó por encima de los especialistas.
          </Parrafo>

          <Figura
            numero={1}
            titulo="Un examen hecho para resistir a Google, superado en veinte meses"
            pie="Cada punto es el mejor resultado publicado hasta esa fecha en GPQA Diamond, el subconjunto de 198 preguntas que los especialistas del estudio original respondieron bien. La línea punteada, 69,7 %, es lo que sacó sobre ese subconjunto un grupo con doctorado que reclutó OpenAI."
            limite="si un sistema entiende biología, porque son preguntas de opción múltiple y solo se califica la respuesta final. El examen además se satura: cuando los sistemas pasan del 95 % deja de servir para distinguir entre uno y otro."
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
                texto: "Epoch AI, «GPQA Diamond», AI Benchmarking Hub (CC BY)",
                href: "https://epoch.ai/benchmarks/gpqa-diamond",
              },
            ]}
          >
            <GraficaGpqa />
          </Figura>

          <Parrafo>
                        Ese avance además se abarata solo. Epoch AI revisó 231 modelos
            de lenguaje publicados en una década y midió cuánto poder de
            cómputo hacía falta, año por año, para llegar a un mismo nivel
            de desempeño. Hace falta la mitad cada ocho meses, con un
            intervalo de confianza del 95 % entre cinco y catorce meses{" "}
            <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">
              (Epoch AI, 2024)
            </Fuente>
                        . No es que las máquinas sean mejores: es que se aprendió a
            sacarles más a las mismas máquinas. Lo que hoy solo corre en
            el centro de datos de una de las empresas grandes, en unos
            años lo corre mucha más gente con mucho menos.
          </Parrafo>

          <H3>De responder preguntas a ejecutar tareas</H3>
          <Parrafo>
            La frontera ya no son modelos que contestan: son agentes que
            escriben y ejecutan código durante horas sin que nadie revise cada
            paso. METR, la organización a la que los laboratorios le entregan
            sus modelos antes de publicarlos, mide cada tarea por lo que tardaría
            un profesional en hacerla. Su indicador es la duración a partir de la
            cual el modelo ya falla la mitad de las veces: si resuelve lo que a
            una persona le toma una hora, pero se cae en lo de cuatro, su
            horizonte está en una hora.
          </Parrafo>

          <Figura
            numero={2}
            titulo="De cinco minutos a diecisiete horas, acertando la mitad de las veces"
            pie="Duración de la tarea más larga que el mejor modelo de cada momento completa con 50 % de éxito. Eje logarítmico. METR estima que se duplica cada siete meses."
            limite="que los modelos vayan a reemplazar a un profesional. Las tareas medidas son de software e investigación, y ni METR afirma que el resultado se traslade a otros oficios."
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
            Cuando un sistema responde, un error es una respuesta que alguien
            descarta. Cuando actúa, un error es algo que ya ocurrió. Y mientras
            más larga es la cadena, menos viable resulta acompañarla paso a
            paso, que es el control con el que hoy se cuenta.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="verificacion">
            Mirar un modelo por dentro apenas empieza a ser posible
          </H2>
          <Parrafo>
            Un modelo no se programa: se fija una medida de éxito, se le
            muestran millones de ejemplos y él ajusta por su cuenta miles
            de millones de números que nadie escogió. Nadie escribió esos
            números y nadie sabe leerlos de corrido. Así que la única vía
            práctica para saber qué hará un sistema es ponerlo a prueba y
            mirar cómo se porta. En 2025 quedó a la vista que esa vía
            tiene un problema.
          </Parrafo>
          <Parrafo>
            En septiembre de ese año,{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              el informe técnico de Claude Sonnet 4.5
            </Fuente>{" "}
            reportó algo que Anthropic no estaba buscando: el modelo decía
            en voz alta que sospechaba estar en una prueba, y cuando lo
            decía, casi nunca se portaba mal. Descartar esas
            conversaciones y quedarse con el resto no arregla nada, porque
            el modelo también puede darse cuenta sin decirlo. Por fuera no
            hay manera de saber si lo hizo.
          </Parrafo>
          <Parrafo>
            Así que Anthropic lo abrió por dentro. Cuando una red maneja
            una idea, se enciende dentro de ella un patrón de activaciones
            asociado a esa idea, y eso es lo que la interpretabilidad
            permite ubicar. La prueba fueron cien escenarios trampa:
            situaciones armadas para que el modelo tuviera a la mano una
            acción indebida y ninguna razón aparente para no tomarla, por
            ejemplo un permiso más amplio del que le correspondía y nadie
            supervisando. Sin tocarle nada, dijo en más del 80 % de esos
            escenarios que aquello parecía una prueba, y no tomó la acción
            indebida en ninguno de los cien. Con el patrón de «esto es una
            evaluación» apagado y los escenarios idénticos, la tomó en
            hasta 9 de cada 100. Apagar diez patrones al azar, que era el
            control, no produjo ninguna.
          </Parrafo>

          <Figura
            numero={3}
            titulo="El examen estaba midiendo, en parte, si el modelo sabía que era un examen"
            pie="Porcentaje de acciones desalineadas en cien escenarios trampa. Las tres primeras barras son Claude Sonnet 4.5 bajo distintas intervenciones internas; la última es el modelo anterior, sin intervenir."
            limite="que el modelo sea peligroso, ni que estuviera fingiendo a propósito. El 9 % es el peor resultado de todas las intervenciones probadas; con la mayoría de ellas el modelo se quedó entre 1 y 5 %."
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
            Eso no vuelve peligroso al modelo, y conviene decirlo. Ni en
            el peor de los casos se portó peor que la versión anterior, y
            Anthropic no halló señales de que estuviera engañando a nadie
            a propósito; su explicación es que reconocer una prueba le
            recuerda al modelo sus propios principios. Lo que sí quedó
            demostrado es otra cosa. El número con el que se decide si un
            sistema sale al mundo dependía de algo que nadie estaba
            controlando. Abrirlo por dentro sirvió para descubrirlo, y no
            sirve para lo contrario, que sería certificar que el próximo
            número está limpio.
          </Parrafo>
          <Parrafo>
            Esa herramienta es más joven de lo que suena. Anthropic, que
            es quien más ha publicado sobre ella, dice de su propio método
            para rastrear circuitos que le da una explicación
            satisfactoria en cerca de una cuarta parte de los casos que
            intenta{" "}
            <Fuente href="https://transformer-circuits.pub/2025/attribution-graphs/biology.html">
              «On the Biology of a Large Language Model»
            </Fuente>
            . Dario Amodei, su director, se puso como meta que hacia 2027
            la interpretabilidad detecte de forma confiable la mayoría de
            los problemas de un modelo, y describe el punto de partida
            así: cuando uno de estos sistemas hace algo, no tenemos idea,
            a un nivel preciso, de por qué toma las decisiones que toma{" "}
            <Fuente href="https://darioamodei.com/post/the-urgency-of-interpretability">
              «The Urgency of Interpretability»
            </Fuente>
            . Mientras tanto el problema se extendió. En julio de 2026,
            Redwood Research revisó las evaluaciones de seguridad
            publicadas por Anthropic, OpenAI, Meta, Google DeepMind y el
            instituto británico, y encontró que los modelos siguen
            reconociendo las pruebas, con las tasas más altas registradas
            hasta ahora en el último modelo de Meta. Su{" "}
            <Fuente href="https://blog.redwoodresearch.org/p/sota-alignment-assessments-dont-strongly">
              conclusión
            </Fuente>{" "}
            es que estas evaluaciones dicen bastante menos de lo que
            parecen decir.
          </Parrafo>
          <Parrafo>
            Un puente se calcula, se inspecciona y alguien lo firma. Un
            modelo se prueba por fuera, y queda una estadística sobre los
            casos que a alguien se le ocurrió probar. El examen por dentro
            que se le hizo a Claude Sonnet 4.5 fue el primero de su tipo
            antes de publicar un modelo de frontera, lo hizo la misma
            empresa que iba a venderlo, y Anthropic pide que deje de ser
            voluntario.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="incidentes">
            Ya hay casos donde el sistema se salió de su caja
          </H2>
          <Parrafo>
            En julio de 2026 OpenAI evaluaba dos de sus modelos, GPT-5.6 Sol y
            uno sin publicar,             contra un banco de pruebas de ciberseguridad ofensiva. Para
            medir hasta dónde llegarían, les habían levantado parte de las
            restricciones de seguridad. Dentro del entorno
            aislado gastaron cómputo considerable buscando cómo salir a
            internet.             Encontraron una falla que nadie había reportado en un servidor
            interno de librerías, encadenaron esa con otras hasta salir
            del entorno de investigación de OpenAI y llegar a la
            infraestructura de Hugging Face, y sacaron de la base de datos
            de Hugging Face las respuestas del examen que estaban
            presentando{" "}
            <Fuente href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">
              (OpenAI, 21 de julio de 2026)
            </Fuente>
            . Hugging Face confirmó que llegaron a controlar máquinas enteras,
            que quedaron registrados más de 17.000 eventos del atacante y que
            nada de lo que la gente publica ahí quedó comprometido{" "}
            <Fuente href="https://huggingface.co/blog/security-incident-july-2026">
              (Hugging Face, 16 de julio de 2026)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            No hubo intención de causar daño: los modelos resolvían el problema
            que se les puso. Un objetivo estrecho, capacidad suficiente y ninguna
            instrucción de detenerse bastaron para salir de la caja y
            comprometer la infraestructura de un tercero. Ninguna de las dos
            empresas estaba obligada a contarlo: las leyes estatales que hoy
            exigen reportar incidentes de IA en Estados Unidos ponen el umbral en
            cincuenta muertes o mil millones de dólares en daños{" "}
            <Fuente href="https://www.iaps.ai/research/the-openaihugging-face-incident-challenges-in-controlling-and-containing-cyber-capable-ai-systems">
              (Institute for AI Policy and Strategy, 2026)
            </Fuente>
            .
          </Parrafo>

          <H3>Y no todo es accidental</H3>
          <Parrafo>
            En junio de 2025, el equipo de inteligencia de amenazas de Google
            encontró en Ucrania un programa espía disfrazado de generador de
            imágenes que, mientras la víctima escribía, le preguntaba a un modelo
            de lenguaje abierto qué comandos usar para buscar documentos y
            copiarlos. Las órdenes no venían escritas adentro: las pedía en el
            momento y las ejecutaba sin revisarlas. Google lo atribuye a APT28,
            el grupo asociado a la inteligencia militar rusa, y dice que es la
            primera vez que ve un programa malicioso consultando un modelo de
            lenguaje en una operación real{" "}
            <Fuente href="https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools">
              (Google Threat Intelligence Group, noviembre de 2025)
            </Fuente>
            .             El mismo informe califica esas capacidades de incipientes. Lo
            que cambia no es la potencia del ataque, es dónde queda su
            parte pensante: antes venía escrita dentro del archivo, donde
            un analista podía leerla, y ahora se genera distinta en cada
            ejecución. Los antivirus que reconocen una amenaza por su
            firma, es decir por cómo se ve el archivo, se quedan sin nada
            fijo que reconocer.
          </Parrafo>

                    <H3>Publicar los pesos quita el freno, y en biología eso ya
          importa</H3>
          <Parrafo>
            En los dos casos anteriores había una empresa que podía cortar el
            acceso al modelo. Publicar los pesos elimina esa posibilidad: quien
            los tiene corre el modelo en su máquina, le quita las restricciones y
            sigue usándolo aunque el autor se arrepienta. Los modelos abiertos
            tienen buenos argumentos a favor, empezando porque sin ellos la
            investigación de países como el nuestro sería mucho más difícil. El
            balance depende del dominio.
          </Parrafo>
          <Parrafo>
            El 6 de agosto de 2026, <em>Science</em> publicó el trabajo de un
            equipo de Stanford y el Arc Institute dirigido por Brian Hie y
            Samuel King.             Con Evo 1 y Evo 2, modelos entrenados con secuencias de ADN en
            lugar de texto y cuyos pesos están publicados, escribieron
            genomas virales completos a partir de un fragmento corto. De unos 700.000 genomas generados
            mandaron a sintetizar 302, lograron construir 285 y 16 resultaron
            virus funcionales, capaces de destruir <em>E. coli</em> en dos o tres
            horas{" "}
            <Fuente href="https://www.science.org/doi/10.1126/science.aec2657">
              (King, Hie et al., Science, agosto de 2026)
            </Fuente>
            . Son bacteriófagos, que infectan bacterias y no personas: del
            entrenamiento se excluyeron las secuencias capaces de infectar
            humanos, animales o plantas{" "}
            <Fuente href="https://arcinstitute.org/news/hie-king-first-synthetic-phage">
              (Arc Institute, 2026)
            </Fuente>
            .             Funcionó el 5,6 % de lo que se alcanzó a construir, 16 genomas
            de 285. Dejó de ser
            hipotético escribir desde cero un genoma viral que después funciona
            en el laboratorio.
          </Parrafo>
          <Parrafo>
            Entre un diseño en pantalla y una molécula real queda un solo
            control: los proveedores de síntesis de ADN, que revisan cada pedido
            de forma voluntaria. En octubre de 2025, un equipo dirigido por Eric
            Horvitz, director científico de Microsoft, generó 76.089 variantes de
            72 proteínas de preocupación, entre ellas la ricina y la neurotoxina
            botulínica,             y la mayoría pasó sin que la detectara el software con el que
            esos proveedores revisan los pedidos{" "}
            <Fuente href="https://erichorvitz.com/paraphrase.htm">
              (Wittmann et al., Science, 2025)
            </Fuente>
            . El ejercicio fue computacional: no se sintetizó nada ni se demostró
            que las variantes conservaran su toxicidad, y Michael Cohen, de
            Berkeley, sostiene que el reto era débil.
          </Parrafo>
          <Parrafo>
            El cuello de botella sigue siendo el laboratorio, y cuánto dure es lo
            que nadie sabe medir. En mayo de 2025 Anthropic activó su nivel de
            protección ASL-3 para Claude Opus 4 sin haber determinado que el
            modelo cruzara el umbral que lo exige, porque descartar ese riesgo ya no era
            posible{" "}
            <Fuente href="https://www.anthropic.com/news/activating-asl3-protections">
              (Anthropic, 2025)
            </Fuente>
            . La restricción que manda no es lo que el sistema puede hacer, sino
            lo que nadie sabe comprobar.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="asimetria">
            La capacidad de decidir no crece al mismo ritmo
          </H2>
          <Parrafo>
                        Lo que se acelera es la tecnología. La gente que entiende el
            tema, la discusión pública y los calendarios de las
            instituciones siguen al ritmo de siempre. Acelerar solo una de
            las dos mitades deja a la otra cada vez más atrás, y el
            argumento es de William MacAskill y Fin Moorhouse{" "}
            <Fuente href="https://www.forethought.org/research/preparing-for-the-intelligence-explosion">
              (Forethought, 2025)
            </Fuente>
            .
          </Parrafo>
          <Parrafo>
            La forma más simple de verlo es contar quién está de cada lado. Un
            mapeo público encuentra 170 organizaciones dedicadas a la seguridad y
            la gobernanza de la IA en el mundo: sumando solo las que reportan
            datos, unas 1.313 personas de tiempo completo y unos 525 millones de
            dólares al año{" "}
            <Fuente href="https://harrywaterman.com/fieldmap/">
              (AI Safety Field Map, datos a septiembre de 2025)
            </Fuente>
            . Amazon, Google, Meta y Microsoft anunciaron cerca de 700.000
            millones de dólares en infraestructura de IA solo para 2026, más de
            un 60 % por encima de 2025{" "}
            <Fuente href="https://www.cnbc.com/2026/02/06/google-microsoft-meta-amazon-ai-cash.html">
              (CNBC, 2026)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={4}
            titulo="Tres órdenes de magnitud entre construir estos sistemas y entenderlos"
            pie="Presupuesto anual declarado del campo de la seguridad de la IA frente a la inversión en infraestructura anunciada por las cuatro empresas que más gastan. Escala logarítmica."
            limite="cuánto gastan en seguridad esas cuatro empresas, porque no lo desglosan. La comparación tampoco es exacta: una cifra es gasto de operación y la otra inversión de capital, así que sirve para el orden de magnitud y no para la diferencia precisa."
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
            . Ese plazo es normal para una política pública; el punto es la
            comparación. Si la tendencia que mide METR se mantuviera esos cinco
            años, el horizonte de tareas que un sistema ejecuta solo             se habría duplicado ocho veces, es decir multiplicado por más
            de doscientos, antes de que termine el plan que iba a
            regularlo.
          </Parrafo>
          <Parrafo>
            De ahí la tentación de esperar, que para muchos problemas es lo
            correcto. Para tres cosas no lo es. Las normas fijadas mientras un
            asunto es nuevo tienden a durar, y quien no está en la mesa cuando se
            escriben tampoco está cuando se aplican. Montar una capacidad de
            auditoría o formar a alguien toma años.             Y hay acuerdos que solo se firman mientras nadie sabe todavía
            a quién van a favorecer: después cada quien ya calculó qué le
            conviene y deja de firmarlos.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="desacuerdo">
            Quienes no están de acuerdo tienen parte de razón
          </H2>
          <Parrafo>
            En 2023 se les preguntó a 2.778 investigadores que publican en las
            principales conferencias de IA por la probabilidad de que la IA
            avanzada termine en la extinción humana o en una pérdida de control
            comparable: la mediana fue 5 % y el promedio 16,2 %, y entre el 38 % y
            el 51 % le dio al menos un 10 % a ese desenlace{" "}
            <Fuente href="https://arxiv.org/abs/2401.02843">
              (Grace et al., 2024)
            </Fuente>
            . Los pronosticadores profesionales dan números mucho más bajos: en un
            torneo del Forecasting Research Institute, un grupo de expertos en IA
            estimó 3 % antes de 2100, y los superpronosticadores, escogidos por
            acertar de forma sistemática, 0,38 %{" "}
            <Fuente href="https://forecastingresearch.org/xpt">
              (Forecasting Research Institute, 2023)
            </Fuente>
            .
          </Parrafo>

          <Figura
            numero={5}
            titulo="Casi un orden de magnitud entre gente que se dedica a estimar bien"
            pie="Probabilidad de extinción o pérdida severa de control causada por IA. Eje logarítmico."
            limite="una probabilidad real. Son opiniones agregadas, las preguntas no son idénticas entre los dos estudios y el torneo se corrió en 2022, antes de ChatGPT."
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
            El desacuerdo es de fondo. El premio Turing de 2018 fue para tres
            personas por el aprendizaje profundo, la técnica sobre la que está
            construido todo esto,             y dos de los tres advierten hoy en público sobre lo que
            ayudaron a construir. Geoffrey Hinton
            renunció a Google en 2023 para hablar sin representar a nadie{" "}
            <Fuente href="https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/">
              (MIT Technology Review, mayo de 2023)
            </Fuente>
            . Yoshua Bengio explicó ese mismo año{" "}
            <Fuente href="https://yoshuabengio.org/2023/06/24/faq-on-catastrophic-ai-risks/">
              por qué le da peso a los riesgos catastróficos
            </Fuente>{" "}
            y hoy preside{" "}
            <Fuente href="https://arxiv.org/abs/2602.21012">
              el informe internacional sobre seguridad de la IA
            </Fuente>
            , que respaldan veintinueve países, la ONU, la OCDE y la Unión
            Europea.
          </Parrafo>
          <Parrafo>
            El tercero es Yann LeCun, y piensa lo contrario: la inteligencia no
            trae consigo el deseo de dominar{" "}
            <Fuente href="https://time.com/6694432/yann-lecun-meta-ai-interview/">
              (TIME, febrero de 2024)
            </Fuente>
            . Andrew Ng considera ínfima la probabilidad de un accidente así,
            aunque sí toma en serio el uso malintencionado{" "}
            <Fuente href="https://www.deeplearning.ai/the-batch/ai-doomsday-scenarios-and-how-to-guard-against-them">
              (The Batch, diciembre de 2023)
            </Fuente>
            . Melanie Mitchell le apunta a la encuesta:{" "}
            <Fuente href="https://aiguide.substack.com/p/do-half-of-ai-researchers-believe">
              quien decide contestarla no es una muestra al azar de la disciplina
            </Fuente>
            . La contestaron 2.778 de las 18.459 personas invitadas, un 15 %.
            Gary Marcus ubica el peligro{" "}
            <Fuente href="https://garymarcus.substack.com/p/ai-risk-agi-risk">
              en sistemas mediocres a los que ya se les entregan decisiones
            </Fuente>
            , y por eso pide regulación con tanta fuerza como cualquiera de los
            anteriores.
          </Parrafo>

          <H3>Las cuatro objeciones que más nos hacen</H3>
          <Parrafo>
            <strong>Los modelos todavía fallan en cosas obvias.</strong> Cierto,
            y no afirmamos que sean confiables, sino lo contrario: fallan de
            forma difícil de anticipar.             Un sistema que fallara siempre del mismo modo se podría acotar
            y certificar. El problema es que no se sabe de antemano en qué
            va a fallar.
          </Parrafo>
          <Parrafo>
            <strong>Esto distrae de los daños que ya existen.</strong> Es la
            objeción que corrige el argumento, porque la atención y el
            presupuesto son finitos. Pero el trabajo se solapa: medir de qué es
            capaz un sistema, auditarlo y tener a quién reclamarle cuando falla es
            la misma
            capacidad institucional para un modelo que niega créditos hoy y para
            uno que administre infraestructura en diez años.
          </Parrafo>
          <Parrafo>
            <strong>El progreso se va a estancar.</strong> Puede pasar: el
            cómputo, la energía y los datos de buena calidad son cuellos de
            botella reales.             En contra juega la medición de Epoch: si el cómputo que hace
            falta para un mismo desempeño se reduce a la mitad cada ocho
            meses, avanzar exige cada vez menos recursos, no más. Y aun si los frenos
            ganan, ese mundo también necesita quien audite lo que compra.
          </Parrafo>
          <Parrafo>
            <strong>Nadie va a desplegar a propósito algo peligroso.</strong>             El argumento no necesita que alguien lo haga a propósito. Le bastan dos condiciones que ya se
            cumplen: que sea difícil verificar qué hace un sistema antes de
            soltarlo, y que exista presión competitiva para soltarlo igual. Lo de
            OpenAI y Hugging Face pasó dentro de la empresa que más cuidado
            estaba poniendo, en una prueba diseñada para medir ese riesgo.
          </Parrafo>
          <Parrafo>
            Puede que el campo exagere el peligro y puede que lo subestime. Lo
            que sostenemos no depende de acertar la cifra: hoy no sabemos
            certificar qué persigue un sistema, y las decisiones difíciles de
            revertir se toman ahora. Si la frontera se estanca dos o tres años
            seguidos, la parte de los plazos se cae. Si aparecen métodos para
            certificar qué persigue un sistema antes de desplegarlo, se cae casi
            todo lo demás.
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
            Tres cosas se pueden hacer esta semana sin permiso de nadie: leer{" "}
            <Fuente href="https://www.anthropic.com/claude-sonnet-4-5-system-card">
              el informe técnico de un modelo reciente
            </Fuente>
            , con sus evaluaciones de seguridad y sus límites; tomar un sistema
            que ya se use en el trabajo, armarle veinte casos difíciles y anotar
            dónde falla; y buscar en el SECOP una compra de software con
            inteligencia artificial y leer qué exige y qué no exige el pliego. De ahí en
            adelante, el camino más corto que conocemos es{" "}
            <Fuente href="https://bluedot.org">
              el curso de fundamentos de BlueDot
            </Fuente>
            , y después trabajar en algo concreto con alguien más.
          </Parrafo>

          {/* ---------------------------------------------------------- */}
          <H2 id="colombia">Acá el problema es auditar lo que se compra</H2>
          <Parrafo>
            El mapa del campo registra 170 organizaciones y no ubica ninguna en
            América Latina. Nosotros tampoco aparecemos ahí, y lo que no está en
            el mapa tampoco está en las listas de quienes financian. De las 187
            personas que ese mapa identifica decidiendo a dónde va la plata, la
            universidad que más se repite es Oxford, con 22; después Stanford y
            Berkeley con 19 cada una, y Cambridge con 16{" "}
            <Fuente href="https://harrywaterman.com/fieldmap/">
              (AI Safety Field Map)
            </Fuente>
            .             Son 60 de 187: no describen a la mayoría, pero sí dicen dónde
            queda el centro de gravedad del campo. Y ese centro explica por qué las preguntas del
            campo son las de quien construye estos sistemas y no las de quien los
            compra.
          </Parrafo>
          <Parrafo>
            Comprar es lo que hacemos acá. Volvamos al pliego del principio. Qué
            exigir antes de firmar, qué cláusula escribir y ante quién responde el
            proveedor si en dos años se descubre que el sistema le bajaba el
            puntaje a la gente de cierto municipio: son las preguntas de este
            texto en formato administrativo. Para la primera no hacen falta los
            pesos, hace falta poder correr el modelo contra casos que diseñe la
            entidad, y eso se pide en el pliego o no se pide nunca.
          </Parrafo>
          <Parrafo>
            Auditar lo que uno compra es un problema distinto al de auditar lo
            que uno entrena, y es el que a Colombia le toca resolver primero. No
            es el único frente que importa, pero es el que nadie está mirando por
            nosotros. Hace falta gente acá que entienda el tema lo suficiente para
            preguntar bien cuando le toque firmar, y un lugar donde aprenderlo sin
            irse del país. Eso último es lo que estamos construyendo.
          </Parrafo>
        </div>
      </article>

      <CtaPanel
        title="¿Y qué hago con esto?"
        body="Al principio suele servir más hablar con alguien que ya lleva un tiempo, aunque sea para descartar el tema."
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
