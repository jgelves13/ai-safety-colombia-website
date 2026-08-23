import type { Metadata } from "next";
import Link from "next/link";
import HackathonApplyForm from "@/components/hackathon-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CIERRE_TEXTO, aplicacionesCerradas } from "../datos";

export const metadata: Metadata = {
  title: "Aplicar al AI Incident Response Sprint",
  description:
    "Formulario de aplicación al espacio presencial en Bogotá del AI Incident Response Sprint, del 11 al 13 de septiembre de 2026. Cierra el 6 de septiembre.",
};

/* La página tiene que preguntarle la hora al servidor en cada visita: si se
   prerenderizara, el cierre del 6 de septiembre quedaría congelado. */
export const dynamic = "force-dynamic";

export default function Aplicar() {
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
        <SiteHeader active="/hackathon" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-coral">AI Incident Response Sprint · 11 al 13 de septiembre</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Aplica al espacio en Bogotá
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              {CIERRE_TEXTO} Toma entre quince y veinticinco minutos y no necesitas preparar nada de antemano.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {!cerrado ? (
            <div className="mb-8 flex flex-col gap-3">
              <p className="text-body-sm text-aisc-ink">
                Durante los tres días tendrás espacio de trabajo, alimentación, conectividad y mentores en sala. El
                cupo es limitado, así que hay selección.
              </p>
              <p className="text-body-sm text-aisc-ink">
                Si prefieres ver primero de qué se trata,{" "}
                <Link
                  className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/hackathon"
                >
                  acá está el detalle del sprint
                </Link>
                .
              </p>
            </div>
          ) : null}
          <HackathonApplyForm cerrado={cerrado} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
