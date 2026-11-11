import type { ReactNode } from "react";
import { FondoBinario } from "@/components/defacc-page";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";

/* Marco común de las páginas internas del hackathon (jurados y resultados). */
export function MarcoPanel({
  kicker,
  titulo,
  texto,
  children,
}: {
  kicker: string;
  titulo: string;
  texto?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-4">
            <span className="text-kicker text-aisc-sand/70">{kicker}</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">{titulo}</h1>
            {texto ? <div className="text-body md:text-body-lg text-aisc-sand/90">{texto}</div> : null}
          </div>
        </div>
      </section>
      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[1100px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">{children}</div>
      </section>
      <SiteFooter />
    </main>
  );
}

export function BanderasIA({
  revision,
}: {
  revision: {
    fueraDeTema: boolean;
    motivoFueraDeTema: string;
    inyeccionPrompt: boolean;
    evidenciaInyeccion: string;
    hallazgosRegex: string[];
    resumen: string;
    error?: string;
  } | null;
}) {
  if (!revision) {
    return <p className="text-meta text-aisc-muted">Revisión automática pendiente.</p>;
  }
  const limpia = !revision.fueraDeTema && !revision.inyeccionPrompt;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {limpia ? (
          <span className="text-meta rounded-full border border-aisc-forest px-3 py-1 text-aisc-forest">Sin banderas</span>
        ) : null}
        {revision.fueraDeTema ? (
          <span className="text-meta rounded-full bg-aisc-coral px-3 py-1 text-aisc-cream">Posible fuera de tema</span>
        ) : null}
        {revision.inyeccionPrompt ? (
          <span className="text-meta rounded-full bg-aisc-coral px-3 py-1 text-aisc-cream">Posible inyección de prompt</span>
        ) : null}
        {revision.error ? (
          <span className="text-meta rounded-full border border-aisc-muted px-3 py-1 text-aisc-muted">Gemini falló, solo regex</span>
        ) : null}
      </div>
      {revision.fueraDeTema && revision.motivoFueraDeTema ? (
        <p className="text-meta text-aisc-muted">Motivo: {revision.motivoFueraDeTema}</p>
      ) : null}
      {revision.inyeccionPrompt && (revision.evidenciaInyeccion || revision.hallazgosRegex.length) ? (
        <p className="text-meta text-aisc-muted">
          Evidencia: {revision.evidenciaInyeccion || revision.hallazgosRegex.join(", ")}
        </p>
      ) : null}
      <p className="text-meta text-aisc-muted">
        Esto es solo una alerta automática. No afecta el puntaje; la decisión es del jurado.
      </p>
    </div>
  );
}
