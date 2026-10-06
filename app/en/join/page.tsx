import type { Metadata } from "next";
import UnetePagina, { type PasoUnete, type TextosUnete } from "@/components/unete-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Join us",
  description:
    "Three steps into AI safety with AI Safety Colombia: explore the community, learn in the Seminar on the Future and Risks of AI or the Technical AI Safety Seminar, and do research at the hackathons. Each with its time commitment, requirements and cost.",
  alternates: { canonical: "/en/join", languages: alternativas("/en/join") },
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
    titulo: "Explore",
    opciones: [
      {
        titulo: "The WhatsApp group",
        linea: "Announcements, questions and calls",
        condiciones: "Free, no requirements",
        imagen: "/aisc/patterns/aisc-hero-quienes-somos.svg",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Reading group: AI Control",
        linea: "Every other Friday, 6:30 pm Colombia time, online",
        condiciones: "Free, no requirements",
        imagen: "/aisc/patterns/aisc-hero-recursos.svg",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        externo: true,
      },
      {
        titulo: "Talks and workshops",
        linea: "One or two hours, in Bogotá",
        condiciones: "Free, with registration on Luma",
        imagen: "/aisc/patterns/aisc-hero-eventos.svg",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    titulo: "Learn",
    opciones: [
      {
        titulo: "Seminar on the Future and Risks of AI",
        linea: "Five weeks, at Los Andes or online",
        condiciones: "No technical background needed. Free, with a certificate",
        imagen: "/aisc/patterns/aisc-hero-seminario-futuro.svg",
        href: "/en/seminars/future-and-risks",
        externo: false,
      },
      {
        titulo: "Technical AI Safety Seminar",
        linea: "Six weeks, in Bogotá or online",
        condiciones: "Requires the basics of how models are trained. Free, with a certificate",
        imagen: "/aisc/patterns/aisc-hero-seminario-tecnico.svg",
        href: "/en/seminars/technical",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    titulo: "Research",
    opciones: [
      {
        titulo: "Research hackathons",
        linea: "A weekend at the Bogotá hub",
        condiciones: "With prior selection. Free",
        imagen: "/aisc/patterns/aisc-hero-hackathon.svg",
        href: "/en/sprint",
        externo: false,
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Join us",
  intro: "There are three ways in, depending on the time you have. Start with the one closest to you: nobody arrives knowing.",
  aviso: "Seminar applications open until Friday 9 October",
  kickerAbierto: "Applications open until 9 October",
  cta: {
    kicker: "Not sure where to start?",
    title: "Talk to us",
    body: "Book a short call with Jose Gelves, director of AI Safety Colombia, and pick together the step that fits you.",
    primario: "Book a call",
    secundario: "Join the WhatsApp group",
  },
};

export default function Unete() {
  return <UnetePagina active="/en/join" pasos={PASOS} t={TEXTOS} />;
}
