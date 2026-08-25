import type { Idioma } from "./idiomas";

/* Todo el texto que ve quien llena el formulario del sprint, en los tres
   idiomas. Vive fuera del componente porque el formulario ya es largo y porque
   así se revisa la traducción entera de un vistazo. Los identificadores de las
   opciones (containment, solo, bogota…) no se traducen: son los que viajan a la
   base de datos. */

export type TextosAplicar = {
  /* Estado cerrado */
  cerradoTitulo: string;
  cerradoCuerpo: string;
  cerradoEnLinea: string;
  volverAlSprint: string;

  /* Estado enviado */
  enviadoTitulo: string;
  enviadoCuerpo1: string;
  enviadoCuerpo2: string;
  enviadoGrupo: string;

  /* Fallo al guardar */
  fallaAntes: string;
  fallaDespues: string;

  /* Validación */
  resumenTitulo: string;
  faltaResponder: string;
  correoMal: string;
  limite: (tope: number) => string;
  opcional: string;
  trampa: string;

  /* Etiquetas del resumen de arriba, una por campo obligatorio */
  falta: Record<string, string>;

  /* Secciones */
  seccionBasicos: string;
  seccionTrayectoria: string;
  trayectoriaNota: string;
  seccionSeleccion: string;
  seleccionNota: string;
  seccionServir: string;
  seccionAntes: string;

  /* Campos */
  nombre: string;
  apellidos: string;
  correo: string;
  correoAyuda: string;
  origen: string;
  origenAyuda: string;
  origenEjemplo: string;
  linkedin: string;
  linkedinAyuda: string;
  scholar: string;
  scholarAyuda: string;
  carrera: string;
  carreraAyuda: string;
  motivo: string;
  motivoAyuda: string;
  problema: string;
  problemaAyuda: string;
  frente: string;
  frenteAyuda: string;
  equipo: string;
  equipoAyuda: string;
  companeros: string;
  companerosAyuda: string;
  viaje: string;
  viajeAyuda: string;
  acceso: string;
  accesoAyuda: string;
  extra: string;
  extraAyuda: string;

  /* Cierre */
  confirmacionIA: string;
  privacidadAntes: string;
  privacidadDespues: string;
  enviar: string;
  enviando: string;
  guardado: string;

  /* Opciones */
  tracks: Record<string, string>;
  equipos: Record<string, string>;
  viajes: Record<string, string>;
};

export const RUTA_SPRINT: Record<Idioma, string> = {
  es: "/sprint",
  en: "/en/sprint",
  pt: "/pt/sprint",
};

