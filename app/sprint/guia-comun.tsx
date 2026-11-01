import { APART_SPRINT_URL } from "./datos";

/* Lo que comparten la guía del hub y la guía de quien participa en línea.

   Las dos páginas cuentan el mismo sprint: las mismas lecturas, las mismas
   charlas, los mismos cinco frentes, la misma plantilla de reporte y los mismos
   premios. Todo eso vive acá una sola vez, porque un dato que se corrige en un
   archivo y no en el otro es peor que no tenerlo. Lo que sí cambia entre las dos
   (la dirección, el transporte, el hospedaje, la comida, los teléfonos del
   equipo) se queda en cada página.

   Nada de rayas largas, tampoco en los comentarios. */

/* La entrega la fija Apart en AoE (UTC-12), que es la convención de todos sus
   sprints. Traducida a Colombia cae el lunes por la mañana, y esa es la hora
   que de verdad importa acá: en junio varios creyeron que cerraba el domingo. */
export const ENTREGA_AOE = "domingo 13 de septiembre, 11:59 p. m. AoE";
export const ENTREGA_LOCAL =
  "lunes 14 de septiembre, 6:59 a. m. hora de Colombia";

export const DISCORD = "https://discord.gg/XswWBvugYs";
export const CODIGO_APART = "https://apartresearch.com/code-of-conduct";
export const CORREO = "equipo@aisafetycolombia.org";
export const SOPORTE_APART = "sprints@apartresearch.com";
export const PAGINA_HUB = "/sprint";

export const ENLACE =
  "text-aisc-forest underline decoration-aisc-forest/40 underline-offset-4 transition-colors hover:decoration-aisc-forest";
/* Lecturas de preparación. El núcleo son dos y el resto se lee después de que
   el equipo escoge frente el viernes, así que la sección se parte en esos dos
   tiempos y no en una lista sola de veinte enlaces.

   Al informe de METR se enlaza el blog y no el PDF: son el mismo texto de
   32.049 palabras, pero cada título del blog tiene ancla con slug. Nunca
   #page=N, que se rompe si METR repagina. */
export const HF_TIMELINE =
  "https://huggingface.co/blog/agent-intrusion-technical-timeline";
export const METR_INFORME =
  "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/";
export const METR_PROPENSIONES =
  "https://metr.org/blog/2026-07-28-investigating-ai-propensities-after-incidents/";
export const AISI_TRAMPA =
  "https://www.aisi.gov.uk/blog/cheating-behaviour-in-frontier-model-evaluations";
export const OPENAI_INCIDENTE =
  "https://openai.com/index/hugging-face-model-evaluation-security-incident/";
export const ANTHROPIC_INCIDENTES =
  "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals";
export const ELASTIC_DETECCION =
  "https://www.elastic.co/security-labs/ai-agent-attack-detection-hugging-face-breach";
export const PLANTILLA_UE =
  "https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai";
export const CAL_OES =
  "https://www.caloes.ca.gov/office-of-the-director/operations/homeland-security/california-cybersecurity-integration-center/transparency-in-frontier-ai-act-reporting/";
export const CESIA_KIT =
  "https://cesia.org/en/publications/the-openai-hugging-face-incident-what-we-know-what-we-dont-what-follows/";
export const RECHAZO_DEFENSIVO =
  "https://labs.scale.com/papers/defensive-refusal-bias";
export const EXPLOITGYM = "https://github.com/sunblaze-ucb/exploitgym";
export const CYBERGYM = "https://github.com/sunblaze-ucb/cybergym";
export const CSA_MATRIZ =
  "https://cloudsecurityalliance.org/artifacts/ai-controls-matrix";

/* El enlace de cada ponente de Apart no sale de su página de Luma, que no
   publica ninguno: sale de la página que sostiene la afiliación que ya muestra
   la tabla. Sitio propio cuando lo tiene, ficha de la institución cuando la
   afiliación es institucional, y LinkedIn solo cuando no hay ninguna de las
   dos. Nunca un perfil adivinado.

   Charlas de Apart: en línea, en inglés y con inscripción propia en Luma. Los
   títulos van en su idioma original, tal como los publica cada página de Luma,
   verificadas el 10-sep contra el «start_at» de cada una. Las nueve horas están
   confirmadas.

   Cuatro no traen tema y no es un dato pendiente: su página de Luma se llama
   solo «HackTalk: <nombre>», así que eso es lo que muestra la tabla. El día que
   Apart publique el tema de alguno, se le escribe el campo y la celda deja de
   caer al nombre. */
