import type { Metadata } from "next";
import CoursePage from "@/components/course-page";
import { PAGINAS_CURSO } from "@/lib/cursos-paginas";
import { alternativas } from "@/lib/idiomas";

const p = PAGINAS_CURSO["agi-strategy"].es;

export const metadata: Metadata = {
  title: p.metaTitulo,
  description: p.metaDescripcion,
  alternates: { canonical: "/cursos/agi-strategy", languages: alternativas("/cursos/agi-strategy") },
};

/* Se renderiza en cada visita para que el cierre del 11 de octubre no quede
   congelado en un prerender. */
export const dynamic = "force-dynamic";

export default function AgiStrategy() {
  return <CoursePage idioma="es" curso="agi-strategy" />;
}
