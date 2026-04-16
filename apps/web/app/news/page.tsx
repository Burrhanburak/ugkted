import { Metadata } from "next";
import Link from "next/link";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { ContentMdxCardGrid } from "@/components/content-mdx-card-grid";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { PageSectionHero } from "@/components/page-section-hero";
import { listNewsMdxMeta } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Haberler",
  description: "UGKTED haberleri.",
};

export default function NewsPage() {
  const items = listNewsMdxMeta();

  return (
    <ContentLayoutShell>
      <section className="w-full py-24 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Haberler" },
            ]}
          />

          <PageSectionHero
            imageSrc="cdn/pages/news-hero.webp"
            alt="UGKTED haberler — duyuru ve basın odası"
          />

          <div className="mb-8 md:mb-14 lg:mb-16">
            <h1 className="mb-4 w-full text-4xl font-medium tracking-tight text-primary md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
              Haberler
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Duyurular ve kısa haberler. İçerikler{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground">
                content/mdx/news/
              </code>{" "}
              altındaki MDX dosyalarından gelir.
            </p>
          </div>

          <ContentMdxCardGrid
            items={items}
            hrefPrefix="/news"
            categoryFallback="Haber"
            emptyMessage="Henüz haber eklenmedi."
          />

          <p className="mt-14 text-center text-sm text-muted-foreground">
            Uzun form rehber yazılar için{" "}
            <Link href="/blog" className="font-medium text-primary underline underline-offset-4">
              blog
            </Link>
            .
          </p>
        </div>
      </section>
    </ContentLayoutShell>
  );
}