export const CHARLAS: Array<{
  cuando: string;
  quien: string;
  donde: string;
  tema?: string;
  perfil: string;
  rsvp: string;
}> = [
  {
    cuando: "Jueves, 9:15 a. m.",
    quien: "Justin Shenk",
    perfil: "https://www.justinshenk.com/",
    donde: "Investigador independiente en seguridad de IA, Berlín",
    rsvp: "https://luma.com/ai-incident-response-sprint-justin-shenk",
  },
  {
    cuando: "Viernes, 8:15 a. m.",
    quien: "Henry Papadatos",
    perfil: "https://www.safer-ai.org/about/henry-papadatos",
    donde: "Director ejecutivo de SaferAI",
    tema: "An analysis of the Hugging Face breach, then what SaferAI proposes to do about the next one",
    rsvp: "https://luma.com/ai-incident-response-sprint-henry-papadatos",
  },
  {
    cuando: "Viernes, 9:15 a. m.",
    quien: "Boyd Kane",
    perfil: "https://www.linkedin.com/in/boydrkane/",
    donde: "Investigador en seguridad técnica de IA, MATS 9 Extension",
    tema: "Uncovering public traces of the OpenAI Huggingface incident",
    rsvp: "https://luma.com/ai-incident-response-sprint-boyd-kane",
  },
  {
    cuando: "Viernes, 12:00 m.",
    quien: "Isaak Mengesha",
    perfil: "https://www.isaakmengesha.com/",
    donde: "Posdoctorado en la Oxford Martin School",
    tema: "Incident Response Has a Measurement Problem",
    rsvp: "https://luma.com/ai-incident-response-sprint-isaak-mengesha",
  },
  {
    cuando: "Viernes, 1:00 p. m.",
    quien: "Stephen Casper",
    perfil: "https://www.hks.harvard.edu/faculty/stephen-casper",
    donde: "Profesor asistente de política pública, Harvard Kennedy School",
    tema: "Predicting the first major AI-enabled terrorism incident: A pre-mortem and 9 predictions",
    rsvp: "https://luma.com/ai-incident-response-sprint-stephen-casper",
  },
  {
    cuando: "Viernes, 2:00 p. m.",
    quien: "David Krueger",
    perfil: "https://davidscottkrueger.com/",
    donde: "CEO de Evitable y profesor asistente en la Universidad de Montreal",
    rsvp: "https://luma.com/ai-incident-response-sprint-david-krueger",
  },
  {
    cuando: "Viernes, 4:15 p. m.",
    quien: "Alex Mallen",
    perfil: "https://www.linkedin.com/in/alex-mallen-815b01176/",
    donde: "Equipo técnico de Redwood Research",
    tema: "How near-term AI swarms could cause labs to lose control of AI development, absent improved defenses",
    rsvp: "https://luma.com/ai-incident-response-sprint-alex-mallen",
  },
  {
    cuando: "Viernes, 7:15 p. m.",
    quien: "Tim Hua",
    perfil: "https://timhua.me/",
    donde: "Equipo técnico de METR",
    rsvp: "https://luma.com/ai-incident-response-sprint-tim-hua",
  },
  {
    cuando: "Domingo, 11:15 a. m.",
    quien: "Marko Grobelnik",
    perfil: "https://ailab.ijs.si/marko_grobelnik/",
    donde: "Investigador del Instituto Jožef Stefan",
    rsvp: "https://luma.com/ai-incident-response-sprint-marko-grobelnik",
  },
];

/* Las charlas que organiza el hub, en español. La modalidad es la misma que ya
   dicen las tarjetas de /sprint, repetida acá para no obligar a cruzar dos
   páginas. El título de Luis Montoya es el que mandó Jose, ya en español;
   «Evaluation Awareness» se queda en inglés porque así lo escribió él. Los
   «Por confirmar» que quedan son reales, no rellenos. El campo «luma» lo tienen las
   charlas en línea que abrieron inscripción. La charla de Camila Beltrán del
   viernes salió de la tabla el 11-sep. Los LinkedIn son los mismos
   de las tarjetas de /sprint: si hay que corregir uno, se corrige allá y se
   copia acá. */
