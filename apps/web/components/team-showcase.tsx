"use client";

import { useState } from "react";
import {
  IconBrandBehance,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { cn } from "@repo/ui/lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

/** Yer tutucu üye listesi — gerçek isim ve fotoğraflarla güncelleyin. */
const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Örnek Üye",
    role: "Proje koordinatörü",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80",
    social: { twitter: "#", linkedin: "#", behance: "#" },
  },
  {
    id: "2",
    name: "Örnek Üye",
    role: "Kurucu üye",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Örnek Üye",
    role: "Program sorumlusu",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Örnek Üye",
    role: "İletişim ve paydaş ilişkileri",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80",
    social: { linkedin: "#" },
  },
  {
    id: "5",
    name: "Örnek Üye",
    role: "Eğitim ve atölye lideri",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=80",
    social: { twitter: "#", linkedin: "#" },
  },
  {
    id: "6",
    name: "Örnek Üye",
    role: "Gönüllü koordinatörü",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80",
    social: { instagram: "#" },
  },
];

interface TeamShowcaseProps {
  members?: TeamMember[];
}

export default function TeamShowcase({ members = DEFAULT_MEMBERS }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex w-full max-w-5xl flex-col items-start gap-8 px-4 py-8 font-sans select-none md:flex-row md:gap-10 md:px-6 lg:gap-14">
      <div className="flex flex-shrink-0 gap-2 overflow-x-auto pb-1 md:gap-3 md:overflow-visible md:pb-0">
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="h-[120px] w-[110px] sm:h-[140px] sm:w-[130px] md:h-[165px] md:w-[155px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
        <div className="mt-[48px] flex flex-col gap-2 sm:mt-[56px] md:mt-[68px] md:gap-3">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="h-[132px] w-[122px] sm:h-[155px] sm:w-[145px] md:h-[182px] md:w-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
        <div className="mt-[22px] flex flex-col gap-2 sm:mt-[26px] md:mt-[32px] md:gap-3">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="h-[125px] w-[115px] sm:h-[146px] sm:w-[136px] md:h-[172px] md:w-[162px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-1 flex-col gap-4 pt-0 sm:grid sm:grid-cols-2 md:flex md:flex-col md:gap-5 md:pt-2">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "flex-shrink-0 cursor-pointer overflow-hidden rounded-xl transition-opacity duration-300",
        className,
        isDimmed ? "opacity-60" : "opacity-100",
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- harici üye fotoğrafları için esnek URL */}
      <img
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover transition-[filter] duration-500"
        style={{
          filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.77)",
        }}
      />
    </div>
  );
}

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial =
    member.social?.twitter ??
    member.social?.linkedin ??
    member.social?.instagram ??
    member.social?.behance;

  return (
    <div
      className={cn(
        "cursor-pointer transition-opacity duration-300",
        isDimmed ? "opacity-50" : "opacity-100",
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "h-3 w-4 flex-shrink-0 rounded-[5px] transition-all duration-300",
            isActive ? "w-5 bg-foreground" : "bg-foreground/25",
          )}
        />
        <span
          className={cn(
            "text-base font-semibold tracking-tight transition-colors duration-300 md:text-[18px] md:leading-none",
            isActive ? "text-foreground" : "text-foreground/80",
          )}
        >
          {member.name}
        </span>

        {hasSocial && (
          <div
            className={cn(
              "ml-0.5 flex items-center gap-1.5 transition-all duration-200",
              isActive
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-2 opacity-0",
            )}
          >
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="X"
              >
                <IconBrandX size={14} stroke={1.5} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="LinkedIn"
              >
                <IconBrandLinkedin size={14} stroke={1.5} />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="Instagram"
              >
                <IconBrandInstagram size={14} stroke={1.5} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-muted-foreground transition-all duration-150 hover:scale-110 hover:bg-foreground/10 hover:text-foreground"
                title="Behance"
              >
                <IconBrandBehance size={14} stroke={1.5} />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-1.5 pl-[27px] text-[7px] font-medium tracking-[0.2em] text-muted-foreground uppercase md:text-[10px]">
        {member.role}
      </p>
    </div>
  );
}
