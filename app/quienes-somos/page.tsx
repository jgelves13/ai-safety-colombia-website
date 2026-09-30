import type { Metadata } from "next";
import Link from "next/link";
import QuienesSomosPagina, { type GrupoPersonas, type TextosQuienesSomos } from "@/components/quienes-somos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "¿Quiénes somos?",
  description:
    "Comunidad en Colombia que trabaja para reducir los riesgos de la inteligencia artificial avanzada: formamos a quienes quieren entrar al campo, apoyamos investigación y organizamos eventos abiertos.",
  alternates: { canonical: "/quienes-somos", languages: alternativas("/quienes-somos") },
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
    AI Safety Colombia es una comunidad, creada en 2024, que trabaja para reducir los riesgos de la inteligencia artificial
    avanzada. Formamos a quienes quieren entrar al campo, apoyamos investigación y organizamos eventos abiertos.
  </>,
  <>
    La comunidad reúne a estudiantes, investigadores, ingenieros y profesionales de política pública. Se participa a través
    del grupo de lectura, los seminarios, las charlas y los hackathones de investigación:{" "}
    <Link className={ENLACE} href="/unete">
      así se entra
    </Link>
    .
  </>,
  <>
    Trabajamos con <Ext href="https://apartresearch.com">Apart Research</Ext> y{" "}
    <Ext href="https://bluedot.org">BlueDot Impact</Ext>, con apoyo de <Ext href="https://kairos-project.org">Kairos</Ext> y{" "}
    <Ext href="https://www.coefficientgiving.org">Coefficient Giving</Ext>.
  </>,
];

/* Tres grupos: quienes dirigen, quienes facilitan los seminarios y el grupo
   de lectura, y quienes ayudan con la operación. Cada bio abre con un cargo
   y la afirmación que la carga va enlazada. */
