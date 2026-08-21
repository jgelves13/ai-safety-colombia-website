import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleToc from "./article-toc";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { HERO_SECTION, PAGE_SHELL } from "@/components/ui";
import { getPost, getPostSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/actualidad/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const post = getPost(slug);
  return { title: `${post.title} | AI Safety Colombia`, description: post.description };
}

export default async function BlogPost({ params }: PageProps<"/actualidad/[slug]">) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();
  const post = getPost(slug);

  return (
    <main className={PAGE_SHELL}>
      <section className={HERO_SECTION}>
        <SiteHeader active="/actualidad" />
        <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 relative z-10 flex min-h-[380px] flex-col justify-end pt-28 pb-12 md:min-h-[430px] md:pt-32 md:pb-16">
          {/* the title runs the full column; only the standfirst is measured */}
          <div className="flex w-full flex-col gap-5">
            <h1 className="text-display-1 md:text-display-1-lg text-aisc-sand break-words">{post.title}</h1>
            <p className="text-body md:text-body-lg max-w-[660px] text-aisc-sand">{post.description}</p>
            <p className="text-meta md:text-meta-lg text-aisc-sand">{post.dateLabel}</p>
          </div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-[1448px] px-8 md:px-16 grid grid-cols-1 gap-8 py-12 md:gap-10 md:py-14 lg:grid-cols-[220px_minmax(0,760px)_280px] lg:items-start lg:gap-12 lg:py-16 xl:grid-cols-[240px_minmax(0,820px)_300px]">
        <ArticleToc headings={post.headings} />
        <div className="min-w-0 lg:col-span-2 lg:col-start-2">
          <div className="min-w-0 lg:max-w-[760px] xl:max-w-[820px]" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
