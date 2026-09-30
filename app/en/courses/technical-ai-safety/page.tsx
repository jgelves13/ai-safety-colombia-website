import type { Metadata } from "next";
import CoursePage from "@/components/course-page";
import { PAGINAS_CURSO } from "@/lib/cursos-paginas";
import { alternativas } from "@/lib/idiomas";

const p = PAGINAS_CURSO["technical-ai-safety"].en;

export const metadata: Metadata = {
  title: p.metaTitulo,
  description: p.metaDescripcion,
  alternates: { canonical: "/en/courses/technical-ai-safety", languages: alternativas("/en/courses/technical-ai-safety") },
};

/* Se renderiza en cada visita para que el cierre del 11 de octubre no quede
   congelado en un prerender. */
export const dynamic = "force-dynamic";

export default function TechnicalAiSafety() {
  return <CoursePage idioma="en" curso="technical-ai-safety" />;
}
