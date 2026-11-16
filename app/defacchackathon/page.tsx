import type { Metadata } from "next";
import DefAccPage from "@/components/defacc-page";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";
import { NOMBRE_PUESTO, nombresAutores, proyectosPublicos } from "@/lib/defacc-proyectos";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

/* Lee los proyectos publicados en cada visita, como antes la página aparte. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Defensive Acceleration Hackathon · AI Safety Colombia × IEEE CS Uniandes",
  description:
    "Sábado 14 de noviembre de 2026 en la Universidad de los Andes, Bogotá. Un día para construir un prototipo que use IA para defender sistemas, personas o información. COP 2.000.000 en premios.",
  alternates: { canonical: "/defacchackathon", languages: alternativas("/defacchackathon") },
  openGraph: openGraph("es", "/defacchackathon"),
};

export default async function PaginaDefAccHackathon() {
  const proyectos = (await proyectosPublicos()).map((p) => ({
    slug: p.slug,
    titulo: p.titulo,
    autores: nombresAutores(p.autores),
    track: NOMBRES_TRACKS[p.track] ?? p.track,
    resumen: p.resumen,
    puesto: p.puesto ? NOMBRE_PUESTO[p.puesto] : null,
  }));
  return <DefAccPage idioma="es" proyectos={proyectos} />;
}
