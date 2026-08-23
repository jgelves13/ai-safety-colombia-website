import type { ReactNode } from "react";

/* Los iconos de las cinco puertas del inicio. Son de trazo, del mismo grosor que
   las reglas del sitio, y heredan el color del texto de la tarjeta. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconSeguridad = () => (
  <Icon>
    <path d="M12 3.2 19 6v5.6c0 4.3-2.9 7.3-7 8.8-4.1-1.5-7-4.5-7-8.8V6l7-2.8Z" />
    <path d="M9.2 12.1 11.2 14l3.6-3.7" />
  </Icon>
);

export const IconProgramas = () => (
  <Icon>
    <path d="M12 4 2.6 8.6 12 13.2l9.4-4.6L12 4Z" />
    <path d="M6.4 10.6v4.6c0 1.5 2.5 2.8 5.6 2.8s5.6-1.3 5.6-2.8v-4.6" />
    <path d="M21.4 8.6v5" />
  </Icon>
);

export const IconEventos = () => (
  <Icon>
    <rect x="3.2" y="5.2" width="17.6" height="15.6" rx="2.2" />
    <path d="M8 3.2v4M16 3.2v4M3.2 10.2h17.6" />
    <path d="M8 14h3v3H8z" />
  </Icon>
);

export const IconActualidad = () => (
  <Icon>
    <path d="M4 4.8h12.4v14.4a1.6 1.6 0 0 0 1.6 1.6H6a2 2 0 0 1-2-2V4.8Z" />
    <path d="M16.4 8.4H20v10.8a1.6 1.6 0 0 1-1.6 1.6" />
    <path d="M7.2 8.6h6M7.2 11.8h6M7.2 15h4" />
  </Icon>
);

export const IconQuienesSomos = () => (
  <Icon>
    <circle cx="9.2" cy="8.4" r="3.2" />
    <path d="M3.4 19.8c0-3.2 2.6-5.2 5.8-5.2s5.8 2 5.8 5.2" />
    <path d="M16.4 5.6a3.2 3.2 0 0 1 0 5.6" />
    <path d="M17.6 14.9c1.9.6 3.2 2.3 3.2 4.6" />
  </Icon>
);

export const IconUnete = () => (
  <Icon>
    <path d="M13.6 3.6h4.6a1.8 1.8 0 0 1 1.8 1.8v13.2a1.8 1.8 0 0 1-1.8 1.8h-4.6" />
    <path d="M9.6 8.4 13.2 12l-3.6 3.6" />
    <path d="M13.2 12H3.8" />
  </Icon>
);
