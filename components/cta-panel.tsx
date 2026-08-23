import type { ReactNode } from "react";
import { CTA_PANEL, CTA_PATTERN_BOTTOM, CTA_PATTERN_TOP } from "./ui";

const PATRON = "/aisc/patterns/aisc-wash-lattice.svg";

/**
 * El panel verde con el que cierra cada página. Es una banda: el texto a la
 * izquierda y los botones a la derecha, para que no se coma una pantalla entera
 * al final de cada página. En móvil se apila.
 */
export default function CtaPanel({
  kicker,
  title,
  body,
  children,
  actionsClassName = "flex flex-wrap items-center gap-3",
}: {
  kicker?: string;
  title: string;
  body: string;
  children: ReactNode;
  actionsClassName?: string;
}) {
  return (
    <section className="bg-aisc-cream px-6">
      <div className="mx-auto w-full max-w-[1400px] pb-14 md:pb-16">
        <div className={CTA_PANEL}>
          <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" className={CTA_PATTERN_TOP} style={{ color: "transparent" }} src={PATRON} />
          <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" className={CTA_PATTERN_BOTTOM} style={{ color: "transparent" }} src={PATRON} />
          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
            <div className="flex max-w-[620px] flex-col gap-2.5">
              {kicker ? <span className="text-kicker text-aisc-coral">{kicker}</span> : null}
              <h2 className="text-display-3 md:text-display-3-lg text-balance text-aisc-sand">{title}</h2>
              <p className="text-body-sm text-aisc-sand/85">{body}</p>
            </div>
            <div className={actionsClassName}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
