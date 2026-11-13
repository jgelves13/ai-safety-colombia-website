import type { Metadata } from "next";
import { PaginaEntrega, bypassValido } from "@/components/defacc-submit-page";
import { SLUG_VALIDO, firmaRegistro, iguales } from "@/lib/defacc-entregas";
import { leerRegistro } from "@/lib/defacc-registro";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Entregas · Defensive Acceleration Hackathon",
  description: "Formulario de entrega de proyectos del Defensive Acceleration Hackathon.",
  alternates: { canonical: "/defacchackathon/entregar", languages: alternativas("/defacchackathon/entregar") },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/* El enlace del correo de registro trae ?registro=<slug>.<firma>. Solo se
   precarga si la firma es válida; nunca se acepta un nombre de equipo suelto. */
async function registroFirmado(valor: string | undefined) {
  if (!valor) return undefined;
  const punto = valor.lastIndexOf(".");
  if (punto <= 0) return undefined;
  const slug = valor.slice(0, punto);
  const firma = valor.slice(punto + 1);
  if (!SLUG_VALIDO.test(slug) || !iguales(firma, firmaRegistro(slug))) return undefined;
  try {
    const r = await leerRegistro(slug);
    return r ? { equipo: r.equipo, track: r.track, integrantes: r.integrantes } : undefined;
  } catch {
    return undefined;
  }
}

export default async function Pagina({
  searchParams,
}: {
  searchParams: Promise<{ bypass?: string; registro?: string }>;
}) {
  const { bypass, registro } = await searchParams;
  const inicial = await registroFirmado(registro);
  return <PaginaEntrega idioma="es" bypass={bypassValido(bypass)} inicial={inicial} />;
}
