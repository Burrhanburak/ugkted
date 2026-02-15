import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
    title: "Giriş Yap",
    description: "UGKTED üye hesabınıza giriş yapın. Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği.",
};

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-6">
            <LoginForm />
            <div className="text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    ← Anasayfaya Dön
                </Link>
            </div>
        </div>
    );
}
