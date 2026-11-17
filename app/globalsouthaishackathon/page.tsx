import type { Metadata } from "next";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { GlobalSouthHackathon } from "@/components/global-south-hackathon";
import { HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { alternativas } from "@/lib/idiomas";
import { openGraph } from "@/lib/metadatos";

const RUTA = "/globalsouthaishackathon";

export const metadata: Metadata = {
  title: "Hackathon AI Safety 2026 · Bogotá + Online",
  description:
    "Hackathon de AI Safety del Global South, 19-21 junio 2026. Hub presencial en Bogotá u online. Investigación técnica, gobernanza y seguridad. Co-organiza Apart Research.",
  alternates: { canonical: RUTA, languages: alternativas(RUTA) },
  openGraph: { ...openGraph("es", RUTA), images: ["/globalsouth/og/hackathon.png"] },
};

export default function PaginaGlobalSouthHackathon() {
  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active={RUTA} />
        <div aria-hidden="true" className="h-24 md:h-28" />
      </section>
      <div className="gsh">
        <GlobalSouthHackathon locale="es" />
      </div>
      <SiteFooter idioma="es" />
    </main>
  );
}
