import type { Metadata } from "next";
import CourseApplyPage from "@/components/course-apply-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Inscreva-se em AGI Strategy e Technical AI Safety",
  description:
    "Formulário de inscrição nos cursos da BlueDot Impact oferecidos pela AI Safety Colombia: AGI Strategy e Technical AI Safety. Fecha no domingo, 11 de outubro de 2026, às 23h59.",
  alternates: { canonical: "/pt/cursos/inscricao", languages: alternativas("/pt/cursos/inscricao") },
};

/* Renderizada a cada visita para que o encerramento de 11 de outubro não fique congelado. */
export const dynamic = "force-dynamic";

export default async function InscricaoCursos({ searchParams }: { searchParams: Promise<{ curso?: string }> }) {
  const { curso } = await searchParams;
  return <CourseApplyPage idioma="pt" curso={curso} />;
}
