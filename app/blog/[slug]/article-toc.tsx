"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";

const LINK_BASE = "text-body-sm block break-words transition-[color,opacity] duration-200 pl-5";
const LINK_ON = "text-sash-graphite opacity-100";
const LINK_OFF = "text-sash-graphite/55 opacity-55 hover:text-sash-cobalt hover:opacity-100";

function List({ headings, active }: { headings: Heading[]; active: string }) {
  return (
    <ol className="flex flex-col gap-3">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={heading.id === active ? "location" : undefined}
            className={`${LINK_BASE} ${heading.id === active ? LINK_ON : LINK_OFF}`}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function ArticleToc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    /* pick the last heading whose top has passed the reading line, so the
       highlight tracks the section you are actually inside */
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.28;
      let current = headings[0].id;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el && el.getBoundingClientRect().top <= line) current = heading.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  return (
    <aside className="lg:col-start-1 lg:sticky lg:top-32">
      <div className="border-sash-cobalt border lg:max-h-[calc(100dvh-24rem)] lg:overflow-y-auto">
        <div className="lg:hidden">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="article-toc-mobile-list"
            onClick={() => setOpen((v) => !v)}
            className="hover:bg-white flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors"
          >
            <span className="text-display-3 md:text-display-3-lg">Contents</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" aria-hidden="true" className={`remixicon shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : "rotate-0"}`}>
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
            </svg>
          </button>
          <div id="article-toc-mobile-list" className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <nav aria-label="Article contents" className="px-5 pt-1 pb-5">
                <List headings={headings} active={active} />
              </nav>
            </div>
          </div>
        </div>
        <div className="hidden flex-col gap-6 p-5 lg:flex">
          <nav aria-label="Article contents" className="flex flex-col gap-3">
            <h2 className="text-display-3 md:text-display-3-lg">Contents</h2>
            <List headings={headings} active={active} />
          </nav>
        </div>
      </div>
    </aside>
  );
}
