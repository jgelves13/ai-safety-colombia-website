import type { Metadata } from "next";
import UnetePagina, { type PasoUnete, type TextosUnete } from "@/components/unete-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Únete",
  description:
    "Tres pasos para entrar a AI safety con AI Safety Colombia: explorar la comunidad, aprender en el Seminario de futuro y riesgos de la IA o en el Seminario técnico de seguridad de la IA, e investigar en los hackathones. Cada uno con su dedicación, requisitos y costo.",
  alternates: { canonical: "/unete", languages: alternativas("/unete") },
};

/* Se renderiza en cada visita: el aviso de los cursos se apaga solo cuando
   cierran las aplicaciones, el 9 de octubre. */
export const dynamic = "force-dynamic";

/* La escalera: explorar sin compromiso, aprender en un curso con cohorte e
   investigar en un hackathon. Cada opción dice lo mismo en el mismo orden,
   dedicación, requisitos y costo, para que se puedan comparar de un vistazo. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    numero: "01",
    titulo: "Explora",
    entrada: "Para conocer el campo y a la gente sin comprometerte a nada.",
    opciones: [
      {
        titulo: "El grupo de WhatsApp",
        cuerpo: "Donde preguntas lo que no entiendes y donde se anuncian primero las sesiones, los eventos y las convocatorias.",
        dedicacion: "La que quieras",
        requisitos: "Ninguno",
        costo: "Gratis",
        href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
        cta: "Entrar al grupo",
        externo: true,
      },
      {
        titulo: "Grupo de lectura: AI Control",
        cuerpo: "Una lectura cada quince días sobre cómo se supervisa a un sistema de IA que actúa por su cuenta. Puedes venir solo a escuchar.",
        dedicacion: "Viernes a las 6:30 p. m., en línea, una hora",
        requisitos: "Ninguno",
        costo: "Gratis",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        cta: "Entrar al grupo de lectura",
        externo: true,
      },
      {
        titulo: "Charlas y talleres",
        cuerpo: "Oyes de primera mano a alguien que trabaja en el tema y conoces a la gente de la comunidad.",
        dedicacion: "Una o dos horas por evento",
        requisitos: "Inscribirte en Luma",
        costo: "Gratis",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        cta: "Ver los próximos",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    numero: "02",
    titulo: "Aprende",
    entrada: "Seminarios con cohorte y facilitador, con los materiales de BlueDot Impact.",
    opciones: [
      {
        titulo: "Seminario de futuro y riesgos de la IA",
        cuerpo: "Por qué se corre hacia la AGI, cuáles son los riesgos y qué defensas existen. El punto de partida desde cualquier campo.",
        dedicacion: "Cinco semanas desde el 12 de octubre, 3 horas por semana, en los Andes o en línea",
        requisitos: "Aplicar; sin formación técnica",
        costo: "Gratis, con certificado",
        href: "/seminarios/futuro-y-riesgos",
        cta: "Ver el seminario",
        externo: false,
      },
      {
        titulo: "Seminario técnico de seguridad de la IA",
        cuerpo: "Cómo se entrenan y evalúan modelos más seguros, interpretabilidad mecanicista y AI control. Para quien quiere entrar a la parte técnica.",
        dedicacion: "Seis semanas desde el 12 de octubre, 3 horas por semana, en Bogotá o en línea",
        requisitos: "Aplicar; saber lo básico de cómo se entrenan los modelos",
        costo: "Gratis, con certificado",
        href: "/seminarios/tecnico",
        cta: "Ver el seminario",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    numero: "03",
    titulo: "Investiga",
    entrada: "Para salir con un trabajo propio que puedas mostrar.",
    opciones: [
      {
        titulo: "Hackathones de investigación",
        cuerpo: "El hub presencial en Bogotá de los hackathones de Apart Research. Los equipos salen con un trabajo publicado y retroalimentación de jurados.",
        dedicacion: "Un fin de semana, de viernes a domingo",
        requisitos: "Aplicar al hub de Bogotá; hay selección",
        costo: "Gratis",
        href: "/sprint",
        cta: "Ver el último sprint",
        externo: false,
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Únete",
  intro: "Tres pasos, según cuánto tiempo le quieras dedicar. Cada opción dice cuánto pide, qué necesitas y cuánto cuesta.",
  aviso: "Aplicaciones abiertas a los seminarios hasta el viernes 9 de octubre",
  kickerAbierto: "Seminario · Aplicaciones abiertas hasta el 9 de octubre",
  kickerCerrado: "Seminario",
  dedicacion: "Dedicación",
  requisitos: "Requisitos",
  costo: "Costo",
  cta: {
    kicker: "¿No sabes por dónde empezar?",
    title: "Habla con nosotros",
    body: "Agenda una llamada corta con Jose Gelves, director de AI Safety Colombia, y escogen juntos el paso que te sirve.",
    primario: "Agendar una llamada",
    secundario: "Entrar al grupo de WhatsApp",
  },
};

export default function Unete() {
  return <UnetePagina active="/unete" pasos={PASOS} t={TEXTOS} />;
}
