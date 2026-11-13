import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarcoPanel } from "@/components/defacc-panel";
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

const RUBRICA_URL = "https://docs.google.com/document/d/19xVIiadLqi-bJ-bxQ71gn37vAGWBYqJ-EvvBQYueU6c/edit";

const CHIP = "text-meta ml-2 inline-block rounded-full bg-aisc-coral px-2.5 py-0.5 align-middle font-normal text-aisc-cream";

// Una sola caja con todo lo que dijo el modelo: síntesis, alertas y su evidencia.
// El motivo de "fuera de tema" solo se muestra si no hay síntesis, porque la repite.
function SintesisIA({ revision }: { revision: RevisionIA | null }) {
  if (!revision) return null;
  const { fueraDeTema, inyeccionPrompt, infoPeligrosa } = revision;
  if (!revision.resumen && !fueraDeTema && !inyeccionPrompt && !infoPeligrosa) return null;
  const texto = revision.resumen || (fueraDeTema ? revision.motivoFueraDeTema : "");
  const evidencia = [
    inyeccionPrompt ? revision.evidenciaInyeccion || revision.hallazgosRegex.join(", ") : "",
    infoPeligrosa ? (revision.evidenciaInfoPeligrosa ?? "") : "",
  ].filter(Boolean);
  return (
    <details className="w-full">
      <summary className="cursor-pointer font-medium text-aisc-forest">
        Síntesis de la IA <span className="text-meta font-normal text-aisc-muted">(orientativa)</span>
        {fueraDeTema ? <span className={CHIP}>Posible fuera de tema</span> : null}
        {inyeccionPrompt ? <span className={CHIP}>Posible inyección de prompt</span> : null}
        {infoPeligrosa ? <span className={CHIP}>Posible info peligrosa</span> : null}
      </summary>
      <div className="mt-2 flex flex-col gap-2">
        {texto ? <p className="text-aisc-ink">{texto}</p> : null}
        {evidencia.map((t, i) => (
          <p key={i} className="text-aisc-ink">
            <span className="font-medium">Evidencia: </span>
            {t}
          </p>
        ))}
        <p className="text-meta text-aisc-muted">
          Escrito por un modelo a partir de lo que envió el equipo. Puede equivocarse y no afecta el puntaje.
        </p>
      </div>
    </details>
  );
}

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
      texto="Califica de 1 a 5. Puedes cambiar tus notas cuando quieras. Enlace personal."
    >
      <a
        href={RUBRICA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-10 flex w-full items-center justify-between gap-4 rounded-lg border border-aisc-ink bg-aisc-cream px-5 py-4 transition-colors hover:bg-white md:px-7"
      >
        <span className="flex flex-col gap-1">
          <span className="text-body font-medium text-aisc-ink">Rúbrica de evaluación</span>
          <span className="text-body-sm text-aisc-ink/80">
            Qué significa cada nota del 1 al 5 en Impacto, Ejecución y Presentación. Léela antes de calificar.
          </span>
        </span>
        <span aria-hidden className="text-body shrink-0 text-aisc-forest transition-transform group-hover:translate-x-0.5">
          ↗
        </span>
      </a>
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
                    <summary className="cursor-pointer font-medium text-aisc-forest">Resumen del equipo</summary>
                    <p className="mt-2 whitespace-pre-line text-aisc-ink">{e.resumen}</p>
                  </details>
                  <SintesisIA revision={revision} />
                  <a
                    href={e.enlace}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center rounded-full border border-aisc-forest/40 px-3 py-1 font-medium text-aisc-forest transition-colors hover:bg-aisc-forest/10"
                  >
                    Repo
                  </a>
                  {pdf ? (
                    <a
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-aisc-forest/40 px-3 py-1 font-medium text-aisc-forest transition-colors hover:bg-aisc-forest/10"
                    >
                      Ficha PDF
                    </a>
                  ) : null}
                </div>
                <DefAccJudgeForm token={token} slug={e.slug} criterios={criterios} inicial={puntajes[e.slug] ?? null} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </MarcoPanel>
  );
}