const GRUPOS: GrupoPersonas[] = [
  {
    id: "equipo",
    titulo: "El equipo",
    personas: [
      {
        nombre: "Jose Gelves",
        rol: "Cofundador y director",
        foto: "/aisc/equipo/jose-gelves.png",
        linkedin: "https://www.linkedin.com/in/josegelves/",
        bio: (
          <>
            Consultor de transformación digital de la <Ext href="https://uniandes.edu.co/">Universidad de los Andes</Ext> para el{" "}
            <Ext href="https://www.mintic.gov.co/">MinTIC</Ext>. Pathfinder fellow de{" "}
            <Ext href="https://kairos-project.org">Kairos</Ext> y embajador de{" "}
            <Ext href="https://apartresearch.com">Apart Research</Ext>.
          </>
        ),
      },
      {
        nombre: "Fernando Avalos",
        rol: "Cofundador (en memoria)",
        foto: "/aisc/equipo/fernando-avalos.png",
        linkedin: "https://www.linkedin.com/in/fernando-avalos-lopez/",
        bio: (
          <>
            Fue investigador en <Ext href="https://apartresearch.com">Apart Research</Ext> e ingeniero de investigación y
            analista de riesgos en el <Ext href="https://www.orcg.info/">Observatorio de Riesgos Catastróficos Globales</Ext>.
          </>
        ),
      },
    ],
  },
  {
    id: "facilitadores",
    titulo: "Facilitadores",
    personas: [
      {
        nombre: "Camila Beltrán",
        rol: "Grupo de lectura de AI Control",
        foto: "/aisc/mentores/camila-beltran.png",
        linkedin: "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
        bio: (
          <>
            Consultora en gobernanza de IA para varias organizaciones. Miembro del{" "}
            <Ext href="https://oecd.ai/en/about/network-of-experts">grupo de expertos de la OCDE</Ext> e investigadora
            asociada del <Ext href="https://aiforgood.itu.int/multimedia-authenticity/">AMAS Young Research Programme</Ext>{" "}
            de la UIT.
          </>
        ),
      },
      {
        nombre: "Tomás Antolinez",
        foto: "/aisc/equipo/tomas-antolinez.png",
        rol: (
          <Link className={ENLACE} href="/seminarios/futuro-y-riesgos">
            Seminario de futuro y riesgos de la IA
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/tomas-antolinez-543719193",
        bio: (
          <>
            Estudiante de Ciencia Política y Derecho en la Universidad de los Andes. Fue{" "}
            <Ext href="https://www.uniandes.edu.co/es/noticias/desarrollo-regional/representacion-uniandina-en-foro-de-jovenes-de-las-americas">
              delegado juvenil a la IX Cumbre de las Américas
            </Ext>
            .
          </>
        ),
      },
      {
        nombre: "Helen Stefany Penagos",
        foto: "/aisc/equipo/helen-penagos.png",
        rol: (
          <Link className={ENLACE} href="/seminarios/tecnico">
            Seminario técnico de seguridad de la IA
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/helen-stefany-penagos/",
        bio: (
          <>
            Consultora asociada en Mastercard y estudiante de Ciencia de Datos en la{" "}
            <Ext href="https://www.uexternado.edu.co/">Universidad Externado de Colombia</Ext>. Mención de honor en el
            hackathon del Sur Global de Apart Research con{" "}
            <Ext href="https://apartresearch.com/project/por-qu-los-agentes-obedecen-la-direccin-de-rechazo-se-debilita-en-formato-agntico-ux70">
              «¿Por qué los agentes obedecen?»
            </Ext>
            .
          </>
        ),
      },
      {
        nombre: "Andrés Mosquera",
        foto: "/aisc/equipo/andres-mosquera.png",
        rol: (
          <Link className={ENLACE} href="/seminarios/tecnico">
            Seminario técnico de seguridad de la IA
          </Link>
        ),
        linkedin: "https://www.linkedin.com/in/andresmosqueraw/",
        bio: (
          <>
            Investigador en interpretabilidad de IA en la <Ext href="https://uniandes.edu.co/">Universidad de los Andes</Ext>,
            donde cursa la maestría en Computación. Premio de Latinoamérica del hackathon del Sur Global de Apart Research
            con{" "}
            <Ext href="https://apartresearch.com/project/thought-anchors-for-social-bias-which-reasoning-steps-matter-in-extended-thinking-llms-on-latin-american-scenarios-27ti">
              «Qué pasos del razonamiento producen el sesgo»
            </Ext>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "voluntarios",
    titulo: "Voluntarios",
    personas: [
      {
        nombre: "Sofía Botia",
        rol: "Voluntaria",
        foto: "/aisc/equipo/sofia-botia.png",
        linkedin: "https://www.linkedin.com/in/karen-sof%C3%ADa-botia-vizcaya-2898b334b/",
        bio: (
          <>
            Estudiante de Derecho en la <Ext href="https://uniandes.edu.co/">Universidad de los Andes</Ext>. Asistente de investigación en{" "}
            <Ext href="https://www.psu.edu/">Penn State</Ext> y monitora de investigación en{" "}
            <Ext href="https://www.hbs.edu/">Harvard Business School</Ext>.
          </>
        ),
      },
      {
        nombre: "Leonardo Párraga",
        rol: "Voluntario",
        foto: "/aisc/equipo/leonardo-parraga.png",
        linkedin: "https://www.linkedin.com/in/leonardoparraga/",
        bio: (
          <>
            Cofundador y codirector de la Coalición Colombiana de Juventudes, Paz y Seguridad. Magíster en política
            educativa internacional de la <Ext href="https://www.gse.harvard.edu/">Harvard Graduate School of Education</Ext>.
          </>
        ),
      },
      {
        nombre: "Manuel Cabrera",
        rol: "Voluntario",
        foto: "/aisc/equipo/manuel-cabrera.png",
        linkedin: "https://www.linkedin.com/in/manueloff14/",
        bio: (
          <>
            Trabajó recientemente como programador full stack en{" "}
            <Ext href="https://www.linkedin.com/company/aeuniandes">Altruismo Eficaz Uniandes</Ext>. Recién egresado del
            bachillerato.
          </>
        ),
      },
    ],
  },
];

const TEXTOS: TextosQuienesSomos = {
  kicker: "Desde 2024",
  h1: "¿Quiénes somos?",
  intro: "Una comunidad en Colombia que trabaja para reducir los riesgos de la inteligencia artificial avanzada.",
  sobreTitulo: "Sobre nosotros",
  linkedin: "en LinkedIn",
  cta: {
    title: "¿Quieres ser voluntario?",
    body: "No hay membresía ni convocatoria: se llega a un evento, a un programa o a una conversación.",
    primario: "Hablar 20 minutos",
    secundario: "Entrar al grupo",
  },
};

export default function QuienesSomos() {
  return <QuienesSomosPagina active="/quienes-somos" sobre={SOBRE} grupos={GRUPOS} t={TEXTOS} />;
}
