import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  CircleArrowRight,
  Files,
  Globe2,
  Users,
} from "lucide-react";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugkted.org";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "UGKTED — Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği: misyonumuz, vizyonumuz ve topluluk odaklı çalışmalarımız.",
  keywords: [
    "UGKTED",
    "girişimcilik derneği",
    "kültür turizm eğitim",
    "sivil toplum kuruluşu",
    "Türkiye",
  ],
  openGraph: {
    title: "Hakkımızda | UGKTED",
    description:
      "Girişimcilik, kültür, turizm ve eğitim alanlarında uluslararası iş birlikleri geliştiren bir sivil toplum kuruluşuyuz.",
    url: `${siteUrl}/about`,
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | UGKTED",
    description:
      "UGKTED ile Türkiye’den dünyaya uzanan girişimcilik ve kültürel iş birliği ekosistemini keşfedin.",
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Hakkımızda — UGKTED",
  url: `${siteUrl}/about`,
  description:
    "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED) hakkında kurumsal bilgiler.",
  mainEntity: {
    "@type": "Organization",
    name: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
    url: siteUrl,
    description:
      "Türkiye merkezli girişimcilerin, akademisyenlerin ve genç liderlerin bir araya gelerek oluşturduğu gönüllü bir sivil toplum kuruluşudur.",
    areaServed: "TR",
    knowsAbout: [
      "Girişimcilik",
      "Kültür",
      "Turizm",
      "Eğitim",
      "Uluslararası iş birliği",
    ],
  },
};

