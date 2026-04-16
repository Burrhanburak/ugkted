import type { Metadata } from "next";
import { CdnImage } from "@/components/cdn-image";
import { notFound } from "next/navigation";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { MdxBody } from "@/components/mdx-body";
import { listEventsMdxMeta, listMdxHeadings, compileMdxFile, getMdxFrontmatter } from "@/lib/mdx";
import { NewsToc } from "@/components/news-toc";
import { resolveMediaUrl } from "@/lib/cdn";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return listEventsMdxMeta().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getMdxFrontmatter(`events/${slug}`);
  if (!fm) return { title: "Etkinlik" };
  return {
    title: fm.title ?? "Etkinlik",
    description: fm.excerpt ?? fm.description,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const rel = `events/${slug}`;
  const compiled = await compileMdxFile(rel);
  if (!compiled) notFound();
  const fm = compiled.frontmatter;
  const headings = listMdxHeadings(rel);

  return (
    <section className="py-24 w-full">
      <div className="container">
        <SiteBreadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Etkinlikler", href: "/events" },
            { label: fm.title ?? "Detay" },
          ]}
        />
        <BackNavLink href="/events">Etkinliklere dön</BackNavLink>
        <h1 className="mt-8 text-4xl font-bold md:text-6xl">{fm.title}</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">{fm.excerpt ?? fm.description}</p>
        <div className="mt-10 grid max-w-7xl gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CdnImage
              src={resolveMediaUrl(fm.coverImage)}
              alt={fm.title ?? "Event cover"}
              width={1280}
              height={720}
              className="mb-8 aspect-video w-full rounded-lg border object-cover"
            />
            <MdxBody slug={rel} className="prose mb-8 max-w-none dark:prose-invert" />
          </div>
          <div className="lg:col-span-4">
            <NewsToc headings={headings} title="Agenda" />
          </div>
        </div>
      </div>
    </section>
  );
}