export const CHARLAS_HUB: Array<{
  cuando: string;
  quien: string;
  donde: string;
  tema: string;
  linkedin?: string;
  enlace?: string;
  luma?: string;
}> = [
  {
    cuando: "Sábado, 10:00 a. m.",
    quien: "Roberto García Alonso",
    linkedin: "https://www.linkedin.com/in/roberto-garcia-alonso/",
    donde: "En línea",
    tema: "Gobernar la inteligencia artificial: del principio ético a la responsabilidad jurídica",
    luma: "https://luma.com/w6c6i9b4",
  },
  {
    cuando: "Sábado, 12:30 p. m.",
    quien: "María Lorena Flórez",
    linkedin: "https://www.linkedin.com/in/maria-lorena-florez-rojas/",
    donde: "En línea",
    tema: "Del principio a la práctica: cómo operacionalizar la rendición de cuentas de la IA",
    luma: "https://luma.com/8lqrcnmx",
  },
  {
    cuando: "Sábado, 2:00 p. m.",
    quien: "Christian Urcuqui",
    linkedin: "https://www.linkedin.com/in/christianurcuqui/",
    donde: "En línea",
    tema: "Hackeando agentes de IA",
    luma: "https://luma.com/60o0v4o1",
  },
  {
    cuando: "Sábado, 2:30 p. m.",
    quien: "Luis Cosio",
    linkedin: "https://www.linkedin.com/in/luiscosio/",
    donde: "En línea",
    tema: "SL5: ¿Cómo proteger los modelos de inteligencia artificial contra los ataques más sofisticados?",
    luma: "https://luma.com/8u5ymrfe",
  },
  {
    cuando: "Sábado, 3:00 p. m.",
    quien: "Manuela Chacón",
    linkedin:
      "https://www.linkedin.com/in/manuela-viviana-chac%C3%B3n-chamorro-04b0621bb/",
    donde: "En línea",
    tema: "Resiliencia cooperativa para sistemas multiagente",
    luma: "https://luma.com/vb88ho9c",
  },
  {
    cuando: "Sábado, 3:30 p. m.",
    quien: "Leidy Aldana",
    linkedin: "https://www.linkedin.com/in/l-aldana/",
    donde: "En la sala",
    tema: "Adversarial Machine Learning - Malware Detection",
  },
  {
    cuando: "Domingo, 12:30 p. m.",
    quien: "Gerson Quintero",
    linkedin:
      "https://www.linkedin.com/in/gerson-david-quintero-rodriguez-2b7b9a18/",
    donde: "En la sala",
    tema: "Arquitectura de datos, analítica e IA vulnerables",
  },
  {
    cuando: "Domingo, 2:00 p. m.",
    quien: "Luis Montoya",
    linkedin: "https://www.linkedin.com/in/luismmontoya/",
    donde: "En línea",
    tema: "En camino a detectar y entender la Evaluation Awareness no verbalizada",
    enlace: "https://openreview.net/forum?id=zGmgeR0f4D",
    luma: "https://luma.com/c36amemk",
  },
];

/* Los bloques de mentoria, con la hora que dicto Jose. La modalidad es la misma
   que dicen las tarjetas de /sprint. Los bloques de Christian, Luis Cosio y Leidy
   arrancan apenas termina su charla del sabado, media hora despues de que
   empieza. La experiencia es una condensacion de la bio publicada en /sprint,
   para que nadie tenga que cruzar dos paginas antes de saber a quien buscar.
   El Meet solo lo tienen los bloques en linea: son enlaces del Workspace, en
   acceso abierto, y Christian y Luis Cosio usan el mismo de su charla. */
export const MENTORIA: Array<{
  /** un renglón por día: [día, hora]. Dos bloques no caben en una frase */
  cuando: Array<[string, string]>;
  quien: string;
  donde: string;
  experiencia: string;
  linkedin?: string;
  /** solo los bloques en línea */
  meet?: string;
}> = [
  {
    cuando: [
      ["Sábado", "de 8:00 a 11:00 a. m."],
      ["Domingo", "de 9:00 a 11:00 a. m."],
    ],
    quien: "Luis Montoya",
    linkedin: "https://www.linkedin.com/in/luismmontoya/",
    experiencia:
      "Interpretabilidad y evaluación de modelos: cómo detectar que un modelo se comporta distinto cuando sabe que lo observan",
    donde: "En línea",
    meet: "https://meet.google.com/auo-jrmz-mne",
  },
  {
    cuando: [["Sábado", "de 10:00 a. m. a 12:00 m."]],
    quien: "Robert Gómez",
    linkedin: "https://www.linkedin.com/in/robert-gomez-6361571b6/",
    experiencia:
      "IA generativa llevada a producción, sobre todo en salud, e investigación aplicada con datos reales",
    donde: "En la sala",
  },
  {
    cuando: [["Sábado", "en la mañana"]],
    quien: "Juan Cortés",
    linkedin: "https://www.linkedin.com/in/jcortesj/",
    experiencia:
      "Desarrollo de software y aprendizaje automático adversario aplicado a la ciberseguridad",
    donde: "En la sala",
  },
  {
    cuando: [["Sábado", "2:30 p. m."]],
    quien: "Christian Urcuqui",
    linkedin: "https://www.linkedin.com/in/christianurcuqui/",
    experiencia:
      "Ciberseguridad ofensiva en sistemas con LLM: inyección indirecta de prompts y ataques a agentes",
    donde: "En línea",
    meet: "https://meet.google.com/oed-tkvj-rfx",
  },
  {
    cuando: [["Sábado", "3:00 p. m."]],
    quien: "Luis Cosio",
    linkedin: "https://www.linkedin.com/in/luiscosio/",
    experiencia:
      "Seguridad de infraestructura y centros de datos frente a adversarios con muchos recursos",
    donde: "En línea",
    meet: "https://meet.google.com/obt-kism-dwa",
  },
  {
    cuando: [
      ["Sábado", "3:00 p. m."],
      ["Domingo", "3:00 p. m."],
    ],
    quien: "Liliana Fernández",
    linkedin: "https://www.linkedin.com/in/lilianafernandezict4d/",
    experiencia:
      "Gobernanza y política pública de IA: certificación, estándares y política de datos",
    donde: "En la sala",
  },
  {
    cuando: [["Sábado", "4:00 p. m."]],
    quien: "Leidy Aldana",
    linkedin: "https://www.linkedin.com/in/l-aldana/",
    experiencia:
      "Aprendizaje automático adversario: evasión de detectores de malware y cómo blindarlos",
    donde: "En la sala",
  },
  {
    cuando: [["Domingo", "de 12:00 m. a 2:00 p. m."]],
    quien: "Diego Gómez",
    linkedin: "https://www.linkedin.com/in/diegoalejogm/",
    experiencia:
      "Interpretabilidad y modelos multimodales para moderación de contenido: leer las activaciones de un modelo para detectar cuándo cambia de carácter",
    donde: "En línea",
    meet: "https://meet.google.com/jsv-kzvi-qnt",
  },
];

