import type { Idioma } from "./idiomas";
import type { CursoId } from "./cursos";

/* Lo que dice la página de cada curso. Va corta, al modo del Technical
   Fellowship de Columbia (cualignment.org) y del AISF de MIT: una frase, los
   datos, el temario por semanas, quién facilita y unas pocas preguntas
   plegadas. Lo largo (perfiles, beneficios, qué sigue) quedó fuera a
   propósito; lo que hacía falta de eso vive en las preguntas. */

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

type Unidad = { titulo: string; cuerpo: string };

export type PaginaCurso = {
  metaTitulo: string;
  metaDescripcion: string;
  kicker: string;
  entrada: string;
  fechas: string;
  dedicacion: string;
  unidades: Unidad[];
  /* La línea que manda al otro curso, como la de Columbia que manda a su
     policy fellowship. El nombre del otro curso va enlazado en medio. */
  otro: string;
  faq: { q: string; a: string }[];
};

const AGI_ES: PaginaCurso = {
  metaTitulo: "AGI Strategy",
  metaDescripcion:
    "Curso con cohorte de cinco semanas, desde el 12 de octubre de 2026, con los materiales de BlueDot Impact. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 11 de octubre.",
  kicker: "Curso con cohorte · Materiales de BlueDot Impact",
  entrada:
    "Cinco semanas para entender hacia dónde va la IA avanzada, qué podría salir mal y dónde puedes aportar para que salga bien.",
  fechas: "12 oct – 15 nov",
  dedicacion: "5 horas por semana, en línea",
  unidades: [
    { titulo: "La carrera hacia la AGI", cuerpo: "Qué es la AGI, quién la está construyendo y por qué se corre para llegar primero." },
    { titulo: "Qué impulsa el progreso", cuerpo: "Cómputo, datos y algoritmos, y qué tan lejos puede llegar esa tendencia." },
    { titulo: "El panorama de amenazas", cuerpo: "Pérdida de control, concentración del poder y armas biológicas." },
    { titulo: "Defensa en profundidad", cuerpo: "Impedir que se entrenen sistemas peligrosos, limitar lo que pueden hacer y resistir lo que hagan." },
    { titulo: "Empieza a contribuir", cuerpo: "Qué problema te toca, con qué habilidades, y cuál es tu siguiente paso." },
  ],
  otro: "¿Te interesa más la parte técnica? Mira",
  faq: [
    {
      q: "¿Para quién es?",
      a: "Para quien quiere trabajar en que la IA salga bien y necesita primero el panorama: gente de política pública, derecho, ingeniería, operaciones o academia, o que está empezando en el tema. No hace falta formación técnica.",
    },
    {
      q: "¿Cómo funciona?",
      a: "Cada semana haces unas tres horas de lectura y escritura por tu cuenta y te unes a tu cohorte en una discusión de dos horas por videollamada.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Nada. Quien termine el curso recibe un certificado de AI Safety Colombia.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact diseñó el curso y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
    {
      q: "¿Qué sigue después?",
      a: "Technical AI Safety, los hackathones de investigación del hub de Bogotá o el grupo de lectura de AI Control, los viernes cada quince días.",
    },
  ],
};

const TAIS_ES: PaginaCurso = {
  metaTitulo: "Technical AI Safety",
  metaDescripcion:
    "Curso con cohorte de seis semanas, desde el 12 de octubre de 2026, con los materiales de BlueDot Impact: alineación, evaluaciones, interpretabilidad y AI control. Gratis, con certificado de AI Safety Colombia. Aplicaciones hasta el 11 de octubre.",
  kicker: "Curso con cohorte · Materiales de BlueDot Impact",
  entrada:
    "Seis semanas por los problemas abiertos de la seguridad técnica de la IA (alineación, evaluaciones, interpretabilidad y control) para encontrar dónde encajan tus habilidades.",
  fechas: "12 oct – 22 nov",
  dedicacion: "5 horas por semana, en línea",
  unidades: [
    { titulo: "Qué hace falta para que la IA salga bien", cuerpo: "El problema de fondo y el mapa de los enfoques técnicos." },
    { titulo: "Entrenar modelos más seguros", cuerpo: "RLHF y los métodos con los que hoy se intenta que los modelos hagan lo que se les pide." },
    { titulo: "Evaluaciones", cuerpo: "Lo que un modelo puede hacer frente a lo que hará, y cómo se detecta el engaño." },
    { titulo: "Interpretabilidad mecanicista", cuerpo: "Mirar dentro de la red para entender qué está calculando y por qué." },
    { titulo: "Minimizar el daño", cuerpo: "AI control, clasificadores constitucionales y cortar la cadena que lleva a un daño." },
    { titulo: "Empieza a contribuir", cuerpo: "Dónde encajan tus habilidades y cuál es tu siguiente paso en el campo." },
  ],
  otro: "¿Prefieres empezar por el panorama estratégico? Mira",
  faq: [
    {
      q: "¿Para quién es?",
      a: "Para gente con base técnica (investigación en ML, ciencias de la computación, matemáticas o ingeniería de software) que quiere saber dónde aportar en seguridad de la IA, y para estudiantes que ya se tomaron el tema en serio.",
    },
    {
      q: "¿Cuánta formación técnica necesito?",
      a: "Entender lo básico de cómo se entrenan los LLM y que el progreso lo mueven los datos, los algoritmos y el cómputo. El curso AI Foundations de BlueDot, de dos horas, te da esa base.",
    },
    {
      q: "¿Tengo que hacer primero AGI Strategy?",
      a: "No, pero ayuda. Si aplicas a este y no quedas, en el formulario puedes pedir que te consideremos para AGI Strategy.",
    },
    {
      q: "¿Cómo funciona?",
      a: "Cada semana haces dos o tres horas de lectura y escritura por tu cuenta y te unes a tu cohorte en una discusión de dos horas por videollamada.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Nada. Quien termine el curso recibe un certificado de AI Safety Colombia.",
    },
    {
      q: "¿Qué relación tiene con BlueDot Impact?",
      a: "BlueDot Impact diseñó el curso y publica sus materiales. AI Safety Colombia corre esta cohorte por su cuenta, con esos materiales y con facilitadores de la comunidad.",
    },
  ],
};

const AGI_EN: PaginaCurso = {
  metaTitulo: "AGI Strategy",
  metaDescripcion:
    "A five-week cohort-based course starting 12 October 2026, using BlueDot Impact's materials. Free, with an AI Safety Colombia certificate. Applications close 11 October.",
  kicker: "Cohort-based course · BlueDot Impact materials",
  entrada:
    "Five weeks to understand where advanced AI is heading, what could go wrong, and where you can help make it go well.",
  fechas: "12 Oct – 15 Nov",
  dedicacion: "5 hours a week, online",
  unidades: [
    { titulo: "The race to AGI", cuerpo: "What AGI is, who is building it, and why there's a race to get there first." },
    { titulo: "What drives progress", cuerpo: "Compute, data and algorithms, and how far that trend could go." },
    { titulo: "The threat landscape", cuerpo: "Loss of control, concentration of power, and biological weapons." },
    { titulo: "Defence in depth", cuerpo: "Preventing dangerous systems from being trained, constraining what they can do, and withstanding what they do." },
    { titulo: "Start contributing", cuerpo: "Which problem is yours, with which skills, and what your next step is." },
  ],
  otro: "More interested in the technical side? See",
  faq: [
    {
      q: "Who is it for?",
      a: "People who want to work on making AI go well and need the big picture first: people from policy, law, engineering, operations or academia, or who are new to the topic. No technical background needed.",
    },
    {
      q: "How does it work?",
      a: "Each week you do about three hours of reading and writing on your own and join your cohort for a two-hour video discussion.",
    },
    {
      q: "How much does it cost?",
      a: "Nothing. Everyone who completes the course receives an AI Safety Colombia certificate.",
    },
    {
      q: "How is this related to BlueDot Impact?",
      a: "BlueDot Impact designed the course and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
    {
      q: "What comes next?",
      a: "Technical AI Safety, the research hackathons at the Bogotá hub, or the AI Control reading group, every other Friday.",
    },
  ],
};

const TAIS_EN: PaginaCurso = {
  metaTitulo: "Technical AI Safety",
  metaDescripcion:
    "A six-week cohort-based course starting 12 October 2026, using BlueDot Impact's materials: alignment, evaluations, interpretability and AI control. Free, with an AI Safety Colombia certificate. Applications close 11 October.",
  kicker: "Cohort-based course · BlueDot Impact materials",
  entrada:
    "Six weeks through the open problems in technical AI safety (alignment, evaluations, interpretability and control) to find where your skills fit.",
  fechas: "12 Oct – 22 Nov",
  dedicacion: "5 hours a week, online",
  unidades: [
    { titulo: "What it takes for AI to go well", cuerpo: "The underlying problem and a map of the technical approaches." },
    { titulo: "Training safer models", cuerpo: "RLHF and the methods used today to get models to do what they're asked." },
    { titulo: "Evaluations", cuerpo: "What a model can do versus what it will do, and how deception is detected." },
    { titulo: "Mechanistic interpretability", cuerpo: "Looking inside the network to understand what it is computing and why." },
    { titulo: "Minimising harm", cuerpo: "AI control, constitutional classifiers, and breaking the chain that leads to harm." },
    { titulo: "Start contributing", cuerpo: "Where your skills fit and what your next step in the field is." },
  ],
  otro: "Rather start with the strategic picture? See",
  faq: [
    {
      q: "Who is it for?",
      a: "People with a technical background (ML research, computer science, mathematics or software engineering) who want to know where they can contribute to AI safety, and students who already take the topic seriously.",
    },
    {
      q: "How much technical background do I need?",
      a: "A basic understanding of how LLMs are trained, and that progress is driven by data, algorithms and compute. BlueDot's two-hour AI Foundations course covers it.",
    },
    {
      q: "Do I need to take AGI Strategy first?",
      a: "No, but it helps. If you apply to this course and aren't accepted, the form lets you ask to be considered for AGI Strategy.",
    },
    {
      q: "How does it work?",
      a: "Each week you do two to three hours of reading and writing on your own and join your cohort for a two-hour video discussion.",
    },
    {
      q: "How much does it cost?",
      a: "Nothing. Everyone who completes the course receives an AI Safety Colombia certificate.",
    },
    {
      q: "How is this related to BlueDot Impact?",
      a: "BlueDot Impact designed the course and publishes its materials. AI Safety Colombia runs this cohort independently, with those materials and with facilitators from the community.",
    },
  ],
};

const AGI_PT: PaginaCurso = {
  metaTitulo: "AGI Strategy",
  metaDescripcion:
    "Curso em turma de cinco semanas, a partir de 12 de outubro de 2026, com os materiais da BlueDot Impact. Grátis, com certificado da AI Safety Colombia. Inscrições até 11 de outubro.",
  kicker: "Curso em turma · Materiais da BlueDot Impact",
  entrada:
    "Cinco semanas para entender para onde vai a IA avançada, o que pode dar errado e onde você pode ajudar para que dê certo.",
  fechas: "12 out – 15 nov",
  dedicacion: "5 horas por semana, on-line",
  unidades: [
    { titulo: "A corrida rumo à AGI", cuerpo: "O que é a AGI, quem a está construindo e por que há uma corrida para chegar primeiro." },
    { titulo: "O que impulsiona o progresso", cuerpo: "Computação, dados e algoritmos, e até onde essa tendência pode ir." },
    { titulo: "O panorama de ameaças", cuerpo: "Perda de controle, concentração de poder e armas biológicas." },
    { titulo: "Defesa em profundidade", cuerpo: "Impedir que sistemas perigosos sejam treinados, limitar o que podem fazer e resistir ao que fizerem." },
    { titulo: "Comece a contribuir", cuerpo: "Qual problema é o seu, com quais habilidades, e qual é seu próximo passo." },
  ],
  otro: "Tem mais interesse na parte técnica? Veja",
  faq: [
    {
      q: "Para quem é?",
      a: "Para quem quer trabalhar para que a IA dê certo e precisa primeiro do panorama: gente de políticas públicas, direito, engenharia, operações ou academia, ou que está começando no tema. Não precisa de formação técnica.",
    },
    {
      q: "Como funciona?",
      a: "Toda semana você faz cerca de três horas de leitura e escrita por conta própria e se junta à sua turma numa discussão de duas horas por videochamada.",
    },
    {
      q: "Quanto custa?",
      a: "Nada. Quem concluir o curso recebe um certificado da AI Safety Colombia.",
    },
    {
      q: "Qual a relação com a BlueDot Impact?",
      a: "A BlueDot Impact criou o curso e publica seus materiais. A AI Safety Colombia conduz esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
    {
      q: "O que vem depois?",
      a: "Technical AI Safety, os hackathons de pesquisa do hub de Bogotá ou o grupo de leitura de AI Control, às sextas-feiras a cada quinze dias.",
    },
  ],
};

const TAIS_PT: PaginaCurso = {
  metaTitulo: "Technical AI Safety",
  metaDescripcion:
    "Curso em turma de seis semanas, a partir de 12 de outubro de 2026, com os materiais da BlueDot Impact: alinhamento, avaliações, interpretabilidade e AI control. Grátis, com certificado da AI Safety Colombia. Inscrições até 11 de outubro.",
  kicker: "Curso em turma · Materiais da BlueDot Impact",
  entrada:
    "Seis semanas pelos problemas em aberto da segurança técnica da IA (alinhamento, avaliações, interpretabilidade e controle) para descobrir onde suas habilidades se encaixam.",
  fechas: "12 out – 22 nov",
  dedicacion: "5 horas por semana, on-line",
  unidades: [
    { titulo: "O que é preciso para a IA dar certo", cuerpo: "O problema de fundo e o mapa das abordagens técnicas." },
    { titulo: "Treinar modelos mais seguros", cuerpo: "RLHF e os métodos usados hoje para que os modelos façam o que se pede." },
    { titulo: "Avaliações", cuerpo: "O que um modelo pode fazer frente ao que ele fará, e como se detecta o engano." },
    { titulo: "Interpretabilidade mecanicista", cuerpo: "Olhar dentro da rede para entender o que ela está calculando e por quê." },
    { titulo: "Minimizar o dano", cuerpo: "AI control, classificadores constitucionais e cortar a cadeia que leva a um dano." },
    { titulo: "Comece a contribuir", cuerpo: "Onde suas habilidades se encaixam e qual é seu próximo passo no campo." },
  ],
  otro: "Prefere começar pelo panorama estratégico? Veja",
  faq: [
    {
      q: "Para quem é?",
      a: "Para gente com base técnica (pesquisa em ML, ciência da computação, matemática ou engenharia de software) que quer saber onde contribuir em segurança da IA, e para estudantes que já levam o tema a sério.",
    },
    {
      q: "Quanta formação técnica eu preciso?",
      a: "Entender o básico de como os LLMs são treinados e que o progresso é movido por dados, algoritmos e computação. O curso AI Foundations da BlueDot, de duas horas, dá essa base.",
    },
    {
      q: "Preciso fazer AGI Strategy antes?",
      a: "Não, mas ajuda. Se você se inscrever neste e não for aceito, no formulário pode pedir para ser considerado para AGI Strategy.",
    },
    {
      q: "Como funciona?",
      a: "Toda semana você faz duas ou três horas de leitura e escrita por conta própria e se junta à sua turma numa discussão de duas horas por videochamada.",
    },
    {
      q: "Quanto custa?",
      a: "Nada. Quem concluir o curso recebe um certificado da AI Safety Colombia.",
    },
    {
      q: "Qual a relação com a BlueDot Impact?",
      a: "A BlueDot Impact criou o curso e publica seus materiais. A AI Safety Colombia conduz esta turma por conta própria, com esses materiais e com facilitadores da comunidade.",
    },
  ],
};

export const PAGINAS_CURSO: Record<CursoId, Record<Idioma, PaginaCurso>> = {
  "agi-strategy": { es: AGI_ES, en: AGI_EN, pt: AGI_PT },
  "technical-ai-safety": { es: TAIS_ES, en: TAIS_EN, pt: TAIS_PT },
};

type Rotulos = {
  fechas: string;
  dedicacion: string;
  costo: string;
  costoValor: string;
  plazo: string;
  plazoValor: string;
  cerradoValor: string;
  semana: string;
  temario: string;
  temarioEnlace: string;
  facilita: string;
  facilitan: string;
  faq: string;
  aplicar: string;
};

/* Los rótulos que no dependen del curso. */
export const ROTULOS_CURSO: Record<Idioma, Rotulos> = {
  es: {
    fechas: "Fechas",
    dedicacion: "Dedicación",
    costo: "Costo",
    costoValor: "Gratis, con certificado",
    plazo: "Aplicaciones",
    plazoValor: "Hasta el domingo 11 de octubre",
    cerradoValor: "Cerraron el 11 de octubre",
    semana: "Semana",
    temario: "Temario",
    temarioEnlace: "Ver el curso completo en BlueDot",
    facilita: "Facilita",
    facilitan: "Facilitan",
    faq: "Preguntas frecuentes",
    aplicar: "Aplicar",
  },
  en: {
    fechas: "Dates",
    dedicacion: "Commitment",
    costo: "Cost",
    costoValor: "Free, with a certificate",
    plazo: "Applications",
    plazoValor: "Until Sunday 11 October",
    cerradoValor: "Closed on 11 October",
    semana: "Week",
    temario: "Curriculum",
    temarioEnlace: "See the full course on BlueDot",
    facilita: "Facilitator",
    facilitan: "Facilitators",
    faq: "Frequently asked questions",
    aplicar: "Apply",
  },
  pt: {
    fechas: "Datas",
    dedicacion: "Dedicação",
    costo: "Custo",
    costoValor: "Grátis, com certificado",
    plazo: "Inscrições",
    plazoValor: "Até domingo, 11 de outubro",
    cerradoValor: "Encerradas em 11 de outubro",
    semana: "Semana",
    temario: "Programa",
    temarioEnlace: "Ver o curso completo na BlueDot",
    facilita: "Facilita",
    facilitan: "Facilitam",
    faq: "Perguntas frequentes",
    aplicar: "Inscrever-se",
  },
};
