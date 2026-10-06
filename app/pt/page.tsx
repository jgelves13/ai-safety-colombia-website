import type { Metadata } from "next";
import Portada from "@/components/portada";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

/* O conteúdo, nos três idiomas, vive em components/portada.tsx. */

/* El próximo evento sale de Luma: se vuelve a leer cada hora. */
export const revalidate = 3600;

export const metadata: Metadata = {
  /* `absolute` para que o template do layout não cole outro
     « | AI Safety Colombia » em cima: o nome já está no título. */
  title: { absolute: "AI Safety Colombia — Rumo a uma inteligência artificial segura" },
  description:
    "Comunidade na Colômbia de pesquisadores, engenheiros e profissionais de políticas públicas dedicada a que a inteligência artificial avance de forma segura e benéfica.",
  alternates: { canonical: "/pt", languages: alternativas("/pt") },
  openGraph: openGraph("pt", "/pt"),
};

export default function Home() {
  return <Portada idioma="pt" />;
}
