import type { Metadata } from "next";
import OportunidadesPagina, { TEXTOS } from "@/components/oportunidades-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: TEXTOS.pt.titulo,
  description: TEXTOS.pt.descripcion,
  alternates: { canonical: "/pt/oportunidades", languages: alternativas("/pt/oportunidades") },
};

/* Los programas salen de AISafety.com; la página se rehace a lo sumo una vez por hora. */
export const revalidate = 3600;

export default function OportunidadesPt() {
  return <OportunidadesPagina idioma="pt" active="/pt/oportunidades" />;
}
