"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CIERRE_INSCRIPCIONES_ISO,
  CORREO_HACKATHON,
  GRUPO_COMUNIDAD_WHATSAPP,
  TEXTOS_HACKATHON,
} from "@/app/defacchackathon/datos";
import type { Idioma } from "@/lib/idiomas";
import { rutaEn } from "@/lib/idiomas";
import { RUTA_POLITICA, TEXTOS_POLITICA } from "@/lib/politica-datos";

/* Borrador local: quien empieza a escribir y cierra la pestaña no pierde lo que
   llevaba. Se borra al enviar. La casilla de autorización nunca se guarda. */
const BORRADOR = "aisc-defacc-2026-11-draft";

type Campos = Record<string, string>;

/* Los nombres de los campos son los que espera app/api/defacc/aplicar/route.ts.
   Los identificadores de las opciones (CC, intermedio, track-1, alergia…) no se
   traducen: son los que viajan a la base de datos. */
const VACIO: Campos = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  documentType: "CC",
  documentNumber: "",
  affiliation: "",
  careerRole: "",
  experienceLevel: "",
  linkedin: "",
  githubPortfolio: "",
  teamMode: "",
  teamMembers: "",
  preferredTrack: "",
  projectIdea: "",
  dietaryRestrictions: "",
  availability: "",
  authorization: "",
  website: "",
};

const OBLIGATORIOS = [
  "firstName",
  "lastName",
  "email",
  "whatsapp",
  "documentType",
  "documentNumber",
  "affiliation",
  "careerRole",
  "experienceLevel",
  "linkedin",
  "teamMode",
  "preferredTrack",
  "projectIdea",
] as const;

/* Los mismos topes que aplica la ruta de la API. */
const LIMITES: Record<string, number> = {
  firstName: 100,
  lastName: 100,
  email: 200,
  whatsapp: 40,
  documentNumber: 50,
  affiliation: 300,
  careerRole: 300,
  linkedin: 300,
  githubPortfolio: 300,
  projectIdea: 1500,
  dietaryRestrictions: 300,
};

/* Mínimo de caracteres para la pregunta de selección (projectIdea). La ruta
   aplica el mismo mínimo. */
const IDEA_MINIMO = 30;

/* Equipo: de 2 a 4 personas contando a quien se postula, así que hasta tres
   integrantes más. Cada fila viaja a la ruta como una línea "Nombre <correo>". */
const MAX_COMPANEROS = 3;
type Companero = { nombre: string; correo: string };
const FILA_VACIA: Companero = { nombre: "", correo: "" };
const CORREO_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* LinkedIn: se acepta "linkedin.com/in/x" sin https o cualquier dirección web.
   Es la misma regla de la ruta. */
function enlaceValido(valor: string): boolean {
  const s = valor.trim();
  if (/\s/.test(s)) return false;
  if (/^(https?:\/\/)?([\w-]+\.)*linkedin\.com\/\S+$/i.test(s)) return true;
  return /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?$/i.test(s);
}

function filaCompleta(f: Companero): boolean {
  return Boolean(f.nombre.trim()) && CORREO_RE.test(f.correo.trim());
}

function filaVacia(f: Companero): boolean {
  return !f.nombre.trim() && !f.correo.trim();
}

function serializarEquipo(filas: Companero[]): string {
  return filas
    .filter((f) => !filaVacia(f))
    .map((f) => `${f.nombre.trim()} <${f.correo.trim()}>`)
    .join("\n");
}

/* Para borradores viejos que guardaban el equipo como texto libre. */
function leerEquipo(texto: string): Companero[] {
  const filas = texto
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, MAX_COMPANEROS)
    .map((l) => {
      const m = l.match(/^(.*?)\s*<([^>]+)>\s*$/);
      if (m) return { nombre: m[1].trim(), correo: m[2].trim() };
      const correo = l.match(/[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+/)?.[0] ?? "";
      const nombre = l.replace(correo, "").replace(/[,;:<>()-]+/g, " ").trim();
      return { nombre, correo };
    });
  return filas.length > 0 ? filas : [{ ...FILA_VACIA }];
}

const DOCUMENTOS = ["CC", "CE", "Pasaporte", "TI", "Otro"] as const;
const NIVELES = ["principiante", "intermedio", "avanzado"] as const;
const MODALIDADES = ["individual", "equipo"] as const;

/* WhatsApp: se acepta como lo escriba cada quien y solo se exige que queden
   entre siete y quince dígitos. Es la misma regla de la ruta. */
function telefonoValido(valor: string): boolean {
  const s = valor.trim();
  if (!/^\+?[\d\s().-]+$/.test(s)) return false;
  const digitos = s.replace(/\D/g, "").length;
  return digitos >= 7 && digitos <= 15;
}

/* La fecha de cierre sale de CIERRE_INSCRIPCIONES_ISO, en hora de Bogotá, para
   que el formulario no se quede con una fecha vieja si cambia el plazo. */
function fechaCierre(idioma: Idioma): string {
  const locale = idioma === "en" ? "en-US" : idioma === "pt" ? "pt-BR" : "es-CO";
  const partes = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "America/Bogota",
  }).formatToParts(new Date(CIERRE_INSCRIPCIONES_ISO));
  const p = (tipo: string) => partes.find((x) => x.type === tipo)?.value ?? "";
  const hora = Number(p("hour"));
  const minuto = p("minute");
  const h12 = `${hora % 12 === 0 ? 12 : hora % 12}:${minuto} ${hora < 12 ? "a.m." : "p.m."}`;
  if (idioma === "en") return `${p("weekday")}, ${p("month")} ${p("day")} at ${h12}`;
  if (idioma === "pt") return `${p("weekday")}, ${p("day")} de ${p("month")}, às ${String(hora).padStart(2, "0")}h${minuto}`;
  return `${p("weekday")} ${p("day")} de ${p("month")} a las ${h12}`;
}

