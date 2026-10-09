import { Fragment } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import type { Idioma } from "@/lib/idiomas";
import { RUTA_POLITICA, TEXTOS_POLITICA, type Bloque } from "@/lib/politica-datos";

/* La política es la misma página en los tres idiomas; el texto vive en
   lib/politica-datos.ts y cada ruta solo pone sus metadatos. */

const ENLACE = "text-aisc-forest transition-colors hover:text-aisc-coral";

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
          <ul key={i} className="list-disc space-y-2 pl-5">
            {b.map((punto) => (
              <li key={punto}>
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
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="1415"
          decoding="async"
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-unete.svg"
        />
        <SiteHeader active={RUTA_POLITICA[idioma]} />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">{t.kicker}</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">{t.titulo}</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">{t.entrada}</p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[760px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24">
          {t.secciones.map((s) => (
            <section key={s.titulo} className="border-t border-aisc-line pt-8 pb-10 first:border-t-0 first:pt-0">
              <h2 className="text-display-3 md:text-display-3-lg text-balance text-aisc-ink">{s.titulo}</h2>
              <div className="text-body mt-4 flex flex-col gap-4 text-aisc-ink/85">
                <Bloques bloques={s.bloques} />
              </div>
            </section>
          ))}
        </div>
      </section>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
