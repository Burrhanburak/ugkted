import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  CircleCheck,
  Lightbulb,
  TextAlignStart,
  Share2,
} from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";

const BLOG_POST = {
    title: "Geleceğin Turizmi: Sürdürülebilirlik ve İnovasyon",
    excerpt: "Girişimcilik ve Sürdürülebilirlik ekseninde turizmin geleceğini şekillendiren trendler ve stratejiler.",
    author: {
        name: "Dr. Ahmet Yılmaz",
        role: "Yönetim Kurulu Üyesi",
        image: "/green-elza.svg"
    },
    coverImage: "https://images.unsplash.com/photo-1596386461350-326ea7750550?q=80&w=1000&auto=format&fit=crop",
    metadata: {
        overview: "Sürdürülebilir kalkınma hedefleri doğrultusunda turizm sektörünün dönüşümü, yerel ekonomilerin güçlendirilmesi ve girişimcilik fırsatlarının değerlendirilmesi üzerine kapsamlı bir inceleme.",
        sector: "Turizm & Teknoloji",
        teamSize: "UGKTED Araştırma Grubu",
        location: "İstanbul, Türkiye",
        established: "2024",
        funding: "Avrupa Birliği Projesi",
        coreFeatures: "Eko-Turizm Dijitalleşme Yerel-Kalkınma"
    }
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ugkted.org";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POST;
  const url = `${siteUrl}/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | UGKTED`,
      description: post.excerpt,
      type: "article",
      url,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: BLOG_POST.title,
      description: BLOG_POST.excerpt,
      image: BLOG_POST.coverImage,
      url: `${siteUrl}/blog/${slug}`,
      author: {
        "@type": "Person",
        name: BLOG_POST.author.name,
        jobTitle: BLOG_POST.author.role,
      },
      publisher: {
        "@type": "Organization",
        name: "UGKTED",
        url: siteUrl,
      },
    };

    return (
        <section className="py-32 w-full">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <div className="container">

                {/* Header Content */}
                <div className="mx-auto flex max-w-prose flex-col items-center justify-between gap-10 lg:max-w-none lg:flex-row">
                    <div>
                        <Breadcrumb className="mb-4">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/">Anasayfa</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/blog">Blog</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{BLOG_POST.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className="mt-10 text-5xl font-semibold text-balance lg:text-7xl">
                            {BLOG_POST.title}
                        </h1>
                        <div className="mt-16">
                            <p className="font-medium">Katkıda bulunan:</p>
                            <div className="mt-4 flex items-center gap-4">
                                <span className="relative flex shrink-0 overflow-hidden size-16 rounded-xl border">
                                    <Image
                                        src={BLOG_POST.author.image}
                                        alt={BLOG_POST.author.name}
                                        fill
                                        className="object-cover"
                                    />
                                </span>
                                <div className="flex flex-col">
                                    <p className="font-semibold">{BLOG_POST.author.name}</p>
                                    <p className="text-muted-foreground">{BLOG_POST.author.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative max-h-[524px] w-full rounded-xl overflow-hidden aspect-video lg:w-1/2 lg:aspect-auto">
                        <Image
                            src={BLOG_POST.coverImage}
                            alt="placeholder"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Main Content & Sidebar Layout */}
                <div className="relative mt-20 flex flex-col gap-x-6 gap-y-16 lg:flex-row">

                    {/* Sidebar */}
                    <aside className="mx-auto h-fit max-w-prose lg:sticky lg:top-32 lg:mx-0 lg:w-64 lg:max-w-none">
                        {/* Logo or Brand Icon can go here if needed, keeping structure similar to user request */}
                        <div className="h-6 w-24 relative mb-4">
                            {/* <Image src="/logo.svg" fill alt="Logo" className="object-contain dark:invert" /> */}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-1">
                            <div className="col-span-2 lg:col-span-1">
                                <h2 className="font-semibold">Genel Bakış</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{BLOG_POST.metadata.overview}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Sektör</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{BLOG_POST.metadata.sector}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Ekip</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{BLOG_POST.metadata.teamSize}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Konum</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{BLOG_POST.metadata.location}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Tarih</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{BLOG_POST.metadata.established}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Destek</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{BLOG_POST.metadata.funding}</p>
                            </div>
                            <div>
                                <h2 className="font-semibold">Ana Özellikler</h2>
                                <p className="mt-1 text-sm text-muted-foreground">{BLOG_POST.metadata.coreFeatures}</p>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col">
                            <span className="mb-2 text-sm text-muted-foreground">İçeriği Paylaş:</span>
                            <div className="flex gap-4">
                                <a href="#" className="text-muted-foreground hover:text-primary">
                                    <Share2 className="size-5" />
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex flex-1">
                        <div className="mx-auto max-w-prose lg:max-w-4xl lg:px-20 w-full">

                            {/* Problem/Approach/Outcome Grid */}
                            <div className="grid gap-x-10 gap-y-7 rounded-3xl border p-6 lg:grid-cols-2 lg:gap-y-10 lg:border-none lg:p-0 mb-20">
                                <div>
                                    <h2 className="text-xl font-semibold">Sorun</h2>
                                    <p className="mt-3 text-muted-foreground">Turizm sektörünün geleneksel yapısı, değişen çevresel koşullara ve dijitalleşen tüketici alışkanlıklarına uyum sağlamakta zorlanıyor.</p>
                                </div>
                                <div role="none" className="bg-border shrink-0 h-px w-full lg:hidden"></div>
                                <div>
                                    <h2 className="text-xl font-semibold">Yaklaşım</h2>
                                    <p className="mt-3 text-muted-foreground">Sürdürülebilirlik ilkelerini merkeze alan, teknoloji destekli yeni nesil iş modelleri geliştirerek sektörü dönüştürmek.</p>
                                </div>
                                <div className="border-t pt-10 lg:col-span-2">
                                    <h2 className="text-xl font-semibold">Sonuçlar</h2>
                                    <ul className="mt-3 grid gap-x-10 gap-y-3 lg:grid-cols-2">
                                        <li className="flex gap-3">
                                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                                            <p className="font-semibold">Karbon ayak izini azaltan çözümler</p>
                                        </li>
                                        <li className="flex gap-3">
                                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                                            <p className="font-semibold">Yerel ekonomileri destekleyen platformlar</p>
                                        </li>
                                        <li className="flex gap-3">
                                            <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                                            <p className="font-semibold">Küresel pazarda rekabetçi girişimler</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Article Body */}
                            <div className="mt-20">
                                <section id="section1" className="prose mb-8 dark:prose-invert max-w-none">
                                    <h2>Sürdürülebilirlik Vizyonu</h2>
                                    <p>Turizmin geleceği, doğal kaynakların korunmasına ve kültürel mirasın yaşatılmasına bağlıdır. UGKTED olarak, bu vizyonu paylaşan girişimcileri destekliyoruz.</p>
                                    <blockquote>
                                        "Sürdürülebilirlik bir varış noktası değil, sürekli devam eden bir yolculuktur."
                                    </blockquote>
                                </section>

                                <section id="section2" className="prose mb-8 dark:prose-invert max-w-none">
                                    <h2>Girişimcilik Fırsatları</h2>
                                    <p>Yeni nesil turistler, sadece tatil yapmak değil, gittikleri bölgeye değer katmak istiyorlar. Bu durum, sosyal girişimcilik için büyük bir alan açıyor:</p>
                                    <ul>
                                        <li><strong>Ekoturizm:</strong> Doğayla uyumlu konaklama deneyimleri.</li>
                                        <li><strong>Kültür Rotaları:</strong> Yerel hikayeleri öne çıkaran turlar.</li>
                                        <li><strong>Dijital Rehberlik:</strong> AR/VR destekli tanıtım uygulamaları.</li>
                                    </ul>
                                </section>

                                <section id="section3" className="prose mb-8 dark:prose-invert max-w-none">
                                    <h2>Eğitim ve Kapasite Geliştirme</h2>
                                    <p>Sektördeki insan kaynağının niteliğini artırmak, dönüşümün en önemli ayağıdır. Düzenlediğimiz eğitim programları ile genç profesyonellere yeni yetkinlikler kazandırıyoruz.</p>
                                    <div className="relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start bg-card text-card-foreground my-6">
                                        <Lightbulb className="h-4 w-4 mt-0.5 text-primary" />
                                        <div className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight">Önemli Not</div>
                                        <div className="text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm">
                                            <p>Girişimcilik başvuruları her ayın ilk haftası web sitemiz üzerinden alınmaktadır.</p>
                                        </div>
                                    </div>
                                </section>
                                <section id="section4" className="prose mb-8 dark:prose-invert max-w-none">
                                    <h2>Geleceğe Bakış</h2>
                                    <div>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-left">Geleneksel Turizm</th>
                                                    <th className="text-left">Sürdürülebilir Turizm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-t">
                                                    <td className="py-2">Kitle odaklı</td>
                                                    <td className="py-2">Deneyim odaklı</td>
                                                </tr>
                                                <tr className="border-t bg-muted/50">
                                                    <td className="py-2">Kaynak tüketimi</td>
                                                    <td className="py-2">Kaynak koruma</td>
                                                </tr>
                                                <tr className="border-t">
                                                    <td className="py-2">Kısa vadeli kar</td>
                                                    <td className="py-2">Uzun vadeli değer</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>

                        </div>

                        {/* Table of Contents - Right Sidebar */}
                        <div className="sticky top-32 hidden h-fit shrink-0 lg:block w-48 ml-10">
                            <span className="flex items-center gap-2 text-sm font-semibold mb-4">
                                <TextAlignStart className="h-4 w-4" />
                                İçindekiler
                            </span>
                            <nav className="text-sm border-l pl-4">
                                <ul className="space-y-3">
                                    <li><a href="#section1" className="block text-muted-foreground hover:text-primary transition-colors">Sürdürülebilirlik Vizyonu</a></li>
                                    <li><a href="#section2" className="block text-muted-foreground hover:text-primary transition-colors">Girişimcilik Fırsatları</a></li>
                                    <li><a href="#section3" className="block text-muted-foreground hover:text-primary transition-colors">Eğitim ve Gelişim</a></li>
                                    <li><a href="#section4" className="block text-muted-foreground hover:text-primary transition-colors">Geleceğe Bakış</a></li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
                <div className="flex items-center gap-2 mt-16 pt-8 border-t">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Blog&apos;a Dön</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
