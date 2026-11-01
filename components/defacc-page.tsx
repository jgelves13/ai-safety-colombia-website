"use client";

import Link from "next/link";
import { League_Spartan } from "next/font/google";
import { useState } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import {
  CTA_LINK,
  CTA_LINK_PRIMARY,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";
import { TEXTOS_HACKATHON } from "@/app/defacchackathon/datos";
import type { Premio } from "@/app/defacchackathon/datos";
import type { Idioma } from "@/lib/idiomas";
import { rutaEn } from "@/lib/idiomas";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-6 sm:px-8 md:px-16";

function FondoBinario() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden select-none md:block"
    >
      <img
        src="/aisc/hackathon/binario-izq.webp"
        alt=""
        width={220}
        height={500}
        decoding="async"
        className="absolute top-0 bottom-0 left-0 h-full w-auto object-cover opacity-50 lg:opacity-70"
      />
      <img
        src="/aisc/hackathon/binario-der.webp"
        alt=""
        width={226}
        height={500}
        decoding="async"
        className="absolute top-0 right-0 bottom-0 h-full w-auto object-cover opacity-65 lg:opacity-85"
      />
    </div>
  );
}

function TextoConLeadIn({ texto }: { texto: string }) {
  const idx = texto.indexOf(":");
  if (idx === -1) {
    return <span>{texto}</span>;
  }
  const lead = texto.slice(0, idx + 1);
  const resto = texto.slice(idx + 1);
  return (
    <span>
      <strong className="font-semibold text-aisc-ink">{lead}</strong>
      {resto}
    </span>
  );
}

