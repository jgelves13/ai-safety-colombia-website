import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { cursosCerrados } from "@/lib/cursos";

export const metadata: Metadata = {
  title: "Participe",
  description:
    "Três passos para entrar em AI safety com a AI Safety Colombia: explorar a comunidade, aprender nos cursos AGI Strategy e Technical AI Safety e pesquisar nos hackathons. Cada um com sua dedicação, requisitos e custo.",
  alternates: { canonical: "/pt/participe", languages: alternativas("/pt/participe") },
};

/* Se renderiza en cada visita: el aviso de los cursos se apaga solo cuando
   cierran las aplicaciones, el 11 de octubre. */
export const dynamic = "force-dynamic";

/* La escalera: explorar sin compromiso, aprender en un curso con cohorte e
   investigar en un hackathon. Cada opción dice lo mismo en el mismo orden,
   dedicación, requisitos y costo, para que se puedan comparar de un vistazo. */
const PASOS = [
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
    entrada: "Cursos em turma, com facilitador, usando os materiais da BlueDot Impact. Inscrições abertas até domingo, 11 de outubro, às 23h59, horário da Colômbia.",
    opciones: [
      {
        titulo: "AGI Strategy",
        cuerpo: "Por que existe uma corrida rumo à AGI, o que impulsiona o progresso, quais são os riscos e que defesas existem. É o ponto de partida venha você de qualquer área.",
        dedicacion: "Cinco semanas a partir de segunda-feira, 12 de outubro, cerca de 5 horas por semana",
        requisitos: "Inscrever-se; não precisa de formação técnica",
        costo: "Grátis, com certificado da AI Safety Colombia",
        href: "/pt/cursos/agi-strategy",
        cta: "Ver o curso",
        externo: false,
      },
      {
        titulo: "Technical AI Safety",
        cuerpo: "Como se treinam modelos mais seguros, como são avaliados, interpretabilidade mecanicista e AI control. Para quem já sabe por que o problema importa e quer entrar na parte técnica.",
        dedicacion: "Seis semanas a partir de segunda-feira, 12 de outubro, cerca de 5 horas por semana",
        requisitos: "Inscrever-se; entender o básico de como os modelos são treinados. Se não, comece por AGI Strategy",
        costo: "Grátis, com certificado da AI Safety Colombia",
        href: "/pt/cursos/technical-ai-safety",
        cta: "Ver o curso",
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

const CARD =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col p-6 md:p-7 lg:p-8";
const ENLACE_CARD =
  "text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";
const CHIP =
  "text-body-sm inline-flex rounded-full border border-aisc-sand/50 px-4 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand hover:text-aisc-forest-deep";

export default function Participe() {
  const abiertos = !cursosCerrados();
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="1415"
          decoding="async"
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-unete.svg"
        />
        <SiteHeader active="/pt/participe" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand text-balance">Participe</h1>
            <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
              Três passos, conforme o tempo que você quer dedicar. Cada opção diz quanto exige, o que você precisa e quanto custa.
            </p>
            <nav aria-label="Os três passos">
              <ul className="flex flex-wrap gap-2">
                {PASOS.map((paso) => (
                  <li key={paso.id}>
                    <a className={CHIP} href={`#${paso.id}`}>
                      {paso.numero} · {paso.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {abiertos ? (
              <a
                className="text-body-sm inline-flex w-fit items-center gap-2 rounded-full bg-aisc-coral px-4 py-1.5 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85"
                href="#aprende"
              >
                Inscrições abertas para os cursos até domingo, 11 de outubro →
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {PASOS.map((paso) => (
        <section id={paso.id} key={paso.id} className="scroll-mt-6 bg-aisc-cream">
          <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-4 md:pt-16">
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
            <div className="grid grid-cols-1 gap-4 pt-5 pb-10 md:gap-10 md:pt-7 md:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
              <h2 className="text-display-2 md:text-display-2-lg text-balance">
                <span className="text-aisc-forest">{paso.numero}</span> {paso.titulo}
              </h2>
              <p className="text-body md:text-body-lg self-end text-aisc-ink">{paso.entrada}</p>
            </div>
            <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-3">
              {paso.opciones.map((item) => (
                <li className="flex" key={item.titulo}>
                  <article className={CARD}>
                    <h3 className="text-display-3 md:text-display-3-lg text-balance">{item.titulo}</h3>
                    <p className="text-body-sm mt-3 text-aisc-ink">{item.cuerpo}</p>
                    <dl className="text-body-sm mt-6 flex flex-col gap-3 border-t border-aisc-line pt-5">
                      <div>
                        <dt className="text-meta text-aisc-muted">Dedicação</dt>
                        <dd className="text-aisc-ink">{item.dedicacion}</dd>
                      </div>
                      <div>
                        <dt className="text-meta text-aisc-muted">Requisitos</dt>
                        <dd className="text-aisc-ink">{item.requisitos}</dd>
                      </div>
                      <div>
                        <dt className="text-meta text-aisc-muted">Custo</dt>
                        <dd className="text-aisc-ink">{item.costo}</dd>
                      </div>
                    </dl>
                    <div className="mt-auto pt-7">
                      {item.externo ? (
                        <a className={ENLACE_CARD} href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.cta}
                        </a>
                      ) : (
                        <Link className={ENLACE_CARD} href={item.href}>
                          {item.cta}
                        </Link>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="bg-aisc-cream pt-10" />
      <CtaPanel
        kicker="Não sabe por onde começar?"
        title="Fale com a gente"
        body="Agende uma conversa curta com Jose Gelves, cofundador e diretor da AI Safety Colombia. Na conversa, vocês escolhem juntos o passo que serve, de acordo com o que você já sabe e o tempo que tem."
      >
        <a className={CTA_LINK_PRIMARY} href="https://cal.com/josegelves/meeting" target="_blank" rel="noopener noreferrer">
          Agendar uma conversa
        </a>
        <a className={CTA_LINK} href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ" target="_blank" rel="noopener noreferrer">
          Entrar no grupo de WhatsApp
        </a>
      </CtaPanel>
      <SiteFooter idioma="pt" />
    </main>
  );
}
