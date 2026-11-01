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
import {
  TEXTOS_HACKATHON,
} from "@/app/defacchackathon/datos";
import type { Premio } from "@/app/defacchackathon/datos";
import type { Idioma } from "@/lib/idiomas";
import { rutaEn } from "@/lib/idiomas";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-6 sm:px-8 md:px-16";
const HAIRLINE = "h-px w-full bg-aisc-forest/25";
const ENCABEZADO =
  "mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10";
const COL_TITULO = "lg:col-span-5";
const COL_CONTENIDO = "flex min-w-0 flex-col gap-6 lg:col-span-7";
const PROSA =
  "text-body md:text-body-lg flex max-w-[680px] flex-col gap-5 text-aisc-ink";
const TARJETA =
  "flex flex-col gap-3 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-5 md:p-6";
const AVISO_OSCURO =
  "flex flex-col gap-3 rounded-[8px] bg-aisc-forest-deep px-5 py-6 text-aisc-sand md:px-7 md:py-7";
const ENLACE =
  "text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep";

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

function PremiosSoberos({
  premios,
  premioDifusion,
}: {
  premios: Premio[];
  premioDifusion: Premio;
}) {
  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {premios.map((p, i) => (
          <li className="flex" key={p.puesto}>
            <article
              className={`flex min-h-[144px] w-full flex-col justify-between rounded-[8px] p-5 md:min-h-[164px] md:p-6 ${
                i === 0
                  ? "bg-aisc-forest text-aisc-sand"
                  : "border border-aisc-forest/55 bg-aisc-cream text-aisc-ink"
              }`}
            >
              <span
                className={`text-meta font-semibold tracking-widest uppercase ${
                  i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"
                }`}
              >
                {p.puesto}
              </span>
              <span className="mt-6 flex flex-col">
                <span
                  className={`text-meta ${
                    i === 0 ? "text-aisc-sand/75" : "text-aisc-muted"
                  }`}
                >
                  COP
                </span>
                <span
                  className={`font-[family-name:var(--font-display)] text-[1.85rem] lg:text-[2.1rem] font-extrabold leading-none tracking-tight tabular-nums whitespace-nowrap mt-1 ${
                    i === 0 ? "text-aisc-sand" : "text-aisc-forest"
                  }`}
                >
                  {p.monto}
                </span>
              </span>
            </article>
          </li>
        ))}
      </ul>

      {premioDifusion && (
        <div className="rounded-[8px] border border-aisc-forest/40 bg-aisc-sand/50 p-5 text-body-sm">
          <span className="text-meta font-semibold uppercase tracking-wider text-aisc-forest block">
            {premioDifusion.puesto}
          </span>
          <p className="mt-1 text-aisc-ink">
            {premioDifusion.detalle} ({premioDifusion.monto}).
          </p>
        </div>
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
            valor: "November 14",
            nota: "One full Saturday, from 8:00 AM to 8:00 PM (8h sprint)",
          },
          {
            valor: "In-person in Bogotá",
            nota: "Universidad de los Andes campus",
          },
          {
            valor: "COP 2,000,000 in prizes",
            nota: "Three winning teams selected by the judges at the close of the sprint",
          },
        ]
      : idioma === "pt"
      ? [
          {
            valor: "14 de novembro",
            nota: "Um sábado inteiro, das 8:00 às 20:00 (8 h de sprint)",
          },
          {
            valor: "Presencial em Bogotá",
            nota: "Campus da Universidad de los Andes",
          },
          {
            valor: "COP 2.000.000 em prêmios",
            nota: "Três equipes vencedoras escolhidas pelos jurados no encerramento do dia",
          },
        ]
      : [
          {
            valor: "14 de noviembre",
            nota: "Un sábado completo, de 8:00 a. m. a 8:00 p. m. (8 h de desarrollo)",
          },
          {
            valor: "Presencial en Bogotá",
            nota: "Campus de la Universidad de los Andes",
          },
          {
            valor: "COP 2.000.000 en premios",
            nota: "Tres equipos ganadores escogidos por el jurado al cierre de la jornada",
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

  return (
    <main className={PAGE_SHELL}>
      {/* ------------------------------------------------------------ HERO */}
      <section className={HERO_SECTION}>
        <FondoBinario />
        <SiteHeader active="/defacchackathon" />

        {/* pt-28 / md:pt-32 respeta la altura del SiteHeader absoluto para que nunca se pisen en móvil ni en escritorio */}
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

          {/* En pantallas grandes el oso se apoya al ras del borde inferior del hero (bottom-0) para que el corte nunca flote en el aire; en móvil se oculta siguiendo el patrón mobile-first del sitio */}
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

      {/* Banda de organizadores pegada al hero: idéntica a /sprint */}
      <section className="bg-aisc-sand">
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

      {/* Las tres cifras clave en tarjetas oscuras: idéntico a /sprint */}
      <section className="bg-aisc-cream pt-8 pb-6 md:pt-10 md:pb-8">
        <div className={CONTENEDOR}>
          <dl className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-3">
            {datosClave.map((item) => (
              <div
                className="flex min-h-[116px] flex-col justify-start rounded-[8px] bg-aisc-forest-deep px-5 py-5 text-aisc-sand md:min-h-[142px] md:px-7 md:py-7"
                key={item.valor}
              >
                <dt className="text-display-4 md:text-display-4-lg break-words">
                  {item.valor}
                </dt>
                <dd className="text-body-sm mt-3 text-aisc-sand/90">
                  {item.nota}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Barra de pestañas editorial (no sticky, para que jamás colisione con la pastilla flotante del SiteHeader al hacer scroll) */}
      <div id="contenido-hackathon" className="scroll-mt-24 bg-aisc-cream pt-2">
        <div className={CONTENEDOR}>
          <nav
            aria-label="Secciones del hackatón"
            className="flex items-center gap-1.5 overflow-x-auto border-b border-aisc-forest/25 pb-4 no-scrollbar sm:gap-2"
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
                  className={`text-body-sm shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-medium transition-colors ${
                    activo
                      ? "bg-aisc-forest-deep text-aisc-sand"
                      : "border border-aisc-forest/30 text-aisc-ink hover:border-aisc-forest hover:bg-aisc-sand/60"
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
      <div className="bg-aisc-cream py-10 md:py-14">
        <div className={CONTENEDOR}>
          {/* ==================== PESTAÑA 1: EL RETO ==================== */}
          {pestaña === "resumen" && (
            <div className="flex flex-col gap-12 md:gap-16">
              {/* 1. La idea + Relevancia en Colombia */}
              <section>
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.resumen.ideaTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <div className={PROSA}>
                      {d.resumen.ideaParrafos.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <div className={AVISO_OSCURO}>
                      <h3 className="text-display-4 text-aisc-sand">
                        {d.resumen.colombiaTitulo}
                      </h3>
                      <p className="text-body-sm md:text-body text-aisc-sand/90">
                        {d.resumen.colombiaTexto}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. El reto y las 4 preguntas clave */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.resumen.retoTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <p className="text-body md:text-body-lg max-w-[680px] text-aisc-ink">
                      {d.resumen.retoTexto}
                    </p>
                  </div>
                </div>

                <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
                  {d.resumen.cuatroRequisitos.map((req, idx) => {
                    const partes = req.split(":");
                    const titulo = partes.length > 1 ? partes[0] : `0${idx + 1}`;
                    const cuerpo =
                      partes.length > 1 ? partes.slice(1).join(":").trim() : req;
                    return (
                      <li className="flex" key={idx}>
                        <article className={`${TARJETA} w-full`}>
                          <span
                            className="text-display-4 tabular-nums text-aisc-coral"
                            aria-hidden="true"
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-display-4 text-balance">
                            {titulo}
                          </h3>
                          <p className="text-body-sm text-aisc-ink">{cuerpo}</p>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* 3. Quién puede participar */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.resumen.quienTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                      {d.resumen.quienPuntos.map((pt, i) => (
                        <li
                          key={i}
                          className="border-t border-aisc-forest/25 py-5 text-body-sm text-aisc-ink"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. Premios */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.resumen.premiosTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <div className={PROSA}>
                      {d.resumen.premiosParrafos.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <PremiosSoberos
                      premios={d.premiosPodio}
                      premioDifusion={d.premioDifusion}
                    />
                  </div>
                </div>
              </section>

              {/* 5. Jueces y mentores (al final de El reto, sin publicar nombres hasta tener luz verde) */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.reglas.juradosTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <p className="text-body md:text-body-lg max-w-[680px] text-aisc-ink">
                      {d.reglas.juradosTexto}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==================== PESTAÑA 2: FRENTES TEMÁTICOS ==================== */}
          {pestaña === "tracks" && (
            <div className="flex flex-col gap-10 md:gap-12">
              <div className={ENCABEZADO}>
                <h2
                  className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                >
                  {d.kits.tracksTitulo}
                </h2>
                <div className={COL_CONTENIDO}>
                  <p className="text-body md:text-body-lg max-w-[680px] text-aisc-ink">
                    {d.kits.tracksTexto}
                  </p>
                </div>
              </div>

              <ul className="mt-4 grid grid-cols-1 gap-4">
                {d.kits.listaTracks.map((tr) => (
                  <li key={tr.id} id={tr.id}>
                    <article className="flex flex-col gap-5 rounded-[8px] border border-aisc-forest/55 bg-aisc-cream p-6 md:p-8">
                      <div className="flex flex-col gap-2">
                        <span
                          className="text-display-4 tabular-nums text-aisc-coral"
                          aria-hidden="true"
                        >
                          {tr.numero}
                        </span>
                        <h3 className="text-display-3 text-aisc-ink">
                          {tr.titulo}
                        </h3>
                        <p className="text-body max-w-[820px] text-aisc-ink/90">
                          {tr.resumen}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-6 border-t border-aisc-forest/25 pt-5 md:grid-cols-2">
                        <div>
                          <span className="text-kicker text-aisc-forest">
                            {idioma === "en"
                              ? "Getting started"
                              : idioma === "pt"
                              ? "Para começar"
                              : "Para empezar"}
                          </span>
                          <p className="text-body-sm mt-2 text-aisc-ink">
                            {tr.paraEmpezar}
                          </p>
                        </div>
                        <div>
                          <span className="text-kicker text-aisc-forest">
                            {idioma === "en"
                              ? "Advanced scope"
                              : idioma === "pt"
                              ? "Com experiência"
                              : "Con experiencia"}
                          </span>
                          <p className="text-body-sm mt-2 text-aisc-ink">
                            {tr.conExperiencia}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-aisc-forest/20 pt-4 text-body-sm">
                        <span className="text-meta uppercase tracking-wider text-aisc-muted">
                          {idioma === "en"
                            ? "Benchmarks & code:"
                            : idioma === "pt"
                            ? "Benchmarks e código:"
                            : "Benchmarks y código:"}
                        </span>
                        {tr.recursos.map((rec) => (
                          <a
                            key={rec.url}
                            href={rec.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={ENLACE}
                          >
                            {rec.label}
                          </a>
                        ))}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ==================== PESTAÑA 3: PREMIOS Y EVALUACIÓN ==================== */}
          {pestaña === "reglas" && (
            <div className="flex flex-col gap-12 md:gap-16">
              {/* Premios */}
              <section>
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.resumen.premiosTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <div className={PROSA}>
                      {d.resumen.premiosParrafos.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    <PremiosSoberos
                      premios={d.premiosPodio}
                      premioDifusion={d.premioDifusion}
                    />
                  </div>
                </div>
              </section>

              {/* Entregables */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <div className={COL_TITULO}>
                    <h2 className="text-display-2 md:text-display-2-lg break-words">
                      {d.reglas.entregablesTitulo}
                    </h2>
                    <p className="text-meta mt-2 font-semibold uppercase tracking-wider text-aisc-coral">
                      {d.reglas.entregablesHora}
                    </p>
                  </div>
                  <div className={COL_CONTENIDO}>
                    <ul className="flex flex-col">
                      {d.reglas.entregables.map((ent, i) => (
                        <li
                          key={i}
                          className="flex gap-4 border-t border-aisc-forest/25 py-5 text-body-sm text-aisc-ink"
                        >
                          <span className="text-display-4 tabular-nums text-aisc-coral shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{ent}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Criterios de evaluación */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <div className={COL_TITULO}>
                    <h2 className="text-display-2 md:text-display-2-lg break-words">
                      {d.reglas.criteriosTitulo}
                    </h2>
                    <p className="text-body-sm mt-2 text-aisc-muted">
                      {d.reglas.criteriosTexto}
                    </p>
                  </div>
                  <div className={COL_CONTENIDO}>
                    <ul className="flex flex-col">
                      {d.reglas.criterios.map((c) => (
                        <li
                          key={c.nombre}
                          className="flex items-baseline justify-between gap-6 border-t border-aisc-forest/25 py-5"
                        >
                          <div>
                            <h3 className="text-display-4 text-aisc-ink">
                              {c.nombre}
                            </h3>
                            <p className="text-body-sm mt-1 text-aisc-muted">
                              {c.descripcion}
                            </p>
                          </div>
                          <span className="text-display-3 tabular-nums text-aisc-coral shrink-0">
                            {c.peso}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className={AVISO_OSCURO}>
                      <h3 className="text-display-4 text-aisc-sand">
                        {d.reglas.finalistasTitulo}
                      </h3>
                      <p className="text-body-sm md:text-body text-aisc-sand/90">
                        {d.reglas.finalistasTexto}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Reglas de uso responsable */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.reglas.tituloSeguridad}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {d.reglas.reglasSeguridad.map((regla, i) => (
                        <li key={i} className="flex">
                          <article className={`${TARJETA} w-full`}>
                            <span className="text-display-4 tabular-nums text-aisc-coral">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="text-body-sm text-aisc-ink">
                              {regla}
                            </p>
                          </article>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==================== PESTAÑA 4: AGENDA Y FAQ ==================== */}
          {pestaña === "cronograma" && (
            <div className="flex flex-col gap-12 md:gap-16">
              {/* Minuto a minuto */}
              <section>
                <div className={ENCABEZADO}>
                  <div className={COL_TITULO}>
                    <h2 className="text-display-2 md:text-display-2-lg break-words">
                      {d.cronograma.titulo}
                    </h2>
                    <p className="text-body-sm mt-2 text-aisc-muted">
                      {d.cronograma.subtitulo}
                    </p>
                  </div>
                  <div className={COL_CONTENIDO}>
                    <ul className="flex flex-col">
                      {d.cronograma.agenda.map((ag) => (
                        <li
                          key={ag.hora}
                          className="flex flex-col gap-1 border-t border-aisc-forest/25 py-5 sm:flex-row sm:items-baseline sm:gap-8"
                        >
                          <time className="text-display-4 tabular-nums text-aisc-coral shrink-0 sm:w-32">
                            {ag.hora}
                          </time>
                          <div className="min-w-0">
                            <h3 className="text-display-4 text-aisc-ink">
                              {ag.actividad}
                            </h3>
                            <p className="text-body-sm mt-1 text-aisc-muted">
                              {ag.detalle}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Fechas clave */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.cronograma.calendarioPrevioTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {d.cronograma.calendarioPrevio.map((cal, i) => (
                        <li key={i} className="flex">
                          <article className={`${TARJETA} w-full`}>
                            <span className="text-kicker text-aisc-coral">
                              {cal.fecha}
                            </span>
                            <p className="text-body-sm text-aisc-ink">
                              {cal.hito}
                            </p>
                          </article>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Preguntas frecuentes */}
              <section>
                <div aria-hidden="true" className={HAIRLINE} />
                <div className={ENCABEZADO}>
                  <h2
                    className={`text-display-2 md:text-display-2-lg break-words ${COL_TITULO}`}
                  >
                    {d.cronograma.faqTitulo}
                  </h2>
                  <div className={COL_CONTENIDO}>
                    <div className="flex flex-col">
                      {d.cronograma.faqs.map((faq) => (
                        <details
                          key={faq.q}
                          className="group border-t border-aisc-forest/25 py-5"
                        >
                          <summary className="text-display-4 flex cursor-pointer list-none items-center justify-between gap-4 text-aisc-ink [&::-webkit-details-marker]:hidden">
                            <span>{faq.q}</span>
                            <span className="text-aisc-coral text-xl transition-transform group-open:rotate-45">
                              +
                            </span>
                          </summary>
                          <p className="text-body-sm mt-3 text-aisc-ink/85">
                            {faq.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      <SiteFooter idioma={idioma} />
    </main>
  );
}
