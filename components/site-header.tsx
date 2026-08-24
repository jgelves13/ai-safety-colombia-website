"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SelectorIdioma from "./selector-idioma";
import { BANDERA } from "./banderas";
import { IDIOMAS_LISTOS, INICIO, NOMBRE_IDIOMA, type Idioma, idiomaDe, menu, rutaEn } from "@/lib/idiomas";

/* Seis entradas, en el orden en que alguien nuevo las necesita: qué es el
   campo, qué está abierto ahora mismo, qué sale de acá, con qué estudiar,
   cómo entrar y quiénes somos. Eventos y blog viven dentro de esas páginas.
   La segunda entrada lleva el nombre del sprint vigente: al cerrar el de
   septiembre hay que renombrarla con el que siga. Los nombres y las direcciones
   de los tres idiomas están en lib/idiomas.ts. */

/* The floating header is scroll-linked rather than a toggle: opacity tracks the
   band below, and the lift and scale ride the same progress. Read off the
   original, which sits at opacity .417 / -3.71px / .996 at y=300 and lands
   fully open by y=500. */
const REVEAL_START = 160;
const REVEAL_END = 500;

const PANEL_ID = "site-nav-mobile";

const ABRIR_MENU: Record<Idioma, string> = {
  es: "Abrir menú",
  en: "Open menu",
  pt: "Abrir menu",
};

const CERRAR_MENU: Record<Idioma, string> = {
  es: "Cerrar menú",
  en: "Close menu",
  pt: "Fechar menu",
};

const IR_AL_INICIO: Record<Idioma, string> = {
  es: "AI Safety Colombia, inicio",
  en: "AI Safety Colombia, home",
  pt: "AI Safety Colombia, início",
};

const IDIOMA_TITULO: Record<Idioma, string> = {
  es: "Idioma",
  en: "Language",
  pt: "Idioma",
};

const MENU_TITULO: Record<Idioma, string> = {
  es: "Menú",
  en: "Menu",
  pt: "Menu",
};

