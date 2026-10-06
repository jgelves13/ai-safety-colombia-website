import type { Metadata } from "next";
import EventosPagina, { TEXTOS } from "@/components/eventos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: TEXTOS.es.titulo,
  description: TEXTOS.es.descripcion,
  alternates: { canonical: "/eventos", languages: alternativas("/eventos") },
};

/* Los eventos salen de Luma; la página se rehace a lo sumo una vez por hora. */
export const revalidate = 3600;

export default function Eventos() {
  return <EventosPagina idioma="es" active="/eventos" />;
}
