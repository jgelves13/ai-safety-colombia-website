import type { Idioma } from "./idiomas";

/* Los dos cursos de BlueDot Impact que AI Safety Colombia corre por su cuenta:
   AGI Strategy y Technical AI Safety. El formulario copia el de BlueDot
   pregunta por pregunta, traducido. Dos cambios: la pregunta por la ronda se
   volvió una de disponibilidad, porque solo hay una cohorte de cada curso, a
   tiempo parcial desde la semana del 12 de octubre; y se quitó el consentimiento de
   datos de diversidad, porque ese formulario aparte no existe acá.

   Los identificadores de las opciones no se traducen: son los que viajan a la
   base de datos. Todo lo que ve la persona sí, y va en `Record<Idioma, …>` para
   que dejar un idioma sin escribir no compile. */

export type CursoId = "agi-strategy" | "technical-ai-safety";

export const CURSOS: CursoId[] = ["agi-strategy", "technical-ai-safety"];

/** Viernes 9 de octubre de 2026, 23:59 en Bogotá. */
export const CIERRE_CURSOS_ISO = "2026-10-09T23:59:59-05:00";

export function cursosCerrados(): boolean {
  return Date.now() > Date.parse(CIERRE_CURSOS_ISO);
}

export const RUTA_APLICAR_CURSOS: Record<Idioma, string> = {
  es: "/seminarios/aplicar",
  en: "/en/seminars/apply",
  pt: "/pt/seminarios/inscricao",
};

export const RUTA_UNETE: Record<Idioma, string> = {
  es: "/unete",
  en: "/en/join",
  pt: "/pt/participe",
};

export const AREAS = [
  "biology",
  "chemistry",
  "public-health",
  "psychology",
  "engineering",
  "materials",
  "physics",
  "mathematics",
  "neuroscience",
  "international-relations",
  "economics",
  "history",
  "law",
  "philosophy",
  "politics",
  "policy",
  "ml-ai",
  "computer-science",
  "business",
  "other",
] as const;

/* De menor a mayor: del colegio al profesional con experiencia; «otra» al final. */
export const ETAPAS = [
  "high-school",
  "undergraduate",
  "masters",
  "phd",
  "postdoc-professor",
  "early-career",
  "mid-career",
  "experienced",
  "other",
] as const;

/* Las cohortes arrancan la semana del 12 de octubre: AGI Strategy dura cinco semanas
   y Technical AI Safety seis, ambas a tiempo parcial. */
export const INICIO_CURSOS = "2026-10-12";
export const FORMATOS = ["todas", "casi-todas", "no-puedo"] as const;

/** Tope de caracteres por campo; el mismo en el formulario y en la ruta. */
export const LIMITES_CURSOS: Record<string, number> = {
  firstName: 100,
  lastName: 100,
  email: 200,
  profileUrl: 300,
  otherProfile: 300,
  careerDetail: 300,
  hours: 60,
  qPlan: 3000,
  qEngagement: 3000,
  qSkills: 3000,
  qAchievement: 3000,
  qTradeoff: 3000,
  source: 600,
  nominee: 600,
  feedback: 1500,
};

/** Las preguntas abiertas de cada curso, en el orden en que salen. */
export const PREGUNTAS: Record<CursoId, string[]> = {
  "agi-strategy": ["qPlan", "qEngagement", "qSkills", "qAchievement", "qTradeoff"],
  "technical-ai-safety": ["qPlan", "qEngagement", "qSkills", "qAchievement"],
};

/** Lo que no se puede dejar en blanco, fuera de las preguntas abiertas. */
export function obligatorios(curso: CursoId): string[] {
  return [
    "course",
    "format",
    "firstName",
    "lastName",
    "email",
    "profileUrl",
    "fields",
    "careerStage",
    ...(curso === "agi-strategy" ? ["hours"] : []),
    ...PREGUNTAS[curso],
    "source",
    "nominee",
    "mentionName",
    "authorization",
  ];
}

type Pregunta = { label: string; ayuda?: string; puntos?: string[]; cierre?: string };

