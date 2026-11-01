"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  PAGE_SHELL,
} from "@/components/ui";
import {
  CIERRE_INSCRIPCIONES_ISO,
  FECHA_EVENTO_ISO,
  TEXTOS_HACKATHON,
  inscripcionesCerradas,
} from "@/app/defacchackathon/datos";
import type { Premio } from "@/app/defacchackathon/datos";
import type { Idioma } from "@/lib/idiomas";
import { rutaEn } from "@/lib/idiomas";

const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] font-medium transition-colors hover:text-aisc-forest-deep";

function diasHasta(iso: string) {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  const target = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - today) / 86_400_000);
}

function PremiosSoberos({
  premios,
  premioDifusion,
}: {
  premios: Premio[];
  premioDifusion: Premio;
}) {
  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {premios.map((p, i) => (
          <li className="flex" key={p.puesto}>
            <article
              className={`flex min-h-[140px] w-full flex-col justify-between rounded-[8px] p-5 md:p-6 ${
                i === 0
                  ? "bg-aisc-forest text-aisc-sand"
                  : "border border-aisc-forest/40 bg-aisc-cream text-aisc-ink"
              }`}
            >
              <span
                className={`text-meta font-semibold tracking-widest uppercase ${
                  i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"
                }`}
              >
                {p.puesto}
              </span>
              <span className="mt-4 flex flex-col">
                <span
                  className={`text-meta ${i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"}`}
                >
                  COP
                </span>
                <span
                  className={`text-display-2 md:text-display-2-lg tabular-nums font-normal ${
                    i === 0 ? "text-aisc-sand" : "text-aisc-forest"
                  }`}
                >
                  {p.monto}
                </span>
                <span
                  className={`text-body-sm mt-1 ${
                    i === 0 ? "text-aisc-sand/85" : "text-aisc-muted"
                  }`}
                >
                  {p.detalle}
                </span>
              </span>
            </article>
          </li>
        ))}
      </ul>

      {premioDifusion && (
        <div className="rounded-[8px] border border-aisc-line bg-aisc-sand/40 p-5 text-body-sm">
          <span className="text-meta font-semibold uppercase tracking-wider text-aisc-forest block">
            {premioDifusion.puesto}
          </span>
          <p className="mt-1 text-aisc-ink/90">
            {premioDifusion.detalle} ({premioDifusion.monto}).
          </p>
        </div>
      )}
    </div>
  );
}

