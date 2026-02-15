import Image from 'next/image'
import { Flame } from 'lucide-react'
import { InfiniteSlider } from '../ui/infinite-slider'
import { ProgressiveBlur } from '../ui/progressive-blur'
import { Badge } from '../ui/badge'

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col  md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <div className='flex items-start gap-2 mb-4  justify-start'>
                            <Badge variant="secondary" className=''>
                                <Flame />
                                Referanslar
                            </Badge>
                        </div>
                        <h2 className="text-start text-2xl">İş Ortaklarımız</h2>
                        <p className="text-start text-sm">UGKTED ile iş birliği yapan kurumlar ve partnerlerimiz.</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            {[20, 16, 16, 20, 20, 16, 28, 24].map((size, i) => (
                              <div key={i} className="flex relative" style={{ height: size }}>
                                <Image
                                  className="mx-auto w-auto dark:invert object-contain"
                                  src="/Bayrampasa-logo.png"
                                  alt="Bayrampasa Belediyesi logo | UGKTED derneği"
                                  height={size}
                                  width={120}
                                  sizes="120px"
                                />
                              </div>
                            ))}
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
