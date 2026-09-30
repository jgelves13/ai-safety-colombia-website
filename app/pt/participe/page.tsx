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
   investigar en un hackathon. Cada opción dice lo mismo en el mismo orden,
   dedicación, requisitos y costo, para que se puedan comparar de un vistazo. */
const PASOS: PasoUnete[] = [
  {
    id: "explora",
    numero: "01",
    titulo: "Explore",
    entrada: "Para conhecer o campo e as pessoas sem compromisso.",
    opciones: [
      {
        titulo: "O grupo de WhatsApp",
        cuerpo: "Onde você pergunta o que não entende e discute o que acabou de sair. Também é onde as sessões, os eventos e as chamadas são anunciados primeiro.",
        dedicacion: "A que você quiser",
        requisitos: "Nenhum",
        costo: "Grátis",
        href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
        cta: "Entrar no grupo",
        externo: true,
      },
      {
        titulo: "Grupo de leitura: AI Control",
        cuerpo: "Discutimos uma leitura sobre como supervisionar um sistema de IA que age por conta própria. Você pode vir só para ouvir ou trazer uma leitura e apresentá-la.",
        dedicacion: "A cada quinze dias, às sextas às 18h30 (horário da Colômbia), online: uma hora mais a leitura",
        requisitos: "Nenhum; qualquer nível de conhecimento é bem-vindo",
        costo: "Grátis",
        href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
        cta: "Entrar no grupo de leitura",
        externo: true,
      },
      {
        titulo: "Palestras e oficinas",
        cuerpo: "Você ouve em primeira mão alguém que trabalha no tema e pergunta pessoalmente o que quiser. É onde as pessoas da comunidade se conhecem.",
        dedicacion: "Uma ou duas horas por evento",
        requisitos: "Inscrever-se no Luma",
        costo: "Grátis",
        href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
        cta: "Ver os próximos",
        externo: true,
      },
    ],
  },
  {
    id: "aprende",
    numero: "02",
    titulo: "Aprenda",
    entrada: "Seminários em turma, com facilitador, usando os materiais da BlueDot Impact. Inscrições abertas até sexta-feira, 9 de outubro, às 23h59, horário da Colômbia.",
    opciones: [
      {
        titulo: "Seminário de futuro e riscos da IA",
        cuerpo: "Por que existe uma corrida rumo à AGI, o que impulsiona o progresso, quais são os riscos e que defesas existem. É o ponto de partida venha você de qualquer área.",
        dedicacion: "Cinco semanas a partir da semana de 12 de outubro, cerca de 3 horas por semana; sessões presenciais na Universidad de los Andes e on-line",
        requisitos: "Inscrever-se; não precisa de formação técnica",
        costo: "Grátis, com certificado da AI Safety Colombia",
        href: "/pt/seminarios/futuro-e-riscos",
        cta: "Ver o seminário",
        externo: false,
      },
      {
        titulo: "Seminário técnico de segurança da IA",
        cuerpo: "Como se treinam modelos mais seguros, como são avaliados, interpretabilidade mecanicista e AI control. Para quem já sabe por que o problema importa e quer entrar na parte técnica.",
        dedicacion: "Seis semanas a partir da semana de 12 de outubro, cerca de 3 horas por semana; sessões presenciais em Bogotá e on-line",
        requisitos: "Inscrever-se; entender o básico de como os modelos são treinados. Se não, comece pelo Seminário de futuro e riscos da IA",
        costo: "Grátis, com certificado da AI Safety Colombia",
        href: "/pt/seminarios/tecnico",
        cta: "Ver o seminário",
        externo: false,
      },
    ],
  },
  {
    id: "investiga",
    numero: "03",
    titulo: "Pesquise",
    entrada: "Para sair com um trabalho próprio que você possa mostrar.",
    opciones: [
      {
        titulo: "Hackathons de pesquisa",
        cuerpo: "Abrimos em Bogotá o hub presencial dos hackathons da Apart Research. As equipes saem com um trabalho publicado e retorno escrito de jurados de fora. O próximo é anunciado no grupo de WhatsApp.",
        dedicacion: "Um fim de semana inteiro, de sexta a domingo",
        requisitos: "Inscrever-se no hub de Bogotá, onde há seleção",
        costo: "Grátis",
        href: "/pt/sprint",
        cta: "Ver o último sprint",
        externo: false,
      },
    ],
  },
];

const TEXTOS: TextosUnete = {
  h1: "Participe",
  intro: "Três passos, conforme o tempo que você quer dedicar. Cada opção diz quanto exige, o que você precisa e quanto custa.",
  aviso: "Inscrições abertas para os seminários até sexta-feira, 9 de outubro",
  kickerAbierto: "Seminário · Inscrições abertas até 9 de outubro",
  kickerCerrado: "Seminário",
  dedicacion: "Dedicação",
  requisitos: "Requisitos",
  costo: "Custo",
  cta: {
    kicker: "Não sabe por onde começar?",
    title: "Fale com a gente",
    body: "Agende uma conversa curta com Jose Gelves, cofundador e diretor da AI Safety Colombia. Na conversa, vocês escolhem juntos o passo que serve, de acordo com o que você já sabe e o tempo que tem.",
    primario: "Agendar uma conversa",
    secundario: "Entrar no grupo de WhatsApp",
  },
};

export default function Unete() {
  return <UnetePagina active="/pt/participe" pasos={PASOS} t={TEXTOS} />;
}
