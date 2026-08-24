import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
