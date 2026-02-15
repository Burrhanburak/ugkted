import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ConditionalSiteChrome } from "../components/conditional-site-chrome";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Reduce render blocking
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugkted.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/po.png",
    shortcut: "/po.png",
    apple: "/po.png",
  },
  title: {
    default: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
    template: "%s | Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
  },
  description: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
  openGraph: {
    title: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
    description: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
    description: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)",
  legalName: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği",
  url: siteUrl,
  description: "Türkiye merkezli girişimcilerin, akademisyenlerin ve genç liderlerin bir araya gelerek oluşturduğu gönüllü bir sivil toplum kuruluşudur.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
    addressLocality: "Türkiye",
  },
  areaServed: "TR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${inter.className} min-h-screen bg-background antialiased overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
