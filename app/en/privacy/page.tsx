import type { Metadata } from "next";
import PoliticaDatosPagina from "@/components/politica-datos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Personal data policy",
  description:
    "Who is responsible for the personal data AI Safety Colombia collects, what it is used for, who it is shared with and how to ask for it to be corrected or deleted, under Colombia's Law 1581 of 2012.",
  alternates: { canonical: "/en/privacy", languages: alternativas("/en/privacy") },
};

export default function Privacy() {
  return <PoliticaDatosPagina idioma="en" />;
}
