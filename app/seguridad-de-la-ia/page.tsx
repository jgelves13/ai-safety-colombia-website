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
    "Por qué creemos que los avances de los últimos tres años son un problema de seguridad, qué tan de acuerdo está el campo, dónde puede estar mal nuestro argumento y qué se puede hacer desde Colombia.",
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
  { id: "por-que", label: "Por qué creemos que es un problema de seguridad" },
  { id: "desacuerdo", label: "Qué tan de acuerdo está el campo" },
  { id: "objeciones", label: "Objeciones y respuestas" },
  { id: "frentes", label: "Cómo se trabaja en esto" },
  { id: "colombia", label: "Y por qué desde Colombia" },
  { id: "recursos", label: "Por dónde seguir" },
];

const RESUMEN = [
  "Los sistemas de IA mejoraron muy rápido en los últimos tres años, y no solo en lo que se ve en redes sociales: también en exámenes técnicos difíciles y en sostener tareas largas sin que nadie los supervise. Abajo mostramos las dos mediciones con su fuente.",
  "Creemos que el problema de fondo es que estos sistemas se entrenan en vez de programarse. Nadie escribe las reglas que siguen, y hoy no hay una forma confiable de abrir uno y comprobar qué está persiguiendo en realidad.",
  "El campo no está de acuerdo sobre qué tan grave es. Entre los pronósticos más serios hay casi un orden de magnitud de diferencia, y hay científicos muy respetados que piensan que todo el argumento está mal planteado.",
  "Hay alrededor de 1.100 personas en el mundo dedicadas de tiempo completo a esto, casi ninguna en América Latina. Mientras tanto se están escribiendo las reglas sobre qué se le puede exigir a un sistema antes de usarlo.",
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

/** recursos externos reales, cada uno con lo que nos parece a nosotros */
const RECURSOS = [
  {
    title: "Curso de fundamentos de BlueDot",
    meta: "BlueDot Impact · inglés · gratuito",
    body: "Es el punto de entrada más usado del campo y el que solemos recomendar primero. Cinco semanas de lecturas y discusión, con una versión técnica y una de gobernanza.",
    href: "https://bluedot.org",
  },
  {
    title: "El perfil del problema de 80,000 Hours",
    meta: "80,000 Hours · inglés · lectura larga",
    body: "La versión extensa de casi todo lo que está acá, mejor argumentada. Nos apoyamos bastante en ella, aunque no coincidimos con todo: son más optimistas que nosotros sobre lo rápido que se puede entrar al campo.",
    href: "https://80000hours.org/problem-profiles/artificial-intelligence/",
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
          <div className="flex max-w-[820px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Empezar por aquí</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">
              Qué es la seguridad de la IA
            </h1>
            <p className="text-body md:text-body-lg max-w-[700px] text-aisc-sand/90">
              A finales de 2023 un grupo de investigadores publicó un examen de preguntas de doctorado hecho a
              propósito para que ningún sistema de IA pudiera aprobarlo. El mejor de ese año sacó 39 %. Hoy la marca va
              en 94,8 %. Este texto es nuestro intento de explicar qué hay detrás de ese salto y por qué creemos que es
              un problema de seguridad y no solamente una buena noticia.
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · actualizado en agosto de 2026 · unos 13 minutos de lectura
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
            Durante mucho tiempo esta discusión se hizo en abstracto, y no era culpa de nadie: no había gran cosa que
            medir. En los últimos tres años eso cambió lo suficiente como para poder mostrar curvas en vez de
            argumentos, y las dos que nos parecen más útiles son estas.
          </Parrafo>
          <Parrafo>
            La primera es GPQA. Es un conjunto de preguntas de biología, física y química que un grupo de doctorandos
            escribió en 2023 con una instrucción incómoda: que fueran difíciles incluso para alguien con Google
            abierto. Para saber si lo habían logrado contrataron a dos grupos de personas. A los doctores del área les
            fue bien, 69,7 % en el subconjunto más duro. Al otro grupo, gente capaz pero de fuera del campo, le dieron
            internet libre y más de media hora por pregunta, y se quedó en 34 %, a nueve puntos de lo que da responder
            al azar <Fuente href="https://arxiv.org/abs/2311.12022">(Rein et al., 2023)</Fuente>. Con eso quedaron
            tranquilos de que el examen medía algo.
          </Parrafo>
          <Parrafo>
            El mejor sistema disponible el año en que se publicó sacó 39 %. En diciembre de 2024 uno pasó por primera
            vez la marca de los doctores, y desde entonces la frontera siguió subiendo hasta quedar unos veinticinco
            puntos por encima de ella.
          </Parrafo>

          <Figura
            numero={1}
            titulo="Un examen que se diseñó para ser imposible, resuelto en veinte meses"
            pie="Cada punto es el mejor resultado publicado hasta esa fecha en GPQA Diamond, 198 preguntas de nivel doctoral. La línea punteada es el desempeño de los doctores del área que sirvieron de referencia."
            fuente="Epoch AI, «AI Benchmarking Hub» (CC BY)"
            href="https://epoch.ai/data/ai-benchmarking-dashboard"
          >
            <GraficaGpqa />
          </Figura>

          <Parrafo>
            La segunda medición se cita menos y a nosotros nos parece igual de importante. Epoch AI revisó 231 modelos
            de lenguaje publicados a lo largo de una década y estimó cuánto cómputo hacía falta, en cada momento, para
            alcanzar un nivel dado de desempeño. Esa cantidad se reduce a la mitad aproximadamente cada ocho meses, con
            un intervalo de confianza del 95 % entre cinco y catorce{" "}
            <Fuente href="https://epoch.ai/blog/algorithmic-progress-in-language-models">(Epoch AI, 2024)</Fuente>. Es
            decir que buena parte del avance no viene de construir centros de datos más grandes, sino de aprender a
            usarlos mejor, y eso pesa a la hora de discutir si el progreso se puede frenar cerrando la llave del
            hardware.
          </Parrafo>
          <Parrafo>
            Vale la pena decir qué no muestran estos gráficos. No muestran que un sistema entienda algo, solo que
            responde bien. Además los exámenes se saturan: cuando un benchmark llega al 95 % deja de dar información
            útil, y existe una discusión honesta sobre cuánto de la mejora es capacidad real y cuánto es que las
            preguntas terminaron filtrándose en los datos de entrenamiento. Nosotros creemos que la tendencia de fondo
            es real, y también creemos que es fácil leer de más en cualquiera de estas curvas tomada por separado.
          </Parrafo>

          {/* 2 ---------------------------------------------------------- */}
          <H2 id="por-que">Por qué creemos que es un problema de seguridad</H2>
          <Parrafo>
            Hay varias maneras de armar este argumento y no todas nos convencen igual. La que nos parece más sólida
            tiene tres pasos, y no hace falta comprarla entera: si alguno de los tres te parece débil, el resto del
            texto sigue teniendo sentido, solo que con menos urgencia.
          </Parrafo>

          <H3>1. Estos sistemas se entrenan, no se programan</H3>
          <Parrafo>
            Nadie escribe las reglas que sigue un modelo. Se define un objetivo de entrenamiento, se le muestran
            enormes cantidades de ejemplos y el sistema ajusta por su cuenta miles de millones de parámetros que nadie
            eligió uno por uno. Lo que se controla es la medida con la que se lo califica, y optimizar una medida no es
            lo mismo que cumplir la intención de quien la escribió.
          </Parrafo>
          <Parrafo>
            Esto suena abstracto hasta que se ve en la práctica. Los reportes técnicos que publican los propios
            laboratorios describen modelos que aprendieron a darle la razón al usuario porque eso subía la
            calificación, modelos que encontraron errores en el sistema de puntuación y los explotaron en vez de
            resolver la tarea, y modelos que se comportan distinto cuando detectan que los están evaluando. Ninguna de
            esas conductas se le enseñó a propósito, y ninguna se arregla haciendo el modelo más inteligente: son
            fallas de la medición. La interpretabilidad, que es el campo que intenta abrir un modelo y ver qué está
            haciendo por dentro, ha avanzado mucho en cinco años y todavía está muy lejos de poder responder esa
            pregunta con confianza.
          </Parrafo>

          <H3>2. Cada vez actúan más y se les revisa menos</H3>
          <Parrafo>
            La frontera del campo ya no son modelos que contestan preguntas. Son agentes que escriben y ejecutan
            código, usan herramientas, navegan y operan durante horas sin que nadie mire cada paso. METR intenta medir
            eso de forma directa preguntándose qué tan larga puede ser una tarea para que un modelo la complete con 50 %
            de éxito, y expresando esa duración en el tiempo que le tomaría a un profesional humano.
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
            METR estimó que esa duración se duplica cada siete meses y los datos de los últimos dos años van, si acaso,
            más rápido. Conviene tomarlo con cuidado: la medición se hace sobre tareas de software e investigación,
            que es donde tiene sentido comparar contra un profesional, y ni ellos afirman que se traslade limpiamente a
            otros oficios. Lo que sí nos parece difícil de discutir es la consecuencia práctica. Cuando un sistema
            actúa, un error deja de ser una respuesta equivocada y pasa a ser algo que ya ocurrió, y mientras más larga
            es la cadena de acciones menos viable resulta que un humano la acompañe paso a paso.
          </Parrafo>

          <H3>3. La investigación se acelera a sí misma</H3>
          <Parrafo>
            Buena parte del trabajo de construir IA consiste en programar, correr experimentos y analizar resultados,
            que es justo lo que estos sistemas hacen mejor cada año. Si esa retroalimentación se sostiene, el margen
            para detectar y corregir errores se estrecha en el peor momento posible.
          </Parrafo>
          <Parrafo>
            De los tres pasos, este es el que menos nos convence a nosotros mismos, y lo decimos porque es el que suele
            citarse con más seguridad de la que merece. Volvemos sobre él en las objeciones.
          </Parrafo>

          {/* 3 ---------------------------------------------------------- */}
          <H2 id="desacuerdo">Qué tan de acuerdo está el campo</H2>
          <Parrafo>
            Cuando uno se convence de un argumento así, lo sano es mirar si la gente que sabe del tema piensa lo mismo.
            La respuesta corta es que no hay consenso, y eso cambia bastante cómo hay que leer todo lo anterior.
          </Parrafo>
          <Parrafo>
            Del lado de la preocupación, en 2023 se encuestó a 2.778 investigadores que publican en las principales
            conferencias de IA. La mediana asignó 5 % de probabilidad a que la IA avanzada termine en la extinción
            humana o en una pérdida de control comparable, y el promedio fue 16,2 %{" "}
            <Fuente href="https://arxiv.org/abs/2401.02843">(Grace et al., 2024)</Fuente>. Entre 38 % y 51 % de ellos
            le dieron al menos 10 % de probabilidad a un desenlace así. Incluso entre quienes veían más probable un
            buen resultado, casi la mitad seguía asignando 5 % o más al peor.
          </Parrafo>
          <Parrafo>
            Del otro lado, los pronosticadores profesionales llegan a números mucho más bajos. El Forecasting Research
            Institute organizó en 2022 un torneo entre expertos en riesgos de IA y superpronosticadores, gente
            seleccionada por su historial de acertar en predicciones sobre temas que no domina. Los primeros estimaron
            3 % de probabilidad de extinción causada por IA para 2100; los segundos, 0,38 %{" "}
            <Fuente href="https://forecastingresearch.org/xpt">(Forecasting Research Institute, 2023)</Fuente>. El
            torneo se corrió antes de ChatGPT, así que es razonable pensar que hoy ambos grupos acortarían sus plazos.
          </Parrafo>

          <Figura
            numero={3}
            titulo="Casi un orden de magnitud entre gente que se dedica a estimar bien"
            pie="Probabilidad de extinción o pérdida severa de control causada por IA. Eje logarítmico. Las preguntas no son idénticas entre los dos estudios, así que la comparación es orientativa."
            fuente="Grace et al. (2024) y Forecasting Research Institute (2023)"
            href="https://arxiv.org/abs/2401.02843"
          >
            <GraficaEstimaciones />
          </Figura>

          <Parrafo>
            También hay desacuerdo de fondo, no solo de magnitudes. Yann LeCun, uno de los tres ganadores del premio
            Turing por el aprendizaje profundo, ha llamado disparatadas las preocupaciones por la extinción y sostiene
            que un sistema se puede diseñar para que sea seguro. Gary Marcus, Andrew Ng y Melanie Mitchell han
            expresado escepticismos parecidos por razones distintas. Vale la pena leerlos antes de decidir qué se
            piensa.
          </Parrafo>
          <Parrafo>
            Es posible que quienes trabajan en el campo exageren el peligro, y también es posible que lo subestimen; no
            tenemos forma de saber cuál de los dos sesgos manda. Lo que sacamos en limpio es más modesto de lo que
            suele decirse por ahí: gente que sabe del tema lleva veinte años sin resolver el problema técnico de fondo
            y no logra ponerse de acuerdo ni en el orden de magnitud del riesgo. Nos parece que eso alcanza para
            justificar que haya gente trabajando en ello y para exigir evidencia antes de desplegar, y no alcanza para
            afirmar que sabemos lo que va a pasar.
          </Parrafo>

          {/* 4 ---------------------------------------------------------- */}
          <H2 id="objeciones">Objeciones y respuestas</H2>
          <Parrafo>
            Estas son las cuatro que más nos hacen. Ninguna es tonta y en las cuatro creemos que quien objeta tiene
            parte de razón.
          </Parrafo>

          <H3>Los modelos todavía fallan en cosas obvias</H3>
          <Parrafo>
            Es cierto y va a seguir siéndolo un buen rato. Las capacidades no crecen parejo: un sistema que resuelve
            una pregunta de doctorado puede equivocarse contando letras o inventarse una cita con toda seguridad. Quien
            señala esto suele estar respondiendo a gente que promete demasiado, y hace bien.
          </Parrafo>
          <Parrafo>
            Donde no nos convence es en la conclusión. Un sistema que falla de forma impredecible es justamente el que
            no se puede certificar antes de usarlo. Si los errores fueran parejos se podrían acotar; el problema es que
            son muy capaces en unas cosas y frágiles en otras sin que se sepa de antemano en cuáles, y eso es difícil
            de manejar tanto si el progreso sigue como si se detiene mañana.
          </Parrafo>

          <H3>Esto distrae de los daños que ya existen</H3>
          <Parrafo>
            Sesgo en decisiones de crédito, vigilancia, desinformación, efectos sobre el empleo. Son problemas reales y
            presentes, y la objeción tiene una parte que no queremos suavizar: la atención y el presupuesto son
            finitos, y ha habido momentos en que el discurso del riesgo existencial se usó para saltarse discusiones
            sobre daños concretos que ya estaban ocurriendo.
          </Parrafo>
          <Parrafo>
            Dicho eso, en la práctica buena parte del trabajo se solapa. Saber medir de qué es capaz un sistema, poder
            auditarlo, exigir evidencia antes de desplegarlo y tener a quién reclamarle cuando falla sirve igual para
            un modelo que niega créditos hoy que para uno que administre infraestructura en diez años. Nosotros
            trabajamos en las dos cosas y no nos parece que haya que escoger.
          </Parrafo>

          <H3>El progreso se va a estancar</H3>
          <Parrafo>
            Puede pasar, y hay razones serias para pensarlo. El cómputo, la energía y los datos de buena calidad son
            cuellos de botella reales; la investigación que necesita experimentos en el mundo físico no se acelera solo
            con más código; y meterle más gente y más plata a un problema de investigación suele tener rendimientos
            decrecientes. Este es el escenario que más nos haría cambiar de opinión sobre el tercer paso del argumento.
          </Parrafo>
          <Parrafo>
            En contra juega el dato de Epoch que citamos arriba: si el desempeño se abarata a la mitad cada ocho meses
            por mejoras algorítmicas, no todo depende de construir centros de datos más grandes. Y aun si los frenos
            ganan, lo que sigue siendo un salto grande de productividad en vez de una espiral, ese mundo también
            necesita gente capaz de evaluar y auditar los sistemas que se están comprando. Solo que con más tiempo para
            aprender a hacerlo, que sería una buena noticia.
          </Parrafo>

          <H3>Nadie va a desplegar a propósito algo peligroso</H3>
          <Parrafo>
            De acuerdo, y el argumento no necesita que nadie sea malintencionado. Le bastan dos condiciones que ya se
            cumplen: que sea difícil verificar qué hace un sistema antes de soltarlo, y que haya presión competitiva
            para soltarlo igual. Los incidentes grandes de software rara vez ocurren porque alguien quisiera causarlos;
            ocurren porque el sistema hizo algo que nadie previó, en un momento en que nadie estaba mirando, y porque
            la persona que habría podido detenerlo no tenía cómo saber que hacía falta.
          </Parrafo>

          {/* 5 ---------------------------------------------------------- */}
          <H2 id="frentes">Cómo se trabaja en esto</H2>
          <Parrafo>
            Son tres frentes que se necesitan entre sí. Se puede entrar por cualquiera y no todos exigen formación
            técnica previa.
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
            Imagina que te toca firmar. Una entidad pública va a contratar un sistema para priorizar solicitudes de un
            programa social y a ti te corresponde revisar el pliego. Tienes el nombre del proveedor, una demo de
            veinte minutos y una promesa de exactitud del 92 % sobre un conjunto de prueba que armó el proveedor. No
            tienes los pesos del modelo, no tienes los datos con los que se entrenó y no tienes forma de correrlo
            contra casos que diseñes tú. ¿Qué le exiges? ¿Qué cláusula escribes? ¿Y quién responde si dentro de dos
            años se descubre que el sistema le bajaba el puntaje a la gente de cierto municipio?
          </Parrafo>
          <Parrafo>
            Esa pregunta suena administrativa y en buena medida es de lo que se trata este campo. Auditar lo que uno
            compra es un problema distinto al de auditar lo que uno entrena, y Colombia compra estos sistemas mucho más
            de lo que los construye. No es el único frente que importa, pero sí es el que nos toca de cerca y el que
            casi nadie afuera está mirando por nosotros.
          </Parrafo>
          <Parrafo>
            La otra razón es de escala. Una estimación de 2025 cuenta cerca de 1.100 personas trabajando de tiempo
            completo en seguridad de la IA en todo el mundo, unas 600 en trabajo técnico y 500 en gobernanza y
            estrategia, contra unas 400 tres años antes{" "}
            <Fuente href="https://forum.effectivealtruism.org/posts/nH8SnriBBhehsuvvo/ai-safety-field-growth-analysis-2025">
              (AI Safety Field Growth Analysis, 2025)
            </Fuente>
            . Crece rápido y sigue siendo menos gente de la que trabaja en un solo ministerio. Casi ninguna de esas
            1.100 personas está en América Latina, mientras las reglas se escriben en compras públicas, en regulación
            sectorial y en acuerdos internacionales que después se aplican acá igual.
          </Parrafo>
          <Parrafo>
            No creemos que hagan falta héroes ni genios. Hace falta que haya gente acá que entienda el tema lo
            suficiente para hacer buenas preguntas, y que exista un lugar donde aprenderlo sin tener que irse del país.
            Eso último es más o menos todo lo que estamos intentando construir.
          </Parrafo>
        </div>
      </article>

      <section id="recursos" className="bg-aisc-cream scroll-mt-24 px-6 pb-12 md:pb-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[12px] bg-aisc-sand px-6 py-12 text-aisc-ink md:px-10 lg:py-[70px]">
          <span aria-hidden="true" className="mb-6 block h-px w-12 flex-none bg-aisc-coral" />
          <h2 className="text-display-2 md:text-display-2-lg max-w-[560px] text-balance">Por dónde seguir</h2>
          <p className="text-body md:text-body-lg mt-4 max-w-[640px] text-aisc-ink">
            Tres recursos que solemos recomendar, con lo que nos parece de cada uno. Buena parte del material del campo
            está en inglés; en nuestros programas lo trabajamos en español.
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
        body="Al principio lo más útil suele ser hablar con alguien que ya lleve un tiempo, aunque solo sea para descartar el tema. Después vienen los programas."
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