type Textos = {
  noIniciadoTitulo: string;
  noIniciadoCuerpo: string;
  verFrentes: string;
  unirmeGrupo: string;
  cerradoTitulo: string;
  cerradoCuerpo: (cierre: string) => string;
  volver: string;
  enviadoTitulo: string;
  enviadoCuerpo1: string;
  enviadoCuerpo2: string;
  fallaAntes: string;
  fallaDespues: string;
  limitePeticiones: string;
  yaCerro: string;
  resumenTitulo: string;
  faltaResponder: string;
  correoMal: string;
  whatsappMal: string;
  enlaceMal: string;
  limite: (tope: number) => string;
  opcional: string;
  trampa: string;
  falta: Record<string, string>;
  seccionDatos: string;
  datosNota: string;
  seccionPerfil: string;
  seccionEquipo: string;
  seccionLogistica: string;
  logisticaNota: string;
  seccionAntes: string;
  nombre: string;
  apellidos: string;
  correo: string;
  correoAyuda: string;
  whatsapp: string;
  whatsappAyuda: string;
  tipoDocumento: string;
  documentos: Record<string, string>;
  numeroDocumento: string;
  numeroDocumentoAyuda: string;
  afiliacion: string;
  afiliacionAyuda: string;
  carrera: string;
  carreraAyuda: string;
  nivel: string;
  nivelAyuda: string;
  niveles: Record<string, string>;
  linkedin: string;
  linkedinAyuda: string;
  linkedinMal: string;
  github: string;
  githubAyuda: string;
  modalidad: string;
  modalidades: Record<string, { titulo: string; detalle: string }>;
  companeros: string;
  companerosAyuda: string;
  companeroNombre: string;
  companeroCorreo: string;
  agregarCompanero: string;
  quitarCompanero: string;
  companerosMal: string;
  frente: string;
  frenteAyuda: string;
  porDefinir: string;
  idea: string;
  ideaAyuda: string;
  ideaCorta: string;
  dieta: string;
  dietaAyuda: string;
  disponibilidad: string;
  privacidadAntes: string;
  privacidadDespues: string;
  enviar: string;
  enviando: string;
  guardado: string;
};

