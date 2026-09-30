import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  CTA_PATTERN_BOTTOM,
  CTA_PATTERN_TOP,
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { RUTA_APLICAR_CURSOS, RUTA_UNETE, TEXTOS_CURSOS, cursosCerrados, type CursoId } from "@/lib/cursos";
import { BLUEDOT_CURSO, FACILITADORES, PAGINAS_CURSO, ROTULOS_CURSO, RUTA_CURSO } from "@/lib/cursos-paginas";
import type { Idioma } from "@/lib/idiomas";

/* La página de cada curso, en el molde de la del sprint: hero oscuro, tres
   cifras en tarjetas, secciones separadas por un hilo y el panel de cierre.
   El contenido sale de lib/cursos-paginas.ts; cada ruta solo pone el idioma,
   el curso y sus metadatos. */

const SECCION = "bg-aisc-cream";
const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const HAIRLINE = "h-px w-full flex-none bg-aisc-forest-deep";
const ENCABEZADO = "mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-6";
const PROSA = "text-body md:text-body-lg flex max-w-[640px] flex-col gap-5 text-aisc-ink";
const TARJETA =
  "flex min-h-[104px] flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-5 md:min-h-[114px] md:p-6";
const ENLACE = "underline underline-offset-[3px] transition-colors hover:text-aisc-coral";
const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";

function iniciales(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("");
}

function Encabezado({ titulo, children }: { titulo: string; children?: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className={HAIRLINE} />
      <div className={ENCABEZADO}>
        <h2 className="text-display-2 md:text-display-2-lg break-words">{titulo}</h2>
        {children ? <div className={PROSA}>{children}</div> : null}
      </div>
    </>
  );
}

