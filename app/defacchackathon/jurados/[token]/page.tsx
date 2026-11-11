import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BanderasIA, MarcoPanel } from "@/components/defacc-panel";
import DefAccJudgeForm from "@/components/defacc-judge-form";
import { TEXTOS_HACKATHON } from "@/app/defacchackathon/datos";
import {
  CIERRE_ENTREGAS_ISO,
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

  const [entregas, puntajes] = await Promise.all([todasLasEntregas(), puntajesDelJuez(juez.id)]);
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
      kicker="DefAcc Hackathon · Panel de jurado"
      titulo={`Hola, ${juez.nombre.split(" ")[0]}`}
      texto={
        <p>
          Califica cada proyecto de 1 a 5 en Impacto, Ejecución y Presentación (3 es trabajo sólido para un día). Puedes
          volver y cambiar tus notas cuantas veces quieras. Las entregas cierran el {cierre}. Este enlace es personal, no lo
          compartas.
        </p>
      }
    >
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-display-2 text-aisc-ink">
          {entregas.length === 0 ? "Aún no hay entregas" : `${entregas.length} entregas`}
        </h2>
        {entregas.length ? (
          <span className="text-body-sm text-aisc-muted">
            Llevas {hechas} de {entregas.length}
          </span>
        ) : null}
      </div>

      {entregas.length === 0 ? (
        <p className="text-body text-aisc-muted">
          Los equipos suben sus proyectos el sábado entre las 7:00 a.m. y las 5:00 p.m. Vuelve a esta página después del
          cierre.
        </p>
      ) : (
        <ol className="flex flex-col gap-8">
          {filas.map(({ e, pdf, revision }) => (
            <li key={e.slug} id={e.slug} className="rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-9">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="text-kicker text-aisc-muted">{NOMBRES_TRACKS[e.track] ?? e.track}</span>
                  {puntajes[e.slug] ? (
                    <span className="text-meta rounded-full border border-aisc-forest px-3 py-1 text-aisc-forest">
                      Calificado
                    </span>
                  ) : (
                    <span className="text-meta rounded-full border border-aisc-muted px-3 py-1 text-aisc-muted">
                      Pendiente
                    </span>
                  )}
                </div>
                <h3 className="text-body-lg font-medium text-aisc-ink">{e.titulo}</h3>
                <p className="text-body-sm text-aisc-muted">
                  Equipo {e.equipo} · {e.integrantes.map((i) => i.nombre).join(", ")}
                </p>
                <p className="text-body-sm whitespace-pre-line text-aisc-ink">{e.resumen}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={e.enlace}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-body-sm font-medium text-aisc-forest underline underline-offset-4"
                  >
                    Repositorio o demo
                  </a>
                  {pdf ? (
                    <a
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-sm font-medium text-aisc-forest underline underline-offset-4"
                    >
                      Ficha técnica (PDF)
                    </a>
                  ) : (
                    <span className="text-body-sm text-aisc-muted">Sin ficha técnica</span>
                  )}
                </div>
                <BanderasIA revision={revision} />
                <DefAccJudgeForm token={token} slug={e.slug} criterios={criterios} inicial={puntajes[e.slug] ?? null} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </MarcoPanel>
  );
}
