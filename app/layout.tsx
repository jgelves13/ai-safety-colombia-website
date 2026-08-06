import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/** text face of the SASH port */
const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

/** display face for the big headlines — licensed, self-hosted */
const suisseWorks = localFont({
  src: "../public/fonts/suisse-works-regular.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
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
      lang="en"
      className={`${instrumentSans.variable} ${suisseWorks.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
