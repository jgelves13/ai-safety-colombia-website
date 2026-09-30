import type { Idioma } from "./idiomas";
import type { CursoId } from "./cursos";

/* Lo que dice la página de cada curso. La estructura es la de las páginas de
   programa de aisecurity.sg y aisafety.sg: el titular es una promesa y no el
   nombre del curso; debajo, una tira con los datos clave; y luego una sección
   por pregunta, cada una con un rótulo pequeño y un título que afirma algo
   («Por qué ahora», «Para quién es», «Quién está en la sala», «Qué vas a
   hacer», «Con qué sales»), un panel para aplicar y una frase de cierre. La
   prosa es la de las páginas de MIT y Columbia: párrafos corridos con las
   frases clave en negrita, marcadas con **así**. */

export const RUTA_CURSO: Record<CursoId, Record<Idioma, string>> = {
  "agi-strategy": {
    es: "/cursos/agi-strategy",
    en: "/en/courses/agi-strategy",
    pt: "/pt/cursos/agi-strategy",
  },
  "technical-ai-safety": {
    es: "/cursos/technical-ai-safety",
    en: "/en/courses/technical-ai-safety",
    pt: "/pt/cursos/technical-ai-safety",
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
  /* El encabezado: el nombre del curso va en el rótulo; el titular promete. */
  kicker: string;
  titular: string;
  entrada: string;
  /* La línea de fechas y modalidad que cierra el encabezado. */
  linea: string;
  /* Los datos de la tira. El costo y los materiales son iguales en los dos. */
  hechos: { formato: string; dedicacion: string; fechas: string };
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
  /* La frase de cierre, en grande. */
  cierre: string;
  faq: { q: string; a: string }[];
};

const AGI_ES: PaginaCurso = {
  metaTitulo: "Seminario de futuro y riesgos de la IA",
  metaDescripcion:
    "Seminario con cohorte de cinco semanas, desde el 12 de octubre de 2026, con los materiales de BlueDot Impact. Para entender hacia dónde va la IA avanzada y encontrar tu punto de entrada. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 11 de octubre.",
  kicker: "Seminario de futuro y riesgos de la IA · Cohorte de octubre de 2026",
  titular: "Entiende hacia dónde va la IA avanzada antes de decidir qué hacer con tu carrera",
  entrada:
    "Cinco semanas en línea para gente de cualquier disciplina que se toma en serio el tema: quién está construyendo la IA, qué tan rápido avanza, qué podría salir mal y dónde puedes aportar para que salga bien. Con los materiales de BlueDot Impact y facilitadores de la comunidad.",
  linea: "Del 12 de octubre al 15 de noviembre de 2026, en línea. Cohorte abierta, por aplicación hasta el 11 de octubre.",
  hechos: { formato: "En línea, con cohorte", dedicacion: "5 h por semana", fechas: "12 oct – 15 nov 2026" },
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
    cierre: "Si no sabes si encajas, aplica igual: preferimos leer una aplicación de más.",
  },
  sala: {
    titulo: "Una cohorte pequeña que discute cada semana",
    parrafos: [
      "Cada semana haces **unas tres horas de lectura y escritura por tu cuenta** y te unes a tu cohorte en **una discusión de dos horas por videollamada**. Todo es en línea, así que puedes tomarlo desde cualquier ciudad y al lado de un trabajo o de la universidad.",
      "Las discusiones las lleva {facilitadores}. La cohorte mezcla a propósito gente de distintas ciudades y disciplinas: **la discusión es donde las lecturas se vuelven una opinión propia**, y la gente con la que discutes es la red con la que después vas a trabajar.",
    ],
  },
  semanas: {
    titulo: "Cinco semanas, del mapa de la carrera a tu siguiente paso",
    entrada: "Cada semana tiene lecturas, ejercicios cortos de escritura y una discusión con tu cohorte.",
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
    "Las aplicaciones están abiertas **hasta el domingo 11 de octubre a las 11:59 p. m.**, hora de Colombia. El seminario arranca el **lunes 12 de octubre** y termina el 15 de noviembre. Es **gratis**, y quien lo complete recibe un certificado de AI Safety Colombia.",
  otro: "Si te interesa más la parte técnica (interpretabilidad, evaluaciones, investigación en alineación), mira el {curso}.",
  cierre: "Cinco semanas. Una opinión propia. Un siguiente paso concreto.",
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
      q: "¿De verdad es gratis?",
      a: "Sí. No hay costos ocultos, y el certificado de AI Safety Colombia también es gratis.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact diseñó el temario y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
    {
      q: "¿Qué sigue después?",
      a: "El Seminario técnico de seguridad de la IA, los hackathones de investigación del hub de Bogotá o el grupo de lectura de AI Control, los viernes cada quince días.",
    },
  ],
};

