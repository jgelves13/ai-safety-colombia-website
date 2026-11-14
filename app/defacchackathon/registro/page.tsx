import type { Metadata } from "next";
import { FondoBinario } from "@/components/defacc-page";
import DefAccRegistroForm from "@/components/defacc-registro-form";
import { bypassValido } from "@/components/defacc-submit-page";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { TEXTOS_HACKATHON } from "@/app/defacchackathon/datos";
import { esTokenPrueba } from "@/lib/defacc-entregas";
import { registroAbierto, registroPorAbrir } from "@/lib/defacc-registro";

export const metadata: Metadata = {
  title: "Registro de equipos · Defensive Acceleration Hackathon",
  description: "Registro de equipos del Defensive Acceleration Hackathon.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const TARJETA = "rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11";

export default async function Pagina({ searchParams }: { searchParams: Promise<{ bypass?: string }> }) {
  const { bypass: dado } = await searchParams;
  const bypass = bypassValido(dado);
  const tracks = TEXTOS_HACKATHON.es.kits.listaTracks.map((t) => ({
    id: t.id,
    titulo: `Track ${Number(t.numero)}: ${t.titulo}`,
  }));
  const abierto = registroAbierto() || !!bypass;
  const porAbrir = registroPorAbrir();

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[700px] flex-col gap-4">
            <span className="text-kicker text-aisc-sand/70">DefAcc Hackathon · Registro</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">Registren su equipo</h1>
            <p className="text-body md:text-body-lg text-aisc-sand/90">
              Nombre del equipo, integrantes y track, el sábado de 10:00 a 11:00 a. m. Con esta lista sorteamos el
              orden de los pitches y lo publicamos a las 2:00 p. m.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {bypass && esTokenPrueba(bypass) ? (
            <p className="mb-6 rounded-lg border border-aisc-forest/40 bg-aisc-cream px-4 py-3 text-body text-aisc-ink">
              Modo prueba: este registro queda marcado como prueba, no envía correos y no entra al sorteo.
            </p>
          ) : null}
          {abierto ? (
            <DefAccRegistroForm tracks={tracks} bypass={bypass ?? ""} />
          ) : (
            <div className={TARJETA}>
              <h2 className="text-display-3 text-aisc-ink">
                {porAbrir ? "El registro abre a las 10:00 a. m." : "El registro cerró a las 11:00 a. m."}
              </h2>
              <p className="text-body mt-4 text-aisc-ink">
                {porAbrir
                  ? "Vuelvan a esta página a las 10:00 a. m. Estará abierto hasta las 11:00 a. m."
                  : "A las 2:00 p. m. publicamos el orden de los pitches en el grupo de WhatsApp y en la guía."}
              </p>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
