import type { Metadata } from "next";
import Link from "next/link";
import EventsCarousel from "@repo/ui/components/web/Event";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { ContentMdxCardGrid } from "@/components/content-mdx-card-grid";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { CalendarDays, Mail, Users } from "lucide-react";
import { listEventsMdxMeta } from "@/lib/mdx";
import { PageSectionHero } from "@/components/page-section-hero";

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "UGKTED girişimcilik, kültür, turizm ve eğitim alanında düzenlediği etkinlikler, atölyeler ve buluşmalar.",
};

export default function EventsPage() {
  const eventPosts = listEventsMdxMeta();

  return (
    <ContentLayoutShell>
      <div className="w-full">
        <section className="w-full py-24 md:py-28 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SiteBreadcrumb
              className="mb-8"
              items={[
                { label: "Anasayfa", href: "/" },
                { label: "Etkinlikler" },
              ]}
            />

            <PageSectionHero
              imageSrc="cdn/pages/events-hero.webp"
              alt="UGKTED etkinlik ve konferans ortamı"
            />

            <div className="mb-8 md:mb-14 lg:mb-16">
              <h1 className="mb-4 w-full text-4xl font-medium tracking-tight text-primary md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                Etkinliklerimiz
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Girişimcilik, kültür, turizm ve eğitim alanlarında zirveler, atölyeler ve networking buluşmaları dahil
                ulusal ve uluslararası programlar düzenliyoruz. Aşağıda program sayfaları ve öne çıkan hatlar yer
                alır; kayıt ve koşullar için{" "}
                <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
                  iletişim
                </Link>{" "}
                üzerinden bize ulaşabilirsiniz.
              </p>
            </div>

            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Program sayfaları</h2>
            <ContentMdxCardGrid items={eventPosts} hrefPrefix="/events" categoryFallback="Etkinlik" />
          </div>
        </section>

        <section className="border-t border-border/60 bg-muted/20 py-12 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Öne çıkanlar</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
              Kaydırılabilir özet — yaklaşan ve örnek etkinlik hatları.
            </p>
          </div>
          <EventsCarousel embedInPage />
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Katılım ve iş birliği</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
              Etkinlik önerisi, konuşmacılık, sponsorluk veya kurumsal iş birliği için ekibimizle iletişime geçin. Program
              takvimi ve kontenjanlar duyuruldukça güncellenir.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex gap-3 rounded-xl border border-border/60 p-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">İletişim</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kayıt ve sorular için{" "}
                    <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
                      iletişim formu
                    </Link>
                    .
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-border/60 bg-card p-4">
                <Users className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">Üyelik</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <Link
                      href="/membership-application"
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      Üyelik başvurusu
                    </Link>{" "}
                    ile topluluğa katılın.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-border/60 p-4">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-medium text-foreground">Projeler</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Program hatları için{" "}
                    <Link href="/projects" className="font-medium text-primary underline underline-offset-4">
                      projeler
                    </Link>{" "}
                    sayfasına bakın.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ContentLayoutShell>
  );
}
