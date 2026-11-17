import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { GlobalSouthHackathon } from "@/components/global-south-hackathon";
import { HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

const RUTA = "/en/globalsouthaishackathon";

export const metadata: Metadata = {
  title: "AI Safety Hackathon 2026 · Bogotá + Online",
  description:
    "Global South AI Safety Hackathon, June 19-21 2026. In-person hub in Bogotá or online. Technical research, governance, AI security tracks. Co-hosted with Apart Research.",
  alternates: { canonical: RUTA, languages: alternativas(RUTA) },
  openGraph: { ...openGraph("en", RUTA), images: ["/globalsouth/og/hackathon-en.png"] },
};

export default function GlobalSouthHackathonPage() {
  return (
    <main className={PAGE_SHELL}>
      <section className={`${HERO_SECTION} [&>header:first-child]:relative`}>
        <SiteHeader active={RUTA} />
      </section>
      <div className="gsh">
        <GlobalSouthHackathon locale="en" />
      </div>
      <SiteFooter idioma="en" />
    </main>
  );
}
