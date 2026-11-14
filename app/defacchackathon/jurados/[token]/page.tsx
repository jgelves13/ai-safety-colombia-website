import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarcoPanel } from "@/components/defacc-panel";
import DefAccJudgeForm from "@/components/defacc-judge-form";
import { TEXTOS_HACKATHON } from "@/app/defacchackathon/datos";
import {
  CIERRE_ENTREGAS_ISO,
  claveSorteo,
  JUEZ_PRUEBA,
  juezDelToken,
  leerJson,
  puntajesDelJuez,
  todasLasEntregas,
  urlFirmada,
  type Entrega,
  type RevisionIA,
} from "@/lib/defacc-entregas";
import {
  ordenPublicado,
  todosLosRegistros,
  type Registro,
} from "@/lib/defacc-registro";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";
import {
  GUIA_RUBRICA,
  NIVELES,
  NOMBRES_CRITERIO,
  RUBRICA_URL,
  type ClaveCriterio,
} from "@/lib/defacc-rubrica";

export const metadata: Metadata = {
  title: "Jurado · Defensive Acceleration Hackathon",
  robots: { index: false, follow: false },
};

const ZOOM_JURADOS = "https://uniandes-edu-co.zoom.us/j/85143817290";

/* Después de las 2:00 p. m. las entregas salen en el orden del sorteo de los pitches.
   Cada equipo registrado tiene su puesto aunque aún no haya entregado; las entregas
   sin registro (nombre cambiado, etc.) van al final. */
type Puesto = { registro: Registro | null; entregas: Entrega[] };

function puestosDelSorteo(
  registros: Registro[],
  entregas: Entrega[],
  esPrueba: boolean,
): Puesto[] {
  const orden = registros
    .filter((r) => !!r.prueba === esPrueba && !r.duplicadoDe)
    .map((r) => ({ r, k: claveSorteo(r.slug) }))
    .sort((a, b) => (a.k < b.k ? -1 : a.k > b.k ? 1 : 0))
    .map((x) => x.r);
  const porSlug = new Map<string, Entrega[]>();
  for (const e of entregas) {
    const base = e.duplicadoDe ?? e.slug;
    porSlug.set(base, [...(porSlug.get(base) ?? []), e]);
  }
  const puestos: Puesto[] = orden.map((r) => {
    const propias = porSlug.get(r.slug) ?? [];
    porSlug.delete(r.slug);
    return { registro: r, entregas: propias };
  });
  for (const sueltas of porSlug.values())
    puestos.push({ registro: null, entregas: sueltas });
  return puestos;
}

const CHIP =
  "text-meta ml-2 inline-block rounded-full bg-aisc-coral px-2.5 py-0.5 align-middle font-normal text-aisc-cream";

