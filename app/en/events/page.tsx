import type { Metadata } from "next";
import EventosPagina, { TEXTOS } from "@/components/eventos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: TEXTOS.en.titulo,
  description: TEXTOS.en.descripcion,
  alternates: { canonical: "/en/events", languages: alternativas("/en/events") },
};

/* Los eventos salen de Luma; la página se rehace a lo sumo una vez por hora. */
export const revalidate = 3600;

export default function Eventos() {
  return <EventosPagina idioma="en" active="/en/events" />;
}
