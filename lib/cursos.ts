import type { Idioma } from "./idiomas";

/* Los dos cursos de BlueDot Impact que AI Safety Colombia corre por su cuenta:
   AGI Strategy y Technical AI Safety. El formulario copia el de BlueDot
   pregunta por pregunta, traducido. Dos cambios: la pregunta por la ronda se
   volvió una de disponibilidad, porque solo hay una cohorte de cada curso, a
   tiempo parcial desde el lunes 12 de octubre; y se quitó el consentimiento de
   datos de diversidad, porque ese formulario aparte no existe acá.

   Los identificadores de las opciones no se traducen: son los que viajan a la
   base de datos. Todo lo que ve la persona sí, y va en `Record<Idioma, …>` para
   que dejar un idioma sin escribir no compile. */

export type CursoId = "agi-strategy" | "technical-ai-safety";

export const CURSOS: CursoId[] = ["agi-strategy", "technical-ai-safety"];

/** Domingo 11 de octubre de 2026, 23:59 en Bogotá. */
export const CIERRE_CURSOS_ISO = "2026-10-11T23:59:59-05:00";

export function cursosCerrados(): boolean {
  return Date.now() > Date.parse(CIERRE_CURSOS_ISO);
}

export const RUTA_APLICAR_CURSOS: Record<Idioma, string> = {
  es: "/cursos/aplicar",
  en: "/en/courses/apply",
  pt: "/pt/cursos/inscricao",
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

export const ETAPAS = [
  "experienced",
  "mid-career",
  "early-career",
  "postdoc-professor",
  "phd",
  "masters",
  "undergraduate",
  "high-school",
  "other",
] as const;

/* Las cohortes arrancan el lunes 12 de octubre: AGI Strategy dura cinco semanas
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
  location: 150,
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
    "role",
    "format",
    "firstName",
    "lastName",
    "email",
    "profileUrl",
    "fields",
    "careerStage",
    "location",
    ...(curso === "agi-strategy" ? ["hours"] : []),
    ...PREGUNTAS[curso],
    "source",
    "nominee",
    "mentionName",
    "shareData",
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
  rol: string;
  rolAyuda: string;
  roles: { participante: string; facilitador: string };
  formato: string;
  formatoAyuda: string;
  formatos: Record<(typeof FORMATOS)[number], string>;
  alternativa: string;
  alternativaAyuda: string;
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
  ubicacion: string;
  ubicacionAyuda: string;
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
  compartir: string;
  compartirAyuda: string;
  compartirSi: string;
  compartirNo: string;
  privacidadAntes: string;
  privacidadDespues: string;
};

export const TEXTOS_CURSOS: Record<Idioma, TextosCursos> = {
  es: {
    kicker: "Cursos de BlueDot Impact · aplicaciones abiertas",
    titulo: "Aplica a los cursos",
    entrada:
      "Corremos por nuestra cuenta dos cursos de BlueDot Impact: AGI Strategy y Technical AI Safety. Llenar el formulario toma unos 30 minutos. Puedes responder con viñetas.",
    cierre: "Las aplicaciones cierran el domingo 11 de octubre a las 11:59 p. m., hora de Colombia.",
    sinIA: "Por favor no uses IA para responder: queremos leerte a ti.",
    prerrequisitoTitulo: "Antes de aplicar a Technical AI Safety deberías:",
    prerrequisitos: [
      "Entender que los sistemas de IA se entrenan, no se diseñan, y que no los entendemos del todo.",
      "Entender qué impulsa el progreso de la IA y qué efecto tiene ese progreso en distintos campos.",
      "Poder nombrar riesgos concretos de la IA, más allá de «puede ser peligrosa».",
    ],
    prerrequisitoCierre: "Si no estás seguro de alguno, empieza por AGI Strategy.",
    nombreCurso: { "agi-strategy": "AGI Strategy", "technical-ai-safety": "Technical AI Safety" },
    resumenCurso: {
      "agi-strategy":
        "Por qué se está corriendo hacia la AGI, qué impulsa el progreso, cuáles son los riesgos y qué defensas existen.",
      "technical-ai-safety":
        "Cómo se entrenan modelos más seguros, cómo se evalúan, interpretabilidad mecanicista y AI control.",
    },

    cerradoTitulo: "Las aplicaciones cerraron",
    cerradoCuerpo:
      "La convocatoria cerró el domingo 11 de octubre. La próxima se anuncia primero en el grupo de WhatsApp.",
    enviadoTitulo: "Recibimos tu aplicación",
    enviadoCuerpo:
      "Te llega una confirmación al correo. Revisamos las aplicaciones después del cierre, el 11 de octubre, y le respondemos a todo el mundo, quede o no.",
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
      course: "El curso",
      role: "Si aplicas como participante o facilitador",
      format: "Tu disponibilidad",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo",
      profileUrl: "Perfil",
      fields: "Área de estudio",
      careerStage: "Etapa de carrera",
      location: "Dónde vas a estar",
      hours: "Horas dedicadas a AI safety",
      qPlan: "Qué vas a hacer después del curso",
      qEngagement: "Cómo te has involucrado con AI safety",
      qSkills: "Tus habilidades",
      qAchievement: "Algo que hayas construido",
      qTradeoff: "La tensión más difícil",
      source: "Dónde supiste del curso",
      nominee: "A quién nominarías",
      mentionName: "Si podemos mencionar tu nombre",
      shareData: "Si podemos compartir tus datos",
    },

    seccionCurso: "El curso",
    seccionTu: "Sobre ti",
    seccionMotivacion: "Tus habilidades y tu motivación",
    seccionCierre: "Para cerrar",

    curso: "¿A qué curso aplicas?",
    rol: "¿Aplicas como participante o como facilitador?",
    rolAyuda:
      "Si marcas las dos, te consideramos primero como facilitador. Si esta vez no podemos invitarte a facilitar, te consideramos como participante.",
    roles: { participante: "Participante", facilitador: "Facilitador" },
    formato: "¿Puedes estar todas las semanas?",
    formatoAyuda:
      "El curso arranca el lunes 12 de octubre y va a tiempo parcial, con una discusión en vivo cada semana. AGI Strategy dura cinco semanas y Technical AI Safety seis.",
    formatos: {
      todas: "Sí, puedo estar todas las semanas",
      "casi-todas": "Casi todas: puede que falte a una",
      "no-puedo": "No puedo en estas fechas; avísenme de la próxima cohorte",
    },
    alternativa: "Ubicación alternativa",
    alternativaAyuda:
      "Puede que a alguien le sirva más empezar por AGI Strategy. Marca la casilla si estás abierto a que te ubiquemos ahí si te lo recomendamos.",
    alternativaCheck: "Estoy abierto a hacer AGI Strategy en su lugar",

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
    ubicacion: "¿Dónde vas a estar durante el curso?",
    ubicacionAyuda: "Ciudad y país. Si no estás seguro, pon tu mejor estimado.",
    horas: "¿Cuántas horas le has dedicado hasta ahora a contenido de AI safety?",
    horasAyuda: "Un estimado aproximado está bien.",

    preguntas: {
      "agi-strategy": {
        qPlan: {
          label: "¿Qué vas a hacer distinto después del curso y por qué no lo puedes hacer hoy?",
          ayuda: "Sé concreto. Queremos saber:",
          puntos: [
            "Qué acción específica vas a tomar.",
            "Qué acceso, posición o palanca tienes que te hace la persona para hacerlo.",
            "Qué te falta que este curso te da.",
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
          label: "¿Cómo crees que este curso te va a ayudar a contribuir a que a la IA le vaya bien?",
          ayuda: "Te sugerimos responder con 3 a 7 viñetas. Cuéntanos tu plan, con detalles:",
          puntos: [
            "Qué pasos vas a dar después del curso.",
            "Cómo te habilita el curso para darlos.",
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

    fuente: "¿Dónde supiste del curso?",
    fuenteAyuda: "Sé específico, por ejemplo:",
    fuenteEjemplos: [
      "[Nombre] me lo recomendó después de hacerlo",
      "Vi la publicación de [nombre] en LinkedIn",
      "Lo encontré buscando cursos de AI safety",
      "Lo mencionaron en el grupo de WhatsApp de AI Safety Colombia",
    ],
    nominado: "¿A quién es la persona más excepcional que nominarías para este curso? Incluye su correo.",
    nominadoAyuda: "Puedes nominar a más de una. Si creemos que encajan, puede que les escribamos.",
    mencion: "¿Podemos mencionar tu nombre si les escribimos?",
    si: "Sí",
    no: "No",
    comentarios: "¿Tienes comentarios sobre este formulario?",
    comentariosAyuda: "Si necesitas una respuesta, escríbenos.",
    compartir: "¿Podemos compartir tus datos con otras organizaciones de AI safety?",
    compartirAyuda:
      "Si aceptas, podemos compartir partes de tu aplicación y de tu paso por el curso (por ejemplo, tu participación en las discusiones y tu asistencia) con organizaciones en las que confiamos, que a veces escriben con trabajos u otras oportunidades que pueden servir como siguiente paso. No afecta la decisión sobre tu aplicación. Para dejar de compartirlos o cambiarlos, escríbenos.",
    compartirSi: "Sí, acepto",
    compartirNo: "No acepto",
    privacidadAntes:
      "Usamos tus respuestas solo para decidir las cohortes y escribirte sobre el curso. Para corregir o borrar tus datos, escribe a ",
    privacidadDespues: ".",
  },

  en: {
    kicker: "BlueDot Impact courses · applications open",
    titulo: "Apply to the courses",
    entrada:
      "We run two BlueDot Impact courses on our own: AGI Strategy and Technical AI Safety. The form takes around 30 minutes. Bullet points are fine.",
    cierre: "Applications close on Sunday 11 October at 11:59 pm, Colombia time.",
    sinIA: "Please don't use AI to answer: we want to hear from you.",
    prerrequisitoTitulo: "Before applying to Technical AI Safety you should:",
    prerrequisitos: [
      "Understand that AI systems are grown, not designed, and that we don't fully understand them.",
      "Understand what drives AI progress and the impact this has on progress in different domains.",
      "Be able to articulate specific risks AI poses (beyond just “could be dangerous”).",
    ],
    prerrequisitoCierre: "If you are unsure about any of these, consider starting with AGI Strategy.",
    nombreCurso: { "agi-strategy": "AGI Strategy", "technical-ai-safety": "Technical AI Safety" },
    resumenCurso: {
      "agi-strategy":
        "Why there is a race to AGI, what drives progress, what the risks are and what defences exist.",
      "technical-ai-safety":
        "How safer models are trained, how they are evaluated, mechanistic interpretability and AI control.",
    },

    cerradoTitulo: "Applications have closed",
    cerradoCuerpo:
      "This round closed on Sunday 11 October. The next one is announced first in the WhatsApp group.",
    enviadoTitulo: "We got your application",
    enviadoCuerpo:
      "A confirmation is on its way to your inbox. We review applications after the 11 October deadline and reply to everyone, whether or not they get in.",
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
      course: "Course",
      role: "Participant or facilitator",
      format: "Your availability",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      profileUrl: "Profile",
      fields: "Field of study",
      careerStage: "Career stage",
      location: "Where you will be based",
      hours: "Hours spent on AI safety",
      qPlan: "What you will do after the course",
      qEngagement: "How you have engaged with AI safety",
      qSkills: "Your skills",
      qAchievement: "Something you have built",
      qTradeoff: "The hardest tradeoff",
      source: "Where you heard about the course",
      nominee: "Who you would nominate",
      mentionName: "Whether we can mention your name",
      shareData: "Whether we can share your data",
    },

    seccionCurso: "The course",
    seccionTu: "About you",
    seccionMotivacion: "Your skills and motivation",
    seccionCierre: "Concluding",

    curso: "Course you're applying for",
    rol: "Are you applying as a participant or facilitator?",
    rolAyuda:
      "If you check both boxes, we will consider you first as a facilitator. If we can't invite you to facilitate this time, we will consider you as a participant.",
    roles: { participante: "Participant", facilitador: "Facilitator" },
    formato: "Can you make it every week?",
    formatoAyuda:
      "The course starts on Monday 12 October and runs part-time, with one live discussion each week. AGI Strategy lasts five weeks and Technical AI Safety six.",
    formatos: {
      todas: "Yes, I can make it every week",
      "casi-todas": "Almost every week: I might miss one",
      "no-puedo": "I can't make these dates; let me know about the next cohort",
    },
    alternativa: "Alternative course placement",
    alternativaAyuda:
      "We may identify strong applicants who would benefit from starting with the AGI Strategy course. Check the box if you're open to being placed there instead if recommended.",
    alternativaCheck: "I'm open to taking AGI Strategy instead",

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
    ubicacion: "Where will you be based during this course?",
    ubicacionAyuda: "City and country. If you're not sure, give your current best guess.",
    horas: "How many hours have you spent engaging with AI safety content so far?",
    horasAyuda: "A rough estimate is fine.",

    preguntas: {
      "agi-strategy": {
        qPlan: {
          label: "What will you do differently after this course, and why can't you do it now?",
          ayuda: "Be concrete. We want to know:",
          puntos: [
            "What specific action will you take?",
            "What access, position, or leverage do you have that makes you the person to do it?",
            "What's missing that this course provides?",
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
          label: "How do you expect this course will help you contribute to making AI go well?",
          ayuda: "We suggest you respond with 3-7 bullet points. Tell us your game plan. We want specifics:",
          puntos: [
            "What steps will you take post-course?",
            "How does this course unlock those moves?",
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

    fuente: "Where did you hear about this course?",
    fuenteAyuda: "Please be specific! For example:",
    fuenteEjemplos: [
      "[Name] recommended it after taking it",
      "Saw [name]'s LinkedIn post about their experience",
      "Found via search for AI safety courses",
      "It was mentioned in the AI Safety Colombia WhatsApp group",
    ],
    nominado: "Who is the most exceptional person you would nominate for this course? Please include their email.",
    nominadoAyuda: "You can nominate more than one. If we think they're a good fit, we may reach out to them.",
    mencion: "Can we mention your name if we reach out to them?",
    si: "Yes",
    no: "No",
    comentarios: "Do you have any feedback on this application form?",
    comentariosAyuda: "If you need a response from us, please contact us.",
    compartir: "Can we share your data with third-party AI safety organisations?",
    compartirAyuda:
      "If you opt in, we may share parts of your application and course participation (like your discussion contributions and attendance) with organisations we trust. They sometimes email people with jobs or other opportunities that could serve as good next steps. It will not affect your application decision. To stop sharing or update your details, write to us.",
    compartirSi: "Yes, I consent",
    compartirNo: "No, I don't consent",
    privacidadAntes:
      "We only use your answers to form the cohorts and to write to you about the course. To correct or delete your data, write to ",
    privacidadDespues: ".",
  },

  pt: {
    kicker: "Cursos da BlueDot Impact · inscrições abertas",
    titulo: "Inscreva-se nos cursos",
    entrada:
      "Oferecemos por conta própria dois cursos da BlueDot Impact: AGI Strategy e Technical AI Safety. Preencher o formulário leva uns 30 minutos. Pode responder em tópicos.",
    cierre: "As inscrições fecham no domingo, 11 de outubro, às 23h59, horário da Colômbia.",
    sinIA: "Por favor, não use IA para responder: queremos ler você.",
    prerrequisitoTitulo: "Antes de se inscrever em Technical AI Safety, você deveria:",
    prerrequisitos: [
      "Entender que os sistemas de IA são treinados, não projetados, e que não os entendemos por completo.",
      "Entender o que impulsiona o progresso da IA e que efeito esse progresso tem em diferentes áreas.",
      "Saber apontar riscos concretos da IA, além de «pode ser perigosa».",
    ],
    prerrequisitoCierre: "Se não tiver certeza de algum deles, comece por AGI Strategy.",
    nombreCurso: { "agi-strategy": "AGI Strategy", "technical-ai-safety": "Technical AI Safety" },
    resumenCurso: {
      "agi-strategy":
        "Por que existe uma corrida rumo à AGI, o que impulsiona o progresso, quais são os riscos e que defesas existem.",
      "technical-ai-safety":
        "Como se treinam modelos mais seguros, como são avaliados, interpretabilidade mecanicista e AI control.",
    },

    cerradoTitulo: "As inscrições fecharam",
    cerradoCuerpo:
      "Esta rodada fechou no domingo, 11 de outubro. A próxima é anunciada primeiro no grupo de WhatsApp.",
    enviadoTitulo: "Recebemos sua inscrição",
    enviadoCuerpo:
      "Uma confirmação chega no seu e-mail. Revisamos as inscrições depois do encerramento, em 11 de outubro, e respondemos a todo mundo, com ou sem vaga.",
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
      course: "O curso",
      role: "Se você se inscreve como participante ou facilitador",
      format: "Sua disponibilidade",
      firstName: "Nome",
      lastName: "Sobrenome",
      email: "E-mail",
      profileUrl: "Perfil",
      fields: "Área de estudo",
      careerStage: "Etapa da carreira",
      location: "Onde você vai estar",
      hours: "Horas dedicadas a AI safety",
      qPlan: "O que você vai fazer depois do curso",
      qEngagement: "Como você se envolveu com AI safety",
      qSkills: "Suas habilidades",
      qAchievement: "Algo que você construiu",
      qTradeoff: "A tensão mais difícil",
      source: "Onde soube do curso",
      nominee: "Quem você indicaria",
      mentionName: "Se podemos mencionar seu nome",
      shareData: "Se podemos compartilhar seus dados",
    },

    seccionCurso: "O curso",
    seccionTu: "Sobre você",
    seccionMotivacion: "Suas habilidades e sua motivação",
    seccionCierre: "Para fechar",

    curso: "Em qual curso você se inscreve?",
    rol: "Você se inscreve como participante ou como facilitador?",
    rolAyuda:
      "Se marcar as duas, consideramos você primeiro como facilitador. Se desta vez não pudermos convidar você para facilitar, consideramos você como participante.",
    roles: { participante: "Participante", facilitador: "Facilitador" },
    formato: "Você consegue participar todas as semanas?",
    formatoAyuda:
      "O curso começa na segunda-feira, 12 de outubro, em meio período, com uma discussão ao vivo por semana. AGI Strategy dura cinco semanas e Technical AI Safety, seis.",
    formatos: {
      todas: "Sim, consigo participar todas as semanas",
      "casi-todas": "Quase todas: talvez eu perca uma",
      "no-puedo": "Não consigo nessas datas; me avisem da próxima turma",
    },
    alternativa: "Alocação alternativa",
    alternativaAyuda:
      "Pode ser melhor para algumas pessoas começar por AGI Strategy. Marque a caixa se estiver aberto a ser alocado lá caso a gente recomende.",
    alternativaCheck: "Estou aberto a fazer AGI Strategy no lugar",

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
    ubicacion: "Onde você vai estar durante o curso?",
    ubicacionAyuda: "Cidade e país. Se não tiver certeza, dê sua melhor estimativa.",
    horas: "Quantas horas você já dedicou a conteúdo de AI safety?",
    horasAyuda: "Uma estimativa aproximada basta.",

    preguntas: {
      "agi-strategy": {
        qPlan: {
          label: "O que você vai fazer de diferente depois do curso e por que não consegue fazer hoje?",
          ayuda: "Seja concreto. Queremos saber:",
          puntos: [
            "Que ação específica você vai tomar.",
            "Que acesso, posição ou alavanca você tem que faz de você a pessoa para isso.",
            "O que falta que este curso oferece.",
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
          label: "Como você espera que este curso ajude você a contribuir para a IA dar certo?",
          ayuda: "Sugerimos responder com 3 a 7 tópicos. Conte seu plano, com detalhes:",
          puntos: [
            "Que passos você vai dar depois do curso.",
            "Como o curso permite dar esses passos.",
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

    fuente: "Onde você soube do curso?",
    fuenteAyuda: "Seja específico, por exemplo:",
    fuenteEjemplos: [
      "[Nome] me recomendou depois de fazer",
      "Vi o post de [nome] no LinkedIn",
      "Encontrei buscando cursos de AI safety",
      "Mencionaram no grupo de WhatsApp da AI Safety Colombia",
    ],
    nominado: "Quem é a pessoa mais excepcional que você indicaria para este curso? Inclua o e-mail dela.",
    nominadoAyuda: "Pode indicar mais de uma. Se acharmos que se encaixam, podemos escrever para elas.",
    mencion: "Podemos mencionar seu nome se escrevermos para elas?",
    si: "Sim",
    no: "Não",
    comentarios: "Você tem comentários sobre este formulário?",
    comentariosAyuda: "Se precisar de resposta, escreva para nós.",
    compartir: "Podemos compartilhar seus dados com outras organizações de AI safety?",
    compartirAyuda:
      "Se aceitar, podemos compartilhar partes da sua inscrição e da sua participação no curso (como suas contribuições nas discussões e sua presença) com organizações em que confiamos, que às vezes escrevem com vagas ou outras oportunidades que podem servir de próximo passo. Não afeta a decisão sobre sua inscrição. Para deixar de compartilhar ou atualizar seus dados, escreva para nós.",
    compartirSi: "Sim, aceito",
    compartirNo: "Não aceito",
    privacidadAntes:
      "Usamos suas respostas só para montar as turmas e escrever para você sobre o curso. Para corrigir ou apagar seus dados, escreva para ",
    privacidadDespues: ".",
  },
};
