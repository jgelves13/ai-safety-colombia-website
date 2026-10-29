import type { Metadata } from "next";
import OportunidadesPagina, { TEXTOS } from "@/components/oportunidades-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: TEXTOS.es.titulo,
  description: TEXTOS.es.descripcion,
  alternates: { canonical: "/oportunidades", languages: alternativas("/oportunidades") },
};

/* Los programas salen de AISafety.com; la página se rehace a lo sumo una vez por hora. */
export const revalidate = 3600;

export default function Oportunidades() {
  return <OportunidadesPagina idioma="es" active="/oportunidades" />;
}
