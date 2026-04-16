import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "@repo/ui/components/ui/separator";
import { Button } from "@repo/ui/components/ui/button";
import { listServicesMdxMeta } from "@/lib/mdx";
import { ServicesFaqSection } from "@/components/services-faq-section";
import { servicesIndexFaq } from "@/lib/services-faq";
import { PageSectionHero } from "@/components/page-section-hero";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "UGKTED eğitim, kültür, girişimcilik ve uluslararası iş birliği alanlarında sunduğu hizmetler.",
};

/** Kurumsal özet blokları — stok fotoğraf veya uydurma kişi adı kullanılmaz. */
const highlightBlocks = [
  {
    lead:
      "Programlarımızda hedef; katılımcıların fikrini netleştirmek, paydaşları aynı masada buluşturmak ve uygulanabilir bir sonraki adımı yazılı hale getirmektir.",
    caption: "Girişimcilik ve proje danışmanlığı",
    sideStats: [
      { value: "5", label: "Hizmet alanı", hint: "Detay sayfaları ve karşılaştırma tablosu" },
      { value: "Hibrit", label: "Format", hint: "Çevrim içi ve yüz yüze oturumlar" },
    ],
  },
  {
    lead:
      "Kültür, turizm ve yerel kalkınma başlıklarında etkinlik ve iş birliği süreçlerinde şeffaf iletişim ve ölçülebilir çıktılar önceliklendirilir.",
    caption: "Kültür–sanat ve turizm programları",
    sideStats: [
      { value: "Açık", label: "Duyuru modeli", hint: "Etkinlik ve haber kanalları" },
      { value: "Paydaş", label: "Odak", hint: "STK, yerel yönetim, üyeler" },
    ],
  },
] as const;

const highlightImages = ["/cdn/services/program-visual-1.svg", "/cdn/services/program-visual-2.svg"] as const;

const milestones = [
  {
    org: "UGKTED",
    title: "Dernek faaliyetlerinin genişletilmesi",
    body: "Eğitim, kültür ve girişimcilik alanlarında yeni programlar ve ortaklıklar.",
    period: "2024 – devam",
  },
  {
    org: "UGKTED",
    title: "Uluslararası iş birlikleri",
    body: "Ortak etkinlikler, değişim ve ortak içerik üretimi.",
    period: "2022 – devam",
  },
  {
    org: "UGKTED",
    title: "Topluluk ve üyelik",
    body: "Gönüllü katılım, mentorluk ve yerel paydaş ağı.",
    period: "2020 – devam",
  },
] as const;

