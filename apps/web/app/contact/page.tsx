import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { ArrowLeftIcon, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "İletişim",
  description: "UGKTED iletişim bilgileri.",
};

export default function ContactPage() {
  return (
    <div className="grid min-h-[calc(100vh-200px)] lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between items-start gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Anasayfa</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>İletişim</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium shrink-0"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Anasayfaya Dön</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-md">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1474&auto=format&fit=crop"
          alt="İletişim"
          fill
          className="object-cover object-center dark:brightness-[0.2] dark:grayscale"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute inset-0 flex items-end p-10">
          <div className="relative z-10 text-white">
            <Mail className="mb-4 size-12 opacity-90" />
            <blockquote className="space-y-2">
              <p className="text-lg font-medium">
                &ldquo;Sorularınız ve önerileriniz bizim için değerli. En kısa
                sürede size dönüş yapacağız.&rdquo;
              </p>
              <footer className="text-sm opacity-90">UGKTED</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
