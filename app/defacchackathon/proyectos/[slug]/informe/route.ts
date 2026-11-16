import { leerBytes } from "@/lib/defacc-entregas";
import { entregaPublica } from "@/lib/defacc-proyectos";

/* El PDF del informe de un proyecto público. El bucket es privado: se lee en
   el servidor y se sirve desde una ruta estable del sitio, para que el enlace
   no caduque como una URL firmada. */

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = await entregaPublica(slug);
  if (!e?.pdf) return new Response("No encontrado", { status: 404 });
  const bytes = await leerBytes(e.pdf.ruta);
  if (!bytes) return new Response("No encontrado", { status: 404 });
  return new Response(bytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${e.slug}.pdf"`,
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
}
