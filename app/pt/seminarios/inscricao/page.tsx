import type { Metadata } from "next";
import CourseApplyPage from "@/components/course-apply-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Inscreva-se nos seminários",
  description:
    "Formulário de inscrição nos dois seminários que a AI Safety Colombia oferece com materiais da BlueDot Impact: o Seminário de futuro e riscos da IA e o Seminário técnico de segurança da IA. Fecha na sexta-feira, 9 de outubro de 2026, às 23h59.",
  alternates: { canonical: "/pt/seminarios/inscricao", languages: alternativas("/pt/seminarios/inscricao") },
};

/* Renderizada a cada visita para que o encerramento de 9 de outubro não fique congelado. */
export const dynamic = "force-dynamic";

export default async function InscricaoCursos({ searchParams }: { searchParams: Promise<{ curso?: string }> }) {
  const { curso } = await searchParams;
  return <CourseApplyPage idioma="pt" curso={curso} />;
}
