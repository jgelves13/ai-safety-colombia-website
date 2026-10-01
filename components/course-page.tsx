import type { ReactNode } from "react";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { CTA_LINK_PRIMARY, CTA_PANEL, CTA_PATTERN_BOTTOM, CTA_PATTERN_TOP, HERO_CORNER_CLASS, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { RUTA_APLICAR_CURSOS, cursosCerrados, type CursoId } from "@/lib/cursos";
import { BLUEDOT_CURSO, BLUEDOT_NOMBRE, EN_LINEA, FACILITADORES, PAGINAS_CURSO, ROTULOS_CURSO, RUTA_CURSO } from "@/lib/cursos-paginas";
import type { Idioma } from "@/lib/idiomas";

/* La página de cada seminario, con la estructura de las páginas de programa de
   aisecurity.sg y la densidad del encabezado de BlueDot: el nombre del
   seminario como h1, tres frases (por qué, qué se aprende, para quién), la
   línea de fechas y la tira de datos clave; luego una columna angosta
   y centrada, con bandas que alternan crema y arena, y una sección por
   pregunta: por qué ahora, para quién es (cuatro perfiles en tarjetas), quién
   está en la sala, qué vas a hacer (una tarjeta por semana, con el número en
   grande), con qué sales (una lista), el panel para aplicar y las preguntas
   frecuentes. */

const COLUMNA = "mx-auto w-full max-w-[880px] px-8";
const ANCHO = "mx-auto w-full max-w-[1448px] px-8 md:px-16";
const SECCION = `${COLUMNA} flex flex-col gap-6 py-16 md:py-24`;
const TITULO = "text-display-3 md:text-display-2 text-balance";
const PROSA = "text-body flex flex-col gap-5 text-aisc-ink";
const TARJETA = "rounded-2xl border border-aisc-line bg-white/80";
/* La modalidad de cada semana alterna desde una presencial (índice par). */
const ENLACE = "text-aisc-forest transition-colors hover:text-aisc-coral";
const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";
/* Un icono de una sola línea por seminario, al modo de los hero-graphic de
   BlueDot: futuros que se bifurcan y un escudo con una red adentro. */
const HERO_CURSO: Record<CursoId, string> = {
  "agi-strategy": "/aisc/patterns/aisc-hero-seminario-futuro.svg?v=2",
  "technical-ai-safety": "/aisc/patterns/aisc-hero-seminario-tecnico.svg?v=2",
};

/* Las negritas de los textos vienen marcadas con **así**. */
function Negritas({ texto }: { texto: string }) {
  const partes = texto.split("**");
  return (
    <>
      {partes.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-aisc-ink">
            <Enlaces texto={p} />
          </strong>
        ) : (
          <Enlaces key={i} texto={p} />
        ),
      )}
    </>
  );
}

/* Un enlace escrito como [texto](url) dentro de una cadena. */
const ENLACE_MD = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
function Enlaces({ texto }: { texto: string }) {
  const partes: ReactNode[] = [];
  let desde = 0;
  for (const m of texto.matchAll(ENLACE_MD)) {
    partes.push(texto.slice(desde, m.index));
    partes.push(
      <a key={m.index} className={ENLACE} href={m[2]} target="_blank" rel="noopener noreferrer">
        {m[1]}
      </a>,
    );
    desde = m.index + m[0].length;
  }
  partes.push(texto.slice(desde));
  return <>{partes}</>;
}

/* Los nombres de quienes facilitan, enlazados y unidos con «y». */
function Nombres({ curso, y }: { curso: CursoId; y: string }) {
  const lista = FACILITADORES[curso];
  const partes: ReactNode[] = [];
  lista.forEach((f, i) => {
    if (i > 0) partes.push(i === lista.length - 1 ? ` ${y} ` : ", ");
    partes.push(
      <span key={f.nombre}>
        <a className={ENLACE} href={f.linkedin} target="_blank" rel="noopener noreferrer">
          {f.nombre}
        </a>
        <span className="text-aisc-muted"> ({f.afiliacion})</span>
      </span>,
    );
  });
  return <>{partes}</>;
}

/* Un párrafo que puede llevar {facilitadores} en medio. */
function Parrafo({ texto, curso, y }: { texto: string; curso: CursoId; y: string }) {
  const [antes, despues] = texto.split("{facilitadores}");
  return (
    <p>
      <Negritas texto={antes} />
      {despues === undefined ? null : (
        <>
          <Nombres curso={curso} y={y} />
          <Negritas texto={despues} />
        </>
      )}
    </p>
  );
}

