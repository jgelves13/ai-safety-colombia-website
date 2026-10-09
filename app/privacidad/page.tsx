import type { Metadata } from "next";
import PoliticaDatosPagina from "@/components/politica-datos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  description:
    "Quién es responsable de los datos personales que recoge AI Safety Colombia, para qué los usa, con quién los comparte y cómo pedir que los corrija o los borre, según la Ley 1581 de 2012.",
  alternates: { canonical: "/privacidad", languages: alternativas("/privacidad") },
};

export default function Privacidad() {
  return <PoliticaDatosPagina idioma="es" />;
}
