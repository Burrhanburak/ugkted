import type { Metadata } from "next";
import Link from "next/link";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Yayınlar",
  description: "UGKTED yayınları, raporlar ve blog içerikleri.",
};

const items = [
  {
    title: "Kurumsal blog ve haberler",
    body: "Güncel duyurular, etkinlik özetleri ve alan haberleri blog ve haber bölümlerinde yayımlanır.",
    href: "/blog",
  },
  {
    title: "Haberler",
    body: "Dernek faaliyetleri ve ortak duyurular için haber sayfası.",
    href: "/news",
  },
  {
    title: "Basılı / PDF yayınlar",
    body: "Rapor, bülten veya kitapçık yayınlandığında bu alana indirme bağlantıları eklenebilir.",
    href: "#",
  },
] as const;

export default function PublicationsPage() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SiteBreadcrumb
          className="mb-8"
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Kurumsal", href: "/about" },
            { label: "Yayınlar" },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight text-foreground">Yayınlar</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          UGKTED; dijital içerik, haber metinleri ve gerektiğinde basılı materyallerle kamuyu
          bilgilendirmeyi önemser. Aşağıdaki kanallar üzerinden güncel yayınlara ulaşabilirsiniz.
        </p>

        <ul className="mt-10 space-y-4">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex gap-3 rounded-xl border border-border/60 bg-muted/20 p-4"
            >
              <BookOpen className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <h2 className="font-semibold text-foreground">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                {item.href !== "#" ? (
                  <Link
                    href={item.href}
                    className="mt-2 inline-block text-sm font-medium text-primary underline underline-offset-4"
                  >
                    Sayfaya git
                  </Link>
                ) : (
                  <span className="mt-2 inline-block text-sm text-muted-foreground">
                    Yakında eklenecek
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
