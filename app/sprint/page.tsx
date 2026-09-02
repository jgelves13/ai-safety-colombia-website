import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HeroHackathon } from "@/components/hero-hackathon";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  CTA_PATTERN_BOTTOM,
  CTA_PATTERN_TOP,
  HERO_FUGA_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { APART_FELLOWSHIP_URL, APART_SPRINT_URL, CIERRE_TEXTO } from "./datos";
import { alternativas } from "@/lib/idiomas";
import { orderSprintMentors } from "@/lib/sprint-mentor-order.mjs";

export const metadata: Metadata = {
  title: "AI Incident Response Sprint",
  description:
    "Del 11 al 13 de septiembre de 2026. Apart Research y CeSIA convocan el sprint sobre respuesta a incidentes de IA. Abrimos el hub presencial en Bogotá; las aplicaciones cierran a la medianoche del domingo 6 de septiembre.",
  alternates: { canonical: "/sprint", languages: alternativas("/sprint") },
};

const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

/* Los tres datos que alguien busca antes de leer nada más. Una cifra grande y
   una línea de apoyo, sin más: es lo que hace que se lean de un vistazo. */
const DATOS = [
  {
    valor: "11 al 13 de septiembre",
    nota: "Un fin de semana, de viernes en la tarde a domingo en la noche",
  },
  {
    valor: "Bogotá y en línea",
    nota: "Hub presencial en el Chicó, Bogotá",
  },
  {
    valor: "USD 2.000 en premios",
    nota: "Cinco ganadores a nivel global, que Apart escoge entre todo el sprint",
  },
];

/* Los cinco tracks son de Apart. La descripción resume lo que su convocatoria
   pide como entregable, no lo que a nosotros nos parece interesante. */
const TRACKS = [
  {
    id: "contencion",
    titulo: "Estándares de contención",
    body: "Escribir el mínimo con el que se debería correr una evaluación en caja de arena. Entra acá quien pueda proponer una matriz de control por fase de ataque, o empaquetar mitigaciones de forma que un tercero verifique que se cumplen.",
  },
  {
    id: "analisis",
    titulo: "Análisis del incidente",
    body: "Reconstruir qué pasó y en qué punto falló el monitoreo. Se buscan preguntas que alguien pueda resolver, revisiones que se puedan correr mañana y explicaciones causales que predigan algo.",
  },
  {
    id: "regulacion",
    titulo: "Respuesta regulatoria",
    body: "Redactar peticiones de información que un regulador pueda usar casi sin editar, poner a prueba los sistemas de reporte que ya existen y señalar los vacíos legales que dejan.",
  },
  {
    id: "comunicacion",
    titulo: "Estrategia de comunicación",
    body: "Auditar cómo cubrieron el incidente los medios y armar el kit con el que se comunica el siguiente. Acá pesa el anclaje en el registro de lo que de verdad ocurrió.",
  },
  {
    id: "abierto",
    titulo: "Track abierto",
    body: "Cualquier otro ángulo del mismo problema. La condición es la de siempre: un artefacto que alguien pueda usar y una frase honesta sobre hasta dónde llega lo que demuestra.",
  },
];

/* Los tres grupos de Bogotá que abren el hub con nosotros. La misma lista
   alimenta la tira que va debajo del hero y las tarjetas de «¿Quién está
   detrás?». */
const COORGANIZAN = [
  {
    name: "Young AI Leaders Bogotá",
    body: "Capítulo en Bogotá de la red Young AI Leaders, conectada a la plataforma AI for Good de la Unión Internacional de Telecomunicaciones. Reúne a quienes construyen e investigan IA en la región.",
    logo: "/aisc/aliados/yail-v2.png",
    clase: "max-h-[60px] max-w-[110px]",
    ancho: 292,
    alto: 240,
    href: "https://www.youngaileadershub.org/",
  },
  {
    name: "Semillero de Modelos Generativos UNAL",
    body: "Grupo de investigación estudiantil de la Universidad Nacional. Trabaja en aprendizaje profundo, modelos de difusión y procesamiento de lenguaje natural, con veintidós repositorios públicos.",
    logo: "/aisc/aliados/simg-unal.png",
    clase: "max-h-[44px] max-w-[128px]",
    ancho: 240,
    alto: 240,
    href: "https://wsimg-un.vercel.app/",
  },
  {
    name: "IEEE Computer Society Uniandes",
    body: "Capítulo estudiantil del IEEE en la Universidad de los Andes. Hace talleres técnicos, TechTalks y el congreso CONECS, y trabaja en inteligencia artificial, ciberseguridad y desarrollo de software.",
    logo: "/aisc/aliados/ieee-cs-uniandes.png",
    clase: "max-h-[44px] max-w-[128px]",
    ancho: 560,
    alto: 167,
    href: "https://www.instagram.com/csuniandes/",
  },
];

/* Quién convoca el sprint y quién pone la plata del hub. Los logos viven en
   public/aisc/aliados/. */