/* Los cinco frentes y la línea «Judged on» que Apart publica para cada uno. La
   rúbrica general está abajo, en RUBRICA. */
export const FRENTES: Array<[string, string, string]> = [
  [
    "1. Estándares de contención",
    "Reglas verificables para evitar que un agente llegue a tocar producción.",
    "¿Un tercero podría verificar el cumplimiento sin acceso a la red del laboratorio? ¿Un laboratorio realmente podría adoptarlo?",
  ],
  [
    "2. Análisis del incidente",
    "Reconstruir qué ocurrió en julio y qué controles podrían haberlo detectado antes.",
    "Preguntas que puedan resolverse, chequeos que alguien pueda ejecutar y explicaciones causales que permitan hacer predicciones.",
  ],
  [
    "3. Respuesta regulatoria",
    "Diseñar un instrumento normativo que un regulador o legislador pueda utilizar.",
    "Exactitud legal y especificidad: ¿podría una institución utilizarlo con modificaciones menores?",
  ],
  [
    "4. Estrategia de comunicación",
    "Explicar un incidente de este tipo a públicos no técnicos sin exagerarlo ni minimizarlo.",
    "Anclaje en evidencia concreta y alguna prueba de alcance, como un playtest, la lectura de un periodista o la respuesta de un creador.",
  ],
  [
    "5. Track abierto",
    "Cualquier otro ángulo del incidente que tu equipo quiera explorar.",
    "Un artefacto útil, claridad sobre sus límites y una explicación de qué permitiría hacer un mes adicional de trabajo.",
  ],
];

/* La rúbrica de Apart (pestaña Guidelines, leída del HTML crudo el 11-sep):
   tres dimensiones, cada una de 1 a 5, iguales para todos los frentes. Van los
   anclajes de 3 y de 5, que son los que sirven para saber a qué apuntar. */
export const RUBRICA: Array<[string, string, string, string]> = [
  [
    "Impacto e innovación",
    "¿Cuánto importaría para la seguridad de la IA si funcionara, y qué tan nuevo es?",
    "Problema claro con un enfoque razonable; algo de novedad en el planteamiento o el método, más allá de aplicar herramientas conocidas.",
    "Ataca un problema crítico con un enfoque genuinamente nuevo, o abre una línea de investigación. Teoría de cambio clara. Para un 4 o un 5 el jurado se pregunta si es nuevo de verdad o replica trabajo reciente.",
  ],
  [
    "Calidad de ejecución",
    "¿Qué tan sólidos son el método, la implementación y los hallazgos?",
    "Técnicamente sólido para el tiempo disponible: el método tiene sentido, los resultados se pueden interpretar y las limitaciones están reconocidas.",
    "Alcance ambicioso ejecutado con rigor: hallazgos sorprendentes, métodos nuevos o una validación inusualmente robusta.",
  ],
  [
    "Presentación y claridad",
    "¿Qué tan claro queda qué hicieron, qué encontraron y por qué importa?",
    "Se entienden el problema, el método, los resultados y las limitaciones sin esfuerzo.",
    "Se lee con gusto: ideas complejas hechas accesibles. Podría servir de modelo de cómo presentar este tipo de trabajo.",
  ],
];

