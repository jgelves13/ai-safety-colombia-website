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
  title: { absolute: "AI Safety Colombia — Hacia una inteligencia artificial segura" },
  description:
    "Comunidad en Colombia de investigadores, ingenieros y profesionales de política pública dedicada a que la inteligencia artificial avance de forma segura y beneficiosa.",
  alternates: { canonical: "/", languages: alternativas("/") },
  openGraph: openGraph("es", "/"),
};

export default function Home() {
  return <Portada idioma="es" />;
}
