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
   investigar en un hackathon. Cada opción trae un párrafo, sus datos y un
   botón; los seminarios suman sus temas, que salen de su propia página. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    titulo: "Explore",
    entrada: "Para conhecer o campo e as pessoas, no seu ritmo.",
    patron: "charlas",
    opciones: [
      {
        titulo: "O grupo de WhatsApp",
        cuerpo: "Onde se discute o tema e se tiram dúvidas, e onde as sessões, os eventos e as chamadas são anunciados primeiro.",
        datos: "Grátis e sem requisitos.",
        cta: "Entrar no grupo",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Grupo de leitura: AI Control",
        cuerpo: "Uma leitura a cada quinze dias sobre como supervisionar um sistema de IA que age por conta própria. Você pode vir só para ouvir.",
        datos: "Sexta-feira sim, sexta não, às 18h30, horário da Colômbia, on-line, uma hora. Grátis e sem requisitos.",
        cta: "Entrar no grupo de leitura",
        href: "https://chat.whatsapp.com/KhjJqDNVviK3aX5S4q79EF",
        externo: true,
      },
      {
        titulo: "Palestras e oficinas",
        cuerpo: "Você ouve em primeira mão alguém que trabalha no tema e conhece as pessoas da comunidade.",
        datos: "Uma ou duas horas por evento, com inscrição no Luma. Grátis.",
        cta: "Ver os próximos",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    titulo: "Aprenda",
    entrada: "Seminários em turma, com facilitador, usando os materiais da BlueDot Impact.",
    patron: "seminarios",
    opciones: [
      {
        titulo: "Seminário de futuro e riscos da IA",
        cuerpo: "Por que existe uma corrida rumo à AGI, quais são os riscos e que defesas existem. O ponto de partida venha você de qualquer área.",
        datos: "Cinco semanas, 3 horas por semana, nos Andes ou on-line. Sem formação técnica. Grátis, com certificado.",
        cta: "Ver o seminário",
        href: "/pt/seminarios/futuro-e-riscos",
        externo: false,
        curso: "agi-strategy",
      },
      {
        titulo: "Seminário técnico de segurança da IA",
        cuerpo: "Como se treinam e avaliam modelos mais seguros, interpretabilidade mecanicista e AI control. Para quem quer entrar na parte técnica.",
        datos: "Seis semanas, 3 horas por semana, em Bogotá ou on-line. Pede saber o básico de como os modelos são treinados. Grátis, com certificado.",
        cta: "Ver o seminário",
        href: "/pt/seminarios/tecnico",
        externo: false,
        curso: "technical-ai-safety",
      },
    ],
  },
  {
    id: "investiga",
    titulo: "Pesquise",
    entrada: "Para sair com um trabalho próprio que você possa mostrar.",
    patron: "sprints",
    opciones: [
      {
        titulo: "Hackathons de pesquisa",
        cuerpo: "O hub presencial em Bogotá dos hackathons da Apart Research. As equipes saem com um trabalho publicado e retorno de jurados.",
        datos: "Um fim de semana, de sexta a domingo, no hub de Bogotá, com seleção prévia. Grátis.",
        cta: "Ver o último sprint",
        href: "/pt/sprint",
        externo: false,
        secundario: { texto: "Ver os projetos premiados", href: "/pt/pesquisa#hackathons" },
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Participe",
  intro: "Há três formas de entrar, conforme o tempo que você tem. Comece pela que estiver mais perto de você: ninguém chega sabendo.",
  aviso: "Inscrições abertas para os seminários até sexta-feira, 9 de outubro",
  temas: "O que se vê, semana a semana:",
  aplicar: {
    titulo: "Inscreva-se nos seminários",
    linea: "Uma só inscrição para os dois. Fecha na sexta-feira, 9 de outubro, às 23h59, horário da Colômbia.",
  },
  cta: {
    kicker: "Não sabe por onde começar?",
    title: "Fale com a gente",
    body: "Agende uma conversa curta com Jose Gelves, diretor da AI Safety Colombia, e escolham juntos o passo que serve para você.",
    primario: "Agendar uma conversa",
    secundario: "Entrar no grupo de WhatsApp",
  },
};

export default function Unete() {
  return <UnetePagina active="/pt/participe" idioma="pt" pasos={PASOS} t={TEXTOS} />;
}