const es: TextosAplicar = {
  cerradoTitulo: "Las aplicaciones ya cerraron",
  cerradoCuerpo:
    "El plazo para el hub presencial en Bogotá se cerró el 6 de septiembre. Todavía puedes participar en línea con Apart, que recibe proyectos hasta el domingo del sprint.",
  cerradoEnLinea: "Participar en línea",
  volverAlSprint: "Volver al sprint",

  enviadoTitulo: "Recibimos tu aplicación",
  enviadoCuerpo1:
    "Te llega una confirmación al correo que nos diste. Revisamos las aplicaciones a medida que llegan y respondemos a todo el mundo antes del sprint, sin importar el resultado.",
  enviadoCuerpo2:
    "Mientras tanto, el grupo de WhatsApp es por donde anunciamos la sede y lo que conviene leer antes.",
  enviadoGrupo: "Entrar al grupo",

  fallaAntes:
    "No pudimos guardar tu aplicación. Vuelve a intentarlo en un minuto; lo que escribiste sigue acá. Si falla otra vez, escríbenos a ",
  fallaDespues: " y la recibimos por correo.",

  resumenTitulo: "Falta responder esto antes de enviar:",
  faltaResponder: "Falta responder.",
  correoMal: "Revisa el correo: parece que le falta algo.",
  limite: (tope) => `Pasaste el límite de ${tope} caracteres.`,
  opcional: " (opcional)",
  trampa: "No llenes este campo",

  falta: {
    firstName: "Tu nombre",
    lastName: "Tus apellidos",
    email: "Tu correo",
    location: "Desde dónde vendrías",
    linkedin: "Tu LinkedIn",
    scholar: "Tu GitHub, Scholar o portafolio",
    career: "En qué andas ahora",
    reason: "Por qué quieres participar",
    hubProblem: "El problema que te gustaría abordar",
    hubTrack: "El frente que te llama",
    hubTeam: "Si aplicas solo o con equipo",
    hubTravel: "Cómo llegarías a Bogotá",
    aiConfirm: "La confirmación sobre el uso de IA",
    hubTeamNames: "Con quién aplicas",
  },

  seccionBasicos: "Datos básicos",
  seccionTrayectoria: "Tu trayectoria",
  trayectoriaNota:
    "No pedimos credenciales ni experiencia previa en seguridad de la IA. Saber de dónde vienes nos sirve para la selección y para que el viernes te sea más fácil dar con un equipo.",
  seccionSeleccion: "Tu propuesta para el sprint",
  seleccionNota:
    "Responde con tu propio razonamiento: no aceptamos aplicaciones escritas por un modelo.",
  seccionServir: "Para que el fin de semana te sirva",
  seccionAntes: "Antes de enviar",

  nombre: "Nombre",
  apellidos: "Apellidos",
  correo: "Correo",
  correoAyuda: "Acá te avisamos si quedaste y por acá mandamos la sede.",
  origen: "Desde dónde vendrías",
  origenAyuda: "Ciudad y país.",
  origenEjemplo: "Bogotá, Colombia",
  linkedin: "LinkedIn",
  linkedinAyuda: "Si no tienes, pega otro perfil donde se vea en qué has trabajado.",
  scholar: "GitHub, Scholar o portafolio",
  scholarAyuda: "Cualquier cosa tuya que podamos abrir: repositorio, publicaciones, un texto, un proyecto.",
  carrera: "¿En qué andas ahora?",
  carreraAyuda: "Qué estudias o en qué trabajas, y desde hace cuánto.",
  motivo: "¿Por qué quieres participar en este sprint?",
  motivoAyuda: "Qué te trajo hasta acá y qué esperas llevarte del fin de semana.",
  problema: "¿Qué problema te gustaría abordar en el sprint?",
  problemaAyuda:
    "Hasta unas 200 palabras. No buscamos una propuesta cerrada; sí ver si te imaginas algo concreto y abordable en un fin de semana.",
  frente: "¿Cuál de los cinco frentes te llama más?",
  frenteAyuda: "No es un compromiso. Los equipos se arman el viernes y puedes terminar en otro.",
  equipo: "¿Aplicas solo o con equipo?",
  equipoAyuda:
    "Los equipos son de una a cinco personas. Si aplicas solo, el viernes en la noche armamos equipos en la sala con quien esté en la misma situación.",
  companeros: "¿Con quiénes aplicas?",
  companerosAyuda:
    "Los nombres de las personas con las que vienes. Cada una tiene que llenar este formulario por su lado.",
  viaje: "¿Cómo llegarías a Bogotá?",
  viajeAyuda:
    "Nos sirve para organizar. El transporte hasta Bogotá y la estadía corren por tu cuenta.",
  acceso: "¿Necesitas algo para poder participar?",
  accesoAyuda:
    "Restricciones de alimentación, accesibilidad, horarios, cuidado de alguien. Lo que nos digas acá lo tenemos en cuenta al organizar.",
  extra: "¿Algo más que quieras contarnos?",
  extraAyuda: "Opcional de verdad. Si no se te ocurre nada, déjalo en blanco.",

  confirmacionIA:
    "Las respuestas de esta aplicación las escribí yo. Pude usar un modelo para corregir la redacción, pero el razonamiento es mío.",
  privacidadAntes:
    "Usamos la información que compartes para seleccionar a los participantes y organizar el fin de semana. Si eres seleccionado, los demás participantes podrán ver tu nombre, en qué estás trabajando y el frente que elegiste, para facilitar la formación de equipos. Tu correo y tus respuestas a las dos últimas preguntas serán confidenciales. Si en algún momento quieres que eliminemos tus datos, puedes escribirnos a ",
  privacidadDespues: ".",
  enviar: "Enviar aplicación",
  enviando: "Enviando…",
  guardado: "Lo que escribes se guarda en este navegador mientras no lo envíes.",

  tracks: {
    containment: "Estándares de contención",
    analysis: "Análisis del incidente",
    regulatory: "Respuesta regulatoria",
    communication: "Estrategia de comunicación",
    open: "Track abierto",
    either: "Todavía no lo tengo claro",
  },
  equipos: {
    solo: "Aplico solo y quiero que me ayuden a armar equipo",
    equipo: "Aplico con un equipo ya armado",
  },
  viajes: {
    bogota: "Vivo en Bogotá o cerca",
    colombia: "Vengo de otra ciudad de Colombia",
    international: "Vengo de fuera de Colombia",
  },
};

