import type { Metadata } from "next";
import Link from "next/link";
import HackathonApplyForm from "@/components/hackathon-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CIERRE_TEXTO, aplicacionesCerradas } from "../../datos";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Aplicar al AI Incident Response Sprint (por recomendación)",
  description:
    "Vía de recomendación para el hub presencial en Bogotá del AI Incident Response Sprint, del 11 al 13 de septiembre de 2026.",
  /* Esta dirección se manda por enlace, no se busca. Fuera del índice para que
     no compita con el formulario completo. */
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/sprint/aplicar/recomendacion",
    languages: alternativas("/sprint/aplicar/recomendacion"),
  },
};

/* La página tiene que preguntarle la hora al servidor en cada visita: si se
   prerenderizara, el cierre del 6 de septiembre quedaría congelado. */
export const dynamic = "force-dynamic";

export default function AplicarPorRecomendacion() {
  const cerrado = aplicacionesCerradas();

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
          src="/aisc/patterns/aisc-hero-hackathon.svg"
        />
        <SiteHeader active="/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">AI Incident Response Sprint · 11 al 13 de septiembre</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Aplica al hub en Bogotá
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              {CIERRE_TEXTO} Esta vía es para quien llega recomendado por alguien del equipo o por un mentor
              del sprint.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {!cerrado ? (
            <div className="mb-8 flex flex-col gap-3">
              <p className="text-body-sm text-aisc-ink">
                Durante los tres días tendrás espacio de trabajo, alimentación, conectividad y mentores en sala.
              </p>
              <p className="text-body-sm text-aisc-ink">
                Quien te recomendó ya respondió por tu trayectoria. Por eso solo te pedimos cómo contactarte y
                unas líneas sobre lo que te interesa del fin de semana. Acá está{" "}
                <Link
                  className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/sprint"
                >
                  el detalle del sprint
                </Link>
                .
              </p>
            </div>
          ) : null}
          <HackathonApplyForm cerrado={cerrado} corta />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
