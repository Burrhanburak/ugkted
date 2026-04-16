import type { Metadata } from "next";
import Image from "next/image";
import { CdnImage } from "@/components/cdn-image";
import { notFound } from "next/navigation";
import { Badge } from "@repo/ui/components/ui/badge";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { MdxBody } from "@/components/mdx-body";
import { NewsToc } from "@/components/news-toc";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import {
  compileMdxFile,
  getMdxFrontmatter,
  listMdxHeadings,
  listRehberMdxMeta,
} from "@/lib/mdx";
import { absoluteMediaUrl, resolveMediaUrl } from "@/lib/cdn";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugkted.org";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return listRehberMdxMeta().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getMdxFrontmatter(`rehber/${slug}`);
  if (!fm) return { title: "Rehber" };
  const url = `${siteUrl}/rehber/${slug}`;
  return {
    title: fm.title ?? "Rehber",
    description: fm.excerpt ?? fm.description,
    openGraph: {
      title: `${fm.title ?? "Rehber"} | UGKTED`,
      description: fm.excerpt ?? fm.description,
      type: "article",
      url,
      ...(fm.coverImage ? { images: [{ url: absoluteMediaUrl(fm.coverImage) }] } : {}),
    },
  };
}

export default async function RehberArticlePage({ params }: Props) {
  const { slug } = await params;
  const rel = `rehber/${slug}`;
  const compiled = await compileMdxFile(rel);
  if (!compiled) notFound();

  const fm = compiled.frontmatter;
  const headings = listMdxHeadings(rel);
  const authorImage =
    fm.authorImage ??
    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.excerpt ?? fm.description,
    ...(fm.coverImage ? { image: absoluteMediaUrl(fm.coverImage) } : {}),
    url: `${siteUrl}/rehber/${slug}`,
    author: {
      "@type": "Person",
      name: fm.authorName ?? "UGKTED",
      jobTitle: fm.authorRole ?? "Editör",
    },
    publisher: {
      "@type": "Organization",
      name: "UGKTED",
      url: siteUrl,
    },
  };

  return (
    <ContentLayoutShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="w-full py-24 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Rehber", href: "/rehber" },
              { label: fm.title ?? "Yazı" },
            ]}
          />
          <BackNavLink href="/rehber">Rehbere dön</BackNavLink>

          <header className="mx-auto mt-8 max-w-3xl text-center lg:mt-10">
            <Badge variant="secondary" className="rounded-full px-3 py-0.5">
              {fm.sector ?? "Rehber"}
            </Badge>
            <h1 className="mt-4 text-balance text-3xl font-medium tracking-tight text-primary md:text-4xl lg:text-5xl">
              {fm.title}
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">{fm.excerpt ?? fm.description}</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="relative size-12 overflow-hidden rounded-full border">
                <Image
                  src={authorImage}
                  alt={fm.authorName ?? "Yazar"}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </span>
              <div className="text-left">
                <p className="text-sm font-medium">{fm.authorName ?? "UGKTED"}</p>
                <p className="text-xs text-muted-foreground">
                  {fm.date
                    ? new Date(fm.date).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </div>
          </header>

          {fm.coverImage ? (
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-border/60">
              <CdnImage
                alt={fm.title ?? "Kapak"}
                src={resolveMediaUrl(fm.coverImage)}
                width={1200}
                height={630}
                className="aspect-[1200/630] w-full object-cover"
              />
            </div>
          ) : null}

          <div
            className={`relative mx-auto mt-14 grid max-w-6xl gap-10 ${
              headings.length > 0 ? "lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12" : ""
            }`}
          >
            {headings.length > 0 ? (
              <aside className="lg:sticky lg:top-24 lg:self-start">
                <NewsToc headings={headings} title="İçindekiler" />
              </aside>
            ) : null}
            <div className={headings.length > 0 ? "min-w-0" : "mx-auto max-w-3xl"}>
              <MdxBody slug={rel} className="prose prose-neutral max-w-none dark:prose-invert" />
            </div>
          </div>
        </div>
      </article>
    </ContentLayoutShell>
  );
}
