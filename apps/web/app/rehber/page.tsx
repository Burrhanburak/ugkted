import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { ContentMdxCardGrid } from "@/components/content-mdx-card-grid";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { listRehberMdxMeta } from "@/lib/mdx";
import { PageSectionHero } from "@/components/page-section-hero";
import { ArrowUpRight, BookOpen, GitCompareArrows } from "lucide-react";

export const metadata: Metadata = {
  title: "Rehber",
  description:
    "Dernekler, STK'lar, yönetişim ve güvenilir kuruluş seçimi hakkında bilgilendirici rehber yazılar. Okuma süresi olan, blog tarzı içerikler.",
};

const blogDernekYazilari = [
  {
    href: "/blog/dernek-nasil-kurulur-gerekli-sartlar-2026",
    title: "Dernek nasıl kurulur — gerekli şartlar (2026)",
  },
  {
    href: "/blog/dernek-ile-vakif-karsilastirma",
    title: "Dernek ile vakıf karşılaştırması",
  },
  {
    href: "/blog/yardim-kuruluslari-guvenilirlik-ve-secim-rehberi",
    title: "Yardım kuruluşlarını değerlendirme rehberi",
  },
  {
    href: "/blog/basarili-dernek-yonetiminde-temel-ilkeler",
    title: "Başarılı dernek yönetiminde temel ilkeler",
  },
] as const;

export default function RehberPage() {
  const guides = listRehberMdxMeta();

  return (
    <ContentLayoutShell>
      <section className="w-full py-24 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Rehber" },
            ]}
          />
          <BackNavLink href="/">Anasayfaya dön</BackNavLink>

          <PageSectionHero
            imageSrc="cdn/pages/rehber-hero.webp"
            alt="STK ve dernek rehber yazıları — okuma ve belge ortamı"
            className="mt-8"
          />

          <div className="mb-10 md:mb-14">
            <h1 className="mb-4 w-full text-4xl font-medium tracking-tight text-primary md:mb-5 md:text-5xl lg:text-6xl">
              Rehber
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Burada <strong className="font-medium text-foreground">dernek nedir</strong>, STK kavramı, yönetişim,
              yardım kuruluşlarını değerlendirme gibi konularda <strong className="font-medium text-foreground">uzun
              form rehber yazıları</strong> yayınlıyoruz — tıpkı blog okuması gibi, arama motorlarında sık görülen sorulara
              tarafsız çerçeve sunmak için. Metinler hukuki tavsiye değildir; işlem öncesi resmi kaynak ve gerekiyorsa uzman
              görüşü esas alın.
            </p>
          </div>

          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Rehber yazıları
          </h2>
          <ContentMdxCardGrid
            items={guides}
            hrefPrefix="/rehber"
            categoryFallback="Rehber"
            emptyMessage="Yakında yeni rehber yazıları eklenecek."
          />

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:gap-14">
            <div className="rounded-xl border border-border/60 bg-muted/20 px-5 py-6 md:px-7 md:py-8">
              <h2 className="text-lg font-semibold text-foreground md:text-xl">Blog&apos;da dernek ve STK yazıları</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Aynı temada daha önce yayınlanmış makaleler; rehber ile birlikte okunabilir.
              </p>
              <ul className="mt-5 space-y-3 text-sm md:text-base">
                {blogDernekYazilari.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 font-medium text-primary underline underline-offset-4 hover:text-primary/90"
                    >
                      {item.title}
                      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                Tüm yazılar:{" "}
                <Link href="/blog" className="font-medium text-primary underline underline-offset-4">
                  Blog
                </Link>
                .
              </p>
            </div>

            <div className="rounded-xl border border-border/60 bg-muted/20 px-5 py-6 md:px-7 md:py-8">
              <h2 className="text-lg font-semibold text-foreground md:text-xl">UGKTED hizmet seçimi</h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Dernek rehberlerinden sonra ihtiyacınız bizim hizmet alanlarındaysa kısa yollar:
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  <Link
                    href="/rehber/hizmet-secimi"
                    className="group flex items-start gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    <BookOpen className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span>
                      <span className="font-medium text-foreground group-hover:text-primary">Hizmet seçimi rehberi</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        Hedef ve çıktıya göre doğru hizmet başlığına yönelme.
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/compare"
                    className="group flex items-start gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    <GitCompareArrows className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span>
                      <span className="font-medium text-foreground group-hover:text-primary">Hizmetleri karşılaştır</span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        Tabloda tüm hizmet alanlarını yan yana görün.
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm font-medium text-primary underline underline-offset-4">
                    UGKTED hakkında (kurumsal)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </ContentLayoutShell>
  );
}
