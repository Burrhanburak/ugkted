"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "UGKTED etkinliğinde projemi ilk kez yatırımcı karşısında sunma fırsatı buldum. Aldığım geri bildirimler iş modelimizi netleştirmemizi sağladı.",
    author: "Ali Yılmaz",
    role: "Girişimci",
    company: "EduStart",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote:
      "AB destekli projeye katılım süreci oldukça profesyoneldi. Farklı ülkelerden girişimcilerle bağlantı kurmam kariyerimde önemli bir adım oldu.",
    author: "Elif Demir",
    role: "Proje Katılımcısı",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    quote:
      "Genç girişimcilerle bir araya gelmek ve projelerini dinlemek bizim için değerliydi. İş birliği süreçleri oldukça sistematik ilerledi.",
    author: "Murat Kara",
    role: "İş Geliştirme Müdürü",
    company: "NovaTech",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: 4,
    quote:
      "Mentorluk programı süresince düzenli geri bildirim almak motivasyonumu artırdı. Özellikle network desteği çok kıymetliydi.",
    author: "Zeynep Çelik",
    role: "Startup Kurucusu",
    company: "GreenLab",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 5,
    quote:
      "Etkinlik organizasyonu ve iletişim süreçleri oldukça şeffaftı. Kültür ve girişimciliği bir araya getiren nadir platformlardan biri.",
    author: "Ahmet Arslan",
    role: "Etkinlik Katılımcısı",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

export default function TestimonialsComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = testimonials.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative py-24 w-full overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-full px-4 flex flex-col items-center text-center gap-8"
              >
                <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed max-w-3xl">
                  “{testimonial.quote}”
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-left">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && `, ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-500 scale-110"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
