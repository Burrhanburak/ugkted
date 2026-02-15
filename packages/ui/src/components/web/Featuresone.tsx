import { Cpu, Lock, Sparkles, Zap, Globe, Users, Briefcase, GraduationCap } from 'lucide-react'
import Image from 'next/image'

export default function Featuresone() {
    return (
        <section className="py-16 md:py-32">
            <div className="container mx-auto max-w-5xl space-y-12 px-6">
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-semibold">Vizyonumuz ve Yaklaşımımız</h2>
                    <p className="max-w-sm sm:ml-auto text-muted-foreground">UGKTED olarak, Türkiye’nin kültürel zenginliğini küresel inovasyonla buluşturarak hem yerel kalkınmayı hem de uluslararası işbirliklerini destekleyen bütüncül bir ekosistem oluşturuyoruz.</p>
                </div>

                <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
                    <div className="space-y-2 backdrop-blur-[12px] bg-zinc-50 rounded-[24px] p-4   h-full ">
                        <div className="flex items-center gap-2">
                            <div className='bg-red-500 w-10 h-10 rounded-full flex items-center justify-center'>
                                <Zap className="size-4 text-white" />
                            </div>
                            <h3 className="text-sm font-medium">Hızlı Etki</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Girişimcilerin ve işletmelerin hızla yenilik yapmasına yardımcı olan bütüncül bir destek sunar.</p>
                    </div>
                    <div className="space-y-2 backdrop-blur-[12px] bg-zinc-50 rounded-[24px] p-4   h-full ">
                        <div className="flex items-center gap-2">
                            <div className='bg-red-500 w-10 h-10 rounded-full flex items-center justify-center'>
                                <Cpu className="size-4 text-white" />
                            </div>
                            <h3 className="text-sm font-medium">Güçlü Altyapı</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Teknoloji ve kültürün birleştiği noktada sağlam temellere dayanan projeleri destekler.</p>
                    </div>
                    <div className="space-y-2 backdrop-blur-[12px] bg-zinc-50 rounded-[24px] p-4   h-full ">
                        <div className="flex items-center gap-2">
                            <div className='bg-red-500 w-10 h-10 rounded-full flex items-center justify-center'>
                                <Lock className="size-4 text-white" />
                            </div>
                            <h3 className="text-sm font-medium">Güvenilirlik</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Kurumsal şeffaflık ve etik değerlerle iş dünyasında güven inşa eder.</p>
                    </div>
                    <div className="space-y-2 backdrop-blur-[12px] bg-zinc-50 rounded-[24px] p-4   h-full ">
                        <div className="flex items-center gap-2 ">
                            <div className='bg-red-500 w-10 h-10 rounded-full flex items-center justify-center'>
                                <Sparkles className="size-4 text-white" />
                            </div>
                            <h3 className="text-sm font-medium">İnovasyon</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Geleneksel değerleri modern çözümlerle harmanlayarak geleceği şekillendirir.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}