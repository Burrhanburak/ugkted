"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock interfaces
interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_ru: string;
  name_az: string;
  name_tr: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  categories?: Category[];
  cover_image?: string;
  published_at: string;
  language: string;
  created_at: string;
  updated_at: string;
}

interface RecentBlogsSectionProps {
  title?: string;
  subtitle?: string;
  posts?: BlogPost[];
}

// Fake Data
const FAKE_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Sürdürülebilir Turizm ve Girişimcilik",
    slug: "surdurulebilir-turizm-ve-girisimcilik",
    content: "Turizm sektöründe sürdürülebilirlik odaklı yeni iş modelleri ve girişimcilik fırsatları tartışılıyor. Yerel kalkınma ve çevresel koruma dengesi nasıl sağlanmalı?",
    published_at: "2024-03-15",
    language: "tr",
    created_at: "2024-03-15",
    updated_at: "2024-03-15",
    cover_image: "https://images.unsplash.com/photo-1596386461350-326ea7750550?q=80&w=1000&auto=format&fit=crop",
    categories: [
      { id: 1, slug: "turizm", name_tr: "Turizm", name_en: "Tourism", name_ru: "Tourism", name_az: "Turizm" }
    ]
  },
  {
    id: 2,
    title: "Eğitimde Yapay Zeka Devrimi",
    slug: "egitimde-yapay-zeka-devrimi",
    content: "Yapay zeka teknolojilerinin eğitim sistemlerine entegrasyonu, kişiselleştirilmiş öğrenme deneyimleri ve geleceğin yetkinlikleri üzerine etkileri.",
    published_at: "2024-03-10",
    language: "tr",
    created_at: "2024-03-10",
    updated_at: "2024-03-10",
    cover_image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
    categories: [
      { id: 2, slug: "egitim", name_tr: "Eğitim", name_en: "Education", name_ru: "Education", name_az: "Təhsil" },
      { id: 3, slug: "teknoloji", name_tr: "Teknoloji", name_en: "Technology", name_ru: "Technology", name_az: "Texnologiya" }
    ]
  },
  {
    id: 3,
    title: "Kültürel Mirasın Korunması",
    slug: "kulturel-mirasin-korunmasi",
    content: "Geleneksel sanatların ve kültürel değerlerin modern dünyada yaşatılması için sivil toplum kuruluşlarının rolü ve önemi.",
    published_at: "2024-03-05",
    language: "tr",
    created_at: "2024-03-05",
    updated_at: "2024-03-05",
    cover_image: "https://images.unsplash.com/photo-1461301214746-1e790926d323?q=80&w=1000&auto=format&fit=crop",
    categories: [
      { id: 4, slug: "kultur", name_tr: "Kültür", name_en: "Culture", name_ru: "Culture", name_az: "Mədəniyyət" }
    ]
  }
];

const RecentBlogsSection: React.FC<RecentBlogsSectionProps> = ({
  title = "Güncel Gelişmeler",
  subtitle = "Son Haberler",
  posts: propPosts,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (propPosts) {
        setPosts(propPosts);
      } else {
        await new Promise(resolve => setTimeout(resolve, 500));
        setPosts(FAKE_POSTS);
      }
      setLoading(false);
    };

    loadData();
  }, [propPosts]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const createExcerpt = (content: string, maxLength: number = 100): string => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  if (loading) {
    return (
      <section className="py-32 w-full container">
        <div className="flex justify-center">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 w-full">
      <div className="container  md:px-6">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:gap-16">
          {/* Left Column: Label */}
          <div className="flex w-full max-w-56 items-center gap-3 text-sm font-medium">
            <span className="size-2 rounded-full bg-red-500 shrink-0"></span>
            Gündem (Haberler)
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl mb-2">
              Bizi Takip Edin<br />
              <span className="text-muted-foreground font-normal">Son gelişmeleri keşfedin.</span>
            </h2>

            <div className="mt-14 w-full">
              {/* Separator */}
              <div data-orientation="horizontal" role="none" className="bg-border shrink-0 h-px w-full" />

              {/* List Items */}
              {posts.map((post) => (
                <React.Fragment key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between gap-6 py-8 transition-all duration-300 lg:flex-row lg:items-center lg:hover:bg-muted/50 rounded-lg px-2 -mx-2"
                  >
                    {/* Title and Excerpt */}
                    <div className="flex flex-col gap-2 max-w-2xl transition-all duration-300 lg:group-hover:translate-x-4">
                      <p className="inline text-xl font-medium text-foreground group-hover:text-red-500 transition-colors">
                        {post.title}
                        <ArrowRight className="ml-2 inline size-5 shrink-0 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {createExcerpt(post.content)}
                      </p>
                    </div>

                    {/* Meta Info: Category, Avatar, Date */}
                    <div className="flex w-full items-center justify-between transition-all duration-300 lg:max-w-xs lg:group-hover:-translate-x-2 gap-4">
                      <div className="flex flex-wrap gap-2">
                        {post.categories?.map((cat) => (
                          <span key={cat.id} className="text-xs font-semibold text-white bg-red-500 px-2 py-1 rounded-full">
                            {cat.name_tr}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="relative flex shrink-0 overflow-hidden size-8 rounded-full border border-border">
                          <Image
                            src="/green-elza.svg" // Using local placeholder
                            alt="Avatar"
                            fill
                            className="object-cover"
                          />
                        </span>
                        <time className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(post.published_at)}
                        </time>
                      </div>
                    </div>
                  </Link>
                  <div data-orientation="horizontal" role="none" className="bg-border shrink-0 h-px w-full" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogsSection;