const TAIS_ES: PaginaCurso = {
  metaTitulo: "Seminario técnico de seguridad de la IA",
  metaDescripcion:
    "Seminario con cohorte de seis semanas, desde el 12 de octubre de 2026, con los materiales de BlueDot Impact: alineación, evaluaciones, interpretabilidad y AI control. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 11 de octubre.",
  kicker: "Seminario técnico de seguridad de la IA · Cohorte de octubre de 2026",
  titular: "Apunta lo que sabes de machine learning a los problemas abiertos de la seguridad de la IA",
  entrada:
    "Seis semanas en línea para gente con base técnica: cómo se entrenan modelos más seguros, cómo se evalúan, cómo se miran por dentro y cómo se limita el daño cuando algo falla. Con los materiales de BlueDot Impact y facilitadores de la comunidad.",
  linea: "Del 12 de octubre al 22 de noviembre de 2026, en línea. Cohorte abierta, por aplicación hasta el 11 de octubre.",
  hechos: { formato: "En línea, con cohorte", dedicacion: "5 h por semana", fechas: "12 oct – 22 nov 2026" },
  porque: {
    titulo: "Las capacidades avanzan más rápido que la seguridad",
    parrafos: [
      "Las capacidades de la IA avanzan más rápido que nuestra capacidad de hacerlas seguras, y el campo necesita más gente técnica trabajando en eso. Los problemas siguen abiertos: todavía no sabemos medir con confianza lo que un modelo puede y quiere hacer, ni entender qué calcula por dentro, ni garantizar que un sistema capaz no cause daño si algo falla.",
      "El Seminario técnico de seguridad de la IA es un **recorrido por esos problemas y por los métodos con los que hoy se intenta resolverlos**: RLHF, evaluaciones, interpretabilidad mecanicista y AI control. Las lecturas son las que diseñó **BlueDot Impact**; AI Safety Colombia corre esta cohorte por su cuenta, con facilitadores de la comunidad.",
    ],
  },
  quien: {
    titulo: "Para gente con base técnica, no para principiantes",
    intro:
      "Basta con **entender lo básico de cómo se entrena un LLM**; si te falta, el curso AI Foundations de BlueDot, de dos horas, te da esa base. El seminario está pensado para:",
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
      "Cada semana haces **dos o tres horas de lectura y escritura por tu cuenta** y te unes a tu cohorte en **una discusión de dos horas por videollamada**. Todo es en línea, así que puedes tomarlo desde cualquier ciudad y al lado de un trabajo o de la universidad.",
      "Las discusiones las llevan {facilitadores}. **La discusión es donde se ponen a prueba los supuestos** y donde las lecturas se conectan con el trabajo que se hace en laboratorios y organizaciones de investigación; la gente con la que discutes es la red con la que después vas a trabajar.",
    ],
  },
  semanas: {
    titulo: "Seis semanas, del problema de fondo a tu siguiente paso",
    entrada: "Cada semana tiene lecturas, ejercicios cortos y una discusión con tu cohorte.",
    unidades: [
      { titulo: "Qué hace falta para que la IA salga bien", cuerpo: "El problema de fondo y el mapa de los enfoques técnicos que intentan resolverlo." },
      { titulo: "Entrenar modelos más seguros", cuerpo: "RLHF y los métodos con los que hoy se intenta que los modelos hagan lo que se les pide, y dónde fallan." },
      { titulo: "Evaluaciones", cuerpo: "Lo que un modelo puede hacer frente a lo que hará, cómo se mide y cómo se detecta el engaño." },
      { titulo: "Interpretabilidad mecanicista", cuerpo: "Mirar dentro de la red para entender qué está calculando y por qué." },
      { titulo: "Minimizar el daño", cuerpo: "AI control, clasificadores constitucionales y cortar la cadena que lleva de un modelo capaz a un daño real." },
      { titulo: "Cómo empezar a contribuir", cuerpo: "Dónde encajan tus habilidades y cuál es tu siguiente paso concreto." },
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
    "Las aplicaciones están abiertas **hasta el domingo 11 de octubre a las 11:59 p. m.**, hora de Colombia. El seminario arranca el **lunes 12 de octubre** y termina el 22 de noviembre. Es **gratis**, y quien lo complete recibe un certificado de AI Safety Colombia.",
  otro: "Si prefieres empezar por el panorama estratégico, mira el {curso}.",
  cierre: "Seis semanas. Los problemas abiertos. Tu lugar en ellos.",
  faq: [
    {
      q: "¿Cuánta formación técnica necesito?",
      a: "Deberías entender lo básico de cómo se entrenan y ajustan los LLM, que el progreso de la IA lo mueven los datos, los algoritmos y el cómputo, y que una red neuronal se optimiza con descenso de gradiente. El curso AI Foundations de BlueDot, de dos horas y a tu ritmo, te da esa base.",
    },
    {
      q: "¿Tengo que hacer primero el Seminario de futuro y riesgos de la IA?",
      a: "No es obligatorio, pero ayuda: el Seminario de futuro y riesgos de la IA da el contexto sobre el que se construye este seminario. Si aplicas a este y no quedas, en el formulario puedes pedir que te consideremos para el Seminario de futuro y riesgos de la IA.",
    },
    {
      q: "¿De verdad es gratis?",
      a: "Sí. No hay costos ocultos, y el certificado de AI Safety Colombia también es gratis.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact diseñó el temario y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
    {
      q: "¿Qué sigue después?",
      a: "Los hackathones de investigación del hub de Bogotá, donde mucha gente arma su primera pieza de portafolio; fellowships como MATS, SPAR o ARENA; o el grupo de lectura de AI Control, los viernes cada quince días.",
    },
  ],
};

const AGI_EN: PaginaCurso = {
  metaTitulo: "Seminar on the Future and Risks of AI",
  metaDescripcion:
    "A five-week cohort-based seminar starting 12 October 2026, using BlueDot Impact's materials. Understand where advanced AI is heading and find your entry point. Free, with an AI Safety Colombia certificate. Applications close 11 October.",
  kicker: "Seminar on the Future and Risks of AI · October 2026 cohort",
  titular: "Understand where advanced AI is heading before you decide what to do with your career",
  entrada:
    "Five weeks online for people from any discipline who take the topic seriously: who is building AI, how fast it is moving, what could go wrong, and where you can help make it go well. With BlueDot Impact's materials and facilitators from the community.",
  linea: "12 October to 15 November 2026, online. Open cohort, by application until 11 October.",
  hechos: { formato: "Online, cohort-based", dedicacion: "5 h a week", fechas: "12 Oct – 15 Nov 2026" },
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
    cierre: "If you're not sure you fit, apply anyway: we'd rather read one application too many.",
  },
  sala: {
    titulo: "A small cohort that discusses every week",
    parrafos: [
      "Each week you do **about three hours of reading and writing on your own** and join your cohort for **a two-hour video discussion**. Everything is online, so you can take it from any city and alongside a job or university.",
      "Discussions are led by {facilitadores}. The cohort deliberately mixes people from different cities and disciplines: **the discussion is where the readings turn into a view of your own**, and the people you discuss with are the network you'll work with afterwards.",
    ],
  },
  semanas: {
    titulo: "Five weeks, from the map of the race to your next step",
    entrada: "Each week has readings, short writing exercises, and a discussion with your cohort.",
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
    "Applications are open **until Sunday 11 October at 11:59 pm**, Colombia time. The seminar starts on **Monday 12 October** and ends on 15 November. It is **free**, and everyone who completes it receives an AI Safety Colombia certificate.",
  otro: "If you're more interested in the technical side (interpretability, evaluations, alignment research), see the {curso}.",
  cierre: "Five weeks. A view of your own. A concrete next step.",
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
      q: "Is it really free?",
      a: "Yes. There are no hidden costs, and the AI Safety Colombia certificate is free too.",
    },
    {
      q: "How is this related to BlueDot Impact?",
      a: "BlueDot Impact designed the curriculum and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
    {
      q: "What comes next?",
      a: "The Technical AI Safety Seminar, the research hackathons at the Bogotá hub, or the AI Control reading group, every other Friday.",
    },
  ],
};

const TAIS_EN: PaginaCurso = {
  metaTitulo: "Technical AI Safety Seminar",
  metaDescripcion:
    "A six-week cohort-based seminar starting 12 October 2026, using BlueDot Impact's materials: alignment, evaluations, interpretability and AI control. Free, with an AI Safety Colombia certificate. Applications close 11 October.",
  kicker: "Technical AI Safety Seminar · October 2026 cohort",
  titular: "Point what you know about machine learning at the open problems in AI safety",
  entrada:
    "Six weeks online for people with a technical background: how safer models are trained, how they are evaluated, how to look inside them, and how to limit the damage when something fails. With BlueDot Impact's materials and facilitators from the community.",
  linea: "12 October to 22 November 2026, online. Open cohort, by application until 11 October.",
  hechos: { formato: "Online, cohort-based", dedicacion: "5 h a week", fechas: "12 Oct – 22 Nov 2026" },
  porque: {
    titulo: "Capabilities are advancing faster than safety",
    parrafos: [
      "AI capabilities are advancing faster than our ability to make them safe, and the field needs more technical people working on it. The problems are still open: we don't yet know how to reliably measure what a model can and wants to do, how to understand what it computes inside, or how to guarantee that a capable system won't cause harm if something fails.",
      "The Technical AI Safety Seminar is **a tour of those problems and of the methods used today to try to solve them**: RLHF, evaluations, mechanistic interpretability and AI control. The readings were designed by **BlueDot Impact**; AI Safety Colombia runs this cohort independently, with facilitators from the community.",
    ],
  },
  quien: {
    titulo: "For people with a technical background, not beginners",
    intro:
      "You just need to **understand the basics of how an LLM is trained**; if you don't yet, BlueDot's two-hour AI Foundations course covers it. The seminar is designed for:",
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
      "Each week you do **two to three hours of reading and writing on your own** and join your cohort for **a two-hour video discussion**. Everything is online, so you can take it from any city and alongside a job or university.",
      "Discussions are led by {facilitadores}. **The discussion is where assumptions get tested** and where the readings connect to the work being done in labs and research organisations; the people you discuss with are the network you'll work with afterwards.",
    ],
  },
  semanas: {
    titulo: "Six weeks, from the underlying problem to your next step",
    entrada: "Each week has readings, short exercises, and a discussion with your cohort.",
    unidades: [
      { titulo: "What it takes for AI to go well", cuerpo: "The underlying problem and a map of the technical approaches trying to solve it." },
      { titulo: "Training safer models", cuerpo: "RLHF and the methods used today to get models to do what they're asked, and where they fail." },
      { titulo: "Evaluations", cuerpo: "What a model can do versus what it will do, how it is measured, and how deception is detected." },
      { titulo: "Mechanistic interpretability", cuerpo: "Looking inside the network to understand what it is computing and why." },
      { titulo: "Minimising harm", cuerpo: "AI control, constitutional classifiers, and breaking the chain that leads from a capable model to real harm." },
      { titulo: "How to start contributing", cuerpo: "Where your skills fit and what your concrete next step is." },
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
    "Applications are open **until Sunday 11 October at 11:59 pm**, Colombia time. The seminar starts on **Monday 12 October** and ends on 22 November. It is **free**, and everyone who completes it receives an AI Safety Colombia certificate.",
  otro: "If you'd rather start with the strategic picture, see the {curso}.",
  cierre: "Six weeks. The open problems. Your place in them.",
  faq: [
    {
      q: "How much technical background do I need?",
      a: "You should understand the basics of how LLMs are trained and fine-tuned, that AI progress is driven by data, algorithms and compute, and that a neural network is optimised with gradient descent. BlueDot's two-hour, self-paced AI Foundations course covers it.",
    },
    {
      q: "Do I need to take the Seminar on the Future and Risks of AI first?",
      a: "It isn't required, but it helps: the Seminar on the Future and Risks of AI gives the context this seminar builds on. If you apply to this one and aren't accepted, the form lets you ask to be considered for the Seminar on the Future and Risks of AI.",
    },
    {
      q: "Is it really free?",
      a: "Yes. There are no hidden costs, and the AI Safety Colombia certificate is free too.",
    },
    {
      q: "How is this related to BlueDot Impact?",
      a: "BlueDot Impact designed the curriculum and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
    {
      q: "What comes next?",
      a: "The research hackathons at the Bogotá hub, where many people build their first portfolio piece; fellowships such as MATS, SPAR or ARENA; or the AI Control reading group, every other Friday.",
    },
  ],
};

const AGI_PT: PaginaCurso = {
  metaTitulo: "Seminário de futuro e riscos da IA",
  metaDescripcion:
    "Seminário em turma de cinco semanas, a partir de 12 de outubro de 2026, com os materiais da BlueDot Impact. Para entender para onde vai a IA avançada e encontrar seu ponto de entrada. Grátis, com certificado da AI Safety Colombia. Inscrições até 11 de outubro.",
  kicker: "Seminário de futuro e riscos da IA · Turma de outubro de 2026",
  titular: "Entenda para onde vai a IA avançada antes de decidir o que fazer com sua carreira",
  entrada:
    "Cinco semanas on-line para gente de qualquer área que leva o tema a sério: quem está construindo a IA, com que velocidade avança, o que pode dar errado e onde você pode ajudar para que dê certo. Com os materiais da BlueDot Impact e facilitadores da comunidade.",
  linea: "De 12 de outubro a 15 de novembro de 2026, on-line. Turma aberta, por inscrição até 11 de outubro.",
  hechos: { formato: "On-line, em turma", dedicacion: "5 h por semana", fechas: "12 out – 15 nov 2026" },
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
    cierre: "Se não sabe se encaixa, inscreva-se mesmo assim: preferimos ler uma inscrição a mais.",
  },
  sala: {
    titulo: "Uma turma pequena que discute toda semana",
    parrafos: [
      "Toda semana você faz **cerca de três horas de leitura e escrita por conta própria** e se junta à sua turma numa **discussão de duas horas por videochamada**. Tudo é on-line, então dá para fazer de qualquer cidade e junto com o trabalho ou a faculdade.",
      "As discussões são conduzidas por {facilitadores}. A turma mistura de propósito gente de cidades e áreas diferentes: **a discussão é onde as leituras viram uma opinião própria**, e as pessoas com quem você discute são a rede com a qual vai trabalhar depois.",
    ],
  },
  semanas: {
    titulo: "Cinco semanas, do mapa da corrida ao seu próximo passo",
    entrada: "Toda semana tem leituras, exercícios curtos de escrita e uma discussão com a turma.",
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
    "As inscrições estão abertas **até domingo, 11 de outubro, às 23h59**, horário da Colômbia. O seminário começa na **segunda-feira, 12 de outubro**, e termina em 15 de novembro. É **grátis**, e quem o concluir recebe um certificado da AI Safety Colombia.",
  otro: "Se você tem mais interesse na parte técnica (interpretabilidade, avaliações, pesquisa em alinhamento), veja o {curso}.",
  cierre: "Cinco semanas. Uma opinião própria. Um próximo passo concreto.",
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
      q: "É grátis mesmo?",
      a: "Sim. Não há custos ocultos, e o certificado da AI Safety Colombia também é grátis.",
    },
    {
      q: "Qual a relação com a BlueDot Impact?",
      a: "A BlueDot Impact criou o programa e publica seus materiais. A AI Safety Colombia conduz esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
    {
      q: "O que vem depois?",
      a: "O Seminário técnico de segurança da IA, os hackathons de pesquisa do hub de Bogotá ou o grupo de leitura de AI Control, às sextas-feiras a cada quinze dias.",
    },
  ],
};

const TAIS_PT: PaginaCurso = {
  metaTitulo: "Seminário técnico de segurança da IA",
  metaDescripcion:
    "Seminário em turma de seis semanas, a partir de 12 de outubro de 2026, com os materiais da BlueDot Impact: alinhamento, avaliações, interpretabilidade e AI control. Grátis, com certificado da AI Safety Colombia. Inscrições até 11 de outubro.",
  kicker: "Seminário técnico de segurança da IA · Turma de outubro de 2026",
  titular: "Aponte o que você sabe de machine learning para os problemas em aberto da segurança da IA",
  entrada:
    "Seis semanas on-line para gente com base técnica: como treinar modelos mais seguros, como avaliá-los, como olhar dentro deles e como limitar o dano quando algo falha. Com os materiais da BlueDot Impact e facilitadores da comunidade.",
  linea: "De 12 de outubro a 22 de novembro de 2026, on-line. Turma aberta, por inscrição até 11 de outubro.",
  hechos: { formato: "On-line, em turma", dedicacion: "5 h por semana", fechas: "12 out – 22 nov 2026" },
  porque: {
    titulo: "As capacidades avançam mais rápido que a segurança",
    parrafos: [
      "As capacidades da IA avançam mais rápido que a nossa capacidade de torná-las seguras, e o campo precisa de mais gente técnica trabalhando nisso. Os problemas continuam em aberto: ainda não sabemos medir com confiança o que um modelo pode e quer fazer, nem entender o que ele calcula por dentro, nem garantir que um sistema capaz não cause dano se algo falhar.",
      "O Seminário técnico de segurança da IA é um **percurso por esses problemas e pelos métodos com que hoje se tenta resolvê-los**: RLHF, avaliações, interpretabilidade mecanicista e AI control. As leituras são as criadas pela **BlueDot Impact**; a AI Safety Colombia conduz esta turma por conta própria, com facilitadores da comunidade.",
    ],
  },
  quien: {
    titulo: "Para gente com base técnica, não para iniciantes",
    intro:
      "Basta **entender o básico de como um LLM é treinado**; se ainda não entende, o curso AI Foundations da BlueDot, de duas horas, dá essa base. O seminário foi pensado para:",
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
      "Toda semana você faz **duas ou três horas de leitura e escrita por conta própria** e se junta à sua turma numa **discussão de duas horas por videochamada**. Tudo é on-line, então dá para fazer de qualquer cidade e junto com o trabalho ou a faculdade.",
      "As discussões são conduzidas por {facilitadores}. **A discussão é onde os pressupostos são postos à prova** e onde as leituras se conectam com o trabalho feito em laboratórios e organizações de pesquisa; as pessoas com quem você discute são a rede com a qual vai trabalhar depois.",
    ],
  },
  semanas: {
    titulo: "Seis semanas, do problema de fundo ao seu próximo passo",
    entrada: "Toda semana tem leituras, exercícios curtos e uma discussão com a turma.",
    unidades: [
      { titulo: "O que é preciso para a IA dar certo", cuerpo: "O problema de fundo e o mapa das abordagens técnicas que tentam resolvê-lo." },
      { titulo: "Treinar modelos mais seguros", cuerpo: "RLHF e os métodos usados hoje para que os modelos façam o que se pede, e onde falham." },
      { titulo: "Avaliações", cuerpo: "O que um modelo pode fazer frente ao que ele fará, como se mede e como se detecta o engano." },
      { titulo: "Interpretabilidade mecanicista", cuerpo: "Olhar dentro da rede para entender o que ela está calculando e por quê." },
      { titulo: "Minimizar o dano", cuerpo: "AI control, classificadores constitucionais e cortar a cadeia que leva de um modelo capaz a um dano real." },
      { titulo: "Como começar a contribuir", cuerpo: "Onde suas habilidades se encaixam e qual é seu próximo passo concreto." },
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
    "As inscrições estão abertas **até domingo, 11 de outubro, às 23h59**, horário da Colômbia. O seminário começa na **segunda-feira, 12 de outubro**, e termina em 22 de novembro. É **grátis**, e quem o concluir recebe um certificado da AI Safety Colombia.",
  otro: "Se prefere começar pelo panorama estratégico, veja o {curso}.",
  cierre: "Seis semanas. Os problemas em aberto. Seu lugar neles.",
  faq: [
    {
      q: "Quanta formação técnica eu preciso?",
      a: "Você deve entender o básico de como os LLMs são treinados e ajustados, que o progresso da IA é movido por dados, algoritmos e computação, e que uma rede neural é otimizada com descida de gradiente. O curso AI Foundations da BlueDot, de duas horas e no seu ritmo, dá essa base.",
    },
    {
      q: "Preciso fazer o Seminário de futuro e riscos da IA antes?",
      a: "Não é obrigatório, mas ajuda: o Seminário de futuro e riscos da IA dá o contexto sobre o qual este seminário se constrói. Se você se inscrever neste e não for aceito, no formulário pode pedir para ser considerado para o Seminário de futuro e riscos da IA.",
    },
    {
      q: "É grátis mesmo?",
      a: "Sim. Não há custos ocultos, e o certificado da AI Safety Colombia também é grátis.",
    },
    {
      q: "Qual a relação com a BlueDot Impact?",
      a: "A BlueDot Impact criou o programa e publica seus materiais. A AI Safety Colombia conduz esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
    {
      q: "O que vem depois?",
      a: "Os hackathons de pesquisa do hub de Bogotá, onde muita gente monta sua primeira peça de portfólio; fellowships como MATS, SPAR ou ARENA; ou o grupo de leitura de AI Control, às sextas-feiras a cada quinze dias.",
    },
  ],
};

export const PAGINAS_CURSO: Record<CursoId, Record<Idioma, PaginaCurso>> = {
  "agi-strategy": { es: AGI_ES, en: AGI_EN, pt: AGI_PT },
  "technical-ai-safety": { es: TAIS_ES, en: TAIS_EN, pt: TAIS_PT },
};

type Rotulos = {
  /* La tira de datos. */
  formato: string;
  dedicacion: string;
  fechas: string;
  costo: string;
  costoValor: string;
  materiales: string;
  /* Los rótulos pequeños sobre cada título. */
  porque: string;
  quien: string;
  sala: string;
  semanas: string;
  resultado: string;
  semana: string;
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
    formato: "Formato",
    dedicacion: "Dedicación",
    fechas: "Fechas",
    costo: "Costo",
    costoValor: "Gratis, con certificado",
    materiales: "Materiales de",
    porque: "Por qué ahora",
    quien: "Para quién es",
    sala: "Quién está en la sala",
    semanas: "Qué vas a hacer",
    resultado: "Con qué sales",
    semana: "Semana",
    temarioEnlace: "Ver el temario completo en BlueDot",
    y: "y",
    aplicarTitulo: "Aplica a la cohorte de octubre",
    cerradoTitulo: "Las aplicaciones cerraron",
    cerradoFrase: "Las aplicaciones de esta cohorte cerraron el domingo 11 de octubre.",
    faq: "Preguntas frecuentes",
    aplicar: "Aplicar",
  },
  en: {
    formato: "Format",
    dedicacion: "Commitment",
    fechas: "Dates",
    costo: "Cost",
    costoValor: "Free, with a certificate",
    materiales: "Materials by",
    porque: "Why this, why now",
    quien: "Who it's for",
    sala: "Who's in the room",
    semanas: "What you'll do",
    resultado: "What you'll leave with",
    semana: "Week",
    temarioEnlace: "See the full curriculum on BlueDot",
    y: "and",
    aplicarTitulo: "Apply to the October cohort",
    cerradoTitulo: "Applications have closed",
    cerradoFrase: "Applications for this cohort closed on Sunday 11 October.",
    faq: "Frequently asked questions",
    aplicar: "Apply",
  },
  pt: {
    formato: "Formato",
    dedicacion: "Dedicação",
    fechas: "Datas",
    costo: "Custo",
    costoValor: "Grátis, com certificado",
    materiales: "Materiais da",
    porque: "Por que agora",
    quien: "Para quem é",
    sala: "Quem está na sala",
    semanas: "O que você vai fazer",
    resultado: "Com o que você sai",
    semana: "Semana",
    temarioEnlace: "Ver o programa completo na BlueDot",
    y: "e",
    aplicarTitulo: "Inscreva-se na turma de outubro",
    cerradoTitulo: "As inscrições foram encerradas",
    cerradoFrase: "As inscrições desta turma foram encerradas no domingo, 11 de outubro.",
    faq: "Perguntas frequentes",
    aplicar: "Inscrever-se",
  },
};