function PremiosEditorial({
  premios,
  premioDifusion,
}: {
  premios: Premio[];
  premioDifusion: Premio;
}) {
  return (
    <div className="mt-6">
      <dl className="grid grid-cols-1 border-y border-aisc-line sm:grid-cols-3 sm:divide-x sm:divide-aisc-line">
        {premios.map((p, i) => (
          <div
            key={p.puesto}
            className={`flex flex-col justify-between py-5 ${
              i === 0
                ? "sm:pr-6"
                : i === 1
                ? "border-t border-aisc-line sm:border-t-0 sm:px-6"
                : "border-t border-aisc-line sm:border-t-0 sm:pl-6"
            }`}
          >
            <dt className="text-kicker text-aisc-muted">{p.puesto}</dt>
            <dd className="mt-3 flex items-baseline gap-1.5">
              <span className="text-meta font-semibold text-aisc-muted">
                COP
              </span>
              <span className="font-[family-name:var(--font-display)] text-[1.75rem] font-bold tracking-tight tabular-nums text-aisc-forest md:text-[2rem]">
                {p.monto}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {premioDifusion && (
        <p className="mt-4 text-body-sm text-aisc-muted">
          <strong className="font-semibold text-aisc-ink">
            {premioDifusion.puesto}:
          </strong>{" "}
          {premioDifusion.detalle} ({premioDifusion.monto}).
        </p>
      )}
    </div>
  );
}

export default function DefAccPage({ idioma = "es" }: { idioma?: Idioma }) {
  const d = TEXTOS_HACKATHON[idioma];
  const [pestaña, setPestaña] = useState<
    "resumen" | "tracks" | "reglas" | "cronograma"
  >("resumen");

  const rutaAplicar = rutaEn(idioma, "/defacchackathon/aplicar");

  const datosClave =
    idioma === "en"
      ? [
          {
            etiqueta: "Date & format",
            valor: "November 14, 2026",
            nota: "Full Saturday, 8:00 AM to 8:00 PM (8-hour build sprint)",
          },
          {
            etiqueta: "Location",
            valor: "In-person in Bogotá",
            nota: "Universidad de los Andes campus",
          },
          {
            etiqueta: "Prizes",
            valor: "COP 2,000,000",
            nota: "Three winning teams selected at the close of the sprint",
          },
        ]
      : idioma === "pt"
      ? [
          {
            etiqueta: "Data e formato",
            valor: "14 de novembro de 2026",
            nota: "Sábado inteiro, das 8:00 às 20:00 (8 h de desenvolvimento)",
          },
          {
            etiqueta: "Local",
            valor: "Presencial em Bogotá",
            nota: "Campus da Universidad de los Andes",
          },
          {
            etiqueta: "Prêmios",
            valor: "COP 2.000.000",
            nota: "Três equipes vencedoras escolhidas no encerramento do dia",
          },
        ]
      : [
          {
            etiqueta: "Fecha y jornada",
            valor: "14 de noviembre de 2026",
            nota: "Sábado completo, de 8:00 a. m. a 8:00 p. m. (8 h de desarrollo)",
          },
          {
            etiqueta: "Modalidad y sede",
            valor: "Presencial en Bogotá",
            nota: "Campus de la Universidad de los Andes",
          },
          {
            etiqueta: "Bolsa de premios",
            valor: "COP 2.000.000",
            nota: "Tres equipos ganadores escogidos al cierre de la jornada",
          },
        ];

  const cambiarPestaña = (
    id: "resumen" | "tracks" | "reglas" | "cronograma"
  ) => {
    setPestaña(id);
    const el = document.getElementById("contenido-hackathon");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const textoSiguiente =
    idioma === "en" ? "Next:" : idioma === "pt" ? "Próximo:" : "Siguiente:";

  return (
    <main className={PAGE_SHELL}>
      {/* ------------------------------------------------------------ HERO */}
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />

        <div
          className={`${CONTENEDOR} relative z-10 pt-28 pb-12 md:pt-36 md:pb-16`}
        >
          <div className="flex max-w-[820px] flex-col gap-5">
            <h1
              className={`${leagueSpartan.className} flex flex-col uppercase leading-[0.94] tracking-[-0.02em]`}
            >
              <span className="text-[1.5rem] sm:text-[2.1rem] md:text-[2.65rem] font-extrabold text-aisc-coral">
                Defensive Acceleration
              </span>
              <span className="mt-1 text-[2.5rem] sm:text-[3.8rem] md:text-[4.85rem] font-black text-aisc-sand tracking-[-0.03em]">
                Hackathon
              </span>
            </h1>

            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              {d.lema}
            </p>

            <p className="text-body-sm mt-1 w-fit text-aisc-sand/75">
              {d.estadoInscripciones}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Link className={CTA_LINK_PRIMARY} href={rutaAplicar}>
                {d.ctaAplicar}
              </Link>
              <button
                type="button"
                onClick={() => cambiarPestaña("tracks")}
                className={CTA_LINK}
              >
                {d.ctaVerBases}
              </button>
            </div>
          </div>

          <img
            src="/aisc/hackathon/cyberbear.png"
            alt=""
            aria-hidden="true"
            width={474}
            height={730}
            decoding="async"
            className="pointer-events-none absolute right-8 bottom-0 z-0 hidden h-[86%] max-h-[370px] w-auto select-none object-contain object-bottom lg:block xl:right-16 xl:max-h-[400px]"
          />
        </div>
      </section>

      {/* Banda de organizadores */}
      <section className="border-b border-aisc-line bg-aisc-sand">
        <div className={CONTENEDOR}>
          <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:gap-10 md:py-7">
            <p className="text-kicker whitespace-nowrap text-aisc-muted sm:flex-none">
              {idioma === "en"
                ? "Organized by"
                : idioma === "pt"
                ? "Organizam"
                : "Organizan"}
            </p>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-5 sm:ml-auto md:gap-x-12">
              <li>
                <Link
                  className="block transition-opacity hover:opacity-60"
                  href={rutaEn(idioma, "/")}
                  title="AI Safety Colombia"
                >
                  <img
                    alt="AI Safety Colombia"
                    className="max-h-[42px] w-auto object-contain md:max-h-[44px]"
                    decoding="async"
                    src="/aisc/logo-lockup-oscuro.png"
                  />
                </Link>
              </li>
              <li>
                <a
                  className="block transition-opacity hover:opacity-60"
                  href="https://www.instagram.com/csuniandes/"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="IEEE Computer Society Uniandes"
                >
                  <img
                    alt="IEEE Computer Society Uniandes"
                    className="max-h-[54px] max-w-[185px] w-auto object-contain md:max-h-[58px] md:max-w-[200px]"
                    decoding="async"
                    height={167}
                    src="/aisc/aliados/ieee-cs-uniandes.png"
                    width={560}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ficha rápida editorial (líneas finas estilo Apart Research, sin bloques pesados) */}
      <section className="border-b border-aisc-line bg-aisc-cream">
        <div className={CONTENEDOR}>
          <dl className="grid grid-cols-1 divide-y divide-aisc-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {datosClave.map((item, idx) => (
              <div
                key={item.valor}
                className={`py-5 md:py-7 ${
                  idx === 0
                    ? "md:pr-8"
                    : idx === 1
                    ? "md:px-8"
                    : "md:pl-8"
                }`}
              >
                <dt className="text-kicker text-aisc-muted">{item.etiqueta}</dt>
                <dd className="mt-1.5 text-display-4 text-aisc-ink">
                  {item.valor}
                </dd>
                <dd className="mt-1 text-body-sm text-aisc-muted">
                  {item.nota}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Barra de pestañas estilo Apart Research (.sprint-details) */}
      <div
        id="contenido-hackathon"
        className="scroll-mt-24 border-b border-aisc-line bg-aisc-sand/45"
      >
        <div className={CONTENEDOR}>
          <nav
            aria-label="Secciones del hackatón"
            className="flex items-center gap-2 overflow-x-auto py-3.5 no-scrollbar"
          >
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
                  className={`text-body-sm min-h-10 shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-medium transition-colors ${
                    activo
                      ? "bg-aisc-forest-deep text-aisc-sand"
                      : "text-aisc-ink hover:bg-aisc-sand"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ------------------------------------------------ CONTENIDO EDITORIAL */}
      <div className="bg-aisc-cream py-12 md:py-16">
        <div className={CONTENEDOR}>
          <div className="max-w-[56rem]">
            {/* ==================== PESTAÑA 1: EL RETO ==================== */}
            {pestaña === "resumen" && (
              <div>
                {/* 1. La idea + Relevancia en nuestro entorno */}
                <section>
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.resumen.ideaTitulo}
                  </h2>
                  <div className="mt-4 max-w-[68ch] space-y-4 text-body md:text-body-lg text-aisc-ink/90">
                    {d.resumen.ideaParrafos.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-6 max-w-[68ch] border-l-2 border-aisc-forest py-1 pl-5">
                    <h3 className="text-display-4 text-aisc-ink">
                      {d.resumen.colombiaTitulo}
                    </h3>
                    <p className="mt-1.5 text-body-sm md:text-body text-aisc-muted">
                      {d.resumen.colombiaTexto}
                    </p>
                  </div>
                </section>

                {/* 2. El reto y las 4 preguntas clave (.fsteps de Apart Research) */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.resumen.retoTitulo}
                  </h2>
                  <p className="mt-3 max-w-[68ch] text-body md:text-body-lg text-aisc-ink/90">
                    {d.resumen.retoTexto}
                  </p>

                  <ul className="mt-9 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                    {d.resumen.cuatroRequisitos.map((req, idx) => {
                      const partes = req.split(":");
                      const titulo =
                        partes.length > 1 ? partes[0] : `Paso ${idx + 1}`;
                      const cuerpo =
                        partes.length > 1
                          ? partes.slice(1).join(":").trim()
                          : req;
                      return (
                        <li
                          key={idx}
                          className="relative border-t border-aisc-line pt-6 sm:pr-6 lg:pr-7"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute -top-[5.5px] left-0 size-2.5 rounded-full bg-aisc-coral ring-4 ring-aisc-cream"
                          />
                          <h3 className="text-display-4 text-aisc-ink">
                            {titulo}
                          </h3>
                          <p className="mt-2 text-body-sm text-aisc-muted">
                            {cuerpo}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </section>

                {/* 3. Quién puede participar */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.resumen.quienTitulo}
                  </h2>
                  <ul className="mt-5 max-w-[68ch] divide-y divide-aisc-line border-y border-aisc-line">
                    {d.resumen.quienPuntos.map((pt, i) => (
                      <li
                        key={i}
                        className="py-4 text-body-sm md:text-body text-aisc-ink/90"
                      >
                        <TextoConLeadIn texto={pt} />
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 4. Premios */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.resumen.premiosTitulo}
                  </h2>
                  <div className="mt-3 max-w-[68ch] space-y-3 text-body md:text-body-lg text-aisc-ink/90">
                    {d.resumen.premiosParrafos.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <PremiosEditorial
                    premios={d.premiosPodio}
                    premioDifusion={d.premioDifusion}
                  />
                </section>

                {/* 5. Jueces y mentores */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.reglas.juradosTitulo}
                  </h2>
                  <p className="mt-3 max-w-[68ch] text-body md:text-body-lg text-aisc-muted">
                    {d.reglas.juradosTexto}
                  </p>
                </section>

                {/* Enlace de continuación estilo Apart Research */}
                <div className="mt-12 border-t border-aisc-line pt-6">
                  <button
                    type="button"
                    onClick={() => cambiarPestaña("tracks")}
                    className="inline-flex items-center gap-2 text-body-sm font-semibold text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                  >
                    <span>
                      {textoSiguiente} {d.pestañas.tracks}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ==================== PESTAÑA 2: FRENTES TEMÁTICOS ==================== */}
            {pestaña === "tracks" && (
              <div>
                <section>
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.kits.tracksTitulo}
                  </h2>
                  <p className="mt-3 max-w-[68ch] text-body md:text-body-lg text-aisc-ink/90">
                    {d.kits.tracksTexto}
                  </p>
                </section>

                <ul className="mt-8 divide-y divide-aisc-line border-t border-aisc-line">
                  {d.kits.listaTracks.map((tr) => (
                    <li key={tr.id} id={tr.id} className="py-9">
                      <article>
                        <div className="flex items-baseline gap-3">
                          <span
                            className="text-meta font-semibold tabular-nums text-aisc-coral"
                            aria-hidden="true"
                          >
                            {tr.numero}
                          </span>
                          <h3 className="text-display-3 text-aisc-ink">
                            {tr.titulo}
                          </h3>
                        </div>

                        <p className="mt-3 max-w-[68ch] text-body text-aisc-ink/90">
                          {tr.resumen}
                        </p>

                        {/* Dos columnas estilo .tracks / .tracks-half de Apart Research */}
                        <div className="mt-6 grid grid-cols-1 gap-5 border-t border-aisc-line pt-5 md:grid-cols-2 md:gap-0">
                          <div className="md:pr-8">
                            <span className="text-kicker font-bold text-aisc-forest">
                              {idioma === "en"
                                ? "Getting started"
                                : idioma === "pt"
                                ? "Para começar"
                                : "Para empezar"}
                            </span>
                            <p className="mt-1.5 text-body-sm text-aisc-ink/90">
                              {tr.paraEmpezar}
                            </p>
                          </div>
                          <div className="border-t border-aisc-line pt-4 md:border-t-0 md:border-l md:pl-8 md:pt-0">
                            <span className="text-kicker font-bold text-aisc-forest">
                              {idioma === "en"
                                ? "Advanced scope"
                                : idioma === "pt"
                                ? "Com experiência"
                                : "Con experiencia"}
                            </span>
                            <p className="mt-1.5 text-body-sm text-aisc-ink/90">
                              {tr.conExperiencia}
                            </p>
                          </div>
                        </div>

                        {/* Recursos y repositorios con los botones tipo píldora e ícono de enlace externo */}
                        <div className="mt-5 pt-2">
                          <span className="text-kicker text-aisc-muted">
                            {idioma === "en"
                              ? "Starter datasets, benchmarks & repositories:"
                              : idioma === "pt"
                              ? "Datasets, benchmarks e repositórios de partida:"
                              : "Datasets, benchmarks y repositorios de partida:"}
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
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  aria-hidden="true"
                                >
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
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-aisc-line pt-6">
                  <button
                    type="button"
                    onClick={() => cambiarPestaña("reglas")}
                    className="inline-flex items-center gap-2 text-body-sm font-semibold text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                  >
                    <span>
                      {textoSiguiente} {d.pestañas.reglas}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ==================== PESTAÑA 3: PREMIOS Y EVALUACIÓN ==================== */}
            {pestaña === "reglas" && (
              <div>
                {/* Premios */}
                <section>
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.resumen.premiosTitulo}
                  </h2>
                  <div className="mt-3 max-w-[68ch] space-y-3 text-body md:text-body-lg text-aisc-ink/90">
                    {d.resumen.premiosParrafos.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <PremiosEditorial
                    premios={d.premiosPodio}
                    premioDifusion={d.premioDifusion}
                  />
                </section>

                {/* Entregables */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-display-3 text-aisc-ink">
                      {d.reglas.entregablesTitulo}
                    </h2>
                    <span className="text-kicker text-aisc-coral">
                      {d.reglas.entregablesHora}
                    </span>
                  </div>
                  <ul className="mt-5 max-w-[68ch] divide-y divide-aisc-line border-y border-aisc-line">
                    {d.reglas.entregables.map((ent, i) => (
                      <li
                        key={i}
                        className="py-4 text-body-sm md:text-body text-aisc-ink/90"
                      >
                        <TextoConLeadIn texto={ent} />
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Criterios de evaluación */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.reglas.criteriosTitulo}
                  </h2>
                  <p className="mt-2 max-w-[68ch] text-body-sm md:text-body text-aisc-muted">
                    {d.reglas.criteriosTexto}
                  </p>

                  <ul className="mt-6 divide-y divide-aisc-line border-y border-aisc-line">
                    {d.reglas.criterios.map((c) => (
                      <li
                        key={c.nombre}
                        className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-4"
                      >
                        <div className="max-w-[60ch]">
                          <h3 className="text-display-4 text-aisc-ink">
                            {c.nombre}
                          </h3>
                          <p className="mt-1 text-body-sm text-aisc-muted">
                            {c.descripcion}
                          </p>
                        </div>
                        <span className="font-[family-name:var(--font-display)] text-lg font-bold tabular-nums text-aisc-forest">
                          {c.peso}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 max-w-[68ch] border-l-2 border-aisc-forest py-1 pl-5">
                    <h3 className="text-display-4 text-aisc-ink">
                      {d.reglas.finalistasTitulo}
                    </h3>
                    <p className="mt-1.5 text-body-sm md:text-body text-aisc-muted">
                      {d.reglas.finalistasTexto}
                    </p>
                  </div>
                </section>

                {/* Reglas de uso responsable */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.reglas.tituloSeguridad}
                  </h2>
                  <ul className="mt-5 max-w-[68ch] divide-y divide-aisc-line border-y border-aisc-line">
                    {d.reglas.reglasSeguridad.map((regla, i) => (
                      <li
                        key={i}
                        className="py-4 text-body-sm md:text-body text-aisc-ink/90"
                      >
                        <TextoConLeadIn texto={regla} />
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="mt-12 border-t border-aisc-line pt-6">
                  <button
                    type="button"
                    onClick={() => cambiarPestaña("cronograma")}
                    className="inline-flex items-center gap-2 text-body-sm font-semibold text-aisc-forest transition-colors hover:text-aisc-forest-deep"
                  >
                    <span>
                      {textoSiguiente} {d.pestañas.cronograma}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ==================== PESTAÑA 4: AGENDA Y FAQ ==================== */}
            {pestaña === "cronograma" && (
              <div>
                {/* Minuto a minuto */}
                <section>
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.cronograma.titulo}
                  </h2>
                  <p className="mt-2 max-w-[68ch] text-body-sm md:text-body text-aisc-muted">
                    {d.cronograma.subtitulo}
                  </p>

                  <ul className="mt-6 divide-y divide-aisc-line border-y border-aisc-line">
                    {d.cronograma.agenda.map((ag) => (
                      <li
                        key={ag.hora}
                        className="grid gap-1.5 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
                      >
                        <time className="text-meta font-semibold uppercase tracking-wider tabular-nums text-aisc-forest">
                          {ag.hora}
                        </time>
                        <div className="min-w-0 max-w-[60ch]">
                          <h3 className="text-display-4 text-aisc-ink">
                            {ag.actividad}
                          </h3>
                          <p className="mt-1 text-body-sm text-aisc-muted">
                            {ag.detalle}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Fechas clave */}
                <section className="mt-12 border-t border-aisc-line pt-10">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.cronograma.calendarioPrevioTitulo}
                  </h2>

                  <ul className="mt-6 divide-y divide-aisc-line border-y border-aisc-line">
                    {d.cronograma.calendarioPrevio.map((cal, i) => (
                      <li
                        key={i}
                        className="grid gap-1.5 py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
                      >
                        <span className="text-meta font-semibold uppercase tracking-wider text-aisc-forest">
                          {cal.fecha}
                        </span>
                        <p className="max-w-[60ch] text-body-sm md:text-body text-aisc-ink/90">
                          {cal.hito}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Preguntas frecuentes (acordeón exacto de apartresearch.com/fellowships) */}
                <section className="mt-12 pt-2">
                  <h2 className="text-display-3 text-aisc-ink">
                    {d.cronograma.faqTitulo}
                  </h2>

                  <div className="mt-6 border-t border-aisc-line">
                    {d.cronograma.faqs.map((faq) => (
                      <details
                        key={faq.q}
                        className="group border-b border-aisc-line"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                          <span className="text-body font-medium text-aisc-ink">
                            {faq.q}
                          </span>
                          <span
                            aria-hidden="true"
                            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-aisc-sand text-aisc-forest-deep transition-transform group-open:rotate-180"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2.5 4.5L6 8L9.5 4.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </summary>
                        <div className="max-w-[65ch] pb-6 text-body-sm md:text-body text-aisc-muted">
                          <p>{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </div>

      <SiteFooter idioma={idioma} />
    </main>
  );
}
