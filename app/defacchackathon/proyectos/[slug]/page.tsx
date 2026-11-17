import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BodyMain from "@/components/body-main";
import { Cita, Comentario, Compartir, Puesto, Tarjeta, type TarjetaProyecto } from "@/components/defacc-proyectos-cliente";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";
import { openGraph } from "@/lib/metadatos";
import {
  FECHA_EVENTO,
  NOMBRE_EVENTO,
  NOMBRE_PUESTO,
  RUTA_PROYECTOS,
  SITIO,
  bibtex,
  comentariosDe,
  masProyectos,
  nombresAutores,
  proyectoPublico,
  proyectosPublicos,
  type ProyectoPublico,
} from "@/lib/defacc-proyectos";

/* La página de cada proyecto, en el orden de Apart: migas, etiquetas, título,
   autores y aviso de trabajo temprano; luego el resumen con el informe y el
   código a la derecha, los comentarios del jurado, la cita y, al pie, más
   proyectos del mismo hackatón. Firmado por sus participantes, nunca por el
   nombre del equipo. */

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const ETIQUETA =
  "inline-flex items-center rounded-full border border-aisc-line px-2.5 py-1 text-[0.75rem] leading-none font-medium tracking-[0.04em] text-aisc-muted uppercase";
const H2 = "text-[1rem] font-semibold text-aisc-ink";
const PARRAFO = "text-[1.0625rem] leading-[1.65] text-aisc-ink md:text-[1.125rem]";

function nombreTrack(t: string): string {
  return NOMBRES_TRACKS[t] ?? t;
}

function corto(t: string, n = 158): string {
  const limpio = t.replace(/\s+/g, " ").trim();
  return limpio.length > n ? `${limpio.slice(0, n - 1).trimEnd()}…` : limpio;
}

