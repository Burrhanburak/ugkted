import type { Metadata } from "next";
import Link from "next/link";
import { CdnImage } from "@/components/cdn-image";
import { notFound } from "next/navigation";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { MdxBody } from "@/components/mdx-body";
import { NewsToc } from "@/components/news-toc";
import { ServicesFaqSection } from "@/components/services-faq-section";
import { compileMdxFile, getMdxFrontmatter, listMdxHeadings, listServicesMdxMeta } from "@/lib/mdx";
import { resolveMediaUrl } from "@/lib/cdn";
import { serviceDetailFaqBySlug } from "@/lib/services-faq";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return listServicesMdxMeta().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fm = getMdxFrontmatter(`services/${slug}`);
  if (!fm) return { title: "Hizmet detayı" };
  return {
    title: fm.title ?? "Hizmet detayı",
    description: fm.excerpt ?? fm.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const rel = `services/${slug}`;
  const compiled = await compileMdxFile(rel);
  if (!compiled) notFound();
  const fm = compiled.frontmatter;
  const headings = listMdxHeadings(rel);
  const faqItems = serviceDetailFaqBySlug[slug] ?? [];

  return (
    <section className="py-24 w-full">
      <div className="container">
        <SiteBreadcrumb
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hizmetler", href: "/services" },
            { label: fm.title ?? "Detay" },
          ]}
        />
        <BackNavLink href="/services">Hizmetlere dön</BackNavLink>
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href="/services/compare" className="font-medium text-primary underline underline-offset-4">
            Tüm hizmetleri tabloda karşılaştır
          </Link>
        </p>
        <h1 className="mt-6 text-4xl font-bold md:text-6xl">{fm.title}</h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">{fm.excerpt ?? fm.description}</p>
        <div className="relative mt-10 grid max-w-7xl gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <CdnImage
              src={resolveMediaUrl(fm.coverImage)}
              alt={fm.title ?? "Service cover"}
              width={1280}
              height={720}
              className="mb-8 aspect-video w-full rounded-lg border object-cover"
            />
            <MdxBody slug={rel} className="prose mb-8 max-w-none dark:prose-invert" />
          </div>
          <div className="lg:col-span-4">
            <NewsToc headings={headings} title="İçerik" />
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl border-t border-border/60 pt-12">
          <ServicesFaqSection items={faqItems} />
        </div>
      </div>
    </section>
  );
}
