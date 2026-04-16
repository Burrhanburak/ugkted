import { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Üyelik başvurusu - UGKTED",
  description:
    "UGKTED dernek üyeliği başvurusu: ad, iletişim ve faaliyet alanı. Şifre veya hesap gerektirmez.",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-6">
      <SignupForm />
      <div className="text-center">
        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}