export const REPORTE: Array<[string, string]> = [
  ["Resumen", "Qué construiste y qué encontraste, en un párrafo."],
  ["Problema", "Qué parte del incidente estás abordando y por qué importa."],
  [
    "Qué construimos",
    "Descripción del artefacto de forma que otra persona pueda entenderlo y utilizarlo.",
  ],
  ["Cómo lo probamos", "Método, datos y qué mediste realmente."],
  [
    "Hallazgo principal",
    "Una afirmación principal y la evidencia que la respalda.",
  ],
  [
    "Limitaciones y doble uso",
    "Obligatorio. Qué no establece tu trabajo, cuáles son sus límites y cómo podría utilizarse mal.",
  ],
  ["Qué sigue", "Qué harías si tuvieras un mes adicional para continuar."],
  ["Referencias y apéndices", "No cuentan para el límite de páginas."],
];

export const PREMIOS: Array<[string, string]> = [
  ["1.er puesto", "USD 1.000"],
  ["2.º puesto", "USD 500"],
  ["3.er puesto", "USD 300"],
  ["4.º puesto", "USD 100"],
  ["5.º puesto", "USD 100"],
];

export const CONDUCTA_SI = [
  "Trata a todas las personas con respeto.",
  "Respeta los límites de los demás. Si alguien te pide que pares algo, hazlo de inmediato.",
  "Respeta la confidencialidad del trabajo de los otros equipos hasta que decidan hacerlo público.",
  "Cuida los espacios de la casa y ayúdanos a mantenerlos en buen estado durante el fin de semana.",
];

export const CONDUCTA_NO = [
  "Comentarios o acciones ofensivas o discriminatorias.",
  "Conductas que interrumpan de manera persistente el trabajo de los demás.",
  "Llegar o permanecer en el espacio en estado de embriaguez.",
  "Intimidación o amenazas.",
  "Acoso sexual de cualquier tipo, incluida la atención sexual no deseada o el contacto físico inapropiado.",
];

/* Prosa y tablas comparten exactamente la misma medida: el documento tiene un
   solo margen derecho, y la tabla que no quepa se desliza dentro de su caja. El
   cuerpo se queda en 18 px y no crece en pantalla ancha. */
export const COL = "w-full max-w-[54rem]";
export const P = "text-body text-aisc-ink";
export const FILA = "border-t border-aisc-ink/12 py-4";

/* display-3 y no display-2: veinte secciones a tamaño de portada convierten la
   guía en una escalera de títulos. */
export function H2({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${COL} scroll-mt-24 pt-11 md:pt-12`} id={id}>
      <h2 className="text-display-3 md:text-display-3-lg text-balance">
        {children}
      </h2>
    </div>
  );
}

export function H3({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={`${COL} text-display-4 mt-8 mb-2 scroll-mt-24 text-aisc-forest`}
      id={id}
    >
      {children}
    </h3>
  );
}

export function Parrafo({ children }: { children: React.ReactNode }) {
  return <p className={`${COL} ${P} mt-5`}>{children}</p>;
}

/* Las tablas de la guía de junio, que en Notion son tablas de verdad: fila de
   encabezado y filete en cada celda. En pantalla angosta la tabla no se apila,
   se desliza dentro de su propia caja, que es lo que hace Notion. */
export function Tabla({
  cabeceras,
  filas,
  ancho = "min-w-[32rem]",
}: {
  cabeceras: string[];
  filas: React.ReactNode[][];
  ancho?: string;
}) {
  return (
    <div className={`${COL} mt-6 overflow-x-auto`}>
      <table className={`${ancho} w-full border-collapse text-left`}>
        <thead>
          <tr>
            {cabeceras.map((c) => (
              <th
                className="text-kicker border border-aisc-ink/15 bg-aisc-forest/8 px-4 py-2.5 text-aisc-forest-deep"
                key={c}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr key={i}>
              {fila.map((celda, j) => (
                <td
                  className={`text-body border border-aisc-ink/15 px-4 py-3 align-top text-aisc-ink ${
                    j === 0 ? "font-semibold" : ""
                  }`}
                  key={j}
                >
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Lista({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={`${COL} ${P} mt-5 flex flex-col gap-3`}>
      {items.map((item, i) => (
        <li className="flex gap-3" key={i}>
          <span aria-hidden="true" className="text-aisc-coral">
            ·
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* Las dos lecturas del núcleo van en tarjeta y no en tabla: son dos, cada una
   necesita una línea de para qué sirve, y una tabla de dos filas con una celda
   de prosa larga se lee peor que el párrafo que reemplaza. El tiempo va arriba
   a la derecha porque es el dato que decide si alguien la abre hoy o el jueves. */
export function Lectura({
  numero,
  titulo,
  fuente,
  tiempo,
  href,
  children,
}: {
  numero: number;
  titulo: string;
  fuente: React.ReactNode;
  tiempo: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${COL} mt-6 border border-aisc-line bg-aisc-sand/45 px-6 py-6 md:px-7`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-kicker text-aisc-coral">Lectura {numero}</span>
        <span className="text-kicker text-aisc-muted">{tiempo}</span>
      </div>
      <h4 className="text-display-4 mt-3 text-balance text-aisc-forest-deep">
        <a className={ENLACE} href={href} rel="noreferrer" target="_blank">
          {titulo}
        </a>
      </h4>
      <p className="text-body-sm mt-1.5 text-aisc-muted">{fuente}</p>
      <div className={`${P} mt-4 flex flex-col gap-4`}>{children}</div>
    </div>
  );
}

