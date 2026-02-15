"use client";

// import { useTranslations } from "next-intl";
import Link from "next/link";
import { Logo } from "./logo";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Eye,
  Facebook,
} from "lucide-react";


import FlickeringFooter from "./flickering-footer";
import { DonationModal } from "./donation-modal";

export default function Footer() {
  // const t = useTranslations("footer");
  // const params = useParams();
  // const locale = (params?.locale as string) || "en";

  return (
    <footer className="relative w-full overflow-hidden bg-white">
      {/* Main Container bg-[#eb0010] */}
      <div className="relative w-full  bg-[#ffff] rounded-t-[30px] overflow-hidden">
        {/* Content Container */}
        <div className="relative z-[4] flex flex-col items-start justify-between max-w-[1440px] mx-auto px-[50px] pt-[80px] pb-[50px] gap-[90px] lg:gap-[116px]">
          {/* Main Content Section */}
          <div className="w-full flex flex-col items-center justify-start gap-[44px] max-w-[810px] mx-auto">
            {/* Hero Text Section */}
            <div className="flex flex-col items-center justify-start gap-6 w-full">
              {/* Main Heading */}
              <div className="text-center">
                <h2 className="text-[32px] md:text-[56px] leading-[100%] tracking-[-0.05em] font-bold text-white">
                  <span
                    className="bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "radial-gradient(50% 306.999% at 50% 57.0833%, rgba(235, 0, 16, 0.8) 0%, rgba(255, 255, 255, 0.3) 100%)",
                    }}
                  >

                    UGKTED
                  </span>
                </h2>
              </div>

              {/* Subtitle */}
              <div className="text-center text-[#eb0010]/80 text-sm leading-[129%] max-w-md">
                <p>Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={`/contact`}
                  className="relative group flex items-center justify-center gap-3 px-6 py-3 bg-transparent border border-white/20 rounded-full text-[#eb0010]/80 text-sm leading-[129%] hover:bg-white/5 transition-all duration-300"
                >
                  <span>Bize Ulaşın</span>
                  <ArrowUpRight className="w-4 h-4" />
                  <div className="absolute inset-0 bg-[#eb0010] rounded-[60px] blur-[20px] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>



                <Link
                  href={`/services`}
                  className="flex items-center gap-3 px-6 py-3 bg-white border rounded-full text-[#eb0010]/80 text-sm leading-[129%] hover:bg-white/90 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  <span>Hizmetler</span>
                </Link>

                <DonationModal>
                  <button className="flex items-center gap-3 px-6 py-3 bg-[#eb0010] border border-[#eb0010] rounded-full text-white text-sm leading-[129%] hover:bg-[#eb0010]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Bağış Yap</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </DonationModal>
              </div>
            </div>

            {/* Links Container */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-[60px] min-h-min overflow-visible p-0 relative min-w-min">
              {/* Kurumsal */}
              <div className="flex flex-col items-start  gap-[22px] min-h-min overflow-visible p-0 relative min-w-min">
                <h3 className="text-[#eb0010]/80 text-sm leading-[129%] uppercase tracking-wider font-medium">
                  Kurumsal
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Hakkımızda", href: `/about` },
                    { label: "Hizmetler", href: `/services` },
                    { label: "İletişim", href: `/contact` },
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="group flex items-center justify-between text-[#eb0010]/60 hover:text-[#eb0010]/80 text-sm leading-[129%] transition-colors duration-300 max-w-[200px]"
                      prefetch={true}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Medya & İçerik */}
              <div className="flex flex-col items-start  gap-[22px] min-h-min overflow-visible p-0 relative min-w-min">
                <h3 className="text-[#eb0010]/80 text-sm leading-[129%] uppercase tracking-wider font-medium">
                  Medya & İçerik
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Etkinlikler", href: `/events` },
                    { label: "Haberler", href: `/news` },
                    { label: "Bloglar", href: `/blog` },
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="group flex items-center justify-between text-[#eb0010]/60 hover:text-[#eb0010]/80 text-sm leading-[129%] transition-colors duration-300 max-w-[200px]"
                      prefetch={true}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Üyelik */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-start justify-center gap-[22px] min-h-min overflow-visible p-0 relative w-full md:w-[225px]">
                <h3 className="text-[#eb0010]/80 text-sm leading-[129%] uppercase tracking-wider font-medium">
                  Üyelik
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Üyelerimiz", href: `/members` },
                    { label: "Üye Başvurusu", href: `/membership-application` },
                  ].map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="group flex items-center justify-between text-[#eb0010]/60 hover:text-[#eb0010]/80 text-sm leading-[129%] transition-colors duration-300 max-w-[200px]"
                      prefetch={true}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-[#eb0010]/60 text-sm leading-[129%] max-w-[225px]">
                  <p>UGKTED Genel Merkezi, İstanbul, Türkiye</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-[#eb0010]/60 text-sm leading-[129%]">
                    <span className="text-[#eb0010]/60">
                      Email:
                    </span>{" "}
                    info@ugkted.com
                  </div>
                  <div className="text-[#eb0010]/60 text-sm leading-[129%]">
                    <span className="text-[#eb0010]/60">
                      Tel:
                    </span>{" "}
                    +90 535 361 19 31
                  </div>
                </div>
              </div>
              {/* Contact Us - spans 2 columns on mobile, 1 column on desktop */}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full flex flex-col gap-6">
            {/* Legal Text */}
            <div className="text-[#eb0010]/80 text-sm leading-[129%] text-left max-w-2xl">
              {/* <p className="break-words">{t('legal')}</p> */}
            </div>

            {/* Copyright and Legal Links */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                <div className="text-[#eb0010]/80 text-sm leading-[129%]">
                  Copyright © 2026 UGKTED
                </div>

                {/* Legal Links */}
                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href={`/privacy-policy`}
                    className="text-[#eb0010]/60 hover:text-[#eb0010]/80 transition-colors duration-300"
                  >
                    Gizlilik Politikası
                  </Link>
                  <span className="text-[#eb0010]/40">|</span>
                  <Link
                    href={`/terms-of-service`}
                    className="text-[#eb0010]/60 hover:text-[#eb0010]/80 transition-colors duration-300"
                  >
                    Kullanım Şartları
                  </Link>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {[
                  {
                    href: "https://www.instagram.com/ugkted",
                    icon: Instagram,
                    alt: "Instagram",
                  },
                  {
                    href: "https://www.facebook.com/ugkted",
                    icon: Facebook,
                    alt: "facebook",
                  },
                  {
                    href: "https://www.linkedin.com/company/ugkted",
                    icon: Linkedin,
                    alt: "LinkedIn",
                  }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 transition-opacity duration-300 text-[#eb0010]/80"
                    >
                      <IconComponent className="w-6 h-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}

        {/* Logo Background */}


        {/* Top Logo */}
        <div className="absolute top-[-180px] left-[70px] w-[226px] h-auto z-[1]">
          <Logo className="text-black" />
        </div>

        <FlickeringFooter />
      </div>
    </footer>
  );
}
