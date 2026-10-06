import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { openGraph } from "@/lib/metadatos";
import "./globals.css";

/** titulares: la grotesca de la marca */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/** lectura */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /* Los canónicos y los hreflang de cada página se escriben como rutas. Sin
     esta base, Next las resuelve contra localhost y publica direcciones que no
     existen. */
  metadataBase: new URL("https://aisafetycolombia.org"),
  title: {
    default: "AI Safety Colombia",
    template: "%s | AI Safety Colombia",
  },
  description:
    "Comunidad en Colombia de investigadores, ingenieros y profesionales de política pública dedicada a que la inteligencia artificial avance de forma segura y beneficiosa.",
  /* Sin un bloque openGraph, Next no escribe NINGUNA etiqueta og: y quien
     comparta el enlace queda a merced de lo que el raspador adivine: agarra el
     primer titular de la página y lo corta a media palabra, sin imagen. Con el
     bloque puesto, cada página hereda su propio title y description, y la
     imagen la pone `app/opengraph-image.tsx`.

     Acá va la versión en español, que es la que heredan las páginas interiores.
     Las tres portadas llaman a `openGraph()` porque necesitan su idioma y su
     `url`, y ese llamado reemplaza este bloque entero.

     Sin `url` a propósito: un valor por defecto lo heredarían las setenta
     páginas del sitio y todas dirían ser la portada. Sin él, el raspador usa la
     dirección que pidió, que es la correcta. */
  openGraph: openGraph("es"),
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Medicion de trafico y de Core Web Vitals. Sin cookies y sin datos
            personales: cuenta visitas por ruta y mide la velocidad real. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
