import { alt as altDe, tarjeta, TAMANO, TIPO_CONTENIDO } from "@/lib/og-card";

export const alt = altDe("pt");
export const size = TAMANO;
export const contentType = TIPO_CONTENIDO;

export default function Image() {
  return tarjeta("pt");
}
