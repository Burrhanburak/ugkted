import { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
    title: "Üye Ol",
    description: "UGKTED ailesine katılın. Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği üyelik başvurusu.",
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
