"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function FeaturedSectionStats() {
  const data = [
    { name: "Oca", value: 20 },
    { name: "Şub", value: 40 },
    { name: "Mar", value: 60 },
    { name: "Nis", value: 80 },
    { name: "May", value: 100 },
    { name: "Haz", value: 130 },
    { name: "Tem", value: 160 },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto text-left ">
      <div className="px-4">
        <h3 className="text-lg sm:text-xl lg:text-4xl font-medium text-gray-900 dark:text-white mb-16">
          UGKTED Ailesi Her Geçen Gün Büyüyor.{" "}
          <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-4xl">
            Son dönemde artan dernek üyelerimiz ve değerli bağışlarınızla, girişimcilik ekosistemine katkımız katlanarak artıyor.
          </span>
        </h3>

        {/* Stats grid */}
        <div className="grid grid-cols-2  sm:grid-cols-4 gap-6 mt-8">
          <div>
            <p className="text-3xl font-medium text-gray-900">5,000+</p>
            <p className="text-gray-500 text-md">Aktif Üye</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-gray-900">₺1M+</p>
            <p className="text-gray-500 text-md">Toplanan Bağış</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-gray-900">50+</p>
            <p className="text-gray-500 text-md">Desteklenen Girişim</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-gray-900">81</p>
            <p className="text-gray-500 text-md">İlde Faaliyet</p>
          </div>
        </div>
      </div>

      {/* Area Chart */}
      <div className="w-full h-48 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} className="rounded-lg">
            <defs>
              <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eb0010" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#eb0010" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip labelClassName="rounded-lg" />
            <Area
              type="monotone"
              dataKey="value"

              stroke="#eb0010"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRed)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