const GRUPOS = [
  {
    rotulo: "Organizan el sprint",
    orgs: [
      {
        name: "Apart Research",
        body: "Laboratorio de investigación en seguridad de la IA. Convoca el sprint, define los cinco frentes, pone los premios y publica los reportes.",
        logo: "/aisc/aliados/apart.png",
        href: "https://apartresearch.com",
      },
      {
        name: "CeSIA",
        body: "Centro francés para la seguridad de la IA. Coorganiza el sprint y lleva a reguladores europeos el material que sale de él.",
        logo: "/aisc/aliados/cesia.svg",
        href: "https://www.securite-ia.fr",
      },
    ],
  },
  {
    rotulo: "Coorganizan el hub en Bogotá",
    orgs: COORGANIZAN,
  },
  {
    rotulo: "Financian el hub en Bogotá",
    orgs: [
      {
        name: "Apart Research",
        body: "Además de convocar el sprint, apoya a los grupos que abren un hub presencial durante el fin de semana.",
        logo: "/aisc/aliados/apart.png",
        href: "https://apartresearch.com",
      },
      {
        name: "BlueDot Impact",
        body: "Sus cursos gratuitos son la entrada estándar al campo. Con Rapid Grants financian trabajo concreto: USD 1,4 millones otorgados en total y decisiones en solo tres días en promedio.",
        logo: "/aisc/aliados/bluedot.png",
        href: "https://bluedot.org/grants/rapid",
      },
      {
        name: "Pathfinder Fellowship",
        body: "Beca de Kairos para quienes construyen comunidades de seguridad de la IA. Aporta mentoría y financiación para sus actividades.",
        logo: "/aisc/aliados/pathfinder.png",
        href: "https://pathfinder.kairos-project.org",
      },
    ],
  },
];

/* Lo que ponemos nosotros. Cada línea es una cosa que el sitio se compromete a
   dar; lo que aún no está cerrado se dice que no está cerrado. */
const HUB = [
  {
    titulo: "Alimentación",
    body: "Cubrimos las comidas del fin de semana, para que los equipos no tengan que salir de la sala a resolverlo.",
  },
  {
    titulo: "Apoyo para cómputo",
    body: "Cubrimos parte del gasto de cómputo de los equipos. La cifra se confirma antes del cierre de aplicaciones.",
  },
  {
    titulo: "Mentoría en sala",
    body: "Gente que trabaja en respuesta a incidentes, en seguridad ofensiva y en regulación pasa por el hub durante el fin de semana.",
  },
  {
    titulo: "Sala y conectividad",
    body: "Espacio de trabajo durante todo el fin de semana, con mesas para equipos y con dónde conectarse.",
  },
  {
    titulo: "Con quién armar equipo",
    body: "El viernes en la noche se arman los equipos en la sala. Mucha gente llega sola y sale con equipo.",
  },
  {
    titulo: "Cupos limitados",
    body: "El hub tiene aforo, así que hay proceso de selección. Se aplica por el formulario y avisamos por correo.",
  },
];

/* Premios de Apart, tal como los publica su convocatoria. */
const PREMIOS = [
  { puesto: "Primer puesto", monto: "1.000" },
  { puesto: "Segundo puesto", monto: "500" },
  { puesto: "Tercer puesto", monto: "300" },
  { puesto: "Cuarto puesto", monto: "100" },
  { puesto: "Quinto puesto", monto: "100" },
];

/* Los mentores, al modo de SASH: retrato cuadrado, nombre, rol y una bio de
   dos o tres frases. Mientras no tengamos la foto de alguien se muestra la
   tarjeta con sus iniciales; el archivo va en public/aisc/mentores/. */
