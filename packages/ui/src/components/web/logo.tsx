import React from "react";
import Image from "next/image";
interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      {/* <Handshake className="text-current" /> */}
      <Image
        className="bg-transparent object-contain shrink-0"
        src="/favicon-96x96.png"
        alt="UGKTED"
        width={32}
        height={32}
        priority
      />
      <span className="text-sm font-medium text-[#eb0010]">UGKTED</span>
    </div>
  );
};