/* Las lecturas por frente van plegadas, una fila por frente. Desplegadas son
   quince entradas de tres líneas, y nadie las necesita el miércoles: son para
   después de que el equipo escoge frente el viernes. Plegadas ocupan cinco
   renglones y cada quien abre el suyo. */
export function PorFrente({
  frente,
  intro,
  items,
}: {
  frente: string;
  intro?: React.ReactNode;
  items: React.ReactNode[];
}) {
  return (
    <details className="group border-b border-aisc-ink/12">
      <summary className="text-body flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-aisc-ink transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
        <span>{frente}</span>
        <span
          aria-hidden="true"
          className="shrink-0 text-lg leading-none text-aisc-coral transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-6">
        {intro ? <p className={P}>{intro}</p> : null}
        <ul className={`${P} mt-3 flex flex-col gap-3`}>
          {items.map((item, i) => (
            <li className="flex gap-3" key={i}>
              <span aria-hidden="true" className="text-aisc-coral">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

/* La sección de preparación completa: las dos lecturas del núcleo y las quince
   por frente. Es idéntica en las dos guías salvo una frase, la de cómo se arma
   el equipo, que en el hub pasa el viernes en la sala y en línea pasa por el
   grupo y por Discord. Esa frase entra por props. */
export function Preparacion({ equipos }: { equipos: React.ReactNode }) {
  return (
    <>
      <H2 id="estudio">Materiales de preparación</H2>
      <Parrafo>
        Para llegar preparado no necesitas hacer ningún curso. Solo te
        proponemos <strong>dos lecturas, alrededor de una hora en total</strong>
        , para que el viernes todos partamos de un contexto común sobre el
        incidente. Son las mismas para todo el mundo: la primera explica{" "}
        <strong>qué pasó</strong>, con fechas, fases y comandos, y la segunda,{" "}
        <strong>
          qué nos dice el incidente sobre el comportamiento de los agentes
        </strong>
        . Las dos están en inglés y son las que Apart pone primero en su lista
        de recursos.
      </Parrafo>

      <Lectura
        fuente="Hugging Face · publicado el 27 de julio"
        href={HF_TIMELINE}
        numero={1}
        tiempo="~40 min"
        titulo="Anatomy of a Frontier Lab Agent Intrusion"
      >
        <p>
          La reconstrucción forense del incidente, día por día, entre el 9 y el
          13 de julio: las nueve fases del ataque, las vulnerabilidades
          involucradas, los comandos ejecutados y un visor interactivo de cerca
          de 17.600 acciones del agente. Es el punto de partida de prácticamente
          todos los frentes.
        </p>
      </Lectura>
      <Lectura
        fuente={
          <>
            METR · solo la sección <em>Core takeaways about this incident</em>
          </>
        }
        href={`${METR_INFORME}#core-takeaways-about-this-incident`}
        numero={2}
        tiempo="~20 min"
        titulo="Core takeaways about this incident"
      >
        <p>
          La investigación independiente que OpenAI encargó después del
          incidente. No hace falta leer las 91 páginas: esta sección reúne
          algunos de los hallazgos más importantes para entender el
          comportamiento de los agentes durante el incidente, entre ellos que
          casi nunca consideraron avisarle a una persona lo que estaban
          haciendo.
        </p>
      </Lectura>

      <H3 id="por-frente">Lecturas por frente</H3>
      <Parrafo>
        Las lecturas de esta sección son opcionales antes del viernes y están
        pensadas para cuando ya tengas una idea del frente en el que quieres
        trabajar. No necesitas revisarlas todas y{" "}
        <strong>no reemplazan las dos lecturas de arriba</strong>. {equipos}{" "}
        Cada frente está explicado{" "}
        <a className={ENLACE} href="#frentes">
          más abajo
        </a>
        , y cuando recomendamos una parte del informe de METR el enlace va
        directo a esa sección.
      </Parrafo>

      <div className={`${COL} mt-6 border-t border-aisc-ink/12`}>
        <PorFrente
          frente="1. Estándares de contención"
          items={[
            <>
              <strong>
                METR,{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#hacking-the-customer-deployed-modal-sandbox-and-artifactory`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Hacking the customer deployed Modal sandbox and Artifactory
                </a>
                .
              </strong>{" "}
              El segundo salto: el agente pasa de la infraestructura del
              laboratorio a la de un cliente. Útil para pensar dónde empiezan y
              terminan las responsabilidades de contención.
            </>,
            <>
              <strong>
                METR,{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#efforts-to-conceal-actions-and-tamper-with-transcripts`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Efforts to conceal actions and tamper with transcripts
                </a>
                .
              </strong>{" "}
              Análisis forense cuando el propio sistema puede alterar la
              evidencia.
            </>,
            <>
              <strong>
                <a
                  className={ENLACE}
                  href={ELASTIC_DETECCION}
                  rel="noreferrer"
                  target="_blank"
                >
                  Elastic Security Labs
                </a>
                .
              </strong>{" "}
              La cadena de ataque vista desde la detección: varias señales
              llegaron a correlacionarse y ninguna escaló a una alerta.
            </>,
            <>
              <strong>
                <a
                  className={ENLACE}
                  href={CSA_MATRIZ}
                  rel="noreferrer"
                  target="_blank"
                >
                  AI Controls Matrix
                </a>
                , de Cloud Security Alliance.
              </strong>{" "}
              El control <strong>AIS-13</strong>, sobre aislamiento de agentes.
              Se actualiza seguido, así que vale confirmar en esa página cuál es
              la versión vigente.
            </>,
          ]}
        />
        <PorFrente
          frente="2. Análisis del incidente"
          items={[
            <>
              <strong>
                METR,{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#investigation-process-and-limitations`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Investigation process and limitations
                </a>{" "}
                y{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#appendix-methodology`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Appendix: Methodology
                </a>
                .
              </strong>{" "}
              Qué chequeos podría repetir otra persona de forma independiente.
            </>,
            <>
              <strong>METR, colaboración entre agentes:</strong>{" "}
              <a
                className={ENLACE}
                href={`${METR_INFORME}#collaboration-on-the-message-board`}
                rel="noreferrer"
                target="_blank"
              >
                Collaboration on the message board
              </a>
              ,{" "}
              <a
                className={ENLACE}
                href={`${METR_INFORME}#coordination-norms-and-technologies`}
                rel="noreferrer"
                target="_blank"
              >
                Coordination norms and technologies
              </a>{" "}
              y{" "}
              <a
                className={ENLACE}
                href={`${METR_INFORME}#large-collective-projects`}
                rel="noreferrer"
                target="_blank"
              >
                Large collective projects
              </a>
              . Cómo se coordinaron los agentes entre sí, con un detalle que no
              aparece en ningún otro recurso del sprint.
            </>,
            <>
              <strong>
                UK AI Security Institute,{" "}
                <a
                  className={ENLACE}
                  href={AISI_TRAMPA}
                  rel="noreferrer"
                  target="_blank"
                >
                  Cheating behaviour in frontier model evaluations
                </a>
                .
              </strong>{" "}
              Cinco modelos, 475 corridas cada uno, y todos hicieron trampa al
              menos una vez. Apart lo señala como el documento secundario más
              importante de todo el sprint.
            </>,
            <>
              <strong>
                METR,{" "}
                <a
                  className={ENLACE}
                  href={METR_PROPENSIONES}
                  rel="noreferrer"
                  target="_blank"
                >
                  Investigating AI propensities after incidents
                </a>
              </strong>{" "}
              (28 de julio). Es otro texto, no el informe: protocolos de
              investigación posteriores a un incidente.
            </>,
          ]}
        />
        <PorFrente
          frente="3. Respuesta regulatoria"
          items={[
            <>
              <strong>
                METR,{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#scope-of-this-investigation`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Scope of this investigation
                </a>{" "}
                y{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#appendix-timeline-of-investigation`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Appendix: Timeline of investigation
                </a>
                .
              </strong>{" "}
              Cuánto costó conseguir acceso independiente y qué quedó fuera del
              alcance.
            </>,
            <>
              <strong>
                METR,{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#agents-did-not-attempt-to-notify-humans-and-very-rarely-even-reasoned-about-doing-this`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Agents did not attempt to notify humans
                </a>
                .
              </strong>{" "}
              Insumo para pensar deberes de reporte y escalamiento.
            </>,
            <>
              <strong>
                <a
                  className={ENLACE}
                  href={PLANTILLA_UE}
                  rel="noreferrer"
                  target="_blank"
                >
                  Plantilla de la Comisión Europea para incidentes graves
                </a>{" "}
                de IA de propósito general y{" "}
                <a
                  className={ENLACE}
                  href={CAL_OES}
                  rel="noreferrer"
                  target="_blank"
                >
                  portal de reporte de Cal OES
                </a>
                .
              </strong>{" "}
              Dos instrumentos de reporte que ya existen y que nadie ha ejercido
              en público contra este incidente.
            </>,
          ]}
        />
        <PorFrente
          frente="4. Estrategia de comunicación"
          intro={
            <>
              Aquí el objeto de estudio es <strong>cómo fue contado</strong> el
              incidente. Toda afirmación va anclada al registro público: fechas,
              citas y fuentes identificables.
            </>
          }
          items={[
            <>
              <strong>
                <a
                  className={ENLACE}
                  href={OPENAI_INCIDENTE}
                  rel="noreferrer"
                  target="_blank"
                >
                  OpenAI, sobre el incidente
                </a>
              </strong>{" "}
              (21 de julio, ~15 min) y{" "}
              <strong>
                <a
                  className={ENLACE}
                  href={ANTHROPIC_INCIDENTES}
                  rel="noreferrer"
                  target="_blank"
                >
                  Anthropic, sobre tres incidentes reales
                </a>
              </strong>{" "}
              (30 de julio, ~20 min). Dos laboratorios contaron episodios
              parecidos con once días de diferencia y los encuadraron de maneras
              muy distintas.
            </>,
            <>
              <strong>
                METR,{" "}
                <a
                  className={ENLACE}
                  href={`${METR_INFORME}#we-heavily-delegated-our-analysis-to-often-unreliable-ai-agents`}
                  rel="noreferrer"
                  target="_blank"
                >
                  We heavily delegated our analysis to often unreliable AI
                  agents
                </a>
                .
              </strong>{" "}
              Las limitaciones del propio proceso de investigación, que es justo
              lo que un periodista va a citar en contra.
            </>,
            <>
              <strong>
                <a
                  className={ENLACE}
                  href={CESIA_KIT}
                  rel="noreferrer"
                  target="_blank"
                >
                  Material preparado por CeSIA para prensa
                </a>
                .
              </strong>{" "}
              Referencia de formato para decir qué se sabe, qué no y qué queda
              abierto.
            </>,
            <>
              Una advertencia de Apart: si tu proyecto implica hablar con
              periodistas, creadores o gente de política pública, la precisión
              va antes que cualquier titular atractivo.
            </>,
          ]}
        />
        <PorFrente
          frente="5. Track abierto"
          intro={
            <>
              No tiene una ruta dentro del informe de METR. Apart propone varias
              direcciones que parten de otros recursos.
            </>
          }
          items={[
            <>
              <strong>El dilema del defensor.</strong> Durante la intrusión,
              varios modelos de frontera rechazaron peticiones forenses de los
              responders de Hugging Face, que terminaron usando un modelo
              abierto en su propia infraestructura. Está descrito en la primera
              lectura.
            </>,
            <>
              <strong>
                <a
                  className={ENLACE}
                  href={RECHAZO_DEFENSIVO}
                  rel="noreferrer"
                  target="_blank"
                >
                  Defensive Refusal Bias
                </a>
                .
              </strong>{" "}
              El vocabulario de seguridad se rechaza con más frecuencia, y
              explicitar que hay autorización no reduce el rechazo.
            </>,
            <>
              <strong>Contaminación de benchmarks.</strong> Los conjuntos de
              datos a los que llegó el agente apuntan a{" "}
              <a
                className={ENLACE}
                href={EXPLOITGYM}
                rel="noreferrer"
                target="_blank"
              >
                ExploitGym
              </a>{" "}
              y{" "}
              <a
                className={ENLACE}
                href={CYBERGYM}
                rel="noreferrer"
                target="_blank"
              >
                CyberGym
              </a>
              . Si sus respuestas quedaron expuestas, ¿qué pasa con todo
              resultado posterior?
            </>,
          ]}
        />
      </div>

      <Parrafo>
        La lista completa de recursos está en la pestaña <em>Resources</em> de{" "}
        <a
          className={ENLACE}
          href={APART_SPRINT_URL}
          rel="noreferrer"
          target="_blank"
        >
          la página del sprint
        </a>
        , pero <strong>no hace falta revisarla toda</strong>. Si puedes, llega
        el viernes sabiendo cuál de los cinco frentes te interesa más; no
        necesitas traer una propuesta definida.
      </Parrafo>
    </>
  );
}
