import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { GlobalSouthHackathon } from "@/components/global-south-hackathon";
import { HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

const RUTA = "/pt/globalsouthaishackathon";

export const metadata: Metadata = {
  title: "Hackathon de AI Safety 2026 · Bogotá + Online",
  description:
    "Global South AI Safety Hackathon, 19 a 21 de junho de 2026. Hub presencial em Bogotá ou online. Trilhas de pesquisa técnica, governança e segurança de IA. Coorganizado com a Apart Research.",
  alternates: { canonical: RUTA, languages: alternativas(RUTA) },
  openGraph: { ...openGraph("pt", RUTA), images: ["/globalsouth/og/hackathon-en.png"] },
};

export default function PaginaGlobalSouthHackathonPt() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active={RUTA} />
      </section>
      <div className="gsh">
        <GlobalSouthHackathon locale="pt" />
      </div>
      <SiteFooter idioma="pt" />
    </main>
  );
}