export default function CoursePage({ idioma, curso }: { idioma: Idioma; curso: CursoId }) {
  const p = PAGINAS_CURSO[curso][idioma];
  const r = ROTULOS_CURSO[idioma];
  const cierreTexto = TEXTOS_CURSOS[idioma].cierre;
  const cerrado = cursosCerrados();
  const aplicar = `${RUTA_APLICAR_CURSOS[idioma]}?curso=${curso}`;
  const facilitan = FACILITADORES[curso];

  const botones = (centrados: boolean) => (
    <div className={`mt-2 flex flex-wrap items-center gap-3 ${centrados ? "justify-center" : ""}`}>
      {cerrado ? null : (
        <a className={CTA_LINK_PRIMARY} href={aplicar}>
          {p.aplicar}
        </a>
      )}
      {centrados ? (
        <a className={CTA_LINK} href={RUTA_UNETE[idioma]}>
          {p.volver}
        </a>
      ) : (
        <a className={CTA_LINK} href="#temario">
          {r.temarioAncla}
        </a>
      )}
    </div>
  );

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
        <div className={HERO_INNER}>
          <div className="flex max-w-[860px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">{p.kicker}</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">{p.metaTitulo}</h1>
            <p className="text-body md:text-body-lg max-w-[680px] text-aisc-sand/90">{p.entrada}</p>
            <p className="text-body-sm mt-1 w-fit text-aisc-sand/75">{cerrado ? p.cerrado : cierreTexto}</p>
            {botones(false)}
          </div>
        </div>
      </section>

      <section className={`${SECCION} pt-9 pb-10 md:pt-10 md:pb-12`}>
        <div className={`${CONTENEDOR} flex flex-col gap-12 md:gap-14`}>
          <dl className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
            {p.datos.map((d) => (
              <div
                className="flex min-h-[122px] flex-col justify-start rounded-[8px] bg-aisc-forest-deep px-5 py-5 text-aisc-sand md:min-h-[142px] md:px-7 md:py-7"
                key={d.valor}
              >
                <dt className="text-display-4 md:text-display-4-lg break-words">{d.valor}</dt>
                <dd className="text-body-sm mt-3 text-aisc-sand">{d.nota}</dd>
              </div>
            ))}
          </dl>

          {/* Para quién es */}
          <section id="para-quien" className="flex flex-col gap-5">
            <Encabezado titulo={p.paraQuienTitulo}>
              {p.paraQuien.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
              {p.perfiles ? null : <p className="font-medium text-aisc-forest">{p.paraQuienCierre}</p>}
            </Encabezado>
            {p.perfiles ? (
              <>
                <ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
                  {p.perfiles.map((b) => (
                    <li className={TARJETA} key={b.titulo}>
                      <h3 className="text-display-4 md:text-display-4-lg text-balance text-aisc-forest">{b.titulo}</h3>
                      <p className="text-body-sm text-aisc-ink">{b.cuerpo}</p>
                    </li>
                  ))}
                </ul>
                <p className="text-body md:text-body-lg font-medium text-aisc-forest">{p.paraQuienCierre}</p>
              </>
            ) : null}
          </section>

          {/* Qué te llevas */}
          <section id="beneficios" className="flex flex-col gap-5">
            <Encabezado titulo={p.beneficiosTitulo} />
            <ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
              {p.beneficios.map((b) => (
                <li className={TARJETA} key={b.titulo}>
                  <h3 className="text-display-4 md:text-display-4-lg text-balance text-aisc-forest">{b.titulo}</h3>
                  <p className="text-body-sm text-aisc-ink">{b.cuerpo}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Temario */}
          <section id="temario" className="flex scroll-mt-24 flex-col gap-5">
            <Encabezado titulo={p.temarioTitulo}>
              <p>{p.temarioEntrada}</p>
              <p className="text-body-sm">
                <a className={ENLACE} href={BLUEDOT_CURSO[curso]} target="_blank" rel="noopener noreferrer">
                  {p.temarioEnlace}
                </a>
              </p>
            </Encabezado>
            <ol className="mt-3 flex flex-col">
              {p.unidades.map((u, i) => (
                <li
                  className="grid grid-cols-1 gap-2 border-t border-aisc-ink/20 py-5 md:grid-cols-[180px_1fr_1.4fr] md:gap-6"
                  key={u.titulo}
                >
                  <span className="text-kicker text-aisc-muted">
                    {r.unidad} {i + 1}
                  </span>
                  <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">{u.titulo}</h3>
                  <p className="text-body-sm text-aisc-ink">{u.cuerpo}</p>
                </li>
              ))}
            </ol>
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-ink/20" />
          </section>

          {/* Cómo funciona */}
          <section id="como-funciona" className="flex flex-col gap-5">
            <Encabezado titulo={p.comoTitulo} />
            <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              {p.como.map((c) => (
                <div className={TARJETA} key={c.titulo}>
                  <dt className="text-kicker text-aisc-muted">{c.titulo}</dt>
                  <dd className="text-body-sm text-aisc-ink">{c.cuerpo}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Quién facilita */}
          <section id="facilitan" className="flex flex-col gap-5">
            <Encabezado titulo={p.facilitanTitulo}>
              <p>{p.facilitanEntrada}</p>
            </Encabezado>
            <ul className="mt-3 flex flex-wrap gap-6">
              {facilitan.map((f) => (
                <li className="flex w-[calc((100%_-_1.5rem)/2)] flex-col gap-3 sm:w-[calc((100%_-_3rem)/3)] lg:w-[calc((100%_-_6rem)/5)]" key={f.nombre}>
                  <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-aisc-sand">
                    <span className="text-display-2 md:text-display-2-lg text-aisc-forest/45" aria-hidden="true">
                      {iniciales(f.nombre)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-display-4 font-semibold text-aisc-forest">
                      <a
                        className="underline decoration-aisc-forest/30 underline-offset-4 transition-colors hover:text-aisc-coral hover:decoration-aisc-coral"
                        href={f.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {f.nombre}
                      </a>
                    </span>
                    <span className="text-body-sm text-aisc-muted">{f.afiliacion}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Qué sigue */}
          <section id="despues" className="flex flex-col gap-5">
            <Encabezado titulo={p.despuesTitulo}>
              <p>{p.despuesEntrada}</p>
            </Encabezado>
            <ul className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
              {p.despues.map((d) => (
                <li key={d.titulo}>
                  <a
                    className="flex h-full min-h-[190px] w-full flex-col justify-between gap-8 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 transition-colors hover:bg-aisc-sand md:p-7"
                    href={d.href}
                    {...(d.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <h3 className="text-display-4 md:text-display-4-lg text-aisc-forest">{d.titulo}</h3>
                    <p className="text-body-sm text-aisc-ink">{d.cuerpo}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section id="preguntas" className={`${SECCION} py-12 md:py-14`}>
        <div className={CONTENEDOR}>
          <div aria-hidden="true" className={HAIRLINE} />
          <div className="mt-5 flex flex-col gap-8">
            <h2 className="text-display-2 md:text-display-2-lg break-words">{p.faqTitulo}</h2>
            <ul className="flex flex-col">
              {p.faq.map((f) => (
                <li key={f.q}>
                  <details className="group border-t border-aisc-ink/20">
                    <summary className="text-display-4 md:text-display-4-lg flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                      <span className="text-balance">{f.q}</span>
                      <span aria-hidden="true" className="shrink-0 text-aisc-coral transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="text-body-sm max-w-[860px] pb-5 text-aisc-muted">{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
            <div aria-hidden="true" className="h-px w-full flex-none bg-aisc-ink/20" />
          </div>
        </div>
      </section>

      {/* El cierre, como el del sprint */}
      <section className="bg-aisc-cream px-6">
        <div className="mx-auto w-full max-w-[1400px] py-12 md:py-14 lg:py-16">
          <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep px-6 py-16 text-center text-aisc-sand md:py-20">
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_TOP}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <img
              alt=""
              aria-hidden="true"
              loading="lazy"
              width="1697"
              height="995"
              decoding="async"
              className={CTA_PATTERN_BOTTOM}
              style={{ color: "transparent" }}
              src={PATRON}
            />
            <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-6">
              <span className="text-body-sm text-aisc-sand/70">{cerrado ? p.cerrado : cierreTexto}</span>
              <h2 className="text-display-2 md:text-display-2-lg text-balance">{p.cierreTitulo}</h2>
              {botones(true)}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
