"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { ArrowLeftIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/ui/avatar";

// Mock Data
const BLOG_POSTS = [
    {
        id: 1,
        title: "Geleceğin Turizmi: Sürdürülebilirlik ve İnovasyon",
        slug: "gelecegin-turizmi-surdurulebilirlik-ve-inovasyon",
        category: "Turizm",
        excerpt: "Turizm sektöründe dijitalleşme ve çevre dostu uygulamaların yükselişi. Yerel ekonomileri kalkındıran yeni iş modellerini keşfedin.",
        image: "https://images.unsplash.com/photo-1596386461350-326ea7750550?q=80&w=1000&auto=format&fit=crop",
        author: "Ahmet Yılmaz",
        date: "15 Ocak 2026",
        avatar: "/green-elza.svg"
    },
    {
        id: 2,
        title: "Eğitimde Teknoloji Devrimi",
        slug: "egitimde-teknoloji-devrimi",
        category: "Eğitim",
        excerpt: "Yapay zeka ve sanal gerçeklik teknolojilerinin eğitimde yarattığı fırsatlar. Geleceğin sınıfları nasıl olacak?",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
        author: "Zeynep Çelik",
        date: "12 Ocak 2026",
        avatar: "/green-elza.svg"
    },
    {
        id: 3,
        title: "Kültürel Girişimcilik: Değer Yaratmak",
        slug: "kulturel-girisimcilik-deger-yaratmak",
        category: "Kültür",
        excerpt: "Sanat ve kültürü iş modelleriyle birleştirerek toplumsal etki yaratmak. Yaratıcı endüstrilerde başarı hikayeleri.",
        image: "https://images.unsplash.com/photo-1461301214746-1e790926d323?q=80&w=1000&auto=format&fit=crop",
        author: "Mehmet Demir",
        date: "10 Ocak 2026",
        avatar: "/green-elza.svg"
    }
];

export default function BlogListPage() {
    return (
        <section className="py-20 md:py-32 w-full">
            <div className="container px-6">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Anasayfa</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Blog</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="mb-8 md:mb-14 lg:mb-16">
                    <div className="flex items-start justify-between gap-8">
                        <div>
                            <h1 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl text-foreground">
                                Blog
                            </h1>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Girişimcilik, kültür, turizm ve eğitim üzerine içgörüler ve makaleler.
                    </p>
                </div>

                <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
                    {BLOG_POSTS.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
                            <div className="mb-4 flex overflow-hidden rounded-xl md:mb-5 aspect-[3/2] relative">
                                <div className="transition-transform duration-300 group-hover:scale-105 w-full h-full relative">
                                    <Image
                                        alt={post.title}
                                        src={post.image}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </div>

                            <div>
                                <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium">
                                    {post.category}
                                </Badge>
                            </div>

                            <div className="mb-2 line-clamp-2 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl text-foreground group-hover:text-primary transition-colors">
                                {post.title}
                            </div>

                            <div className="mb-4 line-clamp-3 text-sm text-muted-foreground md:mb-5 md:text-base">
                                {post.excerpt}
                            </div>

                            <div className="flex items-center gap-2 mt-auto">
                                <div className="relative flex shrink-0 overflow-hidden rounded-full size-10 border border-border">
                                    {/* Placeholder avatar or initial */}
                                    <div className="flex bg-muted items-center justify-center w-full h-full text-xs font-bold">
                                        {post.author.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-px">
                                    <span className="text-sm font-medium text-foreground">{post.author}</span>
                                    <span className="text-xs text-muted-foreground">{post.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Anasayfaya Dön</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
