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
   investigar en un hackathon. Cada opción es una tarjeta con su ilustración,
   una línea de cuándo y dónde, y otra de requisitos y costo. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    titulo: "Explora",
    opciones: [
      {
        titulo: "El grupo de WhatsApp",
        linea: "Anuncios, preguntas y convocatorias",
        condiciones: "Gratis y sin requisitos",
        imagen: "/aisc/patterns/aisc-hero-quienes-somos.svg",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Grupo de lectura: AI Control",
        linea: "Un viernes de por medio, 6:30 p. m., en línea",
        condiciones: "Gratis y sin requisitos",
        imagen: "/aisc/patterns/aisc-hero-recursos.svg",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        externo: true,
      },
      {
        titulo: "Charlas y talleres",
        linea: "Una o dos horas, en Bogotá",
        condiciones: "Gratis, con inscripción en Luma",
        imagen: "/aisc/patterns/aisc-hero-eventos.svg",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    titulo: "Aprende",
    opciones: [
      {
        titulo: "Seminario de futuro y riesgos de la IA",
        linea: "Cinco semanas, en los Andes o en línea",
        condiciones: "Sin formación técnica. Gratis, con certificado",
        imagen: "/aisc/patterns/aisc-hero-seminario-futuro.svg",
        href: "/seminarios/futuro-y-riesgos",
        externo: false,
      },
      {
        titulo: "Seminario técnico de seguridad de la IA",
        linea: "Seis semanas, en Bogotá o en línea",
        condiciones: "Pide lo básico de cómo se entrenan los modelos. Gratis, con certificado",
        imagen: "/aisc/patterns/aisc-hero-seminario-tecnico.svg",
        href: "/seminarios/tecnico",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    titulo: "Investiga",
    opciones: [
      {
        titulo: "Hackathones de investigación",
        linea: "Un fin de semana en el hub de Bogotá",
        condiciones: "Con selección previa. Gratis",
        imagen: "/aisc/patterns/aisc-hero-hackathon.svg",
        href: "/sprint",
        externo: false,
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Únete",
  intro: "Hay tres formas de entrar, según el tiempo que tengas. Empieza por la que te quede más cerca: nadie llega sabiendo.",
  aviso: "Aplicaciones abiertas a los seminarios hasta el viernes 9 de octubre",
  kickerAbierto: "Aplicaciones abiertas hasta el 9 de octubre",
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
