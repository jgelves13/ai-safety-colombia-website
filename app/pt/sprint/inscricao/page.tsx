import type { Metadata } from "next";
import Link from "next/link";
import HackathonApplyForm from "@/components/hackathon-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CIERRE_TEXTO_IDIOMA, aplicacionesCerradas } from "@/app/sprint/datos";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Inscrição no AI Incident Response Sprint",
  description:
    "Formulário de inscrição no hub presencial em Bogotá do AI Incident Response Sprint, de 11 a 13 de setembro de 2026. Encerra em 6 de setembro.",
  alternates: { canonical: "/pt/sprint/inscricao", languages: alternativas("/pt/sprint/inscricao") },
};

/* La página tiene que preguntarle la hora al servidor en cada visita: si se
   prerenderizara, el cierre del 6 de septiembre quedaría congelado. */
export const dynamic = "force-dynamic";

export default function Inscricao() {
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
              {CIERRE_TEXTO_IDIOMA.pt} Leva cerca de vinte minutos e não é preciso preparar nada de antemão.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {!cerrado ? (
            <div className="mb-8 flex flex-col gap-3">
              <p className="text-body-sm text-aisc-ink">
                Durante os três dias você terá espaço de trabalho, alimentação, conectividade e mentores na sala. As
                vagas são limitadas, então há seleção.
              </p>
              <p className="text-body-sm text-aisc-ink">
                Se preferir ver primeiro do que se trata,{" "}
                <Link
                  className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/pt/sprint"
                >
                  aqui está o detalhe do sprint
                </Link>
                .
              </p>
            </div>
          ) : null}
          <HackathonApplyForm cerrado={cerrado} idioma="pt" />
        </div>
      </section>
      <SiteFooter idioma="pt" />
    </main>
  );
}
