import type { Metadata } from "next";
import Link from "next/link";
import CtaPanel from "@/components/cta-panel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Participe",
  description:
    "As quatro coisas abertas na AI Safety Colombia: o grupo de WhatsApp, o grupo de leitura sobre controle de IA às sextas, as palestras em Bogotá e os hackathons de pesquisa.",
  alternates: { canonical: "/pt/participe", languages: alternativas("/pt/participe") },
};

/* Las cuatro cosas que están abiertas ahora mismo. Nada de formularios: todo
   apunta a canales que ya existen. */
const ABIERTO = [
  {
    href: "https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ",
    external: true,
    title: "O grupo de WhatsApp",
    cta: "Entrar no grupo",
    body: "É onde você pergunta o que não entendeu e discute o que acabou de sair, com gente que está no mesmo caminho. É também por onde ficamos sabendo primeiro das sessões, dos eventos e das chamadas.",
  },
  {
    href: "https://chat.whatsapp.com/DfWuuPlzqmIFN1tRtl57SB",
    external: true,
    title: "Grupo de leitura: controle de IA",
    cta: "Entrar no grupo de leitura",
    body: "Um espaço aberto para discutir como se supervisiona um sistema de IA que age por conta própria. Chega-se com qualquer nível de conhecimento e dá para vir só ouvir, ou trazer uma leitura e apresentá-la.",
  },
  {
    href: "https://luma.com/user/usr-TMDEtNWA1TozP77",
    external: true,
    title: "Palestras e oficinas",
    cta: "Ver as próximas",
    body: "Você ouve em primeira mão alguém que trabalha no tema e pode perguntar o que quiser, pessoalmente. É também onde a gente da comunidade se conhece e nascem as colaborações.",
  },
  {
    href: "/pt/sprint",
    external: false,
    title: "Hackathons de pesquisa",
    cta: "Ver o de setembro",
    body: "Você sai com um trabalho próprio, publicado e com retorno escrito de jurados de fora. Para muita gente foi a primeira coisa concreta que pôde mostrar no campo.",
  },
];

const CARD =
  "overflow-hidden rounded-lg bg-aisc-cream text-aisc-ink border border-aisc-ink flex w-full flex-col p-6 md:p-7 lg:p-8";
const ENLACE_CARD =
  "text-display-4 md:text-display-4-lg text-aisc-forest underline underline-offset-4 transition-colors hover:text-aisc-forest-deep";

export default function Participe() {
  return (
    <main lang="pt" className={PAGE_SHELL}>
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
              Há várias formas de fazer parte da comunidade e de começar a aprender. Estas são as que estão abertas
              agora.
            </p>
          </div>
        </div>
      </section>

      <section id="abierto" className="bg-aisc-cream">
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-14 md:pb-16">
          <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-forest-deep" />
          <div className="grid grid-cols-1 gap-8 pt-5 pb-12 md:gap-10 md:pt-7 md:pb-14 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)] lg:gap-6">
            <h2 className="text-display-2 md:text-display-2-lg text-balance">O que está aberto</h2>
          </div>
          <ul className="grid grid-cols-1 gap-[10px] md:grid-cols-2 xl:grid-cols-4">
            {ABIERTO.map((item) => (
              <li className="flex" key={item.title}>
                <article className={CARD}>
                  <h3 className="text-display-3 md:text-display-3-lg text-balance">{item.title}</h3>
                  <p className="text-body-sm mt-3 text-aisc-ink">{item.body}</p>
                  <div className="mt-auto pt-7">
                    {item.external ? (
                      <a
                        className={ENLACE_CARD}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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

      <CtaPanel
        kicker="Por onde começar"
        title="Entre no grupo e veja o que vem"
        body="Tudo é anunciado ali primeiro: as sessões de leitura, as palestras e as chamadas."
      >
        <a
          className={CTA_LINK_PRIMARY}
          href="https://chat.whatsapp.com/KwE8cciX48TAVhAOHnrLaZ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Entrar no grupo
        </a>
        <a
          className={CTA_LINK}
          href="https://luma.com/user/usr-TMDEtNWA1TozP77"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver os próximos eventos
        </a>
      </CtaPanel>
      <SiteFooter idioma="pt" />
    </main>
  );
}
