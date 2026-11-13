import { FondoBinario } from "@/components/defacc-page";
import DefAccSubmitForm from "@/components/defacc-submit-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { TEXTOS_HACKATHON } from "@/app/defacchackathon/datos";
import {
  APERTURA_ENTREGAS_ISO,
  entregasAbiertas,
  esTokenPrueba,
  iguales,
  type Integrante,
} from "@/lib/defacc-entregas";
import type { Idioma } from "@/lib/idiomas";

const CABECERA: Record<Idioma, { kicker: string; titulo: string; texto: string }> = {
  es: {
    kicker: "DefAcc Hackathon · Entregas",
    titulo: "Suban su proyecto",
    texto:
      "Título, track, un resumen de 150 a 250 palabras, el enlace al repositorio o demo y la ficha técnica en PDF. El jurado califica Impacto, Ejecución y Presentación.",
  },
  en: {
    kicker: "DefAcc Hackathon · Submissions",
    titulo: "Submit your project",
    texto:
      "Title, track, a 150 to 250 word summary, the repository or demo link and the technical brief as a PDF. Judges score Impact, Execution and Presentation.",
  },
  pt: {
    kicker: "DefAcc Hackathon · Entregas",
    titulo: "Enviem seu projeto",
    texto:
      "Título, frente, um resumo de 150 a 250 palavras, o link do repositório ou demo e a ficha técnica em PDF. O júri avalia Impacto, Execução e Apresentação.",
  },
};

export function bypassValido(dado: string | undefined): string | undefined {
  if (!dado) return undefined;
  if (esTokenPrueba(dado)) return dado;
  const esperado = process.env.APPLY_BYPASS_TOKEN;
  if (!esperado) return undefined;
  return iguales(dado, esperado) ? dado : undefined;
}

export function PaginaEntrega({
  idioma,
  bypass,
  inicial,
}: {
  idioma: Idioma;
  bypass?: string;
  inicial?: { equipo: string; track: string; integrantes: Integrante[] };
}) {
  const c = CABECERA[idioma];
  const ahora = Date.now();
  const noIniciado = ahora < new Date(APERTURA_ENTREGAS_ISO).getTime();
  const estado = noIniciado ? "noIniciado" : entregasAbiertas(ahora) ? "abierto" : "cerrado";
  const tracks = TEXTOS_HACKATHON[idioma].kits.listaTracks.map((t) => ({
    id: t.id,
    titulo: `Track ${Number(t.numero)}: ${t.titulo}`,
  }));

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[700px] flex-col gap-4">
            <span className="text-kicker text-aisc-sand/70">{c.kicker}</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">{c.titulo}</h1>
            <p className="text-body md:text-body-lg text-aisc-sand/90">{c.texto}</p>
          </div>
        </div>
      </section>
      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {bypass && esTokenPrueba(bypass) ? (
            <p className="mb-6 rounded-lg border border-aisc-forest/40 bg-aisc-cream px-4 py-3 text-body text-aisc-ink">
              Modo prueba: esta entrega queda marcada como prueba, no envía correos y solo la ve el jurado de prueba.
            </p>
          ) : null}
          <DefAccSubmitForm idioma={idioma} estado={estado} tracks={tracks} bypass={bypass} inicial={inicial} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
