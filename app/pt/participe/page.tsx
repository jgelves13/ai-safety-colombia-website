import type { Metadata } from "next";
import UnetePagina, { type PasoUnete, type TextosUnete } from "@/components/unete-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Participe",
  description:
    "Três passos para entrar em AI safety com a AI Safety Colombia: explorar a comunidade, aprender no Seminário de futuro e riscos da IA ou no Seminário técnico de segurança da IA e pesquisar nos hackathons. Cada um com sua dedicação, requisitos e custo.",
  alternates: { canonical: "/pt/participe", languages: alternativas("/pt/participe") },
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
        titulo: "O grupo de WhatsApp",
        linea: "Avisos, perguntas e chamadas",
        condiciones: "Grátis e sem requisitos",
        imagen: "/aisc/patterns/aisc-hero-quienes-somos.svg",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Grupo de leitura: AI Control",
        linea: "Sexta-feira sim, sexta não, às 18h30, on-line",
        condiciones: "Grátis e sem requisitos",
        imagen: "/aisc/patterns/aisc-hero-recursos.svg",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        externo: true,
      },
      {
        titulo: "Palestras e oficinas",
        linea: "Uma ou duas horas, em Bogotá",
        condiciones: "Grátis, com inscrição no Luma",
        imagen: "/aisc/patterns/aisc-hero-eventos.svg",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    titulo: "Aprenda",
    opciones: [
      {
        titulo: "Seminário de futuro e riscos da IA",
        linea: "Cinco semanas, nos Andes ou on-line",
        condiciones: "Sem formação técnica. Grátis, com certificado",
        imagen: "/aisc/patterns/aisc-hero-seminario-futuro.svg",
        href: "/pt/seminarios/futuro-e-riscos",
        externo: false,
      },
      {
        titulo: "Seminário técnico de segurança da IA",
        linea: "Seis semanas, em Bogotá ou on-line",
        condiciones: "Pede o básico de como os modelos são treinados. Grátis, com certificado",
        imagen: "/aisc/patterns/aisc-hero-seminario-tecnico.svg",
        href: "/pt/seminarios/tecnico",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    titulo: "Pesquise",
    opciones: [
      {
        titulo: "Hackathons de pesquisa",
        linea: "Um fim de semana no hub de Bogotá",
        condiciones: "Com seleção prévia. Grátis",
        imagen: "/aisc/patterns/aisc-hero-hackathon.svg",
        href: "/pt/sprint",
        externo: false,
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Participe",
  intro: "Há três formas de entrar, conforme o tempo que você tem. Comece pela que estiver mais perto de você: ninguém chega sabendo.",
  aviso: "Inscrições abertas para os seminários até sexta-feira, 9 de outubro",
  kickerAbierto: "Inscrições abertas até 9 de outubro",
  cta: {
    kicker: "Não sabe por onde começar?",
    title: "Fale com a gente",
    body: "Agende uma conversa curta com Jose Gelves, diretor da AI Safety Colombia, e escolham juntos o passo que serve para você.",
    primario: "Agendar uma conversa",
    secundario: "Entrar no grupo de WhatsApp",
  },
};

export default function Unete() {
  return <UnetePagina active="/pt/participe" pasos={PASOS} t={TEXTOS} />;
}