function Nav({
  idioma,
  active,
  className,
}: {
  idioma: Idioma;
  active?: string;
  className: string;
}) {
  return (
    <nav className={className}>
      {menu(idioma).map((item) => {
        const current = item.href === active;
        return (
          <Link
            key={item.href}
            aria-current={current ? "page" : undefined}
            className={`text-body-sm rounded-full px-3 py-1.5 text-aisc-sand transition-colors hover:bg-aisc-sand/10${current ? " bg-aisc-sand/15" : ""}`}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MenuButton({
  idioma,
  abierto,
  onClick,
}: {
  idioma: Idioma;
  abierto: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={abierto ? CERRAR_MENU[idioma] : ABRIR_MENU[idioma]}
      aria-expanded={abierto}
      aria-controls={PANEL_ID}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] text-aisc-sand transition-colors hover:bg-aisc-sand/10 lg:hidden"
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="remixicon">
        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
      </svg>
    </button>
  );
}

function Logo({ idioma }: { idioma: Idioma }) {
  return (
    <Link aria-label={IR_AL_INICIO[idioma]} className="flex shrink-0 items-center" href={INICIO[idioma]}>
      {/* el lockup va en su version crema porque el encabezado siempre se
          apoya sobre bloque verde, tanto en el hero como en la pastilla */}
      <img
        src="/aisc/logo-lockup-crema.png"
        alt="AI Safety Colombia"
        width={1400}
        height={420}
        className="h-8 w-auto md:h-9"
      />
    </Link>
  );
}

/* El panel que abre el botón de menú en pantallas chicas. Vive fuera de los dos
   encabezados: el flotante se apaga con inert mientras baja, y el panel no puede
   heredar eso. */
function PanelMovil({
  idioma,
  active,
  ruta,
  abierto,
  cerrar,
}: {
  idioma: Idioma;
  active?: string;
  ruta: string;
  abierto: boolean;
  cerrar: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  /* Escape cierra, y mientras esté abierto la página de atrás no se desplaza. */
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
    };
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", onKey);
    };
  }, [abierto, cerrar]);

  return (
    <div
      id={PANEL_ID}
      ref={panel}
      tabIndex={-1}
      aria-hidden={!abierto}
      inert={!abierto ? true : undefined}
      className={`fixed inset-0 z-[60] flex flex-col bg-aisc-forest-deep text-aisc-sand transition-opacity duration-200 ease-out lg:hidden motion-reduce:transition-none ${
        abierto ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Logo idioma={idioma} />
        <button
          type="button"
          aria-label={CERRAR_MENU[idioma]}
          onClick={cerrar}
          className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] text-aisc-sand transition-colors hover:bg-aisc-sand/10"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-4 pb-10">
        <nav aria-label={MENU_TITULO[idioma]} className="flex flex-col">
          {menu(idioma).map((item) => {
            const current = item.href === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={cerrar}
                aria-current={current ? "page" : undefined}
                className={`text-display-4 border-b border-aisc-sand/12 py-4 transition-colors hover:text-aisc-coral${
                  current ? " text-aisc-coral" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {IDIOMAS_LISTOS.length > 1 ? (
        <div className="flex flex-col gap-3">
          <span className="text-kicker text-aisc-sand/60">{IDIOMA_TITULO[idioma]}</span>
          <div className="flex flex-wrap gap-2">
            {IDIOMAS_LISTOS.map((i) => {
              const Bandera = BANDERA[i];
              const actual = i === idioma;
              return (
                <Link
                  key={i}
                  href={rutaEn(i, ruta)}
                  hrefLang={i}
                  onClick={cerrar}
                  aria-current={actual ? "true" : undefined}
                  className={`text-body-sm inline-flex min-h-11 items-center gap-2 rounded-full border px-4 transition-colors ${
                    actual
                      ? "border-aisc-sand/40 bg-aisc-sand/12 text-aisc-sand"
                      : "border-aisc-sand/20 text-aisc-sand/80 hover:bg-aisc-sand/10"
                  }`}
                >
                  <Bandera />
                  {NOMBRE_IDIOMA[i]}
                </Link>
              );
            })}
          </div>
        </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The two headers the design ships with: one parked in the hero, and one that
 * floats in as a pill once the hero header has scrolled away.
 */
export default function SiteHeader({ active }: { active?: string }) {
  const floating = useRef<HTMLElement>(null);
  const ruta = usePathname() ?? "/";
  const idioma = idiomaDe(ruta);
  const [abierto, setAbierto] = useState(false);

  /* Al cambiar de página el panel se cierra solo. */
  useEffect(() => {
    setAbierto(false);
  }, [ruta]);

  useEffect(() => {
    const el = floating.current;
    if (!el) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const span = REVEAL_END - REVEAL_START;
      const p = Math.min(1, Math.max(0, (window.scrollY - REVEAL_START) / span));
      el.style.opacity = String(p);
      el.style.transform = `translate3d(0, ${(-8 * (1 - p)).toFixed(2)}px, 0) scale(${(0.992 + 0.008 * p).toFixed(3)})`;

      /* only hand the pill back to the pointer and the a11y tree once it has
         fully arrived — a half-faded header should not be clickable */
      const open = p >= 1;
      el.classList.toggle("pointer-events-none", !open);
      el.classList.toggle("pointer-events-auto", open);
      el.setAttribute("aria-hidden", open ? "false" : "true");
      el.toggleAttribute("inert", !open);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 px-4 py-4 xl:px-20">
        <div className="mx-auto flex h-12 w-full max-w-md items-center gap-4 text-aisc-sand md:h-14 md:max-w-[1440px] md:gap-8">
          <Logo idioma={idioma} />
          <Nav idioma={idioma} active={active} className="hidden items-center gap-0.5 lg:flex xl:gap-2 ml-1" />
          <div className="ml-auto flex items-center gap-2">
            <SelectorIdioma />
            <MenuButton idioma={idioma} abierto={abierto} onClick={() => setAbierto((v) => !v)} />
          </div>
        </div>
      </header>
      <header
        ref={floating}
        aria-hidden="true"
        inert
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-[opacity,transform] duration-200 ease-out will-change-[opacity,transform] motion-reduce:transition-none md:px-6 md:pt-5 pointer-events-none"
        style={{ opacity: 0, transform: "translate3d(0, -8.00px, 0) scale(0.992)" }}
      >
        <div className="mx-auto flex h-14 w-full max-w-md items-center gap-4 rounded-full px-4 text-aisc-sand shadow-[0_12px_40px_-12px_rgba(20,54,32,0.55)] md:h-[68px] md:max-w-[1400px] md:gap-8 md:px-10 bg-aisc-forest-deep">
          <Logo idioma={idioma} />
          <Nav idioma={idioma} active={active} className="hidden items-center gap-0.5 lg:flex xl:gap-2 ml-auto" />
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <SelectorIdioma />
            <MenuButton idioma={idioma} abierto={abierto} onClick={() => setAbierto((v) => !v)} />
          </div>
        </div>
      </header>
      <PanelMovil
        idioma={idioma}
        active={active}
        ruta={ruta}
        abierto={abierto}
        cerrar={() => setAbierto(false)}
      />
    </>
  );
}
