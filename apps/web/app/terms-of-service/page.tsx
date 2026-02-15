import { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "UGKTED - Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği kullanım şartları.",
};

export default function TermsOfServicePage() {
  return (
    <section className="py-20 md:py-32 w-full">
      <div className="container px-6 py-6 max-w-3xl mx-auto">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Anasayfa</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Kullanım Şartları</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Kullanım Şartları</h1>
        <p className="text-muted-foreground text-sm mb-12">Son güncelleme: 14 Şubat 2026</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Genel Hükümler</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ugkted.org web sitesi (&quot;Site&quot;), Türkiye Merkezli Uluslararası Girişimci Kültür 
              Turizm ve Eğitim Derneği (&quot;UGKTED&quot;) tarafından işletilmektedir. Siteyi kullanarak 
              bu Kullanım Şartlarını kabul etmiş sayılırsınız.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Hizmet Tanımı</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              UGKTED, girişimcilik, kültür, turizm ve eğitim alanlarında bilgi sunmak, üyelik 
              başvuruları almak, etkinlik duyuruları yapmak ve dernek hizmetleri hakkında 
              bilgilendirme sağlamak amacıyla bu Siteyi sunmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Kullanıcı Yükümlülükleri</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Siteyi kullanırken:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Doğru ve güncel bilgi sağlamayı kabul edersiniz</li>
              <li>Yasalara ve düzenlemelere uygun hareket edeceğinizi taahhüt edersiniz</li>
              <li>Siteyi zararlı amaçlarla kullanmayacağınızı kabul edersiniz</li>
              <li>Başkalarının haklarına saygı göstereceğinizi taahhüt edersiniz</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Fikri Mülkiyet</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sitedeki tüm içerik, logo, tasarım ve materyaller UGKTED&apos;e aittir. İzinsiz 
              kopyalama, dağıtma veya ticari kullanım yasaktır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Üyelik</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Üyelik başvuruları UGKTED Yönetim Kurulu tarafından değerlendirilir. Dernek 
              tüzüğümüze uygun olmayan başvurular reddedilebilir. Üyelik onayı, yazılı bildirim 
              ile tamamlanır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Sorumluluk Sınırlaması</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Site &quot;olduğu gibi&quot; sunulmaktadır. UGKTED, Site içeriğinin doğruluğu veya 
              eksiksizliği konusunda garanti vermez. Dolaylı veya dolaysız zararlardan 
              sorumlu tutulamaz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Değişiklikler</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              UGKTED, bu Kullanım Şartlarını önceden bildirimde bulunmaksızın değiştirme 
              hakkını saklı tutar. Değişiklikler yayımlandığı anda yürürlüğe girer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Uygulanacak Hukuk</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bu şartlar Türkiye Cumhuriyeti kanunlarına tabidir. Uyuşmazlıklarda İstanbul 
              Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. İletişim</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kullanım Şartları hakkında sorularınız için:{" "}
              <a href="mailto:info@ugkted.com" className="text-primary hover:underline">info@ugkted.com</a>
            </p>
          </section>
        </div>

        <div className="flex items-center gap-2 mt-16 pt-8 border-t">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Anasayfaya Dön</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
