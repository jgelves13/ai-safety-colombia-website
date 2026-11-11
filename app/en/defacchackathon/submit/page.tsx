import type { Metadata } from "next";
import { PaginaEntrega, bypassValido } from "@/components/defacc-submit-page";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Submissions · Defensive Acceleration Hackathon",
  description: "Project submission form for the Defensive Acceleration Hackathon.",
  alternates: { canonical: "/en/defacchackathon/submit", languages: alternativas("/en/defacchackathon/submit") },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Pagina({ searchParams }: { searchParams: Promise<{ bypass?: string }> }) {
  const { bypass } = await searchParams;
  return <PaginaEntrega idioma="en" bypass={bypassValido(bypass)} />;
}
