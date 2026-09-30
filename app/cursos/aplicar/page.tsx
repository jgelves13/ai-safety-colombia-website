import type { Metadata } from "next";
import CourseApplyPage from "@/components/course-apply-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Aplica a AGI Strategy y Technical AI Safety",
  description:
    "Formulario de aplicación a los cursos de BlueDot Impact que corre AI Safety Colombia: AGI Strategy y Technical AI Safety. Cierra el domingo 11 de octubre de 2026 a las 11:59 p. m.",
  alternates: { canonical: "/cursos/aplicar", languages: alternativas("/cursos/aplicar") },
};

/* Se renderiza en cada visita para que el cierre del 11 de octubre no quede
   congelado en un prerender. */
export const dynamic = "force-dynamic";

export default async function AplicarCursos({ searchParams }: { searchParams: Promise<{ curso?: string }> }) {
  const { curso } = await searchParams;
  return <CourseApplyPage idioma="es" curso={curso} />;
}
