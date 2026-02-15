'use client'
import { Logo } from './logo'
import { Activity, Map as MapIcon, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart'

export default function FeaturesSection() {
    return (
        <section className="px-4 py-16 md:py-32 overflow-hidden ">
            <div className="mx-auto grid max-w-5xl border border-white/20 md:grid-cols-2 rounded-lg">
                <div>
                    <div className="p-6 sm:p-12 ">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <MapIcon className="size-4" />
                            Küresel Erişim
                        </span>

                        <p className="mt-8 text-lg font-semibold">Türkiye Merkezli Uluslararası Girişimci Kültür Turizm ve Eğitim Derneği (UGKTED), girişimcilik ruhunu uluslararası düzeyde yaygınlaştırır.</p>
                    </div>

                    <div
                        aria-hidden
                        className="relative">
                        <div className="absolute inset-0 z-10 m-auto size-fit">
                            <div className="rounded-(--radius) bg-background z-1 dark:bg-muted relative flex size-fit w-fit items-center gap-2 border px-3 py-1 text-xs font-medium shadow-md shadow-zinc-950/5">
                                <span className="text-lg">🇹🇷</span> Merkez: Türkiye
                            </div>
                            <div className="rounded-(--radius) bg-background absolute inset-2 -bottom-2 mx-auto border px-3 py-4 text-xs font-medium shadow-md shadow-zinc-950/5 dark:bg-zinc-900"></div>
                        </div>

                        <div className="relative overflow-hidden">
                            <div className="bg-radial z-1 to-background absolute inset-0 from-transparent to-75%"></div>
                            <Map />
                        </div>
                    </div>
                </div>
                <div className="overflow-hidden border-t border-white/20 bg-zinc-50 p-6 sm:p-12 md:border-0 md:border-l dark:bg-transparent">
                    <div className="relative z-10">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <MessageCircle className="size-4" />
                            İletişim ve İşbirliği
                        </span>

                        <p className="my-8 text-lg font-semibold">Farklı ülkelerden girişimciler ve akademisyenleri bir araya getirerek bilgi paylaşımı ve ortak projeler yürütüyoruz.</p>
                    </div>
                    <div
                        aria-hidden
                        className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex size-5 rounded-full border">
                                    <Logo className="m-auto size-3" />
                                </span>
                                <span className="text-muted-foreground text-xs">Cum 22 Şub</span>
                            </div>
                            <div className="rounded-(--radius) bg-background mt-1.5 w-3/5 border p-3 text-xs">Merhaba, derneğe nasıl üye olabilirim?</div>
                        </div>

                        <div>
                            <div className="rounded-(--radius) mb-1 ml-auto w-3/5 bg-[#eb0010] p-3 text-xs text-white">Web sitemiz üzerinden başvuru formunu doldurarak aramıza katılabilirsiniz.</div>
                            <span className="text-muted-foreground block text-right text-xs">Şimdi</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-full border-y border-white/20 p-12">
                    <p className="text-center text-3xl font-semibold lg:text-5xl">Birlikte Üretmek, Paylaşmak ve Gelişmek</p>
                </div>
                <div className="relative col-span-full">
                    <div className="absolute z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <Activity className="size-4" />
                            Sürdürülebilir Etki
                        </span>

                        <p className="my-8 text-lg font-semibold">
                            Derneğimiz; yenilikçi düşünceyi, kültürel çeşitliliği ve sürdürülebilir gelişimi destekler. <span className="text-muted-foreground"> Her adımda toplumsal faydayı ön planda tutar.</span>
                        </p>
                    </div>
                    <MonitoringChart />
                </div>
            </div>
        </section>
    )
}

const map = new DottedMap({ height: 55, grid: 'diagonal' })

const points = map.getPoints()

const svgOptions = {
    backgroundColor: 'var(--color-background)',
    color: 'currentColor',
    radius: 0.15,
}

const Map = () => {
    const viewBox = `0 0 120 60`
    return (
        <svg
            viewBox={viewBox}
            style={{ background: svgOptions.backgroundColor }}>
            {points.map((point, index) => (
                <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={svgOptions.radius}
                    fill={svgOptions.color}
                />
            ))}
        </svg>
    )
}

const chartConfig = {
    desktop: {
        label: 'Projeler',
        color: '#eb2525ff',
    },
    mobile: {
        label: 'Katılımcılar',
        color: '#eb0010',
    },
} satisfies ChartConfig

const chartData = [
    { month: 'Mayıs', desktop: 56, mobile: 224 },
    { month: 'Haziran', desktop: 56, mobile: 224 },
    { month: 'Ocak', desktop: 126, mobile: 252 },
    { month: 'Şubat', desktop: 205, mobile: 410 },
    { month: 'Mart', desktop: 200, mobile: 126 },
    { month: 'Nisan', desktop: 400, mobile: 800 },
]

const MonitoringChart = () => {
    return (
        <ChartContainer
            className="h-120 aspect-auto md:h-96"
            config={chartConfig}>
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 0,
                    right: 0,
                }}>
                <defs>
                    <linearGradient
                        id="fillDesktop"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                            offset="0%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="55%"
                            stopColor="var(--color-desktop)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient
                        id="fillMobile"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                            offset="0%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="55%"
                            stopColor="var(--color-mobile)"
                            stopOpacity={0.1}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <ChartTooltip
                    active
                    cursor={false}
                    content={<ChartTooltipContent className="dark:bg-muted" />}
                />
                <Area
                    strokeWidth={2}
                    dataKey="mobile"
                    type="stepBefore"
                    fill="url(#fillMobile)"
                    fillOpacity={0.1}
                    stroke="var(--color-mobile)"
                    stackId="a"
                />
                <Area
                    strokeWidth={2}
                    dataKey="desktop"
                    type="stepBefore"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.1}
                    stroke="var(--color-desktop)"
                    stackId="a"
                />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
            </AreaChart>
        </ChartContainer>
    )
}