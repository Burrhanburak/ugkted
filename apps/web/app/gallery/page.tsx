import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { CdnImage } from "@/components/cdn-image";
import { GALLERY_IMAGE_ITEMS } from "@/lib/gallery-items";
import { PageSectionHero } from "@/components/page-section-hero";
import { resolveMediaUrl } from "@/lib/cdn";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "UGKTED faaliyet alanlarından seçilmiş görseller ve kurumsal iletişim örnekleri. Dekorasyon ve sunum ilhamı için galerimizi inceleyin.",
};

export default function GalleryPage() {
  return (
    <ContentLayoutShell>
      <section className="w-full py-24 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Galeri" },
            ]}
          />

          <PageSectionHero
            imageSrc="cdn/pages/gallery-hero.webp"
            alt="UGKTED galeri — çerçeveli fotoğraf sergisi"
          />

          <div className="mb-8 md:mb-14 lg:mb-16">
            <h1 className="mb-4 w-full text-4xl font-medium tracking-tight text-primary md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
              Galeri
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Kurumsal iletişim, rehber içerikler ve haber görsellerinden oluşan seçki. Temsili
              görseller; bazıları blog ve haber kapaklarıyla aynı kaynaktan türetilmiştir.
            </p>
          </div>

          <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
            {GALLERY_IMAGE_ITEMS.map((item) => (
              <div key={item.title} className="group flex flex-col">
                <div className="mb-4 flex overflow-hidden rounded-xl md:mb-5">
                  <div className="relative aspect-[3/2] w-full transition-opacity duration-300 group-hover:opacity-90">
                    <CdnImage
                      src={resolveMediaUrl(item.src)}
                      alt={item.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.category}
                </span>
                <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words text-foreground md:text-2xl lg:text-3xl">
                  {item.title}
                </div>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground md:text-base">{item.excerpt}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-muted-foreground">
            <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
              İletişim
            </Link>{" "}
            üzerinden iş birliği ve etkinlik görselleri için bize ulaşın.
          </p>
        </div>
      </section>
    </ContentLayoutShell>
  );
}
