import React from "react";
import { Handshake } from "lucide-react";
import Image from "next/image";
interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className || ""}`}>
      {/* <Handshake className="text-current" /> */}
      <Image className="bg-transparent" src="/po.png" alt="UGKTED" width={58} height={58} />
      <span className="text-lg font-medium text-current"></span>
    </div>
  );
};
