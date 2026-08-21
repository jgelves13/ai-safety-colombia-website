"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";

const ALL = "__all_topics__";

export default function BlogIndex({ posts, topics }: { posts: PostMeta[]; topics: string[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState(ALL);
  const [open, setOpen] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (topic !== ALL && post.topic !== topic) return false;
      if (!q) return true;
      return `${post.title} ${post.description} ${post.topic}`.toLowerCase().includes(q);
    });
  }, [posts, query, topic]);

  return (
    <section id="blog-list">
      <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 pt-14 pb-20 md:pt-16 md:pb-24">
        <div className="mb-10 md:mb-12">
          <div className="grid min-h-[58px] grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_280px]">
            <label className="border-aisc-forest flex h-[58px] min-h-[58px] min-w-0 items-center gap-3 rounded-[var(--radius)] border px-4 py-0">
              <span className="sr-only">Buscar en el blog</span>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className="remixicon size-5 shrink-0 text-aisc-ink">
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
              </svg>
              <input
                className="border-aisc-forest text-aisc-ink placeholder:text-aisc-ink/45 min-w-0 rounded-[var(--radius)] transition-colors focus:border-aisc-forest focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 text-body-sm h-full min-h-0 flex-1 border-0 bg-transparent px-0 py-0 shadow-none focus:border-0"
                type="text"
                role="searchbox"
                enterKeyHint="search"
                spellCheck={false}
                placeholder="Buscar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="relative min-w-0">
              <button
                type="button"
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-label="Filtrar por tema"
                onClick={() => setOpen((v) => !v)}
                onBlur={() => setTimeout(() => setOpen(false), 120)}
                className="text-body-sm text-aisc-ink focus-visible:ring-aisc-forest flex h-[58px] min-h-[58px] w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-[var(--radius)] px-4 py-0 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-60 data-[popup-open]:bg-aisc-cream border-aisc-forest bg-aisc-sand border"
              >
                <span className="min-w-0 max-w-full truncate whitespace-nowrap">{topic === ALL ? "Todos los temas" : topic}</span>
                <span aria-hidden="true">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" className={`remixicon size-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}>
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                  </svg>
                </span>
              </button>
              {open && (
                <ul role="listbox" className="border-aisc-forest absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-[var(--radius)] border bg-aisc-cream">
                  {[{ value: ALL, label: "Todos los temas" }, ...topics.map((t) => ({ value: t, label: t }))].map((option) => (
                    <li key={option.value}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={topic === option.value}
                        onMouseDown={() => {
                          setTopic(option.value);
                          setOpen(false);
                        }}
                        className={`text-body-sm block w-full px-4 py-3 text-left transition-colors hover:bg-aisc-sand ${topic === option.value ? "text-aisc-forest" : "text-aisc-ink"}`}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="border-aisc-forest divide-aisc-forest flex flex-col divide-y border-y">
          {visible.map((post) => (
            <article key={post.slug}>
              <Link className="group grid min-w-0 grid-cols-1 gap-4 py-6 transition-colors hover:bg-aisc-sand md:grid-cols-[120px_minmax(0,1fr)] md:gap-8 md:py-7 lg:grid-cols-[150px_minmax(0,1fr)]" href={`/actualidad/${post.slug}`}>
                <time dateTime={post.date} className="text-body-sm text-aisc-ink">{post.dateLabel}</time>
                <div className="flex min-w-0 flex-col gap-2">
                  <h2 className="text-display-4 md:text-display-4-lg group-hover:text-aisc-forest break-words transition-colors">{post.title}</h2>
                  <p className="text-body-sm font-serif text-aisc-ink">{post.topic}</p>
                  <span className="text-body md:text-body-lg font-serif font-medium text-aisc-forest transition-colors group-hover:text-aisc-forest-deep">Leer</span>
                </div>
              </Link>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="text-body md:text-body-lg text-aisc-ink py-10">No hay entradas que coincidan con esa búsqueda.</p>
          )}
        </div>
      </div>
    </section>
  );
}
