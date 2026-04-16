import type { Metadata } from "next";
import Link from "next/link";
import { ContentLayoutShell } from "@/components/content-layout-shell";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { Button } from "@repo/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { ServicesFaqSection } from "@/components/services-faq-section";
import { servicesCompareFaq } from "@/lib/services-faq";
import { getServiceCompareRows } from "@/lib/services-compare";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hizmetleri karşılaştır",
  description:
    "UGKTED hizmet alanlarını odak, hedef kitle, çıktılar ve tipik süre açısından yan yana karşılaştırın.",
};

export default function ServicesComparePage() {
  const rows = getServiceCompareRows();

  return (
    <ContentLayoutShell>
      <div className="w-full min-w-0 overflow-x-hidden">
      <section className="border-b border-border/60 py-12 md:py-20 lg:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <SiteBreadcrumb
            className="mb-8"
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "Hizmetler", href: "/services" },
              { label: "Karşılaştır" },
            ]}
          />
          <BackNavLink href="/services">Hizmetlere dön</BackNavLink>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Hizmetleri karşılaştır
          </h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            Aşağıdaki tablo, beş hizmet alanımızı tek bakışta özetler. Hücreler genel yönlendirme içindir; kesin kapsam
            için ilgili detay sayfasını inceleyin veya iletişime geçin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">
                Ön görüşme talep et
                <ArrowUpRight className="ml-2 size-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/services">Tüm hizmetlere dön</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/rehber">Rehber</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-x-auto rounded-xl border border-border/60">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="min-w-[200px] font-semibold text-foreground">Hizmet</TableHead>
                  <TableHead className="min-w-[220px] font-semibold text-foreground">Odak</TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-foreground">Hedef kitle</TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-foreground">Örnek çıktılar</TableHead>
                  <TableHead className="min-w-[140px] font-semibold text-foreground whitespace-nowrap">
                    Tipik süre
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.slug}>
                    <TableCell className="align-top font-medium">
                      <Link
                        href={`/services/${r.slug}`}
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {r.title}
                      </Link>
                    </TableCell>
                    <TableCell className="align-top text-sm text-muted-foreground">{r.focus}</TableCell>
                    <TableCell className="align-top text-sm text-muted-foreground">{r.audience}</TableCell>
                    <TableCell className="align-top text-sm text-muted-foreground">{r.outputs}</TableCell>
                    <TableCell className="align-top text-sm text-muted-foreground whitespace-nowrap">
                      {r.typicalDuration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            Tablo özet niteliğindedir. Hukuki, mali veya resmi başvuru taahhütleri içermez.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 py-12 md:py-20 lg:pb-28">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <ServicesFaqSection title="Karşılaştırma hakkında sorular" items={servicesCompareFaq} />
        </div>
      </section>
      </div>
    </ContentLayoutShell>
  );
}
