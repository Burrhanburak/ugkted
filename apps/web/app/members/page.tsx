import { Metadata } from "next";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import TeamShowcase from "@/components/team-showcase";
import { BackNavLink } from "@/components/back-nav-link";

export const metadata: Metadata = {
  title: "Üyelerimiz",
  description:
    "UGKTED üyeleri ve gönüllü ağımızdan öne çıkan isimler. Derneğimizin faaliyetlerine katkı sunan topluluğumuzu tanıyın.",
};

export default function MembersPage() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-6 py-6">
        <SiteBreadcrumb
          className="mb-8"
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Üyelerimiz" },
          ]}
        />
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Üyelerimiz</h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Uluslararası iş birliği, eğitim ve yerel kalkınma alanlarında bir araya gelen üyelerimiz
            ve gönüllülerimiz, UGKTED&apos;nin misyonunun temelini oluşturur. Aşağıdaki alan, topluluğumuzu
            tanıtmak için kullanılabilir; isimler, görseller ve sosyal bağlantılar yönetimden gelen
            güncel bilgilerle düzenlenmelidir.
          </p>
        </div>

        <div className="mt-12 flex justify-center border-t border-border/60 pt-12">
          <TeamShowcase />
        </div>
      </div>
    </section>
  );
}
