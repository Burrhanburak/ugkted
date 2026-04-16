import { Metadata } from "next";
import { SiteBreadcrumb } from "@/components/site-breadcrumb";
import { BackNavLink } from "@/components/back-nav-link";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "İletişim",
  description: "UGKTED iletişim formu — soru ve önerilerinizi bize iletin.",
};

export default function ContactPage() {
  return (
    <div className=" w-full lg:min-h-[calc(100svh-8rem)]">
      <div className="mx-auto flex flex-col justify-center items-center w-full max-w-3xl gap-4 p-6 md:p-10">
        <div className="flex flex-col gap-4">
          <SiteBreadcrumb
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "İletişim" },
            ]}
          />
         
        </div>

        <div className="flex flex-1 items-center justify-center py-6 md:py-10">
          <div className="w-full max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
