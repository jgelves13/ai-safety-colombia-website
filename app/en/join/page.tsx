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
        cuerpo: "Where you ask what you don't understand and discuss what just came out. It's also where sessions, events and calls are announced first.",
        dedicacion: "As much as you like",
        requisitos: "None",
        costo: "Free",
        href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
        cta: "Join the group",
        externo: true,
      },
      {
        titulo: "Reading group: AI Control",
        cuerpo: "We discuss a reading on how to oversee an AI system that acts on its own. You can come just to listen or bring a reading and present it.",
        dedicacion: "Every two weeks, Fridays at 6:30 pm Colombia time, online: one hour plus the reading",
        requisitos: "None; any level of background is welcome",
        costo: "Free",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        cta: "Join the reading group",
        externo: true,
      },
      {
        titulo: "Talks and workshops",
        cuerpo: "You hear first-hand from someone working on the problem and ask them anything in person. It's where people in the community meet.",
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
    entrada: "Cohort-based seminars with a facilitator, using BlueDot Impact's materials. Applications are open until Friday 9 October at 11:59 pm, Colombia time.",
    opciones: [
      {
        titulo: "Seminar on the Future and Risks of AI",
        cuerpo: "Why there is a race to AGI, what drives progress, what the risks are and what defences exist. The starting point whatever field you come from.",
        dedicacion: "Five weeks from the week of 12 October, about 3 hours a week; in-person sessions at Universidad de los Andes and online",
        requisitos: "Apply; no technical background needed",
        costo: "Free, with an AI Safety Colombia certificate",
        href: "/en/seminars/future-and-risks",
        cta: "See the seminar",
        externo: false,
      },
      {
        titulo: "Technical AI Safety Seminar",
        cuerpo: "How safer models are trained, how they are evaluated, mechanistic interpretability and AI control. For people who already know why the problem matters and want to get into the technical side.",
        dedicacion: "Six weeks from the week of 12 October, about 3 hours a week; in-person sessions in Bogotá and online",
        requisitos: "Apply; understand the basics of how models are trained. If not, start with the Seminar on the Future and Risks of AI",
        costo: "Free, with an AI Safety Colombia certificate",
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
        cuerpo: "We host the in-person Bogotá hub for Apart Research's hackathons. Teams leave with published work and written feedback from outside judges. The next one is announced in the WhatsApp group.",
        dedicacion: "A full weekend, Friday to Sunday",
        requisitos: "Apply for the Bogotá hub, where there is a selection",
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
  intro: "Three steps, depending on how much time you want to put in. Each option says what it takes, what you need and what it costs.",
  aviso: "Seminar applications open until Friday 9 October",
  kickerAbierto: "Seminar · Applications open until 9 October",
  kickerCerrado: "Seminar",
  dedicacion: "Time",
  requisitos: "Requirements",
  costo: "Cost",
  cta: {
    kicker: "Not sure where to start?",
    title: "Talk to us",
    body: "Book a short call with Jose Gelves, co-founder and director of AI Safety Colombia. Together you'll pick the step that fits what you already know and the time you have.",
    primario: "Book a call",
    secundario: "Join the WhatsApp group",
  },
};

export default function Unete() {
  return <UnetePagina active="/en/join" pasos={PASOS} t={TEXTOS} />;
}
