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
  GRUPO_COMUNIDAD_WHATSAPP,
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

function PodioPremios({
  premios,
  premioDifusion,
}: {
  premios: Premio[];
  premioDifusion: Premio;
}) {
  return (
    <div className="space-y-6">
      {/* Grid de 3 tarjetas de podio */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end">
        {/* 2.º Lugar (Plata) */}
        {premios[1] && (
          <div className="relative order-2 md:order-1 flex flex-col justify-between rounded-2xl border border-slate-300 bg-linear-to-b from-slate-100/90 via-white to-slate-50/60 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <span>{premios[1].icono}</span> {premios[1].posicion}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-display-2 font-black tracking-tight text-slate-800">
                  {premios[1].monto}
                </span>
                <span className="block text-meta text-slate-600 font-medium">
                  En efectivo
                </span>
              </div>
              <h4 className="text-display-4 mt-3 font-semibold text-aisc-ink">
                {premios[1].titulo}
              </h4>
              <p className="text-body-sm mt-2 text-aisc-muted leading-relaxed">
                {premios[1].descripcion}
              </p>
            </div>
            {premios[1].extra && (
              <div className="mt-5 rounded-lg bg-slate-100 px-3 py-2 text-caption font-semibold text-slate-800 border border-slate-200">
                ✨ {premios[1].extra}
              </div>
            )}
          </div>
        )}

        {/* 1.er Lugar (Oro - Elevado y deslumbrante) */}
        {premios[0] && (
          <div className="relative order-1 md:order-2 flex flex-col justify-between rounded-3xl border-2 border-amber-400 bg-linear-to-b from-amber-50/95 via-white to-amber-100/50 p-7 shadow-xl shadow-amber-500/15 transition-all hover:-translate-y-1 hover:shadow-2xl md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1 text-xs font-black uppercase tracking-wider text-aisc-cream shadow-md shadow-amber-500/30">
                <span>{premios[0].icono}</span> {premios[0].posicion}
              </span>
            </div>
            <div className="pt-2">
              <div className="mt-3">
                <span className="text-display-1 md:text-display-1-lg font-black tracking-tight text-amber-600">
                  {premios[0].monto}
                </span>
                <span className="block text-meta text-amber-900 font-bold">
                  En efectivo garantizado
                </span>
              </div>
              <h4 className="text-display-3 mt-3 font-bold text-aisc-forest-deep">
                {premios[0].titulo}
              </h4>
              <p className="text-body-sm mt-2 text-aisc-ink/90 font-medium leading-relaxed">
                {premios[0].descripcion}
              </p>
            </div>
            {premios[0].extra && (
              <div className="mt-6 rounded-xl bg-linear-to-r from-amber-100 to-amber-200/80 px-4 py-2.5 text-caption font-bold text-amber-950 border border-amber-300/80 shadow-xs">
                🏆 {premios[0].extra}
              </div>
            )}
          </div>
        )}

        {/* 3.er Lugar (Bronce) */}
        {premios[2] && (
          <div className="relative order-3 flex flex-col justify-between rounded-2xl border border-amber-800/25 bg-linear-to-b from-amber-900/5 via-white to-amber-950/5 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-800/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-950">
                  <span>{premios[2].icono}</span> {premios[2].posicion}
                </span>
              </div>
              <div className="mt-4">
                <span className="text-display-2 font-black tracking-tight text-amber-950">
                  {premios[2].monto}
                </span>
                <span className="block text-meta text-amber-900/70 font-medium">
                  En efectivo
                </span>
              </div>
              <h4 className="text-display-4 mt-3 font-semibold text-aisc-ink">
                {premios[2].titulo}
              </h4>
              <p className="text-body-sm mt-2 text-aisc-muted leading-relaxed">
                {premios[2].descripcion}
              </p>
            </div>
            {premios[2].extra && (
              <div className="mt-5 rounded-lg bg-amber-900/10 px-3 py-2 text-caption font-semibold text-amber-950 border border-amber-900/15">
                💡 {premios[2].extra}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Premio Especial de Difusión e Impacto Comunitario */}
      {premioDifusion && (
        <div className="relative overflow-hidden rounded-2xl border border-aisc-coral/40 bg-linear-to-r from-aisc-coral/10 via-white to-aisc-sand/40 p-6 shadow-sm md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-aisc-coral text-2xl text-aisc-cream shadow-md shadow-aisc-coral/25">
                {premioDifusion.icono}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-kicker text-aisc-coral font-bold uppercase">
                    {premioDifusion.posicion}
                  </span>
                </div>
                <h4 className="text-display-4 font-bold text-aisc-forest-deep mt-0.5">
                  {premioDifusion.titulo}
                </h4>
                <p className="text-body-sm mt-1 max-w-[560px] text-aisc-ink/80 leading-relaxed">
                  {premioDifusion.descripcion}
                </p>
                {premioDifusion.extra && (
                  <p className="text-caption mt-2 font-medium text-aisc-coral">
                    ⭐ {premioDifusion.extra}
                  </p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-start md:items-end">
              <span className="text-display-2 font-black tracking-tight text-aisc-coral">
                {premioDifusion.monto}
              </span>
              <span className="text-meta text-aisc-muted font-medium">
                En efectivo
              </span>
            </div>
          </div>
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

        <div className="mx-auto w-full max-w-[1440px] px-6 pt-10 pb-12 md:px-12 md:pt-14 md:pb-16 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Texto del Hero */}
            <div className="flex flex-col items-start gap-3.5 lg:col-span-7 xl:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-kicker inline-flex items-center rounded-full bg-aisc-sand/15 px-3 py-1 font-medium tracking-wider text-aisc-sand">
                  {d.badge}
                </span>
                <span className="text-kicker inline-flex items-center rounded-full bg-aisc-coral px-3 py-1 font-semibold tracking-wider text-aisc-cream">
                  14 Nov 2026 · Bogotá
                </span>
              </div>

              <h1 className="text-display-1 md:text-display-1-lg tracking-tight text-aisc-sand text-balance leading-none md:leading-tight">
                {d.titulo}
              </h1>

              <p className="text-display-3 md:text-display-3-lg font-medium text-aisc-mint">
                {d.subtitulo}
              </p>

              <p className="text-body md:text-body-lg max-w-[620px] text-aisc-sand/90">
                {d.lema}
              </p>

              {/* Botones de acción principales */}
              <div className="mt-2 flex flex-wrap items-center gap-3.5">
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
                <a
                  className={`${CTA_LINK} inline-flex items-center gap-2`}
                  href={GRUPO_COMUNIDAD_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 flex-none text-aisc-sand">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.941-5.359 11.944-11.893a11.821 11.821 0 00-3.487-8.4z" />
                  </svg>
                  {d.ctaWhatsapp}
                </a>
              </div>

              {/* Indicador de estado */}
              <p className="text-meta mt-1 text-aisc-sand/70">
                {d.estadoInscripciones}
              </p>
            </div>

            {/* Mascota CyberBear */}
            <div className="relative flex justify-center lg:col-span-5 xl:col-span-4">
              <div className="relative w-full max-w-[320px] md:max-w-[360px]">
                {/* Aura de iluminación detrás del oso */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -m-6 rounded-full bg-linear-to-b from-aisc-mint/25 to-transparent blur-2xl"
                />
                <img
                  src="/aisc/hackathon/cyberbear.png"
                  alt="CyberBear - Mascota del Defensive Acceleration Hackathon"
                  width={474}
                  height={730}
                  className="relative z-10 mx-auto h-auto w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Franja rápida de métricas */}
        <div className="border-t border-aisc-sand/15 bg-aisc-night/60 backdrop-blur-xs">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-y divide-aisc-sand/10 md:grid-cols-4 md:divide-x md:divide-y-0 px-6 py-5 md:px-12">
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="text-display-3 md:text-display-2 font-black text-aisc-sand">COP $3.2M+</span>
              <span className="text-meta text-aisc-sand/70">
                {idioma === "en" ? "In cash prizes" : idioma === "pt" ? "Em prêmios em dinheiro" : "En premios en efectivo"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="text-display-3 md:text-display-2 font-black text-aisc-sand">Uniandes</span>
              <span className="text-meta text-aisc-sand/70">
                {idioma === "en" ? "Bogotá · In-person venue" : idioma === "pt" ? "Bogotá · Campus presencial" : "Campus Bogotá · Presencial"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="text-display-3 md:text-display-2 font-black text-aisc-sand">7 {idioma === "en" ? "Hours" : "Horas"}</span>
              <span className="text-meta text-aisc-sand/70">
                {idioma === "en" ? "Of intensive building" : idioma === "pt" ? "De construção intensiva" : "De construcción intensiva"}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 text-center">
              <span className="text-display-3 md:text-display-2 font-black text-aisc-sand">5 Tracks</span>
              <span className="text-meta text-aisc-sand/70">
                {idioma === "en" ? "With guided starter kits" : idioma === "pt" ? "Com starter kits guiados" : "Con starter kits guiados"}
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

                {/* 5. Premios y Reconocimientos */}
                <div className="border-t border-aisc-line pt-8">
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-display-3 text-aisc-ink">
                      {d.resumen.premiosTitulo}
                    </h3>
                    <span className="text-meta font-bold text-aisc-coral">
                      COP $3.200.000+ total
                    </span>
                  </div>

                  <PodioPremios
                    premios={d.premiosPodio}
                    premioDifusion={d.premioDifusion}
                  />

                  {/* Notas de continuidad y becas */}
                  <div className="mt-6 rounded-2xl border border-aisc-forest/20 bg-aisc-sand/40 p-5 text-body-sm text-aisc-ink/85">
                    <p className="font-semibold text-aisc-forest">
                      {idioma === "en"
                        ? "🚀 International Fellowship Opportunities"
                        : idioma === "pt"
                        ? "🚀 Oportunidades de Bolsas Internacionais"
                        : "🚀 Oportunidades de Becas y Continuidad Internacional"}
                    </p>
                    <p className="mt-1 leading-relaxed">
                      {idioma === "en"
                        ? "All cash prizes are distributed in person the same evening. Beyond the awards, high-potential projects receive direct referrals and priority review for global AI safety fellowships with Apart Research and BlueDot Impact."
                        : idioma === "pt"
                        ? "Todos os prêmios em dinheiro são pagos presencialmente na mesma noite. Além disso, projetos destacados recebem recomendação direta e acesso prioritário a bolsas internacionais com a Apart Research e a BlueDot Impact."
                        : "Todos los premios en efectivo se entregan de forma presencial la misma noche del evento. Además, los proyectos destacados recibirán recomendación directa y postulación prioritaria a becas internacionales de investigación con Apart Research y BlueDot Impact."}
                    </p>
                  </div>
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
                {/* Podio de Premios */}
                <div>
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h2 className="text-display-2 md:text-display-2-lg text-aisc-ink">
                        {d.resumen.premiosTitulo}
                      </h2>
                      <p className="text-body mt-2 text-aisc-muted">
                        {idioma === "en"
                          ? "Prizes are awarded based on the judges' combined evaluation of defensive impact, empirical rigor, and clarity."
                          : idioma === "pt"
                          ? "Os prêmios são distribuídos com base na avaliação dos jurados em impacto defensivo, rigor empírico e clareza."
                          : "Los premios se asignan con base en la deliberación de los jurados evaluando impacto defensivo, rigor empírico y claridad."}
                      </p>
                    </div>
                    <span className="text-meta font-bold text-aisc-coral">
                      {idioma === "en" ? "Handed out live" : idioma === "pt" ? "Pagos na mesma noite" : "Entrega en vivo la misma noche"}
                    </span>
                  </div>

                  <PodioPremios
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

          {/* ---------------------------------- COLUMNA LATERAL STICKY (4 cols) */}
          <aside className="w-full lg:sticky lg:top-24 lg:col-span-4">
            <div className="flex flex-col gap-5 rounded-3xl border border-aisc-forest/20 bg-linear-to-b from-white via-aisc-sand/35 to-aisc-sand/65 p-6 shadow-md shadow-aisc-forest/5 md:p-7">
              {/* Header con CyberBear avatar y título moderno */}
              <div className="flex items-center gap-3">
                <img
                  src="/aisc/hackathon/cyberbear.png"
                  alt="CyberBear"
                  className="size-13 shrink-0 rounded-2xl bg-aisc-forest-deep p-1.5 object-contain drop-shadow-sm"
                />
                <div className="min-w-0">
                  <span className="text-kicker text-aisc-coral font-bold uppercase tracking-wider block">
                    {idioma === "en" ? "In-Person Hackathon" : idioma === "pt" ? "Hackathon Presencial" : "Hackatón Presencial"}
                  </span>
                  <h3 className="text-display-4 font-bold text-aisc-forest leading-snug">
                    CyberBear 2026
                  </h3>
                </div>
              </div>

              {/* Banner de premios en la barra lateral */}
              <div className="flex items-center justify-between rounded-2xl bg-aisc-forest-deep px-4 py-3 text-aisc-cream shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🏆</span>
                  <div>
                    <span className="text-caption font-bold uppercase tracking-wider text-aisc-sand/70 block">
                      {idioma === "en" ? "Prize Pool" : idioma === "pt" ? "Prêmios" : "Premios"}
                    </span>
                    <span className="text-display-4 font-black text-aisc-sand leading-none">
                      COP $3.200.000+
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-aisc-coral/90 px-2.5 py-0.5 text-caption font-bold text-aisc-cream">
                  {idioma === "en" ? "Cash" : "Efectivo"}
                </span>
              </div>

              {/* Countdown si falta tiempo */}
              {diasFaltan !== null && diasFaltan > 0 ? (
                <div className="flex items-center justify-between rounded-xl border border-aisc-line bg-white/80 px-4 py-2.5 shadow-2xs">
                  <span className="text-meta text-aisc-muted font-medium">
                    {idioma === "en" ? "Countdown" : idioma === "pt" ? "Faltam" : "Faltan"}
                  </span>
                  <span className="text-display-4 font-bold text-aisc-coral">
                    {diasFaltan} {diasFaltan === 1 ? (idioma === "en" ? "day" : "día") : (idioma === "en" ? "days" : "días")}
                  </span>
                </div>
              ) : null}

              {/* Perks y datos clave con íconos limpios */}
              <div className="space-y-3.5 border-t border-aisc-line/80 pt-4 text-body-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-base shrink-0" aria-hidden="true">📅</span>
                  <div>
                    <p className="font-semibold text-aisc-ink">{d.sidebar.fechaValor}</p>
                    <p className="text-meta text-aisc-muted">{d.sidebar.horarioValor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-base shrink-0" aria-hidden="true">📍</span>
                  <div>
                    <p className="font-semibold text-aisc-ink">{d.sidebar.lugarValor}</p>
                    <p className="text-meta text-aisc-muted">Auditorios y salas de cómputo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-base shrink-0" aria-hidden="true">👥</span>
                  <div>
                    <p className="font-semibold text-aisc-ink">{d.sidebar.formatoValor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-base shrink-0" aria-hidden="true">🍽️</span>
                  <div>
                    <p className="font-semibold text-aisc-ink">{d.sidebar.comidaValor}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-base shrink-0" aria-hidden="true">⚡</span>
                  <div>
                    <p className="font-semibold text-aisc-ink">{d.sidebar.cupoValor}</p>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="border-t border-aisc-line/80 pt-4 flex flex-col gap-2.5">
                <Link
                  href={rutaAplicar}
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-aisc-coral px-6 text-center font-bold text-aisc-cream shadow-md shadow-aisc-coral/25 transition-all hover:bg-aisc-coral/90 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-forest"
                >
                  <span>{d.ctaAplicar}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>

                <a
                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-aisc-forest/30 bg-white px-5 text-center text-body-sm font-semibold text-aisc-forest transition-colors hover:bg-aisc-forest hover:text-aisc-sand"
                  href={GRUPO_COMUNIDAD_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4 shrink-0 text-green-600">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.941-5.359 11.944-11.893a11.821 11.821 0 00-3.487-8.4z" />
                  </svg>
                  <span>{d.ctaWhatsapp}</span>
                </a>
              </div>

              {/* Coorganización */}
              <div className="border-t border-aisc-line/80 pt-3 text-center">
                <span className="text-meta text-aisc-muted font-medium block">
                  {d.sidebar.organizanRotulo}
                </span>
                <span className="text-body-sm font-semibold text-aisc-forest mt-0.5 block">
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
