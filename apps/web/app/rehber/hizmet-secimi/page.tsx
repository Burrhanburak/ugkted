import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hizmet seçimi rehberi",
  description:
    "UGKTED hizmet alanları arasında seçim yapmak için hedef, paydaş ve çıktı odaklı pratik rehber.",
};

export default function HizmetSecimiRehberPage() {
  return (
    <ContentLayoutShell>
      <article className="w-full py-24 md:py-28 lg:py-32">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Rehber", href: "/rehber" },
              { label: "Hizmet seçimi" },
            ]}
          />
          <BackNavLink href="/rehber">Rehbere dön</BackNavLink>

          <h1 className="mt-6 text-4xl font-medium tracking-tight text-primary md:text-5xl">
            Hizmet seçimi rehberi
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Doğru hizmeti seçmek için önce{" "}
            <strong className="font-medium text-foreground">neyi değiştirmek istediğinizi</strong> netleştirin.
            Aşağıdaki sorular ve eşleştirmeler genel yönlendirme içindir;
            birden fazla alan aynı programda birleştirilebilir.
          </p>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Hedefinizi tanımlayın</h2>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground leading-relaxed">
              <li>
                <strong className="font-medium text-foreground">Ürün veya iş modeli</strong> netleştirmek, yol haritası
                ve paydaş haritası istiyorsanız:{" "}
                <Link href="/services/girisimcilik-ve-proje-danismanligi" className="text-primary underline underline-offset-4">
                  Girişimcilik ve proje danışmanlığı
                </Link>
                .
              </li>
              <li>
                <strong className="font-medium text-foreground">Ekip veya birey gelişimi</strong>, düzenli geri bildirim
                ve eğitim oturumları:{" "}
                <Link href="/services/mentorluk-ve-kapasite-gelistirme" className="text-primary underline underline-offset-4">
                  Mentorluk ve kapasite geliştirme
                </Link>
                .
              </li>
              <li>
                <strong className="font-medium text-foreground">Etkinlik serisi, topluluk, kültürel program</strong>:{" "}
                <Link href="/services/kultur-sanat-ve-topluluk-programlari" className="text-primary underline underline-offset-4">
                  Kültür–sanat ve topluluk programları
                </Link>
                .
              </li>
              <li>
                <strong className="font-medium text-foreground">Yerel turizm ve kalkınma, paydaş koordinasyonu</strong>:{" "}
                <Link href="/services/turizm-ve-yerel-kalkinma-programlari" className="text-primary underline underline-offset-4">
                  Turizm ve yerel kalkınma programları
                </Link>
                .
              </li>
              <li>
                <strong className="font-medium text-foreground">Uluslararası ortaklık ve ağ</strong>:{" "}
                <Link href="/services/uluslararasi-is-birligi-ve-ag-gelistirme" className="text-primary underline underline-offset-4">
                  Uluslararası iş birliği ve ağ geliştirme
                </Link>
                .
              </li>
            </ul>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Tablo ile doğrulayın</h2>
            <p className="text-muted-foreground leading-relaxed">
              Odak, hedef kitle ve örnek çıktı sütunları seçiminizi hızlandırır. Tek sayfada tüm başlıkları görmek için
              karşılaştırma sayfasını kullanın.
            </p>
            <Button asChild className="rounded-full">
              <Link href="/services/compare">
                Karşılaştırma tablosunu aç
                <ArrowUpRight className="ml-2 size-4" aria-hidden />
              </Link>
            </Button>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">3. Detay ve sınırları okuyun</h2>
            <p className="text-muted-foreground leading-relaxed">
              Her hizmet sayfasında teslim örnekleri ve <strong className="font-medium text-foreground">sınırlar
              (şeffaflık)</strong> bölümü bulunur. Hukuki, mali imza veya garanti edilen başvuru sonucu genelde bu
              kapsamın dışındadır; gerektiğinde uzman yönlendirmesi yapılır.
            </p>
          </section>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">4. Ön görüşme talep edin</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kısa ihtiyaç özeti ve varsa eklerinizle iletişim formundan ulaşın; süre ve kapsam yazılı özetlenir.
            </p>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/contact">İletişim</Link>
            </Button>
          </section>
        </div>
      </article>
    </ContentLayoutShell>
  );
}
