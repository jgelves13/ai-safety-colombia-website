import type { Metadata } from "next";

import type { Idioma } from "./idiomas";

/* Cuando una página trae su propio `openGraph`, Next NO lo fusiona con el del
   layout: lo reemplaza entero. Una portada que solo quería corregir su `url`
   perdía de paso el `og:type`, el `og:site_name` y los `og:locale`. Por eso lo
   compartido vive acá y cada página llama a esta función, en vez de copiar el
   bloque y olvidar la mitad.

   Ojo con lo que NO va acá: `title` y `description`. Si se dejan fuera, Next
   los toma del `title` y el `description` de la página, que ya están escritos
   y traducidos. Ponerlos sería repetirlos mal. */

const LOCALES: Record<Idioma, string> = {
  es: "es_CO",
  en: "en_US",
  pt: "pt_BR",
};

export function openGraph(idioma: Idioma, url?: string): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: "AI Safety Colombia",
    locale: LOCALES[idioma],
    alternateLocale: Object.values(LOCALES).filter((l) => l !== LOCALES[idioma]),
    url,
  };
}
