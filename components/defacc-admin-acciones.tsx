"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const BOTON_LLENO =
  "text-body-sm inline-flex min-h-11 items-center rounded-full bg-aisc-coral px-6 font-medium text-aisc-cream transition-colors hover:bg-aisc-coral/85 disabled:opacity-60";
const BOTON_BORDE =
  "text-meta inline-flex min-h-9 items-center rounded-full border border-aisc-ink px-4 font-medium text-aisc-ink transition-colors hover:bg-aisc-ink hover:text-aisc-cream disabled:opacity-60";
const INPUT =
  "text-body-sm w-full rounded-[var(--radius)] border border-aisc-line bg-white px-3.5 py-2.5 text-aisc-ink transition-colors focus:border-aisc-forest focus:outline-2 focus:outline-offset-[1px] focus:outline-aisc-forest/35";

export function LoginAdmin() {
  const router = useRouter();
  const [clave, setClave] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      const r = await fetch("/api/defacc/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clave }),
      });
      const j = (await r.json()) as { ok: boolean; mensaje?: string };
      if (j.ok) {
        setClave("");
        router.refresh();
      } else {
        setError(j.mensaje ?? "No se pudo entrar.");
      }
    } catch {
      setError("Sin conexión. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={entrar} className="flex max-w-[420px] flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-body-sm font-medium text-aisc-ink">Clave de organización</span>
        <input
          type="password"
          autoComplete="current-password"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className={INPUT}
          required
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={enviando || !clave} className={BOTON_LLENO}>
          {enviando ? "Entrando…" : "Entrar"}
        </button>
        {error ? <span className="text-meta text-aisc-coral">{error}</span> : null}
      </div>
    </form>
  );
}

export function SalirAdmin() {
  const router = useRouter();
  return (
    <button
      type="button"
      className={BOTON_BORDE}
      onClick={async () => {
        await fetch("/api/defacc/admin", { method: "DELETE" });
        router.refresh();
      }}
    >
      Cerrar sesión
    </button>
  );
}

export function RevisarDeNuevo({ slug }: { slug: string }) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function revisar() {
    setEnviando(true);
    setError(null);
    try {
      const r = await fetch("/api/defacc/admin/revisar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const j = (await r.json()) as { ok: boolean; mensaje?: string };
      if (j.ok) router.refresh();
      else setError(j.mensaje ?? "Falló la revisión.");
    } catch {
      setError("Sin conexión.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button type="button" onClick={revisar} disabled={enviando} className={BOTON_BORDE}>
        {enviando ? "Revisando…" : "Revisar de nuevo con IA"}
      </button>
      {error ? <span className="text-meta text-aisc-coral">{error}</span> : null}
    </span>
  );
}

export function DescartarEntrega({ slug, descartada }: { slug: string; descartada: boolean }) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cambiar() {
    setEnviando(true);
    setError(null);
    try {
      const r = await fetch("/api/defacc/admin/descartar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, descartar: !descartada }),
      });
      const j = (await r.json()) as { ok: boolean; mensaje?: string };
      if (j.ok) router.refresh();
      else setError(j.mensaje ?? "No se pudo cambiar.");
    } catch {
      setError("Sin conexión.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <button type="button" onClick={cambiar} disabled={enviando} className={BOTON_BORDE}>
        {enviando ? "Guardando…" : descartada ? "Restaurar" : "Descartar"}
      </button>
      {error ? <span className="text-meta text-aisc-coral">{error}</span> : null}
    </span>
  );
}

export function CopiarEnlace({ ruta }: { ruta: string }) {
  const [copiado, setCopiado] = useState(false);
  return (
    <button
      type="button"
      className={BOTON_BORDE}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(`${window.location.origin}${ruta}`);
          setCopiado(true);
          setTimeout(() => setCopiado(false), 2000);
        } catch {
          /* sin portapapeles */
        }
      }}
    >
      {copiado ? "Copiado" : "Copiar enlace"}
    </button>
  );
}
