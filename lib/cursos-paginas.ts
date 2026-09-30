import type { Idioma } from "./idiomas";
import type { CursoId } from "./cursos";

/* Lo que dice la página de cada curso. Sigue las secciones de las páginas de
   BlueDot (bluedot.org/courses/agi-strategy y /technical-ai-safety), sin lo que
   es de ellos y no nuestro: los logos de dónde trabajan sus exalumnos, los
   testimonios, las citas de líderes y el calendario de sus cohortes. Lo demás
   se adaptó a nuestra cohorte: una sola, a tiempo parcial, desde el lunes 12 de
   octubre, con facilitadores de la comunidad y certificado de AI Safety
   Colombia. */

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
type Siguiente = { titulo: string; cuerpo: string; href: string; externo?: boolean };

export type PaginaCurso = {
  metaTitulo: string;
  metaDescripcion: string;
  kicker: string;
  entrada: string;
  datos: { valor: string; nota: string }[];
  paraQuienTitulo: string;
  /* AGI Strategy lo cuenta en prosa; Technical AI Safety, en tres perfiles. */
  paraQuien: string[];
  perfiles?: Bloque[];
  paraQuienCierre: string;
  beneficiosTitulo: string;
  beneficios: Bloque[];
  temarioTitulo: string;
  temarioEntrada: string;
  unidades: Bloque[];
  temarioEnlace: string;
  comoTitulo: string;
  como: Bloque[];
  facilitanTitulo: string;
  facilitanEntrada: string;
  despuesTitulo: string;
  despuesEntrada: string;
  despues: Siguiente[];
  faqTitulo: string;
  faq: { q: string; a: string }[];
  cierreTitulo: string;
  aplicar: string;
  cerrado: string;
  volver: string;
};

