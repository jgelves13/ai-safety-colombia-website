import type { Metadata } from "next";
import Link from "next/link";
import HackathonApplyForm from "@/components/hackathon-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CIERRE_TEXTO_IDIOMA, aplicacionesCerradas } from "@/app/sprint/datos";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Apply to the AI Incident Response Sprint (by recommendation)",
  description:
    "Recommendation route for the in-person Bogotá hub of the AI Incident Response Sprint, 11 to 13 September 2026.",
  /* Esta dirección se manda por enlace, no se busca. Fuera del índice para que
     no compita con el formulario completo. */
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/en/sprint/apply/quick",
    languages: alternativas("/en/sprint/apply/quick"),
  },
};

/* La página tiene que preguntarle la hora al servidor en cada visita: si se
   prerenderizara, el cierre del 6 de septiembre quedaría congelado. */
export const dynamic = "force-dynamic";

export default function ApplyQuick() {
  const cerrado = aplicacionesCerradas();

  return (
    <main lang="en" className={PAGE_SHELL}>
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
        <SiteHeader active="/en/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">AI Incident Response Sprint · 11 to 13 September</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Apply to the Bogotá hub
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              {CIERRE_TEXTO_IDIOMA.en} This route is for people who reach us through someone on the team or a
              mentor of the sprint.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {!cerrado ? (
            <div className="mb-8 flex flex-col gap-3">
              <p className="text-body-sm text-aisc-ink">
                Over the three days you get a place to work, meals, connectivity and mentors in the room.
              </p>
              <p className="text-body-sm text-aisc-ink">
                Whoever recommended you has already vouched for your background. So we only ask how to reach you and
                a few lines on what draws you to the weekend. If you would rather see what it is about first,{" "}
                <Link
                  className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/en/sprint"
                >
                  here is the detail of the sprint
                </Link>
                .
              </p>
            </div>
          ) : null}
          <HackathonApplyForm cerrado={cerrado} idioma="en" corta />
        </div>
      </section>
      <SiteFooter idioma="en" />
    </main>
  );
}