export type TextosCursos = {
  kicker: string;
  titulo: string;
  entrada: string;
  cierre: string;
  sinIA: string;
  prerrequisitoTitulo: string;
  prerrequisitos: string[];
  prerrequisitoCierre: string;

  nombreCurso: Record<CursoId, string>;
  resumenCurso: Record<CursoId, string>;

  cerradoTitulo: string;
  cerradoCuerpo: string;
  enviadoTitulo: string;
  enviadoCuerpo: string;
  enviadoGrupo: string;
  volver: string;
  fallaAntes: string;
  fallaDespues: string;

  resumenTitulo: string;
  faltaResponder: string;
  correoMal: string;
  urlMal: string;
  maxTres: string;
  limite: (tope: number) => string;
  opcional: string;
  trampa: string;
  enviar: string;
  enviando: string;
  guardado: string;

  falta: Record<string, string>;

  seccionCurso: string;
  seccionTu: string;
  seccionMotivacion: string;
  seccionCierre: string;

  curso: string;
  formato: string;
  formatoAyuda: string;
  formatos: Record<(typeof FORMATOS)[number], string>;
  alternativaCheck: string;

  nombre: string;
  apellido: string;
  correo: string;
  perfil: string;
  perfilAyuda: string;
  otroPerfil: string;
  otroPerfilAyuda: string;
  areas: string;
  areasAyuda: string;
  areasOpciones: Record<(typeof AREAS)[number], string>;
  etapa: string;
  etapas: Record<(typeof ETAPAS)[number], string>;
  etapaDetalle: string;
  /* Los menús desplegables: lo que dicen antes de escoger. */
  escoger: string;
  escogerVarias: string;
  horas: string;
  horasAyuda: string;

  preguntas: Record<CursoId, Record<string, Pregunta>>;

  fuente: string;
  fuenteAyuda: string;
  fuenteEjemplos: string[];
  nominado: string;
  nominadoAyuda: string;
  mencion: string;
  si: string;
  no: string;
  comentarios: string;
  comentariosAyuda: string;
  privacidadAntes: string;
  privacidadDespues: string;
};

