import type { Metadata } from "next";
import DefAccPage from "@/components/defacc-page";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

export const metadata: Metadata = {
  title: "Defensive Acceleration Hackathon · AI Safety Colombia × IEEE CS Uniandes",
  description:
    "Sábado, 14 de novembro de 2026 na Universidad de los Andes, Bogotá. Um dia para construir uma defesa com IA para proteger sistemas, pessoas ou dados. COP 2.000.000 em prêmios.",
  alternates: { canonical: "/pt/defacchackathon", languages: alternativas("/pt/defacchackathon") },
  openGraph: openGraph("pt", "/pt/defacchackathon"),
};

export default function PortugueseDefAccHackathonPage() {
  return <DefAccPage idioma="pt" />;
}
