import type { Metadata } from "next";
import Link from "next/link";
import BodyMain from "@/components/body-main";
import { FondoBinario } from "@/components/defacc-page";
import { ListaConBuscador, Tarjeta, type TarjetaProyecto } from "@/components/defacc-proyectos-cliente";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";
import { openGraph } from "@/lib/metadatos";
import {
  NOMBRE_PUESTO,
  NOMBRE_EVENTO,
  RUTA_PROYECTOS,
  proyectosPublicos,
  type ProyectoPublico,
} from "@/lib/defacc-proyectos";
import { COL, ENLACE, H2, P } from "../../sprint/guia-comun";

/* Todos los proyectos del hackatón, al modo de Apart: primero el podio y
   después todas las entregas con un buscador. Cada tarjeta lleva a la página
   del proyecto, con su informe, su código y los comentarios del jurado. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Proyectos | ${NOMBRE_EVENTO}`,
  description:
    "Los proyectos presentados al Defensive Acceleration Hackathon (Bogotá, 14 de noviembre de 2026), con su informe, su código y los comentarios anónimos del jurado.",
  alternates: { canonical: RUTA_PROYECTOS },
  openGraph: openGraph("es", RUTA_PROYECTOS),
};

function nombreTrack(t: string): string {
  return NOMBRES_TRACKS[t] ?? t;
}

function tarjeta(p: ProyectoPublico): TarjetaProyecto {
  return {
    slug: p.slug,
    titulo: p.titulo,
    equipo: p.equipo,
    track: nombreTrack(p.track),
    resumen: p.resumen,
    puesto: p.puesto ? NOMBRE_PUESTO[p.puesto] : null,
  };
}

export default async function ProyectosPage() {
  const proyectos = await proyectosPublicos();
  const podio = proyectos.filter((p) => p.puesto).map(tarjeta);
  const todos = proyectos.map(tarjeta);

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div className={`${HERO_INNER} flex flex-col gap-5 pt-10 pb-16 md:pt-14 md:pb-20`}>
          <p className="text-kicker text-aisc-sand/80">
            <Link href="/defacchackathon" className="hover:text-aisc-sand">
              {NOMBRE_EVENTO}
            </Link>{" "}
            · Bogotá · 14 nov 2026
          </p>
          <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
            Proyectos del hackatón
          </h1>
          <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
            {proyectos.length} equipos pasaron un día en la Universidad de los Andes construyendo
            prototipos que usan IA para defender sistemas, personas o información. Aquí está cada
            proyecto con su informe, su código y los comentarios anónimos del jurado.
          </p>
        </div>
      </section>

      <article className="bg-aisc-cream pb-16 md:pb-20">
        <BodyMain className="pt-14 md:pt-16">
          <div className={COL}>
            <p className={`${P} text-aisc-ink/80`}>
              Son trabajos de etapa temprana hechos en pocas horas. Los presentamos tal como los
              entregaron los equipos; no son publicaciones de AI Safety Colombia. Los comentarios
              del jurado se publican sin nombre ni nota.
            </p>
          </div>

          {podio.length ? (
            <>
              <H2 id="ganadores">Ganadores</H2>
              <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                {podio.map((p) => (
                  <Tarjeta key={p.slug} p={p} ruta={RUTA_PROYECTOS} />
                ))}
              </ul>
            </>
          ) : null}

          <H2 id="todos">Todos los proyectos</H2>
          <div className="mt-6">
            <ListaConBuscador proyectos={todos} ruta={RUTA_PROYECTOS} />
          </div>

          <div className={`${COL} mt-14`}>
            <p className={P}>
              ¿Hiciste parte de un equipo y quieres corregir algo de tu página? Escríbenos a{" "}
              <a className={ENLACE} href="mailto:equipo@aisafetycolombia.org">
                equipo@aisafetycolombia.org
              </a>
              .
            </p>
          </div>
        </BodyMain>
      </article>
      <SiteFooter />
    </main>
  );
}
