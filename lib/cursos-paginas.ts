import type { Idioma } from "./idiomas";
import type { CursoId } from "./cursos";

/* Lo que dice la página de cada curso. La estructura es la de las páginas de
   programa de aisecurity.sg y aisafety.sg: el titular es una promesa y no el
   nombre del curso (el nombre va en el <title>, en el nav y en la prosa);
   debajo, una tira con los datos clave; y luego una sección por pregunta,
   cada una con un título que afirma algo (por qué ahora, para quién es, quién
   está en la sala, qué vas a hacer, con qué sales), un panel para aplicar y
   una frase de cierre. La
   prosa es la de las páginas de MIT y Columbia: párrafos corridos con las
   frases clave en negrita, marcadas con **así**. */

export const RUTA_CURSO: Record<CursoId, Record<Idioma, string>> = {
  "agi-strategy": {
    es: "/seminarios/futuro-y-riesgos",
    en: "/en/seminars/future-and-risks",
    pt: "/pt/seminarios/futuro-e-riscos",
  },
  "technical-ai-safety": {
    es: "/seminarios/tecnico",
    en: "/en/seminars/technical",
    pt: "/pt/seminarios/tecnico",
  },
};

export const BLUEDOT_CURSO: Record<CursoId, string> = {
  "agi-strategy": "https://bluedot.org/courses/agi-strategy",
  "technical-ai-safety": "https://bluedot.org/courses/technical-ai-safety",
};

/* Cómo llama BlueDot a cada temario; va junto al logo en la tira de datos. */
export const BLUEDOT_NOMBRE: Record<CursoId, string> = {
  "agi-strategy": "AGI Strategy",
  "technical-ai-safety": "Technical AI Safety",
};

/* Al final de «por qué», la salida para quien prefiera la versión de BlueDot:
   en línea y en inglés. Lo que va entre [corchetes] se enlaza al curso. */
export const EN_LINEA: Record<Idioma, string> = {
  es: "¿Prefieres tomarlo en línea y en inglés? [Aplica directamente con BlueDot].",
  en: "Would you rather take it online and in English? [Apply directly with BlueDot].",
  pt: "Prefere fazê-lo on-line e em inglês? [Inscreva-se diretamente na BlueDot].",
};

export type Facilitador = { nombre: string; afiliacion: string; linkedin: string };

/* La afiliación es dónde está cada quien hoy, tal como aparece en la rejilla de
   participantes del sprint. */
export const FACILITADORES: Record<CursoId, Facilitador[]> = {
  "agi-strategy": [
    {
      nombre: "Tomás Antolinez",
      afiliacion: "Universidad de los Andes",
      linkedin: "https://www.linkedin.com/in/tomas-antolinez-543719193",
    },
  ],
  "technical-ai-safety": [
    {
      nombre: "Helen Stefany Penagos",
      afiliacion: "Mastercard",
      linkedin: "https://www.linkedin.com/in/helen-stefany-penagos/",
    },
    {
      nombre: "Andrés Mosquera",
      afiliacion: "Universidad de los Andes",
      linkedin: "https://www.linkedin.com/in/andresmosqueraw/",
    },
  ],
};

type Bloque = { titulo: string; cuerpo: string };

export type PaginaCurso = {
  metaTitulo: string;
  metaDescripcion: string;
  /* El encabezado: el nombre del seminario es el h1 (metaTitulo) y debajo van
     tres frases: por qué, qué se aprende y para quién. */
  entrada: string;
  /* La línea de fechas y modalidad que cierra el encabezado. */
  linea: string;
  /* Las tres tarjetas bajo el encabezado: un dato grande y una frase. */
  tarjetas: { titulo: string; cuerpo: string }[];
  /* Por qué ahora: el problema y qué es el curso. */
  porque: { titulo: string; parrafos: string[] };
  /* Para quién es: cuatro perfiles y una frase que acota. */
  quien: { titulo: string; intro: string; perfiles: Bloque[]; cierre: string };
  /* Quién está en la sala: el formato de la semana y quién facilita.
     {facilitadores} es donde van los nombres enlazados. */
  sala: { titulo: string; parrafos: string[] };
  /* Qué vas a hacer: una tarjeta por semana. */
  semanas: { titulo: string; entrada: string; unidades: Bloque[] };
  /* Con qué sales. */
  resultado: { titulo: string; items: string[] };
  plazo: string;
  /* La línea que manda al otro curso. {curso} es donde va su nombre enlazado. */
  otro: string;
  faq: { q: string; a: string }[];
};

