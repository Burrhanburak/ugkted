import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Üyelik",
  description:
    "UGKTED üyelik başvurusu - Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği",
  robots: { index: false, follow: true },
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative grid min-h-dvh w-full grid-cols-1 bg-background lg:grid-cols-2">
            <aside className="relative hidden min-h-0 bg-muted p-8 text-white sm:p-10 lg:flex lg:min-h-dvh lg:flex-col dark:border-r">
                <div className="absolute inset-0 bg-[#eb0010] lg:rounded-none lg:rounded-l-xl" />
                <div className="relative z-20 flex items-center gap-2 text-lg font-medium">
                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg> */}
                    <Image src="/favicon.ico" alt="UGKTED" width={30} height={30} />
                    <span className="text-sm font-medium text-white">UGKTED</span>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Birlikte üretmek, paylaşmak ve gelişmek. Türkiye merkezli girişimciler, akademisyenler ve genç liderlerle geleceği inşa ediyoruz.&rdquo;
                        </p>
                        <footer className="text-sm">UGKTED</footer>
                    </blockquote>
                </div>
            </aside>
            <div className="flex min-h-dvh w-full min-w-0 flex-col justify-center px-4 py-8 sm:px-8 lg:min-h-dvh lg:p-10">
                <div className="mx-auto w-full max-w-md">{children}</div>
            </div>
        </div>
    )
}
