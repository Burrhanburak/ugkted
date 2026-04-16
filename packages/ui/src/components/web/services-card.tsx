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
    href: "/services/girisimcilik-ve-proje-danismanligi",
    image: "/cdn/gallery/kurumsal-iletisim.webp",
    hoverImage: "/cdn/gallery/yardim-rehberi.webp",
  },
  {
    title: "Girişimcilik Eğitimleri",
    badge: "Sertifikalı Programlar",
    price: "Başvuruya Açık",
    href: "/services/mentorluk-ve-kapasite-gelistirme",
    image: "/cdn/gallery/yardim-rehberi.webp",
    hoverImage: "/cdn/gallery/dernek-vakif.webp",
  },
  {
    title: "Uluslararası İş Birliği",
    badge: "Global Bağlantılar",
    price: "Üyelere Özel",
    href: "/services/uluslararasi-is-birligi-ve-ag-gelistirme",
    image: "/cdn/gallery/dernek-vakif.webp",
    hoverImage: "/cdn/gallery/haber-merkezi.webp",
  },
  {
    title: "Kültür & Sanat Etkinlikleri",
    badge: "Sosyal Etki",
    price: "Etkinlik Takvimi",
    href: "/services/kultur-sanat-ve-topluluk-programlari",
    image: "/cdn/gallery/haber-merkezi.webp",
    hoverImage: "/cdn/gallery/kurumsal-iletisim.webp",
  },
  {
    title: "Turizm Projeleri",
    badge: "Sürdürülebilir Turizm",
    price: "Proje Bazlı",
    href: "/services/turizm-ve-yerel-kalkinma-programlari",
    image: "/cdn/gallery/dernek-kurulus.webp",
    hoverImage: "/cdn/gallery/kurumsal-iletisim.webp",
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
