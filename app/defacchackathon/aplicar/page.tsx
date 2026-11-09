import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DefAccApplyForm from "@/components/defacc-apply-form";
import { FondoBinario } from "@/components/defacc-page";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { inscripcionesCerradas, inscripcionesIniciadas } from "../datos";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Postulación · Defensive Acceleration Hackathon",
  description:
    "Formulario de postulación al Defensive Acceleration Hackathon, sábado 14 de noviembre de 2026 en la Universidad de los Andes, Bogotá. Co-organizado por AI Safety Colombia e IEEE Computer Society Uniandes.",
  alternates: {
    canonical: "/defacchackathon/aplicar",
    languages: alternativas("/defacchackathon/aplicar"),
  },
};

export const dynamic = "force-dynamic";

export default async function AplicarDefAcc() {
  const cerrado = inscripcionesCerradas();
  const noIniciado = !inscripcionesIniciadas();

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
            <div className="flex max-w-[700px] flex-col gap-4">
              <span className="text-kicker text-aisc-sand/70">
                Defensive Acceleration Hackathon · Sábado 14 de noviembre de 2026 · Uniandes
              </span>
              <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
                Postúlate al Hackathon
              </h1>
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                Un día completo en el campus de la Universidad de los Andes en Bogotá.
                Cupo limitado por aforo, almuerzo incluido y COP 2.000.000 en premios.
              </p>
              <p className="text-body font-semibold text-aisc-sand">
                Cierre de postulaciones: martes 10 de noviembre, 11:59 p.m. (hora de Bogotá).
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Image
                src="/aisc/hackathon/cyberbear.png"
                alt="Oso de anteojos · Defensive Acceleration Hackathon"
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
                Si quieres, antes de postularte puedes ver los 6 frentes temáticos y la rúbrica de evaluación en la{" "}
                <Link
                  className="font-medium text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/defacchackathon"
                >
                  guía completa del hackathon
                </Link>
                .
              </div>
            </div>
          ) : null}

          <DefAccApplyForm cerrado={cerrado} noIniciado={noIniciado} idioma="es" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
