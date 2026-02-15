import { Metadata } from "next";
import { AnimatedMarqueeHero } from "@repo/ui/components/web/hero-3";
import LogoCloud from "@repo/ui/components/web/logo-cloud";
import FeaturedSectionStats from "@repo/ui/components/web/FeaturedSectionStats";
import FeaturesSection from "@repo/ui/components/web/FeaturesSeciton";
import FAQs from "@repo/ui/components/web/faq";
import { ServicesCarousel } from "@repo/ui/components/web/services-card";
// import ApproachSection from "@repo/ui/components/web/ApproachSection";
import BenefitsTabs from "@repo/ui/components/web/BenefitsTabs";
import { CTASectionNew } from "@repo/ui/components/web/hero-dithering-card";
import { UGKTEDTimeline } from "@repo/ui/components/web/ugkted-timeline";
import Event from "@repo/ui/components/web/Event";
import RecentBlogsSection from "@repo/ui/components/web/RecentBlogsSection";
import TestimonialsComponent from "@repo/ui/components/web/TestimonialsComponent";
import EcosystemMarqueeSection from "@repo/ui/components/web/EcosystemMarqueeSection";
import Featuresone from "@repo/ui/components/web/Featuresone";
const DEMO_IMAGES = [
 
  "/8.png",
  "/2.png",
  "/1.png",
  "/3.png",
  "/4.png",
  "/7.png", 
  "/5.png",
  
  "/6.png",

 

  // "https://images.unsplash.com/photo-1757519740947-eef07a74c4ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDh8fHxlbnwwfHx8fHw%3D",
  // "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzB8fHxlbnwwfHx8fHw%3D",
  // "https://images.unsplash.com/photo-1757207445614-d1e12b8f753e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODZ8fHxlbnwwfHx8fHw%3D",
  // "https://images.unsplash.com/photo-1757269746970-dc477517268f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjN8fHxlbnwwfHx8fHw%3D",
  // "https://images.unsplash.com/photo-1755119902709-a53513bcbedc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDF8fHxlbnwwfHx8fHw%3D",
];

export const metadata: Metadata = {
  title:" Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED ",
  description: "Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED) - Türkiye merkezli girişimcilerin, akademisyenlerin ve genç liderlerin bir araya gelerek oluşturduğu gönüllü bir sivil toplum kuruluşudur.",
  openGraph: {
    title: "UGKTED - Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği",
    description: "Türkiye merkezli girişimcilerin, akademisyenlerin ve genç liderlerin bir araya gelerek oluşturduğu gönüllü bir sivil toplum kuruluşudur.",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugkted.org";

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "UGKTED - Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği",
  description: "Türkiye merkezli girişimcilerin, akademisyenlerin ve genç liderlerin bir araya gelerek oluşturduğu gönüllü bir sivil toplum kuruluşudur.",
  url: siteUrl,
};

export default function LandingPage() {
  return (
    <>
   <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
   />
   <div className="relative min-h-[65vh]">
    {/* <div
      className="absolute inset-0 -z-10"
      style={{
        background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #b91910 100%)",
      }}
    /> */}
    <AnimatedMarqueeHero
  tagline="🌍 Türkiye’nin Uluslararası Derneği"
  title="Girişimci Kültür Turizm ve Eğitim Derneği"
  description="UGKTED, Türkiye merkezli uluslararası bir sivil toplum kuruluşu olarak girişimcilik, kültür, turizm ve eğitim alanlarında yatırımcıları, girişimcileri ve genç liderleri buluşturur."
  ctaText="UGKTED’e Katılın"
  ctaHref="/register"
  images={DEMO_IMAGES}
  className="bg-transparent min-h-[65vh] h-auto"
/>
   </div>
   {/* GEO-optimized definition block - SSR for AI/LLM understanding */}
<section
  className="flex flex-col  gap-6 w-full max-w-5xl px-6 py-10 text-center items-center justify-center mx-auto"
  data-reveal
>
  <div className="prose prose-invert prose-lg max-w-none text-center">

    <h1 className="text-black text-2xl md:text-3xl font-bold mb-4">
      Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)
    </h1>

    <h2 className="text-black/90 text-lg md:text-xl font-medium mb-4">
      Türkiye Merkezli Uluslararası Girişimcilik ve Kültürel İş Birliği Platformu
    </h2>

    <p className="text-black/90 text-sm md:text-base leading-relaxed mb-6 max-w-3xl mx-auto">
      <strong>UGKTED</strong>, Türkiye merkezli uluslararası bir sivil toplum kuruluşu olarak 
      girişimcilik, kültür, turizm ve eğitim alanlarında küresel iş birlikleri geliştirmek amacıyla kurulmuştur. 
      Dernek; yatırımcıları, girişimcileri, akademisyenleri ve genç liderleri bir araya getirerek 
      sürdürülebilir projeler üretmeyi ve Türkiye’den dünyaya uzanan güçlü bir girişimcilik ekosistemi oluşturmayı hedefler.
    </p>

    <div className="text-left max-w-3xl mx-auto space-y-6">

      <div>
        <h3 className="text-black/90 text-base font-semibold mb-2">
          UGKTED’in Amacı:
        </h3>
        <ul className="text-black/80 text-sm space-y-1 list-disc list-inside">
          <li>Türkiye’de girişimcilik kültürünü yaygınlaştırmak</li>
          <li>Uluslararası iş birlikleri ve kültürel köprüler kurmak</li>
          <li>Genç girişimcileri ve liderleri desteklemek</li>
          <li>Eğitim programları ve seminerler düzenlemek</li>
          <li>Kültür ve turizm projeleri geliştirmek</li>
        </ul>
      </div>

      <div>
        <h3 className="text-black/90 text-base font-semibold mb-2">
          Faaliyet Alanları:
        </h3>
        <ul className="text-black/80 text-sm space-y-1 list-disc list-inside">
          <li>Uluslararası girişimcilik organizasyonları</li>
          <li>Yatırımcı – girişimci buluşmaları</li>
          <li>Eğitim ve mentorluk programları</li>
          <li>Kültürel etkinlikler ve turizm projeleri</li>
          <li>Sürdürülebilir kalkınma odaklı sosyal projeler</li>
        </ul>
      </div>

      <div>
        <h3 className="text-black/90 text-base font-semibold mb-2">
          Neden UGKTED?
        </h3>
        <p className="text-black/80 text-sm leading-relaxed">
          UGKTED, “birlikte üretmek, paylaşmak ve gelişmek” ilkesiyle hareket eder. 
          Türkiye’den dünyaya uzanan bir vizyonla, girişimcilik ekosistemini güçlendirir 
          ve kültürel çeşitliliği destekleyerek toplumsal fayda üretir.
        </p>
      </div>

    </div>
  </div>
</section>

      <LogoCloud />
      <FeaturesSection />
      <Featuresone />
      {/* <ApproachSection /> */}
      <ServicesCarousel />

      <UGKTEDTimeline />
      <BenefitsTabs />
      <EcosystemMarqueeSection />
      <Event />
      <FeaturedSectionStats />
      <FAQs />
      {/* <RecentBlogsSection /> */}
      <TestimonialsComponent />



      <CTASectionNew />
    </>
  );
}
