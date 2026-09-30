import type { Metadata } from "next";
import Link from "next/link";
import QuienesSomosPagina, { type GrupoPersonas, type TextosQuienesSomos } from "@/components/quienes-somos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "About us",
  description:
    "A community in Colombia working to reduce the risks of advanced artificial intelligence: we train people who want to enter the field, support research and run open events.",
  alternates: { canonical: "/en/about", languages: alternativas("/en/about") },
};

const ENLACE = "text-aisc-forest transition-colors hover:text-aisc-coral";

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className={ENLACE} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const SOBRE = [
  <>
    AI Safety Colombia is a community, founded in 2024, working to reduce the risks of advanced artificial intelligence. We
    train people who want to enter the field, support research and run open events.
  </>,
  <>
    The community brings together students, researchers, engineers and policy professionals. People take part through the
    reading group, the seminars, the talks and the research hackathons:{" "}
    <Link className={ENLACE} href="/en/join">
      here is how to join
    </Link>
    .
  </>,
  <>
    We work with <Ext href="https://apartresearch.com">Apart Research</Ext> and{" "}
    <Ext href="https://bluedot.org">BlueDot Impact</Ext>, with support from <Ext href="https://kairos-project.org">Kairos</Ext>{" "}
    and <Ext href="https://www.coefficientgiving.org">Coefficient Giving</Ext>.
  </>,
];

/* Tres grupos: quienes dirigen, quienes facilitan los seminarios y el grupo
   de lectura, y quienes ayudan con la operación. Cada bio abre con un cargo
   y la afirmación que la carga va enlazada. */
const GRUPOS: GrupoPersonas[] = [
  {
    id: "team",
    titulo: "The team",
    entrada:
      "The people who run the community.",
    personas: [
      {
        nombre: "Jose Gelves",
        rol: "Co-founder and director",
        foto: "/aisc/equipo/jose-gelves.png",
        linkedin: "https://www.linkedin.com/in/josegelves/",
        bio: (
          <>
            Digital transformation consultant at <Ext href="https://uniandes.edu.co/">Universidad de los Andes</Ext> for{" "}
            <Ext href="https://www.mintic.gov.co/">MinTIC</Ext>, Colombia&rsquo;s ICT ministry. Pathfinder fellow at{" "}
            <Ext href="https://kairos-project.org">Kairos</Ext> and ambassador for{" "}
            <Ext href="https://apartresearch.com">Apart Research</Ext>.
          </>
        ),
      },
      {
        nombre: "Fernando Avalos",
        rol: "Co-founder (in memoriam)",
        foto: "/aisc/equipo/fernando-avalos.png",
        linkedin: "https://www.linkedin.com/in/fernando-avalos-lopez/",
        bio: (
          <>
            He was a researcher at <Ext href="https://apartresearch.com">Apart Research</Ext> and a research engineer and risk
            analyst at the <Ext href="https://www.orcg.info/">Observatory of Global Catastrophic Risks</Ext>.
          </>
        ),
      },
    ],
  },
  {
    id: "facilitators",
    titulo: "Facilitators",
    entrada: "The people who run the seminars and the reading group.",
    personas: [
      {
        nombre: "Camila Beltrán",
        rol: "AI Control reading group",
        foto: "/aisc/mentores/camila-beltran.png",
        linkedin: "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
        bio: (
          <>
            AI governance consultant for several organisations. Member of the{" "}
            <Ext href="https://oecd.ai/en/about/network-of-experts">OECD</Ext> expert group and associate researcher with the
            ITU&rsquo;s <Ext href="https://aiforgood.itu.int/multimedia-authenticity/">AMAS Young Research Programme</Ext>.
          </>
        ),
      },
      {
        nombre: "Tomás Antolinez",
        foto: "/aisc/equipo/tomas-antolinez.png",
        rol: (
          <Link className={ENLACE} href="/en/seminars/future-and-risks">
            Seminar on the Future and Risks of AI
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/tomas-antolinez-543719193",
        bio: (
          <>
            Political Science and Law student at Universidad de los Andes. Former{" "}
            <Ext href="https://www.uniandes.edu.co/es/noticias/desarrollo-regional/representacion-uniandina-en-foro-de-jovenes-de-las-americas">
              youth delegate to the IX Summit of the Americas
            </Ext>
            .
          </>
        ),
      },
      {
        nombre: "Helen Stefany Penagos",
        foto: "/aisc/equipo/helen-penagos.png",
        rol: (
          <Link className={ENLACE} href="/en/seminars/technical">
            Technical AI Safety Seminar
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/helen-stefany-penagos/",
        bio: (
          <>
            Works at Mastercard. Honourable mention at Apart Research's Global South hackathon for{" "}
            <Ext href="https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70">
              "Why do agents obey?"
            </Ext>
            .
          </>
        ),
      },
      {
        nombre: "Andrés Mosquera",
        foto: "/aisc/equipo/andres-mosquera.png",
        rol: (
          <Link className={ENLACE} href="/en/seminars/technical">
            Technical AI Safety Seminar
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/andresmosqueraw/",
        bio: (
          <>
            Student at Universidad de los Andes. Latin America prize at Apart Research's Global South hackathon for{" "}
            <Ext href="https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti">
              "Which reasoning steps produce the bias"
            </Ext>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "volunteers",
    titulo: "Volunteers",
    entrada: "The people who help keep things running.",
    personas: [
      {
        nombre: "Sofía Botia",
        rol: "Volunteer",
        foto: "/aisc/equipo/sofia-botia.png",
        linkedin: "https://www.linkedin.com/in/karen-sof%C3%ADa-botia-vizcaya-2898b334b/",
        bio: (
          <>
            Law student at <Ext href="https://uniandes.edu.co/">Universidad de los Andes</Ext>. Research assistant at <Ext href="https://www.psu.edu/">Penn State</Ext>{" "}
            and research monitor at <Ext href="https://www.hbs.edu/">Harvard Business School</Ext>.
          </>
        ),
      },
      {
        nombre: "Leonardo Párraga",
        rol: "Volunteer",
        foto: "/aisc/equipo/leonardo-parraga.png",
        linkedin: "https://www.linkedin.com/in/leonardoparraga/",
        bio: (
          <>
            Co-founder and co-director of the Colombian Coalition on Youth, Peace and Security. Master&rsquo;s in
            international education policy from the <Ext href="https://www.gse.harvard.edu/">Harvard Graduate School of Education</Ext>.
          </>
        ),
      },
      {
        nombre: "Manuel Cabrera",
        rol: "Volunteer",
        foto: "/aisc/equipo/manuel-cabrera.png",
        linkedin: "https://www.linkedin.com/in/manueloff14/",
        bio: (
          <>
            Recently worked as a full stack developer at{" "}
            <Ext href="https://www.linkedin.com/company/aeuniandes">Effective Altruism Uniandes</Ext>. He has just finished
            secondary school.
          </>
        ),
      },
    ],
  },
];

const TEXTOS: TextosQuienesSomos = {
  kicker: "Since 2024",
  h1: "About us",
  intro: "A community in Colombia working to reduce the risks of advanced artificial intelligence.",
  sobreTitulo: "About us",
  linkedin: "on LinkedIn",
  cta: {
    title: "Want to volunteer?",
    body: "There is no membership and no open call: you turn up at an event, a programme or a conversation.",
    primario: "Talk for 20 minutes",
    secundario: "Join the group",
  },
};

export default function About() {
  return <QuienesSomosPagina active="/en/about" idioma="en" sobre={SOBRE} grupos={GRUPOS} t={TEXTOS} />;
}
