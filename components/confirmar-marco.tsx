import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CONFIRMA_LLAMADO, FECHAS, SEDE } from "@/app/sprint/datos";

/* El marco de las dos páginas de confirmación: la del enlace firmado
   (/sprint/confirmar) y la abierta (/sprint/confirmar/abierto). Vive acá para
   que el encabezado no se escriba dos veces y las fechas no se puedan
   desincronizar entre una página y la otra. */

export function ConfirmarMarco({ children }: { children: React.ReactNode }) {
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
            <span className="text-kicker text-aisc-sand/70">
              AI Incident Response Sprint · 11 al 13 de septiembre
            </span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Confirma tu cupo
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              {CONFIRMA_LLAMADO} Toma menos de un minuto.
            </p>
            {/* Lo práctico que hay que saber antes de decir que sí. Va acá y no
                dentro del formulario porque no es algo que haya que responder. */}
            <p className="text-body-sm max-w-[660px] text-aisc-sand/80">
              Nosotros ponemos la comida durante el sprint, y es vegana. El miércoles te llegan el
              material de preparación, la guía para participantes y el catálogo de quienes
              asistirán.
            </p>
            {/* El cuándo y el dónde van en el encabezado, no dentro del
                formulario: es la información que la persona viene a buscar y
                así el formulario se queda solo con lo que hay que responder. */}
            <dl className="mt-2 flex flex-wrap gap-x-12 gap-y-5">
              <div>
                <dt className="text-kicker text-aisc-sand/60">Cuándo</dt>
                <dd className="text-body-sm mt-1.5 text-aisc-sand">{FECHAS}</dd>
              </div>
              <div>
                <dt className="text-kicker text-aisc-sand/60">Dónde</dt>
                <dd className="text-body-sm mt-1.5 text-aisc-sand">{SEDE}</dd>
              </div>
            </dl>
          </div>
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

export function ConfirmarAviso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9 lg:p-11">
      <h2 className="text-display-3 md:text-display-3-lg text-balance text-aisc-ink">{titulo}</h2>
      <p className="text-body-sm mt-4 text-aisc-ink">{texto}</p>
      <p className="text-body-sm mt-4 text-aisc-ink">
        Escríbenos a{" "}
        <a
          className="text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
          href="mailto:equipo@aisafetycolombia.org"
        >
          equipo@aisafetycolombia.org
        </a>{" "}
        y lo resolvemos.
      </p>
    </div>
  );
}
