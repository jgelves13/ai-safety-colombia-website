import type { Metadata } from "next";
import Portada from "@/components/portada";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

/* El contenido, en los tres idiomas, vive en components/portada.tsx. */

/* El próximo evento sale de Luma: se vuelve a leer cada hora. */
export const revalidate = 3600;

export const metadata: Metadata = {
  /* `absolute` para que el template del layout no le pegue otro
     « | AI Safety Colombia » encima: el nombre ya está en el título. */
  title: { absolute: "AI Safety Colombia — Towards safe artificial intelligence" },
  description:
    "A community in Colombia of researchers, engineers and public policy professionals working to make artificial intelligence advance safely and beneficially.",
  alternates: { canonical: "/en", languages: alternativas("/en") },
  openGraph: openGraph("en", "/en"),
};

export default function Home() {
  return <Portada idioma="en" />;
}
