/* Las tres banderas, dibujadas y no traídas de un archivo: a 18 píxeles de ancho
   un PNG se ve sucio y un emoji de bandera no se pinta igual en Windows. Todas
   caben en la misma caja de 24×18 para que la fila quede pareja, aunque eso
   recorte un poco la proporción real de la del Reino Unido. */

type Props = { className?: string };

const CAJA = "block h-auto w-[18px] shrink-0 rounded-[2px]";

export function BanderaEspana({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 18"
      className={`${CAJA} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="18" fill="#AA151B" />
      <rect y="4.5" width="24" height="9" fill="#F1BF00" />
    </svg>
  );
}

export function BanderaReinoUnido({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 18"
      className={`${CAJA} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="18" fill="#012169" />
      <path d="M0 0 24 18M24 0 0 18" stroke="#FFFFFF" strokeWidth="3.6" />
      <path d="M0 0 24 18M24 0 0 18" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M12 0V18M0 9H24" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M12 0V18M0 9H24" stroke="#C8102E" strokeWidth="3.4" />
    </svg>
  );
}

export function BanderaPortugal({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 18"
      className={`${CAJA} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="24" height="18" fill="#DA291C" />
      <rect width="9.6" height="18" fill="#046A38" />
      {/* la esfera armilar, reducida a su anillo: a este tamaño el escudo
          entero se convierte en una mancha */}
      <circle cx="9.6" cy="9" r="3.2" fill="none" stroke="#FFE900" strokeWidth="1.5" />
      <circle cx="9.6" cy="9" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

export const BANDERA = {
  es: BanderaEspana,
  en: BanderaReinoUnido,
  pt: BanderaPortugal,
};