const AGI_ES: PaginaCurso = {
  metaTitulo: "AGI Strategy",
  metaDescripcion:
    "Curso con cohorte de cinco semanas, desde el 12 de octubre de 2026, con los materiales de BlueDot Impact. Para entender el panorama estratégico de la IA avanzada y encontrar tu punto de entrada. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 11 de octubre.",
  kicker: "Curso con cohorte · Materiales de BlueDot Impact",
  entrada:
    "¿Te entusiasma y a la vez te preocupa el rumbo de la IA? ¿Quieres hacer algo al respecto? Empieza aquí. 25 horas para entender el panorama estratégico, encontrar tu punto de entrada y ponerte en marcha.",
  datos: [
    { valor: "12 oct – 15 nov", nota: "Cinco semanas a tiempo parcial, desde el lunes 12 de octubre" },
    { valor: "5 horas por semana", nota: "Tres de lectura y escritura, dos de discusión en vivo con tu cohorte" },
    { valor: "Gratis", nota: "Con certificado de AI Safety Colombia al terminar" },
  ],
  paraQuienTitulo: "Para quién es este curso",
  paraQuien: [
    "Has leído ensayos, has visto charlas, y no crees que quienes están construyendo la AGI tengan un plan serio para que salga bien. Quieres cambiar eso.",
    "El curso es una introducción a fondo a lo que está pasando con el desarrollo de la IA, a cuáles podrían ser los buenos y los malos desenlaces, y a qué se podría hacer para llevar la IA hacia futuros mejores.",
    "Está pensado para tres grupos: gente con experiencia en política pública, seguridad, operaciones o ingeniería que quiere reorientar lo que sabe hacer; gente que va hacia roles técnicos o de gobernanza en AI safety y quiere primero el panorama estratégico; y gente nueva en el tema que va en serio y quiere tener un impacto grande.",
  ],
  paraQuienCierre:
    "¿No sabes si encajas? Aplica igual. En las cohortes de BlueDot han estado también profesores, abogados, ingenieros y organizadores comunitarios.",
  beneficiosTitulo: "Qué te llevas",
  beneficios: [
    {
      titulo: "Un punto de partida para trabajar en AI safety",
      cuerpo:
        "Sales con una opinión sobre qué amenazas importan, primeras ideas sobre cómo resolverlas y pasos concretos que puedes dar después.",
    },
    {
      titulo: "Una forma clara de pensar el futuro de la IA",
      cuerpo:
        "Vas a ver por qué la transición a la AGI podría ser uno de los periodos más decisivos de la historia, qué tan rápido podría pasar y qué tiene que salir bien para que termine en prosperidad y no en un daño catastrófico. Vas a revisar las estrategias que se han propuesto, a la luz de la evidencia sobre el progreso de la IA y de los incentivos de las empresas y los gobiernos.",
    },
    {
      titulo: "Una comunidad que está construyendo",
      cuerpo:
        "Entras a la comunidad de AI Safety Colombia: el grupo de WhatsApp, las charlas, el grupo de lectura y los hackathones de investigación. Ahí conoces gente que trabaja en el tema, que te puede abrir puertas y poner a prueba lo que piensas.",
    },
  ],
  temarioTitulo: "Temario",
  temarioEntrada: "Cinco unidades, una por semana. Las lecturas son las del curso de BlueDot.",
  unidades: [
    { titulo: "La carrera hacia la AGI", cuerpo: "Qué es la AGI, quién la está construyendo y por qué se está corriendo para llegar primero." },
    { titulo: "Qué impulsa el progreso", cuerpo: "Cómputo, datos y algoritmos: por qué escalar los modelos los ha vuelto más capaces y qué tan lejos puede llegar esa tendencia." },
    { titulo: "El panorama de amenazas", cuerpo: "Pérdida de control, concentración autoritaria del poder y el uso de la IA para crear armas biológicas." },
    { titulo: "Defensa en profundidad", cuerpo: "Capas que se refuerzan entre sí: impedir que se entrenen sistemas peligrosos, limitar lo que pueden hacer y resistir lo que hagan." },
    { titulo: "Empieza a contribuir", cuerpo: "Qué problema te toca a ti, con qué habilidades, y cuál es tu siguiente paso concreto." },
  ],
  temarioEnlace: "Ver el curso en BlueDot",
  comoTitulo: "Cómo funciona",
  como: [
    { titulo: "Formato", cuerpo: "Cinco semanas a tiempo parcial, del lunes 12 de octubre al domingo 15 de noviembre. En línea." },
    { titulo: "Compromiso", cuerpo: "Cada semana haces unas tres horas de lectura y escritura, y te unes a tu cohorte en una discusión de dos horas por videollamada." },
    { titulo: "Facilitación", cuerpo: "Todas las discusiones las lleva una persona de la comunidad que trabaja en AI safety." },
    { titulo: "Costo", cuerpo: "Gratis, sin costos ocultos. Quien termine el curso recibe un certificado de AI Safety Colombia." },
  ],
  facilitanTitulo: "Quién facilita",
  facilitanEntrada: "La persona que lleva las discusiones de cada semana, responde tus preguntas y conecta las lecturas con el trabajo que se está haciendo.",
  despuesTitulo: "Qué sigue después",
  despuesEntrada: "Este curso es para orientarte. Lo que venga después depende de ti.",
  despues: [
    {
      titulo: "Technical AI Safety",
      cuerpo: "Interpretabilidad, evaluaciones, investigación en alineación. Para quien quiere trabajar en los problemas técnicos.",
      href: "/cursos/technical-ai-safety",
    },
    {
      titulo: "Hackathones de investigación",
      cuerpo: "Un fin de semana para sacar un trabajo propio, con el hub de Bogotá de los hackathones de Apart Research.",
      href: "/sprint",
    },
    {
      titulo: "Grupo de lectura: AI Control",
      cuerpo: "Cada quince días, los viernes a las 6:30 p. m., en línea. Para seguir leyendo con otros después del curso.",
      href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
      externo: true,
    },
  ],
  faqTitulo: "Preguntas frecuentes",
  faq: [
    {
      q: "¿Qué formación necesito?",
      a: "No nos importa tu hoja de vida, nos importa lo que vas a hacer después. En las cohortes de BlueDot ha habido gente de política pública, ingeniería, derecho, medicina, operaciones y academia. Lo que tenían en común eran las ganas y la tendencia a actuar.",
    },
    {
      q: "¿Es un curso para principiantes?",
      a: "Es para gente nueva en trabajar en AI safety, no nueva en pensar a fondo. Si has estado leyendo y pensando, y estás listo para actuar, aquí es donde empiezas.",
    },
    {
      q: "¿Y si no sé qué dirección quiero tomar?",
      a: "Para eso es el curso. Sales con una opinión sobre qué problemas importan más y qué camino encaja con tus habilidades: investigación técnica, gobernanza, bioseguridad o construir algo nuevo. Descubrir eso es el trabajo.",
    },
    {
      q: "¿Tengo certificado?",
      a: "Sí. Quien complete el curso recibe un certificado de AI Safety Colombia que puede compartir en LinkedIn o con empleadores.",
    },
    {
      q: "¿De verdad es gratis?",
      a: "Sí.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact es la organización que diseñó el curso y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
  ],
  cierreTitulo: "Empieza hoy a construir un buen futuro",
  aplicar: "Aplicar hasta el 11 de octubre",
  cerrado: "Las aplicaciones de esta cohorte cerraron el 11 de octubre.",
  volver: "Ver las otras formas de participar",
};

const TAIS_ES: PaginaCurso = {
  metaTitulo: "Technical AI Safety",
  metaDescripcion:
    "Curso con cohorte de seis semanas, desde el 12 de octubre de 2026, con los materiales de BlueDot Impact: alineación, evaluaciones, interpretabilidad mecanicista y AI control. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 11 de octubre.",
  kicker: "Curso con cohorte · Materiales de BlueDot Impact",
  entrada:
    "Las capacidades de la IA avanzan más rápido que nuestra capacidad de hacerlas seguras. El campo necesita más gente técnica trabajando en seguridad, y la necesita ya. Tú podrías ser una de esas personas.",
  datos: [
    { valor: "12 oct – 22 nov", nota: "Seis semanas a tiempo parcial, desde el lunes 12 de octubre" },
    { valor: "5 horas por semana", nota: "Dos o tres de lectura y escritura, dos de discusión en vivo con tu cohorte" },
    { valor: "Gratis", nota: "Con certificado de AI Safety Colombia al terminar" },
  ],
  paraQuienTitulo: "Para quién es este curso",
  paraQuien: [],
  perfiles: [
    {
      titulo: "Sabes investigar. Ahora quieres apuntar a problemas de seguridad que importan.",
      cuerpo:
        "Vienes de machine learning, ciencias de la computación, matemáticas o algo cercano. Quizás haces un doctorado, trabajas en un laboratorio o ya publicas. Entiendes cómo funcionan los modelos, pero no has mapeado el campo de la seguridad con el detalle suficiente para saber dónde tendrían más impacto tus habilidades. Este curso te da ese mapa: los grandes problemas abiertos en alineación, interpretabilidad, evaluaciones y control, y en cuáles estás mejor parado para trabajar.",
    },
    {
      titulo: "Construyes cosas. Ahora quieres escalar la seguridad de la IA.",
      cuerpo:
        "Eres ingeniero de software o tienes un perfil técnico. Has sacado productos y construido sistemas grandes. Ves que la seguridad importa, pero el campo se siente académico y difícil de entrar desde la industria. Este curso es la rampa de entrada: construyes una comprensión de trabajo del panorama técnico y te conectas con gente que ya está haciendo esto.",
    },
    {
      titulo: "Tienes opciones y no vas a dejarte llevar por el camino por defecto.",
      cuerpo:
        "Estás en la universidad o te graduaste hace poco. Te has tomado en serio la IA, con el curso de AGI Strategy, un grupo universitario o tus propias lecturas. Estás pensando en fellowships, en un posgrado o en roles que todavía no tienes mapeados. Sabes que AI safety importa y quieres hacer algo; solo que aún no sabes cuáles son los trabajos.",
    },
  ],
  paraQuienCierre: "¿No encajas perfecto en ninguno? Aplica igual.",
  beneficiosTitulo: "Qué vas a hacer",
  beneficios: [
    {
      titulo: "Aprender de gente que trabaja en AI safety",
      cuerpo:
        "Cada discusión la lleva una persona que trabaja en el tema. Responde tus preguntas técnicas, pone a prueba tus supuestos y conecta lo que lees con el trabajo real que se hace en laboratorios y organizaciones de investigación.",
    },
    {
      titulo: "Cubrir las técnicas clave de seguridad",
      cuerpo:
        "Construyes una comprensión de trabajo de los grandes problemas abiertos y de los enfoques de la seguridad técnica de la IA: alineación y RLHF, interpretabilidad mecanicista, evaluaciones y red-teaming, AI control y supervisión escalable.",
    },
    {
      titulo: "Unirte a una comunidad que construye hacia la seguridad",
      cuerpo:
        "Entras a una cohorte de gente que va en serio con que la IA salga bien, y a la comunidad de AI Safety Colombia: el grupo de WhatsApp, el grupo de lectura de AI Control y los hackathones de investigación, donde se forman equipos para trabajar en proyectos.",
    },
  ],
  temarioTitulo: "Temario",
  temarioEntrada: "Seis unidades, una por semana. Las lecturas son las del curso de BlueDot.",
  unidades: [
    { titulo: "Qué hace falta para que la IA salga bien", cuerpo: "El problema de fondo y el mapa de los enfoques técnicos para resolverlo." },
    { titulo: "Entrenar modelos más seguros", cuerpo: "RLHF y los métodos con los que hoy se intenta que los modelos hagan lo que se les pide." },
    { titulo: "Evaluaciones", cuerpo: "La diferencia entre lo que un modelo puede hacer y lo que hará, y cómo se detecta el engaño." },
    { titulo: "Interpretabilidad mecanicista", cuerpo: "Mirar dentro de la red para entender qué está calculando y por qué." },
    { titulo: "Minimizar el daño", cuerpo: "AI control, clasificadores constitucionales y cortar la cadena de pasos que lleva a un daño." },
    { titulo: "Empieza a contribuir", cuerpo: "Dónde encajan tus habilidades y cuál es tu siguiente paso concreto en el campo." },
  ],
  temarioEnlace: "Ver el curso en BlueDot",
  comoTitulo: "Cómo funciona",
  como: [
    { titulo: "Formato", cuerpo: "Seis semanas a tiempo parcial, del lunes 12 de octubre al domingo 22 de noviembre. En línea." },
    { titulo: "Compromiso", cuerpo: "Cada semana haces dos o tres horas de lectura y escritura, y te unes a tu cohorte en una discusión de dos horas por videollamada." },
    { titulo: "Facilitación", cuerpo: "Todas las discusiones las llevan personas de la comunidad que trabajan en AI safety." },
    { titulo: "Costo", cuerpo: "Gratis, sin costos ocultos. Quien termine el curso recibe un certificado de AI Safety Colombia." },
  ],
  facilitanTitulo: "Quiénes facilitan",
  facilitanEntrada: "Las personas que llevan las discusiones de cada semana, responden tus preguntas técnicas y conectan las lecturas con el trabajo que se está haciendo.",
  despuesTitulo: "A dónde lleva",
  despuesEntrada: "El curso no termina en la unidad seis. Estos son los caminos que siguen.",
  despues: [
    {
      titulo: "Hackathones de investigación",
      cuerpo: "Un fin de semana para sacar un trabajo propio con un equipo, con el hub de Bogotá de los hackathones de Apart Research. Es como mucha gente arma su primera pieza de portafolio.",
      href: "/sprint",
    },
    {
      titulo: "Fellowships",
      cuerpo: "MATS, SPAR, LASR, ERA, Pivotal, ARENA. Son competitivas, y el curso está pensado para que llegues como un candidato fuerte.",
      href: "/recursos",
    },
    {
      titulo: "Grupo de lectura: AI Control",
      cuerpo: "Cada quince días, los viernes a las 6:30 p. m., en línea. Para seguir a fondo con uno de los temas del curso.",
      href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
      externo: true,
    },
  ],
  faqTitulo: "Preguntas frecuentes",
  faq: [
    {
      q: "¿Cuánta formación técnica necesito?",
      a: "Deberías entender lo básico de cómo se entrenan y ajustan los LLM, que el desarrollo de la IA lo mueven los datos, los algoritmos y el cómputo, y que la función de recompensa de una red neuronal se optimiza con descenso de gradiente. El curso AI Foundations de BlueDot, de dos horas y a tu ritmo, te da esa base.",
    },
    {
      q: "¿Tengo que hacer primero AGI Strategy?",
      a: "No es obligatorio, pero lo recomendamos mucho. AGI Strategy da el contexto sobre el que se construye este curso. Puedes empezar aquí, pero le sacas más si entiendes cómo encaja la seguridad técnica en el panorama más amplio. Si aplicas a este y no quedas, en el formulario puedes pedir que te consideremos para AGI Strategy.",
    },
    {
      q: "¿Tengo certificado?",
      a: "Sí. Quien complete el curso recibe un certificado de AI Safety Colombia.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact es la organización que diseñó el curso y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
  ],
  cierreTitulo: "Empieza hoy a construir un buen futuro",
  aplicar: "Aplicar hasta el 11 de octubre",
  cerrado: "Las aplicaciones de esta cohorte cerraron el 11 de octubre.",
  volver: "Ver las otras formas de participar",
};

const AGI_EN: PaginaCurso = {
  metaTitulo: "AGI Strategy",
  metaDescripcion:
    "A five-week cohort-based course starting 12 October 2026, using BlueDot Impact's materials. Understand the strategic landscape of advanced AI and find your entry point. Free, with an AI Safety Colombia certificate. Applications close 11 October.",
  kicker: "Cohort-based course · BlueDot Impact materials",
  entrada:
    "Optimistic and concerned about AI's trajectory? Want to do something about it? Start here. 25 hours to understand the strategic landscape, find your entry point, and get moving.",
  datos: [
    { valor: "12 Oct – 15 Nov", nota: "Five part-time weeks, starting Monday 12 October" },
    { valor: "5 hours a week", nota: "Three of reading and writing, two of live discussion with your cohort" },
    { valor: "Free", nota: "With an AI Safety Colombia certificate when you finish" },
  ],
  paraQuienTitulo: "Who this course is for",
  paraQuien: [
    "You've read some essays, watched the talks, and you don't think the people building AGI have a serious plan for making it go well. You want to change that.",
    "The course is an in-depth introduction to what's going on with AI development, what the good and bad outcomes could be, and what could be done to steer AI towards better futures.",
    "It's built for three groups: domain experts in policy, security, operations, or engineering looking to redirect their skills; people heading into technical safety or governance roles who want the strategic picture first; and newcomers who are serious about making big moves and having a huge impact.",
  ],
  paraQuienCierre:
    "Not sure you fit? Apply anyway. BlueDot's cohorts have also included teachers, lawyers, engineers, and community organisers.",
  beneficiosTitulo: "What you'll get",
  beneficios: [
    {
      titulo: "A launchpad for your AI safety career",
      cuerpo:
        "You'll leave with an opinion on which threats matter, early takes on how we could solve these problems, and concrete next steps you can take.",
    },
    {
      titulo: "A clear way to think about the future of AI",
      cuerpo:
        "You'll examine why the transition to AGI could be one of the most consequential periods in human history, how quickly it could happen, and what needs to go right for it to result in extraordinary flourishing rather than catastrophic harm. You'll look at proposed strategies to steer that future, considering evidence of AI progress and the incentives facing companies and governments.",
    },
    {
      titulo: "A community of builders",
      cuerpo:
        "You join the AI Safety Colombia community: the WhatsApp group, the talks, the reading group and the research hackathons. You'll meet people working on the problem who can open doors for you and pressure-test your thinking.",
    },
  ],
  temarioTitulo: "Curriculum",
  temarioEntrada: "Five units, one a week. The readings are those of BlueDot's course.",
  unidades: [
    { titulo: "The race to AGI", cuerpo: "What AGI is, who is building it, and why there's a race to get there first." },
    { titulo: "What drives progress", cuerpo: "Compute, data and algorithms: why scaling has made models more capable and how far that trend could go." },
    { titulo: "The threat landscape", cuerpo: "Loss of control, authoritarian concentration of power, and the misuse of AI to build biological weapons." },
    { titulo: "Defence in depth", cuerpo: "Layers that reinforce each other: preventing dangerous systems from being trained, constraining what they can do, and withstanding what they do." },
    { titulo: "Start contributing", cuerpo: "Which problem is yours, with which skills, and what your next concrete step is." },
  ],
  temarioEnlace: "See the course on BlueDot",
  comoTitulo: "How the course works",
  como: [
    { titulo: "Format", cuerpo: "Five part-time weeks, from Monday 12 October to Sunday 15 November. Online." },
    { titulo: "Commitment", cuerpo: "Each week you do about three hours of reading and writing, and join your cohort for a two-hour video call to discuss the content." },
    { titulo: "Facilitator", cuerpo: "All discussions are led by someone from the community who works on AI safety." },
    { titulo: "Price", cuerpo: "Completely free, no hidden costs. Everyone who completes the course receives an AI Safety Colombia certificate." },
  ],
  facilitanTitulo: "Your facilitator",
  facilitanEntrada: "The person who leads each week's discussion, answers your questions and connects the readings to work happening today.",
  despuesTitulo: "What happens after",
  despuesEntrada: "This course is where you get oriented. What comes next depends on you.",
  despues: [
    {
      titulo: "Technical AI Safety",
      cuerpo: "Interpretability, evals, alignment research. For people ready to work on the technical problems.",
      href: "/en/courses/technical-ai-safety",
    },
    {
      titulo: "Research hackathons",
      cuerpo: "A weekend to produce your own work, at the Bogotá hub of Apart Research's hackathons.",
      href: "/en/sprint",
    },
    {
      titulo: "Reading group: AI Control",
      cuerpo: "Every two weeks, Fridays at 6:30 pm Colombia time, online. To keep reading with others after the course.",
      href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
      externo: true,
    },
  ],
  faqTitulo: "Frequently asked questions",
  faq: [
    {
      q: "What background do I need?",
      a: "We don't care about your CV. We care about what you'll do next. BlueDot's cohorts have included people from policy, engineering, law, medicine, operations, and academia. What they shared was drive and a bias toward action.",
    },
    {
      q: "Is this course for beginners?",
      a: "It's for people new to working on AI safety, not new to thinking hard. If you've been reading and thinking, and are ready to act, this is where you start.",
    },
    {
      q: "What if I don't know which direction I want to go?",
      a: "That's what the course is for. You'll leave with a view on which problems matter most and which path fits your skills: technical research, governance, biosecurity, or building something new. Figuring that out is the work.",
    },
    {
      q: "Will I get a certificate?",
      a: "Yes. Everyone who completes the course receives an AI Safety Colombia certificate they can share on LinkedIn or with employers.",
    },
    { q: "Is it really free?", a: "Yes." },
    {
      q: "How does this relate to BlueDot Impact?",
      a: "BlueDot Impact designed the course and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
  ],
  cierreTitulo: "Start building towards a good future today",
  aplicar: "Apply by 11 October",
  cerrado: "Applications for this cohort closed on 11 October.",
  volver: "See the other ways to get involved",
};

const TAIS_EN: PaginaCurso = {
  metaTitulo: "Technical AI Safety",
  metaDescripcion:
    "A six-week cohort-based course starting 12 October 2026, using BlueDot Impact's materials: alignment, evaluations, mechanistic interpretability and AI control. Free, with an AI Safety Colombia certificate. Applications close 11 October.",
  kicker: "Cohort-based course · BlueDot Impact materials",
  entrada:
    "AI capabilities are advancing faster than our ability to make them safe. The field needs more technical people working on safety, and it needs them now. You could be one of them.",
  datos: [
    { valor: "12 Oct – 22 Nov", nota: "Six part-time weeks, starting Monday 12 October" },
    { valor: "5 hours a week", nota: "Two to three of reading and writing, two of live discussion with your cohort" },
    { valor: "Free", nota: "With an AI Safety Colombia certificate when you finish" },
  ],
  paraQuienTitulo: "Who this course is for",
  paraQuien: [],
  perfiles: [
    {
      titulo: "You know how to do research. Now you want to point it at impactful safety problems.",
      cuerpo:
        "You have a background in ML, CS, mathematics, or an adjacent field. Maybe you're doing a PhD, maybe you're at a lab, maybe you're publishing already. You understand how models work, but you haven't mapped the safety landscape in enough detail to know where your skills would have the most impact. This course gives you that map: the major open problems in alignment, interpretability, evaluations, and control, and which ones you're best positioned to work on.",
    },
    {
      titulo: "You build things. Now you want to scale AI safety.",
      cuerpo:
        "You're a software engineer or technical person. You've shipped products and built large systems. You can see that safety matters, but the field can feel academic and hard to break into from industry. This course is the on-ramp: you'll build a working understanding of the technical safety landscape and connect with people who are already doing this work.",
    },
    {
      titulo: "You have options. You're not the type to drift into a default path.",
      cuerpo:
        "You're at university or recently graduated. You've engaged seriously with AI, through the AGI Strategy course, a university group, or your own deep reading. You're considering fellowships, graduate school, or roles you haven't fully mapped yet. You know AI safety matters and want to do something. You just don't know what the jobs are yet.",
    },
  ],
  paraQuienCierre: "Don't fit these perfectly? Apply anyway.",
  beneficiosTitulo: "What you'll actually do",
  beneficios: [
    {
      titulo: "Learn from people working on AI safety",
      cuerpo:
        "Every discussion is led by someone working on the problem. They'll answer your technical questions, challenge your assumptions, and connect what you're reading to real work happening at labs and research organisations.",
    },
    {
      titulo: "Cover key safety techniques",
      cuerpo:
        "You'll build a working understanding of the major open problems and approaches in technical AI safety, including alignment and RLHF, mechanistic interpretability, evaluations and red-teaming, AI control, and scalable oversight.",
    },
    {
      titulo: "Join a community building towards safety",
      cuerpo:
        "You'll join a cohort of people who are serious about making AI go well, and the AI Safety Colombia community: the WhatsApp group, the AI Control reading group and the research hackathons, where teams form to work on projects.",
    },
  ],
  temarioTitulo: "Curriculum",
  temarioEntrada: "Six units, one a week. The readings are those of BlueDot's course.",
  unidades: [
    { titulo: "What it takes for AI to go well", cuerpo: "The underlying problem and a map of the technical approaches to solving it." },
    { titulo: "Training safer models", cuerpo: "RLHF and the methods used today to get models to do what they're asked." },
    { titulo: "Evaluations", cuerpo: "The difference between what a model can do and what it will do, and how deception is detected." },
    { titulo: "Mechanistic interpretability", cuerpo: "Looking inside the network to understand what it is computing and why." },
    { titulo: "Minimising harm", cuerpo: "AI control, constitutional classifiers, and breaking the chain of steps that leads to harm." },
    { titulo: "Start contributing", cuerpo: "Where your skills fit and what your next concrete step in the field is." },
  ],
  temarioEnlace: "See the course on BlueDot",
  comoTitulo: "How the course works",
  como: [
    { titulo: "Format", cuerpo: "Six part-time weeks, from Monday 12 October to Sunday 22 November. Online." },
    { titulo: "Commitment", cuerpo: "Each week you do two to three hours of reading and writing, and join your cohort for a two-hour video call to discuss the content." },
    { titulo: "Facilitators", cuerpo: "All discussions are led by people from the community who work on AI safety." },
    { titulo: "Price", cuerpo: "Completely free, no hidden costs. Everyone who completes the course receives an AI Safety Colombia certificate." },
  ],
  facilitanTitulo: "Your facilitators",
  facilitanEntrada: "The people who lead each week's discussion, answer your technical questions and connect the readings to work happening today.",
  despuesTitulo: "Where this leads",
  despuesEntrada: "This course doesn't end at unit six. These are the paths that follow.",
  despues: [
    {
      titulo: "Research hackathons",
      cuerpo: "A weekend to produce your own work with a team, at the Bogotá hub of Apart Research's hackathons. It's how many people build their first portfolio piece.",
      href: "/en/sprint",
    },
    {
      titulo: "Fellowships",
      cuerpo: "MATS, SPAR, LASR, ERA, Pivotal, ARENA. They're competitive, and this course is designed to make you a strong candidate.",
      href: "/en/resources",
    },
    {
      titulo: "Reading group: AI Control",
      cuerpo: "Every two weeks, Fridays at 6:30 pm Colombia time, online. To go deeper into one of the course topics.",
      href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
      externo: true,
    },
  ],
  faqTitulo: "Frequently asked questions",
  faq: [
    {
      q: "How much technical background do I need?",
      a: "You should understand the basics of how LLMs are trained and fine-tuned, that AI development is driven by data, algorithms and compute, and that the reward function for neural networks is optimised through gradient descent. BlueDot's two-hour, self-paced AI Foundations course will give you enough background.",
    },
    {
      q: "Do I need to take AGI Strategy first?",
      a: "It's not required, but strongly recommended. AGI Strategy provides essential context that this course builds on. You can start here directly, but you'll get more value if you understand how technical safety fits into the broader landscape. If you apply to this course and aren't accepted, the form lets you ask to be considered for AGI Strategy.",
    },
    {
      q: "Will I get a certificate?",
      a: "Yes. Everyone who completes the course receives an AI Safety Colombia certificate.",
    },
    {
      q: "How does this relate to BlueDot Impact?",
      a: "BlueDot Impact designed the course and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
  ],
  cierreTitulo: "Start building towards a good future today",
  aplicar: "Apply by 11 October",
  cerrado: "Applications for this cohort closed on 11 October.",
  volver: "See the other ways to get involved",
};

const AGI_PT: PaginaCurso = {
  metaTitulo: "AGI Strategy",
  metaDescripcion:
    "Curso em turma de cinco semanas, a partir de 12 de outubro de 2026, com os materiais da BlueDot Impact. Para entender o panorama estratégico da IA avançada e encontrar seu ponto de entrada. Grátis, com certificado da AI Safety Colombia. Inscrições até 11 de outubro.",
  kicker: "Curso em turma · Materiais da BlueDot Impact",
  entrada:
    "Animado e ao mesmo tempo preocupado com o rumo da IA? Quer fazer algo a respeito? Comece aqui. 25 horas para entender o panorama estratégico, encontrar seu ponto de entrada e começar a agir.",
  datos: [
    { valor: "12 out – 15 nov", nota: "Cinco semanas em meio período, a partir de segunda-feira, 12 de outubro" },
    { valor: "5 horas por semana", nota: "Três de leitura e escrita, duas de discussão ao vivo com sua turma" },
    { valor: "Grátis", nota: "Com certificado da AI Safety Colombia ao terminar" },
  ],
  paraQuienTitulo: "Para quem é este curso",
  paraQuien: [
    "Você leu ensaios, assistiu a palestras e não acredita que quem está construindo a AGI tenha um plano sério para que ela dê certo. Você quer mudar isso.",
    "O curso é uma introdução aprofundada ao que está acontecendo no desenvolvimento da IA, a quais poderiam ser os bons e os maus desfechos e ao que se poderia fazer para levar a IA a futuros melhores.",
    "Foi pensado para três grupos: pessoas com experiência em políticas públicas, segurança, operações ou engenharia que querem redirecionar o que sabem fazer; pessoas a caminho de funções técnicas ou de governança em AI safety que querem primeiro o panorama estratégico; e pessoas novas no tema que levam isso a sério e querem ter um grande impacto.",
  ],
  paraQuienCierre:
    "Não sabe se se encaixa? Inscreva-se mesmo assim. As turmas da BlueDot já tiveram também professores, advogados, engenheiros e organizadores comunitários.",
  beneficiosTitulo: "O que você leva",
  beneficios: [
    {
      titulo: "Um ponto de partida para trabalhar em AI safety",
      cuerpo:
        "Você sai com uma opinião sobre quais ameaças importam, primeiras ideias sobre como resolvê-las e passos concretos que pode dar depois.",
    },
    {
      titulo: "Uma forma clara de pensar o futuro da IA",
      cuerpo:
        "Você vai ver por que a transição para a AGI pode ser um dos períodos mais decisivos da história, com que rapidez isso pode acontecer e o que precisa dar certo para que termine em prosperidade e não em um dano catastrófico. Vai analisar as estratégias propostas, à luz da evidência sobre o progresso da IA e dos incentivos de empresas e governos.",
    },
    {
      titulo: "Uma comunidade que está construindo",
      cuerpo:
        "Você entra na comunidade da AI Safety Colombia: o grupo de WhatsApp, as palestras, o grupo de leitura e os hackathons de pesquisa. Lá você conhece gente que trabalha no tema, que pode abrir portas e pôr à prova o que você pensa.",
    },
  ],
  temarioTitulo: "Programa",
  temarioEntrada: "Cinco unidades, uma por semana. As leituras são as do curso da BlueDot.",
  unidades: [
    { titulo: "A corrida rumo à AGI", cuerpo: "O que é a AGI, quem a está construindo e por que há uma corrida para chegar primeiro." },
    { titulo: "O que impulsiona o progresso", cuerpo: "Computação, dados e algoritmos: por que escalar os modelos os tornou mais capazes e até onde essa tendência pode ir." },
    { titulo: "O panorama de ameaças", cuerpo: "Perda de controle, concentração autoritária de poder e o uso da IA para criar armas biológicas." },
    { titulo: "Defesa em profundidade", cuerpo: "Camadas que se reforçam: impedir que sistemas perigosos sejam treinados, limitar o que podem fazer e resistir ao que fizerem." },
    { titulo: "Comece a contribuir", cuerpo: "Qual problema é o seu, com quais habilidades, e qual é seu próximo passo concreto." },
  ],
  temarioEnlace: "Ver o curso na BlueDot",
  comoTitulo: "Como funciona",
  como: [
    { titulo: "Formato", cuerpo: "Cinco semanas em meio período, de segunda-feira, 12 de outubro, a domingo, 15 de novembro. Online." },
    { titulo: "Compromisso", cuerpo: "Toda semana você faz cerca de três horas de leitura e escrita e se junta à sua turma em uma discussão de duas horas por videochamada." },
    { titulo: "Facilitação", cuerpo: "Todas as discussões são conduzidas por uma pessoa da comunidade que trabalha com AI safety." },
    { titulo: "Custo", cuerpo: "Grátis, sem custos ocultos. Quem terminar o curso recebe um certificado da AI Safety Colombia." },
  ],
  facilitanTitulo: "Quem facilita",
  facilitanEntrada: "A pessoa que conduz as discussões de cada semana, responde suas perguntas e conecta as leituras com o trabalho que está sendo feito.",
  despuesTitulo: "O que vem depois",
  despuesEntrada: "Este curso é para você se orientar. O que vem depois depende de você.",
  despues: [
    {
      titulo: "Technical AI Safety",
      cuerpo: "Interpretabilidade, avaliações, pesquisa em alinhamento. Para quem quer trabalhar nos problemas técnicos.",
      href: "/pt/cursos/technical-ai-safety",
    },
    {
      titulo: "Hackathons de pesquisa",
      cuerpo: "Um fim de semana para produzir um trabalho próprio, no hub de Bogotá dos hackathons da Apart Research.",
      href: "/pt/sprint",
    },
    {
      titulo: "Grupo de leitura: AI Control",
      cuerpo: "A cada quinze dias, às sextas às 18h30 (horário da Colômbia), online. Para continuar lendo com outras pessoas depois do curso.",
      href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
      externo: true,
    },
  ],
  faqTitulo: "Perguntas frequentes",
  faq: [
    {
      q: "Que formação eu preciso?",
      a: "Não nos importa seu currículo, nos importa o que você vai fazer depois. As turmas da BlueDot já tiveram gente de políticas públicas, engenharia, direito, medicina, operações e academia. O que tinham em comum era a vontade e a tendência a agir.",
    },
    {
      q: "É um curso para iniciantes?",
      a: "É para quem é novo em trabalhar com AI safety, não novo em pensar a fundo. Se você tem lido e pensado, e está pronto para agir, é aqui que você começa.",
    },
    {
      q: "E se eu não souber que direção quero tomar?",
      a: "É para isso que serve o curso. Você sai com uma opinião sobre quais problemas importam mais e qual caminho combina com suas habilidades: pesquisa técnica, governança, biossegurança ou construir algo novo. Descobrir isso é o trabalho.",
    },
    {
      q: "Recebo certificado?",
      a: "Sim. Quem completar o curso recebe um certificado da AI Safety Colombia que pode compartilhar no LinkedIn ou com empregadores.",
    },
    { q: "É grátis mesmo?", a: "Sim." },
    {
      q: "Qual é a relação com a BlueDot Impact?",
      a: "A BlueDot Impact é a organização que desenhou o curso e publica seus materiais. A AI Safety Colombia oferece esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
  ],
  cierreTitulo: "Comece hoje a construir um bom futuro",
  aplicar: "Inscrever-se até 11 de outubro",
  cerrado: "As inscrições desta turma fecharam em 11 de outubro.",
  volver: "Ver as outras formas de participar",
};

const TAIS_PT: PaginaCurso = {
  metaTitulo: "Technical AI Safety",
  metaDescripcion:
    "Curso em turma de seis semanas, a partir de 12 de outubro de 2026, com os materiais da BlueDot Impact: alinhamento, avaliações, interpretabilidade mecanicista e AI control. Grátis, com certificado da AI Safety Colombia. Inscrições até 11 de outubro.",
  kicker: "Curso em turma · Materiais da BlueDot Impact",
  entrada:
    "As capacidades da IA avançam mais rápido do que nossa capacidade de torná-las seguras. O campo precisa de mais gente técnica trabalhando em segurança, e precisa agora. Você pode ser uma dessas pessoas.",
  datos: [
    { valor: "12 out – 22 nov", nota: "Seis semanas em meio período, a partir de segunda-feira, 12 de outubro" },
    { valor: "5 horas por semana", nota: "Duas ou três de leitura e escrita, duas de discussão ao vivo com sua turma" },
    { valor: "Grátis", nota: "Com certificado da AI Safety Colombia ao terminar" },
  ],
  paraQuienTitulo: "Para quem é este curso",
  paraQuien: [],
  perfiles: [
    {
      titulo: "Você sabe pesquisar. Agora quer apontar para problemas de segurança que importam.",
      cuerpo:
        "Você vem de machine learning, ciência da computação, matemática ou algo próximo. Talvez faça doutorado, trabalhe em um laboratório ou já publique. Entende como os modelos funcionam, mas não mapeou o campo da segurança com detalhe suficiente para saber onde suas habilidades teriam mais impacto. Este curso dá esse mapa: os grandes problemas abertos em alinhamento, interpretabilidade, avaliações e controle, e em quais você está mais bem posicionado para trabalhar.",
    },
    {
      titulo: "Você constrói coisas. Agora quer escalar a segurança da IA.",
      cuerpo:
        "Você é engenheiro de software ou tem perfil técnico. Já lançou produtos e construiu sistemas grandes. Vê que a segurança importa, mas o campo parece acadêmico e difícil de entrar vindo da indústria. Este curso é a rampa de entrada: você constrói uma compreensão prática do panorama técnico e se conecta com gente que já faz esse trabalho.",
    },
    {
      titulo: "Você tem opções e não vai se deixar levar pelo caminho padrão.",
      cuerpo:
        "Você está na universidade ou se formou há pouco. Levou a IA a sério, com o curso AGI Strategy, um grupo universitário ou suas próprias leituras. Está pensando em fellowships, em uma pós-graduação ou em funções que ainda não mapeou. Sabe que AI safety importa e quer fazer algo; só não sabe ainda quais são os trabalhos.",
    },
  ],
  paraQuienCierre: "Não se encaixa perfeitamente em nenhum? Inscreva-se mesmo assim.",
  beneficiosTitulo: "O que você vai fazer",
  beneficios: [
    {
      titulo: "Aprender com quem trabalha em AI safety",
      cuerpo:
        "Cada discussão é conduzida por alguém que trabalha no tema. Responde suas perguntas técnicas, desafia seus pressupostos e conecta o que você lê ao trabalho real em laboratórios e organizações de pesquisa.",
    },
    {
      titulo: "Cobrir as técnicas-chave de segurança",
      cuerpo:
        "Você constrói uma compreensão prática dos grandes problemas abertos e das abordagens da segurança técnica da IA: alinhamento e RLHF, interpretabilidade mecanicista, avaliações e red-teaming, AI control e supervisão escalável.",
    },
    {
      titulo: "Entrar em uma comunidade que constrói rumo à segurança",
      cuerpo:
        "Você entra em uma turma de gente que leva a sério que a IA dê certo, e na comunidade da AI Safety Colombia: o grupo de WhatsApp, o grupo de leitura de AI Control e os hackathons de pesquisa, onde se formam equipes para trabalhar em projetos.",
    },
  ],
  temarioTitulo: "Programa",
  temarioEntrada: "Seis unidades, uma por semana. As leituras são as do curso da BlueDot.",
  unidades: [
    { titulo: "O que é preciso para a IA dar certo", cuerpo: "O problema de fundo e o mapa das abordagens técnicas para resolvê-lo." },
    { titulo: "Treinar modelos mais seguros", cuerpo: "RLHF e os métodos usados hoje para que os modelos façam o que se pede." },
    { titulo: "Avaliações", cuerpo: "A diferença entre o que um modelo pode fazer e o que ele fará, e como se detecta o engano." },
    { titulo: "Interpretabilidade mecanicista", cuerpo: "Olhar dentro da rede para entender o que ela está calculando e por quê." },
    { titulo: "Minimizar o dano", cuerpo: "AI control, classificadores constitucionais e cortar a cadeia de passos que leva a um dano." },
    { titulo: "Comece a contribuir", cuerpo: "Onde suas habilidades se encaixam e qual é seu próximo passo concreto no campo." },
  ],
  temarioEnlace: "Ver o curso na BlueDot",
  comoTitulo: "Como funciona",
  como: [
    { titulo: "Formato", cuerpo: "Seis semanas em meio período, de segunda-feira, 12 de outubro, a domingo, 22 de novembro. Online." },
    { titulo: "Compromisso", cuerpo: "Toda semana você faz duas ou três horas de leitura e escrita e se junta à sua turma em uma discussão de duas horas por videochamada." },
    { titulo: "Facilitação", cuerpo: "Todas as discussões são conduzidas por pessoas da comunidade que trabalham com AI safety." },
    { titulo: "Custo", cuerpo: "Grátis, sem custos ocultos. Quem terminar o curso recebe um certificado da AI Safety Colombia." },
  ],
  facilitanTitulo: "Quem facilita",
  facilitanEntrada: "As pessoas que conduzem as discussões de cada semana, respondem suas perguntas técnicas e conectam as leituras com o trabalho que está sendo feito.",
  despuesTitulo: "Aonde isso leva",
  despuesEntrada: "O curso não termina na unidade seis. Estes são os caminhos que vêm depois.",
  despues: [
    {
      titulo: "Hackathons de pesquisa",
      cuerpo: "Um fim de semana para produzir um trabalho próprio em equipe, no hub de Bogotá dos hackathons da Apart Research. É assim que muita gente monta sua primeira peça de portfólio.",
      href: "/pt/sprint",
    },
    {
      titulo: "Fellowships",
      cuerpo: "MATS, SPAR, LASR, ERA, Pivotal, ARENA. São competitivas, e o curso foi pensado para que você chegue como um candidato forte.",
      href: "/pt/recursos",
    },
    {
      titulo: "Grupo de leitura: AI Control",
      cuerpo: "A cada quinze dias, às sextas às 18h30 (horário da Colômbia), online. Para se aprofundar em um dos temas do curso.",
      href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
      externo: true,
    },
  ],
  faqTitulo: "Perguntas frequentes",
  faq: [
    {
      q: "Quanta formação técnica eu preciso?",
      a: "Você deve entender o básico de como os LLMs são treinados e ajustados, que o desenvolvimento da IA é movido por dados, algoritmos e computação, e que a função de recompensa de uma rede neural é otimizada por descida de gradiente. O curso AI Foundations da BlueDot, de duas horas e no seu ritmo, dá essa base.",
    },
    {
      q: "Preciso fazer AGI Strategy antes?",
      a: "Não é obrigatório, mas recomendamos muito. AGI Strategy dá o contexto sobre o qual este curso se constrói. Você pode começar aqui, mas vai aproveitar mais se entender como a segurança técnica se encaixa no panorama mais amplo. Se você se inscrever neste e não for aceito, no formulário pode pedir para ser considerado para AGI Strategy.",
    },
    {
      q: "Recebo certificado?",
      a: "Sim. Quem completar o curso recebe um certificado da AI Safety Colombia.",
    },
    {
      q: "Qual é a relação com a BlueDot Impact?",
      a: "A BlueDot Impact é a organização que desenhou o curso e publica seus materiais. A AI Safety Colombia oferece esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
  ],
  cierreTitulo: "Comece hoje a construir um bom futuro",
  aplicar: "Inscrever-se até 11 de outubro",
  cerrado: "As inscrições desta turma fecharam em 11 de outubro.",
  volver: "Ver as outras formas de participar",
};

export const PAGINAS_CURSO: Record<CursoId, Record<Idioma, PaginaCurso>> = {
  "agi-strategy": { es: AGI_ES, en: AGI_EN, pt: AGI_PT },
  "technical-ai-safety": { es: TAIS_ES, en: TAIS_EN, pt: TAIS_PT },
};

/* Los rótulos que no dependen del curso. */
export const ROTULOS_CURSO: Record<Idioma, { unidad: string; facilita: string; temarioAncla: string }> = {
  es: { unidad: "Unidad", facilita: "Facilita", temarioAncla: "Ver el temario" },
  en: { unidad: "Unit", facilita: "Facilitator", temarioAncla: "Browse the curriculum" },
  pt: { unidad: "Unidade", facilita: "Facilita", temarioAncla: "Ver o programa" },
};
