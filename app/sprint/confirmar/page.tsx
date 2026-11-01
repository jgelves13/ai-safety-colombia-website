import type { Metadata } from "next";
import SprintConfirmForm from "@/components/sprint-confirm-form";
import { ConfirmarAviso, ConfirmarMarco } from "@/components/confirmar-marco";
import { verificarInvitacion } from "@/lib/confirmar";

/* Página solo en español y sin enlazar desde ningún lado: se llega por el
   enlace firmado del correo de aceptación. Por eso no entra en la tabla de
   PAGINAS de lib/idiomas.ts —no tiene traducción que cuidar— y va con noindex:
   no queremos que aparezca en Google con el nombre de nadie.

   La versión abierta, para quien no recibe el correo, vive en
   /sprint/confirmar/abierto. Está aparte a propósito: si esta ruta aceptara
   confirmaciones sin token, la firma no serviría de nada. */
export const metadata: Metadata = {
  title: "Confirma tu cupo en el AI Incident Response Sprint",
  robots: { index: false, follow: false },
};

/* Igual que /sprint/aplicar: se resuelve en cada visita, porque el token viaja
   en la URL y no hay nada que prerenderizar. */
export const dynamic = "force-dynamic";

export default async function Confirmar({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const invitada = verificarInvitacion(t);

  /* Enlace roto o inventado. No se distingue entre «no hay token» y «la firma no
     cuadra»: quien no traiga el enlace del correo ve exactamente lo mismo. */
  if (!invitada) {
    return (
      <ConfirmarMarco>
        <ConfirmarAviso
          titulo="Este enlace no sirve."
          texto="Puede que se haya cortado al copiarlo del correo. Ábrelo directamente desde el correo de aceptación."
        />
      </ConfirmarMarco>
    );
  }

  return (
    <ConfirmarMarco>
      <SprintConfirmForm token={t ?? ""} nombre={invitada.nombre} />
    </ConfirmarMarco>
  );
}
