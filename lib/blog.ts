import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  topic: string;
};

export type Heading = { id: string; text: string };

export type Post = PostMeta & { html: string; headings: Heading[] };

/** Matches the anchor style of the source site: apostrophes vanish rather than
    becoming separators, so "Here's What" → "heres-what". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['‘’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CLASS = {
  h3: "text-display-3 md:text-display-3-lg mt-12 mb-4 scroll-mt-32 break-words lg:max-w-[760px] xl:max-w-[820px]",
  p: "text-body md:text-body-lg text-aisc-ink mb-6 whitespace-pre-line [overflow-wrap:anywhere]",
  a: "decoration-aisc-forest break-words underline underline-offset-[3px] transition-colors hover:text-aisc-forest",
  figure: "my-10 select-none lg:max-w-[760px] xl:max-w-[820px]",
  img: "pointer-events-none h-auto w-full select-none",
  ul: "text-body md:text-body-lg text-aisc-ink mb-6 flex list-disc flex-col gap-2 pl-6",
  ol: "text-body md:text-body-lg text-aisc-ink mb-6 flex list-decimal flex-col gap-2 pl-6",
  blockquote: "border-aisc-forest text-body md:text-body-lg text-aisc-ink mb-6 border-l-2 pl-5 italic",
};

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function createMarked() {
  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading(token: Tokens.Heading) {
        const text = this.parser.parseInline(token.tokens);
        const plain = text.replace(/<[^>]+>/g, "");
        /* every heading in these posts is a section head, which the design
           renders at display-3 regardless of markdown level */
        return `<h3 id="${escapeAttr(slugify(plain))}" class="${CLASS.h3}">${text}</h3>`;
      },
      paragraph(token: Tokens.Paragraph) {
        const inner = this.parser.parseInline(token.tokens);
        /* a paragraph that is nothing but an image becomes a figure, the way
           the CMS emits standalone images */
        if (/^<img [^>]*\/?>$/.test(inner.trim())) {
          return `<figure class="${CLASS.figure}">${inner.trim()}</figure>`;
        }
        return `<p class="${CLASS.p}">${inner}</p>`;
      },
      link(token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens);
        const external = /^https?:\/\//.test(token.href);
        const rel = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${escapeAttr(token.href)}"${rel} class="${CLASS.a}">${text}</a>`;
      },
      image(token: Tokens.Image) {
        return `<img alt="${escapeAttr(token.text)}" draggable="false" loading="lazy" decoding="async" class="${CLASS.img}" src="${escapeAttr(token.href)}" />`;
      },
      strong(token: Tokens.Strong) {
        return `<strong class="font-medium">${this.parser.parseInline(token.tokens)}</strong>`;
      },
      list(token: Tokens.List) {
        const tag = token.ordered ? "ol" : "ul";
        /* list items come back wrapped in the paragraph shell; strip it so the
           bullets sit tight */
        const items = token.items
          .map((item) => `<li>${this.parser.parse(item.tokens).replace(/<p class="[^"]*">|<\/p>/g, "")}</li>`)
          .join("");
        return `<${tag} class="${token.ordered ? CLASS.ol : CLASS.ul}">${items}</${tag}>`;
      },
      blockquote(token: Tokens.Blockquote) {
        return `<blockquote class="${CLASS.blockquote}">${this.parser.parse(token.tokens)}</blockquote>`;
      },
    },
  });

  return marked;
}

function read(slug: string) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { data: data as Omit<PostMeta, "slug">, content };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Newest first, which is the order the index renders in. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => ({ slug, ...read(slug).data }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post {
  const { data, content } = read(slug);
  const headings = [...content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => {
    const text = m[1].trim().replace(/\*\*/g, "");
    return { id: slugify(text), text };
  });
  return {
    slug,
    ...data,
    headings,
    html: createMarked().parse(content, { async: false }) as string,
  };
}

export function getTopics(posts: PostMeta[]): string[] {
  return [...new Set(posts.map((p) => p.topic).filter(Boolean))].sort();
}
