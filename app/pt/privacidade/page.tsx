import type { Metadata } from "next";
import PoliticaDatosPagina from "@/components/politica-datos-pagina";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Política de tratamento de dados pessoais",
  description:
    "Quem é responsável pelos dados pessoais que a AI Safety Colombia coleta, para que os usa, com quem os compartilha e como pedir que sejam corrigidos ou apagados, segundo a Lei 1581 de 2012 da Colômbia e a LGPD.",
  alternates: { canonical: "/pt/privacidade", languages: alternativas("/pt/privacidade") },
};

export default function Privacidade() {
  return <PoliticaDatosPagina idioma="pt" />;
}
