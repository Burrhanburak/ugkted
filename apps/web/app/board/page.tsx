import type { Metadata } from "next";
import Link from "next/link";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Yönetim Kurulu",
  description:
    "UGKTED Yönetim Kurulu: dernek faaliyetlerinin yürütülmesinden sorumlu gönüllü yönetim yapısı.",
};

const members = [
  { role: "Başkan", image: "/favicon.ico", name: "Yücel Akyürekli Özcan" },
  { role: "Başkan Yardımcısı", image: "/favicon.ico", name: "Atanmış / güncellenecek" },
  { role: "Sayman", image: "/favicon.ico", name: "Atanmış / güncellenecek" },
  { role: "Sekreter", image: "/favicon.ico", name: "Atanmış / güncellenecek" },
  { role: "Üye", image: "/favicon.ico", name: "Atanmış / güncellenecek" },
] as const;

export default function BoardPage() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SiteBreadcrumb
          className="mb-8"
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Kurumsal", href: "/about" },
            { label: "Yönetim Kurulu" },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight text-foreground">Yönetim Kurulu</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          UGKTED, Türkiye merkezli uluslararası bir sivil toplum kuruluşu olarak faaliyetlerini
          şeffaf ve katılımcı bir yönetim anlayışıyla sürdürür. Aşağıdaki liste, resmi tescil ve
          genel kurul kararlarıyla güncellenen yönetim yapısının özetidir; isimler kurumunuzdan
          alınan güncel bilgiyle değiştirilebilir.
        </p>

        <ul className="mt-10 space-y-4">

          {members.map((m) => (
            <li
              key={m.role}
              className="flex flex-col gap-1 rounded-xl border border-border/60 bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <Image src={m.image} alt={m.name} width={30} height={30} />
              <span className="font-medium text-foreground">{m.role}</span>
              <span className="text-muted-foreground">{m.name}</span>
            </li>
          ))}

        </ul>

        <p className="mt-8 text-sm text-muted-foreground">
          Güncel görev dağılımı ve iletişim için{" "}
          <Link href="/contact" className="font-medium text-primary underline underline-offset-4">
            iletişim
          </Link>{" "}
          sayfamızdan bize yazabilirsiniz.
        </p>
      </div>
    </section>
  );
}
