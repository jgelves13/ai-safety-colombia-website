import type { Metadata } from "next";
import OportunidadesPagina, { TEXTOS } from "@/components/oportunidades-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: TEXTOS.en.titulo,
  description: TEXTOS.en.descripcion,
  alternates: { canonical: "/en/opportunities", languages: alternativas("/en/opportunities") },
};

/* Los programas salen de AISafety.com; la página se rehace a lo sumo una vez por hora. */
export const revalidate = 3600;

export default function Opportunities() {
  return <OportunidadesPagina idioma="en" active="/en/opportunities" />;
}