export const TEXTOS_CURSOS: Record<Idioma, TextosCursos> = {
  es: {
    kicker: "Seminarios de BlueDot Impact · aplicaciones abiertas",
    titulo: "Aplica a los seminarios",
    entrada:
      "El formulario toma unos 30 minutos y puedes responder con viñetas.",
    cierre: "Cierra el viernes 9 de octubre a las 11:59 p. m.",
    sinIA: "Por favor no uses IA para responder: queremos leerte a ti.",
    prerrequisitoTitulo: "Antes de aplicar al Seminario técnico de seguridad de la IA deberías:",
    prerrequisitos: [
      "Entender que los sistemas de IA se entrenan, no se diseñan, y que no los entendemos del todo.",
      "Entender qué impulsa el progreso de la IA y qué efecto tiene ese progreso en distintos campos.",
      "Poder nombrar riesgos concretos de la IA, más allá de «puede ser peligrosa».",
    ],
    prerrequisitoCierre: "Si no estás seguro de alguno, empieza por el Seminario de futuro y riesgos de la IA.",
    nombreCurso: { "agi-strategy": "Seminario de futuro y riesgos de la IA", "technical-ai-safety": "Seminario técnico de seguridad de la IA" },
    resumenCurso: {
      "agi-strategy":
        "Por qué se está corriendo hacia la AGI, qué impulsa el progreso, cuáles son los riesgos y qué defensas existen.",
      "technical-ai-safety":
        "Cómo se entrenan modelos más seguros, cómo se evalúan, interpretabilidad mecanicista y AI control.",
    },

    cerradoTitulo: "Las aplicaciones cerraron",
    cerradoCuerpo:
      "La convocatoria cerró el viernes 9 de octubre. La próxima se anuncia primero en el grupo de WhatsApp.",
    enviadoTitulo: "Recibimos tu aplicación",
    enviadoCuerpo:
      "Te llega una confirmación al correo. Revisamos las aplicaciones después del cierre, el 9 de octubre, y le respondemos a todo el mundo, quede o no.",
    enviadoGrupo: "Entrar al grupo de WhatsApp",
    volver: "Volver a Únete",
    fallaAntes: "No pudimos guardar tu aplicación. Intenta de nuevo en un momento o escríbenos a ",
    fallaDespues: " y la recibimos a mano.",

    resumenTitulo: "Te falta responder:",
    faltaResponder: "Falta esta respuesta.",
    correoMal: "Revisa el correo.",
    urlMal: "Pega el enlace completo, empezando por https://",
    maxTres: "Escoge máximo tres.",
    limite: (tope) => `Máximo ${tope} caracteres.`,
    opcional: " (opcional)",
    trampa: "No llenar",
    enviar: "Enviar aplicación",
    enviando: "Enviando…",
    guardado: "Lo que escribes se guarda en este navegador hasta que lo envíes.",

    falta: {
      course: "El seminario",
      format: "Tu disponibilidad",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo",
      profileUrl: "Perfil",
      fields: "Área de estudio",
      careerStage: "Etapa de carrera",
      hours: "Horas dedicadas a AI safety",
      qPlan: "Qué vas a hacer después del seminario",
      qEngagement: "Cómo te has involucrado con AI safety",
      qSkills: "Tus habilidades",
      qAchievement: "Algo que hayas construido",
      qTradeoff: "La tensión más difícil",
      source: "Dónde supiste del seminario",
      nominee: "A quién nominarías",
      mentionName: "Si podemos mencionar tu nombre",
    },

    seccionCurso: "El seminario",
    seccionTu: "Sobre ti",
    seccionMotivacion: "Tus habilidades y tu motivación",
    seccionCierre: "Para cerrar",

    curso: "¿A qué seminario aplicas?",
    formato: "¿Puedes estar todas las semanas?",
    formatoAyuda:
      "Son tres horas a la semana desde el 12 de octubre: una de lecturas y dos de sesión con tu cohorte. Para el certificado puedes faltar a una sesión como máximo.",
    formatos: {
      todas: "Sí, puedo estar todas las semanas",
      "casi-todas": "Casi todas: puede que falte a una",
      "no-puedo": "No puedo en estas fechas; avísenme de la próxima cohorte",
    },
    alternativaCheck: "Si les parece mejor, estoy abierto a hacer el Seminario de futuro y riesgos de la IA en su lugar",

    nombre: "Nombre",
    apellido: "Apellido",
    correo: "Correo",
    perfil: "Enlace a tu perfil",
    perfilAyuda: "Tu LinkedIn o tu hoja de vida. Preferimos LinkedIn.",
    otroPerfil: "Otro perfil",
    otroPerfilAyuda: "Por ejemplo tu hoja de vida, GitHub, página personal o blog.",
    areas: "¿Cuál es el área más cercana a lo que has estudiado?",
    areasAyuda: "Escoge hasta tres, contando estudios pasados o actuales.",
    areasOpciones: {
      biology: "Biología",
      chemistry: "Química",
      "public-health": "Salud pública / Medicina",
      psychology: "Psicología",
      engineering: "Ingeniería (no de software)",
      materials: "Ciencia de materiales",
      physics: "Física",
      mathematics: "Matemáticas",
      neuroscience: "Neurociencia",
      "international-relations": "Relaciones internacionales",
      economics: "Economía",
      history: "Historia",
      law: "Derecho",
      philosophy: "Filosofía",
      politics: "Ciencia política",
      policy: "Política pública",
      "ml-ai": "Machine learning / IA",
      "computer-science": "Ciencias de la computación",
      business: "Administración / Negocios",
      other: "Otra",
    },
    etapa: "¿En qué etapa de tu carrera estás?",
    etapas: {
      experienced: "Profesional con experiencia (más de 10 años después de la universidad)",
      "mid-career": "Profesional a mitad de carrera (3 a 10 años después de la universidad)",
      "early-career": "Profesional al inicio de su carrera (menos de 3 años después de la universidad)",
      "postdoc-professor": "Posdoctorado / Profesor",
      phd: "Doctorado",
      masters: "Maestría",
      undergraduate: "Pregrado",
      "high-school": "Colegio",
      other: "Otra (cuéntanos cuál)",
    },
    etapaDetalle: "¿Cuál?",
    escoger: "Escoge una opción",
    escogerVarias: "Escoge hasta tres",
    horas: "¿Cuántas horas le has dedicado hasta ahora a contenido de AI safety?",
    horasAyuda: "Un estimado aproximado está bien.",

    preguntas: {
      "agi-strategy": {
        qPlan: {
          label: "¿Qué vas a hacer distinto después del seminario y por qué no lo puedes hacer hoy?",
          ayuda: "Sé concreto. Queremos saber:",
          puntos: [
            "Qué acción específica vas a tomar.",
            "Qué acceso, posición o palanca tienes que te hace la persona para hacerlo.",
            "Qué te falta que este seminario te da.",
          ],
        },
        qEngagement: {
          label: "¿Cómo te has involucrado con AI safety hasta ahora?",
          ayuda: "Qué has leído, construido, a qué has asistido o en qué has trabajado.",
        },
        qSkills: {
          label: "¿Qué habilidades vas a aportar?",
          ayuda:
            "Política pública, técnica, investigación, comunicación, operaciones: creemos que todas cuentan para que a la IA le vaya bien. ¿Dónde has demostrado las tuyas?",
        },
        qAchievement: {
          label: "Cuéntanos de algo que hayas construido, lanzado o hecho que pasara.",
          ayuda:
            "Buscamos gente que ejecuta. ¿Qué proyecto, sistema, comunidad o resultado creaste? ¿Por qué te enorgullece?",
        },
        qTradeoff: {
          label: "¿Cuál es la tensión o el dilema más difícil que ves en AI safety y cómo lo piensas?",
        },
      },
      "technical-ai-safety": {
        qPlan: {
          label: "¿Cómo crees que este seminario te va a ayudar a contribuir a que a la IA le vaya bien?",
          ayuda: "Te sugerimos responder con 3 a 7 viñetas. Cuéntanos tu plan, con detalles:",
          puntos: [
            "Qué pasos vas a dar después del seminario.",
            "Cómo te habilita el seminario para darlos.",
            "Cuál es tu teoría de cambio para AI safety.",
          ],
          cierre:
            "No buscamos respuestas perfectas, pero sí gente que haya pensado en serio en su papel en este momento.",
        },
        qEngagement: {
          label: "¿Cómo te has involucrado con el campo de AI safety hasta ahora?",
          ayuda: "Muéstranos que no empiezas de cero. Por ejemplo:",
          puntos: [
            "Proyectos en los que has trabajado.",
            "Textos que has escrito.",
            "Recursos que has leído o visto.",
            "Eventos que has organizado o a los que has ido.",
          ],
        },
        qSkills: {
          label: "¿Qué habilidades has desarrollado que sirvan para que a la IA le vaya bien?",
          ayuda: "¿Qué vas a aportar? Por ejemplo:",
          puntos: [
            "Formación técnica o de programación.",
            "Habilidades de investigación o de análisis.",
            "Experiencia en comunicación u organización.",
            "Experiencia en política pública o gobernanza.",
          ],
          cierre: "Las habilidades técnicas y las no técnicas cuentan por igual.",
        },
        qAchievement: {
          label: "Cuéntanos del logro del que estás más orgulloso.",
          ayuda: "Buscamos gente que construye, no solo que piensa. Muéstranos algo que sacaste adelante:",
          puntos: [
            "Ese proyecto que lograste.",
            "El sistema que cambiaste desde adentro.",
            "La comunidad que armaste desde cero.",
            "El problema que todos decían que no tenía solución y resolviste.",
          ],
          cierre: "Es tu oportunidad de presumir. Aprovéchala.",
        },
      },
    },

    fuente: "¿Dónde supiste del seminario?",
    fuenteAyuda: "Sé específico, por ejemplo:",
    fuenteEjemplos: [
      "[Nombre] me lo recomendó después de hacerlo",
      "Vi la publicación de [nombre] en LinkedIn",
      "Lo encontré buscando cursos de AI safety",
      "Lo mencionaron en el grupo de WhatsApp de AI Safety Colombia",
    ],
    nominado: "¿A quién es la persona más excepcional que nominarías para este seminario? Incluye su correo.",
    nominadoAyuda:
      "Puedes nominar a más de una. Pídeles permiso antes de darnos su correo. Les escribimos una sola vez y, si no aplican, borramos el correo a los 60 días.",
    mencion: "¿Podemos mencionar tu nombre si les escribimos?",
    si: "Sí",
    no: "No",
    comentarios: "¿Tienes comentarios sobre este formulario?",
    comentariosAyuda: "Si necesitas una respuesta, escríbenos.",
    privacidadAntes:
      "Para consultar, corregir o borrar tus datos, escribe a ",
    privacidadDespues: ".",
  },

  en: {
    kicker: "BlueDot Impact seminars · applications open",
    titulo: "Apply to the seminars",
    entrada:
      "The form takes about 30 minutes, and bullet points are fine.",
    cierre: "Closes Friday 9 October at 11:59 pm, Colombia time.",
    sinIA: "Please don't use AI to answer: we want to hear from you.",
    prerrequisitoTitulo: "Before applying to the Technical AI Safety Seminar you should:",
    prerrequisitos: [
      "Understand that AI systems are grown, not designed, and that we don't fully understand them.",
      "Understand what drives AI progress and the impact this has on progress in different domains.",
      "Be able to articulate specific risks AI poses (beyond just “could be dangerous”).",
    ],
    prerrequisitoCierre: "If you are unsure about any of these, consider starting with the Seminar on the Future and Risks of AI.",
    nombreCurso: { "agi-strategy": "Seminar on the Future and Risks of AI", "technical-ai-safety": "Technical AI Safety Seminar" },
    resumenCurso: {
      "agi-strategy":
        "Why there is a race to AGI, what drives progress, what the risks are and what defences exist.",
      "technical-ai-safety":
        "How safer models are trained, how they are evaluated, mechanistic interpretability and AI control.",
    },

    cerradoTitulo: "Applications have closed",
    cerradoCuerpo:
      "This round closed on Friday 9 October. The next one is announced first in the WhatsApp group.",
    enviadoTitulo: "We got your application",
    enviadoCuerpo:
      "A confirmation is on its way to your inbox. We review applications after the 9 October deadline and reply to everyone, whether or not they get in.",
    enviadoGrupo: "Join the WhatsApp group",
    volver: "Back to Join us",
    fallaAntes: "We couldn't save your application. Try again in a moment or write to ",
    fallaDespues: " and we'll take it by hand.",

    resumenTitulo: "Still missing:",
    faltaResponder: "This answer is missing.",
    correoMal: "Check the email address.",
    urlMal: "Paste the full link, starting with https://",
    maxTres: "Pick three at most.",
    limite: (tope) => `${tope} characters at most.`,
    opcional: " (optional)",
    trampa: "Leave blank",
    enviar: "Submit application",
    enviando: "Sending…",
    guardado: "What you type is saved in this browser until you submit.",

    falta: {
      course: "Seminar",
      format: "Your availability",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      profileUrl: "Profile",
      fields: "Field of study",
      careerStage: "Career stage",
      hours: "Hours spent on AI safety",
      qPlan: "What you will do after the seminar",
      qEngagement: "How you have engaged with AI safety",
      qSkills: "Your skills",
      qAchievement: "Something you have built",
      qTradeoff: "The hardest tradeoff",
      source: "Where you heard about the seminar",
      nominee: "Who you would nominate",
      mentionName: "Whether we can mention your name",
    },

    seccionCurso: "The seminar",
    seccionTu: "About you",
    seccionMotivacion: "Your skills and motivation",
    seccionCierre: "Concluding",

    curso: "Seminar you're applying for",
    formato: "Can you make it every week?",
    formatoAyuda:
      "Three hours a week from 12 October: one of reading and two of session with your cohort. To get the certificate you can miss at most one session.",
    formatos: {
      todas: "Yes, I can make it every week",
      "casi-todas": "Almost every week: I might miss one",
      "no-puedo": "I can't make these dates; let me know about the next cohort",
    },
    alternativaCheck: "If you think it suits me better, I'm open to taking the Seminar on the Future and Risks of AI instead",

    nombre: "First name",
    apellido: "Last name",
    correo: "Email address",
    perfil: "Profile URL",
    perfilAyuda: "A link to your LinkedIn profile or your CV. We prefer LinkedIn.",
    otroPerfil: "Link to any other profile",
    otroPerfilAyuda: "E.g. your CV, GitHub, personal website, blog.",
    areas: "What is the closest match to your field(s) of study?",
    areasAyuda: "Select up to three, including past or present studies.",
    areasOpciones: {
      biology: "Biology",
      chemistry: "Chemistry",
      "public-health": "Public Health / Medicine",
      psychology: "Psychology",
      engineering: "Engineering (not software)",
      materials: "Materials Science",
      physics: "Physics",
      mathematics: "Mathematics",
      neuroscience: "Neuroscience",
      "international-relations": "International Relations",
      economics: "Economics",
      history: "History",
      law: "Law",
      philosophy: "Philosophy",
      politics: "Politics",
      policy: "Policy",
      "ml-ai": "Machine Learning / AI",
      "computer-science": "Computer Science",
      business: "Business",
      other: "Other",
    },
    etapa: "What is your current career stage?",
    etapas: {
      experienced: "Experienced professional (10 years+ post uni)",
      "mid-career": "Mid-career professional (3-10 years post uni)",
      "early-career": "Early-career professional (< 3 years post uni)",
      "postdoc-professor": "PostDoc / Professor",
      phd: "PhD",
      masters: "Master's",
      undergraduate: "Undergraduate",
      "high-school": "High school",
      other: "Other (please provide details)",
    },
    etapaDetalle: "Details",
    escoger: "Choose an option",
    escogerVarias: "Choose up to three",
    horas: "How many hours have you spent engaging with AI safety content so far?",
    horasAyuda: "A rough estimate is fine.",

    preguntas: {
      "agi-strategy": {
        qPlan: {
          label: "What will you do differently after this seminar, and why can't you do it now?",
          ayuda: "Be concrete. We want to know:",
          puntos: [
            "What specific action will you take?",
            "What access, position, or leverage do you have that makes you the person to do it?",
            "What's missing that this seminar provides?",
          ],
        },
        qEngagement: {
          label: "How have you engaged with AI safety so far?",
          ayuda: "What have you read, built, attended, or worked on?",
        },
        qSkills: {
          label: "What skills will you contribute?",
          ayuda:
            "Policy, technical, research, communications, operations: we believe all matter in the fight to make AI go well. Where have you demonstrated yours?",
        },
        qAchievement: {
          label: "Tell us about something you've built, shipped, or made happen.",
          ayuda:
            "We're looking for people who execute. What's one project, system, community, or outcome you created? Why are you proud of it?",
        },
        qTradeoff: {
          label: "What's the hardest tradeoff or tension you see in AI safety, and how do you think about it?",
        },
      },
      "technical-ai-safety": {
        qPlan: {
          label: "How do you expect this seminar will help you contribute to making AI go well?",
          ayuda: "We suggest you respond with 3-7 bullet points. Tell us your game plan. We want specifics:",
          puntos: [
            "What steps will you take post-seminar?",
            "How does this seminar unlock those moves?",
            "What's your theory of change for AI safety?",
          ],
          cierre:
            "We're not looking for perfect answers, but we are looking for people who've thought seriously about their role in this critical moment.",
        },
        qEngagement: {
          label: "How have you engaged with the AI safety field so far?",
          ayuda: "Show us you're not starting from zero. This could include things like:",
          puntos: [
            "Projects you've worked on",
            "Blog posts you've written",
            "Resources you've read or watched",
            "Events you've organised or attended",
          ],
        },
        qSkills: {
          label: "What skills have you developed that could be used to make AI go well?",
          ayuda: "What will you contribute? This could be:",
          puntos: [
            "Technical/programming background",
            "Research or analytical skills",
            "Communications or organizing experience",
            "Policy or governance experience",
          ],
          cierre: "Technical and non-technical skills both matter.",
        },
        qAchievement: {
          label: "Tell us about one achievement you're most proud of.",
          ayuda: "We're looking for builders, not just thinkers. Show us you ship:",
          puntos: [
            "That one project you pulled off",
            "The system you changed from the inside",
            "The community you built from scratch",
            "The challenge everyone said couldn't be solved and then you solved it",
          ],
          cierre: "This is your chance to brag. Use it!",
        },
      },
    },

    fuente: "Where did you hear about this seminar?",
    fuenteAyuda: "Please be specific! For example:",
    fuenteEjemplos: [
      "[Name] recommended it after taking it",
      "Saw [name]'s LinkedIn post about their experience",
      "Found via search for AI safety seminars",
      "It was mentioned in the AI Safety Colombia WhatsApp group",
    ],
    nominado: "Who is the most exceptional person you would nominate for this seminar? Please include their email.",
    nominadoAyuda:
      "You can nominate more than one. Ask them first before giving us their email. We write to them once and, if they don't apply, delete the email after 60 days.",
    mencion: "Can we mention your name if we reach out to them?",
    si: "Yes",
    no: "No",
    comentarios: "Do you have any feedback on this application form?",
    comentariosAyuda: "If you need a response from us, please contact us.",
    privacidadAntes:
      "To access, correct or delete your data, write to ",
    privacidadDespues: ".",
  },

  pt: {
    kicker: "Seminários da BlueDot Impact · inscrições abertas",
    titulo: "Inscreva-se nos seminários",
    entrada:
      "O formulário leva uns 30 minutos e você pode responder em tópicos.",
    cierre: "Fecha na sexta-feira, 9 de outubro, às 23h59, horário da Colômbia.",
    sinIA: "Por favor, não use IA para responder: queremos ler você.",
    prerrequisitoTitulo: "Antes de se inscrever no Seminário técnico de segurança da IA, você deveria:",
    prerrequisitos: [
      "Entender que os sistemas de IA são treinados, não projetados, e que não os entendemos por completo.",
      "Entender o que impulsiona o progresso da IA e que efeito esse progresso tem em diferentes áreas.",
      "Saber apontar riscos concretos da IA, além de «pode ser perigosa».",
    ],
    prerrequisitoCierre: "Se não tiver certeza de algum deles, comece pelo Seminário de futuro e riscos da IA.",
    nombreCurso: { "agi-strategy": "Seminário de futuro e riscos da IA", "technical-ai-safety": "Seminário técnico de segurança da IA" },
    resumenCurso: {
      "agi-strategy":
        "Por que existe uma corrida rumo à AGI, o que impulsiona o progresso, quais são os riscos e que defesas existem.",
      "technical-ai-safety":
        "Como se treinam modelos mais seguros, como são avaliados, interpretabilidade mecanicista e AI control.",
    },

    cerradoTitulo: "As inscrições fecharam",
    cerradoCuerpo:
      "Esta rodada fechou na sexta-feira, 9 de outubro. A próxima é anunciada primeiro no grupo de WhatsApp.",
    enviadoTitulo: "Recebemos sua inscrição",
    enviadoCuerpo:
      "Uma confirmação chega no seu e-mail. Revisamos as inscrições depois do encerramento, em 9 de outubro, e respondemos a todo mundo, com ou sem vaga.",
    enviadoGrupo: "Entrar no grupo de WhatsApp",
    volver: "Voltar para Participe",
    fallaAntes: "Não conseguimos salvar sua inscrição. Tente de novo em instantes ou escreva para ",
    fallaDespues: " e a recebemos manualmente.",

    resumenTitulo: "Falta responder:",
    faltaResponder: "Falta esta resposta.",
    correoMal: "Confira o e-mail.",
    urlMal: "Cole o link completo, começando por https://",
    maxTres: "Escolha no máximo três.",
    limite: (tope) => `No máximo ${tope} caracteres.`,
    opcional: " (opcional)",
    trampa: "Não preencher",
    enviar: "Enviar inscrição",
    enviando: "Enviando…",
    guardado: "O que você escreve fica salvo neste navegador até o envio.",

    falta: {
      course: "O seminário",
      format: "Sua disponibilidade",
      firstName: "Nome",
      lastName: "Sobrenome",
      email: "E-mail",
      profileUrl: "Perfil",
      fields: "Área de estudo",
      careerStage: "Etapa da carreira",
      hours: "Horas dedicadas a AI safety",
      qPlan: "O que você vai fazer depois do seminário",
      qEngagement: "Como você se envolveu com AI safety",
      qSkills: "Suas habilidades",
      qAchievement: "Algo que você construiu",
      qTradeoff: "A tensão mais difícil",
      source: "Onde soube do seminário",
      nominee: "Quem você indicaria",
      mentionName: "Se podemos mencionar seu nome",
    },

    seccionCurso: "O seminário",
    seccionTu: "Sobre você",
    seccionMotivacion: "Suas habilidades e sua motivação",
    seccionCierre: "Para fechar",

    curso: "Em qual seminário você se inscreve?",
    formato: "Você consegue participar todas as semanas?",
    formatoAyuda:
      "São três horas por semana a partir de 12 de outubro: uma de leituras e duas de sessão com a turma. Para o certificado, pode faltar a no máximo uma sessão.",
    formatos: {
      todas: "Sim, consigo participar todas as semanas",
      "casi-todas": "Quase todas: talvez eu perca uma",
      "no-puedo": "Não consigo nessas datas; me avisem da próxima turma",
    },
    alternativaCheck: "Se acharem melhor para mim, estou aberto a fazer o Seminário de futuro e riscos da IA no lugar",

    nombre: "Nome",
    apellido: "Sobrenome",
    correo: "E-mail",
    perfil: "Link do seu perfil",
    perfilAyuda: "Seu LinkedIn ou seu currículo. Preferimos LinkedIn.",
    otroPerfil: "Outro perfil",
    otroPerfilAyuda: "Por exemplo seu currículo, GitHub, site pessoal ou blog.",
    areas: "Qual é a área mais próxima do que você estudou?",
    areasAyuda: "Escolha até três, contando estudos passados ou atuais.",
    areasOpciones: {
      biology: "Biologia",
      chemistry: "Química",
      "public-health": "Saúde pública / Medicina",
      psychology: "Psicologia",
      engineering: "Engenharia (não de software)",
      materials: "Ciência dos materiais",
      physics: "Física",
      mathematics: "Matemática",
      neuroscience: "Neurociência",
      "international-relations": "Relações internacionais",
      economics: "Economia",
      history: "História",
      law: "Direito",
      philosophy: "Filosofia",
      politics: "Ciência política",
      policy: "Políticas públicas",
      "ml-ai": "Machine learning / IA",
      "computer-science": "Ciência da computação",
      business: "Administração / Negócios",
      other: "Outra",
    },
    etapa: "Em que etapa da carreira você está?",
    etapas: {
      experienced: "Profissional experiente (mais de 10 anos depois da universidade)",
      "mid-career": "Profissional no meio da carreira (3 a 10 anos depois da universidade)",
      "early-career": "Profissional em início de carreira (menos de 3 anos depois da universidade)",
      "postdoc-professor": "Pós-doutorado / Professor",
      phd: "Doutorado",
      masters: "Mestrado",
      undergraduate: "Graduação",
      "high-school": "Ensino médio",
      other: "Outra (conte qual)",
    },
    etapaDetalle: "Qual?",
    escoger: "Escolha uma opção",
    escogerVarias: "Escolha até três",
    horas: "Quantas horas você já dedicou a conteúdo de AI safety?",
    horasAyuda: "Uma estimativa aproximada basta.",

    preguntas: {
      "agi-strategy": {
        qPlan: {
          label: "O que você vai fazer de diferente depois do seminário e por que não consegue fazer hoje?",
          ayuda: "Seja concreto. Queremos saber:",
          puntos: [
            "Que ação específica você vai tomar.",
            "Que acesso, posição ou alavanca você tem que faz de você a pessoa para isso.",
            "O que falta que este seminário oferece.",
          ],
        },
        qEngagement: {
          label: "Como você se envolveu com AI safety até agora?",
          ayuda: "O que você leu, construiu, de que participou ou em que trabalhou.",
        },
        qSkills: {
          label: "Que habilidades você vai trazer?",
          ayuda:
            "Políticas públicas, técnica, pesquisa, comunicação, operações: acreditamos que todas contam para a IA dar certo. Onde você demonstrou as suas?",
        },
        qAchievement: {
          label: "Conte algo que você construiu, lançou ou fez acontecer.",
          ayuda:
            "Buscamos gente que executa. Que projeto, sistema, comunidade ou resultado você criou? Por que tem orgulho dele?",
        },
        qTradeoff: {
          label: "Qual é a tensão ou o dilema mais difícil que você vê em AI safety e como pensa sobre ele?",
        },
      },
      "technical-ai-safety": {
        qPlan: {
          label: "Como você espera que este seminário ajude você a contribuir para a IA dar certo?",
          ayuda: "Sugerimos responder com 3 a 7 tópicos. Conte seu plano, com detalhes:",
          puntos: [
            "Que passos você vai dar depois do seminário.",
            "Como o seminário permite dar esses passos.",
            "Qual é sua teoria de mudança para AI safety.",
          ],
          cierre:
            "Não buscamos respostas perfeitas, mas sim gente que pensou a sério no seu papel neste momento.",
        },
        qEngagement: {
          label: "Como você se envolveu com o campo de AI safety até agora?",
          ayuda: "Mostre que não está começando do zero. Por exemplo:",
          puntos: [
            "Projetos em que trabalhou.",
            "Textos que escreveu.",
            "Recursos que leu ou assistiu.",
            "Eventos que organizou ou de que participou.",
          ],
        },
        qSkills: {
          label: "Que habilidades você desenvolveu que servem para a IA dar certo?",
          ayuda: "O que você vai trazer? Por exemplo:",
          puntos: [
            "Formação técnica ou de programação.",
            "Habilidades de pesquisa ou de análise.",
            "Experiência em comunicação ou organização.",
            "Experiência em políticas públicas ou governança.",
          ],
          cierre: "Habilidades técnicas e não técnicas contam igual.",
        },
        qAchievement: {
          label: "Conte a conquista de que você mais se orgulha.",
          ayuda: "Buscamos gente que constrói, não só que pensa. Mostre algo que você tirou do papel:",
          puntos: [
            "Aquele projeto que você conseguiu entregar.",
            "O sistema que você mudou por dentro.",
            "A comunidade que você montou do zero.",
            "O problema que todos diziam não ter solução e você resolveu.",
          ],
          cierre: "É sua chance de se gabar. Aproveite.",
        },
      },
    },

    fuente: "Onde você soube do seminário?",
    fuenteAyuda: "Seja específico, por exemplo:",
    fuenteEjemplos: [
      "[Nome] me recomendou depois de fazer",
      "Vi o post de [nome] no LinkedIn",
      "Encontrei buscando cursos de AI safety",
      "Mencionaram no grupo de WhatsApp da AI Safety Colombia",
    ],
    nominado: "Quem é a pessoa mais excepcional que você indicaria para este seminário? Inclua o e-mail dela.",
    nominadoAyuda:
      "Pode indicar mais de uma. Peça permissão antes de nos passar o e-mail. Escrevemos uma única vez e, se a pessoa não se inscrever, apagamos o e-mail após 60 dias.",
    mencion: "Podemos mencionar seu nome se escrevermos para elas?",
    si: "Sim",
    no: "Não",
    comentarios: "Você tem comentários sobre este formulário?",
    comentariosAyuda: "Se precisar de resposta, escreva para nós.",
    privacidadAntes:
      "Para consultar, corrigir ou apagar seus dados, escreva para ",
    privacidadDespues: ".",
  },
};
