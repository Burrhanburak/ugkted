'use client'

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import dynamic from "next/dynamic";

const Warp = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.Warp),
  { ssr: false }
);

export function CTASectionNew() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-12 w-full flex justify-center items-center px-4 md:px-6">
      <div
        className="w-full max-w-7xl relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-[48px] bbg-card min-h-[600px] md:min-h-[600px] flex flex-col items-center justify-center duration-500">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
            <Warp
              width={1280}
              height={720}
              colors={["#ffffff", "#eb0010", "#ffffff"]}
              proportion={0.24}
              softness={1}
              distortion={0.21}
              swirl={0.57}
              swirlIterations={10}
              shape="edge"
              shapeScale={0.75}
              speed={4.2}
              scale={2}
            />
          </div>

          <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eb0010] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#eb0010]"></span>
              </span>
              UGKTED
            </div>

            {/* Headline */}
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white mb-8 leading-[1.05]">
              Birlikte Üretmek, <br />
              <span className="text-white">Paylaşmak ve Gelişmek</span>
            </h2>

            {/* Description */}
            <p className="text-white text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
              UGKTED ailesine katılın. Girişimciler, akademisyenler ve genç liderlerle buluşun; girişimcilik, kültür, turizm ve eğitim alanında geleceği birlikte inşa edelim.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 backdrop-blur-sm bg-white/5 px-12 text-base font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-primary/20"
              >
                <span className="relative z-10">Giriş Yap</span>
                <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/register"
                className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-white px-12 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Üye Ol</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}