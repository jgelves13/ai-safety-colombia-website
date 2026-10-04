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

/* La escalera: explorar sin compromiso, aprender en un curso con cohorte e
   investigar en un hackathon. Cada opción dice lo mismo en el mismo orden,
   dedicación, requisitos y costo, para que se puedan comparar de un vistazo. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    numero: "01",
    titulo: "Explore",
    entrada: "To get to know the field and the people, with no commitment.",
    opciones: [
      {
        titulo: "The WhatsApp group",
        cuerpo: "Where you ask what you don't understand and where sessions, events and calls are announced first.",
        dedicacion: "As much as you like",
        requisitos: "None",
        costo: "Free",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        cta: "Join the group",
        externo: true,
      },
      {
        titulo: "Reading group: AI Control",
        cuerpo: "A reading every two weeks on how to oversee an AI system that acts on its own. You can come just to listen.",
        dedicacion: "Fridays at 6:30 pm Colombia time, online, one hour",
        requisitos: "None",
        costo: "Free",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        cta: "Join the reading group",
        externo: true,
      },
      {
        titulo: "Talks and workshops",
        cuerpo: "You hear first-hand from someone working on the problem and meet the people in the community.",
        dedicacion: "One or two hours per event",
        requisitos: "Register on Luma",
        costo: "Free",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        cta: "See upcoming events",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    numero: "02",
    titulo: "Learn",
    entrada: "Cohort-based seminars with a facilitator, using BlueDot Impact's materials.",
    opciones: [
      {
        titulo: "Seminar on the Future and Risks of AI",
        cuerpo: "Why there is a race to AGI, what the risks are and what defences exist. The starting point whatever field you come from.",
        dedicacion: "Five weeks from 12 October, 3 hours a week, at Los Andes or online",
        requisitos: "Apply; no technical background needed",
        costo: "Free, with a certificate",
        href: "/en/seminars/future-and-risks",
        cta: "See the seminar",
        externo: false,
      },
      {
        titulo: "Technical AI Safety Seminar",
        cuerpo: "How safer models are trained and evaluated, mechanistic interpretability and AI control. For people who want the technical side.",
        dedicacion: "Six weeks from 12 October, 3 hours a week, in Bogotá or online",
        requisitos: "Apply; know the basics of how models are trained",
        costo: "Free, with a certificate",
        href: "/en/seminars/technical",
        cta: "See the seminar",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    numero: "03",
    titulo: "Research",
    entrada: "To leave with your own work that you can show.",
    opciones: [
      {
        titulo: "Research hackathons",
        cuerpo: "The in-person Bogotá hub for Apart Research's hackathons. Teams leave with published work and feedback from judges.",
        dedicacion: "A full weekend, Friday to Sunday",
        requisitos: "Apply to the Bogotá hub; there is a selection",
        costo: "Free",
        href: "/en/sprint",
        cta: "See the latest sprint",
        externo: false,
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Join us",
  intro: "There are three ways in, depending on the time you have. Start with the one closest to you: nobody arrives knowing.",
  aviso: "Seminar applications open until Friday 9 October",
  kickerAbierto: "Seminar · Applications open until 9 October",
  kickerCerrado: "Seminar",
  dedicacion: "Time",
  requisitos: "Requirements",
  costo: "Cost",
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
