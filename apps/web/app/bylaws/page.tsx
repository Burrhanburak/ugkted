import type { Metadata } from "next";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { MdxBody } from "@/components/mdx-body";
import { FileText } from "lucide-react";
import { getMdxFrontmatter } from "@/lib/mdx";

const SLUG = "bylaws";

export async function generateMetadata(): Promise<Metadata> {
  const fm = getMdxFrontmatter(SLUG);
  return {
    title: fm?.title ? `${fm.title} | Tüzük` : "Tüzük",
    description: fm?.description ?? "UGKTED dernek tüzüğü ve yasal çerçeve hakkında bilgi.",
  };
}

export default function BylawsPage() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container mx-auto max-w-3xl px-6">
        <SiteBreadcrumb
          className="mb-8"
          items={[
            { label: "Anasayfa", href: "/" },
            { label: "Kurumsal", href: "/about" },
            { label: "Tüzük" },
          ]}
        />

        <h1 className="text-4xl font-bold tracking-tight text-foreground">Tüzük</h1>

        <div className="mt-10 rounded-xl border border-dashed border-border bg-muted/20 p-6">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-medium text-foreground">PDF tüzük metni</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Onaylı tüzük dosyasını buraya yüklediğinizde bu alanı gerçek indirme bağlantısına
                bağlayabilirsiniz.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">İndirme bağlantısı yakında eklenecek.</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <MdxBody slug={SLUG} />
        </div>
      </div>
    </section>
  );
}
