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
  title: "Candidatura · Defensive Acceleration Hackathon",
  description:
    "Formulário de inscrição no Defensive Acceleration Hackathon, sábado 14 de novembro de 2026 na Universidad de los Andes, Bogotá. Co-organizado por AI Safety Colombia e IEEE Computer Society Uniandes.",
  alternates: {
    canonical: "/pt/defacchackathon/inscricao",
    languages: alternativas("/pt/defacchackathon/inscricao"),
  },
};

export const dynamic = "force-dynamic";

export default async function InscricaoDefAcc() {
  const cerrado = inscripcionesCerradas();
  const noIniciado = !inscripcionesIniciadas();

  return (
    <main lang="pt" className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/pt/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
            <div className="flex max-w-[700px] flex-col gap-4">
              <span className="text-kicker text-aisc-sand/70">
                Defensive Acceleration Hackathon · Sábado 14 de novembro de 2026 · Uniandes
              </span>
              <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
                Candidate-se ao Hackathon
              </h1>
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                Um dia inteiro no campus da Universidad de los Andes, em Bogotá.
                Vagas limitadas, almoço completo incluso e COP 2.000.000 em prêmios.
              </p>
              <p className="text-body font-semibold text-aisc-sand">
                Prazo para se candidatar: terça, 10 de novembro, 23:59 (horário de Bogotá).
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Image
                src="/aisc/hackathon/cyberbear.png"
                alt="Urso-de-óculos · Defensive Acceleration Hackathon"
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
                Se quiser, antes de se candidatar você pode ver as 6 frentes temáticas e os critérios de avaliação no{" "}
                <Link
                  className="font-medium text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/pt/defacchackathon"
                >
                  guia completo do hackathon
                </Link>
                .
              </div>
            </div>
          ) : null}

          <DefAccApplyForm cerrado={cerrado} noIniciado={noIniciado} idioma="pt" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
