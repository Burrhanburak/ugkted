import type { Metadata } from "next";
import Link from "next/link";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Belgelerimiz",
  description:
    "UGKTED sertifika, diploma ve kurumsal şeffaflık belgeleri hakkında bilgilendirme.",
};

export default function CertificatesPage() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SiteBreadcrumb
          className="mb-8"
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Hakkımızda", href: "/about" },
            { label: "Belgelerimiz" },
          ]}
        />
        <BackNavLink href="/about">Hakkımızda</BackNavLink>

        <h1 className="text-4xl font-bold tracking-tight text-foreground">Belgelerimiz</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Eğitim ve kültür programlarımız kapsamında katılımcılara sunulan sertifika ve benzeri
          belgeler; programa özel kriterler ve kontrol listeleriyle hazırlanır. Derneğin hukuki
          statüsüne ilişkin resmi kayıtlar ise ilgili idare ile paylaşılan belgeler üzerinden
          doğrulanır.
        </p>

        <div className="mt-10 space-y-4">
          {[
            {
              title: "Dernek tescil ve sicil bilgileri",
              body: "Güncel tescil çıktısı ve sicil kaydı, talep halinde iletişim kanallarımız üzerinden paylaşılabilir.",
            },
            {
              title: "Program sertifikaları",
              body: "Atölye ve eğitim sonunda verilen katılım / başarı belgeleri, program koordinasyonu tarafından onaylanır.",
            },
            {
              title: "İş birliği ve protokoller",
              body: "Kurumlarla yapılan iş birlikleri, imzalanan protokol özetleri ve kamuya açık duyurular web sitemizde yayımlanır.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-3 rounded-xl border border-border/60 bg-muted/20 p-4"
            >
              <Award className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h2 className="font-semibold text-foreground">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Belge talebi veya doğrulama için{" "}
          <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
            iletişim
          </Link>{" "}
          formunu kullanabilirsiniz.
        </p>
      </div>
    </section>
  );
}