const AGI_ES: PaginaCurso = {
  metaTitulo: "Seminario de futuro y riesgos de la IA",
  metaDescripcion:
    "Seminario con cohorte de cinco semanas, desde la semana del 19 de octubre de 2026, con los materiales de BlueDot Impact. Para entender hacia dónde va la IA avanzada y encontrar tu punto de entrada. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 9 de octubre.",
  entrada:
    "La IA avanzada va más rápido que la gente preparada para pensarla. Cinco semanas para entender quién la construye, qué tan rápido avanza y qué podría salir mal. Desde cualquier disciplina.",
  linea: "Del 19 de octubre al 22 de noviembre de 2026. Cupos limitados: aplica hasta el 9 de octubre.",
  tarjetas: [
    { titulo: "Cinco semanas", cuerpo: "Del 19 de octubre al 22 de noviembre de 2026, una sesión de dos horas por semana más una hora de material por tu cuenta" },
    { titulo: "Mixto: presencial y en línea", cuerpo: "Sesiones en la Universidad de los Andes, con refrigerio gratis, y sesiones en línea" },
    { titulo: "Gratis, con certificado", cuerpo: "Materiales de BlueDot Impact; discusión en español, lecturas en inglés" },
  ],
  porque: {
    titulo: "La IA avanzada va más rápido que la gente preparada para pensarla",
    parrafos: [
      "Los laboratorios que construyen los modelos más capaces dicen abiertamente que quieren llegar a la AGI, y las decisiones sobre cómo se despliega esa tecnología se están tomando ya, con muy poca gente en Colombia que entienda qué se está construyendo y qué podría salir mal. A ese entendimiento casi nadie llega desde su formación: se llega leyendo, discutiendo y armando una opinión propia.",
      "El Seminario de futuro y riesgos de la IA es una **introducción a fondo a lo que está pasando con el desarrollo de la IA**: quién la está construyendo, qué impulsa el progreso, cuáles podrían ser los buenos y los malos desenlaces y qué se puede hacer para llevarla hacia futuros mejores. Las lecturas son las que diseñó **BlueDot Impact**; AI Safety Colombia corre esta cohorte por su cuenta, con facilitadores de la comunidad.",
    ],
  },
  quien: {
    titulo: "Para quien se toma el tema en serio y todavía no sabe por dónde entrar",
    intro:
      "**No hace falta formación técnica.** El seminario está pensado para gente que ya tiene una carrera o una formación y quiere apuntarla a este problema:",
    perfiles: [
      {
        titulo: "Política pública, derecho y gobernanza",
        cuerpo: "Trabajas o estudias en política pública, derecho, relaciones internacionales o seguridad y quieres entender la tecnología que vas a regular o asesorar.",
      },
      {
        titulo: "Ingeniería y ciencia de datos",
        cuerpo: "Construyes o investigas con modelos y quieres el panorama estratégico antes de escoger en qué problema de seguridad trabajar.",
      },
      {
        titulo: "Academia e investigación",
        cuerpo: "Investigas en economía, filosofía, ciencias sociales o computación y quieres saber dónde conecta tu campo con este problema.",
      },
      {
        titulo: "Gente nueva en el tema",
        cuerpo: "Vienes de otra área, has leído por tu cuenta y quieres pasar de leer a hacer.",
      },
    ],
    cierre: "Si no sabes si encajas, aplica igual: es mejor que sobre una aplicación a que falte la tuya.",
  },
  sala: {
    titulo: "Una cohorte pequeña que discute cada semana",
    parrafos: [
      "Cada semana arranca con **una hora de material ligero** (videos y podcasts) y sigue con **una sesión de dos horas con tu cohorte: lectura a fondo y discusión**. Son unas tres horas por semana, en un horario que se fija con los participantes seleccionados. Todas las lecturas y videos son en inglés, tal como los publica BlueDot; la discusión es en español. La modalidad es mixta: hay sesiones presenciales en la Universidad de los Andes y sesiones en línea, y cabe al lado de un trabajo o de la universidad. **En las sesiones presenciales hay refrigerio gratis.**",
      "El facilitador es {facilitadores}. La cohorte mezcla a propósito gente de distintas disciplinas: **la discusión es donde las lecturas se vuelven una opinión propia**, y la cohorte queda como una comunidad de pares con la que seguir explorando el campo después del seminario.",
    ],
  },
  semanas: {
    titulo: "Cinco semanas, del mapa de la carrera a tu siguiente paso",
    entrada: "Cada semana: una hora de material ligero y una sesión de dos horas, de lectura a fondo y de discusión. Las sesiones alternan: la primera semana es presencial, la segunda en línea, y así hasta el final. **El horario de las sesiones se define según la disponibilidad de los participantes seleccionados.**",
    unidades: [
      { titulo: "La carrera hacia la AGI", cuerpo: "Qué es la AGI, quién la está construyendo y por qué se corre para llegar primero." },
      { titulo: "Qué impulsa el progreso", cuerpo: "Cómputo, datos y algoritmos, y qué tan lejos puede llegar esa tendencia." },
      { titulo: "El panorama de amenazas", cuerpo: "Pérdida de control, concentración del poder y armas biológicas: qué tan probable es cada una y qué la haría más o menos grave." },
      { titulo: "Defensa en profundidad", cuerpo: "Impedir que se entrenen sistemas peligrosos, limitar lo que pueden hacer y resistir lo que hagan: las capas de defensa y quién trabaja en cada una." },
      { titulo: "Cómo empezar a contribuir", cuerpo: "Qué problema te toca, con qué habilidades y cuál es tu siguiente paso concreto." },
    ],
  },
  resultado: {
    titulo: "Una opinión propia, un mapa y un siguiente paso",
    items: [
      "**Una opinión propia** sobre qué amenazas importan más y por qué.",
      "**Un mapa de las defensas** que existen hoy y de quién trabaja en cada una.",
      "**Un siguiente paso concreto**: qué problema te toca, con qué habilidades y qué hacer en los próximos meses.",
      "**Una cohorte** de personas en Colombia que piensan en lo mismo, y un certificado de AI Safety Colombia.",
    ],
  },
  plazo:
    "Aplica **hasta el viernes 9 de octubre a las 11:59 p. m.** Los cupos son limitados y le respondemos a todos antes de arrancar.",
  otro: "Si te interesa más la parte técnica (interpretabilidad, evaluaciones, investigación en alineación), mira el {curso}.",
  faq: [
    {
      q: "¿Es un seminario para principiantes?",
      a: "Es para gente nueva en trabajar en AI safety, no nueva en pensar a fondo. Si has estado leyendo y pensando sobre el tema y quieres pasar a hacer algo, aquí es donde empiezas.",
    },
    {
      q: "¿Y si no sé qué dirección quiero tomar?",
      a: "Para eso es el seminario. Sales con una opinión sobre qué problemas importan más y qué camino encaja con tus habilidades: investigación técnica, gobernanza, bioseguridad o construir algo nuevo.",
    },
    {
      q: "¿Hay selección o entra todo el que aplica?",
      a: "Hay selección: los cupos son limitados. Leemos cada aplicación y escogemos según lo que escribas y el encaje con el perfil que describe esta página. Avisamos a todos, queden o no, antes de que arranque la cohorte.",
    },
    {
      q: "¿En qué horario son las sesiones?",
      a: "Se define con los participantes seleccionados: antes de arrancar les preguntamos qué franjas les sirven y se fija la que mejor le quede a la cohorte.",
    },
    {
      q: "¿En qué idioma es?",
      a: "Las discusiones son en español. Todas las lecturas, videos y podcasts son en inglés, tal como los publica BlueDot Impact, así que hace falta leer inglés con comodidad.",
    },
    {
      q: "¿Qué necesito para recibir el certificado?",
      a: "Asistir a las sesiones de discusión: puedes faltar a una como máximo. Es la misma regla que usa BlueDot Impact en sus cohortes. El certificado lo emite AI Safety Colombia por completar el seminario, basado en el currículo de BlueDot Impact.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact diseñó el temario y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
  ],
};

const TAIS_ES: PaginaCurso = {
  metaTitulo: "Seminario técnico de seguridad de la IA",
  metaDescripcion:
    "Seminario con cohorte de seis semanas, desde la semana del 19 de octubre de 2026, con los materiales de BlueDot Impact: alineación, evaluaciones, interpretabilidad y AI control. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 9 de octubre.",
  entrada:
    "Las capacidades de la IA avanzan más rápido que la seguridad. Seis semanas sobre cómo cerrar esa brecha: entrenar modelos más seguros, evaluarlos, mirarlos por dentro y limitar el daño cuando fallan. Para gente con base técnica.",
  linea: "Del 19 de octubre al 29 de noviembre de 2026. Cupos limitados: aplica hasta el 9 de octubre.",
  tarjetas: [
    { titulo: "Seis semanas", cuerpo: "Del 19 de octubre al 29 de noviembre de 2026, una sesión de dos horas por semana más una hora de material por tu cuenta" },
    { titulo: "Mixto: presencial y en línea", cuerpo: "Sesiones en la Universidad de los Andes, con refrigerio gratis, y sesiones en línea" },
    { titulo: "Gratis, con certificado", cuerpo: "Materiales de BlueDot Impact; discusión en español, lecturas en inglés" },
  ],
  porque: {
    titulo: "Las capacidades avanzan más rápido que la seguridad",
    parrafos: [
      "Las capacidades de la IA avanzan más rápido que la seguridad, y el campo necesita más gente técnica trabajando en eso. Los problemas siguen abiertos: todavía no sabemos medir con confianza lo que un modelo puede y quiere hacer, ni entender qué calcula por dentro, ni garantizar que un sistema capaz no cause daño si algo falla.",
      "El Seminario técnico de seguridad de la IA es un **recorrido por esos problemas y por los métodos con los que hoy se intenta resolverlos**: RLHF, evaluaciones, interpretabilidad mecanicista y AI control. Las lecturas son las que diseñó **BlueDot Impact**; AI Safety Colombia corre esta cohorte por su cuenta, con facilitadores de la comunidad.",
    ],
  },
  quien: {
    titulo: "Para quien ya entiende cómo se entrena un modelo y quiere trabajar en hacerlo seguro",
    intro:
      "Basta con **entender lo básico de cómo se entrena un LLM**; si te falta, el curso [AI Foundations](https://bluedot-impact.notion.site/AI-Foundations-293f8e69035380f29863c4c92c41fac7) de BlueDot, de dos horas, te da esa base. El seminario está pensado para:",
    perfiles: [
      {
        titulo: "Investigación en ML",
        cuerpo: "Haces investigación en machine learning y quieres apuntarla a alineación, evaluaciones o interpretabilidad.",
      },
      {
        titulo: "Ingeniería de software",
        cuerpo: "Construyes sistemas con modelos y quieres pasar a trabajar en la seguridad de los modelos que usas.",
      },
      {
        titulo: "Matemáticas y ciencias de la computación",
        cuerpo: "Tienes la base formal y quieres ver qué problemas del campo la necesitan.",
      },
      {
        titulo: "Estudiantes que ya van en serio",
        cuerpo: "Estás pensando en fellowships como MATS, SPAR o ARENA, o en un posgrado, y quieres llegar con criterio.",
      },
    ],
    cierre: "No es una introducción a la IA. Asume que ya sabes cómo funciona un modelo y quieres la seguridad que va debajo.",
  },
  sala: {
    titulo: "Una cohorte pequeña que discute cada semana",
    parrafos: [
      "Cada semana arranca con **una hora de material ligero** (videos y podcasts) y sigue con **una sesión de dos horas con tu cohorte: lectura a fondo y discusión**. Son unas tres horas por semana, en un horario que se fija con los participantes seleccionados. Todas las lecturas y videos son en inglés, tal como los publica BlueDot; la discusión es en español. La modalidad es mixta: hay sesiones presenciales en la Universidad de los Andes y sesiones en línea, y cabe al lado de un trabajo o de la universidad. **En las sesiones presenciales hay refrigerio gratis.**",
      "Los facilitadores son {facilitadores}. **La discusión es donde se ponen a prueba los supuestos** y donde las lecturas se conectan con el trabajo que se hace en laboratorios y organizaciones de investigación, y la cohorte queda como una comunidad de pares con la que seguir explorando el campo después del seminario.",
    ],
  },
  semanas: {
    titulo: "Seis semanas, del problema de fondo a tu siguiente paso",
    entrada: "Cada semana: una hora de material ligero y una sesión de dos horas, de lectura a fondo y de discusión. Las sesiones alternan: la primera semana es presencial, la segunda en línea, y así hasta el final. **El horario de las sesiones se define según la disponibilidad de los participantes seleccionados.**",
    unidades: [
      { titulo: "Qué hace falta para que la IA salga bien", cuerpo: "Por qué los modelos actuales no son seguros por defecto y qué enfoques técnicos existen para cambiarlo." },
      { titulo: "Entrenar modelos más seguros", cuerpo: "Cómo funciona RLHF, qué otros métodos se usan para ajustar un modelo y en qué casos no bastan." },
      { titulo: "Evaluaciones", cuerpo: "Cómo se mide lo que un modelo es capaz de hacer y cómo se busca si está ocultando algo." },
      { titulo: "Interpretabilidad mecanicista", cuerpo: "Las técnicas para ver qué calcula una red neuronal por dentro y hasta dónde llegan hoy." },
      { titulo: "Minimizar el daño", cuerpo: "Cómo se limita lo que un modelo puede hacer aunque esté desalineado, con AI control y clasificadores constitucionales." },
      { titulo: "Cómo empezar a contribuir", cuerpo: "Qué problemas abiertos encajan con lo que ya sabes hacer y cómo dar el primer paso." },
    ],
  },
  resultado: {
    titulo: "Un mapa técnico, criterio y un siguiente paso",
    items: [
      "**Un mapa de los enfoques técnicos** de la seguridad y de qué problema ataca cada uno.",
      "**Criterio para leer un paper del campo**: qué mide una evaluación, qué muestra un resultado de interpretabilidad y qué no.",
      "**Claridad sobre dónde encajan tus habilidades** y cuál es tu siguiente paso: un hackathon, un fellowship o un proyecto propio.",
      "**Una cohorte** de personas técnicas en Colombia, y un certificado de AI Safety Colombia.",
    ],
  },
  plazo:
    "Aplica **hasta el viernes 9 de octubre a las 11:59 p. m.** Los cupos son limitados y le respondemos a todos antes de arrancar.",
  otro: "Si prefieres empezar por el panorama estratégico, mira el {curso}.",
  faq: [
    {
      q: "¿Cuánta formación técnica necesito?",
      a: "Deberías entender lo básico de cómo se entrenan y ajustan los LLM, que el progreso de la IA lo mueven los datos, los algoritmos y el cómputo, y que una red neuronal se optimiza con descenso de gradiente. El curso [AI Foundations](https://bluedot-impact.notion.site/AI-Foundations-293f8e69035380f29863c4c92c41fac7) de BlueDot, de dos horas y a tu ritmo, te da esa base.",
    },
    {
      q: "¿Tengo que hacer primero el Seminario de futuro y riesgos de la IA?",
      a: "No es obligatorio, pero ayuda: el Seminario de futuro y riesgos de la IA da el contexto sobre el que se construye este seminario. Si aplicas a este y no quedas, en el formulario puedes pedir que te consideremos para el Seminario de futuro y riesgos de la IA.",
    },
    {
      q: "¿Hay selección o entra todo el que aplica?",
      a: "Hay selección: los cupos son limitados. Leemos cada aplicación y escogemos según lo que escribas y el encaje con el perfil que describe esta página. Avisamos a todos, queden o no, antes de que arranque la cohorte.",
    },
    {
      q: "¿En qué horario son las sesiones?",
      a: "Se define con los participantes seleccionados: antes de arrancar les preguntamos qué franjas les sirven y se fija la que mejor le quede a la cohorte.",
    },
    {
      q: "¿En qué idioma es?",
      a: "Las discusiones son en español. Todas las lecturas, videos y podcasts son en inglés, tal como los publica BlueDot Impact, así que hace falta leer inglés con comodidad.",
    },
    {
      q: "¿Qué necesito para recibir el certificado?",
      a: "Asistir a las sesiones de discusión: puedes faltar a una como máximo. Es la misma regla que usa BlueDot Impact en sus cohortes. El certificado lo emite AI Safety Colombia por completar el seminario, basado en el currículo de BlueDot Impact.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact diseñó el temario y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
  ],
};

const AGI_EN: PaginaCurso = {
  metaTitulo: "Seminar on the Future and Risks of AI",
  metaDescripcion:
    "A five-week cohort-based seminar starting the week of 19 October 2026, using BlueDot Impact's materials. Understand where advanced AI is heading and find your entry point. Free, with an AI Safety Colombia certificate. Applications close 9 October.",
  entrada:
    "Advanced AI is moving faster than the people ready to think about it. Five weeks to understand who is building it, how fast it is moving and what could go wrong. From any discipline.",
  linea: "19 October to 22 November 2026. Places are limited: apply by 9 October.",
  tarjetas: [
    { titulo: "Five weeks", cuerpo: "19 October to 22 November 2026, one two-hour session a week plus an hour of material on your own" },
    { titulo: "Mixed: in person and online", cuerpo: "Sessions at Universidad de los Andes, with free snacks, and sessions online" },
    { titulo: "Free, with a certificate", cuerpo: "Materials by BlueDot Impact; discussion in Spanish, readings in English" },
  ],
  porque: {
    titulo: "Advanced AI is moving faster than the people prepared to think about it",
    parrafos: [
      "The labs building the most capable models say openly that they want to reach AGI, and the decisions about how that technology gets deployed are being made now, with very few people in Colombia who understand what is being built and what could go wrong. Almost nobody gets that understanding from their degree: you get it by reading, discussing, and forming your own view.",
      "The Seminar on the Future and Risks of AI is an **in-depth introduction to what is happening in AI development**: who is building it, what drives progress, what the good and bad outcomes could be, and what can be done to steer it towards better futures. The readings were designed by **BlueDot Impact**; AI Safety Colombia runs this cohort independently, with facilitators from the community.",
    ],
  },
  quien: {
    titulo: "For people who take the topic seriously and don't yet know where to start",
    intro:
      "**No technical background is needed.** The seminar is designed for people who already have a career or a degree and want to point it at this problem:",
    perfiles: [
      {
        titulo: "Policy, law and governance",
        cuerpo: "You work or study in public policy, law, international relations or security and want to understand the technology you will regulate or advise on.",
      },
      {
        titulo: "Engineering and data science",
        cuerpo: "You build or research with models and want the strategic picture before choosing which safety problem to work on.",
      },
      {
        titulo: "Academia and research",
        cuerpo: "You do research in economics, philosophy, social science or computer science and want to know where your field connects to this problem.",
      },
      {
        titulo: "People new to the topic",
        cuerpo: "You come from another area, have read on your own, and want to move from reading to doing.",
      },
    ],
    cierre: "If you're not sure you fit, apply anyway: we'd rather have one too many than miss yours.",
  },
  sala: {
    titulo: "A small cohort that discusses every week",
    parrafos: [
      "Each week starts with **an hour of light material** (videos and podcasts) and continues with **one two-hour session with your cohort: close reading and discussion**. That is about three hours a week, at a time set with the selected participants. All readings and videos are in English, as BlueDot publishes them; the discussion is in Spanish. The format is mixed: some sessions are in person at Universidad de los Andes and some are online, and it fits alongside a job or university. **The in-person sessions come with free snacks.**",
      "The facilitator is {facilitadores}. The cohort deliberately mixes people from different disciplines: **the discussion is where the readings turn into a view of your own**, and the cohort stays on as a community of peers to keep exploring the field with after the seminar.",
    ],
  },
  semanas: {
    titulo: "Five weeks, from the map of the race to your next step",
    entrada: "Each week: an hour of light material and one two-hour session, close reading and discussion. Sessions alternate: the first week is in person, the second online, and so on to the end. **Session times are set around the availability of the selected participants.**",
    unidades: [
      { titulo: "The race to AGI", cuerpo: "What AGI is, who is building it, and why there's a race to get there first." },
      { titulo: "What drives progress", cuerpo: "Compute, data and algorithms, and how far that trend could go." },
      { titulo: "The threat landscape", cuerpo: "Loss of control, concentration of power, and biological weapons: how likely each one is and what would make it more or less severe." },
      { titulo: "Defence in depth", cuerpo: "Preventing dangerous systems from being trained, constraining what they can do, and withstanding what they do: the layers of defence and who works on each." },
      { titulo: "How to start contributing", cuerpo: "Which problem is yours, with which skills, and what your concrete next step is." },
    ],
  },
  resultado: {
    titulo: "A view of your own, a map, and a next step",
    items: [
      "**A view of your own** on which threats matter most and why.",
      "**A map of the defences** that exist today and who works on each one.",
      "**A concrete next step**: which problem is yours, with which skills, and what to do over the next few months.",
      "**A cohort** of people in Colombia thinking about the same thing, and an AI Safety Colombia certificate.",
    ],
  },
  plazo:
    "Apply **by Friday 9 October at 11:59 pm**, Colombia time. Places are limited, and we reply to everyone before we start.",
  otro: "If you're more interested in the technical side (interpretability, evaluations, alignment research), see the {curso}.",
  faq: [
    {
      q: "Is it a seminar for beginners?",
      a: "It's for people new to working on AI safety, not new to thinking hard. If you've been reading and thinking about the topic and want to start doing something, this is where you start.",
    },
    {
      q: "What if I don't know which direction I want to take?",
      a: "That's what the seminar is for. You leave with a view on which problems matter most and which path fits your skills: technical research, governance, biosecurity, or building something new.",
    },
    {
      q: "Is there a selection process, or does everyone who applies get in?",
      a: "There is a selection process: places are limited. We read every application and choose based on what you write and how well you fit the profile this page describes. We let everyone know, accepted or not, before the cohort starts.",
    },
    {
      q: "When are the sessions?",
      a: "The time is set with the selected participants: before the start we ask which slots work for them and fix the one that suits the cohort best.",
    },
    {
      q: "What language is it in?",
      a: "The discussions are in Spanish. All readings, videos and podcasts are in English, as BlueDot Impact publishes them, so you need to read English comfortably.",
    },
    {
      q: "What do I need to receive the certificate?",
      a: "Attend the discussion sessions: you can miss at most one. It's the same rule BlueDot Impact uses in its cohorts. The certificate is issued by AI Safety Colombia for completing the seminar, based on the BlueDot Impact curriculum.",
    },
    {
      q: "How is this related to BlueDot Impact?",
      a: "BlueDot Impact designed the curriculum and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
  ],
};

const TAIS_EN: PaginaCurso = {
  metaTitulo: "Technical AI Safety Seminar",
  metaDescripcion:
    "A six-week cohort-based seminar starting the week of 19 October 2026, using BlueDot Impact's materials: alignment, evaluations, interpretability and AI control. Free, with an AI Safety Colombia certificate. Applications close 9 October.",
  entrada:
    "AI capabilities are advancing faster than safety. Six weeks on closing that gap: training safer models, evaluating them, looking inside them and limiting the damage when they fail. For people with a technical background.",
  linea: "19 October to 29 November 2026. Places are limited: apply by 9 October.",
  tarjetas: [
    { titulo: "Six weeks", cuerpo: "19 October to 29 November 2026, one two-hour session a week plus an hour of material on your own" },
    { titulo: "Mixed: in person and online", cuerpo: "Sessions at Universidad de los Andes, with free snacks, and sessions online" },
    { titulo: "Free, with a certificate", cuerpo: "Materials by BlueDot Impact; discussion in Spanish, readings in English" },
  ],
  porque: {
    titulo: "Capabilities are advancing faster than safety",
    parrafos: [
      "AI capabilities are advancing faster than safety, and the field needs more technical people working on it. The problems are still open: we don't yet know how to reliably measure what a model can and wants to do, how to understand what it computes inside, or how to guarantee that a capable system won't cause harm if something fails.",
      "The Technical AI Safety Seminar is **a tour of those problems and of the methods used today to try to solve them**: RLHF, evaluations, mechanistic interpretability and AI control. The readings were designed by **BlueDot Impact**; AI Safety Colombia runs this cohort independently, with facilitators from the community.",
    ],
  },
  quien: {
    titulo: "For people who already know how a model is trained and want to work on making it safe",
    intro:
      "You just need to **understand the basics of how an LLM is trained**; if you don't yet, BlueDot's two-hour [AI Foundations](https://bluedot-impact.notion.site/AI-Foundations-293f8e69035380f29863c4c92c41fac7) course covers it. The seminar is designed for:",
    perfiles: [
      {
        titulo: "ML research",
        cuerpo: "You do machine learning research and want to point it at alignment, evaluations or interpretability.",
      },
      {
        titulo: "Software engineering",
        cuerpo: "You build systems with models and want to move into working on the safety of the models you use.",
      },
      {
        titulo: "Mathematics and computer science",
        cuerpo: "You have the formal foundation and want to see which problems in the field need it.",
      },
      {
        titulo: "Students who are already serious",
        cuerpo: "You're thinking about fellowships such as MATS, SPAR or ARENA, or about graduate school, and want to arrive with judgement.",
      },
    ],
    cierre: "This isn't an introduction to AI. It assumes you already know how a model works and want the safety underneath.",
  },
  sala: {
    titulo: "A small cohort that discusses every week",
    parrafos: [
      "Each week starts with **an hour of light material** (videos and podcasts) and continues with **one two-hour session with your cohort: close reading and discussion**. That is about three hours a week, at a time set with the selected participants. All readings and videos are in English, as BlueDot publishes them; the discussion is in Spanish. The format is mixed: some sessions are in person at Universidad de los Andes and some are online, and it fits alongside a job or university. **The in-person sessions come with free snacks.**",
      "The facilitators are {facilitadores}. **The discussion is where assumptions get tested** and where the readings connect to the work being done in labs and research organisations, and the cohort stays on as a community of peers to keep exploring the field with after the seminar.",
    ],
  },
  semanas: {
    titulo: "Six weeks, from the underlying problem to your next step",
    entrada: "Each week: an hour of light material and one two-hour session, close reading and discussion. Sessions alternate: the first week is in person, the second online, and so on to the end. **Session times are set around the availability of the selected participants.**",
    unidades: [
      { titulo: "What it takes for AI to go well", cuerpo: "Why today's models are not safe by default, and which technical approaches exist to change that." },
      { titulo: "Training safer models", cuerpo: "How RLHF works, which other methods are used to fine-tune a model, and where they fall short." },
      { titulo: "Evaluations", cuerpo: "How to measure what a model is capable of, and how to look for whether it is hiding something." },
      { titulo: "Mechanistic interpretability", cuerpo: "The techniques for seeing what a neural network computes on the inside, and how far they reach today." },
      { titulo: "Minimising harm", cuerpo: "How to limit what a model can do even if it is misaligned, with AI control and constitutional classifiers." },
      { titulo: "How to start contributing", cuerpo: "Which open problems fit what you already know how to do, and how to take the first step." },
    ],
  },
  resultado: {
    titulo: "A technical map, judgement, and a next step",
    items: [
      "**A map of the technical approaches** to safety and which problem each one attacks.",
      "**Judgement to read a paper in the field**: what an evaluation measures, what an interpretability result shows, and what it doesn't.",
      "**Clarity on where your skills fit** and what your next step is: a hackathon, a fellowship, or a project of your own.",
      "**A cohort** of technical people in Colombia, and an AI Safety Colombia certificate.",
    ],
  },
  plazo:
    "Apply **by Friday 9 October at 11:59 pm**, Colombia time. Places are limited, and we reply to everyone before we start.",
  otro: "If you'd rather start with the strategic picture, see the {curso}.",
  faq: [
    {
      q: "How much technical background do I need?",
      a: "You should understand the basics of how LLMs are trained and fine-tuned, that AI progress is driven by data, algorithms and compute, and that a neural network is optimised with gradient descent. BlueDot's two-hour, self-paced [AI Foundations](https://bluedot-impact.notion.site/AI-Foundations-293f8e69035380f29863c4c92c41fac7) course covers it.",
    },
    {
      q: "Do I need to take the Seminar on the Future and Risks of AI first?",
      a: "It isn't required, but it helps: the Seminar on the Future and Risks of AI gives the context this seminar builds on. If you apply to this one and aren't accepted, the form lets you ask to be considered for the Seminar on the Future and Risks of AI.",
    },
    {
      q: "Is there a selection process, or does everyone who applies get in?",
      a: "There is a selection process: places are limited. We read every application and choose based on what you write and how well you fit the profile this page describes. We let everyone know, accepted or not, before the cohort starts.",
    },
    {
      q: "When are the sessions?",
      a: "The time is set with the selected participants: before the start we ask which slots work for them and fix the one that suits the cohort best.",
    },
    {
      q: "What language is it in?",
      a: "The discussions are in Spanish. All readings, videos and podcasts are in English, as BlueDot Impact publishes them, so you need to read English comfortably.",
    },
    {
      q: "What do I need to receive the certificate?",
      a: "Attend the discussion sessions: you can miss at most one. It's the same rule BlueDot Impact uses in its cohorts. The certificate is issued by AI Safety Colombia for completing the seminar, based on the BlueDot Impact curriculum.",
    },
    {
      q: "How is this related to BlueDot Impact?",
      a: "BlueDot Impact designed the curriculum and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
  ],
};

const AGI_PT: PaginaCurso = {
  metaTitulo: "Seminário de futuro e riscos da IA",
  metaDescripcion:
    "Seminário em turma de cinco semanas, a partir da semana de 19 de outubro de 2026, com os materiais da BlueDot Impact. Para entender para onde vai a IA avançada e encontrar seu ponto de entrada. Grátis, com certificado da AI Safety Colombia. Inscrições até 9 de outubro.",
  entrada:
    "A IA avançada avança mais rápido do que as pessoas preparadas para pensá-la. Cinco semanas para entender quem a constrói, com que velocidade avança e o que pode dar errado. De qualquer área.",
  linea: "De 19 de outubro a 22 de novembro de 2026. Vagas limitadas: inscreva-se até 9 de outubro.",
  tarjetas: [
    { titulo: "Cinco semanas", cuerpo: "De 19 de outubro a 22 de novembro de 2026, uma sessão de duas horas por semana mais uma hora de material por conta própria" },
    { titulo: "Misto: presencial e on-line", cuerpo: "Sessões na Universidad de los Andes, com lanche grátis, e sessões on-line" },
    { titulo: "Grátis, com certificado", cuerpo: "Materiais da BlueDot Impact; discussão em espanhol, leituras em inglês" },
  ],
  porque: {
    titulo: "A IA avançada anda mais rápido que as pessoas preparadas para pensá-la",
    parrafos: [
      "Os laboratórios que constroem os modelos mais capazes dizem abertamente que querem chegar à AGI, e as decisões sobre como essa tecnologia é implantada já estão sendo tomadas, com pouquíssima gente na Colômbia que entenda o que está sendo construído e o que pode dar errado. Quase ninguém chega a esse entendimento pela formação: chega-se lendo, discutindo e formando uma opinião própria.",
      "O Seminário de futuro e riscos da IA é uma **introdução aprofundada ao que está acontecendo no desenvolvimento da IA**: quem a está construindo, o que impulsiona o progresso, quais podem ser os bons e os maus desfechos e o que se pode fazer para levá-la a futuros melhores. As leituras são as criadas pela **BlueDot Impact**; a AI Safety Colombia conduz esta turma por conta própria, com facilitadores da comunidade.",
    ],
  },
  quien: {
    titulo: "Para quem leva o tema a sério e ainda não sabe por onde entrar",
    intro:
      "**Não é preciso formação técnica.** O seminário foi pensado para quem já tem uma carreira ou uma formação e quer apontá-la para este problema:",
    perfiles: [
      {
        titulo: "Políticas públicas, direito e governança",
        cuerpo: "Você trabalha ou estuda políticas públicas, direito, relações internacionais ou segurança e quer entender a tecnologia que vai regular ou assessorar.",
      },
      {
        titulo: "Engenharia e ciência de dados",
        cuerpo: "Você constrói ou pesquisa com modelos e quer o panorama estratégico antes de escolher em qual problema de segurança trabalhar.",
      },
      {
        titulo: "Academia e pesquisa",
        cuerpo: "Você pesquisa em economia, filosofia, ciências sociais ou computação e quer saber onde seu campo se conecta com este problema.",
      },
      {
        titulo: "Gente nova no tema",
        cuerpo: "Você vem de outra área, leu por conta própria e quer passar de ler a fazer.",
      },
    ],
    cierre: "Se não sabe se encaixa, inscreva-se mesmo assim: é melhor sobrar uma inscrição do que faltar a sua.",
  },
  sala: {
    titulo: "Uma turma pequena que discute toda semana",
    parrafos: [
      "Toda semana começa com **uma hora de material leve** (vídeos e podcasts) e segue com **uma sessão de duas horas com a turma: leitura aprofundada e discussão**. São cerca de três horas por semana, em um horário definido com os participantes selecionados. Todas as leituras e vídeos são em inglês, como a BlueDot os publica; a discussão é em espanhol. A modalidade é mista: há sessões presenciais na Universidad de los Andes e sessões on-line, e cabe junto com o trabalho ou a faculdade. **Nas sessões presenciais tem lanche grátis.**",
      "O facilitador é {facilitadores}. A turma mistura de propósito gente de áreas diferentes: **a discussão é onde as leituras viram uma opinião própria**, e a turma fica como uma comunidade de pares com quem seguir explorando o campo depois do seminário.",
    ],
  },
  semanas: {
    titulo: "Cinco semanas, do mapa da corrida ao seu próximo passo",
    entrada: "Toda semana: uma hora de material leve e uma sessão de duas horas, de leitura aprofundada e de discussão. As sessões se alternam: a primeira semana é presencial, a segunda on-line, e assim até o fim. **O horário das sessões é definido de acordo com a disponibilidade dos participantes selecionados.**",
    unidades: [
      { titulo: "A corrida rumo à AGI", cuerpo: "O que é a AGI, quem a está construindo e por que há uma corrida para chegar primeiro." },
      { titulo: "O que impulsiona o progresso", cuerpo: "Computação, dados e algoritmos, e até onde essa tendência pode ir." },
      { titulo: "O panorama de ameaças", cuerpo: "Perda de controle, concentração de poder e armas biológicas: qual a probabilidade de cada uma e o que a tornaria mais ou menos grave." },
      { titulo: "Defesa em profundidade", cuerpo: "Impedir que sistemas perigosos sejam treinados, limitar o que podem fazer e resistir ao que fizerem: as camadas de defesa e quem trabalha em cada uma." },
      { titulo: "Como começar a contribuir", cuerpo: "Qual problema é o seu, com quais habilidades e qual é seu próximo passo concreto." },
    ],
  },
  resultado: {
    titulo: "Uma opinião própria, um mapa e um próximo passo",
    items: [
      "**Uma opinião própria** sobre quais ameaças importam mais e por quê.",
      "**Um mapa das defesas** que existem hoje e de quem trabalha em cada uma.",
      "**Um próximo passo concreto**: qual problema é o seu, com quais habilidades e o que fazer nos próximos meses.",
      "**Uma turma** de pessoas na Colômbia pensando na mesma coisa, e um certificado da AI Safety Colombia.",
    ],
  },
  plazo:
    "Inscreva-se **até sexta-feira, 9 de outubro, às 23h59**, horário da Colômbia. As vagas são limitadas e respondemos a todos antes do início.",
  otro: "Se você tem mais interesse na parte técnica (interpretabilidade, avaliações, pesquisa em alinhamento), veja o {curso}.",
  faq: [
    {
      q: "É um seminário para iniciantes?",
      a: "É para quem é novo em trabalhar com AI safety, não novo em pensar a fundo. Se você vem lendo e pensando sobre o tema e quer começar a fazer algo, é aqui que começa.",
    },
    {
      q: "E se eu não souber que direção quero tomar?",
      a: "É para isso que serve o seminário. Você sai com uma opinião sobre quais problemas importam mais e qual caminho combina com suas habilidades: pesquisa técnica, governança, biossegurança ou construir algo novo.",
    },
    {
      q: "Há seleção ou entra todo mundo que se inscreve?",
      a: "Há seleção: as vagas são limitadas. Lemos cada inscrição e escolhemos pelo que você escrever e pelo encaixe com o perfil que esta página descreve. Avisamos a todos, aprovados ou não, antes de a turma começar.",
    },
    {
      q: "Em que horário são as sessões?",
      a: "O horário é definido com os participantes selecionados: antes de começar perguntamos quais faixas funcionam para eles e fixamos a que melhor atende à turma.",
    },
    {
      q: "Em que idioma é?",
      a: "As discussões são em espanhol. Todas as leituras, vídeos e podcasts são em inglês, como a BlueDot Impact os publica, então é preciso ler inglês com conforto.",
    },
    {
      q: "O que preciso para receber o certificado?",
      a: "Participar das sessões de discussão: você pode faltar a uma, no máximo. É a mesma regra que a BlueDot Impact usa em suas turmas. O certificado é emitido pela AI Safety Colombia pela conclusão do seminário, baseado no currículo da BlueDot Impact.",
    },
    {
      q: "Qual a relação com a BlueDot Impact?",
      a: "A BlueDot Impact criou o programa e publica seus materiais. A AI Safety Colombia conduz esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
  ],
};

const TAIS_PT: PaginaCurso = {
  metaTitulo: "Seminário técnico de segurança da IA",
  metaDescripcion:
    "Seminário em turma de seis semanas, a partir da semana de 19 de outubro de 2026, com os materiais da BlueDot Impact: alinhamento, avaliações, interpretabilidade e AI control. Grátis, com certificado da AI Safety Colombia. Inscrições até 9 de outubro.",
  entrada:
    "As capacidades da IA avançam mais rápido do que a segurança. Seis semanas sobre como fechar essa lacuna: treinar modelos mais seguros, avaliá-los, olhar dentro deles e limitar o dano quando falham. Para quem tem base técnica.",
  linea: "De 19 de outubro a 29 de novembro de 2026. Vagas limitadas: inscreva-se até 9 de outubro.",
  tarjetas: [
    { titulo: "Seis semanas", cuerpo: "De 19 de outubro a 29 de novembro de 2026, uma sessão de duas horas por semana mais uma hora de material por conta própria" },
    { titulo: "Misto: presencial e on-line", cuerpo: "Sessões na Universidad de los Andes, com lanche grátis, e sessões on-line" },
    { titulo: "Grátis, com certificado", cuerpo: "Materiais da BlueDot Impact; discussão em espanhol, leituras em inglês" },
  ],
  porque: {
    titulo: "As capacidades avançam mais rápido que a segurança",
    parrafos: [
      "As capacidades da IA avançam mais rápido que a segurança, e o campo precisa de mais gente técnica trabalhando nisso. Os problemas continuam em aberto: ainda não sabemos medir com confiança o que um modelo pode e quer fazer, nem entender o que ele calcula por dentro, nem garantir que um sistema capaz não cause dano se algo falhar.",
      "O Seminário técnico de segurança da IA é um **percurso por esses problemas e pelos métodos com que hoje se tenta resolvê-los**: RLHF, avaliações, interpretabilidade mecanicista e AI control. As leituras são as criadas pela **BlueDot Impact**; a AI Safety Colombia conduz esta turma por conta própria, com facilitadores da comunidade.",
    ],
  },
  quien: {
    titulo: "Para quem já entende como um modelo é treinado e quer trabalhar para torná-lo seguro",
    intro:
      "Basta **entender o básico de como um LLM é treinado**; se ainda não entende, o curso [AI Foundations](https://bluedot-impact.notion.site/AI-Foundations-293f8e69035380f29863c4c92c41fac7) da BlueDot, de duas horas, dá essa base. O seminário foi pensado para:",
    perfiles: [
      {
        titulo: "Pesquisa em ML",
        cuerpo: "Você faz pesquisa em machine learning e quer apontá-la para alinhamento, avaliações ou interpretabilidade.",
      },
      {
        titulo: "Engenharia de software",
        cuerpo: "Você constrói sistemas com modelos e quer passar a trabalhar na segurança dos modelos que usa.",
      },
      {
        titulo: "Matemática e ciência da computação",
        cuerpo: "Você tem a base formal e quer ver quais problemas do campo precisam dela.",
      },
      {
        titulo: "Estudantes que já levam a sério",
        cuerpo: "Você está pensando em fellowships como MATS, SPAR ou ARENA, ou numa pós-graduação, e quer chegar com critério.",
      },
    ],
    cierre: "Não é uma introdução à IA. Pressupõe que você já sabe como um modelo funciona e quer a segurança que vai por baixo.",
  },
  sala: {
    titulo: "Uma turma pequena que discute toda semana",
    parrafos: [
      "Toda semana começa com **uma hora de material leve** (vídeos e podcasts) e segue com **uma sessão de duas horas com a turma: leitura aprofundada e discussão**. São cerca de três horas por semana, em um horário definido com os participantes selecionados. Todas as leituras e vídeos são em inglês, como a BlueDot os publica; a discussão é em espanhol. A modalidade é mista: há sessões presenciais na Universidad de los Andes e sessões on-line, e cabe junto com o trabalho ou a faculdade. **Nas sessões presenciais tem lanche grátis.**",
      "Os facilitadores são {facilitadores}. **A discussão é onde os pressupostos são postos à prova** e onde as leituras se conectam com o trabalho feito em laboratórios e organizações de pesquisa, e a turma fica como uma comunidade de pares com quem seguir explorando o campo depois do seminário.",
    ],
  },
  semanas: {
    titulo: "Seis semanas, do problema de fundo ao seu próximo passo",
    entrada: "Toda semana: uma hora de material leve e uma sessão de duas horas, de leitura aprofundada e de discussão. As sessões se alternam: a primeira semana é presencial, a segunda on-line, e assim até o fim. **O horário das sessões é definido de acordo com a disponibilidade dos participantes selecionados.**",
    unidades: [
      { titulo: "O que é preciso para a IA dar certo", cuerpo: "Por que os modelos atuais não são seguros por padrão e quais abordagens técnicas existem para mudar isso." },
      { titulo: "Treinar modelos mais seguros", cuerpo: "Como funciona o RLHF, que outros métodos se usam para ajustar um modelo e em que casos não bastam." },
      { titulo: "Avaliações", cuerpo: "Como se mede o que um modelo é capaz de fazer e como se procura saber se ele está escondendo algo." },
      { titulo: "Interpretabilidade mecanicista", cuerpo: "As técnicas para ver o que uma rede neural calcula por dentro e até onde chegam hoje." },
      { titulo: "Minimizar o dano", cuerpo: "Como se limita o que um modelo pode fazer mesmo que esteja desalinhado, com AI control e classificadores constitucionais." },
      { titulo: "Como começar a contribuir", cuerpo: "Quais problemas em aberto combinam com o que você já sabe fazer e como dar o primeiro passo." },
    ],
  },
  resultado: {
    titulo: "Um mapa técnico, critério e um próximo passo",
    items: [
      "**Um mapa das abordagens técnicas** da segurança e de qual problema cada uma ataca.",
      "**Critério para ler um paper do campo**: o que uma avaliação mede, o que um resultado de interpretabilidade mostra e o que não mostra.",
      "**Clareza sobre onde suas habilidades se encaixam** e qual é seu próximo passo: um hackathon, um fellowship ou um projeto próprio.",
      "**Uma turma** de pessoas técnicas na Colômbia, e um certificado da AI Safety Colombia.",
    ],
  },
  plazo:
    "Inscreva-se **até sexta-feira, 9 de outubro, às 23h59**, horário da Colômbia. As vagas são limitadas e respondemos a todos antes do início.",
  otro: "Se prefere começar pelo panorama estratégico, veja o {curso}.",
  faq: [
    {
      q: "Quanta formação técnica eu preciso?",
      a: "Você deve entender o básico de como os LLMs são treinados e ajustados, que o progresso da IA é movido por dados, algoritmos e computação, e que uma rede neural é otimizada com descida de gradiente. O curso [AI Foundations](https://bluedot-impact.notion.site/AI-Foundations-293f8e69035380f29863c4c92c41fac7) da BlueDot, de duas horas e no seu ritmo, dá essa base.",
    },
    {
      q: "Preciso fazer o Seminário de futuro e riscos da IA antes?",
      a: "Não é obrigatório, mas ajuda: o Seminário de futuro e riscos da IA dá o contexto sobre o qual este seminário se constrói. Se você se inscrever neste e não for aceito, no formulário pode pedir para ser considerado para o Seminário de futuro e riscos da IA.",
    },
    {
      q: "Há seleção ou entra todo mundo que se inscreve?",
      a: "Há seleção: as vagas são limitadas. Lemos cada inscrição e escolhemos pelo que você escrever e pelo encaixe com o perfil que esta página descreve. Avisamos a todos, aprovados ou não, antes de a turma começar.",
    },
    {
      q: "Em que horário são as sessões?",
      a: "O horário é definido com os participantes selecionados: antes de começar perguntamos quais faixas funcionam para eles e fixamos a que melhor atende à turma.",
    },
    {
      q: "Em que idioma é?",
      a: "As discussões são em espanhol. Todas as leituras, vídeos e podcasts são em inglês, como a BlueDot Impact os publica, então é preciso ler inglês com conforto.",
    },
    {
      q: "O que preciso para receber o certificado?",
      a: "Participar das sessões de discussão: você pode faltar a uma, no máximo. É a mesma regra que a BlueDot Impact usa em suas turmas. O certificado é emitido pela AI Safety Colombia pela conclusão do seminário, baseado no currículo da BlueDot Impact.",
    },
    {
      q: "Qual a relação com a BlueDot Impact?",
      a: "A BlueDot Impact criou o programa e publica seus materiais. A AI Safety Colombia conduz esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
  ],
};

export const PAGINAS_CURSO: Record<CursoId, Record<Idioma, PaginaCurso>> = {
  "agi-strategy": { es: AGI_ES, en: AGI_EN, pt: AGI_PT },
  "technical-ai-safety": { es: TAIS_ES, en: TAIS_EN, pt: TAIS_PT },
};

type Rotulos = {
  /* Los rótulos pequeños sobre cada título. */
  semana: string;
  /* La modalidad de cada semana: alternan desde una presencial. */
  presencial: string;
  enLinea: string;
  temarioEnlace: string;
  y: string;
  /* El panel para aplicar. */
  aplicarTitulo: string;
  cerradoTitulo: string;
  cerradoFrase: string;
  faq: string;
  aplicar: string;
};

/* Los rótulos que no dependen del curso. */
export const ROTULOS_CURSO: Record<Idioma, Rotulos> = {
  es: {
    semana: "Semana",
    presencial: "Presencial",
    enLinea: "En línea",
    temarioEnlace: "Ver el temario completo en BlueDot",
    y: "y",
    aplicarTitulo: "Aplica a la cohorte de octubre",
    cerradoTitulo: "Las aplicaciones cerraron",
    cerradoFrase: "Las aplicaciones de esta cohorte cerraron el viernes 9 de octubre.",
    faq: "Preguntas frecuentes",
    aplicar: "Aplicar",
  },
  en: {
    semana: "Week",
    presencial: "In person",
    enLinea: "Online",
    temarioEnlace: "See the full curriculum on BlueDot",
    y: "and",
    aplicarTitulo: "Apply to the October cohort",
    cerradoTitulo: "Applications have closed",
    cerradoFrase: "Applications for this cohort closed on Friday 9 October.",
    faq: "Frequently asked questions",
    aplicar: "Apply",
  },
  pt: {
    semana: "Semana",
    presencial: "Presencial",
    enLinea: "On-line",
    temarioEnlace: "Ver o programa completo na BlueDot",
    y: "e",
    aplicarTitulo: "Inscreva-se na turma de outubro",
    cerradoTitulo: "As inscrições foram encerradas",
    cerradoFrase: "As inscrições desta turma foram encerradas na sexta-feira, 9 de outubro.",
    faq: "Perguntas frequentes",
    aplicar: "Inscrever-se",
  },
};
