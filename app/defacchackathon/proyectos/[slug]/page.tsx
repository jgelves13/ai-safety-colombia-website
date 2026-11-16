import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BodyMain from "@/components/body-main";
import { FondoBinario } from "@/components/defacc-page";
import { Cita, Comentario, Compartir, Tarjeta } from "@/components/defacc-proyectos-cliente";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK, CTA_LINK_PRIMARY, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
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
  proyectoPublico,
  proyectosPublicos,
} from "@/lib/defacc-proyectos";
import { COL, ENLACE, H2, P } from "../../../sprint/guia-comun";

/* La página de cada proyecto, en el orden de Apart: migas, etiquetas, título,
   autores, aviso de trabajo temprano, informe y código, compartir, resumen,
   comentarios del jurado, cita y más proyectos. */

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

const ETIQUETA = "text-meta rounded-full border border-aisc-sand/40 px-3 py-1 text-aisc-sand/90";

function nombreTrack(t: string): string {
  return NOMBRES_TRACKS[t] ?? t;
}

function corto(t: string, n = 158): string {
  const limpio = t.replace(/\s+/g, " ").trim();
  return limpio.length > n ? `${limpio.slice(0, n - 1).trimEnd()}…` : limpio;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await proyectoPublico(slug);
  if (!p) return { title: `Proyecto no encontrado | ${NOMBRE_EVENTO}`, robots: { index: false } };
  const ruta = `${RUTA_PROYECTOS}/${p.slug}`;
  return {
    title: `${p.titulo} | DefAcc Hackathon`,
    description: corto(p.resumen),
    alternates: { canonical: ruta },
    openGraph: { ...openGraph("es", ruta), type: "article" },
  };
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const p = await proyectoPublico(slug);
  if (!p) notFound();

  const [comentarios, todos] = await Promise.all([comentariosDe(p.slug), proyectosPublicos()]);
  const otros = masProyectos(todos, p.slug).map((o) => ({
    slug: o.slug,
    titulo: o.titulo,
    equipo: o.equipo,
    track: nombreTrack(o.track),
    resumen: o.resumen,
    puesto: o.puesto ? NOMBRE_PUESTO[o.puesto] : null,
  }));
  const url = `${SITIO}${RUTA_PROYECTOS}/${p.slug}`;

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div className={`${HERO_INNER} flex flex-col gap-5 pt-10 pb-16 md:pt-14 md:pb-20`}>
          <nav aria-label="Migas de pan" className="text-meta text-aisc-sand/75">
            <Link href="/defacchackathon" className="hover:text-aisc-sand">
              DefAcc Hackathon
            </Link>
            {" / "}
            <Link href={RUTA_PROYECTOS} className="hover:text-aisc-sand">
              Proyectos
            </Link>
          </nav>
          <div className="flex flex-wrap gap-2">
            {p.puesto ? (
              <span className="text-meta rounded-full bg-aisc-coral px-3 py-1 font-semibold text-aisc-cream">
                {NOMBRE_PUESTO[p.puesto]}
              </span>
            ) : null}
            <span className={ETIQUETA}>Proyecto de hackatón</span>
            <span className={ETIQUETA}>{FECHA_EVENTO}</span>
            <span className={ETIQUETA}>Bogotá</span>
            <span className={ETIQUETA}>{nombreTrack(p.track)}</span>
          </div>
          <h1 className="text-display-2 md:text-display-1 max-w-[900px] text-balance text-aisc-sand">
            {p.titulo}
          </h1>
          <p className="text-body md:text-body-lg max-w-[760px] text-aisc-sand/90">
            {p.autores.length ? `${p.autores.join(", ")} · ` : ""}
            Equipo {p.equipo}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {p.tienePdf ? (
              <a className={CTA_LINK_PRIMARY} href={`${RUTA_PROYECTOS}/${p.slug}/informe`} target="_blank" rel="noopener">
                Leer el informe
              </a>
            ) : null}
            {p.enlace ? (
              <a className={CTA_LINK} href={p.enlace} target="_blank" rel="noopener noreferrer nofollow">
                Código
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        <BodyMain className="pt-12 md:pt-14">
          <div className={COL}>
            <p className="text-body-sm rounded-[var(--radius)] border border-aisc-ink/12 bg-white/50 p-4 text-aisc-ink/85">
              Este es un trabajo de etapa temprana, hecho por participantes durante el{" "}
              {NOMBRE_EVENTO}. Se publica tal como lo entregó el equipo y no es una publicación
              de AI Safety Colombia.
            </p>
            <div className="mt-6">
              <Compartir url={url} titulo={p.titulo} />
            </div>
          </div>

          <H2 id="resumen">Resumen</H2>
          <div className={`${COL} mt-4`}>
            <p className={`${P} whitespace-pre-line`}>{p.resumen}</p>
          </div>

          <H2 id="comentarios">Comentarios del jurado</H2>
          <div className={`${COL} mt-4`}>
            {comentarios.length ? (
              <>
                <p className={`${P} text-aisc-ink/80`}>
                  Escritos por el jurado durante la evaluación. Se publican sin nombre, sin nota y
                  en orden aleatorio.
                </p>
                <ol className="mt-5 flex flex-col gap-3">
                  {comentarios.map((c, i) => (
                    <Comentario key={i} numero={i + 1} texto={c} />
                  ))}
                </ol>
              </>
            ) : (
              <p className={P}>El jurado no dejó comentarios escritos sobre este proyecto.</p>
            )}
          </div>

          <H2 id="citar">Citar este proyecto</H2>
          <div className={COL}>
            <Cita bibtex={bibtex(p)} />
          </div>

          {otros.length ? (
            <>
              <H2 id="mas">Más de DefAcc</H2>
              <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                {otros.map((o) => (
                  <Tarjeta key={o.slug} p={o} ruta={RUTA_PROYECTOS} />
                ))}
              </ul>
            </>
          ) : null}

          <div className={`${COL} mt-10`}>
            <Link className={ENLACE} href={RUTA_PROYECTOS}>
              Ver todos los proyectos
            </Link>
          </div>
        </BodyMain>
      </article>
      <SiteFooter />
    </main>
  );
}
