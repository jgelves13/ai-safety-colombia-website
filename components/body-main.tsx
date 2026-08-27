import type { ReactNode } from "react";

/* El ancho del sitio. La portada y las bandas de hero ya se apoyaban en esta
   reja: una caja de 1448px con gutter de 32px que pasa a 64px de tablet en
   adelante. Todo lo que ocupe el ancho de una pagina entra por aqui para que
   ninguna seccion se invente el suyo. */
export const BODY_MAIN = "mx-auto w-full max-w-[1448px] px-8 md:px-16";

export default function BodyMain({
  id,
  className,
  children,
}: {
  id?: string;
  /** lo propio de cada seccion: separacion vertical, fondo, lo que sea */
  className?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className={className ? `${BODY_MAIN} ${className}` : BODY_MAIN}>
      {children}
    </div>
  );
}
