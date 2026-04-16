import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CdnImage } from "@/components/cdn-image";
import Link from "next/link";
import { AnimatedMarqueeHero } from "@repo/ui/components/web/hero-3";
import LogoCloud from "@repo/ui/components/web/logo-cloud";
import FeaturedSectionStats from "@repo/ui/components/web/FeaturedSectionStats";
import FeaturesSection from "@repo/ui/components/web/FeaturesSeciton";
import FAQs from "@repo/ui/components/web/faq";
import { ServicesCarousel } from "@repo/ui/components/web/services-card";
import Featuresone from "@repo/ui/components/web/Featuresone";
import { CTASectionNew } from "@repo/ui/components/web/hero-dithering-card";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { ArrowRight, ChevronRight } from "lucide-react";
import { listBlogMdxMeta } from "@/lib/mdx";
import { resolveMediaUrl } from "@/lib/cdn";

// Vercel React Best Practices: Dynamic imports for below-fold heavy components (bundle-dynamic-imports)
// Event: 20 lucide icons, EcosystemMarqueeSection: 8 icons, BenefitsTabs: large images
const BenefitsTabs = dynamic(
  () => import("@repo/ui/components/web/BenefitsTabs").then((m) => m.default),
  { ssr: true }
);
const UGKTEDTimeline = dynamic(
  () => import("@repo/ui/components/web/ugkted-timeline").then((m) => m.UGKTEDTimeline),
  { ssr: true }
);
const Event = dynamic(
  () => import("@repo/ui/components/web/Event").then((m) => m.default),
  { ssr: true }
);
const TestimonialsComponent = dynamic(
  () => import("@repo/ui/components/web/TestimonialsComponent").then((m) => m.default),
  { ssr: true }
);
const EcosystemMarqueeSection = dynamic(
  () => import("@repo/ui/components/web/EcosystemMarqueeSection").then((m) => m.default),
  { ssr: true }
);
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

const teamLogos = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
] as const;

function formatDate(date?: string) {
  if (!date) return "Tarih yakında";
  return new Date(date).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function LandingPage() {
  const latestPosts = listBlogMdxMeta().slice(0, 3);
  return (
    <>
   <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
   />
   <div className="relative min-h-[65vh] ">
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

    <h1 className="text-black text-xl md:text-3xl font-bold mb-4">
      Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED)
    </h1>

    <h2 className="text-black/90 text-md md:text-xl font-medium mb-4">
      Türkiye Merkezli Uluslararası Girişimcilik ve Kültürel İş Birliği Platformu
    </h2>

    <p className="text-black/90 text-xs md:text-base leading-relaxed mb-6 max-w-3xl mx-auto">
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
      <section className="py-32 w-full">
        <div className="px-0">
          <h2 className="container text-3xl font-bold lg:text-5xl">
            <span className="text-muted-foreground">Blogumuz</span>
            <br />
          En Güncel Bloglarımız
          </h2>
          <div className="mt-8">
            <Separator />
            <div>
              {latestPosts.map((post, index) => (
                <div key={post.slug}>
                  <div className="container grid grid-cols-1 gap-6 py-8 lg:grid-cols-4">
                    <div className="hidden items-center gap-3 self-start lg:flex">
                      <Image
                        alt={post.authorName ?? "UGKTED Team"}
                        className="h-auto w-11"
                        src={teamLogos[index % teamLogos.length] ?? teamLogos[0]}
                        width={44}
                        height={44}
                      />
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">{post.authorName ?? "UGKTED"}</span>
                        <span className="text-sm text-muted-foreground">Team</span>
                      </div>
                    </div>
                    <div className="col-span-2 max-w-xl">
                      <div className="flex items-start gap-3">
                        <CdnImage
                          src={resolveMediaUrl(post.coverImage)}
                          alt={post.title ?? post.slug}
                          width={56}
                          height={56}
                          className="mt-0.5 h-12 w-12 rounded-lg border object-cover sm:h-14 sm:w-14"
                        />
                        <div className="min-w-0">
                          <span className="mb-2 block text-sm font-medium text-muted-foreground">
                            {formatDate(post.date)}
                            <span className="inline lg:hidden"> - {post.authorName ?? "UGKTED"}</span>
                          </span>
                          <h3 className="text-2xl font-bold hover:underline lg:text-3xl">
                            <Link href={`/blog/${post.slug}`}>{post.title ?? post.slug}</Link>
                          </h3>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {[post.sector ?? "Blog", "UGKTED", "İçgörü"].map((tag) => (
                          <Link
                            key={`${post.slug}-${tag}`}
                            href={`/blog/${post.slug}`}
                            className="flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                          >
                            {tag}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        ))}
                      </div>
                    </div>
                    <Button asChild variant="outline" size="icon" className="ml-auto hidden size-9 lg:flex">
                      <Link href={`/blog/${post.slug}`}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">Read more</span>
                      </Link>
                    </Button>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <FeaturedSectionStats />
      <FAQs />
      {/* <RecentBlogsSection /> */}
      <TestimonialsComponent />



      <CTASectionNew />
    </>
  );
}
