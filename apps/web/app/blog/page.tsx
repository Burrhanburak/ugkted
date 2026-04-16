import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { ContentMdxCardGrid } from "@/components/content-mdx-card-grid";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { PageSectionHero } from "@/components/page-section-hero";
import { listBlogMdxMeta } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "UGKTED blog yazıları",
};

export default function BlogListPage() {
  const posts = listBlogMdxMeta();
  return (
    <ContentLayoutShell>
      <section className="w-full py-24 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Blog" },
            ]}
          />

          <PageSectionHero
            imageSrc="cdn/pages/blog-hero.webp"
            alt="UGKTED blog — rehber yazılar ve not defteri"
          />

          <div className="mb-8 md:mb-14 lg:mb-16">
            <h1 className="mb-4 w-full text-4xl font-medium tracking-tight text-primary md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
              Blog
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Dernek kuruluşu, yönetişim, yardım kuruluşlarını değerlendirme ve UGKTED alanlarında rehber yazılar.
            </p>
          </div>

          <ContentMdxCardGrid items={posts} hrefPrefix="/blog" categoryFallback="Blog" />

          <p className="mt-14 rounded-2xl border border-border/60 bg-primary/5 px-5 py-4 text-sm text-muted-foreground">
            Duyuru ve haberler için{" "}
            <Link href="/news" className="font-medium text-primary underline underline-offset-4">
              haberler
            </Link>{" "}
            sayfasına da göz atabilirsiniz.
          </p>
        </div>
      </section>
    </ContentLayoutShell>
  );
}
