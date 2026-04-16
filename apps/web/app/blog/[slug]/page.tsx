import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { CdnImage } from "@/components/cdn-image";
import { MdxBody } from "@/components/mdx-body";
import { NewsToc } from "@/components/news-toc";
import { compileMdxFile, getMdxFrontmatter, listBlogMdxMeta, listMdxHeadings } from "@/lib/mdx";
import { absoluteMediaUrl, resolveMediaUrl } from "@/lib/cdn";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugkted.org";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getMdxFrontmatter(`blog/${slug}`);
  if (!post) return { title: "Blog" };
  const url = `${siteUrl}/blog/${slug}`;
  return {
    title: post.title ?? "Blog",
    description: post.excerpt ?? post.description,
    openGraph: {
      title: `${post.title ?? "Blog"} | UGKTED`,
      description: post.excerpt ?? post.description,
      type: "article",
      url,
      ...(post.coverImage
        ? { images: [{ url: absoluteMediaUrl(post.coverImage) }] }
        : {}),
    },
  };
}

export async function generateStaticParams() {
  return listBlogMdxMeta().map((e) => ({ slug: e.slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const rel = `blog/${slug}`;
    const compiled = await compileMdxFile(rel);
    if (!compiled) notFound();
    const headings = listMdxHeadings(rel);
    const fm = compiled.frontmatter;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: fm.title,
      description: fm.excerpt ?? fm.description,
      ...(fm.coverImage ? { image: absoluteMediaUrl(fm.coverImage) } : {}),
      url: `${siteUrl}/blog/${slug}`,
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
        <section className="py-32 w-full">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <div className="container">
                <SiteBreadcrumb
                  items={[
                    { label: "Anasayfa", href: "/" },
                    { label: "Blog", href: "/blog" },
                    { label: fm.title ?? "Yazı" },
                  ]}
                />
                <BackNavLink href="/blog">Blog&apos;a dön</BackNavLink>
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
                    <Badge variant="secondary" className="rounded-4xl px-2 py-0.5">
                      {fm.sector ?? "Product Update"}
                    </Badge>
                    <h1 className="text-center text-3xl font-medium text-pretty lg:text-5xl">{fm.title}</h1>
                    <p className="text-center text-muted-foreground lg:text-lg">{fm.excerpt ?? fm.description}</p>
                    <div className="mt-6 flex items-center gap-4">
                      <span className="relative size-12 overflow-hidden rounded-full border">
                        <Image
                          src={fm.authorImage ?? "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"}
                          alt={fm.authorName ?? "Yazar"}
                          fill
                          className="object-cover"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{fm.authorName ?? "John Doe"}</p>
                        <p className="text-sm text-muted-foreground">
                          Updated on {fm.date ? new Date(fm.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : ""}
                        </p>
                      </div>
                    </div>
                </div>
                {fm.coverImage ? (
                  <CdnImage
                    src={resolveMediaUrl(fm.coverImage)}
                    alt={fm.title ?? "Blog kapak görseli"}
                    width={1200}
                    height={630}
                    className="mx-auto mt-12 aspect-[1200/630] max-h-[min(28rem,85vw)] w-full max-w-6xl rounded-xl border object-cover"
                    priority
                    sizes="(max-width: 1152px) 100vw, 1152px"
                  />
                ) : null}
                <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-4">
                  <NewsToc headings={headings} title="Content" />
                  <div className="lg:col-span-2">
                    <MdxBody slug={rel} className="prose mb-8 dark:prose-invert max-w-none" />
                  </div>
                  <div className="sticky top-8 prose hidden h-fit rounded-lg border p-6 lg:block dark:prose-invert">
                    <h5 className="text-xl font-semibold">Get Started with Our Solution</h5>
                    <ul className="my-6 text-sm [&>li]:pl-0">
                      <li>Save 40% time with task automation</li>
                      <li>Real-time team collaboration</li>
                      <li>Easy drag-and-drop workflows</li>
                    </ul>
                    <div className="flex flex-col gap-2">
                      <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">
                        Get started
                      </button>
                      <button className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium">
                        Learn more
                      </button>
                    </div>
                    <div className="mt-8">
                      <p className="font-medium text-muted-foreground">Share this article:</p>
                      <ul className="mt-2 flex gap-2">
                        <li><a href="#" className="inline-flex size-9 items-center justify-center rounded-full border bg-secondary"><Facebook className="h-4 w-4" /></a></li>
                        <li><a href="#" className="inline-flex size-9 items-center justify-center rounded-full border bg-secondary"><Linkedin className="h-4 w-4" /></a></li>
                        <li><a href="#" className="inline-flex size-9 items-center justify-center rounded-full border bg-secondary"><Twitter className="h-4 w-4" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>
        </section>
    );
}
