import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { FondoBinario } from "@/components/defacc-page";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

/* Marco de /defacchackathon/confirmar. Es el mismo de la confirmación del
   sprint, con los datos del sábado y el fondo y el oso de la guía del DefAcc. El aviso de enlace roto se reusa tal cual
   desde components/confirmar-marco. */

export function DefaccConfirmarMarco({ children }: { children: React.ReactNode }) {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div
          className={`${HERO_INNER} items-start gap-6 md:flex-row md:items-end md:justify-between`}
        >
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">
              DefAcc Hackathon · sábado 14 de noviembre
            </span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Confirma tu cupo
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              Quedaste en el DefAcc Hackathon. Confírmanos que vienes para guardar tu cupo. Toma
              menos de un minuto.
            </p>
            <p className="text-body-sm max-w-[660px] text-aisc-sand/80">
              El registro abre a las 8:00. Trae tu documento de identidad original para entrar al
              campus. El almuerzo va por nuestra cuenta.
            </p>
            <dl className="mt-2 flex flex-wrap gap-x-12 gap-y-5">
              <div>
                <dt className="text-kicker text-aisc-sand/60">Cuándo</dt>
                <dd className="text-body-sm mt-1.5 text-aisc-sand">
                  Sábado 14 de noviembre, 8 a. m. a 8 p. m.
                </dd>
              </div>
              <div>
                <dt className="text-kicker text-aisc-sand/60">Dónde</dt>
                <dd className="text-body-sm mt-1.5 text-aisc-sand">
                  Universidad de los Andes, Bogotá
                </dd>
              </div>
            </dl>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aisc/hackathon/cyberbear-clean.png"
            alt="Oso de anteojos, mascota del hackatón"
            width={180}
            height={277}
            className="order-first h-32 w-auto shrink-0 object-contain drop-shadow-md md:order-none md:h-60"
          />
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {children}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
