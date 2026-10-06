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

/* La escalera: explorar sin compromiso, aprender en un curso con cohorte e
   investigar en un hackathon. Cada opción cierra con una línea de datos:
   cuánto tiempo pide, qué hace falta y cuánto cuesta. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    titulo: "Explore",
    entrada: "Para conhecer o campo e as pessoas sem compromisso.",
    opciones: [
      {
        titulo: "O grupo de WhatsApp",
        cuerpo: "Onde você pergunta o que não entende e onde as sessões, os eventos e as chamadas são anunciados primeiro.",
        datos: "Grátis e sem requisitos.",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        cta: "Entrar no grupo",
        externo: true,
      },
      {
        titulo: "Grupo de leitura: AI Control",
        cuerpo: "Uma leitura a cada quinze dias sobre como supervisionar um sistema de IA que age por conta própria. Você pode vir só para ouvir.",
        datos: "Sextas às 18h30, horário da Colômbia, on-line, uma hora. Grátis e sem requisitos.",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        cta: "Entrar no grupo de leitura",
        externo: true,
      },
      {
        titulo: "Palestras e oficinas",
        cuerpo: "Você ouve em primeira mão alguém que trabalha no tema e conhece as pessoas da comunidade.",
        datos: "Uma ou duas horas por evento, com inscrição no Luma. Grátis.",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        cta: "Ver os próximos",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    titulo: "Aprenda",
    entrada: "Seminários em turma, com facilitador, usando os materiais da BlueDot Impact.",
    opciones: [
      {
        titulo: "Seminário de futuro e riscos da IA",
        cuerpo: "Por que existe uma corrida rumo à AGI, quais são os riscos e que defesas existem. O ponto de partida venha você de qualquer área.",
        datos: "Cinco semanas, 3 horas por semana, nos Andes ou on-line. Sem formação técnica. Grátis, com certificado.",
        href: "/pt/seminarios/futuro-e-riscos",
        cta: "Ver o seminário",
        externo: false,
      },
      {
        titulo: "Seminário técnico de segurança da IA",
        cuerpo: "Como se treinam e avaliam modelos mais seguros, interpretabilidade mecanicista e AI control. Para quem quer entrar na parte técnica.",
        datos: "Seis semanas, 3 horas por semana, em Bogotá ou on-line. Pede saber o básico de como os modelos são treinados. Grátis, com certificado.",
        href: "/pt/seminarios/tecnico",
        cta: "Ver o seminário",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    titulo: "Pesquise",
    entrada: "Para sair com um trabalho próprio que você possa mostrar.",
    opciones: [
      {
        titulo: "Hackathons de pesquisa",
        cuerpo: "O hub presencial em Bogotá dos hackathons da Apart Research. As equipes saem com um trabalho publicado e retorno de jurados.",
        datos: "Um fim de semana, de sexta a domingo, no hub de Bogotá, com seleção prévia. Grátis.",
        href: "/pt/sprint",
        cta: "Ver o último sprint",
        externo: false,
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Participe",
  intro: "Há três formas de entrar, conforme o tempo que você tem. Comece pela que estiver mais perto de você: ninguém chega sabendo.",
  aviso: "Inscrições abertas para os seminários até sexta-feira, 9 de outubro",
  kickerAbierto: "Seminário · Inscrições abertas até 9 de outubro",
  kickerCerrado: "Seminário",
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
