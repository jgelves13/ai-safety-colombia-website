import type { ReactNode } from "react";
import { CTA_PANEL, CTA_PATTERN_BOTTOM, CTA_PATTERN_TOP } from "./ui";

const PATTERN = "/aisc/patterns/aisc-wash-lattice.svg";

/**
 * The midnight panel every page closes on: a heading, a line of copy and one or
 * two ghost buttons, washed with two mirrored copies of the bridge pattern.
 */
export default function CtaPanel({
  title,
  body,
  children,
  actionsClassName = "mt-2 flex flex-wrap items-center justify-center gap-x-10 gap-y-3",
}: {
  title: string;
  body: string;
  children: ReactNode;
  actionsClassName?: string;
}) {
  return (
    <section className="bg-aisc-cream px-6">
      <div className="mx-auto w-full max-w-[1400px] py-12 md:py-14 lg:py-16">
        <div className={CTA_PANEL}>
          <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" data-nimg="1" className={CTA_PATTERN_TOP} style={{ color: "transparent" }} src={PATTERN} />
          <img alt="" aria-hidden="true" loading="lazy" width="1697" height="995" decoding="async" data-nimg="1" className={CTA_PATTERN_BOTTOM} style={{ color: "transparent" }} src={PATTERN} />
          <div className="relative z-10 flex w-full max-w-[760px] flex-col items-center gap-6">
            <h2 className="text-display-2 md:text-display-2-lg max-w-[760px] text-balance text-aisc-sand">{title}</h2>
            <p className="text-body md:text-body-lg max-w-[760px] text-aisc-sand">{body}</p>
            <div className={actionsClassName}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
