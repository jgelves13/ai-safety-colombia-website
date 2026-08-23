"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/* Seis entradas, en el orden en que alguien nuevo las necesita: qué es el
   campo, qué está abierto ahora mismo, qué sale de acá, con qué estudiar,
   cómo entrar y quiénes somos. Eventos y blog viven dentro de esas páginas.
   La segunda entrada lleva el nombre del sprint vigente: al cerrar el de
   septiembre hay que renombrarla con el que siga. */
const NAV = [
  { href: "/seguridad-de-la-ia", label: "¿Qué es AI safety?" },
  { href: "/hackathon", label: "AI Incident Response Sprint" },
  { href: "/investigacion", label: "Investigación" },
  { href: "/recursos", label: "Recursos" },
  { href: "/unete", label: "Únete" },
  { href: "/quienes-somos", label: "Quiénes somos" },
];

/* The floating header is scroll-linked rather than a toggle: opacity tracks the
   band below, and the lift and scale ride the same progress. Read off the
   original, which sits at opacity .417 / -3.71px / .996 at y=300 and lands
   fully open by y=500. */
const REVEAL_START = 160;
const REVEAL_END = 500;

function Nav({ active, className }: { active?: string; className: string }) {
  return (
    <nav className={className}>
      {NAV.map((item) => {
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

function MenuButton() {
  return (
    <button type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="site-nav-mobile" className="ml-auto flex h-11 w-11 items-center justify-center rounded-[var(--radius)] text-aisc-sand transition-colors hover:bg-aisc-sand/10 lg:hidden">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="remixicon">
        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
      </svg>
    </button>
  );
}

function Logo() {
  return (
    <Link aria-label="AI Safety Colombia, inicio" className="flex shrink-0 items-center" href="/">
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

/**
 * The two headers the design ships with: one parked in the hero, and one that
 * floats in as a pill once the hero header has scrolled away.
 */
export default function SiteHeader({ active }: { active?: string }) {
  const floating = useRef<HTMLElement>(null);

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
          <Logo />
          <Nav active={active} className="hidden items-center gap-0.5 lg:flex xl:gap-2 ml-1" />
          <MenuButton />
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
          <Logo />
          <Nav active={active} className="hidden items-center gap-0.5 lg:flex xl:gap-2 ml-auto" />
          <MenuButton />
        </div>
      </header>
    </>
  );
}