const TEXTOS: Record<Idioma, Textos> = {
  es: {
    noIniciadoTitulo: "Las postulaciones abren pronto",
    noIniciadoCuerpo:
      "Estamos cerrando los detalles de logística y de ingreso al campus con IEEE Computer Society Uniandes. Mientras abrimos el formulario, puedes revisar los cinco frentes temáticos o entrar al grupo de WhatsApp para enterarte apenas abra.",
    verFrentes: "Ver los frentes temáticos",
    unirmeGrupo: "Entrar al grupo de WhatsApp",
    cerradoTitulo: "Las postulaciones ya cerraron",
    cerradoCuerpo: (cierre) =>
      `El plazo para postularse terminó el ${cierre}. Si te postulaste, te escribimos al correo que nos diste con la respuesta y las instrucciones para entrar al campus.`,
    volver: "Volver al hackatón",
    enviadoTitulo: "Recibimos tu postulación",
    enviadoCuerpo1:
      "Te llega una confirmación al correo que nos diste. Si no la ves en unos minutos, revisa la carpeta de spam.",
    enviadoCuerpo2:
      "Te volvemos a escribir con la respuesta y las instrucciones para entrar a la Universidad de los Andes. Mientras tanto, en el grupo de WhatsApp compartimos novedades del evento.",
    fallaAntes:
      "No pudimos guardar tu postulación. Vuelve a intentarlo en un minuto; lo que escribiste sigue acá. Si falla otra vez, escríbenos a ",
    fallaDespues: " y la recibimos por correo.",
    limitePeticiones: "Recibimos demasiados envíos desde tu conexión. Espera unos minutos y vuelve a intentarlo.",
    yaCerro: "El formulario no está recibiendo postulaciones en este momento. Recarga la página para ver el estado actual.",
    resumenTitulo: "Falta responder esto antes de enviar:",
    faltaResponder: "Falta responder.",
    correoMal: "Revisa el correo: parece que le falta algo.",
    whatsappMal: "Revisa el número: con el indicativo del país y sin letras.",
    enlaceMal: "Revisa este dato.",
    limite: (tope) => `Pasaste el límite de ${tope} caracteres.`,
    opcional: " (opcional)",
    trampa: "No llenes este campo",
    falta: {
      firstName: "Tu nombre",
      lastName: "Tus apellidos",
      email: "Tu correo",
      whatsapp: "Tu WhatsApp",
      documentType: "El tipo de documento",
      documentNumber: "El número de documento",
      affiliation: "Tu universidad, empresa u ocupación",
      careerRole: "Tu carrera o cargo",
      experienceLevel: "Tu nivel de experiencia",
      linkedin: "Tu LinkedIn",
      teamMode: "Si vienes solo o en equipo",
      teamMembers: "Los nombres y correos de tu equipo",
      preferredTrack: "El frente que te interesa",
      projectIdea: "El problema que te gustaría atacar",
      dietaryRestrictions: "Restricciones o necesidades para el día",
      availability: "La confirmación de asistencia",
    },
    seccionDatos: "Tus datos",
    datosNota:
      "Los usamos para darte la respuesta y para registrar tu ingreso a la Universidad de los Andes.",
    seccionPerfil: "Tu perfil",
    seccionEquipo: "Equipo y frente",
    seccionLogistica: "La jornada",
    logisticaNota:
      "Damos almuerzo en el campus. Si hay algo que debamos tener en cuenta para tu día, cuéntanos acá.",
    seccionAntes: "Antes de enviar",
    nombre: "Nombres",
    apellidos: "Apellidos",
    correo: "Correo",
    correoAyuda: "Ahí te llega la confirmación y la respuesta.",
    whatsapp: "WhatsApp",
    whatsappAyuda: "Con el indicativo del país, por ejemplo +57.",
    tipoDocumento: "Tipo de documento",
    documentos: {
      CC: "Cédula de ciudadanía",
      CE: "Cédula de extranjería",
      Pasaporte: "Pasaporte",
      TI: "Tarjeta de identidad",
      Otro: "Otro",
    },
    numeroDocumento: "Número de documento",
    numeroDocumentoAyuda:
      "La universidad lo pide para autorizar tu ingreso. Escríbelo como aparece en el documento que vas a llevar ese día.",
    afiliacion: "Universidad, empresa u ocupación",
    afiliacionAyuda: "Donde estudias o trabajas. Si eres independiente o estás buscando trabajo, escríbelo así.",
    carrera: "Carrera, semestre o cargo",
    carreraAyuda: "Por ejemplo: Ingeniería de Sistemas, sexto semestre.",
    nivel: "Experiencia con IA y programación",
    nivelAyuda: "No filtramos por nivel. Nos sirve para armar equipos parejos.",
    niveles: {
      principiante: "Principiante: Python básico o primeros semestres",
      intermedio: "Intermedio: he usado APIs de modelos de lenguaje o he hecho proyectos con RAG",
      avanzado: "Avanzado: ciberseguridad, benchmarks, entrenamiento o evaluación de modelos",
    },
    linkedin: "LinkedIn",
    linkedinAyuda: "El enlace a tu perfil, por ejemplo linkedin.com/in/tu-nombre.",
    linkedinMal: "Revisa el enlace: debe ser la dirección de tu perfil de LinkedIn.",
    github: "GitHub o página personal",
    githubAyuda: "Algo donde veamos tu trabajo, si lo tienes.",
    modalidad: "¿Cómo te postulas?",
    modalidades: {
      individual: {
        titulo: "Solo",
        detalle: "Te ayudamos a armar equipo la mañana del evento.",
      },
      equipo: {
        titulo: "Con un equipo de 2 a 4 personas",
        detalle: "Cada integrante llena su propio formulario, porque el ingreso al campus es individual.",
      },
    },
    companeros: "Nombres y correos de tu equipo",
    companerosAyuda: "Hasta tres personas, con el correo que usaron o van a usar en su postulación.",
    companeroNombre: "Nombre",
    companeroCorreo: "Correo",
    agregarCompanero: "+ Agregar integrante",
    quitarCompanero: "Quitar integrante",
    companerosMal: "Completa el nombre y un correo válido de cada integrante.",
    frente: "Frente temático que más te interesa",
    frenteAyuda: "Puedes cambiarlo el día del evento.",
    porDefinir: "Todavía no sé, lo decido ese día",
    idea: "¿Qué problema de seguridad o defensa con IA te gustaría atacar, y por qué?",
    ideaAyuda: "No tiene que ser una idea completa. Con unas pocas frases basta.",
    ideaCorta: "Cuéntanos un poco más: escribe al menos 30 caracteres.",
    dieta: "¿Restricciones alimentarias, alergias o algo de accesibilidad que debamos saber?",
    dietaAyuda: "Por ejemplo: vegetariana, celiaquía, alergia al maní, movilidad reducida.",
    disponibilidad:
      "Confirmo que puedo estar en la Universidad de los Andes durante toda la jornada del sábado 14 de noviembre de 2026.",
    privacidadAntes:
      "Guardamos tus respuestas para revisar tu postulación y organizar el evento. El número de documento se comparte con la Universidad de los Andes para registrar tu ingreso. Si quieres corregir o borrar tus datos, escríbenos a ",
    privacidadDespues: ".",
    enviar: "Enviar postulación",
    enviando: "Enviando…",
    guardado: "Lo que escribes se guarda en este navegador mientras no lo envíes.",
  },
  en: {
    noIniciadoTitulo: "Applications open soon",
    noIniciadoCuerpo:
      "We are finishing logistics and campus access with IEEE Computer Society Uniandes. Until the form opens, you can read about the five research tracks or join the WhatsApp group to hear as soon as it does.",
    verFrentes: "See the research tracks",
    unirmeGrupo: "Join the WhatsApp group",
    cerradoTitulo: "Applications are closed",
    cerradoCuerpo: (cierre) =>
      `The deadline was ${cierre}. If you applied, we will email you with the decision and instructions for getting onto campus.`,
    volver: "Back to the hackathon",
    enviadoTitulo: "We received your application",
    enviadoCuerpo1:
      "A confirmation is on its way to the email you gave us. If you don't see it in a few minutes, check your spam folder.",
    enviadoCuerpo2:
      "We will write again with the decision and instructions for entering Universidad de los Andes. In the meantime, the WhatsApp group is where we share event news.",
    fallaAntes:
      "We couldn't save your application. Try again in a minute; what you wrote is still here. If it fails again, email us at ",
    fallaDespues: " and we'll take it by email.",
    limitePeticiones: "Too many submissions from your connection. Wait a few minutes and try again.",
    yaCerro: "The form isn't accepting applications right now. Reload the page to see the current status.",
    resumenTitulo: "Please answer these before sending:",
    faltaResponder: "This is required.",
    correoMal: "Check the email address: something seems to be missing.",
    whatsappMal: "Check the number: include the country code and no letters.",
    enlaceMal: "Check this field.",
    limite: (tope) => `You went over the ${tope}-character limit.`,
    opcional: " (optional)",
    trampa: "Leave this field empty",
    falta: {
      firstName: "Your first name",
      lastName: "Your last name",
      email: "Your email",
      whatsapp: "Your WhatsApp",
      documentType: "ID type",
      documentNumber: "ID number",
      affiliation: "Your university, company or occupation",
      careerRole: "Your program or role",
      experienceLevel: "Your experience level",
      linkedin: "Your LinkedIn",
      teamMode: "Whether you're coming solo or with a team",
      teamMembers: "Your teammates' names and emails",
      preferredTrack: "Your preferred track",
      projectIdea: "The problem you'd like to work on",
      dietaryRestrictions: "Dietary or accessibility needs",
      availability: "Attendance confirmation",
    },
    seccionDatos: "About you",
    datosNota: "We use these to send you the decision and to register your entry to Universidad de los Andes.",
    seccionPerfil: "Your background",
    seccionEquipo: "Team and track",
    seccionLogistica: "The day",
    logisticaNota: "Lunch is provided on campus. Let us know about anything we should plan for.",
    seccionAntes: "Before you send",
    nombre: "First name",
    apellidos: "Last name",
    correo: "Email",
    correoAyuda: "Where the confirmation and decision will go.",
    whatsapp: "WhatsApp",
    whatsappAyuda: "Include the country code, for example +57.",
    tipoDocumento: "ID type",
    documentos: {
      CC: "Colombian citizen ID (CC)",
      CE: "Colombian foreigner ID (CE)",
      Pasaporte: "Passport",
      TI: "Colombian minor ID (TI)",
      Otro: "Other",
    },
    numeroDocumento: "ID number",
    numeroDocumentoAyuda:
      "The university requires it to let you in. Write it exactly as it appears on the ID you will bring that day.",
    afiliacion: "University, company or occupation",
    afiliacionAyuda: "Where you study or work. If you're freelance or looking for work, just say so.",
    carrera: "Program, year or role",
    carreraAyuda: "For example: Computer Science, third year.",
    nivel: "AI and coding experience",
    nivelAyuda: "We don't filter by level. It helps us form balanced teams.",
    niveles: {
      principiante: "Beginner: basic Python or early in your degree",
      intermedio: "Intermediate: I've used LLM APIs or built RAG projects",
      avanzado: "Advanced: security, benchmarks, model training or evaluation",
    },
    linkedin: "LinkedIn",
    linkedinAyuda: "A link to your profile, for example linkedin.com/in/your-name.",
    linkedinMal: "Check the link: it should be your LinkedIn profile address.",
    github: "GitHub or personal site",
    githubAyuda: "Somewhere we can see your work, if you have it.",
    modalidad: "How are you applying?",
    modalidades: {
      individual: {
        titulo: "Solo",
        detalle: "We'll help you find a team on the morning of the event.",
      },
      equipo: {
        titulo: "With a team of 2 to 4",
        detalle: "Each member fills in their own form, since campus access is individual.",
      },
    },
    companeros: "Your teammates' names and emails",
    companerosAyuda: "Up to three people, with the email they used or will use to apply.",
    companeroNombre: "Name",
    companeroCorreo: "Email",
    agregarCompanero: "+ Add teammate",
    quitarCompanero: "Remove teammate",
    companerosMal: "Fill in the name and a valid email for each teammate.",
    frente: "Track you're most interested in",
    frenteAyuda: "You can change it on the day.",
    porDefinir: "Not sure yet, I'll decide on the day",
    idea: "What AI security or defense problem would you like to work on, and why?",
    ideaAyuda: "It doesn't have to be a full idea yet. A few sentences are enough.",
    ideaCorta: "Tell us a bit more: write at least 30 characters.",
    dieta: "Any dietary restrictions, allergies or accessibility needs we should know about?",
    dietaAyuda: "For example: vegetarian, celiac, peanut allergy, reduced mobility.",
    disponibilidad:
      "I confirm I can be at Universidad de los Andes for the whole day on Saturday, November 14, 2026.",
    privacidadAntes:
      "We store your answers to review your application and run the event. Your ID number is shared with Universidad de los Andes to register your entry. To correct or delete your data, email ",
    privacidadDespues: ".",
    enviar: "Send application",
    enviando: "Sending…",
    guardado: "What you type is saved in this browser until you send it.",
  },
  pt: {
    noIniciadoTitulo: "As candidaturas abrem em breve",
    noIniciadoCuerpo:
      "Estamos fechando os detalhes de logística e de acesso ao campus com a IEEE Computer Society Uniandes. Enquanto o formulário não abre, você pode conhecer as cinco frentes temáticas ou entrar no grupo de WhatsApp para saber assim que abrir.",
    verFrentes: "Ver as frentes temáticas",
    unirmeGrupo: "Entrar no grupo de WhatsApp",
    cerradoTitulo: "As candidaturas foram encerradas",
    cerradoCuerpo: (cierre) =>
      `O prazo terminou ${cierre}. Se você se inscreveu, vamos escrever para o seu e-mail com a resposta e as instruções de acesso ao campus.`,
    volver: "Voltar ao hackathon",
    enviadoTitulo: "Recebemos sua candidatura",
    enviadoCuerpo1:
      "Uma confirmação está a caminho do e-mail que você informou. Se não aparecer em alguns minutos, confira a pasta de spam.",
    enviadoCuerpo2:
      "Vamos escrever de novo com a resposta e as instruções para entrar na Universidad de los Andes. Enquanto isso, no grupo de WhatsApp compartilhamos as novidades do evento.",
    fallaAntes:
      "Não conseguimos salvar sua candidatura. Tente de novo em um minuto; o que você escreveu continua aqui. Se falhar outra vez, escreva para ",
    fallaDespues: " e recebemos por e-mail.",
    limitePeticiones: "Recebemos envios demais da sua conexão. Espere alguns minutos e tente de novo.",
    yaCerro: "O formulário não está recebendo candidaturas agora. Recarregue a página para ver a situação atual.",
    resumenTitulo: "Falta responder isto antes de enviar:",
    faltaResponder: "Falta responder.",
    correoMal: "Confira o e-mail: parece que falta algo.",
    whatsappMal: "Confira o número: com o código do país e sem letras.",
    enlaceMal: "Confira este dado.",
    limite: (tope) => `Você passou do limite de ${tope} caracteres.`,
    opcional: " (opcional)",
    trampa: "Não preencha este campo",
    falta: {
      firstName: "Seu nome",
      lastName: "Seu sobrenome",
      email: "Seu e-mail",
      whatsapp: "Seu WhatsApp",
      documentType: "O tipo de documento",
      documentNumber: "O número do documento",
      affiliation: "Sua universidade, empresa ou ocupação",
      careerRole: "Seu curso ou cargo",
      experienceLevel: "Seu nível de experiência",
      linkedin: "Seu LinkedIn",
      teamMode: "Se você vem sozinho ou em equipe",
      teamMembers: "Os nomes e e-mails da sua equipe",
      preferredTrack: "A frente que te interessa",
      projectIdea: "O problema que você gostaria de atacar",
      dietaryRestrictions: "Restrições ou necessidades para o dia",
      availability: "A confirmação de presença",
    },
    seccionDatos: "Seus dados",
    datosNota: "Usamos para enviar a resposta e para registrar sua entrada na Universidad de los Andes.",
    seccionPerfil: "Seu perfil",
    seccionEquipo: "Equipe e frente",
    seccionLogistica: "O dia do evento",
    logisticaNota: "Oferecemos almoço no campus. Conte se há algo que devemos levar em conta para o seu dia.",
    seccionAntes: "Antes de enviar",
    nombre: "Nome",
    apellidos: "Sobrenome",
    correo: "E-mail",
    correoAyuda: "É para onde vão a confirmação e a resposta.",
    whatsapp: "WhatsApp",
    whatsappAyuda: "Com o código do país, por exemplo +55.",
    tipoDocumento: "Tipo de documento",
    documentos: {
      CC: "Cédula de cidadania colombiana (CC)",
      CE: "Cédula de estrangeiro (CE)",
      Pasaporte: "Passaporte",
      TI: "Tarjeta de identidad (TI)",
      Otro: "Outro",
    },
    numeroDocumento: "Número do documento",
    numeroDocumentoAyuda:
      "A universidade exige para autorizar sua entrada. Escreva como aparece no documento que você vai levar no dia.",
    afiliacion: "Universidade, empresa ou ocupação",
    afiliacionAyuda: "Onde você estuda ou trabalha. Se é autônomo ou está procurando emprego, escreva isso.",
    carrera: "Curso, semestre ou cargo",
    carreraAyuda: "Por exemplo: Ciência da Computação, sexto semestre.",
    nivel: "Experiência com IA e programação",
    nivelAyuda: "Não filtramos por nível. Isso nos ajuda a montar equipes equilibradas.",
    niveles: {
      principiante: "Iniciante: Python básico ou primeiros semestres",
      intermedio: "Intermediário: já usei APIs de modelos de linguagem ou fiz projetos com RAG",
      avanzado: "Avançado: cibersegurança, benchmarks, treinamento ou avaliação de modelos",
    },
    linkedin: "LinkedIn",
    linkedinAyuda: "O link do seu perfil, por exemplo linkedin.com/in/seu-nome.",
    linkedinMal: "Confira o link: deve ser o endereço do seu perfil no LinkedIn.",
    github: "GitHub ou site pessoal",
    githubAyuda: "Algum lugar onde possamos ver seu trabalho, se tiver.",
    modalidad: "Como você se inscreve?",
    modalidades: {
      individual: {
        titulo: "Sozinho",
        detalle: "Ajudamos você a montar uma equipe na manhã do evento.",
      },
      equipo: {
        titulo: "Com uma equipe de 2 a 4 pessoas",
        detalle: "Cada integrante preenche o próprio formulário, porque o acesso ao campus é individual.",
      },
    },
    companeros: "Nomes e e-mails da sua equipe",
    companerosAyuda: "Até três pessoas, com o e-mail que usaram ou vão usar na candidatura.",
    companeroNombre: "Nome",
    companeroCorreo: "E-mail",
    agregarCompanero: "+ Adicionar integrante",
    quitarCompanero: "Remover integrante",
    companerosMal: "Preencha o nome e um e-mail válido de cada integrante.",
    frente: "Frente temática que mais te interessa",
    frenteAyuda: "Você pode mudar no dia do evento.",
    porDefinir: "Ainda não sei, decido no dia",
    idea: "Que problema de segurança ou defesa com IA você gostaria de atacar, e por quê?",
    ideaAyuda: "Não precisa ser uma ideia completa. Algumas frases bastam.",
    ideaCorta: "Conte um pouco mais: escreva pelo menos 30 caracteres.",
    dieta: "Restrições alimentares, alergias ou alguma necessidade de acessibilidade que devamos saber?",
    dietaAyuda: "Por exemplo: vegetariana, doença celíaca, alergia a amendoim, mobilidade reduzida.",
    disponibilidad:
      "Confirmo que posso estar na Universidad de los Andes durante todo o dia no sábado, 14 de novembro de 2026.",
    privacidadAntes:
      "Guardamos suas respostas para avaliar sua candidatura e organizar o evento. O número do documento é compartilhado com a Universidad de los Andes para registrar sua entrada. Para corrigir ou apagar seus dados, escreva para ",
    privacidadDespues: ".",
    enviar: "Enviar candidatura",
    enviando: "Enviando…",
    guardado: "O que você escreve fica salvo neste navegador até o envio.",
  },
};

