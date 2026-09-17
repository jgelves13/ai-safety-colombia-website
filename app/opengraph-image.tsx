import { alt as altDe, tarjeta, TAMANO, TIPO_CONTENIDO } from "@/lib/og-card";

/* La raíz cubre todo el sitio: cualquier ruta que no traiga su propia imagen
   hereda esta. `/en` y `/pt` sí traen la suya. */

export const alt = altDe("es");
export const size = TAMANO;
export const contentType = TIPO_CONTENIDO;

export default function Image() {
  return tarjeta("es");
}
