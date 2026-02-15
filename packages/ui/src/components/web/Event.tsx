'use client';

import Image from "next/image";
import { ArrowRight, CheckCircle, Users, FileText, Briefcase, Globe, Hammer, UtensilsCrossed, Wrench, Car, Mic, Palette, BookOpen, Handshake, Cpu, Music, Camera, Award, Coffee, Building } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState(0);
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
      image: "/images/event_summit.png",
      icon1: <Mic className="m-auto size-4" />,
      icon2: <Users className="m-auto size-4" />,
      status: "Kayıtlar Başladı",
      title: "Uluslararası Girişimcilik Zirvesi",
      description: "Dünyanın dört bir yanından girişimcileri ve yatırımcıları bir araya getiren büyük buluşma."
    },
    {
      id: 2,
      image: "/images/event_culture.png",
      icon1: <Palette className="m-auto size-4" />,
      icon2: <Music className="m-auto size-4" />,
      status: "Yakında",
      title: "Kültür ve Sanat Günleri",
      description: "Farklı kültürlerin sanatla buluştuğu sergiler ve performanslar."
    },
    {
      id: 3,
      image: "/images/event_workshop.png",
      icon1: <BookOpen className="m-auto size-4" />,
      icon2: <Briefcase className="m-auto size-4" />,
      status: "Devam Ediyor",
      title: "Eğitim ve Atölye Çalışmaları",
      description: "Geleceğin yetkinliklerini kazandıran interaktif eğitimler."
    },
    {
      id: 4,
      image: "/images/event_networking.png",
      icon1: <Handshake className="m-auto size-4" />,
      icon2: <Coffee className="m-auto size-4" />,
      status: "Davetiye ile",
      title: "Networking Buluşmaları",
      description: "Sektör liderleriyle tanışma ve iş birliği fırsatları."
    },
    {
      id: 5,
      image: "/images/event_tech.png",
      icon1: <Cpu className="m-auto size-4" />,
      icon2: <Globe className="m-auto size-4" />,
      status: "Planlanıyor",
      title: "Teknoloji ve İnovasyon Fuarı",
      description: "En yeni teknolojilerin sergilendiği ve startupların tanıtıldığı fuar."
    },
    // Repated items to fill carousel visual
    {
      id: 6,
      image: "/images/event_summit.png",
      icon1: <Award className="m-auto size-4" />,
      icon2: <Users className="m-auto size-4" />,
      status: "Tamamlandı",
      title: "Yılın Girişimcisi Ödülleri",
      description: "Başarılı girişimcilerin ödüllendirildiği gala gecesi."
    },
    {
      id: 7,
      image: "/images/event_culture.png",
      icon1: <Camera className="m-auto size-4" />,
      icon2: <Palette className="m-auto size-4" />,
      status: "Açık",
      title: "Fotoğraf Yarışması Sergisi",
      description: "Kültürel miras temalı fotoğraf yarışması sonuç sergisi."
    },
    {
      id: 8,
      image: "/images/event_workshop.png",
      icon1: <Building className="m-auto size-4" />,
      icon2: <BookOpen className="m-auto size-4" />,
      status: "Kontenjan Dolu",
      title: "Startup Hukuku Semineri",
      description: "Girişimciler için hukuki süreçler hakkında bilgilendirme."
    },
    {
      id: 9,
      image: "/images/event_networking.png",
      icon1: <Users className="m-auto size-4" />,
      icon2: <Globe className="m-auto size-4" />,
      status: "Başvuru Bekleniyor",
      title: "Yurt Dışı Yatırım Turu",
      description: "Yurt dışı pazarlara açılmak isteyenler için keşif gezisi."
    },
    {
      id: 10,
      image: "/images/event_tech.png",
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

  const tabs = [
    {
      id: 'planning',
      title: 'Etkinlik Planlama',
      content: {
        title: 'Profesyonel Etkinlik Yönetimi',
        subtitle: 'Fikir aşamasından uygulamaya kadar titiz planlama.',
        description: 'Her etkinliğin başarısı, detaylı bir planlama sürecine bağlıdır. Ekibimiz, vizyonunuzu gerçeğe dönüştürmek için stratejik bir yol haritası oluşturur.',
        detail: 'Bütçe yönetimi, mekan seçimi, zaman çizelgesi oluşturma ve kaynak planlaması konularında uzman desteği sağlıyoruz.',
        footer: 'Daha iyi organizasyonlar için yanınızdayız.',
        icon: <Briefcase className="w-24 h-24 text-[#eb0010]" />,
        bgColor: 'from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20'
      }
    },
    {
      id: 'participation',
      title: 'Katılım Süreci',
      content: {
        title: 'Kolay ve Hızlı Katılım',
        subtitle: 'Etkinliklerimize katılmak artık çok daha pratik.',
        description: 'Online kayıt sistemimiz sayesinde dilediğiniz etkinliğe saniyeler içinde başvurabilirsiniz. QR kodlu bilet sistemi ile girişlerde bekleme yapmazsınız.',
        detail: 'Mobil uygulamamız üzerinden etkinlik programını takip edebilir, konuşmacılara soru sorabilir ve anketlere katılabilirsiniz.',
        footer: 'Teknoloji ile entegre deneyim.',
        icon: <CheckCircle className="w-24 h-24 text-green-600" />,
        bgColor: 'from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20'
      }
    },
    {
      id: 'sponsorship',
      title: 'Sponsorluk İmkanları',
      content: {
        title: 'Markanızı Görünür Kılın',
        subtitle: 'Hedef kitlenize doğrudan ulaşma fırsatı.',
        description: 'UGKTED etkinlikleri, markanızın değerini artırmak ve yeni iş birlikleri kurmak için mükemmel bir platform sunar.',
        detail: 'Stand alanları, oturum sponsorlukları, dijital reklam alanları ve özel networking fırsatları ile markanızı öne çıkarın.',
        footer: 'Birlikte büyüyelim.',
        icon: <Globe className="w-24 h-24 text-purple-600" />,
        bgColor: 'from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20'
      }
    }
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const router = useRouter();

  return (
    <>
      <section className="relative w-full mt-2.5 rounded-t-2xl rounded-b-[36px]  py-10 dark:from-amber-950 overflow-hidden">
        <section className="">
          <div className="container mx-auto px-4">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <h2 className="mx-auto max-w-[21.875rem] text-center text-4xl leading-none font-medium md:max-w-[28.125rem] md:text-5xl lg:max-w-[35rem] lg:text-6xl">
                UGKTED Etkinlikleri
              </h2>
              <p className="mx-auto max-w-[21.875rem] text-center text-lg font-medium md:max-w-[28.125rem] md:text-xl lg:max-w-[35rem] lg:text-2xl">
                Girişimcilik, kültür, turizm ve eğitim alanında uluslararası organizasyonlar, zirveler, atölyeler ve networking buluşmaları.
              </p>
            </div>
            <div className="relative w-full overflow-hidden" role="region" aria-roledescription="carousel" data-slot="carousel">
              <div className="overflow-hidden" data-slot="carousel-content">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translate3d(${getTranslateX()}%, 0px, 0px)` }}
                >
                  {carouselData.map((item, index) => (
                    <div key={item.id} role="group" aria-roledescription="slide" data-slot="carousel-item" className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3 [content-visibility:auto] [contain-intrinsic-size:0_280px]">
                      <div className="p-1">
                        <div data-slot="card" className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6  shadow-none">
                          <div data-slot="card-content" className="flex flex-col p-0">
                            <div className="relative flex aspect-[0.935802469] w-full flex-col items-center justify-between overflow-hidden rounded-2xl p-7">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover object-center -z-10"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
                              <div className="flex size-full flex-1"></div>
                              <div className="h-12 w-full">
                                <div className="mx-auto mb-8 flex w-full max-w-[15rem] items-center justify-center gap-4 rounded-full backdrop-blur-sm px-3 py-2.5 shadow-xl">
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
                              <h3 className="text-xl font-medium text-foreground">{item.title}</h3>
                              <p className="text-sm">{item.description}</p>
                              <div className="mt-3">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="text-xs h-7 px-3 bg-[#fafafa] border-black/10"
                                  onClick={() => {
                                    // Static routing for demo
                                    console.log("Details clicked for", item.title);
                                  }}
                                >
                                  Detayları İncele
                                  <ArrowRight className="w-3 h-3 ml-1" />
                                </Button>
                              </div>
                            </div>
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