const INPUT =
  "text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors placeholder:text-aisc-muted/60 focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35";
const INPUT_MAL =
  "border-aisc-coral focus:border-aisc-coral focus:outline-aisc-coral/35";
/* Los select usan la misma caja que los campos de texto, sin la flecha nativa:
   la flecha es un SVG aparte y el padding derecho evita que el texto la pise. */
const SELECT = `${INPUT} cursor-pointer appearance-none pr-10`;
const ETIQUETA = "text-body-sm block font-medium text-aisc-ink";
const AYUDA = "text-meta mt-1 block text-aisc-muted";
const ERROR = "text-meta mt-1.5 block text-aisc-coral";
const SECCION = "border-t border-aisc-line pt-8 first:border-t-0 first:pt-0";
const TITULO = "text-display-3 md:text-display-3-lg text-balance";
const NOTA = "text-body-sm mt-3 max-w-[640px] text-aisc-muted";
const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";
const OPCION =
  "text-body-sm flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6";
const CASILLA =
  "text-body-sm flex cursor-pointer items-start gap-3 rounded-[var(--radius)] border border-aisc-line bg-white px-4 py-4 transition-colors hover:border-aisc-forest/45 has-checked:border-aisc-forest has-checked:bg-aisc-forest/6";
const BOTON_LLENO =
  "text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85";