export default function ServicesPage() {
  const serviceDetails = listServicesMdxMeta();
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <section className="border-b border-border/60 py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Hizmetler" },
            ]}
          />
          <PageSectionHero
            imageSrc="cdn/pages/services-hero.webp"
            alt="UGKTED hizmetler — atölye ve iş birliği"
          />
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Hizmetlerimiz
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            UGKTED; eğitim, kültür, turizm ve girişimcilik alanlarında programlar düzenler, üyeleri ve
            paydaşları bir araya getirir, sürdürülebilir iş birlikleri kurar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/services/compare">
                Hizmetleri karşılaştır
                <ArrowUpRight className="ml-2 size-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/contact">Ön görüşme</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 text-center sm:gap-6">
            <p className="text-sm font-medium text-foreground sm:text-base">Üyeler ve paydaşlar</p>
            <h2 className="text-2xl font-medium tracking-tight text-balance sm:text-3xl md:text-4xl lg:text-5xl">
              Birlikte büyüyen topluluk
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              Geri bildirimler ve program sonu değerlendirmeleri doğrultusunda sürekli iyileştirme
              yapıyoruz. Görseller dernek için üretilmiş özet illüstrasyonlardır.
            </p>
          </div>

          <div className="mt-10 md:mt-20">
            {highlightBlocks.map((block, index) => (
              <div key={index} className="min-w-0">
                {index > 0 ? <Separator className="my-12 md:my-20" /> : null}
                <div className="grid min-w-0 gap-10 lg:grid-cols-3 lg:gap-12 xl:gap-20">
                  <div className="flex min-w-0 flex-col gap-8 border-border lg:col-span-2 lg:border-r lg:pr-8 xl:pr-20 md:flex-row md:gap-10">
                    <div className="mx-auto aspect-[4/5] w-full max-w-[220px] shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-muted/30 md:mx-0 md:aspect-[29/35] md:h-auto md:max-w-[200px] lg:max-w-[240px]">
                      <Image
                        src={highlightImages[index % highlightImages.length] ?? highlightImages[0]}
                        alt={`UGKTED ${block.caption} görsel özeti`}
                        width={480}
                        height={600}
                        className="h-full w-full object-contain p-4"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 md:gap-8">
                      <div className="min-w-0">
                        <p className="text-base leading-relaxed text-foreground sm:text-lg md:text-xl">
                          {block.lead}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-foreground sm:text-lg">UGKTED</p>
                          <p className="text-sm text-muted-foreground">{block.caption}</p>
                        </div>
                        <span className="inline-flex h-9 w-20 shrink-0 items-center justify-center self-start rounded-md border border-dashed border-border text-xs text-muted-foreground sm:self-auto">
                          Özet
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-8 sm:gap-6 lg:border-t-0 lg:pt-0">
                    {block.sideStats.map((s) => (
                      <div key={s.label} className="flex min-w-0 flex-col gap-1">
                        <p className="text-2xl font-medium tabular-nums text-foreground sm:text-3xl md:text-4xl">
                          {s.value}
                        </p>
                        <p className="text-sm font-semibold leading-snug text-foreground">{s.label}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{s.hint}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-border/60 py-12 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-16">
            <div className="top-24 h-fit space-y-5 py-0 lg:sticky lg:col-span-2 lg:space-y-6 lg:py-4">
              <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Deneyim
                <sup className="ml-1 align-top text-xs font-normal tracking-tight text-foreground/40 sm:text-sm">
                  kurumsal yolculuk
                </sup>
              </h2>
              <p className="text-sm text-foreground/60 leading-relaxed sm:text-base">
                Aşağıda özet kilometre taşları yer alır; güncel programlar için etkinlik ve haber
                sayfalarımızı takip edebilirsiniz.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  variant="secondary"
                  className="group h-12 w-full rounded-full pr-2 sm:w-auto"
                  asChild
                >
                  <Link href="/contact" className="justify-center sm:justify-start">
                    İletişime geç
                    <span className="ml-2 rounded-full bg-orange-500 p-2 text-white">
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:rotate-45"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-12 rounded-full" asChild>
                  <Link href="/services/compare">Karşılaştırma tablosu</Link>
                </Button>
              </div>
            </div>
            <ul className="relative min-w-0 lg:col-span-4">
              {milestones.map((m) => (
                <li
                  key={m.period}
                  className="flex flex-col gap-4 border-b border-border py-8 last:border-b-0 sm:gap-6 sm:py-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:py-12"
                >
                  <div className="min-w-0 flex-1 lg:max-w-[70%]">
                    <h3 className="mb-1 text-sm font-medium tracking-tight text-muted-foreground md:text-base">
                      {m.org}
                    </h3>
                    <h4 className="mb-2 text-xl font-semibold tracking-tight text-balance sm:text-2xl lg:text-3xl">
                      {m.title}
                    </h4>
                    <p className="text-sm text-foreground/60 leading-relaxed sm:text-base">{m.body}</p>
                  </div>
                  <div className="w-fit shrink-0 self-start rounded-full bg-muted px-3 py-1.5 text-xs tracking-tight sm:px-4 sm:text-sm lg:self-center">
                    {m.period}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-10 md:py-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          {serviceDetails.length > 0 ? (
            <div className="mb-8">
              <h3 className="text-lg font-semibold">Hizmet alanları</h3>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Aşağıdaki hizmet başlıklarının her biri için ayrı bir detay sayfası bulunur. Hızlı seçim için{" "}
                <Link href="/services/compare" className="font-medium text-primary underline underline-offset-4">
                  karşılaştırma tablosuna
                </Link>{" "}
                göz atabilirsiniz.
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {serviceDetails.map((item) => (
                  <li key={item.slug} className="rounded-lg border border-border/60 p-4 transition-colors hover:border-primary/40">
                    <Link href={`/services/${item.slug}`} className="group block">
                      <p className="font-medium text-foreground group-hover:text-primary">
                        {item.title ?? item.slug}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.excerpt ?? item.description}
                      </p>
                      <span className="mt-3 inline-flex text-sm font-medium text-primary">
                        Detayı görüntüle
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="flex flex-wrap items-center justify-start gap-4 text-sm sm:justify-end">
            <div className="flex flex-wrap gap-4">
              <Link href="/events" className="text-muted-foreground hover:text-foreground">
                Etkinlikler
              </Link>
              <Link href="/projects" className="text-muted-foreground hover:text-foreground">
                Projeler
              </Link>
              <Link href="/membership-application" className="text-muted-foreground hover:text-foreground">
                Üyelik başvurusu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-12 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <ServicesFaqSection items={servicesIndexFaq} />
        </div>
      </section>
    </div>
  );
}
