import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DefAccApplyForm from "@/components/defacc-apply-form";
import { FondoBinario } from "@/components/defacc-page";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { inscripcionesCerradas, inscripcionesIniciadas } from "@/app/defacchackathon/datos";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Apply · Defensive Acceleration Hackathon",
  description:
    "Application form for the Defensive Acceleration Hackathon, Saturday November 14, 2026 at Universidad de los Andes, Bogotá. Co-organized by AI Safety Colombia & IEEE Computer Society Uniandes.",
  alternates: {
    canonical: "/en/defacchackathon/apply",
    languages: alternativas("/en/defacchackathon/apply"),
  },
};

export const dynamic = "force-dynamic";

export default async function ApplyDefAcc() {
  const cerrado = inscripcionesCerradas();
  const noIniciado = !inscripcionesIniciadas();

  return (
    <main lang="en" className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/en/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-[960px]">
            <div className="flex max-w-[700px] flex-col gap-4">
              <span className="text-kicker text-aisc-sand/70">
                Defensive Acceleration Hackathon · Saturday November 14, 2026 · Uniandes
              </span>
              <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
                Register for the Hackathon
              </h1>
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                A full day at Universidad de los Andes campus, Bogotá.
                Limited capacity, lunch included, and COP 2,000,000 in prizes.
              </p>
              <p className="text-body font-semibold text-aisc-sand">
                Application deadline: Tuesday, November 10, 11:59 PM (Bogotá time).
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Image
                src="/aisc/hackathon/cyberbear.png"
                alt="Spectacled Bear · Defensive Acceleration Hackathon"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {!cerrado && !noIniciado ? (
            <div className="mb-6">
              <div className="text-body-sm text-aisc-ink">
                If you like, you can check the 5 research tracks and the evaluation rubric in the{" "}
                <Link
                  className="font-medium text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/en/defacchackathon"
                >
                  full hackathon guide
                </Link>
                .
              </div>
            </div>
          ) : null}

          <DefAccApplyForm cerrado={cerrado} noIniciado={noIniciado} idioma="en" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
