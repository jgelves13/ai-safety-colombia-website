import type { Metadata } from "next";
import DefAccPage from "@/components/defacc-page";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

export const metadata: Metadata = {
  title: "Defensive Acceleration Hackathon — AI Safety Colombia × IEEE CS Uniandes",
  description:
    "Sábado 14 de noviembre de 2026 en la Universidad de los Andes, Bogotá. Un día para construir un prototipo que use IA para defender sistemas, personas o información. COP 2.000.000 en premios.",
  alternates: { canonical: "/defacchackathon", languages: alternativas("/defacchackathon") },
  openGraph: openGraph("es", "/defacchackathon"),
};

export default function PaginaDefAccHackathon() {
  return <DefAccPage idioma="es" />;
}
