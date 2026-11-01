import type { Metadata } from "next";
import SprintConfirmForm from "@/components/sprint-confirm-form";
import { ConfirmarMarco } from "@/components/confirmar-marco";

/* La misma confirmación, pero sin enlace firmado: acá la persona escribe su
   nombre y su correo a mano.

   Es para quien no recibe el correo de aceptación —a quien se le avisa por
   WhatsApp o en persona—, y por eso está en una ruta aparte y no en
   /sprint/confirmar sin token: si la página del enlace aceptara confirmaciones
   anónimas, firmar los enlaces no serviría de nada.

   Lo que se pierde acá es la garantía de identidad: cualquiera que tenga esta
   dirección puede escribir cualquier nombre. La ruta lo marca con
   source = 'abierto' para poder distinguir esas filas de las que entraron por
   un enlace firmado. Por eso esta dirección se pasa a dedo, no se publica. */
export const metadata: Metadata = {
  title: "Confirma tu cupo en el AI Incident Response Sprint",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ConfirmarAbierto() {
  return (
    <ConfirmarMarco>
      <SprintConfirmForm />
    </ConfirmarMarco>
  );
}
