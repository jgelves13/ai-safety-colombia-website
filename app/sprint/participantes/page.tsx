import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import RejillaParticipantes from "./rejilla";
import {
  HERO_CORNER_CLASS,
  HERO_INNER,
  HERO_SECTION,
  PAGE_SHELL,
} from "@/components/ui";

/* Quiénes vienen al hub de Bogotá.

   Es la pieza que se manda junto con la guía para que la gente llegue el
   viernes con algunas personas en mente. Mismo régimen que /sprint/guia: solo
   en español, noindex y sin enlazar desde ningún lado, así que tampoco entra en
   la tabla de PAGINAS de lib/idiomas.ts y no necesita sellar traducciones.

   Las tarjetas son las mismas de mentores y ponentes en /sprint. La afiliación
   sale del titular de LinkedIn de cada quien. El problema es una versión corta
   de lo que escribió en la aplicación; quien no escribió ninguno no lleva esa
   línea, y quien no tiene perfil no lleva enlace. Sin correos.

   El avatar son las iniciales sobre la caja arena, y esa es la decisión, no
   una espera: con 44 personas, unas pocas fotos reales dejarían al resto
   pareciendo imagen rota. El campo foto queda por si algún día hay retratos. Nada de rayas largas, tampoco en
   los comentarios. */
export const metadata: Metadata = {
  title: "Participantes · AI Incident Response Sprint",
  robots: { index: false, follow: false },
};

const CONTENEDOR = "mx-auto w-full max-w-[1448px] px-8 md:px-16";

/* Retirada el 9 de octubre de 2026, ya pasado el sprint: el catálogo servía
   para formar equipos y publicaba la afiliación y el LinkedIn de 44 personas,
   más de lo que anunciaba el aviso de la versión corta del formulario. Para
   volver a mostrarla en otro sprint, quitar esta línea y avisar en el
   formulario qué se publica (ver /privacidad). */
const RETIRADA = true;

export default function Participantes() {
  if (RETIRADA) notFound();
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
        <SiteHeader active="/sprint" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">
              Quiénes vienen al sprint
            </h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              AI Incident Response Sprint · Hub Bogotá · 11, 12 y 13 de
              septiembre de 2026
            </p>
            <p className="text-meta text-aisc-sand/60">
              AI Safety Colombia · solo para participantes seleccionados
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-cream py-14 md:py-16 lg:py-20">
        <div className={CONTENEDOR}>
          <div className="text-body md:text-body-lg flex max-w-[54rem] flex-col gap-5 text-aisc-ink">
            <p>Estas son las personas que vienen al hub de Bogotá.</p>
            <p>
              Te recomendamos mirarla con calma antes del viernes y llegar con
              algunas personas en mente para conversar o armar equipo. Encima de
              cada nombre está el frente al que corresponde su propuesta, y
              arriba puedes filtrar por frente y encontrar fácilmente a quienes
              tienen intereses similares.
            </p>
            <p>
              Ese frente corresponde a la propuesta con la que cada persona
              aplicó, pero no es definitivo: los equipos se forman el viernes y
              puedes sumarte a otro si encuentras una idea que te interese más.
            </p>
          </div>

          <RejillaParticipantes />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
