import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { FondoBinario } from "@/components/defacc-page";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import RejillaParticipantes from "./rejilla";

/* Lista de participantes del DefAcc Hackathon. No se indexa y solo se enlaza
   desde la guía del participante. */

export const metadata: Metadata = {
  title: "Participantes · DefAcc Hackathon",
  robots: { index: false, follow: false },
};

const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";

export default function ParticipantesDefacc() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Quiénes vienen al DefAcc Hackathon
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              DefAcc Hackathon · Universidad de los Andes · sábado 14 de noviembre de 2026
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · solo para participantes seleccionados
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream py-14 md:py-16 lg:py-20">
        <div className={CONTENEDOR}>
          <div className="text-body md:text-body-lg flex flex-col gap-5 text-aisc-ink">
            <p>
              Aquí están las personas que confirmaron su cupo y aceptaron aparecer en la lista. La
              lista crece a medida que más gente confirma.
            </p>
            <p>
              El frente de cada persona sale de su aplicación y no es definitivo. Los equipos se
              arman el sábado, así que úsala para ver con quién te gustaría trabajar y escríbele en
              el grupo de WhatsApp.
            </p>
          </div>
          <RejillaParticipantes />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
