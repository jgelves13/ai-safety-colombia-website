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

/* La escalera: explorar sin compromiso, aprender en un seminario con cohorte e
   investigar en un hackathon. Cada opción trae un párrafo, sus datos y un
   botón; los seminarios suman sus temas, que salen de su propia página. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    titulo: "Explora",
    entrada: "Para conocer el campo y a la gente, a tu ritmo.",
    patron: "charlas",
    opciones: [
      {
        titulo: "El grupo de WhatsApp",
        cuerpo: "Donde se discute el tema y se resuelven dudas, y donde se anuncian primero las sesiones, los eventos y las convocatorias.",
        datos: "Gratis y sin requisitos.",
        cta: "Entrar al grupo",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Grupo de lectura: AI Control",
        cuerpo: "Una lectura cada quince días sobre cómo se supervisa a un sistema de IA que actúa por su cuenta. Puedes venir solo a escuchar.",
        datos: "Un viernes de por medio, a las 6:30 p. m., en línea, una hora. Gratis y sin requisitos.",
        cta: "Entrar al grupo de lectura",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Charlas y talleres",
        cuerpo: "Oyes de primera mano a alguien que trabaja en el tema y conoces a la gente de la comunidad.",
        datos: "Una o dos horas por evento, con inscripción en Luma. Gratis.",
        cta: "Ver los próximos",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    titulo: "Aprende",
    entrada: "Seminarios con cohorte y facilitador, con los materiales de BlueDot Impact.",
    patron: "seminarios",
    opciones: [
      {
        titulo: "Seminario de futuro y riesgos de la IA",
        cuerpo: "Por qué se corre hacia la AGI, cuáles son los riesgos y qué defensas existen. El punto de partida desde cualquier campo.",
        datos: "Cinco semanas, 3 horas por semana, en los Andes o en línea. Sin formación técnica. Gratis, con certificado.",
        cta: "Ver el seminario",
        href: "/seminarios/futuro-y-riesgos",
        externo: false,
        curso: "agi-strategy",
      },
      {
        titulo: "Seminario técnico de seguridad de la IA",
        cuerpo: "Cómo se entrenan y evalúan modelos más seguros, interpretabilidad mecanicista y AI control. Para quien quiere entrar a la parte técnica.",
        datos: "Seis semanas, 3 horas por semana, en Bogotá o en línea. Pide saber lo básico de cómo se entrenan los modelos. Gratis, con certificado.",
        cta: "Ver el seminario",
        href: "/seminarios/tecnico",
        externo: false,
        curso: "technical-ai-safety",
      },
    ],
  },
  {
    id: "investiga",
    titulo: "Investiga",
    entrada: "Para salir con un trabajo propio que puedas mostrar.",
    patron: "sprints",
    opciones: [
      {
        titulo: "Hackathones de investigación",
        cuerpo: "El hub presencial en Bogotá de los hackathones de Apart Research. Los equipos salen con un trabajo publicado y retroalimentación de jurados.",
        datos: "Un fin de semana, de viernes a domingo, en el hub de Bogotá, con selección previa. Gratis.",
        cta: "Ver el último sprint",
        href: "/sprint",
        externo: false,
        secundario: { texto: "Ver los proyectos premiados", href: "/investigacion#hackathons" },
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Únete",
  intro: "Hay tres formas de entrar, según el tiempo que tengas. Empieza por la que te quede más cerca: nadie llega sabiendo.",
  aviso: "Aplicaciones abiertas a los seminarios hasta el viernes 9 de octubre",
  temas: "Lo que se ve, semana a semana:",
  aplicar: {
    titulo: "Aplica a los seminarios",
    linea: "Una sola aplicación para los dos. Cierra el viernes 9 de octubre a las 11:59 p. m.",
  },
  cta: {
    kicker: "¿No sabes por dónde empezar?",
    title: "Habla con nosotros",
    body: "Agenda una llamada corta con Jose Gelves, director de AI Safety Colombia, y escogen juntos el paso que te sirve.",
    primario: "Agendar una llamada",
    secundario: "Entrar al grupo de WhatsApp",
  },
};

export default function Unete() {
  return <UnetePagina active="/unete" idioma="es" pasos={PASOS} t={TEXTOS} />;
}
