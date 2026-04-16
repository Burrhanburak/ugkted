import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@repo/ui/lib/utils";
import { shouldUnoptimizeImageSrc } from "@/lib/cdn";

type CdnImageProps = Omit<ImageProps, "src"> & { src: string };

/**
 * SVG kapaklar: `next/image` (özellikle Next 15+) yerel/uzak SVG’de boş kutu veya optimizasyon
 * reddi üretebiliyor; blog/haber kartları `.svg` kullanıyor, etkinlikler çoğunlukla `.webp`.
 * SVG için doğrudan `<img>` — raster için `Image`.
 */
export function CdnImage(props: CdnImageProps) {
  const {
    src,
    alt = "",
    width,
    height,
    fill,
    className,
    style,
    priority,
    unoptimized,
    sizes,
    ...rest
  } = props;

  if (shouldUnoptimizeImageSrc(src)) {
    const imgStyle: CSSProperties | undefined =
      typeof style === "object" && style !== null && !Array.isArray(style)
        ? { ...style, color: "unset" }
        : { color: "unset" };

    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- SVG: Next Image güvenilir değil
        <img
          src={src}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full", className)}
          style={imgStyle}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element -- SVG: Next Image güvenilir değil
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={imgStyle}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      style={style}
      priority={priority}
      unoptimized={unoptimized}
      sizes={sizes}
      {...rest}
    />
  );
}