const en: TextosAplicar = {
  cerradoTitulo: "Applications have closed",
  cerradoCuerpo:
    "The deadline for the in-person hub in Bogotá closed on 6 September. You can still take part online with Apart, which accepts projects until the Sunday of the sprint.",
  cerradoEnLinea: "Take part online",
  volverAlSprint: "Back to the sprint",

  enviadoTitulo: "We have your application",
  enviadoCuerpo1:
    "A confirmation is on its way to the address you gave us. We review applications as they arrive and we answer everyone before the sprint, whatever the outcome.",
  enviadoCuerpo2:
    "In the meantime, the WhatsApp group is where we announce the venue and what is worth reading beforehand.",
  enviadoGrupo: "Join the group",

  fallaAntes:
    "We could not save your application. Try again in a minute; what you wrote is still here. If it fails again, write to us at ",
  fallaDespues: " and we will take it by email.",

  resumenTitulo: "These are still missing:",
  faltaResponder: "This one is missing.",
  correoMal: "Check the address: something seems to be missing.",
  limite: (tope) => `You went over the ${tope} character limit.`,
  opcional: " (optional)",
  trampa: "Do not fill in this field",

  falta: {
    firstName: "Your first name",
    lastName: "Your last name",
    email: "Your email",
    location: "Where you would travel from",
    linkedin: "Your LinkedIn",
    scholar: "Your GitHub, Scholar or portfolio",
    career: "What you are doing right now",
    reason: "Why you want to take part",
    hubProblem: "The problem you would like to work on",
    hubTrack: "The track that appeals to you",
    hubTeam: "Whether you apply alone or with a team",
    hubTravel: "How you would get to Bogotá",
    aiConfirm: "The confirmation about the use of AI",
    hubTeamNames: "Who you are applying with",
  },

  seccionBasicos: "Basics",
  seccionTrayectoria: "Your background",
  trayectoriaNota:
    "We ask for no credentials and no prior experience in AI safety. Knowing where you come from helps us with selection, and it makes it easier for you to find a team on Friday.",
  seccionSeleccion: "Your proposal for the sprint",
  seleccionNota:
    "Answer in your own reasoning: we do not accept applications written by a model.",
  seccionServir: "So the weekend works for you",
  seccionAntes: "Before you send it",

  nombre: "First name",
  apellidos: "Last name",
  correo: "Email",
  correoAyuda: "This is where we tell you if you got in, and where we send the venue.",
  origen: "Where would you travel from",
  origenAyuda: "City and country.",
  origenEjemplo: "Bogotá, Colombia",
  linkedin: "LinkedIn",
  linkedinAyuda: "If you do not have one, paste another profile that shows what you have worked on.",
  scholar: "GitHub, Scholar or portfolio",
  scholarAyuda: "Anything of yours we can open: a repository, publications, a piece of writing, a project.",
  carrera: "What are you doing right now?",
  carreraAyuda: "What you study or where you work, and for how long.",
  motivo: "Why do you want to take part in this sprint?",
  motivoAyuda: "What brought you here and what you hope to leave the weekend with.",
  problema: "What problem would you like to work on during the sprint?",
  problemaAyuda:
    "Up to about 200 words. We are not looking for a finished proposal; we want to see whether you can picture something concrete and doable in a weekend.",
  frente: "Which of the five tracks appeals to you most?",
  frenteAyuda: "It is not a commitment. Teams form on Friday and you may well end up on another one.",
  equipo: "Are you applying alone or with a team?",
  equipoAyuda:
    "Teams are one to five people. If you apply alone, on Friday evening we put teams together in the room with everyone else in the same situation.",
  companeros: "Who are you applying with?",
  companerosAyuda:
    "The names of the people coming with you. Each of them has to fill in this form separately.",
  viaje: "How would you get to Bogotá?",
  viajeAyuda:
    "This helps us organise. Travel to Bogotá and your stay there are on you.",
  acceso: "Do you need anything in order to take part?",
  accesoAyuda:
    "Dietary restrictions, accessibility, timing, caring for someone. Whatever you tell us here we take into account when organising.",
  extra: "Anything else you want to tell us?",
  extraAyuda: "Genuinely optional. If nothing comes to mind, leave it blank.",

  confirmacionIA:
    "I wrote the answers in this application myself. I may have used a model to fix the wording, but the reasoning is mine.",
  privacidadAntes:
    "We use the information you share to select the participants and to organise the weekend. If you are selected, the other participants will see your name, what you are working on and the track you chose, so that teams come together more easily. Your email and your answers to the last two questions stay confidential. If at any point you want us to delete your data, you can write to us at ",
  privacidadDespues: ".",
  enviar: "Send application",
  enviando: "Sending…",
  guardado: "What you write is kept in this browser until you send it.",

  tracks: {
    containment: "Containment standards",
    analysis: "Incident analysis",
    regulatory: "Regulatory response",
    communication: "Communication strategy",
    open: "Open track",
    either: "I am not sure yet",
  },
  equipos: {
    solo: "I am applying alone and would like help finding a team",
    equipo: "I am applying with a team already formed",
  },
  viajes: {
    bogota: "I live in Bogotá or nearby",
    colombia: "I am coming from another city in Colombia",
    international: "I am coming from outside Colombia",
  },
};

