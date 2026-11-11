import type { Metadata } from "next";
import { PaginaEntrega, bypassValido } from "@/components/defacc-submit-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Entregas · Defensive Acceleration Hackathon",
  description: "Formulário de entrega de projetos do Defensive Acceleration Hackathon.",
  alternates: { canonical: "/pt/defacchackathon/entrega", languages: alternativas("/pt/defacchackathon/entrega") },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Pagina({ searchParams }: { searchParams: Promise<{ bypass?: string }> }) {
  const { bypass } = await searchParams;
  return <PaginaEntrega idioma="pt" bypass={bypassValido(bypass)} />;
}
