import type { Metadata } from "next";
import DefaccConfirmForm from "@/components/defacc-confirm-form";
import { ConfirmarAviso } from "@/components/confirmar-marco";
import { DefaccConfirmarMarco } from "@/components/defacc-confirmar-marco";
import { preguntaPorMasGente, verificarInvitacionDefacc } from "@/lib/defacc-confirmar";

/* Solo en español, sin enlazar desde ningún lado y con noindex: se llega por
   el enlace firmado del correo de aceptación. No hay versión abierta. */
export const metadata: Metadata = {
  title: "Confirma tu cupo en el DefAcc Hackathon",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ConfirmarDefacc({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const invitada = verificarInvitacionDefacc(t);

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
      <DefaccConfirmForm
        token={t ?? ""}
        nombre={invitada.nombre}
        equipo={invitada.equipo}
        preguntarMasGente={preguntaPorMasGente(invitada.equipo)}
      />
    </DefaccConfirmarMarco>
  );
}
