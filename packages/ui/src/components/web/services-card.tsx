"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface Service {
  title: string;
  badge: string;
  price: string;
  href: string;
  image: string;
  hoverImage: string;
}

interface ServicesCarouselProps {
  heading?: string;
  services?: Service[];
  description?: string;
}

const defaultServices: Service[] = [
  {
    title: "Proje Danışmanlığı",
    badge: "Stratejik Planlama",
    price: "Ön Görüşme",
    href: "/services/consultancy",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Girişimcilik Eğitimleri",
    badge: "Sertifikalı Programlar",
    price: "Başvuruya Açık",
    href: "/services/training",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Yatırımcı Ağı",
    badge: "Global Bağlantılar",
    price: "Üyelere Özel",
    href: "/services/networking",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Kültür & Sanat Etkinlikleri",
    badge: "Sosyal Etki",
    price: "Etkinlik Takvimi",
    href: "/services/culture",
    image:
      "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Turizm Projeleri",
    badge: "Sürdürülebilir Turizm",
    price: "Proje Bazlı",
    href: "/services/tourism",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Hibe ve Fon Danışmanlığı",
    badge: "Finansal Destek",
    price: "Profesyonel Destek",
    href: "/services/grants",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    hoverImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
  },
];

export function ServicesCarousel({
  heading = "Hizmetlerimiz ve Desteklerimiz",
description = "Uluslararası iş birlikleri, eğitim programları ve girişimcilik destekleriyle üyelerimize ve paydaşlarımıza değer katıyor; sürdürülebilir projeler geliştirmelerine rehberlik ediyoruz.",

  services = defaultServices,
}: ServicesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const TRACK_WIDTH = 240;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < maxScroll - 1);
    setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 334 + 16; // min-w + gap
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const thumbWidth = 30;
  const thumbOffset = scrollProgress * (TRACK_WIDTH - thumbWidth);

  return (
    <section className="py-32 w-full lg:m-16 m-2">
      <div className="px-4 lg:px-10 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
            <p className="text-black/90 text-sm md:text-base leading-relaxed max-w-2xl">{description}</p>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-black/10"
              disabled={!canScrollLeft}
              onClick={() => scroll("left")}
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-black/10"
              disabled={!canScrollRight}
              onClick={() => scroll("right")}
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div role="region" aria-roledescription="carousel" className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 pb-10 lg:px-10 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                role="group"
                aria-roledescription="slide"
                className="min-w-[334px] flex-1"
              >
                <a
                  href={service.href}
                  className="group relative flex h-full flex-col items-start justify-start gap-2"
                >
                  <div className="w-full">
                    <div className="group relative z-10 aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image
                        alt={service.title}
                        className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                        src={service.image}
                        fill
                        sizes="(max-width: 768px) 334px, 400px"
                      />
                      <Image
                        alt={`${service.title} hover`}
                        className="absolute inset-0 z-10 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        src={service.hoverImage}
                        fill
                        sizes="(max-width: 768px) 334px, 400px"
                      />
                      <Badge
                        variant="outline"
                        className="absolute top-4 left-4 border bg-background px-4 py-2"
                      >
                        {service.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3>{service.title}</h3>
                    <span>
                      <span>{service.price}</span>
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-muted">
          <div
            className="h-[2px] rounded bg-red-500 transition-transform duration-300 ease-out"
            style={{
              width: `${thumbWidth}px`,
              transform: `translateX(${thumbOffset}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
