import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { Idioma } from "./idiomas";

/* La tarjeta que ve quien recibe un enlace del sitio en WhatsApp, LinkedIn o
   Slack. Es lo primero que la gente ve de AI Safety Colombia, muchas veces
   antes que la página misma, así que se dibuja con la tipografía y los colores
   de la marca y no con lo que el raspador alcance a adivinar.

   Vive acá y no dentro de cada `opengraph-image.tsx` porque son tres idiomas y
   la única diferencia entre ellos son dos frases. */

export const TAMANO = { width: 1200, height: 630 };
export const TIPO_CONTENIDO = "image/png";

/** Los colores salen de `app/globals.css`; acá van literales porque Satori no
    resuelve variables CSS. */
const VERDE = "#143620";
const CREMA = "#f3ead8";
const CORAL = "#e5604d";

const TEXTOS: Record<Idioma, { alt: string; titulo: string; pie: string }> = {
  es: {
    alt: "AI Safety Colombia — Hacia una inteligencia artificial segura",
    titulo: "Hacia una inteligencia artificial segura",
    pie: "Investigación, formación y eventos abiertos, desde Colombia",
  },
  en: {
    alt: "AI Safety Colombia — Towards safe artificial intelligence",
    titulo: "Towards safe artificial intelligence",
    pie: "Research, training and open events, from Colombia",
  },
  pt: {
    alt: "AI Safety Colombia — Rumo a uma inteligência artificial segura",
    titulo: "Rumo a uma inteligência artificial segura",
    pie: "Pesquisa, formação e eventos abertos, desde a Colômbia",
  },
};

export function alt(idioma: Idioma) {
  return TEXTOS[idioma].alt;
}

/* El retículo de triángulos del hero, reducido a lo que se lee a 1200×630: el
   triángulo grande, sus tres medianas, y el subtriángulo invertido en coral
   abajo a la derecha, que es el acento de la marca. */
const RETICULA = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="470" viewBox="0 0 520 470">
  <g fill="none" stroke="${CREMA}" stroke-width="2" stroke-opacity="0.38">
    <path d="M260 10 L510 460 L10 460 Z"/>
    <path d="M135 235 L385 235 M385 235 L260 460 M260 460 L135 235" stroke-opacity="0.22"/>
    <path d="M322.5 347.5 L447.5 347.5 M447.5 347.5 L385 460 M385 460 L322.5 347.5" stroke-opacity="0.22"/>
  </g>
  <path d="M322.5 347.5 L447.5 347.5 L385 460 Z" fill="${CORAL}"/>
</svg>`;

export async function tarjeta(idioma: Idioma) {
  const [bricolage, inter, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/bricolage-800.ttf")),
    readFile(join(process.cwd(), "assets/inter-400.ttf")),
    readFile(join(process.cwd(), "public/aisc/logo-lockup-crema.png")),
  ]);

  const t = TEXTOS[idioma];
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const reticulaSrc = `data:image/svg+xml;base64,${Buffer.from(RETICULA).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: VERDE,
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reticulaSrc}
          width={500}
          height={452}
          alt=""
          style={{ position: "absolute", right: 40, top: 89 }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 76px",
            /* Angosta a propósito: el texto no puede invadir la retícula de la
               derecha, que arranca en x=660. */
            width: 690,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={300} height={90} alt="AI Safety Colombia" />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Bricolage",
                fontSize: 62,
                lineHeight: 1.06,
                letterSpacing: "-0.015em",
                color: CREMA,
              }}
            >
              {t.titulo}
            </div>
            <div
              style={{
                marginTop: 28,
                width: 72,
                height: 5,
                backgroundColor: CORAL,
              }}
            />
          </div>

          <div style={{ display: "flex", fontSize: 24, color: "rgba(243,234,216,0.72)" }}>
            {t.pie}
          </div>
        </div>
      </div>
    ),
    {
      ...TAMANO,
      fonts: [
        { name: "Bricolage", data: bricolage, style: "normal", weight: 800 },
        { name: "Inter", data: inter, style: "normal", weight: 400 },
      ],
    },
  );
}