export default function DefAccPage({ idioma = "es" }: { idioma?: Idioma }) {
  const d = TEXTOS_HACKATHON[idioma];
  const [pestaña, setPestaña] = useState<"resumen" | "tracks" | "reglas" | "cronograma">("resumen");
  const [diasFaltan, setDiasFaltan] = useState<number | null>(null);

  useEffect(() => {
    setDiasFaltan(diasHasta(FECHA_EVENTO_ISO));
  }, []);

  const cerrada = inscripcionesCerradas();
  const rutaAplicar = rutaEn(idioma, "/defacchackathon/aplicar");

  return (
    <main className={PAGE_SHELL}>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative overflow-hidden bg-aisc-forest-deep text-aisc-sand">
        {/* Fondo decorativo con luces y rejilla sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 size-[500px] rounded-full bg-aisc-sage/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 size-[420px] rounded-full bg-aisc-mint/15 blur-3xl"
        />
        <SiteHeader active="/defacchackathon" />

        <div className="mx-auto w-full max-w-[1440px] px-6 pt-12 pb-14 md:px-12 md:pt-16 md:pb-16 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Texto del Hero */}
            <div className="flex flex-col items-start gap-4 lg:col-span-7 xl:col-span-8">
              <p className="text-kicker tracking-widest uppercase text-aisc-sand/75">
                {d.badge}
              </p>

              <h1 className="text-display-1 md:text-display-1-lg tracking-tight text-aisc-sand text-balance">
                {d.titulo}
              </h1>

              <p className="text-display-3 font-medium text-aisc-mint">
                {d.subtitulo}
              </p>

              <p className="text-body md:text-body-lg max-w-[640px] text-aisc-sand/90">
                {d.lema}
              </p>

              <p className="text-body-sm mt-1 text-aisc-sand/75">
                {d.estadoInscripciones}
              </p>

              {/* Botones de acción principales */}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Link className={CTA_LINK_PRIMARY} href={rutaAplicar}>
                  {d.ctaAplicar}
                </Link>
                <button
                  type="button"
                  onClick={() => setPestaña("tracks")}
                  className={CTA_LINK}
                >
                  {d.ctaVerBases}
                </button>
              </div>
            </div>

            {/* Mascota CyberBear sobria */}
            <div className="relative flex justify-center lg:col-span-5 xl:col-span-4">
              <div className="relative w-full max-w-[260px] md:max-w-[300px]">
                <img
                  src="/aisc/hackathon/cyberbear.png"
                  alt="CyberBear"
                  width={474}
                  height={730}
                  className="mx-auto h-auto w-full object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tres datos clave pegados al hero, estilo sprint */}
        <div className="border-t border-aisc-sand/15 bg-aisc-night/60 px-6 py-6 md:px-12 text-aisc-sand">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex flex-col rounded-[8px] bg-aisc-forest-deep/80 border border-aisc-sand/10 p-5">
              <span className="text-display-4 text-aisc-sand">14 de noviembre</span>
              <span className="text-body-sm mt-2 text-aisc-sand/75">
                {idioma === "en"
                  ? "Saturday · 8:00 AM – 8:00 PM (7h sprint)"
                  : idioma === "pt"
                  ? "Sábado · 8:00 às 20:00 (7 h de trabalho)"
                  : "Sábado · 8:00 a. m. a 8:00 p. m. (7 h de trabajo)"}
              </span>
            </div>
            <div className="flex flex-col rounded-[8px] bg-aisc-forest-deep/80 border border-aisc-sand/10 p-5">
              <span className="text-display-4 text-aisc-sand">Uniandes, Bogotá</span>
              <span className="text-body-sm mt-2 text-aisc-sand/75">
                {idioma === "en"
                  ? "In-person · Classrooms & computer labs"
                  : idioma === "pt"
                  ? "Presencial · Salas de aula e laboratórios"
                  : "Presencial · Auditorios y salas de cómputo"}
              </span>
            </div>
            <div className="flex flex-col rounded-[8px] bg-aisc-forest-deep/80 border border-aisc-sand/10 p-5">
              <span className="text-display-4 text-aisc-sand">COP 2.000.000</span>
              <span className="text-body-sm mt-2 text-aisc-sand/75">
                {idioma === "en"
                  ? "In prizes for the top three places"
                  : idioma === "pt"
                  ? "Em prêmios para os três primeiros lugares"
                  : "En premios para los tres primeros puestos"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ SUBNAV PESTAÑAS ESTILO APART */}
      <nav
        aria-label="Secciones del evento"
        className="sticky top-0 z-40 border-b border-aisc-line bg-white/95 px-6 backdrop-blur-md md:px-12 lg:px-16"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 overflow-x-auto py-3 no-scrollbar">
          <div className="flex items-center gap-1 md:gap-2">
            {(
              [
                { id: "resumen", label: d.pestañas.resumen },
                { id: "tracks", label: d.pestañas.tracks },
                { id: "reglas", label: d.pestañas.reglas },
                { id: "cronograma", label: d.pestañas.cronograma },
              ] as const
            ).map((tab) => {
              const activo = pestaña === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPestaña(tab.id)}
                  aria-pressed={activo}
                  className={`text-body-sm whitespace-nowrap rounded-full px-4 py-2 font-medium transition-all ${
                    activo
                      ? "bg-aisc-forest text-aisc-cream shadow-xs"
                      : "text-aisc-muted hover:bg-aisc-sand/60 hover:text-aisc-ink"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={rutaAplicar}
              className="text-body-sm inline-flex items-center rounded-full bg-aisc-coral px-4 py-1.5 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85"
            >
              {d.ctaAplicar}
            </Link>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------ CUERPO EN DOS COLUMNAS */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Columna Principal de Contenido (8 cols) */}
          <div className="min-w-0 lg:col-span-8">
            {/* PESTAÑA 1: RESUMEN */}
            {pestaña === "resumen" && (
              <div className="space-y-12">
                {/* 1. La idea */}
                <div>
                  <h2 className="text-display-2 md:text-display-2-lg text-aisc-ink">
                    {d.resumen.ideaTitulo}
                  </h2>
                  <div className="text-body md:text-body-lg mt-5 space-y-4 text-aisc-ink/85">
                    {d.resumen.ideaParrafos.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* 2. Colombia */}
                <div className="rounded-2xl border border-aisc-forest/20 bg-aisc-sand/60 p-6 md:p-8">
                  <h3 className="text-display-3 text-aisc-forest">
                    {d.resumen.colombiaTitulo}
                  </h3>
                  <p className="text-body mt-3 text-aisc-ink/90">
                    {d.resumen.colombiaTexto}
                  </p>
                </div>

                {/* 3. El reto y los 4 requisitos */}
                <div className="border-t border-aisc-line pt-8">
                  <h3 className="text-display-3 md:text-display-3-lg text-aisc-ink">
                    {d.resumen.retoTitulo}
                  </h3>
                  <p className="text-body md:text-body-lg mt-3 text-aisc-ink/85">
                    {d.resumen.retoTexto}
                  </p>

                  <h4 className="text-display-4 mt-8 text-aisc-forest">
                    {d.resumen.cuatroRequisitosTitulo}
                  </h4>
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {d.resumen.cuatroRequisitos.map((req, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 rounded-xl border border-aisc-line bg-white p-4 shadow-2xs"
                      >
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-aisc-forest text-sm font-bold text-aisc-cream">
                          {idx + 1}
                        </span>
                        <p className="text-body-sm text-aisc-ink font-medium">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Quién puede participar */}
                <div className="border-t border-aisc-line pt-8">
                  <h3 className="text-display-3 text-aisc-ink">
                    {d.resumen.quienTitulo}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {d.resumen.quienPuntos.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-aisc-coral" />
                        <span className="text-body-sm text-aisc-ink/90">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. Premios */}
                <div className="border-t border-aisc-line pt-8">
                  <div className="mb-4">
                    <h3 className="text-display-3 text-aisc-ink">
                      {d.resumen.premiosTitulo}
                    </h3>
                    <p className="text-body-sm text-aisc-muted mt-1">
                      {idioma === "en"
                        ? "Judges will evaluate submissions and determine the top three projects at the conclusion of the sprint."
                        : idioma === "pt"
                        ? "Os jurados avaliarão as entregas e definirão os três primeiros lugares no encerramento do evento."
                        : "Los jurados evalúan los proyectos y definen los tres primeros lugares al cierre de la jornada."}
                    </p>
                  </div>

                  <PremiosSoberos
                    premios={d.premiosPodio}
                    premioDifusion={d.premioDifusion}
                  />
                </div>

                {/* 6. Mascota */}
                <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl bg-aisc-forest-deep p-6 text-aisc-sand md:p-8">
                  <img
                    src="/aisc/hackathon/cyberbear.png"
                    alt="CyberBear"
                    width={180}
                    height={277}
                    className="size-36 shrink-0 object-contain drop-shadow-md"
                  />
                  <div>
                    <h3 className="text-display-3 text-aisc-sand">
                      {d.resumen.mascotaTitulo}
                    </h3>
                    <p className="text-body-sm mt-2 text-aisc-sand/85">
                      {d.resumen.mascotaTexto}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 2: KITS Y TRACKS */}
            {pestaña === "tracks" && (
              <div className="space-y-12">
                {/* Starter Kits por nivel */}
                <div>
                  <h2 className="text-display-2 md:text-display-2-lg text-aisc-ink">
                    {d.kits.introTitulo}
                  </h2>
                  <p className="text-body md:text-body-lg mt-3 text-aisc-ink/85">
                    {d.kits.introTexto}
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-4">
                    {d.kits.listaKits.map((kit) => (
                      <div
                        key={kit.etiqueta}
                        className="flex flex-col gap-2.5 rounded-2xl border border-aisc-forest/25 bg-aisc-sand/40 p-6 md:p-7"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-kicker text-aisc-coral font-bold">
                            {kit.nivel}
                          </span>
                          <span className="text-display-4 font-semibold text-aisc-forest">
                            {kit.etiqueta}
                          </span>
                        </div>
                        <p className="text-meta text-aisc-muted font-medium">
                          {kit.audiencia}
                        </p>
                        <p className="text-body-sm text-aisc-ink mt-1">
                          <strong>Ideas sugeridas:</strong> {kit.ejemplos}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Los 5 Tracks temáticos de investigación */}
                <div className="border-t border-aisc-line pt-10">
                  <h3 className="text-display-2 md:text-display-2-lg text-aisc-ink">
                    {d.kits.tracksTitulo}
                  </h3>
                  <p className="text-body md:text-body-lg mt-3 text-aisc-ink/85">
                    {d.kits.tracksTexto}
                  </p>

                  <div className="mt-8 space-y-8">
                    {d.kits.listaTracks.map((tr) => (
                      <article
                        key={tr.id}
                        id={tr.id}
                        className="scroll-mt-24 rounded-2xl border border-aisc-line bg-white p-6 shadow-xs md:p-8"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-display-3 font-mono font-bold text-aisc-coral">
                            {tr.numero}
                          </span>
                          <h4 className="text-display-3 text-aisc-ink">
                            {tr.titulo}
                          </h4>
                        </div>

                        <p className="text-body mt-4 text-aisc-ink/90">
                          {tr.resumen}
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-aisc-line/70 pt-5 md:grid-cols-2">
                          <div className="rounded-xl bg-aisc-sand/50 p-4">
                            <span className="text-kicker text-aisc-forest font-bold">
                              Para empezar
                            </span>
                            <p className="text-body-sm mt-1.5 text-aisc-ink">
                              {tr.paraEmpezar}
                            </p>
                          </div>
                          <div className="rounded-xl bg-aisc-sand/50 p-4">
                            <span className="text-kicker text-aisc-forest font-bold">
                              Con experiencia
                            </span>
                            <p className="text-body-sm mt-1.5 text-aisc-ink">
                              {tr.conExperiencia}
                            </p>
                          </div>
                        </div>

                        {tr.paraIrMasLejos ? (
                          <div className="mt-3 rounded-xl bg-aisc-cream border border-aisc-line p-4">
                            <span className="text-kicker text-aisc-coral font-bold">
                              Para ir más lejos
                            </span>
                            <p className="text-body-sm mt-1.5 text-aisc-ink">
                              {tr.paraIrMasLejos}
                            </p>
                          </div>
                        ) : null}

                        {/* Recursos y Datasets */}
                        <div className="mt-5 pt-4 border-t border-aisc-line/60">
                          <span className="text-kicker text-aisc-muted">
                            Datasets, benchmarks y repositorios de partida:
                          </span>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {tr.recursos.map((rec) => (
                              <a
                                key={rec.url}
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-meta inline-flex items-center gap-1.5 rounded-full border border-aisc-forest/30 bg-aisc-sand/30 px-3 py-1 font-medium text-aisc-forest transition-colors hover:border-aisc-forest hover:bg-aisc-forest hover:text-aisc-sand"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                {rec.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 3: PREMIOS Y EVALUACIÓN */}
            {pestaña === "reglas" && (
              <div className="space-y-12">
                {/* Premios */}
                <div>
                  <h2 className="text-display-2 md:text-display-2-lg text-aisc-ink">
                    {d.resumen.premiosTitulo}
                  </h2>
                  <p className="text-body mt-2 mb-6 text-aisc-muted">
                    {idioma === "en"
                      ? "Prizes are awarded based on the judges' evaluation across defensive relevance, prototype functionality, empirical benchmarks, and responsible use."
                      : idioma === "pt"
                      ? "Os prêmios são concedidos com base na avaliação dos jurados em relevância defensiva, funcionamento do protótipo, evidência empírica e uso responsável."
                      : "Los premios se asignan con base en la evaluación de los jurados sobre relevancia defensiva, funcionamiento del prototipo, evidencia empírica y uso responsable."}
                  </p>

                  <PremiosSoberos
                    premios={d.premiosPodio}
                    premioDifusion={d.premioDifusion}
                  />
                </div>

                {/* Reglas de uso responsable */}
                <div className="border-t border-aisc-line pt-8">
                  <h3 className="text-display-3 text-aisc-ink">
                    {d.reglas.tituloSeguridad}
                  </h3>
                  <div className="mt-6 space-y-4">
                    {d.reglas.reglasSeguridad.map((regla, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50/50 p-4 text-aisc-ink"
                      >
                        <span className="mt-0.5 text-lg text-red-600 font-bold" aria-hidden="true">
                          ⚠
                        </span>
                        <p className="text-body-sm leading-relaxed">{regla}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Entregables */}
                <div className="border-t border-aisc-line pt-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-display-3 text-aisc-ink">
                      {d.reglas.entregablesTitulo}
                    </h3>
                    <span className="text-meta font-bold text-aisc-coral">
                      {d.reglas.entregablesHora}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {d.reglas.entregables.map((ent, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-xl border border-aisc-line bg-white p-4">
                        <span className="mt-1 size-2 rounded-full bg-aisc-forest shrink-0" />
                        <span className="text-body-sm font-medium text-aisc-ink">{ent}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Criterios de evaluación */}
                <div className="border-t border-aisc-line pt-8">
                  <h3 className="text-display-3 text-aisc-ink">
                    {d.reglas.criteriosTitulo}
                  </h3>
                  <p className="text-body mt-2 text-aisc-muted">
                    {d.reglas.criteriosTexto}
                  </p>

                  <div className="mt-6 space-y-3">
                    {d.reglas.criterios.map((c) => (
                      <div
                        key={c.nombre}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-aisc-line bg-aisc-sand/30 p-4 md:p-5"
                      >
                        <div className="min-w-0">
                          <h4 className="text-display-4 font-semibold text-aisc-ink">
                            {c.nombre}
                          </h4>
                          <p className="text-body-sm mt-1 text-aisc-muted">
                            {c.descripcion}
                          </p>
                        </div>
                        <span className="text-display-3 tabular-nums font-bold text-aisc-coral shrink-0">
                          {c.peso}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dinámica de finalistas */}
                <div className="rounded-2xl border border-aisc-forest/20 bg-aisc-sand/70 p-6 md:p-8">
                  <h3 className="text-display-3 text-aisc-forest">
                    {d.reglas.finalistasTitulo}
                  </h3>
                  <p className="text-body mt-3 text-aisc-ink/90 leading-relaxed">
                    {d.reglas.finalistasTexto}
                  </p>
                </div>

                {/* Jurados */}
                <div className="border-t border-aisc-line pt-8">
                  <h3 className="text-display-3 text-aisc-ink">
                    {d.reglas.juradosTitulo}
                  </h3>
                  <p className="text-body mt-1 text-aisc-muted">
                    {d.reglas.juradosTexto}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {d.reglas.jurados.map((j) => (
                      <div
                        key={j.nombre}
                        className={`rounded-2xl border p-5 ${
                          j.confirmado
                            ? "border-aisc-forest/40 bg-white shadow-2xs"
                            : "border-dashed border-aisc-line bg-aisc-sand/20"
                        }`}
                      >
                        <span className="text-kicker text-aisc-coral font-bold">
                          {j.rol}
                        </span>
                        <h4 className="text-display-4 mt-1 font-semibold text-aisc-ink">
                          {j.nombre}
                        </h4>
                        <p className="text-meta font-medium text-aisc-forest mt-0.5">
                          {j.afiliacion}
                        </p>
                        <p className="text-body-sm text-aisc-muted mt-2">
                          {j.bio}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 4: CRONOGRAMA Y FAQ */}
            {pestaña === "cronograma" && (
              <div className="space-y-12">
                {/* Minuto a minuto */}
                <div>
                  <h2 className="text-display-2 md:text-display-2-lg text-aisc-ink">
                    {d.cronograma.titulo}
                  </h2>
                  <p className="text-body mt-2 text-aisc-muted">
                    {d.cronograma.subtitulo}
                  </p>

                  <div className="mt-8 space-y-3">
                    {d.cronograma.agenda.map((ag) => (
                      <div
                        key={ag.hora}
                        className={`flex flex-col sm:flex-row sm:items-start gap-4 rounded-xl border p-4 transition-colors ${
                          ag.destacado
                            ? "border-aisc-coral/40 bg-aisc-sand/60"
                            : "border-aisc-line bg-white"
                        }`}
                      >
                        <time className="text-display-4 font-mono font-bold text-aisc-forest shrink-0 sm:w-28">
                          {ag.hora}
                        </time>
                        <div className="min-w-0">
                          <h4 className="text-display-4 font-semibold text-aisc-ink">
                            {ag.actividad}
                          </h4>
                          <p className="text-body-sm text-aisc-muted mt-1">
                            {ag.detalle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendario previo */}
                <div className="border-t border-aisc-line pt-8">
                  <h3 className="text-display-3 text-aisc-ink">
                    {d.cronograma.calendarioPrevioTitulo}
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {d.cronograma.calendarioPrevio.map((cal, i) => (
                      <div key={i} className="rounded-xl border border-aisc-line bg-aisc-sand/40 p-4">
                        <span className="text-kicker text-aisc-coral font-bold">{cal.fecha}</span>
                        <p className="text-body-sm font-medium text-aisc-ink mt-1">{cal.hito}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preguntas frecuentes */}
                <div className="border-t border-aisc-line pt-8">
                  <h3 className="text-display-3 text-aisc-ink">
                    {d.cronograma.faqTitulo}
                  </h3>
                  <div className="mt-6 space-y-4">
                    {d.cronograma.faqs.map((faq) => (
                      <details key={faq.q} className="group rounded-2xl border border-aisc-line bg-white p-5">
                        <summary className="text-display-4 cursor-pointer font-semibold text-aisc-ink list-none flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                          <span>{faq.q}</span>
                          <span className="text-aisc-coral text-xl font-bold transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="text-body-sm text-aisc-ink/80 mt-3 pt-3 border-t border-aisc-line/60 leading-relaxed">
                          {faq.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ---------------------------------- COLUMNA LATERAL STICKY (4 cols) estilo Apart */}
          <aside className="w-full lg:sticky lg:top-24 lg:col-span-4">
            <div className="flex flex-col gap-5 rounded-[8px] border border-aisc-line bg-aisc-sand/30 p-6 text-body-sm">
              <div>
                <span className="text-kicker uppercase tracking-wider text-aisc-muted font-semibold block">
                  {d.sidebar.titulo}
                </span>
                <h3 className="text-display-4 font-semibold text-aisc-forest mt-1">
                  {d.titulo}
                </h3>
              </div>

              <dl className="space-y-3.5 border-t border-aisc-line pt-4 text-body-sm">
                <div>
                  <dt className="text-meta uppercase tracking-wider text-aisc-muted font-medium">{d.sidebar.fechaRotulo}</dt>
                  <dd className="font-semibold text-aisc-ink mt-0.5">{d.sidebar.fechaValor}</dd>
                </div>
                <div>
                  <dt className="text-meta uppercase tracking-wider text-aisc-muted font-medium">{d.sidebar.horarioRotulo}</dt>
                  <dd className="font-semibold text-aisc-ink mt-0.5">{d.sidebar.horarioValor}</dd>
                </div>
                <div>
                  <dt className="text-meta uppercase tracking-wider text-aisc-muted font-medium">{d.sidebar.lugarRotulo}</dt>
                  <dd className="font-semibold text-aisc-ink mt-0.5">{d.sidebar.lugarValor}</dd>
                </div>
                <div>
                  <dt className="text-meta uppercase tracking-wider text-aisc-muted font-medium">{d.sidebar.formatoRotulo}</dt>
                  <dd className="font-semibold text-aisc-ink mt-0.5">{d.sidebar.formatoValor}</dd>
                </div>
                <div>
                  <dt className="text-meta uppercase tracking-wider text-aisc-muted font-medium">{d.sidebar.premiosRotulo}</dt>
                  <dd className="font-semibold text-aisc-forest mt-0.5">{d.sidebar.premiosValor}</dd>
                </div>
                <div>
                  <dt className="text-meta uppercase tracking-wider text-aisc-muted font-medium">{d.sidebar.comidaRotulo}</dt>
                  <dd className="font-semibold text-aisc-ink mt-0.5">{d.sidebar.comidaValor}</dd>
                </div>
                <div>
                  <dt className="text-meta uppercase tracking-wider text-aisc-muted font-medium">{d.sidebar.cupoRotulo}</dt>
                  <dd className="font-semibold text-aisc-ink mt-0.5">{d.sidebar.cupoValor}</dd>
                </div>
              </dl>

              <div className="border-t border-aisc-line pt-4 flex flex-col gap-3">
                <Link
                  href={rutaAplicar}
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-[8px] bg-aisc-forest px-6 text-center font-semibold text-aisc-sand transition-colors hover:bg-aisc-forest-deep focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-forest"
                >
                  {d.ctaAplicar}
                </Link>
              </div>

              <div className="border-t border-aisc-line pt-3 text-center">
                <span className="text-meta text-aisc-muted font-medium block">
                  {d.sidebar.organizanRotulo}
                </span>
                <span className="text-caption font-semibold text-aisc-forest mt-0.5 block">
                  AI Safety Colombia × IEEE Computer Society Uniandes
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter idioma={idioma} />
    </main>
  );
}
