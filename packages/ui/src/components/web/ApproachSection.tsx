// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { Heart, Shield, UserCheck, Clock, MessageSquare } from 'lucide-react';

// interface FeatureCardProps {
//   text: string;
//   Icon: React.ComponentType<{ className?: string }>;
// }

// function FeatureCard({ text, Icon }: FeatureCardProps) {
//   return (
//     <div className="backdrop-blur-[12px] bg-zinc-50 rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 min-w-[160px] flex-1">
//       <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#eb0010] flex-shrink-0">
//         <Icon className="w-6 h-6 text-white" />
//       </div>
//       <p className="text-[rgb(28,39,6)] text-sm md:text-base font-medium text-center leading-relaxed">
//         {text}
//       </p>
//     </div>
//   );
// }

// export default function ApproachSection() {

//   const features = [
//     {
//       text: "Girişimcilik Ekosistemi",
//       Icon: UserCheck
//     },
//     {
//       text: "Güçlü İş Birlikleri",
//       Icon: Shield
//     },
//     {
//       text: "Kültürel Entegrasyon",
//       Icon: Heart
//     },
//     {
//       text: "Sürdürülebilir Projeler",
//       Icon: Clock
//     },
//     {
//       text: "Uluslararası Ağ",
//       Icon: MessageSquare
//     }
//   ];

//   return (
//     <section
//       className="bg-white flex items-center justify-center relative overflow-visible py-[100px] px-[30px] md:py-20 md:px-7.5 w-full"
//       id="approach-section"
//     >
//       <div className="flex flex-col items-center justify-center gap-[60px] max-w-[1200px] w-full overflow-hidden">
//         <main className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-[60px] w-full">
//           {/* Left Column */}
//           <div className="flex flex-col items-start justify-between gap-8 lg:gap-12 w-full lg:w-1/2 lg:max-w-[615px]">
//             {/* Top Section - Title & Subtitle */}
//             <div className="flex flex-col items-start justify-start gap-5 w-full">
//               <h2 className="text-left font-bold text-[rgb(28,39,6)] text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
//                 Vizyonumuz ve Yaklaşımımız
//               </h2>
//               <p className="text-left text-[rgb(28,39,6)] text-base md:text-lg leading-relaxed">
//                 UGKTED olarak, girişimcilik ruhunu kültür, turizm ve eğitimle harmanlayarak uluslararası arenada güçlü köprüler kuruyor, yenilikçi projelerle toplumsal kalkınmaya öncülük ediyoruz.
//               </p>
//             </div>

//             {/* Bottom Section - Feature Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
//               {features.map((feature, index) => (
//                 <FeatureCard
//                   key={index}
//                   text={feature.text}
//                   Icon={feature.Icon}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Right Column - Image */}
//           <div className="w-full lg:w-1/2 lg:max-w-[450px] h-[400px] md:h-[500px] lg:h-[600px] relative rounded-[24px] overflow-hidden order-first lg:order-last">
//             <Image
//               src="/ugkted.png"
//               alt="UGKTED Etkinlik ve Vizyon"
//               fill
//               className="object-cover"
//               sizes="(max-width: 1024px) 100vw, 450px"
//             />
//           </div>
//         </main>
//       </div>
//     </section>
//   );
// }
