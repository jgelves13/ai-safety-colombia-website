import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BanderasIA, MarcoPanel } from "@/components/defacc-panel";
import { CopiarEnlace, LoginAdmin, RevisarDeNuevo, SalirAdmin } from "@/components/defacc-admin-acciones";
import {
  COOKIE_ADMIN,
  JUEZ_PRUEBA,
  cookieAdminValida,
  jueces,
  tokenPrueba,
  leerJson,
  puntajesDelJuez,
  todasLasEntregas,
  tokenJuez,
  type Entrega,
  type Puntaje,
  type RevisionIA,
} from "@/lib/defacc-entregas";
import { NOMBRES_TRACKS } from "@/lib/defacc-revision";

export const metadata: Metadata = {
  title: "Resultados · Defensive Acceleration Hackathon",
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Fila = {
  e: Entrega;
  revision: RevisionIA | null;
  votos: { juez: string; p: Puntaje }[];
  impacto: number | null;
  ejecucion: number | null;
  presentacion: number | null;
  total: number | null;
  calificaron: number;
  abstenciones: number;
  marcasNoElegible: number;
  excluida: boolean;
};

function promedio(xs: number[]): number | null {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

function fmt(n: number | null, d = 2): string {
  return n === null ? "–" : n.toFixed(d);
}

export default async function PaginaResultados({ searchParams }: { searchParams: Promise<{ prueba?: string }> }) {
  const prueba = (await searchParams).prueba === "1";
  const galleta = (await cookies()).get(COOKIE_ADMIN)?.value;

  if (!cookieAdminValida(galleta)) {
    return (
      <MarcoPanel
        kicker="DefAcc Hackathon · Organización"
        titulo="Resultados"
        texto={<p>Solo para el equipo organizador. Entra con la clave de administración.</p>}
      >
        <LoginAdmin />
      </MarcoPanel>
    );
  }

  /* Con ?prueba=1 la página muestra solo entregas de prueba y el jurado de
     prueba, para ensayar el flujo completo sin tocar datos reales. */
  const listaJueces = prueba ? [JUEZ_PRUEBA] : jueces();
  const [todas, porJuez] = await Promise.all([
    todasLasEntregas(),
    Promise.all(listaJueces.map(async (j) => ({ j, puntajes: await puntajesDelJuez(j.id) }))),
  ]);
  const entregas = todas.filter((e) => !!e.prueba === prueba);
  const rutaEntregaPrueba = `/defacchackathon/entregar?bypass=${tokenPrueba()}`;
  const revisiones = await Promise.all(entregas.map((e) => leerJson<RevisionIA>(`revision-ia/${e.slug}.json`)));

  const filas: Fila[] = entregas.map((e, i) => {
    const votos = porJuez
      .filter(({ puntajes }) => puntajes[e.slug])
      .map(({ j, puntajes }) => ({ juez: j.nombre, p: puntajes[e.slug] }));
    const validos = votos.filter((v) => !v.p.abstiene);
    const impacto = promedio(validos.map((v) => v.p.impacto ?? 0));
    const ejecucion = promedio(validos.map((v) => v.p.ejecucion ?? 0));
    const presentacion = promedio(validos.map((v) => v.p.presentacion ?? 0));
    const total = impacto !== null && ejecucion !== null && presentacion !== null ? impacto + ejecucion + presentacion : null;
    const marcasNoElegible = validos.filter((v) => v.p.noElegible).length;
    return {
      e,
      revision: revisiones[i],
      votos,
      impacto,
      ejecucion,
      presentacion,
      total,
      calificaron: validos.length,
      abstenciones: votos.length - validos.length,
      marcasNoElegible,
      excluida: validos.length > 0 && marcasNoElegible * 2 >= validos.length,
    };
  });

  const ordenar = (a: Fila, b: Fila) =>
    (b.total ?? -1) - (a.total ?? -1) || (b.impacto ?? -1) - (a.impacto ?? -1) || a.e.titulo.localeCompare(b.e.titulo);
  const ranking = filas.filter((f) => !f.excluida && f.total !== null).sort(ordenar);
  const sinNotas = filas.filter((f) => f.total === null);
  const excluidas = filas.filter((f) => f.excluida).sort(ordenar);

  return (
    <MarcoPanel
      kicker={prueba ? "DefAcc Hackathon · Modo prueba" : "DefAcc Hackathon · Organización"}
      titulo={prueba ? "Resultados de prueba" : "Resultados"}
      texto={
        <p>
          Promedio por criterio entre los jurados que calificaron (las abstenciones no cuentan). Total sobre 15; el empate se
          rompe por Impacto. Un proyecto sale del ranking si la mitad o más de sus jurados lo marcan como no elegible.
        </p>
      }
    >
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-display-2 text-aisc-ink">
          {entregas.length} {entregas.length === 1 ? "entrega" : "entregas"}
          {prueba ? " de prueba" : ""}
        </h2>
        <span className="flex flex-wrap items-center gap-4">
          <a
            href={prueba ? "/defacchackathon/resultados" : "/defacchackathon/resultados?prueba=1"}
            className="text-meta font-medium text-aisc-forest underline underline-offset-4"
          >
            {prueba ? "Volver a resultados reales" : "Modo prueba"}
          </a>
          <SalirAdmin />
        </span>
      </div>

      {prueba ? (
        <section className="mb-14 flex flex-col gap-3 rounded-lg border border-aisc-forest/40 bg-aisc-cream p-6">
          <h2 className="text-body-lg font-medium text-aisc-ink">Ensayar el flujo</h2>
          <p className="text-body-sm text-aisc-muted">
            1. Sube una entrega con este enlace (funciona aunque las entregas estén cerradas, no envía correos y el nombre
            del equipo queda con el prefijo prueba-). 2. Califícala con el enlace del jurado de prueba de abajo. 3. Vuelve
            aquí para ver el ranking y las banderas de la revisión automática. Nada de esto lo ven los jurados reales.
          </p>
          <span className="flex flex-wrap items-center gap-3">
            <span className="text-body-sm font-medium text-aisc-ink">Formulario de entrega de prueba</span>
            <a href={rutaEntregaPrueba} className="text-meta font-medium text-aisc-forest underline underline-offset-4">
              Abrir
            </a>
            <CopiarEnlace ruta={rutaEntregaPrueba} />
          </span>
        </section>
      ) : null}

      {ranking.length ? (
        <div className="mb-14 overflow-x-auto rounded-lg border border-aisc-ink bg-aisc-cream">
          <table className="text-body-sm w-full min-w-[720px] text-left text-aisc-ink">
            <thead className="text-meta text-aisc-muted">
              <tr className="border-b border-aisc-line">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Proyecto</th>
                <th className="px-4 py-3">Impacto</th>
                <th className="px-4 py-3">Ejecución</th>
                <th className="px-4 py-3">Presentación</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Jurados</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((f, i) => (
                <tr key={f.e.slug} className="border-b border-aisc-line last:border-0">
                  <td className="px-4 py-3 font-medium">{i + 1}</td>
                  <td className="px-4 py-3">
                    <a href={`#${f.e.slug}`} className="font-medium underline underline-offset-4">
                      {f.e.titulo}
                    </a>
                    <span className="block text-aisc-muted">Equipo {f.e.equipo}</span>
                    {f.marcasNoElegible ? (
                      <span className="text-meta text-aisc-coral">
                        {f.marcasNoElegible} marca(s) de no elegible
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">{fmt(f.impacto)}</td>
                  <td className="px-4 py-3">{fmt(f.ejecucion)}</td>
                  <td className="px-4 py-3">{fmt(f.presentacion)}</td>
                  <td className="px-4 py-3 font-medium">{fmt(f.total)}</td>
                  <td className="px-4 py-3">
                    {f.calificaron}
                    {f.abstenciones ? <span className="text-aisc-muted"> (+{f.abstenciones} abst.)</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-body mb-14 text-aisc-muted">Todavía no hay proyectos calificados.</p>
      )}

      {excluidas.length ? (
        <section className="mb-14 flex flex-col gap-3">
          <h2 className="text-body-lg font-medium text-aisc-ink">Fuera del ranking por elegibilidad</h2>
          <ul className="text-body-sm flex flex-col gap-1 text-aisc-ink">
            {excluidas.map((f) => (
              <li key={f.e.slug}>
                <a href={`#${f.e.slug}`} className="underline underline-offset-4">
                  {f.e.titulo}
                </a>{" "}
                · {f.marcasNoElegible} de {f.calificaron} jurados · total {fmt(f.total)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mb-14 flex flex-col gap-4">
        <h2 className="text-body-lg font-medium text-aisc-ink">Jurados</h2>
        <p className="text-body-sm text-aisc-muted">
          Cada enlace es personal y no expira. Envíalo solo a esa persona.
        </p>
        <ul className="flex flex-col gap-3">
          {porJuez.map(({ j, puntajes }) => {
            const hechas = entregas.filter((e) => puntajes[e.slug]).length;
            const ruta = `/defacchackathon/jurados/${tokenJuez(j.id)}`;
            return (
              <li
                key={j.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-aisc-line bg-aisc-cream px-4 py-3"
              >
                <span className="text-body-sm text-aisc-ink">
                  <span className="font-medium">{j.nombre}</span>
                  <span className="text-aisc-muted"> · {j.afiliacion}</span>
                </span>
                <span className="flex flex-wrap items-center gap-3">
                  <span className="text-meta text-aisc-muted">
                    {hechas} de {entregas.length}
                  </span>
                  <a href={ruta} className="text-meta font-medium text-aisc-forest underline underline-offset-4">
                    Abrir
                  </a>
                  <CopiarEnlace ruta={ruta} />
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-body-lg font-medium text-aisc-ink">Detalle por entrega</h2>
        {[...ranking, ...excluidas, ...sinNotas].map((f) => (
          <article
            key={f.e.slug}
            id={f.e.slug}
            className="flex flex-col gap-4 rounded-lg border border-aisc-ink bg-aisc-cream p-6 md:p-8"
          >
            <span className="text-kicker text-aisc-muted">{NOMBRES_TRACKS[f.e.track] ?? f.e.track}</span>
            <h3 className="text-body-lg font-medium text-aisc-ink">{f.e.titulo}</h3>
            <p className="text-body-sm text-aisc-muted">
              Equipo {f.e.equipo} · {f.e.integrantes.map((p) => p.nombre).join(", ")} · versión {f.e.version}
            </p>
            <a
              href={f.e.enlace}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-body-sm font-medium text-aisc-forest underline underline-offset-4"
            >
              Repositorio o demo
            </a>
            <BanderasIA revision={f.revision} />
            <div>
              <RevisarDeNuevo slug={f.e.slug} />
            </div>
            {f.votos.length ? (
              <ul className="text-body-sm flex flex-col gap-2 border-t border-aisc-line pt-4 text-aisc-ink">
                {f.votos.map((v) => (
                  <li key={v.juez}>
                    <span className="font-medium">{v.juez}</span>:{" "}
                    {v.p.abstiene
                      ? "se abstuvo"
                      : `I ${v.p.impacto} · E ${v.p.ejecucion} · P ${v.p.presentacion}${v.p.noElegible ? " · no elegible" : ""}`}
                    {v.p.comentario ? (
                      <span className="block whitespace-pre-line text-aisc-muted">{v.p.comentario}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-meta text-aisc-muted">Sin calificaciones todavía.</p>
            )}
          </article>
        ))}
      </section>
    </MarcoPanel>
  );
}
