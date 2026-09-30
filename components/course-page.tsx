import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK_PRIMARY, HERO_CORNER_CLASS, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { RUTA_APLICAR_CURSOS, cursosCerrados, type CursoId } from "@/lib/cursos";
import { BLUEDOT_CURSO, FACILITADORES, PAGINAS_CURSO, ROTULOS_CURSO, RUTA_CURSO } from "@/lib/cursos-paginas";
import type { Idioma } from "@/lib/idiomas";

/* La página de cada curso, corta: el hero con una frase y el botón, y debajo
   una sola columna angosta con los datos, el temario por semanas, quién
   facilita y las preguntas plegadas. Al modo del Technical Fellowship de
   Columbia y del AISF de MIT, que caben en una pantalla y media. */

const COLUMNA = "mx-auto w-full max-w-[820px] px-6 md:px-8";
const TITULO = "text-display-3 md:text-display-3-lg text-aisc-ink";
const ENLACE = "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-coral";
const LINEA = "border-t border-aisc-ink/15";

export default function CoursePage({ idioma, curso }: { idioma: Idioma; curso: CursoId }) {
  const p = PAGINAS_CURSO[curso][idioma];
  const r = ROTULOS_CURSO[idioma];
  const cerrado = cursosCerrados();
  const aplicar = `${RUTA_APLICAR_CURSOS[idioma]}?curso=${curso}`;
  const facilitan = FACILITADORES[curso];
  const otro: CursoId = curso === "agi-strategy" ? "technical-ai-safety" : "agi-strategy";

  const hechos = [
    { rotulo: r.fechas, valor: p.fechas },
    { rotulo: r.dedicacion, valor: p.dedicacion },
    { rotulo: r.costo, valor: r.costoValor },
    { rotulo: r.plazo, valor: cerrado ? r.cerradoValor : r.plazoValor },
  ];

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
        <SiteHeader active={RUTA_CURSO[curso][idioma]} />
        {/* El hero arranca en la misma columna que el cuerpo. */}
        <div className={`${COLUMNA} relative z-10 pt-28 pb-12 md:pt-32 md:pb-16`}>
          <div className="flex flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">{p.kicker}</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">{p.metaTitulo}</h1>
            <p className="text-body md:text-body-lg text-aisc-sand/90">{p.entrada}</p>
            {cerrado ? null : (
              <a className={`${CTA_LINK_PRIMARY} mt-2 w-fit`} href={aplicar}>
                {r.aplicar}
              </a>
            )}
          </div>
        </div>
      </section>

      <div className={`${COLUMNA} flex flex-col gap-14 py-14 md:gap-16 md:py-20`}>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {hechos.map((h) => (
            <div className="flex flex-col gap-1" key={h.rotulo}>
              <dt className="text-kicker text-aisc-muted">{h.rotulo}</dt>
              <dd className="text-body font-medium text-aisc-ink">{h.valor}</dd>
            </div>
          ))}
        </dl>

        <section id="temario" className="flex scroll-mt-24 flex-col gap-6">
          <h2 className={TITULO}>{r.temario}</h2>
          <ol className="flex flex-col">
            {p.unidades.map((u, i) => (
              <li className={`${LINEA} grid grid-cols-1 gap-1 py-4 sm:grid-cols-[96px_1fr] sm:gap-6`} key={u.titulo}>
                <span className="text-body-sm text-aisc-muted sm:pt-0.5">
                  {r.semana} {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-body md:text-body-lg font-medium text-aisc-ink">{u.titulo}</h3>
                  <p className="text-body-sm text-aisc-muted">{u.cuerpo}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-body-sm -mt-2">
            <a className={ENLACE} href={BLUEDOT_CURSO[curso]} target="_blank" rel="noopener noreferrer">
              {r.temarioEnlace} →
            </a>
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className={TITULO}>{facilitan.length > 1 ? r.facilitan : r.facilita}</h2>
          <ul className="flex flex-col gap-2">
            {facilitan.map((f) => (
              <li className="text-body text-aisc-ink" key={f.nombre}>
                <a className={ENLACE} href={f.linkedin} target="_blank" rel="noopener noreferrer">
                  {f.nombre}
                </a>
                <span className="text-aisc-muted">, {f.afiliacion}</span>
              </li>
            ))}
          </ul>
          <p className="text-body mt-4 text-aisc-ink">
            {p.otro}{" "}
            <a className={ENLACE} href={RUTA_CURSO[otro][idioma]}>
              {PAGINAS_CURSO[otro][idioma].metaTitulo}
            </a>
            .
          </p>
        </section>

        <section id="preguntas" className="flex flex-col gap-6">
          <h2 className={TITULO}>{r.faq}</h2>
          <ul className="flex flex-col border-b border-aisc-ink/15">
            {p.faq.map((f) => (
              <li key={f.q}>
                <details className={`group ${LINEA}`}>
                  <summary className="text-body md:text-body-lg flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span aria-hidden="true" className="shrink-0 text-aisc-muted transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-body-sm max-w-[680px] pb-5 text-aisc-muted">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>

        {cerrado ? null : (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a className={CTA_LINK_PRIMARY} href={aplicar}>
              {r.aplicar}
            </a>
            <span className="text-body-sm text-aisc-muted">{r.plazoValor}</span>
          </div>
        )}
      </div>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
