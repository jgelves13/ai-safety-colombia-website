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
   investigar en un hackathon. Cada opción trae un párrafo, sus datos y un
   botón; los seminarios suman sus temas, que salen de su propia página. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    titulo: "Explore",
    entrada: "To get to know the field and the people, at your own pace.",
    patron: "charlas",
    opciones: [
      {
        titulo: "The WhatsApp group",
        cuerpo: "Where the topic is discussed and questions get answered, and where sessions, events and calls are announced first.",
        datos: "Free, no requirements.",
        cta: "Join the group",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Reading group: AI Control",
        cuerpo: "A reading every two weeks on how to oversee an AI system that acts on its own. You can come just to listen.",
        datos: "Every other Friday at 6:30 pm Colombia time, online, one hour. Free, no requirements.",
        cta: "Join the reading group",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        externo: true,
      },
      {
        titulo: "Talks and workshops",
        cuerpo: "You hear first-hand from someone working on the problem and meet the people in the community.",
        datos: "One or two hours per event, with registration on Luma. Free.",
        cta: "See upcoming events",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    titulo: "Learn",
    entrada: "Cohort-based seminars with a facilitator, using BlueDot Impact's materials.",
    patron: "seminarios",
    opciones: [
      {
        titulo: "Seminar on the Future and Risks of AI",
        cuerpo: "Why there is a race to AGI, what the risks are and what defences exist. The starting point whatever field you come from.",
        datos: "Five weeks, 3 hours a week, at Los Andes or online. No technical background needed. Free, with a certificate.",
        cta: "See the seminar",
        href: "/en/seminars/future-and-risks",
        externo: false,
        curso: "agi-strategy",
      },
      {
        titulo: "Technical AI Safety Seminar",
        cuerpo: "How safer models are trained and evaluated, mechanistic interpretability and AI control. For people who want the technical side.",
        datos: "Six weeks, 3 hours a week, in Bogotá or online. You should know the basics of how models are trained. Free, with a certificate.",
        cta: "See the seminar",
        href: "/en/seminars/technical",
        externo: false,
        curso: "technical-ai-safety",
      },
    ],
  },
  {
    id: "investiga",
    titulo: "Research",
    entrada: "To leave with your own work that you can show.",
    patron: "sprints",
    opciones: [
      {
        titulo: "Research hackathons",
        cuerpo: "The in-person Bogotá hub for Apart Research's hackathons. Teams leave with published work and feedback from judges.",
        datos: "A full weekend, Friday to Sunday, at the Bogotá hub, with prior selection. Free.",
        cta: "See the latest sprint",
        href: "/en/sprint",
        externo: false,
        secundario: { texto: "See the award-winning projects", href: "/en/research#hackathons" },
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Join us",
  intro: "There are three ways in, depending on the time you have. Start with the one closest to you: nobody arrives knowing.",
  aviso: "Seminar applications open until Friday 9 October",
  temas: "What you cover, week by week:",
  aplicar: {
    titulo: "Apply to the seminars",
    linea: "One application for both. Closes Friday 9 October at 11:59 pm Colombia time.",
  },
  cta: {
    kicker: "Not sure where to start?",
    title: "Talk to us",
    body: "Book a short call with Jose Gelves, director of AI Safety Colombia, and pick together the step that fits you.",
    primario: "Book a call",
    secundario: "Join the WhatsApp group",
  },
};

export default function Unete() {
  return <UnetePagina active="/en/join" idioma="en" pasos={PASOS} t={TEXTOS} />;
}
