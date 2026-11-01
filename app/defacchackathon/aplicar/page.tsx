import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DefAccApplyForm from "@/components/defacc-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { inscripcionesCerradas } from "../datos";
import { alternativas } from "@/lib/idiomas";

export const metadata: Metadata = {
  title: "Inscripción · Defensive Acceleration Hackathon",
  description:
    "Formulario de inscripción al Defensive Acceleration Hackathon (CyberBear Hackathon), sábado 14 de noviembre de 2026 en la Universidad de los Andes, Bogotá. Co-organizado por AI Safety Colombia e IEEE Computer Society Uniandes.",
  alternates: {
    canonical: "/defacchackathon/aplicar",
    languages: alternativas("/defacchackathon/aplicar"),
  },
};

export const dynamic = "force-dynamic";

export default async function AplicarDefAcc() {
  const cerrado = inscripcionesCerradas();

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="1697"
          height="1415"
          decoding="async"
          className={HERO_CORNER_CLASS}
          style={{ color: "transparent" }}
          src="/aisc/patterns/aisc-hero-hackathon.svg"
        />
        <SiteHeader active="/defacchackathon" />
        <div className={HERO_INNER}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 max-w-[960px]">
            <div className="flex max-w-[700px] flex-col gap-4">
              <span className="text-kicker text-aisc-sand/70">
                Defensive Acceleration Hackathon · Sábado 14 de noviembre de 2026 · Uniandes
              </span>
              <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
                Inscríbete al Hackathon
              </h1>
              <p className="text-body md:text-body-lg text-aisc-sand/90">
                8:00 a. m. a 8:00 p. m. en el campus de la Universidad de los Andes en Bogotá.
                Cupo limitado por aforo, almuerzo y refrigerios incluidos, mentores técnicos y más de COP 3.200.000 en premios.
              </p>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Image
                src="/aisc/hackathon/cyberbear.png"
                alt="CyberBear"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
              <span className="text-[11px] font-mono tracking-wider text-aisc-sand/80 uppercase mt-1">
                CyberBear 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          {!cerrado ? (
            <div className="mb-8 rounded-[var(--radius)] border border-aisc-line bg-white/70 p-5 backdrop-blur-sm flex flex-col gap-2.5">
              <p className="text-body-sm font-medium text-aisc-forest-deep">
                Información clave antes de llenar el formulario:
              </p>
              <ul className="text-body-sm text-aisc-ink space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Equipos o individual:</strong> puedes inscribirte en equipo (2 a 4 personas) o de forma individual. Si vienes solo, te ayudaremos a conformar equipo en la sesión de matchmaking matutina (9:40 a. m.).
                </li>
                <li>
                  <strong>Ingreso al campus:</strong> el número de documento de identidad es estrictamente necesario para registrar tu pase de seguridad peatonal en la portería de la Universidad de los Andes.
                </li>
                <li>
                  <strong>Almuerzo y logística:</strong> incluimos almuerzo completo en el campus para todos los participantes seleccionados, estaciones de café y snacks durante toda la jornada.
                </li>
                <li>
                  <strong>Cierre de postulaciones:</strong> martes 10 de noviembre a las 11:59 p. m.
                </li>
              </ul>
              <div className="pt-2 text-body-sm">
                ¿Quieres revisar los tracks, starter kits o rúbrica de evaluación antes de postularte?{" "}
                <Link
                  className="font-medium text-aisc-forest underline underline-offset-[3px] transition-colors hover:text-aisc-forest-deep"
                  href="/defacchackathon"
                >
                  Consulta aquí la guía completa del hackathon →
                </Link>
              </div>
            </div>
          ) : null}

          <DefAccApplyForm cerrado={cerrado} idioma="es" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
