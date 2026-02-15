"use client";

import { useState } from "react";
import Image from "next/image";

interface TabData {
  id: string;
  image: string;
  label: string;
}

// w=800 for ~600px display – avoid 2070px downloads (40MB+ savings)
const tabsData: TabData[] = [
  {
    id: "education",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=75&w=800&auto=format&fit=crop",
    label: "Eğitim"
  },
  {
    id: "entrepreneurship",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=75&w=800&auto=format&fit=crop",
    label: "Girişimcilik"
  },
  {
    id: "culture",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=75&w=800&auto=format&fit=crop",
    label: "Kültür"
  },
  {
    id: "tourism",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=75&w=800&auto=format&fit=crop",
    label: "Turizm"
  }
];

const contentData: Record<string, any> = {
  education: {
    badge: "UGKTED AKADEMİ",
    title: "Geleceğin Liderleri İçin",
    subtitle: "Kapsamlı Eğitim Programları",
    description: "UGKTED Akademi ile kişisel ve profesyonel gelişiminize katkı sağlayın. Uzman eğitmenler eşliğinde sunduğumuz sertifikalı programlarla kariyerinize yön verin.",
    stats: ["Online Eğitimler", "Sertifika", "Mentörlük"],
    benefits: [
      "Uluslararası geçerliliğe sahip sertifikalar",
      "Sektör liderlerinden birebir mentorluk",
      "Sürekli güncellenen eğitim materyalleri",
      "Network odaklı öğrenme toplulukları"
    ],
    overlayStats: {
      stat1: { value: "500+", label: "Mezun" },
      stat2: { value: "50+", label: "Eğitmen" }
    }
  },
  entrepreneurship: {
    badge: "GİRİŞİMCİLİK EKOSİSTEMİ",
    title: "Fikirlerinizi",
    subtitle: "Gerçeğe Dönüştürün",
    description: "Girişimcilik yolculuğunuzda ihtiyacınız olan her şey burada. Yatırımcı buluşmaları, kuluçka merkezleri ve proje desteklerimizle yanınızdayız.",
    stats: ["Yatırımcı Ağı", "Kuluçka", "Hibe Destekleri"],
    benefits: [
      "Melek yatırımcı ağlarına erişim",
      "Proje geliştirme ve fizibilite desteği",
      "Hukuki ve mali danışmanlık",
      "Global pazarlara açılma fırsatı"
    ],
    overlayStats: {
      stat1: { value: "100+", label: "Startup" },
      stat2: { value: "₺10M+", label: "Yatırım" }
    }
  },
  culture: {
    badge: "KÜLTÜR & SANAT",
    title: "Köklerimizden",
    subtitle: "Geleceğe Köprü",
    description: "Kültürel mirasımızı koruyor ve tanıtıyoruz. Sanat etkinlikleri, sergiler ve kültürel gezilerle toplumsal hafızamızı canlı tutuyoruz.",
    stats: ["Sergiler", "Festivaller", "Sanat Atölyeleri"],
    benefits: [
      "Geleneksel sanat atölyeleri",
      "Uluslararası kültür festivalleri",
      "Tarihi ve kültürel geziler",
      "Sanatçı destek programları"
    ],
    overlayStats: {
      stat1: { value: "20+", label: "Etkinlik" },
      stat2: { value: "5K+", label: "Katılımcı" }
    }
  },
  tourism: {
    badge: "TURİZM & SEYAHAT",
    title: "Dünyayı",
    subtitle: "Keşfetmeye Hazır Olun",
    description: "Sürdürülebilir turizm projeleri ve özel gezi rotalarıyla dünyayı keşfedin. Hem öğrenin hem de eğlenin.",
    stats: ["Kültür Turları", "Eko-Turizm", "Yurt Dışı Gezileri"],
    benefits: [
      "Özel rehberli kültür turları",
      "Yurt dışı iş ve inceleme gezileri",
      "Doğa ve macera kampları",
      "Avantajlı seyahat paketleri"
    ],
    overlayStats: {
      stat1: { value: "30+", label: "Rota" },
      stat2: { value: "10+", label: "Ülke" }
    }
  }
};

export default function JobSeekerBenefitsTabs() {
  const [activeTab, setActiveTab] = useState("education");

  const currentTab = tabsData.find(tab => tab.id === activeTab) ?? tabsData[0]!;
  const currentTabData = contentData[activeTab] ?? contentData.education;

  return (
    <section className="py-32 mx-auto container px-3">
      <div className="container mx-auto px-0.5">
        <div className="flex-col grid grid-cols-1 gap-8 rounded-2xl  p-2 lg:grid-cols-2 lg:p-8 xl:gap-20">
          <div className="flex flex-col-reverse justify-between gap-8 lg:flex-col">
            <div>
              {/* Active Tab Content */}
              <div className="flex-1 outline-none flex animate-in flex-col gap-6 duration-300 fade-in">
                <span className="text-xs text-muted-foreground uppercase">{currentTabData.badge}</span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    {currentTabData.title}<br />
                    <span className="text-muted-foreground">{currentTabData.subtitle}</span>
                  </h2>
                  <p className="text-muted-foreground">
                    {currentTabData.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {currentTabData.stats.map((stat: string, index: number) => (
                    <span key={index} className={`text-xs px-2 py-1 rounded-full ${index === 0 ? 'bg-green-100 text-green-800' :
                      index === 1 ? 'bg-red-100 text-red-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Benefits List */}
                <div className="flex flex-col gap-3 mt-6">
                  {currentTabData.benefits.map((benefit: string, index: number) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-auto w-4" aria-hidden="true">
                          <path d="m9 12 2 2 4-4"></path>
                          <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"></path>
                          <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1"></path>
                        </svg>
                        {benefit}
                      </div>
                      <div className="bg-border shrink-0 h-px w-full mt-2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Buttons */}
            <div className="w-full max-w-full  pb-2 lg:pb-0 ">
              <div className="bg-[#fafafa] text-black inline-flex min-w-full lg:min-w-0 w-fit items-center justify-start lg:justify-center mx-auto h-12 rounded-full p-2 lg:mx-0">
                {tabsData.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex flex-1 items-center justify-center gap-1.5 border border-transparent text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 h-full rounded-full px-4 py-2 ${activeTab === tab.id
                      ? 'bg-background text-black/80'
                      : 'text-black/80 hover:text-black'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div>
            <div className="flex-1 outline-none animate-in duration-300 fade-in">
              <div className="relative">
                <Image
                  src={currentTab.image}
                  alt={`${currentTabData.title} ${currentTabData.subtitle}`}
                  width={600}
                  height={440}
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-red-600/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-white">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">{currentTabData.overlayStats.stat1.value}</p>
                    <p className="font-medium">{currentTabData.overlayStats.stat1.label}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">{currentTabData.overlayStats.stat2.value}</p>
                    <p className="font-medium">{currentTabData.overlayStats.stat2.label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}