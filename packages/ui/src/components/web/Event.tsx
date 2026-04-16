"use client";

import Image from "next/image";
import {
  ArrowRight,
  Users,
  Briefcase,
  Globe,
  Mic,
  Palette,
  BookOpen,
  Handshake,
  Cpu,
  Music,
  Camera,
  Award,
  Coffee,
  Building,
  Wrench,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { cn } from "@repo/ui/lib/utils";

/** Unsplash — apps/web next.config images.remotePatterns */
const EV_IMG = {
  summit:
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&q=80&auto=format&fit=crop",
  culture:
    "https://images.unsplash.com/photo-1461301214746-1e790926d323?w=900&q=80&auto=format&fit=crop",
  workshop:
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80&auto=format&fit=crop",
  network:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format&fit=crop",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop",
} as const;

export type EventsCarouselProps = {
  /** Tam sayfa yerine içerik bloğu olarak kullanıldığında üst boşlukları sıfırlar */
  embedInPage?: boolean;
};

export default function EventsPage({ embedInPage }: EventsCarouselProps = {}) {
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Carousel data
  const carouselData = [
    {
      id: 1,
      slug: "uluslararasi-girisimcilik-zirvesi",
      image: EV_IMG.summit,
      icon1: <Mic className="m-auto size-4" />,
      icon2: <Users className="m-auto size-4" />,
      status: "Kayıtlar Başladı",
      title: "Uluslararası Girişimcilik Zirvesi",
      description: "Dünyanın dört bir yanından girişimcileri ve yatırımcıları bir araya getiren büyük buluşma."
    },
    {
      id: 2,
      slug: "kultur-ve-sanat-gunleri",
      image: EV_IMG.culture,
      icon1: <Palette className="m-auto size-4" />,
      icon2: <Music className="m-auto size-4" />,
      status: "Yakında",
      title: "Kültür ve Sanat Günleri",
      description: "Farklı kültürlerin sanatla buluştuğu sergiler ve performanslar."
    },
    {
      id: 3,
      slug: "egitim-ve-atolye-calismalari",
      image: EV_IMG.workshop,
      icon1: <BookOpen className="m-auto size-4" />,
      icon2: <Briefcase className="m-auto size-4" />,
      status: "Devam Ediyor",
      title: "Eğitim ve Atölye Çalışmaları",
      description: "Geleceğin yetkinliklerini kazandıran interaktif eğitimler."
    },
    {
      id: 4,
      slug: "networking-bulusmalari",
      image: EV_IMG.network,
      icon1: <Handshake className="m-auto size-4" />,
      icon2: <Coffee className="m-auto size-4" />,
      status: "Davetiye ile",
      title: "Networking Buluşmaları",
      description: "Sektör liderleriyle tanışma ve iş birliği fırsatları."
    },
    {
      id: 5,
      slug: "teknoloji-ve-inovasyon-fuari",
      image: EV_IMG.tech,
      icon1: <Cpu className="m-auto size-4" />,
      icon2: <Globe className="m-auto size-4" />,
      status: "Planlanıyor",
      title: "Teknoloji ve İnovasyon Fuarı",
      description: "En yeni teknolojilerin sergilendiği ve startupların tanıtıldığı fuar."
    },
    // Repated items to fill carousel visual
    {
      id: 6,
      image: EV_IMG.summit,
      icon1: <Award className="m-auto size-4" />,
      icon2: <Users className="m-auto size-4" />,
      status: "Tamamlandı",
      title: "Yılın Girişimcisi Ödülleri",
      description: "Başarılı girişimcilerin ödüllendirildiği gala gecesi."
    },
    {
      id: 7,
      image: EV_IMG.culture,
      icon1: <Camera className="m-auto size-4" />,
      icon2: <Palette className="m-auto size-4" />,
      status: "Açık",
      title: "Fotoğraf Yarışması Sergisi",
      description: "Kültürel miras temalı fotoğraf yarışması sonuç sergisi."
    },
    {
      id: 8,
      image: EV_IMG.workshop,
      icon1: <Building className="m-auto size-4" />,
      icon2: <BookOpen className="m-auto size-4" />,
      status: "Kontenjan Dolu",
      title: "Startup Hukuku Semineri",
      description: "Girişimciler için hukuki süreçler hakkında bilgilendirme."
    },
    {
      id: 9,
      image: EV_IMG.network,
      icon1: <Users className="m-auto size-4" />,
      icon2: <Globe className="m-auto size-4" />,
      status: "Başvuru Bekleniyor",
      title: "Yurt Dışı Yatırım Turu",
      description: "Yurt dışı pazarlara açılmak isteyenler için keşif gezisi."
    },
    {
      id: 10,
      image: EV_IMG.tech,
      icon1: <Wrench className="m-auto size-4" />,
      icon2: <Cpu className="m-auto size-4" />,
      status: "Hazırlık Aşamasında",
      title: "Maker Faire İstanbul",
      description: "Kendin yap kültürü ve teknoloji meraklıları buluşması."
    },
  ];

  const nextSlide = () => {
    setCurrentCarouselSlide((prev) => {
      const maxSlides = windowWidth >= 1024 ? carouselData.length - 3 :
        windowWidth >= 768 ? carouselData.length - 2 :
          carouselData.length - 1;
      return prev >= maxSlides ? prev : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentCarouselSlide((prev) => prev > 0 ? prev - 1 : prev);
  };

  const getTranslateX = () => {
    if (windowWidth >= 1024) {
      // Desktop: show 3 items, translate by 33.333% per slide
      return -(currentCarouselSlide * (100 / 3));
    } else if (windowWidth >= 768) {
      // Tablet: show 2 items, translate by 50% per slide
      return -(currentCarouselSlide * 50);
    } else {
      // Mobile: show 1 item, translate by 100% per slide
      return -(currentCarouselSlide * 100);
    }
  };

  const getMaxSlides = () => {
    return windowWidth >= 1024 ? carouselData.length - 3 :
      windowWidth >= 768 ? carouselData.length - 2 :
        carouselData.length - 1;
  };

  return (
    <>
      <section
        className={cn(
          "relative w-full rounded-t-2xl bg-muted/20 rounded-b-[36px]  dark:from-amber-950 overflow-hidden",
          embedInPage ? "mt-0" : "mt-2.5"
        )}
      >
        <section className="">
          <div className="container mx-auto px-4">
            {!embedInPage ? (
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <h2 className="mx-auto max-w-[21.875rem] text-center text-4xl leading-none font-medium md:max-w-[28.125rem] md:text-5xl lg:max-w-[35rem] lg:text-6xl">
                  UGKTED Etkinlikleri
                </h2>
                <p className="mx-auto max-w-[21.875rem] text-center text-lg font-medium md:max-w-[28.125rem] md:text-xl lg:max-w-[35rem] lg:text-2xl">
                  Girişimcilik, kültür, turizm ve eğitim alanında uluslararası organizasyonlar,
                  zirveler, atölyeler ve networking buluşmaları.
                </p>
              </div>
            ) : (
              <p className="sr-only">Öne çıkan etkinlikler</p>
            )}
            <div className="relative w-full overflow-hidden" role="region" aria-roledescription="carousel" data-slot="carousel">
              <div className="overflow-hidden" data-slot="carousel-content">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translate3d(${getTranslateX()}%, 0px, 0px)` }}
                >
                  {carouselData.map((item, index) => (
                    <div key={item.id} role="group" aria-roledescription="slide" data-slot="carousel-item" className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3 [content-visibility:auto] [contain-intrinsic-size:0_280px]">
                      <div className="p-1">
                        <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 shadow-none">
                          <div data-slot="card-content" className="flex flex-col p-0">
                            {/** Detail öncelikli yönlendirme: slug varsa her zaman detail sayfasına gider */}
                            {(() => {
                              const detailHref = item.slug ? `/events/${item.slug}` : "/contact";
                              return (
                                <>
                            <Link
                              href={detailHref}
                              className="group block"
                              aria-label={`${item.title} detay sayfasına git`}
                            >
                              <div className="relative flex aspect-[0.935802469] w-full flex-col items-center justify-between overflow-hidden rounded-2xl p-7">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                                  sizes="(max-width: 768px) 100vw, 400px"
                                />
                                <div className="flex size-full flex-1"></div>
                                <div className="h-12 w-full">
                                  <div className="mx-auto mb-8 flex w-full max-w-[15rem] items-center justify-center gap-4 rounded-full backdrop-blur-sm px-3 py-2.5 ">
                                    <div className="shrink-0">
                                      <div className="flex -space-x-2">
                                        <div className="flex size-7 rounded-full border bg-white">
                                          {item.icon1}
                                        </div>
                                        <div className="flex size-7 rounded-full border bg-white">
                                          {item.icon2}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-sm font-medium text-white">{item.status}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex w-full flex-col gap-1 pt-6">
                                <h3 className="text-xl font-medium text-foreground transition-colors group-hover:text-primary">
                                  {item.title}
                                </h3>
                                <p className="text-sm">{item.description}</p>
                              </div>
                            </Link>
                            <div className="flex w-full flex-col gap-1 pt-3">
                              <div className="mt-3">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="text-xs h-7 px-3 bg-[#fafafa] border-black/10"
                                  asChild
                                >
                                  <Link href={detailHref}>
                                    Detayı gör / kayıt
                                    <ArrowRight className="ml-1 w-3 h-3" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={prevSlide}
                  data-slot="carousel-previous"
                  aria-label="Önceki etkinlik"
                  className="inline-flex items-center border-black/10 justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-full top-1/2 -left-12 static size-12 translate-y-0"
                  disabled={currentCarouselSlide === 0}
                >
                  <ArrowRight className="rotate-180" />
                  <span className="sr-only">Önceki</span>
                </button>
                <button
                  onClick={nextSlide}
                  data-slot="carousel-next"
                  aria-label="Sonraki etkinlik"
                  className="inline-flex items-center border-black/10 justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-full top-1/2 -right-12 static size-12 translate-y-0"
                  disabled={currentCarouselSlide >= getMaxSlides()}
                >
                  <ArrowRight />
                  <span className="sr-only">Sonraki</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>


    </>
  );
}
