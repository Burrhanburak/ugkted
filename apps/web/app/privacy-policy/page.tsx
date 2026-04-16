import { Metadata } from "next";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "UGKTED - Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği gizlilik politikası.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20 md:py-32 w-full">
      <div className="container px-6 py-6 max-w-3xl mx-auto">
        <SiteBreadcrumb
          className="mb-8"
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Gizlilik Politikası" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8 text-foreground">Gizlilik Politikası</h1>
        <p className="text-muted-foreground text-sm mb-12">Son güncelleme: 14 Şubat 2026</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Giriş</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED) olarak, 
              kişisel verilerinizin güvenliği ve gizliliği bizim için önemlidir. Bu Gizlilik Politikası, 
              web sitemizi kullandığınızda toplanan bilgilerin nasıl toplandığını, kullanıldığını ve 
              korunduğunu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Toplanan Bilgiler</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Ad, soyad ve iletişim bilgileri (üyelik başvurusu sırasında)</li>
              <li>E-posta adresi ve şifre (hesap oluşturma sırasında)</li>
              <li>IP adresi ve tarayıcı bilgileri (teknik güvenlik için)</li>
              <li>Çerezler ve benzeri teknolojiler aracılığıyla oturum verileri</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Bilgilerin Kullanımı</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Topladığımız bilgiler şu amaçlarla kullanılır:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Üyelik başvurularınızı işlemek ve değerlendirmek</li>
              <li>Etkinlikler ve duyurular hakkında sizi bilgilendirmek</li>
              <li>Web sitesi güvenliğini sağlamak</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Veri Paylaşımı</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kişisel verilerinizi, yasal zorunluluklar dışında üçüncü taraflarla paylaşmayız. 
              Hizmet sağlayıcılarımızla (hosting, e-posta vb.) yalnızca hizmet sunumu için gerekli 
              ölçüde veri paylaşımı yapılır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. KVKK Haklarınız</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Kişisel verilerinize erişim talep edebilirsiniz</li>
              <li>Düzeltme veya silme talep edebilirsiniz</li>
              <li>İtiraz hakkınızı kullanabilirsiniz</li>
              <li>Veri taşınabilirliği talep edebilirsiniz</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Bu haklarınızı kullanmak için info@ugkted.com adresinden bize ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Çerezler</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. 
              Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. İletişim</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gizlilik politikamız hakkında sorularınız için:{" "}
              <a href="mailto:info@ugkted.com" className="text-primary hover:underline">info@ugkted.com</a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
