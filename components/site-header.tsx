"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/events", label: "Events" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Blog" },
];

/* The floating header is scroll-linked rather than a toggle: opacity tracks the
   band below, and the lift and scale ride the same progress. Read off the
   original, which sits at opacity .417 / -3.71px / .996 at y=300 and lands
   fully open by y=500. */
const REVEAL_START = 160;
const REVEAL_END = 500;

const LOGO_MASK = {
  WebkitMask: "url('/sash/logo/sash-navbar.svg') center / contain no-repeat",
  mask: "url('/sash/logo/sash-navbar.svg') center / contain no-repeat",
};

function Nav({ active, className }: { active?: string; className: string }) {
  return (
    <nav className={className}>
      {NAV.map((item) => {
        const current = item.href === active;
        return (
          <Link
            key={item.href}
            aria-current={current ? "page" : undefined}
            className={`text-meta md:text-meta-lg text-sash-frost transition-colors hover:text-sash-frost/70${current ? " underline underline-offset-4" : ""}`}
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
    <button type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav-mobile" className="ml-auto flex h-11 w-11 items-center justify-center rounded-[var(--radius)] text-sash-frost transition-colors hover:bg-sash-frost/10 lg:hidden">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="remixicon">
        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
      </svg>
    </button>
  );
}

function Logo() {
  return (
    <Link aria-label="SASH home" className="flex items-center" href="/">
      <span role="img" aria-label="SASH" className="inline-block max-w-full shrink-0 h-[0.86em] w-[4.91em] bg-sash-frost text-[30px] md:text-[34px]" style={LOGO_MASK} />
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
        <div className="mx-auto flex h-12 w-full max-w-md items-center gap-4 text-sash-frost md:h-14 md:max-w-[1440px] md:gap-8">
          <Logo />
          <Nav active={active} className="hidden items-center gap-3 lg:flex xl:gap-4 ml-0" />
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
        <div className="mx-auto flex h-14 w-full max-w-md items-center gap-4 rounded-full px-4 text-sash-frost shadow-[0_12px_40px_-12px_rgba(11,4,105,0.5)] md:h-[68px] md:max-w-[1400px] md:gap-8 md:px-10 bg-sash-midnight">
          <Logo />
          <Nav active={active} className="hidden items-center gap-3 lg:flex xl:gap-4 ml-auto" />
          <MenuButton />
        </div>
      </header>
    </>
  );
}
