import type { ReactNode } from "react";
import { CTA_PANEL, CTA_PATTERN_BOTTOM, CTA_PATTERN_TOP } from "./ui";

const PATTERN = "/aisc/patterns/aisc-wash-lattice.svg";

/**
 * El panel verde con el que cierra cada página: antecedente, titular, una línea
 * de texto y los botones. El rótulo y la regla de coral están para que el bloque
 * tenga jerarquía y no se lea como un párrafo centrado suelto.
 */
export default function CtaPanel({
  kicker,
  title,
  body,
  children,
  actionsClassName = "mt-4 flex flex-wrap items-center justify-center gap-3 md:gap-4",
}: {
  kicker?: string;
  title: string;
  body: string;
  children: ReactNode;
  actionsClassName?: string;
}) {
  return (
    <section className="bg-aisc-cream px-6">
      <div className="mx-auto w-full max-w-[1400px] py-12 md:py-14 lg:py-16">
        <div className={CTA_PANEL}>
          <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" className={CTA_PATTERN_TOP} style={{ color: "transparent" }} src={PATTERN} />
          <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" className={CTA_PATTERN_BOTTOM} style={{ color: "transparent" }} src={PATTERN} />
          <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-5">
            {kicker ? <span className="text-kicker text-aisc-coral">{kicker}</span> : null}
            <h2 className="text-display-2 md:text-display-2-lg max-w-[760px] text-balance text-aisc-sand">{title}</h2>
            <span aria-hidden="true" className="block h-px w-16 bg-aisc-coral" />
            <p className="text-body md:text-body-lg max-w-[620px] text-balance text-aisc-sand/90">{body}</p>
            <div className={actionsClassName}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