const pt: TextosAplicar = {
  cerradoTitulo: "As inscrições já encerraram",
  cerradoCuerpo:
    "O prazo para o hub presencial em Bogotá encerrou em 6 de setembro. Você ainda pode participar on-line com a Apart, que recebe projetos até o domingo do sprint.",
  cerradoEnLinea: "Participar on-line",
  volverAlSprint: "Voltar ao sprint",

  enviadoTitulo: "Recebemos sua inscrição",
  enviadoCuerpo1:
    "Uma confirmação chega ao e-mail que você nos deu. Revisamos as inscrições conforme elas chegam e respondemos a todo mundo antes do sprint, qualquer que seja o resultado.",
  enviadoCuerpo2:
    "Enquanto isso, o grupo de WhatsApp é por onde anunciamos o local e o que vale a pena ler antes.",
  enviadoGrupo: "Entrar no grupo",

  fallaAntes:
    "Não conseguimos salvar sua inscrição. Tente de novo em um minuto; o que você escreveu continua aqui. Se falhar outra vez, escreva para ",
  fallaDespues: " e a recebemos por e-mail.",

  resumenTitulo: "Falta responder isto antes de enviar:",
  faltaResponder: "Falta responder.",
  correoMal: "Confira o e-mail: parece que falta algo.",
  limite: (tope) => `Você passou do limite de ${tope} caracteres.`,
  opcional: " (opcional)",
  trampa: "Não preencha este campo",

  falta: {
    firstName: "Seu nome",
    lastName: "Seu sobrenome",
    email: "Seu e-mail",
    location: "De onde você viria",
    linkedin: "Seu LinkedIn",
    scholar: "Seu GitHub, Scholar ou portfólio",
    career: "No que você está agora",
    reason: "Por que você quer participar",
    hubProblem: "O problema que você gostaria de abordar",
    hubTrack: "A frente que te chama",
    hubTeam: "Se você se inscreve sozinho ou com equipe",
    hubTravel: "Como você chegaria a Bogotá",
    aiConfirm: "A confirmação sobre o uso de IA",
    hubTeamNames: "Com quem você se inscreve",
  },

  seccionBasicos: "Dados básicos",
  seccionTrayectoria: "Sua trajetória",
  trayectoriaNota:
    "Não pedimos credenciais nem experiência prévia em segurança da IA. Saber de onde você vem nos serve para a seleção e para que na sexta seja mais fácil você encontrar uma equipe.",
  seccionSeleccion: "Sua proposta para o sprint",
  seleccionNota:
    "Responda com o seu próprio raciocínio: não aceitamos inscrições escritas por um modelo.",
  seccionServir: "Para que o fim de semana sirva a você",
  seccionAntes: "Antes de enviar",

  nombre: "Nome",
  apellidos: "Sobrenome",
  correo: "E-mail",
  correoAyuda: "É por aqui que avisamos se você entrou e por onde mandamos o local.",
  origen: "De onde você viria",
  origenAyuda: "Cidade e país.",
  origenEjemplo: "Bogotá, Colômbia",
  linkedin: "LinkedIn",
  linkedinAyuda: "Se você não tiver, cole outro perfil onde dê para ver no que você trabalhou.",
  scholar: "GitHub, Scholar ou portfólio",
  scholarAyuda: "Qualquer coisa sua que a gente possa abrir: repositório, publicações, um texto, um projeto.",
  carrera: "No que você está agora?",
  carreraAyuda: "O que você estuda ou onde trabalha, e há quanto tempo.",
  motivo: "Por que você quer participar deste sprint?",
  motivoAyuda: "O que trouxe você até aqui e o que espera levar do fim de semana.",
  problema: "Que problema você gostaria de abordar no sprint?",
  problemaAyuda:
    "Até umas 200 palavras. Não buscamos uma proposta fechada; queremos ver se você imagina algo concreto e viável em um fim de semana.",
  frente: "Qual das cinco frentes mais te chama?",
  frenteAyuda: "Não é um compromisso. As equipes se formam na sexta e você pode acabar em outra.",
  equipo: "Você se inscreve sozinho ou com equipe?",
  equipoAyuda:
    "As equipes são de uma a cinco pessoas. Se você se inscrever sozinho, na sexta à noite montamos equipes na sala com quem estiver na mesma situação.",
  companeros: "Com quem você se inscreve?",
  companerosAyuda:
    "Os nomes das pessoas que vêm com você. Cada uma precisa preencher este formulário por conta própria.",
  viaje: "Como você chegaria a Bogotá?",
  viajeAyuda:
    "Isso nos serve para organizar. O transporte até Bogotá e a estadia ficam por sua conta.",
  acceso: "Você precisa de algo para poder participar?",
  accesoAyuda:
    "Restrições alimentares, acessibilidade, horários, cuidado de alguém. O que você contar aqui levamos em conta ao organizar.",
  extra: "Mais alguma coisa que você queira contar?",
  extraAyuda: "Opcional de verdade. Se não lhe ocorrer nada, deixe em branco.",

  confirmacionIA:
    "As respostas desta inscrição fui eu que escrevi. Posso ter usado um modelo para corrigir a redação, mas o raciocínio é meu.",
  privacidadAntes:
    "Usamos as informações que você compartilha para selecionar os participantes e organizar o fim de semana. Se você for selecionado, os demais participantes poderão ver seu nome, no que você está trabalhando e a frente que escolheu, para facilitar a formação de equipes. Seu e-mail e suas respostas às duas últimas perguntas serão confidenciais. Se em algum momento você quiser que apaguemos seus dados, pode escrever para ",
  privacidadDespues: ".",
  enviar: "Enviar inscrição",
  enviando: "Enviando…",
  guardado: "O que você escreve fica guardado neste navegador enquanto não for enviado.",

  tracks: {
    containment: "Padrões de contenção",
    analysis: "Análise do incidente",
    regulatory: "Resposta regulatória",
    communication: "Estratégia de comunicação",
    open: "Track aberto",
    either: "Ainda não tenho claro",
  },
  equipos: {
    solo: "Inscrevo-me sozinho e quero ajuda para montar equipe",
    equipo: "Inscrevo-me com uma equipe já montada",
  },
  viajes: {
    bogota: "Moro em Bogotá ou perto",
    colombia: "Venho de outra cidade da Colômbia",
    international: "Venho de fora da Colômbia",
  },
};

export const TEXTOS_APLICAR: Record<Idioma, TextosAplicar> = { es, en, pt };
