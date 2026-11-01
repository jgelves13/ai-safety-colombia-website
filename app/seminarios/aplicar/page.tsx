import type { Metadata } from "next";
import CourseApplyPage from "@/components/course-apply-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Aplica a los seminarios",
  description:
    "Formulario de aplicación a los dos seminarios que corre AI Safety Colombia con materiales de BlueDot Impact: el Seminario de futuro y riesgos de la IA y el Seminario técnico de seguridad de la IA. Cierra el viernes 9 de octubre de 2026 a las 11:59 p. m.",
  alternates: { canonical: "/seminarios/aplicar", languages: alternativas("/seminarios/aplicar") },
};

/* Se renderiza en cada visita para que el cierre del 9 de octubre no quede
   congelado en un prerender. */
export const dynamic = "force-dynamic";

export default async function AplicarCursos({ searchParams }: { searchParams: Promise<{ curso?: string; pase?: string }> }) {
  const { curso, pase } = await searchParams;
  return <CourseApplyPage idioma="es" curso={curso} pase={pase} />;
}
