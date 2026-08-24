/** the ghost-button recipe the design reuses for every closing call to action */
const BUTTON_BASE =
  "group/button inline-flex shrink-0 items-center justify-center border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-transparent has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 min-h-0 gap-2 border-0 p-0 focus-visible:ring-0";

/** los dos botones del panel de cierre: uno lleno y uno de contorno. Antes eran
    enlaces sin caja y el bloque entero se leia plano. */
const CTA_BUTTON =
  "inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full px-6 text-center transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-aisc-sand text-body-sm font-medium";
export const CTA_LINK_PRIMARY = `${CTA_BUTTON} bg-aisc-coral text-aisc-cream hover:bg-aisc-coral/85`;
export const CTA_LINK = `${CTA_BUTTON} border border-aisc-sand/45 text-aisc-sand hover:border-aisc-sand hover:bg-aisc-sand hover:text-aisc-forest-deep`;

/** the "Learn More" affordance inside program cards, which take their colour
    from the card rather than the panel */
export const CARD_LINK_FROST = `${BUTTON_BASE} text-display-4 md:text-display-4-lg text-aisc-sand hover:text-aisc-sand/72 mt-10 w-fit`;
export const CARD_LINK_COBALT = `${BUTTON_BASE} text-display-4 md:text-display-4-lg text-aisc-forest hover:text-aisc-forest-deep mt-10 w-fit`;

/** the hero band every interior page opens with */
export const PAGE_SHELL = "aisc-page min-h-screen bg-aisc-cream text-aisc-ink";
export const HERO_SECTION = "relative overflow-hidden bg-aisc-forest-deep text-aisc-sand";
export const HERO_INNER =
  "mx-auto w-full max-w-[1448px] px-8 md:px-16 relative z-10 flex min-h-[330px] flex-col justify-end pt-28 pb-12 md:pt-32 md:pb-16";

/** the corner artwork that fills the right of the hero on About/Events/Blog */
export const HERO_CORNER_CLASS =
  "pointer-events-none absolute right-0 bottom-0 z-0 hidden h-full w-auto max-w-[60%] select-none object-contain object-right-bottom md:block";

/* El derrame del sprint ocupa toda la banda: la caja se queda abajo a la
   derecha y el liquido tiene por donde correr. */
export const HERO_DERRAME_CLASS =
  "pointer-events-none absolute inset-0 z-0 hidden select-none [&>svg]:block [&>svg]:h-full [&>svg]:w-full md:block";

/** the two mirrored pattern washes on the midnight CTA panel */
export const CTA_PANEL =
  "relative overflow-hidden rounded-[var(--radius)] bg-aisc-forest-deep px-6 py-9 text-aisc-sand md:px-10 md:py-10 lg:px-14 lg:py-11";
export const CTA_PATTERN_TOP =
  "pointer-events-none absolute top-0 left-0 h-full w-[62%] max-w-none select-none object-contain object-left-top opacity-55 mix-blend-screen md:w-[34%]";
export const CTA_PATTERN_BOTTOM =
  "pointer-events-none absolute right-0 bottom-0 h-full w-[62%] max-w-none rotate-180 select-none object-contain object-left-top opacity-55 mix-blend-screen md:w-[34%]";

/** the fill-style next/image emits, which these ports reproduce on a plain img */
export const FILL_IMAGE = {
  position: "absolute",
  height: "100%",
  width: "100%",
  left: "0",
  top: "0",
  right: "0",
  bottom: "0",
  color: "transparent",
} as const;
