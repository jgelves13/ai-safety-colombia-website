import CourseApplyForm from "@/components/course-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CURSOS, RUTA_UNETE, TEXTOS_CURSOS, cursosCerrados, type CursoId } from "@/lib/cursos";
import type { Idioma } from "@/lib/idiomas";
import { verificarPase } from "@/lib/pase-seminario";

const LOCALE: Record<Idioma, string> = { es: "es-CO", en: "en-GB", pt: "pt-BR" };

/* «martes 13 de octubre» y «11:59 p. m.» en la hora de Bogotá, como en el resto del sitio. */
function cuandoVence(vence: Date, idioma: Idioma): { dia: string; hora: string } {
  const zona = { timeZone: "America/Bogota" } as const;
  const dia = new Intl.DateTimeFormat(LOCALE[idioma], { ...zona, weekday: "long", day: "numeric", month: "long" }).format(vence);
  const hora = new Intl.DateTimeFormat(LOCALE[idioma], { ...zona, hour: "numeric", minute: "2-digit", hour12: idioma !== "pt" }).format(vence);
  if (idioma === "pt") return { dia, hora: hora.replace(":", "h") };
  return { dia: dia.replace(",", ""), hora };
}

/* La página de aplicación a los cursos es la misma en los tres idiomas; lo que
   cambia está en lib/cursos.ts. Cada ruta solo pone sus metadatos y le pasa el
   idioma y el curso que llegó por `?curso=`. Un `?pase=` firmado y vigente
   (lib/pase-seminario.ts) abre el formulario después del cierre, solo para
   el seminario que dice el pase. */
export default function CourseApplyPage({ idioma, curso, pase }: { idioma: Idioma; curso?: string; pase?: string }) {
  const t = TEXTOS_CURSOS[idioma];
  const tarde = cursosCerrados() ? verificarPase(pase) : null;
  const cerrado = cursosCerrados() && !tarde;
  const inicial = tarde?.curso ?? ((CURSOS as string[]).includes(curso ?? "") ? (curso as CursoId) : undefined);
  const vence = tarde ? cuandoVence(tarde.vence, idioma) : null;
  const cierre = vence ? t.paseCierre.replace("{dia}", vence.dia).replace("{hora}", vence.hora) : t.cierre;

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
          src="/aisc/patterns/aisc-hero-unete.svg"
        />
        <SiteHeader active={RUTA_UNETE[idioma]} />
        <div className={HERO_INNER}>
          <div className="flex max-w-[760px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">{t.kicker}</span>
            <h1 className="text-display-1 md:text-display-1-lg text-balance text-aisc-sand">{t.titulo}</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">
              {cerrado ? t.cerradoCuerpo : `${cierre} ${t.entrada}`}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          <CourseApplyForm
            cerrado={cerrado}
            idioma={idioma}
            cursoInicial={inicial}
            pase={tarde ? pase : undefined}
            soloCurso={tarde?.curso}
          />
        </div>
      </section>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