const BOTON_CONTORNO =
  "text-body-sm inline-flex min-h-11 items-center rounded-full border border-aisc-ink px-6 font-medium text-aisc-ink transition-colors hover:bg-aisc-ink hover:text-aisc-cream";
const TARJETA =
  "rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11";

function Campo({
  name,
  label,
  ayuda,
  error,
  requerido,
  opcional,
  children,
}: {
  name: string;
  label: string;
  ayuda?: string;
  error?: string;
  requerido?: boolean;
  opcional: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className={ETIQUETA} htmlFor={name}>
        {label}
        {requerido ? (
          <span className="text-aisc-coral"> *</span>
        ) : (
          <span className="text-aisc-muted">{opcional}</span>
        )}
      </label>
      {ayuda ? <span className={AYUDA}>{ayuda}</span> : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <span className={ERROR} id={`${name}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

/* Flecha de los select: decorativa, no recibe clics (el clic llega al select). */
function Flecha() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-aisc-muted"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function Opciones({
  name,
  legend,
  ayuda,
  opciones,
  valor,
  error,
  onChange,
}: {
  name: string;
  legend: string;
  ayuda?: string;
  opciones: { id: string; texto: React.ReactNode }[];
  valor: string;
  error?: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className={ETIQUETA}>
        {legend}
        <span className="text-aisc-coral"> *</span>
      </legend>
      {ayuda ? <span className={AYUDA}>{ayuda}</span> : null}
      <div className="mt-3 flex flex-col gap-2">
        {opciones.map((opcion) => (
          <label className={OPCION} key={opcion.id}>
            <input
              type="radio"
              name={name}
              value={opcion.id}
              checked={valor === opcion.id}
              onChange={() => onChange(opcion.id)}
              className="mt-0.5 accent-aisc-forest"
            />
            <span>{opcion.texto}</span>
          </label>
        ))}
      </div>
      {error ? (
        <span className={ERROR} id={`${name}-error`} role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}

export default function DefAccApplyForm({
  cerrado = false,
  noIniciado = false,
  idioma = "es",
}: {
  cerrado?: boolean;
  noIniciado?: boolean;
  idioma?: Idioma;
}) {
  const t = TEXTOS[idioma];
  const tp = TEXTOS_POLITICA[idioma];
  const tracks = TEXTOS_HACKATHON[idioma].kits.listaTracks;
  const inicio = rutaEn(idioma, "/defacchackathon");
  const [v, setV] = useState<Campos>(VACIO);
  const [filas, setFilas] = useState<Companero[]>([{ ...FILA_VACIA }]);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [estado, setEstado] = useState<
    "listo" | "enviando" | "enviado" | "falla"
  >("listo");
  const [aviso, setAviso] = useState<string | null>(null);
  const [faltantes, setFaltantes] = useState<string[]>([]);
  const [cargado, setCargado] = useState(false);
  const resumen = useRef<HTMLDivElement>(null);

  /* Recuperar el borrador. Va en un efecto para que el HTML del servidor y el
     del cliente coincidan en el primer render. */
  useEffect(() => {
    try {
      const guardado = window.localStorage.getItem(BORRADOR);
      if (guardado) {
        const { teamRows, ...resto } = JSON.parse(guardado) as Record<string, unknown>;
        const previos: Campos = {};
        for (const [k, valor] of Object.entries(resto)) {
          if (typeof valor === "string") previos[k] = valor;
        }
        /* Borradores de la versión con opciones de dieta: "ninguna" pasa a
           vacío y el detalle de la alergia se suma al texto libre. */
        const dietaVieja = previos.dietaryRestrictions ?? "";
        const detalleViejo = previos.dietaryDetail ?? "";
        delete previos.dietaryDetail;
        if (["ninguna", "vegetariano", "vegano", "alergia"].includes(dietaVieja)) {
          const base = ["vegetariano", "vegano"].includes(dietaVieja) ? dietaVieja : "";
          previos.dietaryRestrictions = [base, detalleViejo].filter(Boolean).join(", ");
        }
        setV({
          ...VACIO,
          ...previos,
          availability: "",
          authorization: "",
          website: "",
        });
        if (Array.isArray(teamRows)) {
          const leidas = (teamRows as unknown[])
            .slice(0, MAX_COMPANEROS)
            .map((f) => {
              const fila = (f ?? {}) as Record<string, unknown>;
              return {
                nombre: typeof fila.nombre === "string" ? fila.nombre : "",
                correo: typeof fila.correo === "string" ? fila.correo : "",
              };
            });
          setFilas(leidas.length > 0 ? leidas : [{ ...FILA_VACIA }]);
        } else if (previos.teamMembers) {
          setFilas(leerEquipo(previos.teamMembers));
        }
      }
    } catch {
      /* si el almacenamiento está bloqueado, se sigue sin borrador */
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado || estado === "enviado") return;
    try {
      window.localStorage.setItem(
        BORRADOR,
        JSON.stringify({
          ...v,
          teamMembers: serializarEquipo(filas),
          teamRows: filas,
          website: "",
          authorization: "",
          availability: "",
        }),
      );
    } catch {
      /* idem */
    }
  }, [v, filas, cargado, estado]);

  const set = (name: string, valor: string) => {
    setV((prev) => ({ ...prev, [name]: valor }));
    setErrores((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const limpiarErrorEquipo = () =>
    setErrores((prev) => (prev.teamMembers ? { ...prev, teamMembers: "" } : prev));

  const setFila = (i: number, campo: keyof Companero, valor: string) => {
    setFilas((prev) => prev.map((f, j) => (j === i ? { ...f, [campo]: valor } : f)));
    limpiarErrorEquipo();
  };

  const agregarFila = () => {
    setFilas((prev) =>
      prev.length >= MAX_COMPANEROS ? prev : [...prev, { ...FILA_VACIA }],
    );
  };

  const quitarFila = (i: number) => {
    setFilas((prev) => (prev.length <= 1 ? prev : prev.filter((_, j) => j !== i)));
    limpiarErrorEquipo();
  };

  /* Al menos una fila completa, y ninguna a medias ni con correo inválido. */
  const equipoValido = () =>
    filas.some(filaCompleta) && filas.every((f) => filaVacia(f) || filaCompleta(f));

  const revisar = () => {
    const nuevos: Record<string, string> = {};
    for (const campo of OBLIGATORIOS) {
      if (!v[campo]?.trim()) nuevos[campo] = t.faltaResponder;
    }
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) {
      nuevos.email = t.correoMal;
    }
    if (v.whatsapp.trim() && !telefonoValido(v.whatsapp)) {
      nuevos.whatsapp = t.whatsappMal;
    }
    if (v.linkedin.trim() && !enlaceValido(v.linkedin)) {
      nuevos.linkedin = t.linkedinMal;
    }
    if (v.projectIdea.trim() && v.projectIdea.trim().length < IDEA_MINIMO) {
      nuevos.projectIdea = t.ideaCorta;
    }
    if (v.teamMode === "equipo" && !equipoValido()) {
      nuevos.teamMembers = filas.every(filaVacia) ? t.faltaResponder : t.companerosMal;
    }
    if (v.availability !== "si") nuevos.availability = t.faltaResponder;
    if (v.authorization !== "si") nuevos.authorization = tp.casillaFalta;
    for (const [name, tope] of Object.entries(LIMITES)) {
      if ((v[name] ?? "").trim().length > tope) nuevos[name] = t.limite(tope);
    }
    return nuevos;
  };

  const listarFaltantes = (nuevos: Record<string, string>) => {
    const orden = [
      ...OBLIGATORIOS,
      "teamMembers",
      "dietaryRestrictions",
      "availability",
    ];
    const pendientes = orden.filter((c) => nuevos[c]).map((c) => t.falta[c]);
    if (nuevos.authorization) pendientes.push(tp.faltaCasilla);
    setFaltantes(pendientes);
    requestAnimationFrame(() =>
      resumen.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (estado === "enviando") return;
    setAviso(null);

    const nuevos = revisar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) {
      listarFaltantes(nuevos);
      return;
    }

    setFaltantes([]);
    setEstado("enviando");
    try {
      const datos: Campos = { ...v };
      datos.teamMembers = datos.teamMode === "equipo" ? serializarEquipo(filas) : "";      const r = await fetch("/api/defacc/aplicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const res = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        campo?: string;
      };

      if (!r.ok || !res.ok) {
        /* La ruta dice qué campo rechazó: se marca ahí, como si lo hubiera
           detectado el navegador. */
        if (res.error === "invalid" && res.campo) {
          const campo = res.campo;
          const mensaje =
            campo === "email"
              ? t.correoMal
              : campo === "whatsapp"
                ? t.whatsappMal
                : campo === "authorization"
                  ? tp.casillaFalta
                  : campo === "teamMembers"
                    ? t.companerosMal
                    : campo === "linkedin" && v.linkedin.trim()
                      ? t.linkedinMal
                      : campo === "projectIdea" &&
                          v.projectIdea.trim() &&
                          v.projectIdea.trim().length < IDEA_MINIMO
                        ? t.ideaCorta
                        : LIMITES[campo] && v[campo].trim().length > LIMITES[campo]
                    ? t.limite(LIMITES[campo])
                    : v[campo]?.trim()
                      ? t.enlaceMal
                      : t.faltaResponder;
          const marcados = { [campo]: mensaje };
          setErrores(marcados);
          listarFaltantes(marcados);
          setEstado("listo");
          return;
        }
        if (res.error === "rate_limited") {
          setAviso(t.limitePeticiones);
          setEstado("listo");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        if (res.error === "closed" || res.error === "not_started") {
          setAviso(t.yaCerro);
          setEstado("listo");
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        throw new Error(String(r.status));
      }

      try {
        window.localStorage.removeItem(BORRADOR);
      } catch {
        /* idem */
      }
      setEstado("enviado");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setEstado("falla");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (noIniciado) {
    return (
      <div className={TARJETA}>
        <h2 className={TITULO}>{t.noIniciadoTitulo}</h2>
        <p className="text-body-sm mt-4 text-aisc-ink">{t.noIniciadoCuerpo}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className={BOTON_LLENO} href={inicio}>
            {t.verFrentes}
          </Link>
          <a
            className={BOTON_CONTORNO}
            href={GRUPO_COMUNIDAD_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.unirmeGrupo}
          </a>
        </div>
      </div>
    );
  }

  if (cerrado) {
    return (
      <div className={TARJETA}>
        <h2 className={TITULO}>{t.cerradoTitulo}</h2>
        <p className="text-body-sm mt-4 text-aisc-ink">
          {t.cerradoCuerpo(fechaCierre(idioma))}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            className={BOTON_LLENO}
            href={GRUPO_COMUNIDAD_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.unirmeGrupo}
          </a>
          <Link className={BOTON_CONTORNO} href={inicio}>
            {t.volver}
          </Link>
        </div>
      </div>
    );
  }

  if (estado === "enviado") {
    return (
      <div className={TARJETA}>
        <h2 className={TITULO}>{t.enviadoTitulo}</h2>
        <p className="text-body-sm mt-4 text-aisc-ink">{t.enviadoCuerpo1}</p>
        <p className="text-body-sm mt-3 text-aisc-ink">{t.enviadoCuerpo2}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            className={BOTON_LLENO}
            href={GRUPO_COMUNIDAD_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.unirmeGrupo}
          </a>
          <Link className={BOTON_CONTORNO} href={inicio}>
            {t.volver}
          </Link>
        </div>
      </div>
    );
  }

  const contador = (name: string) => {
    const usado = (v[name] ?? "").length;
    const tope = LIMITES[name];
    return (
      <span
        className={`text-meta mt-1 block text-right tabular-nums ${usado > tope ? "text-aisc-coral" : "text-aisc-muted"}`}
      >
        {usado} / {tope}
      </span>
    );
  };

  const aria = (name: string) => ({
    "aria-invalid": errores[name] ? true : undefined,
    "aria-describedby": errores[name] ? `${name}-error` : undefined,
  });

  const areaProps = (name: string, rows: number) => ({
    id: name,
    name,
    rows,
    value: v[name],
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      set(name, e.target.value),
    className: `${INPUT} resize-y ${errores[name] ? INPUT_MAL : ""}`,
    ...aria(name),
  });

  const textProps = (name: string, tipo = "text") => ({
    id: name,
    name,
    type: tipo,
    maxLength: LIMITES[name],
    value: v[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      set(name, e.target.value),
    className: `${INPUT} ${errores[name] ? INPUT_MAL : ""}`,
    ...aria(name),
  });

  return (
    <form className={TARJETA} noValidate onSubmit={enviar}>
      {estado === "falla" ? (
        <div className="mb-8 rounded-[var(--radius)] border border-aisc-coral bg-aisc-coral/8 p-5">
          <p className="text-body-sm text-aisc-ink">
            {t.fallaAntes}
            <a className={ENLACE} href={`mailto:${CORREO_HACKATHON}`}>
              {CORREO_HACKATHON}
            </a>
            {t.fallaDespues}
          </p>
        </div>
      ) : null}

      {aviso ? (
        <div className="mb-8 rounded-[var(--radius)] border border-aisc-coral bg-aisc-coral/8 p-5">
          <p className="text-body-sm text-aisc-ink">{aviso}</p>
        </div>
      ) : null}

      <div aria-live="polite" ref={resumen}>
        {faltantes.length > 0 ? (
          <div className="mb-8 rounded-[var(--radius)] border border-aisc-coral bg-aisc-coral/8 p-5">
            <p className="text-body-sm font-medium text-aisc-ink">
              {t.resumenTitulo}
            </p>
            <ul className="text-body-sm mt-2 list-disc pl-5 text-aisc-ink">
              {faltantes.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* trampa para robots: si viene llena, la postulación se descarta */}
      <div
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor="website">{t.trampa}</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={v.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-9">
        <section className={SECCION}>
          <h2 className={TITULO}>{t.seccionDatos}</h2>
          <p className={NOTA}>{t.datosNota}</p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Campo opcional={t.opcional} requerido name="firstName" label={t.nombre} error={errores.firstName}>
              <input {...textProps("firstName")} autoComplete="given-name" />
            </Campo>
            <Campo opcional={t.opcional} requerido name="lastName" label={t.apellidos} error={errores.lastName}>
              <input {...textProps("lastName")} autoComplete="family-name" />
            </Campo>
            <Campo
              opcional={t.opcional}
              requerido
              name="email"
              label={t.correo}
              ayuda={t.correoAyuda}
              error={errores.email}
            >
              <input {...textProps("email", "email")} autoComplete="email" />
            </Campo>
            <Campo
              opcional={t.opcional}
              requerido
              name="whatsapp"
              label={t.whatsapp}
              ayuda={t.whatsappAyuda}
              error={errores.whatsapp}
            >
              <input
                {...textProps("whatsapp", "tel")}
                autoComplete="tel"
                placeholder="+57 300 123 4567"
              />
            </Campo>
            <Campo
              opcional={t.opcional}
              requerido
              name="documentType"
              label={t.tipoDocumento}
              error={errores.documentType}
            >
              <div className="relative">
                <select
                  id="documentType"
                  name="documentType"
                  value={v.documentType}
                  onChange={(e) => set("documentType", e.target.value)}
                  className={`${SELECT} ${errores.documentType ? INPUT_MAL : ""}`}
                  {...aria("documentType")}
                >
                  {DOCUMENTOS.map((id) => (
                    <option key={id} value={id}>
                      {t.documentos[id]}
                    </option>
                  ))}
                </select>
                <Flecha />
              </div>
            </Campo>
            <Campo
              opcional={t.opcional}
              requerido
              name="documentNumber"
              label={t.numeroDocumento}
              ayuda={t.numeroDocumentoAyuda}
              error={errores.documentNumber}
            >
              <input {...textProps("documentNumber")} autoComplete="off" />
            </Campo>
          </div>
        </section>

        <section className={SECCION}>
          <h2 className={TITULO}>{t.seccionPerfil}</h2>
          <div className="mt-6 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Campo
                opcional={t.opcional}
                requerido
                name="affiliation"
                label={t.afiliacion}
                ayuda={t.afiliacionAyuda}
                error={errores.affiliation}
              >
                <input {...textProps("affiliation")} autoComplete="organization" />
              </Campo>
              <Campo
                opcional={t.opcional}
                requerido
                name="careerRole"
                label={t.carrera}
                ayuda={t.carreraAyuda}
                error={errores.careerRole}
              >
                <input {...textProps("careerRole")} />
              </Campo>
              <Campo
                opcional={t.opcional}
                requerido
                name="linkedin"
                label={t.linkedin}
                ayuda={t.linkedinAyuda}
                error={errores.linkedin}
              >
                <input
                  {...textProps("linkedin", "url")}
                  autoComplete="url"
                  placeholder="linkedin.com/in/..."
                />
              </Campo>
              <Campo
                opcional={t.opcional}
                name="githubPortfolio"
                label={t.github}
                ayuda={t.githubAyuda}
                error={errores.githubPortfolio}
              >
                <input
                  {...textProps("githubPortfolio", "url")}
                  placeholder="https://github.com/..."
                />
              </Campo>
            </div>
            <Opciones
              name="experienceLevel"
              legend={t.nivel}
              ayuda={t.nivelAyuda}
              opciones={NIVELES.map((id) => ({ id, texto: t.niveles[id] }))}
              valor={v.experienceLevel}
              error={errores.experienceLevel}
              onChange={(id) => set("experienceLevel", id)}
            />
          </div>
        </section>

        <section className={SECCION}>
          <h2 className={TITULO}>{t.seccionEquipo}</h2>
          <div className="mt-6 flex flex-col gap-6">
            <Opciones
              name="teamMode"
              legend={t.modalidad}
              opciones={MODALIDADES.map((id) => ({
                id,
                texto: (
                  <>
                    <span className="block font-medium text-aisc-ink">
                      {t.modalidades[id].titulo}
                    </span>
                    <span className="text-meta mt-0.5 block text-aisc-muted">
                      {t.modalidades[id].detalle}
                    </span>
                  </>
                ),
              }))}
              valor={v.teamMode}
              error={errores.teamMode}
              onChange={(id) => set("teamMode", id)}
            />

            {v.teamMode === "equipo" ? (
              <Campo
                opcional={t.opcional}
                requerido
                name="teamMembers"
                label={t.companeros}
                ayuda={t.companerosAyuda}
                error={errores.teamMembers}
              >
                <div className="flex flex-col gap-3">
                  {filas.map((fila, i) => {
                    const mala =
                      Boolean(errores.teamMembers) &&
                      !filaCompleta(fila) &&
                      !(filaVacia(fila) && filas.some(filaCompleta));
                    const etiqueta = `text-meta mb-1 block text-aisc-muted ${i > 0 ? "md:sr-only" : ""}`;
                    const idNombre = i === 0 ? "teamMembers" : `teamMembers-${i}-nombre`;
                    const idCorreo = `teamMembers-${i}-correo`;
                    return (
                      <div
                        className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-3"
                        key={i}
                      >
                        <div>
                          <label className={etiqueta} htmlFor={idNombre}>
                            {t.companeroNombre} {i + 1}
                          </label>
                          <input
                            id={idNombre}
                            type="text"
                            maxLength={100}
                            autoComplete="off"
                            value={fila.nombre}
                            onChange={(e) => setFila(i, "nombre", e.target.value)}
                            className={`${INPUT} ${mala ? INPUT_MAL : ""}`}
                            aria-invalid={mala || undefined}
                            aria-describedby={errores.teamMembers ? "teamMembers-error" : undefined}
                          />
                        </div>
                        <div>
                          <label className={etiqueta} htmlFor={idCorreo}>
                            {t.companeroCorreo} {i + 1}
                          </label>
                          <input
                            id={idCorreo}
                            type="email"
                            maxLength={200}
                            autoComplete="off"
                            value={fila.correo}
                            onChange={(e) => setFila(i, "correo", e.target.value)}
                            className={`${INPUT} ${mala ? INPUT_MAL : ""}`}
                            aria-invalid={mala || undefined}
                            aria-describedby={errores.teamMembers ? "teamMembers-error" : undefined}
                          />
                        </div>
                        {filas.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => quitarFila(i)}
                            aria-label={`${t.quitarCompanero} ${i + 1}`}
                            title={t.quitarCompanero}
                            className="text-body-sm inline-flex min-h-11 items-center justify-center self-end rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 text-aisc-muted transition-colors hover:border-aisc-coral hover:text-aisc-coral focus-visible:outline-2 focus-visible:outline-offset-[1px] focus-visible:outline-aisc-forest/35"
                          >
                            <span aria-hidden="true">✕</span>
                            <span className="ml-2 md:hidden">{t.quitarCompanero}</span>
                          </button>
                        ) : (
                          <span className="hidden w-[46px] md:block" aria-hidden="true" />
                        )}
                      </div>
                    );
                  })}
                  {filas.length < MAX_COMPANEROS ? (
                    <button
                      type="button"
                      onClick={agregarFila}
                      className="text-body-sm inline-flex min-h-11 items-center self-start rounded-full border border-aisc-forest px-5 font-medium text-aisc-forest transition-colors hover:bg-aisc-forest hover:text-aisc-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aisc-forest/35"
                    >
                      {t.agregarCompanero}
                    </button>
                  ) : null}
                </div>
              </Campo>
            ) : null}

            <Opciones
              name="preferredTrack"
              legend={t.frente}
              ayuda={t.frenteAyuda}
              opciones={[
                ...tracks.map((track) => ({
                  id: track.id,
                  texto: `${track.numero}. ${track.titulo}`,
                })),
                { id: "por_definir", texto: t.porDefinir },
              ]}
              valor={v.preferredTrack}
              error={errores.preferredTrack}
              onChange={(id) => set("preferredTrack", id)}
            />

            <Campo
              opcional={t.opcional}
              requerido
              name="projectIdea"
              label={t.idea}
              ayuda={t.ideaAyuda}
              error={errores.projectIdea}
            >
              <textarea {...areaProps("projectIdea", 4)} />
              {contador("projectIdea")}
            </Campo>
          </div>
        </section>

        <section className={SECCION}>
          <h2 className={TITULO}>{t.seccionLogistica}</h2>
          <p className={NOTA}>{t.logisticaNota}</p>
          <div className="mt-6">
            <Campo
              opcional={t.opcional}
              name="dietaryRestrictions"
              label={t.dieta}
              ayuda={t.dietaAyuda}
              error={errores.dietaryRestrictions}
            >
              <textarea {...areaProps("dietaryRestrictions", 3)} />
              {contador("dietaryRestrictions")}
            </Campo>
          </div>
        </section>

        <section className={SECCION}>
          <h2 className={TITULO}>{t.seccionAntes}</h2>
          <label className={`${CASILLA} mt-6`} htmlFor="availability">
            <input
              id="availability"
              name="availability"
              type="checkbox"
              checked={v.availability === "si"}
              onChange={(e) => set("availability", e.target.checked ? "si" : "")}
              className="mt-0.5 accent-aisc-forest"
              {...aria("availability")}
            />
            <span>
              {t.disponibilidad}
              <span className="text-aisc-coral"> *</span>
            </span>
          </label>
          {errores.availability ? (
            <span className={ERROR} id="availability-error" role="alert">
              {errores.availability}
            </span>
          ) : null}
          <p className="text-meta mt-4 text-aisc-muted">
            {t.privacidadAntes}
            <a className={ENLACE} href={`mailto:${CORREO_HACKATHON}`}>
              {CORREO_HACKATHON}
            </a>
            {t.privacidadDespues}
          </p>
          <label className={`${CASILLA} mt-4`} htmlFor="authorization">
            <input
              id="authorization"
              name="authorization"
              type="checkbox"
              checked={v.authorization === "si"}
              onChange={(e) => set("authorization", e.target.checked ? "si" : "")}
              className="mt-0.5 accent-aisc-forest"
              {...aria("authorization")}
            />
            <span>
              {tp.casilla}
              <a
                className={ENLACE}
                href={RUTA_POLITICA[idioma]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tp.casillaEnlace}
              </a>
              .
            </span>
          </label>
          {errores.authorization ? (
            <span className={ERROR} id="authorization-error" role="alert">
              {errores.authorization}
            </span>
          ) : null}
        </section>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-aisc-line pt-8">
        <button
          className="text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-7 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={estado === "enviando"}
          type="submit"
        >
          {estado === "enviando" ? t.enviando : t.enviar}
        </button>
        <span className="text-meta text-aisc-muted">{t.guardado}</span>
      </div>
    </form>
  );
}