const MENTORES: {
  nombre: string;
  rol: string;
  modalidad: string;
  foto?: string;
  linkedin?: string;
  bio?: React.ReactNode;
}[] = [
  {
    nombre: "Diego Gómez",
    rol: "Mentor",
    foto: "/aisc/mentores/diego-gomez.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/diegoalejogm/",
    bio: (
      <>
        Ingeniero senior de ML en{" "}
        <a
          className={ENLACE}
          href="https://about.google/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google
        </a>
        , donde entrena modelos multimodales para la{" "}
        <a
          className={ENLACE}
          href="https://www.youtube.com/howyoutubeworks/our-commitments/managing-harmful-content/"
          target="_blank"
          rel="noopener noreferrer"
        >
          seguridad de YouTube
        </a>
        . En un{" "}
        <a
          className={ENLACE}
          href="https://bluedot.org/courses/technical-ai-safety-project"
          target="_blank"
          rel="noopener noreferrer"
        >
          sprint de BlueDot
        </a>
        , evaluó si los vectores de persona de Qwen2.5-7B detectan cambios de
        carácter inducidos implícitamente.
      </>
    ),
  },
  {
    nombre: "Luis Montoya",
    rol: "Mentor y ponente",
    foto: "/aisc/mentores/luis-montoya.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/luismmontoya/",
    bio: (
      <>
        Investigador de IA y becario de{" "}
        <a
          className={ENLACE}
          href="https://www.pivotal-research.org/fellowship"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pivotal Research
        </a>
        . En{" "}
        <a
          className={ENLACE}
          href="https://www.matsprogram.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MATS
        </a>
        , con{" "}
        <a
          className={ENLACE}
          href="https://www.matsprogram.org/mentor/neel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Neel Nanda
        </a>
        , estudió si un modelo reconoce que lo evalúan sin decirlo; publicó el
        trabajo en un{" "}
        <a
          className={ENLACE}
          href="https://openreview.net/forum?id=zGmgeR0f4D"
          target="_blank"
          rel="noopener noreferrer"
        >
          taller de ICML 2026
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Camila Beltrán",
    rol: "Mentora y ponente",
    foto: "/aisc/mentores/camila-beltran.png",
    modalidad: "En Bogotá",
    linkedin:
      "https://www.linkedin.com/in/camila-alejandra-beltran-reyes-ab288627a/",
    bio: (
      <>
        Consultora en gobernanza de IA para varias organizaciones. Miembro del
        grupo de expertos de la{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/about/network-of-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          OCDE
        </a>
        . Como Winter Fellow de{" "}
        <a
          className={ENLACE}
          href="https://www.governance.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GovAI
        </a>{" "}
        investigó la{" "}
        <a
          className={ENLACE}
          href="https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai"
          target="_blank"
          rel="noopener noreferrer"
        >
          regulación europea
        </a>{" "}
        de los escenarios de pérdida de control.
      </>
    ),
  },
  {
    nombre: "Liliana Fernández",
    rol: "Mentora",
    foto: "/aisc/mentores/liliana-fernandez-v2.png",
    modalidad: "En Bogotá",
    linkedin: "https://www.linkedin.com/in/lilianafernandezict4d/",
    bio: (
      <>
        Experta en gobernanza de IA, evaluadora autorizada de{" "}
        <a
          className={ENLACE}
          href="https://standards.ieee.org/products-programs/icap/ieee-certifaied/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IEEE CertifAIed
        </a>{" "}
        y miembro del{" "}
        <a
          className={ENLACE}
          href="https://oecd.ai/en/community/liliana-frenandez"
          target="_blank"
          rel="noopener noreferrer"
        >
          grupo de expertos de la OCDE
        </a>{" "}
        sobre cómputo. Asesoró ocho años la política de datos e IA del{" "}
        <a
          className={ENLACE}
          href="https://www.dnp.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          DNP
        </a>{" "}
        y fue al{" "}
        <a
          className={ENLACE}
          href="https://www.successif.org/womens-retreat"
          target="_blank"
          rel="noopener noreferrer"
        >
          retiro de Successif
        </a>{" "}
        para mujeres en seguridad de IA.
      </>
    ),
  },
  {
    nombre: "Luis Cosio",
    rol: "Mentor y ponente",
    foto: "/aisc/mentores/luis-cosio.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/luiscosio/",
    bio: (
      <>
        Miembro del equipo técnico de{" "}
        <a
          className={ENLACE}
          href="https://sl5.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Security Level 5
        </a>
        , iniciativa que protege sistemas avanzados de IA frente a adversarios
        estatales. Coautor del{" "}
        <a
          className={ENLACE}
          href="https://arxiv.org/abs/2605.08449"
          target="_blank"
          rel="noopener noreferrer"
        >
          estándar SL5
        </a>
        . También ha sido mentor en{" "}
        <a
          className={ENLACE}
          href="https://sparai.org/projects/sp26/recXdgQxof26exbLh/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SPAR
        </a>{" "}
        y{" "}
        <a
          className={ENLACE}
          href="https://www.matsprogram.org/stream/thiergart-11"
          target="_blank"
          rel="noopener noreferrer"
        >
          MATS
        </a>{" "}
        en proyectos sobre seguridad de centros de datos.
      </>
    ),
  },
  {
    nombre: "Christian Urcuqui",
    rol: "Mentor y ponente",
    foto: "/aisc/mentores/christian-urcuqui.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/christianurcuqui/",
    bio: (
      <>
        Investigador de ciberseguridad e IA en{" "}
        <a
          className={ENLACE}
          href="https://tryhackme.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TryHackMe
        </a>
        . Docente de la{" "}
        <a
          className={ENLACE}
          href="https://www.icesi.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad Icesi
        </a>{" "}
        y coautor de tres{" "}
        <a
          className={ENLACE}
          href="https://www.icesi.edu.co/editorial/ciberseguridad-datos-caos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          libros
        </a>{" "}
        de ciberseguridad. Publicó{" "}
        <a
          className={ENLACE}
          href="https://github.com/urcuqui/AgentBreak"
          target="_blank"
          rel="noopener noreferrer"
        >
          AgentBreak
        </a>
        , un laboratorio de inyección indirecta de prompts en sistemas con
        LLM.
      </>
    ),
  },
  {
    nombre: "Manuela Chacón",
    rol: "Ponente",
    foto: "/aisc/mentores/manuela-chacon.png",
    modalidad: "Remoto",
    linkedin:
      "https://www.linkedin.com/in/manuela-viviana-chac%C3%B3n-chamorro-04b0621bb/",
    bio: (
      <>
        Doctoranda en Ingeniería en la{" "}
        <a
          className={ENLACE}
          href="https://uniandes.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad de los Andes
        </a>{" "}
        y{" "}
        <a
          className={ENLACE}
          href="https://ingenieria.uniandes.edu.co/es/noticias/ganadores-becas-deepmind-cinfonia"
          target="_blank"
          rel="noopener noreferrer"
        >
          becaria de Google DeepMind
        </a>
        . Primera autora de un{" "}
        <a
          className={ENLACE}
          href="https://ieeexplore.ieee.org/document/10988739/"
          target="_blank"
          rel="noopener noreferrer"
        >
          artículo
        </a>{" "}
        de IEEE sobre resiliencia cooperativa en sistemas multiagente; en 2025
        participó en la{" "}
        <a
          className={ENLACE}
          href="https://www.cooperativeai.com/summer-school/summer-school-2025"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cooperative AI Summer School
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Leidy Aldana",
    rol: "Mentora y ponente",
    foto: "/aisc/mentores/leidy-aldana.png",
    modalidad: "En Bogotá",
    linkedin: "https://www.linkedin.com/in/l-aldana/",
    bio: (
      <>
        Investigadora de aprendizaje automático adversario en la{" "}
        <a
          className={ENLACE}
          href="https://repositorio.unal.edu.co/handle/unal/89285"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad Nacional
        </a>
        . Vulneró cuatro detectores de malware para Android con diez ataques de
        evasión y propuso un filtro que los detecta, con{" "}
        <a
          className={ENLACE}
          href="https://www.kaggle.com/datasets/l7032681/static-and-dynamic-features-adv"
          target="_blank"
          rel="noopener noreferrer"
        >
          datos
        </a>{" "}
        y{" "}
        <a
          className={ENLACE}
          href="https://github.com/leidy-m/Adversarial-ML-Android-Malware"
          target="_blank"
          rel="noopener noreferrer"
        >
          código
        </a>{" "}
        públicos.
      </>
    ),
  },
  {
    nombre: "Gerson Quintero",
    rol: "Ponente",
    foto: "/aisc/mentores/gerson-quintero.png",
    modalidad: "En Bogotá",
    linkedin:
      "https://www.linkedin.com/in/gerson-david-quintero-rodriguez-2b7b9a18/",
    bio: (
      <>
        Profesor de{" "}
        <a
          className={ENLACE}
          href="https://www.escuelaing.edu.co/es/programas/curso-gestion-de-incidentes-y-forensia-digitall/"
          target="_blank"
          rel="noopener noreferrer"
        >
          gestión de incidentes y forensia digital
        </a>{" "}
        en la{" "}
        <a
          className={ENLACE}
          href="https://www.escuelaing.edu.co/es/personal/gerson-david-quintero-rodriguez/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escuela Colombiana de Ingeniería
        </a>
        . Fue gestor de la estrategia y la arquitectura de ciberseguridad de{" "}
        <a
          className={ENLACE}
          href="https://agata.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ágata
        </a>
        , la agencia de analítica de datos de Bogotá.
      </>
    ),
  },
  {
    nombre: "Robert Gómez",
    rol: "Mentor",
    foto: "/aisc/mentores/robert-gomez.png",
    modalidad: "En Bogotá",
    linkedin: "https://www.linkedin.com/in/robert-gomez-6361571b6/",
    bio: (
      <>
        CTO de{" "}
        <a
          className={ENLACE}
          href="https://www.aimedic.com.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AIMEDIC
        </a>
        , que lleva IA generativa a clínicas y hospitales. Coautor de un estudio
        de asistentes de salud para adolescentes en la{" "}
        <a
          className={ENLACE}
          href="https://unal.edu.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad Nacional
        </a>{" "}
        e investiga vacíos tributarios en{" "}
        <a
          className={ENLACE}
          href="https://socampoq.github.io/LoopholeCheck.github.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LoopholeCheck
        </a>
        , con el{" "}
        <a
          className={ENLACE}
          href="https://www.mit.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT
        </a>
        .
      </>
    ),
  },
  {
    nombre: "Juan Cortés",
    rol: "Mentor",
    foto: "/aisc/mentores/juan-cortes.png",
    modalidad: "Remoto",
    linkedin: "https://www.linkedin.com/in/jcortesj/",
    bio: (
      <>
        Becario del{" "}
        <a
          className={ENLACE}
          href="https://velezreyesmas.com/proyectos/tech-fellowship/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tech Fellowship
        </a>{" "}
        de vélezreyes+ y desarrollador de software con paso por{" "}
        <a
          className={ENLACE}
          href="https://habi.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Habi
        </a>. Coautor, en la revista{" "}
        <a
          className={ENLACE}
          href="https://revistas.udistrital.edu.co/index.php/Tecnura/article/view/23438"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tecnura
        </a>, de un estudio sobre aprendizaje automático adversario para la
        ciberseguridad de la IA en Colombia.
      </>
    ),
  },
  {
    nombre: "María Lorena Flórez",
    rol: "Ponente",
    foto: "/aisc/mentores/maria-lorena-florez-v4.png",
    modalidad: "Remoto",
    linkedin:
      "https://www.linkedin.com/in/maria-lorena-florez-rojas/",
    bio: (
      <>
        Profesora de derecho y tecnología en{" "}
        <a
          className={ENLACE}
          href="https://www.rug.nl/staff/m.l.florez.rojas/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Groningen
        </a>, editora de gobernanza algorítmica de{" "}
        <a
          className={ENLACE}
          href="https://www.cambridge.org/core/journals/data-and-policy/information/about-this-journal/editorial-board"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data &amp; Policy
        </a>{" "}
        y experta de la{" "}
        <a
          className={ENLACE}
          href="https://www.unesco.org/en/artificial-intelligence/rule-law/network-experts"
          target="_blank"
          rel="noopener noreferrer"
        >
          UNESCO
        </a>{" "}
        en IA y estado de derecho.{" "}
        <a
          className={ENLACE}
          href="https://journals.openedition.org/revestudsoc/59583"
          target="_blank"
          rel="noopener noreferrer"
        >
          Escribió
        </a>{" "}
        sobre la algocracia en los tribunales y cómo erosiona la confianza en la
        justicia.
      </>
    ),
  },
  {
    nombre: "Roberto García Alonso",
    rol: "Ponente",
    foto: "/aisc/mentores/roberto-garcia.png",
    modalidad: "En Bogotá",
    linkedin: "https://www.linkedin.com/in/roberto-garcia-alonso/",
    bio: (
      <>
        Profesor de la{" "}
        <a
          className={ENLACE}
          href="https://pure.unisabana.edu.co/en/persons/roberto-garcia-alonso-2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad de La Sabana
        </a>{" "}
        e investigador de la{" "}
        <a
          className={ENLACE}
          href="https://www.usal.es/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Universidad de Salamanca
        </a>
        . Dirige por Colombia el{" "}
        <a
          className={ENLACE}
          href="https://nato.usal.es/"
          target="_blank"
          rel="noopener noreferrer"
        >
          proyecto de la OTAN
        </a>{" "}
        sobre cooperación transatlántica en supervisión de la IA y analizó el{" "}
        <a
          className={ENLACE}
          href="https://periodicos.unb.br/index.php/RDET/article/view/48974"
          target="_blank"
          rel="noopener noreferrer"
        >
          marco ético
        </a>{" "}
        de la política colombiana de IA.
      </>
    ),
  },
];

const MENTORES_ORDENADOS = orderSprintMentors(MENTORES);

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

/* Cada perfil con el rótulo por el que alguien se reconoce de un vistazo. */
const PERFILES = [
  {
    rotulo: "Perfiles técnicos",
    body: "Ingeniería, ciencia de datos o seguridad informática. Los frentes de contención y análisis del incidente se trabajan programando durante todo el fin de semana.",
  },
  {
    rotulo: "Derecho, política pública y periodismo",
    body: "Los frentes de regulación y comunicación se trabajan escribiendo y leyendo documentación. No hace falta programar.",
  },
  {
    rotulo: "Quien ya responde incidentes",
    body: "La respuesta a incidentes ya es un oficio en banca, salud y otros sectores. Acá se mira qué cambia cuando el sistema que falla es de IA.",
  },
  {
    rotulo: "Quien llega al tema por primera vez",
    body: "No hace falta haber leído sobre seguridad de la IA. Se entra por lo que ya sabes hacer y lo que falte se pregunta durante el sprint.",
  },
];

const FAQ = [
  {
    q: "¿Puedo aplicar si nunca he trabajado en seguridad de la IA?",
    a: "Sí, y es el caso de buena parte de quienes participan. Los proyectos que mejor salen suelen mezclar a alguien que conoce el campo con alguien que sabe hacer muy bien otra cosa: escribir, litigar, levantar infraestructura, leerse un expediente. Lo que sí pedimos es que puedas estar el fin de semana completo.",
  },
  {
    q: "¿Necesito saber programar?",
    a: "No para todos los frentes. Los de regulación y comunicación se trabajan escribiendo y leyendo documentación. Los de contención y análisis sí requieren programar, aunque los equipos suelen mezclar perfiles.",
  },
  {
    q: "¿Tengo que llegar con equipo?",
    a: "No. Los equipos son de una a cinco personas y se arman el viernes en la noche, en la sala y en el Discord de Apart. Mucha gente llega sola y sale con equipo.",
  },
  {
    q: "¿Qué diferencia hay entre aplicar acá y participar en línea?",
    a: "El sprint es el mismo y el entregable se sube al mismo sitio. Aplicar acá es para el hub presencial en Bogotá, que tiene cupo limitado y por eso tiene selección. En el hub cubrimos alimentación, hospedaje para quienes vengan de otra ciudad, apoyo para cómputo y mentoría en sala. Participar en línea con Apart no tiene selección ni cupo.",
  },
  {
    q: "¿Cuánto tiempo toma la aplicación?",
    a: "Alrededor de veinte minutos. No esperamos una propuesta cerrada; queremos ver cómo piensas el problema.",
  },
  {
    q: "¿Puedo aplicar si no vivo en Bogotá?",
    a: "Sí. En el formulario nos dices desde dónde vendrías. Cubrimos el hospedaje de quienes vengan de otra ciudad; el transporte hasta Bogotá corre por tu cuenta.",
  },
];

const SECCION = "bg-aisc-cream";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
/* El encabezado de dos columnas de SASH: el titular a la izquierda, todo el
   texto a la derecha en una medida corta. */
const ENCABEZADO =
  "mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6";
const COLUMNA = "flex min-w-0 flex-col gap-6";
const PROSA =
  "text-body md:text-body-lg flex max-w-[640px] flex-col gap-5 text-aisc-ink";
/* La tarjeta de contorno con la que SASH lista lo que recibe cada persona. */
const TARJETA =
  "flex min-h-[104px] flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-5 md:min-h-[114px] md:p-6";
/* El recuadro del informe del incidente: bloque oscuro dentro de la seccion
   clara, para que se vea sin sacar a nadie del hilo. */
const AVISO =
  "flex flex-col gap-3 rounded-[8px] bg-aisc-forest-deep px-5 py-6 text-aisc-sand md:px-7 md:py-7";
const AVISO_ENLACE =
  "underline underline-offset-[3px] transition-colors hover:text-aisc-coral";
const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";

export default function Hackathon() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <HeroHackathon className={HERO_FUGA_CLASS} />
        <SiteHeader active="/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[860px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              AI Incident Response Sprint
            </h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/90">
              Un agente de IA actúa por su cuenta y le hace daño a un tercero.
              En este sprint, ingeniería, ciberseguridad, política pública y
              periodismo se unen para construir la respuesta.
            </p>
            <p className="text-body-sm mt-1 w-fit text-aisc-sand/75">
              {CIERRE_TEXTO}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link className={CTA_LINK_PRIMARY} href="/sprint/aplicar">
                Aplicar al hub en Bogotá
              </Link>
              <a
                className={CTA_LINK}
                href={APART_SPRINT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Participar en línea con Apart
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Los coorganizadores, en una banda de arena pegada al hero: solo las
          marcas, en una fila baja. El nombre de cada una va en el alt y en el
          title, que es lo que la lupa y el lector de pantalla necesitan. */}
      <section className="bg-aisc-sand">
        <div className={CONTENEDOR}>
          <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:gap-10 md:py-7">
            <p className="text-kicker whitespace-nowrap text-aisc-muted sm:flex-none">
              Coorganizan el hub en Bogotá
            </p>
            <ul className="flex flex-wrap items-center gap-x-12 gap-y-5 sm:ml-auto">
              {COORGANIZAN.map((o) => (
                <li key={o.name}>
                  <a
                    className="block transition-opacity hover:opacity-60"
                    href={o.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={o.name}
                  >
                    <img
                      alt={o.name}
                      className={`w-auto object-contain ${o.clase}`}
                      decoding="async"
                      height={o.alto}
                      src={o.logo}
                      width={o.ancho}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Las tres cifras duras, en tarjetas oscuras pegadas al hero. */}
      <section className={`${SECCION} pt-9 pb-10 md:pt-10 md:pb-12`}>
        <div className={`${CONTENEDOR} flex flex-col gap-12 md:gap-14`}>
          <dl className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
            {DATOS.map((d) => (
              <div
                className="flex min-h-[122px] flex-col justify-start rounded-[8px] bg-aisc-forest-deep px-5 py-5 text-aisc-sand md:min-h-[142px] md:px-7 md:py-7"
                key={d.valor}
              >
                <dt className="text-display-4 md:text-display-4-lg break-words">
                  {d.valor}
                </dt>
                <dd className="text-body-sm mt-3 text-aisc-sand">{d.nota}</dd>
              </div>
            ))}
          </dl>

          {/* De qué se trata */}
          <section id="que-es" className="flex flex-col gap-5">
            <div aria-hidden="true" className={HAIRLINE} />
            <div className="mt-5 flex flex-col gap-6">
              <h2 className="text-display-2 md:text-display-2-lg break-words">
                ¿De qué se trata?
              </h2>
              <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
                <p>
                  Ya hay casos documentados en los que un sistema de IA atacó
                  por su cuenta a un tercero. En julio de 2026, unos modelos que
                  estaban siendo evaluados se salieron de su entorno de pruebas
                  y encadenaron fallas hasta entrar a la infraestructura de
                  producción de Hugging Face. Lo contaron{" "}
                  <a
                    className={ENLACE}
                    href="https://openai.com/index/hugging-face-model-evaluation-security-incident/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenAI
                  </a>{" "}
                  y{" "}
                  <a
                    className={ENLACE}
                    href="https://huggingface.co/blog/security-incident-july-2026"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hugging Face
                  </a>{" "}
                  cada uno por su lado. Ninguna ley los obligaba a hacerlo.
                </p>
                <div className={AVISO}>
                  <p className="text-kicker text-aisc-sand/60">
                    26 de agosto de 2026
                  </p>
                  <h3 className="text-display-4 break-words">
                    Ya salió el informe del incidente
                  </h3>
                  <p className="text-body-sm md:text-body text-aisc-sand">
                    OpenAI publicó su{" "}
                    <a
                      className={AVISO_ENLACE}
                      href="https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      informe técnico
                    </a>{" "}
                    y una{" "}
                    <a
                      className={AVISO_ENLACE}
                      href="https://openai.com/index/hugging-face-incident-and-the-road-ahead/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      nota que lo resume
                    </a>
                    . Reconstruyen lo que hicieron los modelos, explican por qué
                    fallaron las barreras que debían contenerlos y cuentan qué
                    está cambiando para que no se repita.{" "}
                    <a
                      className={AVISO_ENLACE}
                      href="https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      METR y Redwood Research
                    </a>{" "}
                    revisaron el caso por su cuenta y publicaron su propio
                    informe el mismo día. Es la lectura con la que conviene
                    llegar al sprint.
                  </p>
                </div>
                <p>
                  Cuando pasa algo así, casi nadie tiene a mano el
                  procedimiento: no está escrito cómo se contiene, ni cómo se
                  reconstruye qué falló, ni qué le puede exigir un regulador al
                  proveedor, ni cómo se cuenta el caso sin exagerar ni
                  minimizar.
                </p>
                <p>
                  El sprint existe para llenar ese vacío con piezas concretas.
                  Se trabaja en cinco frentes en paralelo durante un fin de
                  semana.
                  Cada equipo entrega algo que alguien más pueda usar: un
                  estándar, un banco de pruebas, un cuestionario para un
                  regulador, un ejercicio de mesa. Después los califican
                  jurados que no estuvieron en la sala. La
                  retroalimentación llega por escrito y el reporte queda
                  publicado con tu nombre.{" "}
                  <a
                    className={ENLACE}
                    href="https://apartresearch.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apart Research
                  </a>{" "}
                  y{" "}
                  <a
                    className={ENLACE}
                    href="https://www.securite-ia.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CeSIA
                  </a>{" "}
                  convocan el sprint en todo el mundo; nosotros abrimos el hub
                  presencial en Bogotá.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Los cinco frentes */}
      <section id="tracks" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Los cinco frentes
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                Cada equipo escoge uno. En el formulario nos dices cuál te
                interesa. Apart explica cada frente con más detalle en{" "}
                <a
                  className={ENLACE}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  la convocatoria del sprint
                </a>
                , donde además propone proyectos concretos que puedes
                desarrollar en cada uno.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {TRACKS.map((t, i) => (
              <li className="flex" key={t.id}>
                <article className="flex min-h-[180px] w-full flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 md:min-h-[200px] md:p-7">
                  <span
                    className="text-display-4 tabular-nums text-aisc-coral"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-display-4 md:text-display-4-lg text-balance">
                    {t.titulo}
                  </h3>
                  <p className="text-body-sm text-aisc-ink">{t.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* El hub en Bogotá */}
      <section id="bogota" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              ¿Qué encuentras en Bogotá?
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Trabajar un fin de semana entero es más fácil acompañado
                  que solo en la casa. Por eso abrimos una sala en Bogotá, de
                  viernes a domingo.
                </p>
                <p>
                  La sala queda en el Chicó, en el norte de la ciudad. La
                  dirección exacta la enviamos por correo a quienes queden
                  seleccionados.
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-3">
            {HUB.map((h) => (
              <li
                className="flex w-full"
                key={h.titulo}
              >
                <article className={`${TARJETA} w-full`}>
                  <h3 className="text-display-4 text-balance">{h.titulo}</h3>
                  <p className="text-body-sm text-aisc-muted">{h.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mentoría */}
      <section id="mentores" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Mentores y ponentes
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Durante el fin de semana pasa por la sala gente que trabaja en
                  los temas de los cinco frentes. Algunos abren con una charla
                  corta. Otros se sientan con los equipos a apoyar lo que estén
                  construyendo. Cada tarjeta dice si esa persona estará en la
                  sala en Bogotá o se conecta en remoto.
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-8 md:mt-14 lg:mt-16">
            {/* Con un roster impar, las filas de 2 (movil) y de 3 (sm)
                dejarian a la ultima persona sola; las ultimas tarjetas se
                encogen para cerrar en una fila de 3 o de 4. En lg van de a 5. */}
            {MENTORES_ORDENADOS.map((m, i) => (
              <li
                className={`flex flex-col gap-3 ${
                  MENTORES_ORDENADOS.length % 2 === 1 &&
                  i >= MENTORES_ORDENADOS.length - 3
                    ? "w-[calc((100%_-_3rem)/3)]"
                    : "w-[calc((100%_-_1.5rem)/2)]"
                } ${
                  MENTORES_ORDENADOS.length % 3 === 1 &&
                  i >= MENTORES_ORDENADOS.length - 4
                    ? "sm:w-[calc((100%_-_4.5rem)/4)]"
                    : "sm:w-[calc((100%_-_3rem)/3)]"
                } lg:w-[calc((100%_-_6rem)/5)]`}
                key={m.nombre}
              >
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
                  {m.foto ? (
                    <img
                      alt={m.nombre}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center"
                      src={m.foto}
                    />
                  ) : (
                    <span
                      className="text-display-2 md:text-display-2-lg text-aisc-forest/45"
                      aria-hidden="true"
                    >
                      {iniciales(m.nombre)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-display-4 font-semibold text-aisc-forest">
                    {m.linkedin ? (
                      <a
                        className="underline decoration-aisc-forest/30 underline-offset-4 transition-colors hover:text-aisc-coral hover:decoration-aisc-coral"
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {m.nombre}
                      </a>
                    ) : (
                      m.nombre
                    )}
                  </span>
                  <span className="text-body-sm text-aisc-muted">
                    {m.rol}
                    <span aria-hidden="true"> · </span>
                    <span className="text-aisc-forest/70">
                      {m.modalidad}
                    </span>
                  </span>
                  {m.bio ? (
                    <p className="text-body-sm mt-2 text-aisc-ink">{m.bio}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quién puede aplicar: banda oscura, para que la página respire entre
          tanto papel crema y para que los cuatro perfiles no queden en viñetas. */}
      <section
        id="quien"
        className="relative overflow-hidden bg-aisc-forest-deep py-14 text-aisc-sand md:py-16"
      >
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="995"
          decoding="async"
          className={CTA_PATTERN_TOP}
          style={{ color: "transparent" }}
          src={PATRON}
        />
        <div className={`${CONTENEDOR} relative z-10`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              ¿Quién puede aplicar?
            </h2>
            <div className="flex max-w-[640px] flex-col gap-4">
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                No se pide experiencia previa en seguridad de la IA ni un
                título específico. Se pide estar el fin de semana completo y llegar con
                idea de qué quieres trabajar.
              </p>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 md:mt-14 lg:mt-16 lg:grid-cols-2">
            {PERFILES.map((p) => (
              <li
                className="flex flex-col gap-1.5 border-t border-aisc-sand/25 py-6"
                key={p.rotulo}
              >
                <h3 className="text-display-4 md:text-display-4-lg text-balance">
                  {p.rotulo}
                </h3>
                <p className="text-body-sm text-aisc-sand/75">{p.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link className={CTA_LINK_PRIMARY} href="/sprint/aplicar">
              Aplicar al hub en Bogotá
            </Link>
            <span className="text-body-sm text-aisc-sand/70">
              {CIERRE_TEXTO}
            </span>
          </div>
        </div>
      </section>

      {/* Premios */}
      <section id="premios" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Premios y qué pasa después
            </h2>
            <div className={COLUMNA}>
              <div className={PROSA}>
                <p>
                  Apart reparte USD 2.000 entre los cinco primeros puestos de
                  todo el sprint. Los jurados evalúan los proyectos la semana
                  siguiente y la calificación es ciega: no saben de dónde viene
                  cada equipo.
                </p>
                <p>
                  Más allá del premio, los equipos con mejores resultados entran
                  a la vía rápida de{" "}
                  <a
                    className={ENLACE}
                    href={APART_FELLOWSHIP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    la beca de investigación de Apart
                  </a>{" "}
                  y quedan conectados con mentores del campo. Cada reporte se
                  publica completo y con los nombres de sus autores.
                </p>
              </div>
            </div>
          </div>
          {/* La escalera de premios: el primer puesto lleno, los otros cuatro de
              contorno, con la cifra como lo primero que se ve. */}
          <ul className="mt-12 grid grid-cols-2 gap-3 md:mt-14 lg:mt-16 lg:grid-cols-5">
            {PREMIOS.map((p, i) => (
              <li className="flex" key={p.puesto}>
                <article
                  className={`flex min-h-[150px] w-full flex-col justify-between rounded-[8px] p-5 md:min-h-[172px] md:p-6 ${
                    i === 0
                      ? "bg-aisc-forest text-aisc-sand"
                      : "border border-aisc-forest/55 bg-aisc-cream text-aisc-ink"
                  }`}
                >
                  <span
                    className={`text-meta font-semibold tracking-widest uppercase ${
                      i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"
                    }`}
                  >
                    {p.puesto}
                  </span>
                  <span className="mt-6 flex flex-col">
                    <span
                      className={`text-meta ${i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"}`}
                    >
                      USD
                    </span>
                    <span
                      className={`text-display-2 md:text-display-2-lg tabular-nums ${
                        i === 0 ? "text-aisc-sand" : "text-aisc-forest"
                      }`}
                    >
                      {p.monto}
                    </span>
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quién convoca y quién financia */}
      <section id="organizan" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className={ENCABEZADO}>
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              ¿Quién está detrás?
            </h2>
            <div className={COLUMNA}>
              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-ink">
                <a
                  className={ENLACE}
                  href="https://apartresearch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apart Research
                </a>{" "}
                y{" "}
                <a
                  className={ENLACE}
                  href="https://www.securite-ia.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CeSIA
                </a>{" "}
                convocan el sprint en todo el mundo. Nosotros abrimos el hub
                presencial en Bogotá, y son estas organizaciones las que lo
                hacen posible.
              </p>
            </div>
          </div>
          {GRUPOS.map((g) => (
            <div className="mt-12 flex flex-col gap-5 md:mt-14" key={g.rotulo}>
              <h3 className="text-kicker text-aisc-muted">{g.rotulo}</h3>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.orgs.map((o) => (
                  <li className="flex" key={o.name}>
                    <a
                      className="flex min-h-[190px] w-full flex-col justify-between gap-8 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand md:p-7"
                      href={o.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-[42px] items-center">
                        <img
                          alt={o.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-[38px] w-auto object-contain"
                          src={o.logo}
                        />
                      </span>
                      <span className="flex flex-col gap-2">
                        <span className="text-display-4 md:text-display-4-lg text-balance">
                          {o.name}
                        </span>
                        <span className="text-body-sm text-aisc-ink">
                          {o.body}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="mt-5 flex flex-col gap-8">
            <h2 className="text-display-2 md:text-display-2-lg break-words">
              Preguntas frecuentes
            </h2>
            <ul className="flex flex-col">
              {FAQ.map((f) => (
                <li key={f.q}>
                  <details className="group border-t border-aisc-ink/20">
                    <summary className="text-display-4 md:text-display-4-lg flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                      <span className="text-balance">{f.q}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-aisc-coral transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-body-sm max-w-[860px] pb-5 text-aisc-muted">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="h-px w-full flex-none bg-aisc-ink/20"
            />
          </div>
        </div>
      </section>

      {/* El cierre: panel alto y centrado, como el de SASH */}
      <section className="bg-aisc-cream px-6">
        <div className="mx-auto w-full max-w-[1400px] py-12 md:py-14 lg:py-16">
          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep px-6 py-16 text-center text-aisc-sand md:py-20">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_TOP}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_BOTTOM}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-6">
              <span className="text-body-sm text-aisc-sand/70">
                {CIERRE_TEXTO}
              </span>
              <h2 className="text-display-2 md:text-display-2-lg text-balance">
                Aplica al hub en Bogotá
              </h2>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link className={CTA_LINK_PRIMARY} href="/sprint/aplicar">
                  Aplicar
                </Link>
                <a
                  className={CTA_LINK}
                  href={APART_SPRINT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Participar en línea
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