function tarjeta(p: ProyectoPublico): TarjetaProyecto {
  return {
    slug: p.slug,
    titulo: p.titulo,
    autores: nombresAutores(p.autores),
    track: nombreTrack(p.track),
    resumen: p.resumen,
    puesto: p.puesto ? NOMBRE_PUESTO[p.puesto] : null,
    portada: p.portada,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await proyectoPublico(slug);
  if (!p) return { title: `Proyecto no encontrado | ${NOMBRE_EVENTO}`, robots: { index: false } };
  const ruta = `${RUTA_PROYECTOS}/${p.slug}`;
  return {
    title: `${p.titulo} | DefAcc Hackathon`,
    description: corto(p.resumen),
    authors: p.autores.map((name) => ({ name })),
    alternates: { canonical: ruta },
    openGraph: { ...openGraph("es", ruta), type: "article" },
  };
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const p = await proyectoPublico(slug);
  if (!p) notFound();

  const [comentarios, todos] = await Promise.all([comentariosDe(p.slug), proyectosPublicos()]);
  const otros = masProyectos(todos, p.slug).map(tarjeta);
  const url = `${SITIO}${RUTA_PROYECTOS}/${p.slug}`;
  const parrafos = p.resumen.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean);

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/defacchackathon" />
        <div className="h-[84px] md:h-[92px]" />
      </section>

      <article className="bg-white pb-20 md:pb-24">
        <BodyMain className="pt-10 md:pt-14">
          <nav aria-label="Migas de pan" className="text-[0.875rem] text-aisc-muted">
            <Link href="/defacchackathon" className="hover:text-aisc-forest-deep hover:underline">
              DefAcc Hackathon
            </Link>
            <span className="mx-2 text-aisc-line" aria-hidden="true">/</span>
            <Link href="/defacchackathon#proyectos" className="hover:text-aisc-forest-deep hover:underline">
              Proyectos
            </Link>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {p.puesto ? <Puesto texto={NOMBRE_PUESTO[p.puesto]} /> : null}
            <span className={ETIQUETA}>Proyecto de hackatón</span>
            <span className={ETIQUETA}>{FECHA_EVENTO}</span>
            <span className={ETIQUETA}>Bogotá</span>
            <span className={ETIQUETA}>{nombreTrack(p.track)}</span>
          </div>

          <h1 className="font-display mt-5 max-w-[960px] text-[2.25rem] leading-[1.08] font-medium tracking-[-0.035em] text-balance text-aisc-forest-deep md:text-[3.75rem]">
            {p.titulo}
          </h1>
          <p className="mt-5 max-w-[860px] text-[1.0625rem] leading-[1.5] text-aisc-ink md:text-[1.125rem]">
            {nombresAutores(p.autores)}
          </p>
          <p className="mt-2 max-w-[768px] text-[0.875rem] leading-[1.55] text-aisc-muted">
            Presentado al {NOMBRE_EVENTO}. Es un trabajo temprano de sus participantes y no una
            publicación de AI Safety Colombia.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-12 border-t border-aisc-line pt-10 lg:grid-cols-[minmax(0,1fr)_256px] lg:gap-20">
            <aside className="order-first lg:order-none lg:col-start-2 lg:row-start-1">
              <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-aisc-line bg-aisc-sand/40 p-5 lg:sticky lg:top-32">
                {p.portada ? (
                  <a
                    href={`${RUTA_PROYECTOS}/${p.slug}/informe`}
                    target="_blank"
                    rel="noopener"
                    aria-label="Abrir el informe en PDF"
                    className="group mb-2 block"
                  >
                    <img
                      src={p.portada}
                      alt=""
                      width={900}
                      height={1165}
                      className="aspect-[4/3] w-full bg-white object-cover object-top ring-1 ring-aisc-forest-deep/10 transition-transform duration-300 group-hover:-translate-y-1 lg:aspect-[4/5]"
                    />
                  </a>
                ) : null}
                {p.tienePdf ? (
                  <a
                    className="inline-flex h-11 items-center justify-center rounded-[var(--radius)] bg-aisc-forest-deep px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-aisc-forest"
                    href={`${RUTA_PROYECTOS}/${p.slug}/informe`}
                    target="_blank"
                    rel="noopener"
                  >
                    Leer el informe →
                  </a>
                ) : null}
                {p.enlace ? (
                  <a
                    className="inline-flex h-11 items-center justify-center rounded-[var(--radius)] border border-aisc-line px-5 text-[0.9375rem] font-medium text-aisc-ink transition-colors hover:border-aisc-forest hover:text-aisc-forest-deep"
                    href={p.enlace}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    Código ↗
                  </a>
                ) : null}
                {p.tienePdf || p.enlace ? <hr className="my-2 border-aisc-line" /> : null}
                <Compartir url={url} titulo={p.titulo} />
              </div>
            </aside>

            <div className="max-w-[680px] lg:col-start-1 lg:row-start-1">
              <h2 className={H2}>Resumen</h2>
              <div className="mt-4 flex flex-col gap-5">
                {parrafos.map((t, i) => (
                  <p key={i} className={`${PARRAFO} whitespace-pre-line`}>
                    {t}
                  </p>
                ))}
              </div>

              <hr className="my-12 border-aisc-line" />

              <h2 id="comentarios" className={H2}>
                Comentarios del jurado
              </h2>
              {comentarios.length ? (
                <>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-aisc-muted">
                    Escritos por el jurado durante la evaluación. Se publican sin nombre, sin nota y
                    en orden aleatorio.
                  </p>
                  <ol className="mt-6 flex flex-col gap-3">
                    {comentarios.map((c, i) => (
                      <Comentario key={i} texto={c} />
                    ))}
                  </ol>
                </>
              ) : (
                <p className="mt-2 text-[0.9375rem] leading-[1.6] text-aisc-muted">
                  El jurado no dejó comentarios escritos sobre este proyecto.
                </p>
              )}

              <h2 id="citar" className={`${H2} mt-12`}>
                Citar este proyecto
              </h2>
              <div className="mt-4">
                <Cita bibtex={bibtex(p)} />
              </div>
            </div>
          </div>
        </BodyMain>
      </article>

      {otros.length ? (
        <section className="bg-aisc-sand py-14 md:py-16">
          <BodyMain>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[1.5rem] font-medium tracking-[-0.02em] text-aisc-forest-deep md:text-[1.75rem]">
                Más del {NOMBRE_EVENTO}
              </h2>
              <Link
                href="/defacchackathon#proyectos"
                className="text-[0.9375rem] font-medium text-aisc-forest hover:text-aisc-forest-deep hover:underline"
              >
                Ver todos los proyectos →
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {otros.map((o) => (
                <Tarjeta key={o.slug} p={o} ruta={RUTA_PROYECTOS} />
              ))}
            </ul>
          </BodyMain>
        </section>
      ) : null}
      <SiteFooter />
    </main>
  );
}
