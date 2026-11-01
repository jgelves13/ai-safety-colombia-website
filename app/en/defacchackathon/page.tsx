import type { Metadata } from "next";
import DefAccPage from "@/components/defacc-page";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

export const metadata: Metadata = {
  title: "Defensive Acceleration Hackathon — AI Safety Colombia × IEEE CS Uniandes",
  description:
    "Saturday, November 14, 2026 at Universidad de los Andes, Bogotá. One day to build an AI-powered defense protecting systems, people, or data. COP 2,000,000 in cash prizes.",
  alternates: { canonical: "/en/defacchackathon", languages: alternativas("/en/defacchackathon") },
  openGraph: openGraph("en", "/en/defacchackathon"),
};

export default function EnglishDefAccHackathonPage() {
  return <DefAccPage idioma="en" />;
}
