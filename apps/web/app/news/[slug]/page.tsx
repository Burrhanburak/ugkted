import type { Metadata } from "next";
import Image from "next/image";
import { CdnImage } from "@/components/cdn-image";
import { notFound } from "next/navigation";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { MdxBody } from "@/components/mdx-body";
import { CircleCheck, Linkedin, Twitter, Facebook } from "lucide-react";
import { compileMdxFile, getMdxFrontmatter, listMdxHeadings, listNewsMdxMeta } from "@/lib/mdx";
import { absoluteMediaUrl, resolveMediaUrl } from "@/lib/cdn";
import { NewsToc } from "@/components/news-toc";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return listNewsMdxMeta().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getMdxFrontmatter(`news/${slug}`);
  if (!fm) return { title: "Haber" };
  return {
    title: fm.title ?? "Haber",
    description: fm.description ?? fm.excerpt,
    ...(fm.coverImage
      ? { openGraph: { images: [{ url: absoluteMediaUrl(fm.coverImage) }] } }
      : {}),
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const rel = `news/${slug}`;
  const compiled = await compileMdxFile(rel);
  if (!compiled) notFound();

  const fm = compiled.frontmatter;
  const headings = listMdxHeadings(rel);
  const outcomes = Array.isArray(fm.outcomes) ? fm.outcomes : [];
  const coverImage = resolveMediaUrl(fm.coverImage);
  const authorImage =
    fm.authorImage ??
    "/favicon.ico";
  const contentScrollId = "news-detail-scroll";

  return (
    <section className="py-32 w-full">
      <div className="container">
        <div className="mx-auto flex max-w-prose flex-col items-center justify-between gap-10 lg:max-w-none lg:flex-row">
          <div>
            <SiteBreadcrumb
              items={[
                { label: "Anasayfa", href: "/" },
                { label: "Haberler", href: "/news" },
                { label: fm.title ?? "Haber" },
              ]}
            />
            <BackNavLink href="/news">Haberlere dön</BackNavLink>
            <h1 className="mt-10 text-5xl font-semibold text-balance lg:text-7xl">
              {fm.title}
            </h1>
            <div className="mt-16">
              <p className="font-medium">Katkı ve röportaj:</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="relative flex size-16 shrink-0 overflow-hidden rounded-xl border">
                  <Image
                    src={authorImage}
                    alt={fm.authorName ?? "Yazar"}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </span>
                <div className="flex flex-col">
                  <p className="font-semibold">{fm.authorName ?? "UGKTED Editör"}</p>
                  <p className="text-muted-foreground">{fm.authorRole ?? "Editör"}</p>
                </div>
              </div>
            </div>
          </div>
          <CdnImage
            src={coverImage}
            alt={fm.title ?? "Kapak görseli"}
            width={860}
            height={524}
            className="max-h-[524px] w-full rounded-xl object-cover lg:w-auto"
          />
        </div>

        <div className="relative mt-20 flex flex-col items-start gap-x-6 gap-y-16 lg:flex-row">
          <aside className="mx-auto h-fit max-w-prose lg:sticky lg:top-10 lg:mx-0 lg:w-64 lg:max-w-none">
            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-1">
              <div className="col-span-2 lg:col-span-1">
                <h2 className="font-semibold">Overview</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {fm.overview ?? fm.description ?? fm.excerpt}
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Sector</h2>
                <p className="mt-1 text-sm text-muted-foreground">{fm.sector ?? "Genel"}</p>
              </div>
              <div>
                <h2 className="font-semibold">Team size</h2>
                <p className="mt-1 text-sm text-muted-foreground">{fm.teamSize ?? "1-10"}</p>
              </div>
              <div>
                <h2 className="font-semibold">Location</h2>
                <p className="mt-1 text-sm text-muted-foreground">{fm.location ?? "İstanbul, Türkiye"}</p>
              </div>
              <div>
                <h2 className="font-semibold">Established</h2>
                <p className="mt-1 text-sm text-muted-foreground">{fm.established ?? "2026"}</p>
              </div>
              <div>
                <h2 className="font-semibold">Funding</h2>
                <p className="mt-1 text-sm text-muted-foreground">{fm.funding ?? "N/A"}</p>
              </div>
              <div>
                <h2 className="font-semibold">Core features</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {fm.coreFeatures ?? "İçerik · Topluluk · Etkinlik"}
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-col">
              <span className="mb-2 text-sm text-muted-foreground">İçeriği paylaş:</span>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
                  <Linkedin className="size-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                  <Twitter className="size-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                  <Facebook className="size-5" />
                </a>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1">
            <div
              id={contentScrollId}
              className="w-full max-w-prose lg:max-h-[calc(100vh-5rem)] lg:max-w-4xl lg:overflow-y-auto lg:px-20 lg:pr-10 lg:[scrollbar-width:none] lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden"
            >
              {(fm.problem || fm.approach || outcomes.length > 0) && (
                <div className="grid gap-x-10 gap-y-7 rounded-3xl border p-6 lg:grid-cols-2 lg:gap-y-10 lg:border-none lg:p-0">
                  {fm.problem ? (
                    <div>
                      <h2 className="text-xl font-semibold">Problem</h2>
                      <p className="mt-3 text-muted-foreground">{fm.problem}</p>
                    </div>
                  ) : null}
                  {fm.problem && fm.approach ? (
                    <div role="none" className="bg-border h-px w-full lg:hidden" />
                  ) : null}
                  {fm.approach ? (
                    <div>
                      <h2 className="text-xl font-semibold">Approach</h2>
                      <p className="mt-3 text-muted-foreground">{fm.approach}</p>
                    </div>
                  ) : null}
                  {outcomes.length > 0 ? (
                    <div className="border-t pt-10 lg:col-span-2">
                      <h2 className="text-xl font-semibold">Outcomes</h2>
                      <ul className="mt-3 grid gap-x-10 gap-y-3 lg:grid-cols-2">
                        {outcomes.map((item) => (
                          <li key={item} className="flex gap-3">
                            <CircleCheck className="mt-0.5 size-5 shrink-0" />
                            <p className="font-semibold">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}

              <div className="mt-20">
                <MdxBody slug={rel} className="prose mb-8 dark:prose-invert max-w-none" />
              </div>
            </div>

            <NewsToc headings={headings} scrollContainerId={contentScrollId} />
          </div>
        </div>
      </div>
    </section>
  );
}
