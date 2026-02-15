import { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb" 
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: "UGKTED hizmetleri.",
};



export default function ServicesPage() {
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
              <BreadcrumbPage>Hizmetler</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold text-foreground">Hizmetler</h1>
        <p className="text-muted-foreground mt-6">İçerik yakında eklenecektir.</p>
        <div className="flex items-center gap-2 mt-8">
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
