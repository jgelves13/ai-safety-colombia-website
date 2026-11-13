import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BanderasIA, MarcoPanel } from "@/components/defacc-panel";
import DefAccJudgeForm from "@/components/defacc-judge-form";
import { TEXTOS_HACKATHON } from "@/app/defacchackathon/datos";
import {
  CIERRE_ENTREGAS_ISO,
  JUEZ_PRUEBA,
  juezDelToken,
  leerJson,
  puntajesDelJuez,
  todasLasEntregas,
  urlFirmada,
  type RevisionIA,
} from "@/lib/defacc-entregas";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";

export const metadata: Metadata = {
  title: "Jurado · Defensive Acceleration Hackathon",
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function PaginaJurado({ params }: { params: Promise<{ token: string }> }) {
  const { token: crudo } = await params;
  const token = decodeURIComponent(crudo);
  const juez = juezDelToken(token);
  if (!juez) notFound();

  const criterios = TEXTOS_HACKATHON.es.reglas.criterios.map((c) => ({
    nombre: c.nombre,
    descripcion: c.descripcion,
    niveles: c.niveles,
  }));

  const [todas, puntajes] = await Promise.all([todasLasEntregas(), puntajesDelJuez(juez.id)]);
  const esPrueba = juez.id === JUEZ_PRUEBA.id;
  const entregas = todas.filter((e) => !!e.prueba === esPrueba && !e.descartada);
  const filas = await Promise.all(
    entregas.map(async (e) => ({
      e,
      pdf: e.pdf ? await urlFirmada(e.pdf.ruta, 6 * 3600) : null,
      revision: await leerJson<RevisionIA>(`revision-ia/${e.slug}.json`),
    })),
  );
  const hechas = entregas.filter((e) => puntajes[e.slug]).length;
  const cierre = new Date(CIERRE_ENTREGAS_ISO).toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    hour: "numeric",
    minute: "2-digit",
    day: "numeric",
    month: "long",
  });

  return (
    <MarcoPanel
      kicker="DefAcc Hackathon · Jurado"
      titulo={`Hola, ${juez.nombre.split(" ")[0]}`}
      texto={<p>Califica de 1 a 5. Puedes cambiar tus notas cuando quieras. Enlace personal.</p>}
    >
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-display-2 text-aisc-ink">
          {entregas.length === 0 ? "Aún no hay entregas" : `${hechas} de ${entregas.length} calificadas`}
        </h2>
      </div>

      {entregas.length === 0 ? (
        <p className="text-body text-aisc-muted">Vuelve después del cierre ({cierre}).</p>
      ) : (
        <ol className="flex flex-col gap-6">
          {filas.map(({ e, pdf, revision }) => (
            <li key={e.slug} id={e.slug} className="rounded-lg border border-aisc-ink bg-aisc-cream p-5 md:p-7">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-body-lg font-medium text-aisc-ink">{e.titulo}</h3>
                    <span className="text-meta text-aisc-muted">
                      {e.equipo} · {NOMBRES_TRACKS[e.track] ?? e.track}
                    </span>
                  </div>
                  {puntajes[e.slug] ? (
                    <span className="text-meta rounded-full bg-aisc-forest px-3 py-1 text-aisc-cream">Calificado</span>
                  ) : (
                    <span className="text-meta rounded-full border border-aisc-muted px-3 py-1 text-aisc-muted">
                      Pendiente
                    </span>
                  )}
                </div>
                <div className="text-body-sm flex flex-wrap items-center gap-4">
                  <details className="w-full">
                    <summary className="cursor-pointer font-medium text-aisc-forest">Resumen</summary>
                    <p className="mt-2 whitespace-pre-line text-aisc-ink">{e.resumen}</p>
                  </details>
                  <a
                    href={e.enlace}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-medium text-aisc-forest underline underline-offset-4"
                  >
                    Repo
                  </a>
                  {pdf ? (
                    <a
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-aisc-forest underline underline-offset-4"
                    >
                      Ficha PDF
                    </a>
                  ) : null}
                </div>
                <BanderasIA revision={revision} compacto />
                <DefAccJudgeForm token={token} slug={e.slug} criterios={criterios} inicial={puntajes[e.slug] ?? null} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </MarcoPanel>
  );
}