const sectionLinks = [
  {
    icon: Files,
    title: "Kurumsal kimlik",
    description:
      "Derneğimizin misyonu; girişimcilik, kültür, turizm ve eğitimde sürdürülebilir ve kapsayıcı projeler üretmektir.",
    href: "/about#misyon",
    label: "Misyonu oku",
  },
  {
    icon: Users,
    title: "Topluluk ve üyelik",
    description:
      "Yatırımcıları, girişimcileri ve genç liderleri aynı çatı altında buluşturan üyelik ve katılım süreçlerimiz.",
    href: "/membership-application",
    label: "Üyelik başvurusu",
  },
  {
    icon: CircleArrowRight,
    title: "Hizmetler ve projeler",
    description:
      "Eğitimler, etkinlikler ve iş birlikleriyle ekosistemde fark yaratan çalışmalarımızı inceleyin.",
    href: "/services",
    label: "Hizmetlere git",
  },
  {
    icon: Building2,
    title: "Etkinlikler",
    description:
      "Paneller, buluşmalar ve networking etkinlikleriyle bilgi ve deneyim paylaşımını destekliyoruz.",
    href: "/events",
    label: "Etkinlikleri gör",
  },
  {
    icon: Globe2,
    title: "Blog ve içerikler",
    description:
      "Girişimcilik ve kültür alanında güncel yazılar, röportajlar ve duyurular.",
    href: "/blog",
    label: "Bloga git",
  },
  {
    icon: BookOpen,
    title: "Haberler",
    description:
      "Dernek faaliyetleri, iş birlikleri ve basından haberler.",
    href: "/news",
    label: "Haberleri oku",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />

      <section className="w-full py-26 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-4">
              <SiteBreadcrumb
                items={[
                  { label: "Anasayfa", href: "/" },
                  { label: "Hakkımızda" },
                ]}
              />
            
            </div>
          </div>

          <div className="flex flex-col gap-16 md:gap-20">
            <div className="flex flex-col gap-7">
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                Türkiye&apos;den dünyaya: girişimcilik ve kültürde iş birliği
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                <strong className="font-medium text-foreground">UGKTED</strong>,{" "}
                Türkiye merkezli uluslararası bir sivil toplum kuruluşu olarak
                girişimcilik, kültür, turizm ve eğitim alanlarında yatırımcıları,
                girişimcileri ve genç liderleri buluşturur; sürdürülebilir projeler
                ve güçlü bir ekosistem oluşturmayı hedefler.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted md:min-h-[320px]">
                <Image
                  src="/1.png"
                  alt="UGKTED — girişimcilik, kültür ve eğitim odaklı dernek faaliyetleri"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div
                id="misyon"
                className="flex flex-col justify-between gap-8 rounded-2xl bg-muted p-6 md:p-8"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  Misyon
                </p>
                <p className="text-lg font-medium leading-relaxed text-foreground md:text-xl">
                  Küresel ölçekte güvenilir iş birlikleri kurmak; bilgi, deneyim
                  ve kaynakları paylaşarak üyelerimizin ve paydaşlarımızın
                  gelişimine katkı sağlamak.
                </p>
              </div>
            </div>

            <div id="vizyon" className="flex flex-col gap-10 md:gap-16">
              <div className="max-w-2xl">
                <h2 className="mb-3 text-3xl font-semibold tracking-tight md:text-5xl">
                  Vizyonumuz
                </h2>
                <p className="text-muted-foreground">
                  Türkiye&apos;yi girişimcilik ve kültürel diplomasi açısından güçlü
                  bir merkez haline getirmek; genç liderleri ve akademisyenleri
                  uluslararası platformlara taşımak.
                </p>
              </div>

              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {sectionLinks.map(
                  ({ icon: Icon, title, description, href, label }) => (
                    <div key={href} className="flex flex-col p-2">
                      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {description}
                      </p>
                      <Link
                        href={href}
                        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#eb0010]/10 px-4 text-sm font-medium text-[#eb0010] transition-colors hover:bg-[#eb0010]/15"
                      >
                        {label}
                        <ArrowUpRight className="size-4 shrink-0" />
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Kurumsal
                </p>
                <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
                  Kimiz, ne yapıyoruz?
                </h2>
                <p className="mb-6 text-muted-foreground">
                  UGKTED; yasal çerçevede faaliyet gösteren, şeffaf ve katılımcı bir
                  dernek yapısıyla üyelerinin sesini güçlendirir. Etkinlikler,
                  eğitimler ve iş birlikleriyle ekosisteme değer katar.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#eb0010]/10 px-4 text-sm font-medium text-[#eb0010] transition-colors hover:bg-[#eb0010]/15 sm:w-fit"
                >
                  İletişime geç
                  <ArrowUpRight className="size-4 shrink-0" />
                </Link>
              </div>
              <div>
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src="/8.png"
                    alt="UGKTED kurumsal görsel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="text-muted-foreground">
                  Derneğimiz; girişimcilik ekosisteminde köprü kurmayı, kültürel
                  mirası turizm ve eğitimle buluşturmayı ve genç nesillere uluslararası
                  fırsatlar sunmayı önceliklendirir.
                </p>
              </div>
            </div>

            <div id="neden-ugkted" className="max-w-4xl">
              <h2 className="mb-8 text-3xl font-semibold tracking-tight md:text-5xl">
                Neden UGKTED?
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Kanıtlanmış iş birliği ağı
                  </h3>
                  <p className="text-muted-foreground">
                    Farklı sektörlerden profesyonelleri ve genç liderleri aynı
                    çatı altında toplayarak sürdürülebilir projeler üretiriz.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Bütünsel ve kapsayıcı yaklaşım
                  </h3>
                  <p className="text-muted-foreground">
                    Girişimcilik, kültür, turizm ve eğitimi birbirinden ayrı
                    düşünmeden, bütünsel bir gelişim perspektifiyle ele alırız.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Kişiselleştirilmiş yönlendirme
                  </h3>
                  <p className="text-muted-foreground">
                    Üyelerimizin hedeflerine uygun etkinlikler, içerikler ve
                    networking imkânları sunarız.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold">
                    Güvenli ve şeffaf ortam
                  </h3>
                  <p className="text-muted-foreground">
                    Kurumsal ilkelerimize bağlı, etik ve şeffaf bir iletişim
                    kültürüyle hareket ederiz.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-muted p-8 md:p-10">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
                Birlikte büyüyelim
              </h2>
              <p className="mb-8 max-w-3xl text-lg text-muted-foreground">
                Etkinliklerden haberdar olmak, üyelik veya iş birliği için bizimle
                iletişime geçebilir; hizmetlerimizi inceleyebilirsiniz.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#eb0010] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#eb0010]/90 sm:w-auto"
                >
                  İletişime geç
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-10 w-full items-center justify-center rounded-xl border-2 border-[#eb0010] bg-transparent px-6 text-sm font-semibold text-[#eb0010] transition-colors hover:bg-[#eb0010]/10 sm:w-auto"
                >
                  Hizmetleri keşfet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
