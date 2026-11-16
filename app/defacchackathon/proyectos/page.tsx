import type { Metadata } from "next";
import Link from "next/link";
import BodyMain from "@/components/body-main";
import { ListaConBuscador, type TarjetaProyecto } from "@/components/defacc-proyectos-cliente";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";
import { openGraph } from "@/lib/metadatos";
import {
  NOMBRE_EVENTO,
  NOMBRE_PUESTO,
  RUTA_PROYECTOS,
  nombresAutores,
  proyectosPublicos,
  type ProyectoPublico,
} from "@/lib/defacc-proyectos";

/* Todos los proyectos del hackatón, al modo de Apart: encabezado sobrio en
   blanco, buscador con filtros por track y una cuadrícula de tarjetas firmadas
   por sus participantes. Los ganadores van primero. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Proyectos | ${NOMBRE_EVENTO}`,
  description:
    "Los proyectos presentados al Defensive Acceleration Hackathon (Bogotá, 14 de noviembre de 2026), con su informe, su código y los comentarios anónimos del jurado.",
  alternates: { canonical: RUTA_PROYECTOS },
  openGraph: openGraph("es", RUTA_PROYECTOS),
};

function tarjeta(p: ProyectoPublico): TarjetaProyecto {
  return {
    slug: p.slug,
    titulo: p.titulo,
    autores: nombresAutores(p.autores),
    track: NOMBRES_TRACKS[p.track] ?? p.track,
    resumen: p.resumen,
    puesto: p.puesto ? NOMBRE_PUESTO[p.puesto] : null,
  };
}

export default async function ProyectosPage() {
  const proyectos = await proyectosPublicos();

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/defacchackathon" />
        <div className="h-[84px] md:h-[92px]" />
      </section>

      <div className="bg-white pb-20 md:pb-28">
        <BodyMain className="pt-10 md:pt-14">
          <nav aria-label="Migas de pan" className="text-[0.875rem] text-aisc-muted">
            <Link href="/defacchackathon" className="hover:text-aisc-forest-deep hover:underline">
              DefAcc Hackathon
            </Link>
            <span className="mx-2 text-aisc-line" aria-hidden="true">/</span>
            <span className="text-aisc-ink">Proyectos</span>
          </nav>

          <h1 className="font-display mt-6 text-[2.5rem] leading-[1.08] font-medium tracking-[-0.035em] text-balance text-aisc-forest-deep md:text-[3.75rem]">
            Proyectos del hackatón
          </h1>
          <p className="mt-5 max-w-[768px] text-[1.0625rem] leading-[1.65] text-aisc-muted md:text-[1.125rem]">
            {proyectos.length} proyectos presentados al {NOMBRE_EVENTO} (Bogotá, 14 de noviembre
            de 2026), con su informe, su código y los comentarios anónimos del jurado. Son
            trabajos tempranos de sus participantes, no publicaciones de AI Safety Colombia.
          </p>

          <div className="mt-10 md:mt-12">
            <ListaConBuscador proyectos={proyectos.map(tarjeta)} ruta={RUTA_PROYECTOS} />
          </div>

          <p className="mt-16 border-t border-aisc-line pt-6 text-[0.9375rem] text-aisc-muted">
            ¿Participaste y quieres corregir algo de tu página? Escríbenos a{" "}
            <a
              className="text-aisc-forest underline decoration-aisc-forest/35 underline-offset-4 hover:decoration-aisc-forest"
              href="mailto:equipo@aisafetycolombia.org"
            >
              equipo@aisafetycolombia.org
            </a>
            .
          </p>
        </BodyMain>
      </div>
      <SiteFooter />
    </main>
  );
}
