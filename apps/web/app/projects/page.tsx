import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description:
    "UGKTED girişimcilik, kültür, turizm ve eğitim alanlarında yürüttüğü projeler ve iş birlikleri.",
};

const projects = [
  {
    title: "Genç Girişimci Buluşmaları",
    summary:
      "Yerel ve uluslararası mentörlerle atölye ve networking oturumları; fikir geliştirme ve sunum becerileri.",
    href: "/events",
    category: "Girişimcilik",
  },
  {
    title: "Kültür ve Miras Programları",
    summary:
      "Bölgesel kültürel değerlerin tanıtımı, ortak üretim ve paylaşım odaklı içerikler.",
    href: "/blog",
    category: "Kültür",
  },
  {
    title: "Eğitim ve Kapasite Geliştirme",
    summary:
      "STK ve gönüllüler için temel yönetişim, iletişim ve proje döngüsü eğitimleri.",
    href: "/services",
    category: "Eğitim",
  },
] as const;

export default function ProjectsPage() {
  return (
    <ContentLayoutShell>
      <section className="w-full py-24 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Kurumsal", href: "/about" },
              { label: "Projelerimiz" },
            ]}
          />

          <div className="mb-8 md:mb-14 lg:mb-16">
            <h1 className="mb-4 w-full text-4xl font-medium tracking-tight text-primary md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
              Projelerimiz
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              UGKTED; sürdürülebilir iş birlikleri, şeffaf yönetişim ve ölçülebilir çıktılar üretmeyi hedefler. Öne
              çıkan program hatları aşağıdadır; etkinlik ve duyurular için{" "}
              <Link href="/events" className="font-medium text-primary underline underline-offset-4">
                etkinlikler
              </Link>{" "}
              sayfasını takip edebilirsiniz.
            </p>
          </div>

          <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
            {projects.map((p) => (
              <Link key={p.title} href={p.href} className="group flex flex-col rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2">
                <div className="mb-4 flex overflow-hidden rounded-xl md:mb-5">
                  <div className="relative aspect-[3/2] w-full bg-gradient-to-br from-primary/15 via-primary/5 to-muted transition-opacity duration-300 group-hover:opacity-90" />
                </div>
                <Badge variant="secondary" className="w-fit rounded-full px-2 py-0.5 text-xs font-medium">
                  {p.category}
                </Badge>
                <div className="mb-2 line-clamp-2 pt-4 text-lg font-medium text-foreground md:text-2xl lg:text-3xl group-hover:text-primary transition-colors">
                  {p.title}
                </div>
                <p className="mb-4 line-clamp-3 text-sm text-muted-foreground md:text-base">{p.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                  İlgili içerik
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ContentLayoutShell>
  );
}
