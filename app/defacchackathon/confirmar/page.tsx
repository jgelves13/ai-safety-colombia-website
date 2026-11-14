import { createHash } from "node:crypto";
import type { Metadata } from "next";
import DefaccConfirmForm from "@/components/defacc-confirm-form";
import { ConfirmarAviso } from "@/components/confirmar-marco";
import { DefaccConfirmarMarco } from "@/components/defacc-confirmar-marco";
import { verificarInvitacionDefacc } from "@/lib/defacc-confirmar";

/* Solo en español, sin enlazar desde ningún lado y con noindex: se llega por
   el enlace firmado del correo de aceptación. No hay versión abierta. */
export const metadata: Metadata = {
  title: "Confirma tu cupo en el DefAcc Hackathon",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const CONFIRMACIONES_CERRADAS = true;

/* Reaperturas puntuales: sha256 del correo en minúsculas → fin del plazo.
   Se guarda el hash y no el correo para no dejar datos personales en el código. */
const REABIERTAS: Record<string, string> = {
  // Yamid González, hasta el 13 nov 2026 a la medianoche de Bogotá.
  a96ac230810c68dc50f0fe9e96ddc069c258f6bfeedfb731f68679da727a665f: "2026-11-14T05:00:00Z",
  // Jose Manuel Pardo, hasta el 13 nov 2026 a la medianoche de Bogotá.
  "1d138352a76e72fd3404134e63932b2bd3b468854ffed9b1d777966c3157b550": "2026-11-14T05:00:00Z",
};

function reabierta(correo: string): boolean {
  const hasta = REABIERTAS[createHash("sha256").update(correo.toLowerCase()).digest("hex")];
  return Boolean(hasta) && Date.now() < Date.parse(hasta);
}

export default async function ConfirmarDefacc({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const invitada = verificarInvitacionDefacc(t);

  /* Plazo vencido (13 nov 2026, 12 m): ya no se reciben confirmaciones nuevas. */
  if (CONFIRMACIONES_CERRADAS && !(invitada && reabierta(invitada.correo))) {
    return (
      <DefaccConfirmarMarco>
        <ConfirmarAviso
          titulo="Las confirmaciones están cerradas."
          texto={`${invitada ? `${invitada.nombre}, el` : "El"} plazo para confirmar cupo ya pasó. Si tienes una duda, responde el correo de aceptación.`}
        />
      </DefaccConfirmarMarco>
    );
  }

  if (!invitada) {
    return (
      <DefaccConfirmarMarco>
        <ConfirmarAviso
          titulo="Este enlace no sirve."
          texto="Puede que se haya cortado al copiarlo del correo. Ábrelo directamente desde el correo de aceptación."
        />
      </DefaccConfirmarMarco>
    );
  }

  return (
    <DefaccConfirmarMarco>
      <DefaccConfirmForm token={t ?? ""} nombre={invitada.nombre} />
    </DefaccConfirmarMarco>
  );
}
