import CourseApplyForm from "@/components/course-apply-form";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { CURSOS, RUTA_UNETE, TEXTOS_CURSOS, cursosCerrados, type CursoId } from "@/lib/cursos";
import type { Idioma } from "@/lib/idiomas";

/* La página de aplicación a los cursos es la misma en los tres idiomas; lo que
   cambia está en lib/cursos.ts. Cada ruta solo pone sus metadatos y le pasa el
   idioma y el curso que llegó por `?curso=`. */
export default function CourseApplyPage({ idioma, curso }: { idioma: Idioma; curso?: string }) {
  const t = TEXTOS_CURSOS[idioma];
  const cerrado = cursosCerrados();
  const inicial = (CURSOS as string[]).includes(curso ?? "") ? (curso as CursoId) : undefined;

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
              {cerrado ? t.cerradoCuerpo : `${t.cierre} ${t.entrada}`}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-aisc-sand">
        <div className="mx-auto w-full max-w-[900px] px-6 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20">
          <CourseApplyForm cerrado={cerrado} idioma={idioma} cursoInicial={inicial} />
        </div>
      </section>
      <SiteFooter idioma={idioma} />
    </main>
  );
}