// Una sola caja con todo lo que dijo el modelo: síntesis, alertas y su evidencia.
// El motivo de "fuera de tema" solo se muestra si no hay síntesis, porque la repite.
function SintesisIA({ revision }: { revision: RevisionIA | null }) {
  if (!revision) return null;
  const { fueraDeTema, inyeccionPrompt, infoPeligrosa } = revision;
  if (!revision.resumen && !fueraDeTema && !inyeccionPrompt && !infoPeligrosa)
    return null;
  const texto =
    revision.resumen || (fueraDeTema ? revision.motivoFueraDeTema : "");
  const evidencia = [
    inyeccionPrompt
      ? revision.evidenciaInyeccion || revision.hallazgosRegex.join(", ")
      : "",
    infoPeligrosa ? (revision.evidenciaInfoPeligrosa ?? "") : "",
  ].filter(Boolean);
  return (
    <details className="w-full">
      <summary className="cursor-pointer font-medium text-aisc-forest">
        Síntesis de la IA{" "}
        <span className="text-meta font-normal text-aisc-muted">
          (orientativa)
        </span>
        {fueraDeTema ? (
          <span className={CHIP}>Posible fuera de tema</span>
        ) : null}
        {inyeccionPrompt ? (
          <span className={CHIP}>Posible inyección de prompt</span>
        ) : null}
        {infoPeligrosa ? (
          <span className={CHIP}>Posible info peligrosa</span>
        ) : null}
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
          Escrito por un modelo a partir de lo que envió el equipo. Puede
          equivocarse y no afecta el puntaje.
        </p>
      </div>
    </details>
  );
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function PaginaJurado({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token: crudo } = await params;
  const token = decodeURIComponent(crudo);
  const juez = juezDelToken(token);
  if (!juez) notFound();

  const criterios = TEXTOS_HACKATHON.es.reglas.criterios.map((c) => ({
    nombre: c.nombre,
    descripcion: c.descripcion,
    niveles: c.niveles,
  }));

  const conSorteo = ordenPublicado();
  const [todas, puntajes, registros] = await Promise.all([
    todasLasEntregas(),
    puntajesDelJuez(juez.id),
    conSorteo ? todosLosRegistros() : Promise.resolve([] as Registro[]),
  ]);
  const esPrueba = juez.id === JUEZ_PRUEBA.id;
  const entregas = todas.filter(
    (e) => !!e.prueba === esPrueba && !e.descartada,
  );
  const puestos: Puesto[] = conSorteo
    ? puestosDelSorteo(registros, entregas, esPrueba)
    : entregas.map((e) => ({ registro: null, entregas: [e] }));
  const detalles = new Map(
    await Promise.all(
      entregas.map(
        async (e) =>
          [
            e.slug,
            {
              pdf: e.pdf ? await urlFirmada(e.pdf.ruta, 6 * 3600) : null,
              revision: await leerJson<RevisionIA>(
                `revision-ia/${e.slug}.json`,
              ),
            },
          ] as const,
      ),
    ),
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
        href={ZOOM_JURADOS}
        target="_blank"
        rel="noopener noreferrer"
        className="group mb-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-lg border border-aisc-ink bg-aisc-cream px-5 py-4 transition-colors hover:bg-white md:px-7"
      >
        <span className="flex flex-col gap-1">
          <span className="text-body font-medium text-aisc-ink">
            Zoom para jurados
          </span>
          <span className="text-body-sm text-aisc-ink/80">
            Pitches desde las 5:10 p. m. del sábado 14 de noviembre.
          </span>
        </span>
        <span className="text-body-sm inline-flex shrink-0 items-center gap-1.5 rounded-full border border-aisc-forest/40 px-3 py-1 font-medium text-aisc-forest transition-colors group-hover:bg-aisc-forest/10">
          Entrar a Zoom <span aria-hidden>↗</span>
        </span>
      </a>
      <section className="mb-10 w-full rounded-lg border border-aisc-ink bg-aisc-cream">
        <a
          href={RUBRICA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-wrap items-center justify-between gap-4 rounded-t-lg px-5 py-4 transition-colors hover:bg-white md:px-7"
        >
          <span className="flex flex-col gap-1">
            <span className="text-body font-medium text-aisc-ink">
              Rúbrica de evaluación completa
            </span>
            <span className="text-body-sm text-aisc-ink/80">
              Qué significa cada nota del 1 al 5, con ejemplos. Léela antes de
              calificar.
            </span>
          </span>
          <span className="text-body-sm inline-flex shrink-0 items-center gap-1.5 rounded-full border border-aisc-forest/40 px-3 py-1 font-medium text-aisc-forest transition-colors group-hover:bg-aisc-forest/10">
            Abrir en Google Docs <span aria-hidden>↗</span>
          </span>
        </a>
        <details className="group border-t border-aisc-ink/20">
          <summary className="text-body-sm cursor-pointer px-5 py-3 font-medium text-aisc-forest md:px-7">
            Resumen rápido
          </summary>
          <div className="flex flex-col gap-4 px-5 pb-5 md:px-7">
            <div className="overflow-x-auto">
              <table className="text-body-sm w-full min-w-[560px] border-collapse text-left text-aisc-ink">
                <thead>
                  <tr className="border-b border-aisc-ink/30">
                    <th className="py-2 pr-3 font-medium">Nota</th>
                    {(Object.keys(NIVELES) as ClaveCriterio[]).map((k) => (
                      <th key={k} className="py-2 pr-3 font-medium">
                        {NOMBRES_CRITERIO[k]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <tr
                      key={n}
                      className="border-b border-aisc-ink/10 last:border-0"
                    >
                      <td className="py-2 pr-3 font-medium">{n}</td>
                      {(Object.keys(NIVELES) as ClaveCriterio[]).map((k) => (
                        <td key={k} className="py-2 pr-3">
                          {NIVELES[k][n - 1]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="text-body-sm flex list-disc flex-col gap-1 pl-5 text-aisc-ink">
              {GUIA_RUBRICA.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </details>
      </section>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-display-2 text-aisc-ink">
          {entregas.length === 0
            ? "Aún no hay entregas"
            : `${hechas} de ${entregas.length} calificadas`}
        </h2>
        {entregas.length > 0 && (
          <p className="text-body text-aisc-muted">
            {hechas >= entregas.length
              ? "Ya calificaste todas. Gracias."
              : `Te faltan ${entregas.length - hechas}. Solo tú ves este conteo.`}
          </p>
        )}
      </div>

      {conSorteo && puestos.length > 0 ? (
        <p className="text-body mb-6 text-aisc-muted">
          En el orden del sorteo de los pitches. Los equipos que aún no entregan
          aparecen como pendientes.
        </p>
      ) : null}

      {puestos.length === 0 ? (
        <p className="text-body text-aisc-muted">
          Vuelve después del cierre ({cierre}).
        </p>
      ) : (
        <ol className="flex flex-col gap-6">
          {puestos.flatMap(({ registro, entregas: propias }, i) => {
            const pitch = conSorteo && registro ? `Pitch ${i + 1} · ` : "";
            if (propias.length === 0 && registro)
              return [
                <li
                  key={`r-${registro.slug}`}
                  id={registro.slug}
                  className="rounded-lg border border-dashed border-aisc-muted p-5 md:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-body-lg font-medium text-aisc-muted">
                        {registro.equipo}
                      </h3>
                      <span className="text-meta text-aisc-muted">
                        {pitch}
                        {NOMBRES_TRACKS[registro.track] ?? registro.track}
                      </span>
                    </div>
                    <span className="text-meta rounded-full border border-aisc-muted px-3 py-1 text-aisc-muted">
                      Aún no entrega
                    </span>
                  </div>
                </li>,
              ];
            return propias.map((e) => {
              const { pdf, revision } = detalles.get(e.slug) ?? {
                pdf: null,
                revision: null,
              };
              return (
                <li
                  key={e.slug}
                  id={e.slug}
                  className="rounded-lg border border-aisc-ink bg-aisc-cream p-5 md:p-7"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-body-lg font-medium text-aisc-ink">
                          {e.titulo}
                        </h3>
                        <span className="text-meta text-aisc-muted">
                          {pitch}
                          {e.equipo} · {NOMBRES_TRACKS[e.track] ?? e.track}
                        </span>
                      </div>
                      {puntajes[e.slug] ? (
                        <span className="text-meta rounded-full bg-aisc-forest px-3 py-1 text-aisc-cream">
                          Calificado
                        </span>
                      ) : (
                        <span className="text-meta rounded-full border border-aisc-muted px-3 py-1 text-aisc-muted">
                          Pendiente
                        </span>
                      )}
                    </div>
                    <div className="text-body-sm flex flex-wrap items-center gap-4">
                      <details className="w-full">
                        <summary className="cursor-pointer font-medium text-aisc-forest">
                          Resumen del equipo
                        </summary>
                        <p className="mt-2 whitespace-pre-line text-aisc-ink">
                          {e.resumen}
                        </p>
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
                    <DefAccJudgeForm
                      token={token}
                      slug={e.slug}
                      criterios={criterios}
                      inicial={puntajes[e.slug] ?? null}
                    />
                  </div>
                </li>
              );
            });
          })}
        </ol>
      )}
    </MarcoPanel>
  );
}
