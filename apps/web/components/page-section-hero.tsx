import { CdnImage } from "@/components/cdn-image";
import { resolveMediaUrl } from "@/lib/cdn";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  /** `cdn/...` anahtarı veya `/cdn/...` yolu */
  imageSrc: string;
  alt: string;
  className?: string;
};

/**
 * Liste sayfalarında (/events, /rehber, /galeri, /hizmetler) tutarlı üst bant görseli.
 */
export function PageSectionHero({ imageSrc, alt, className }: Props) {
  return (
    <div
      className={cn(
        "relative mb-10 md:mb-14 overflow-hidden rounded-xl border border-border/60 bg-muted/30 md:mb-16",
        className
      )}
    >
      <div className="relative aspect-[21/9] w-full max-h-[min(42vh,420px)] min-h-[140px] sm:min-h-[180px] md:max-h-[min(48vh,480px)]">
        <CdnImage
          src={resolveMediaUrl(imageSrc)}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, min(1280px, 100vw)"
          priority
        />
      </div>
    </div>
  );
}