/* La salida a BlueDot: lo que va entre [corchetes] es el enlace. */
function EnLinea({ idioma, curso }: { idioma: Idioma; curso: CursoId }) {
  const [antes, resto] = EN_LINEA[idioma].split("[");
  const [enlace, despues] = resto.split("]");
  return (
    <p>
      {antes}
      <a className={ENLACE} href={BLUEDOT_CURSO[curso]} target="_blank" rel="noopener noreferrer">
        {enlace}
      </a>
      {despues}
    </p>
  );
}

export default function CoursePage({ idioma, curso }: { idioma: Idioma; curso: CursoId }) {
  const p = PAGINAS_CURSO[curso][idioma];
  const r = ROTULOS_CURSO[idioma];
  const cerrado = cursosCerrados();
  const aplicar = `${RUTA_APLICAR_CURSOS[idioma]}?curso=${curso}`;
  const otro: CursoId = curso === "agi-strategy" ? "technical-ai-safety" : "agi-strategy";
  const [otroAntes, otroDespues] = p.otro.split("{curso}");

  const hechos = [
    { rotulo: r.formato, valor: p.hechos.formato },
    { rotulo: r.dedicacion, valor: p.hechos.dedicacion },
    { rotulo: r.fechas, valor: p.hechos.fechas },
    { rotulo: r.costo, valor: r.costoValor },
    { rotulo: r.idioma, valor: r.idiomaValor },
  ];

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="1415"
          decoding="async"
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src={HERO_CURSO[curso]}
        />
        {/* La retícula se apaga antes de la tira de datos: sus líneas son del
            mismo color que el texto y lo volvían ilegible. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden h-72 bg-linear-to-b from-aisc-forest-deep/0 to-aisc-forest-deep to-45% md:block"
        />
        <SiteHeader active={RUTA_CURSO[curso][idioma]} />
        <div className={`${ANCHO} relative z-10 flex flex-col pt-28 md:pt-32`}>
          <div className="flex max-w-[880px] flex-col gap-5 pb-12 md:pb-16">
            <h1 className="text-display-2 md:text-display-2-lg max-w-[760px] text-balance text-aisc-sand">{p.metaTitulo}</h1>
            <p className="text-body max-w-[720px] text-aisc-sand/90">{p.entrada}</p>
            <p className="text-body-sm text-aisc-sand/70">{p.linea}</p>
            {cerrado ? null : (
              <a className={`${CTA_LINK_PRIMARY} mt-2 w-fit`} href={aplicar}>
                {r.aplicar}
              </a>
            )}
          </div>

          {/* La tira de datos clave, dentro del encabezado: tres columnas iguales
              y dos filas, para que ningún valor se parta y las celdas midan lo mismo. */}
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-aisc-sand/20 py-8 md:grid-cols-3 md:py-10">
            {hechos.map((h) => (
              <div className="flex flex-col gap-1.5" key={h.rotulo}>
                <dt className="text-kicker text-aisc-sand/60">{h.rotulo}</dt>
                <dd className="text-display-4 text-aisc-sand">{h.valor}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <dt className="text-kicker text-aisc-sand/60">{r.materiales}</dt>
              <dd className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <a
                  className="inline-flex w-fit rounded-md bg-aisc-cream px-2.5 py-1.5"
                  href={BLUEDOT_CURSO[curso]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="BlueDot Impact" className="h-5 w-auto" src="/aisc/aliados/bluedot.png" />
                </a>
                <span className="text-body-sm text-aisc-sand/85">{BLUEDOT_NOMBRE[curso]}</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="porque" className="bg-aisc-cream">
        <div className={SECCION}>
          <h2 className={TITULO}>{p.porque.titulo}</h2>
          <div className={PROSA}>
            {p.porque.parrafos.map((t) => (
              <p key={t.slice(0, 40)}>
                <Negritas texto={t} />
              </p>
            ))}
            <EnLinea idioma={idioma} curso={curso} />
          </div>
        </div>
      </section>

      <section id="quien" className="bg-aisc-sand">
        <div className={SECCION}>
          <h2 className={TITULO}>{p.quien.titulo}</h2>
          <div className={PROSA}>
            <p>
              <Negritas texto={p.quien.intro} />
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {p.quien.perfiles.map((f) => (
              <li className={`${TARJETA} flex flex-col gap-2 p-6`} key={f.titulo}>
                <h3 className="text-display-4">{f.titulo}</h3>
                <p className="text-body-sm text-aisc-ink">{f.cuerpo}</p>
              </li>
            ))}
          </ul>
          <div className={PROSA}>
            <p>{p.quien.cierre}</p>
            <p className="text-body-sm text-aisc-muted">
              {otroAntes}
              <a className={ENLACE} href={RUTA_CURSO[otro][idioma]}>
                {PAGINAS_CURSO[otro][idioma].metaTitulo}
              </a>
              {otroDespues}
            </p>
          </div>
        </div>
      </section>

      <section id="sala" className="bg-aisc-cream">
        <div className={SECCION}>
          <h2 className={TITULO}>{p.sala.titulo}</h2>
          <div className={PROSA}>
            {p.sala.parrafos.map((t) => (
              <Parrafo key={t.slice(0, 40)} texto={t} curso={curso} y={r.y} />
            ))}
          </div>
        </div>
      </section>

      <section id="semanas" className="scroll-mt-24 bg-aisc-sand">
        <div className={SECCION}>
          <h2 className={TITULO}>{p.semanas.titulo}</h2>
          <div className={PROSA}>
            <p>{p.semanas.entrada}</p>
          </div>
          {/* Una tarjeta por semana, con el mismo patrón de las tarjetas de perfiles:
              a la izquierda la semana y la modalidad, a la derecha el título y una frase. */}
          <ol className="flex flex-col gap-3">
            {p.semanas.unidades.map((u, i) => (
              <li className={`${TARJETA} grid grid-cols-1 gap-x-8 gap-y-2 p-6 md:grid-cols-[168px_1fr]`} key={u.titulo}>
                <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
                  <span className="text-kicker text-aisc-muted">
                    {r.semana} {i + 1}
                  </span>
                  <span className="text-body-sm text-aisc-forest">{i % 2 === 0 ? r.presencial : r.enLinea}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-display-4">{u.titulo}</h3>
                  <p className="text-body-sm max-w-[680px] text-aisc-ink">{u.cuerpo}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-body-sm">
            <a className={ENLACE} href={BLUEDOT_CURSO[curso]} target="_blank" rel="noopener noreferrer">
              {r.temarioEnlace}
            </a>
          </p>
        </div>
      </section>

      <section id="resultado" className="bg-aisc-cream">
        <div className={SECCION}>
          <h2 className={TITULO}>{p.resultado.titulo}</h2>
          <ul className="text-body flex flex-col gap-4 text-aisc-ink">
            {p.resultado.items.map((t) => (
              <li className="grid grid-cols-[1.75rem_1fr]" key={t.slice(0, 40)}>
                <span aria-hidden="true" className="pt-1 text-aisc-coral">
                  ✱
                </span>
                <p>
                  <Negritas texto={t} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* El cierre: el panel verde con el plazo y el botón. */}
      <section className="bg-aisc-cream">
        <div className={`${COLUMNA} pb-16 md:pb-24`}>
          <div className={`${CTA_PANEL} text-center`}>
            <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" className={CTA_PATTERN_TOP} style={{ color: "transparent" }} src={PATRON} />
            <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" className={CTA_PATTERN_BOTTOM} style={{ color: "transparent" }} src={PATRON} />
            <div className="relative z-10 flex flex-col items-center gap-5">
              <h2 className="text-display-3 text-balance text-aisc-sand">{cerrado ? r.cerradoTitulo : r.aplicarTitulo}</h2>
              <p className="text-body-sm max-w-[560px] text-aisc-sand/85 [&_strong]:font-semibold [&_strong]:text-aisc-sand">
                {cerrado ? r.cerradoFrase : <Negritas texto={p.plazo} />}
              </p>
              {cerrado ? null : (
                <a className={`${CTA_LINK_PRIMARY} mt-2`} href={aplicar}>
                  {r.aplicar}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="preguntas" className="bg-aisc-sand">
        <div className={SECCION}>
          <h2 className={TITULO}>{r.faq}</h2>
          <ul className="flex flex-col border-b border-aisc-forest-deep/30">
            {p.faq.map((f) => (
              <li key={f.q}>
                <details className="group border-t border-aisc-forest-deep/30">
                  <summary className="text-body flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 transition-colors hover:text-aisc-forest [&::-webkit-details-marker]:hidden">
                    <span>{f.q}</span>
                    <span aria-hidden="true" className="shrink-0 text-aisc-coral transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-body max-w-[680px] pb-5 text-aisc-muted"><Negritas texto={f.a} /></p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
