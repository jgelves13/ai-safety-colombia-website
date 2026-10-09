import { Fragment } from "react";
import SiteFooter from "@/components/site-footer";
import IndicePolitica from "@/components/indice-politica";
import SiteHeader from "@/components/site-header";
import { HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import type { Idioma } from "@/lib/idiomas";
import { CORREO_DATOS, RUTA_POLITICA, TEXTOS_POLITICA, type Bloque } from "@/lib/politica-datos";

/* La política es la misma página en los tres idiomas; el texto vive en
   lib/politica-datos.ts y cada ruta solo pone sus metadatos.

   Es un documento legal y se ve como tal: encabezado sobrio sin ilustración,
   la versión a la vista, un índice numerado que acompaña la lectura en
   pantallas anchas y la ficha del responsable al abrir la primera sección. */

const ENLACE = "text-aisc-forest transition-colors hover:text-aisc-coral";

const ancla = (n: number) => `seccion-${n}`;

/** **negrita** y [enlace](/ruta), lo único que el texto necesita. */
function Linea({ texto }: { texto: string }) {
  const partes = texto.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {partes.map((p, i) => {
        const negrita = p.match(/^\*\*([^*]+)\*\*$/);
        if (negrita) return <strong key={i} className="font-semibold text-aisc-ink">{negrita[1]}</strong>;
        const enlace = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (enlace) return <a key={i} className={ENLACE} href={enlace[2]}>{enlace[1]}</a>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

function Bloques({ bloques }: { bloques: Bloque[] }) {
  return (
    <>
      {bloques.map((b, i) =>
        typeof b === "string" ? (
          <p key={i}>
            <Linea texto={b} />
          </p>
        ) : (
          <ul key={i} className="flex flex-col gap-2.5 pl-5 marker:text-aisc-forest list-disc">
            {b.map((punto) => (
              <li key={punto} className="pl-1">
                <Linea texto={punto} />
              </li>
            ))}
          </ul>
        ),
      )}
    </>
  );
}

export default function PoliticaDatosPagina({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS_POLITICA[idioma];
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active={RUTA_POLITICA[idioma]} />
        <div className="mx-auto w-full max-w-[1180px] px-6 pt-32 pb-12 md:px-8 md:pt-40 md:pb-16">
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">{t.kicker}</span>
            <h1 className="text-display-2 md:text-display-2-lg text-balance text-aisc-sand">{t.titulo}</h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/85">{t.entrada}</p>
            <p className="text-meta mt-2 text-aisc-sand/60">{t.vigencia}</p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 px-6 py-14 md:px-8 md:py-20 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-20">
          <IndicePolitica
            titulo={t.indice}
            secciones={t.secciones.map((s, i) => ({ id: ancla(i + 1), titulo: s.titulo }))}
          />

          <article className="max-w-[720px]">
            {t.secciones.map((s, i) => (
              <section
                key={s.titulo}
                id={ancla(i + 1)}
                className="scroll-mt-28 border-t border-aisc-line py-10 first:border-t-0 first:pt-0"
              >
                <h2 className="text-display-4 md:text-display-4-lg flex items-baseline gap-3 text-balance text-aisc-ink">
                  <span className="shrink-0 tabular-nums text-aisc-forest">{i + 1}.</span>
                  <span>{s.titulo}</span>
                </h2>
                <div className="text-body mt-5 flex flex-col gap-4 text-aisc-ink/85">
                  <Bloques bloques={s.bloques} />
                </div>
                {i === 0 && (
                  <dl className="mt-8">
                    {t.ficha.map((f) => (
                      <div
                        key={f.etiqueta}
                        className="grid grid-cols-1 gap-1 border-t border-aisc-line py-3 sm:grid-cols-[190px_1fr] sm:gap-6"
                      >
                        <dt className="text-meta text-aisc-muted">{f.etiqueta}</dt>
                        <dd className="text-body-sm text-aisc-ink">
                          {f.valor === CORREO_DATOS ? (
                            <a className={ENLACE} href={`mailto:${CORREO_DATOS}`}>
                              {f.valor}
                            </a>
                          ) : (
                            f.valor
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
            <p className="text-meta border-t border-aisc-line pt-6 text-aisc-muted">{t.vigencia}</p>
          </article>
        </div>
      </section>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
