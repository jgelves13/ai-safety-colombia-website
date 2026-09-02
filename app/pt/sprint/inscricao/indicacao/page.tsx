import type { Metadata } from "next";
import Link from "next/link";
import HackathonApplyForm from "@/components/hackathon-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CIERRE_TEXTO_IDIOMA, aplicacionesCerradas } from "@/app/sprint/datos";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Inscrição no AI Incident Response Sprint (por recomendação)",
  description:
    "Via de recomendação para o hub presencial em Bogotá do AI Incident Response Sprint, de 11 a 13 de setembro de 2026.",
  /* Esta dirección se manda por enlace, no se busca. Fuera del índice para que
     no compita con el formulario completo. */
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/pt/sprint/inscricao/indicacao",
    languages: alternativas("/pt/sprint/inscricao/indicacao"),
  },
};

/* La página tiene que preguntarle la hora al servidor en cada visita: si se
   prerenderizara, el cierre del 6 de septiembre quedaría congelado. */
export const dynamic = "force-dynamic";

export default function InscricaoPorIndicacao() {
  const cerrado = aplicacionesCerradas();

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
          src="/aisc/patterns/aisc-hero-hackathon.svg"
        />
        <SiteHeader active="/pt/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">AI Incident Response Sprint · 11 a 13 de setembro</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Inscreva-se no hub em Bogotá
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              {CIERRE_TEXTO_IDIOMA.pt} Esta via é para quem chega por recomendação de alguém da equipe ou de um
              mentor do sprint.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {!cerrado ? (
            <div className="mb-8 flex flex-col gap-3">
              <p className="text-body-sm text-aisc-ink">
                Durante o fim de semana você terá espaço de trabalho, alimentação, hospedagem se vier de outra cidade, conectividade e mentores na sala.
              </p>
              <p className="text-body-sm text-aisc-ink">
                Quem recomendou você já respondeu pela sua trajetória. Por isso só pedimos como falar com você e
                algumas linhas sobre o que te interessa do fim de semana. Aqui está{" "}
                <Link
                  className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/pt/sprint"
                >
                  o detalhe do sprint
                </Link>
                .
              </p>
            </div>
          ) : null}
          <HackathonApplyForm cerrado={cerrado} idioma="pt" corta />
        </div>
      </section>
      <SiteFooter idioma="pt" />
    </main>
  );
}
