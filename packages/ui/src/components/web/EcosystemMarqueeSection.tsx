"use client";

import React from "react";
import {
    Network,
    Lightbulb,
    GraduationCap,
    Briefcase,
    Users,
    Globe,
    Handshake,
    TrendingUp,
    Award,
    BookOpen,
    Building,
    Rocket
} from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";

const ITEMS = [
    { icon: Network, label: "Networking" },
    { icon: Lightbulb, label: "İnovasyon" },
    { icon: GraduationCap, label: "Akademi" },
    { icon: Briefcase, label: "Kariyer" },
    { icon: Users, label: "Topluluk" },
    { icon: Globe, label: "Global Erişim" },
    { icon: Handshake, label: "İş Birlikleri" },
    { icon: TrendingUp, label: "Yatırım" },
    { icon: Award, label: "Sertifikasyon" },
    { icon: BookOpen, label: "Kaynaklar" },
    { icon: Building, label: "Kuluçka" },
    { icon: Rocket, label: "Girişimcilik" },
];

export default function EcosystemMarqueeSection() {
    return (
        <section className="py-12 w-full overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 text-center">
                    <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs font-medium border-red-500/20 bg-red-500/5 text-red-500">
                        Ekosistem
                    </Badge>
                    <h2 className="text-4xl font-semibold md:text-6xl text-balance">
                        Girişimcilik Yolculuğunuzu <br />
                        <span className="text-red-500">Hızlandırın</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                        UGKTED ekosistemi ile ihtiyacınız olan tüm araçlara, eğitimlere ve ağlara tek bir yerden erişin.
                    </p>
                </div>

                <div className="relative mt-16 max-w-full overflow-hidden">
                    {/* First Row - Forward */}
                    <div className="flex gap-4 overflow-hidden py-4">
                        <div className="flex shrink-0 gap-4 animate-marquee">
                            {[...ITEMS, ...ITEMS].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 rounded-full  bg-[#fafafa] px-4 py-2 ">
                                    <item.icon className="h-4 w-4 text-red-500  " />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex shrink-0 gap-4 animate-marquee" aria-hidden="true">
                            {[...ITEMS, ...ITEMS].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 rounded-full bg-[#fafafa] px-4 py-2 ">
                                    <item.icon className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Second Row - Reverse */}
                    <div className="flex gap-4 overflow-hidden py-4">
                        <div className="flex shrink-0 gap-4 animate-marquee-reverse">
                            {[...ITEMS, ...ITEMS].reverse().map((item, i) => (
                                <div key={i} className="flex items-center gap-2 rounded-full  bg-[#fafafa] px-4 py-2 ">
                                    <item.icon className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex shrink-0 gap-4 animate-marquee-reverse" aria-hidden="true">
                            {[...ITEMS, ...ITEMS].reverse().map((item, i) => (
                                <div key={i} className="flex items-center gap-2 rounded-full  bg-[#fafafa] px-4 py-2 ">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fade Gradients */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee-reverse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee-reverse {
             animation: marquee-reverse 40s linear infinite;
          }
        `}} />
            </div>
        </section>
    );
}
