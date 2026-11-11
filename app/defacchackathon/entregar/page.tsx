import type { Metadata } from "next";
import { PaginaEntrega, bypassValido } from "@/components/defacc-submit-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Entregas · Defensive Acceleration Hackathon",
  description: "Formulario de entrega de proyectos del Defensive Acceleration Hackathon.",
  alternates: { canonical: "/defacchackathon/entregar", languages: alternativas("/defacchackathon/entregar") },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Pagina({ searchParams }: { searchParams: Promise<{ bypass?: string }> }) {
  const { bypass } = await searchParams;
  return <PaginaEntrega idioma="es" bypass={bypassValido(bypass)} />;
}
