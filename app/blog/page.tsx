import type { Metadata } from "next";
import BlogIndex from "./blog-index";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { getAllPosts, getTopics } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | AI Safety Colombia",
  description:
    "Escritos sobre gobernanza de la inteligencia artificial y el trabajo práctico de construir instituciones capaces de cooperar entre regiones.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img alt="" aria-hidden="true" loading="lazy" width="1697" height="1415" decoding="async" data-nimg="1" className={HERO_CORNER_CLASS} style={{ color: "transparent" }} src="/sash/patterns/sash-corner-pattern.svg" />
        <SiteHeader active="/blog" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[650px] flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-sash-frost">Blog</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-sash-frost">Writing from SASH on AI governance, Singapore&#39;s role in the field, and the practical work of building institutions that can cooperate across regions.</p>
          </div>
        </div>
      </section>
      <BlogIndex posts={posts} topics={getTopics(posts)} />
      <SiteFooter />
    </main>
  );
}
