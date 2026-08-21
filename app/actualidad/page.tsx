import type { Metadata } from "next";
import BlogIndex from "./blog-index";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_CORNER_CLASS, HERO_INNER, HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { getAllPosts, getTopics } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Actualidad | AI Safety Colombia",
  description:
    "Lo que escribimos sobre seguridad de la inteligencia artificial, y lo que va saliendo de nuestros programas y eventos en Colombia.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <img alt="" aria-hidden="true" loading="lazy" width="1697" height="1415" decoding="async" data-nimg="1" className={HERO_CORNER_CLASS} style={{ color: "transparent" }} src="/aisc/patterns/aisc-corner-lattice.svg" />
        <SiteHeader active="/actualidad" />
        <div className={HERO_INNER}>
          <div className="flex max-w-[650px] flex-col gap-5">
            <span className="text-kicker text-aisc-sand/70">Lo que escribimos</span>
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand">Actualidad</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand/90">Notas de nuestros programas, resúmenes de lo que hacemos y lecturas del campo desde acá. Escribimos poco y solo cuando hay algo que contar.</p>
          </div>
        </div>
      </section>
      <BlogIndex posts={posts} topics={getTopics(posts)} />
      <SiteFooter />
    </main>
  );
}
