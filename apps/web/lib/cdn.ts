/**
 * Cloudflare R2 özel alan adı (ör. https://cdn.ugkted.com).
 * İstemci ve sunucuda NEXT_PUBLIC_CDN_URL kullanılır.
 * Geçiş: R2_PUBLIC_DOMAIN hâlâ yedek olarak okunur.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const LEGACY_PLACEHOLDER_IMAGE =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg";

/** Özel alan; env eksikse yalnızca production build’de kullanılır (R2’deki `cdn/...` anahtarlarıyla uyumlu). */
const DEFAULT_PRODUCTION_CDN = "https://cdn.ugkted.com";

/** CDN kapalıyken `public/` altında dosya yoksa kullanılan geçici görseller (Unsplash). R2’ye yükledikten sonra yerel/env ile gerçek dosyalar önceliklidir. */
const PAGE_HERO_FALLBACK: Record<string, string> = {
  "cdn/pages/events-hero.webp":
    "https://images.unsplash.com/photo-1540575467063-266a988389ef?w=2000&q=85&auto=format&fit=crop",
  "cdn/pages/rehber-hero.webp":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=2000&q=85&auto=format&fit=crop",
  "cdn/pages/gallery-hero.webp":
    "https://images.unsplash.com/photo-1513475382583-d06e58bcb0e?w=2000&q=85&auto=format&fit=crop",
  "cdn/pages/services-hero.webp":
    "https://images.unsplash.com/photo-1522071820081-80f771d8b511?w=2000&q=85&auto=format&fit=crop",
  "cdn/pages/news-hero.webp":
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=2000&q=85&auto=format&fit=crop",
  "cdn/pages/blog-hero.webp":
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=2000&q=85&auto=format&fit=crop",
};

const EVENT_COVER_FALLBACK: Record<string, string> = {
  "cdn/events/teknoloji-ve-inovasyon-fuari.webp":
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80&auto=format&fit=crop",
  "cdn/events/networking-bulusmalari.webp":
    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop",
  "cdn/events/egitim-ve-atolye-calismalari.webp":
    "https://images.unsplash.com/photo-1517245386807-9b4d0d77124f?w=1200&q=80&auto=format&fit=crop",
  "cdn/events/kultur-ve-sanat-gunleri.webp":
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80&auto=format&fit=crop",
  "cdn/events/uluslararasi-girisimcilik-zirvesi.webp":
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80&auto=format&fit=crop",
  "cdn/events/innovation-summit-2026.webp":
    "https://images.unsplash.com/photo-1505373877841-8d25f564d940?w=1200&q=80&auto=format&fit=crop",
};

const REHBER_COVER_FALLBACK: Record<string, string> = {
  "cdn/rehber/dernek-nedir.webp":
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
  "cdn/rehber/stk-nedir.webp":
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&auto=format&fit=crop",
  "cdn/rehber/dernek-yonetim-kurulu-nedir.webp":
    "https://images.unsplash.com/photo-1556761175-5973dc069f82?w=1200&q=80&auto=format&fit=crop",
  "cdn/rehber/bagis-seffafligi-rehberi.webp":
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1200&q=80&auto=format&fit=crop",
};

const GALLERY_FALLBACK: Record<string, string> = {
  "cdn/gallery/kurumsal-iletisim.webp":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&auto=format&fit=crop",
  "cdn/gallery/yardim-rehberi.webp":
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&auto=format&fit=crop",
  "cdn/gallery/dernek-vakif.webp":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80&auto=format&fit=crop",
  "cdn/gallery/dernek-kurulus.webp":
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80&auto=format&fit=crop",
  "cdn/gallery/haber-merkezi.webp":
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&auto=format&fit=crop",
};

const EVENT_FALLBACK_ROTATION = [
  "https://images.unsplash.com/photo-1540575467063-266a988389ef?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-9b4d0d77124f?w=1200&q=80&auto=format&fit=crop",
];

function hashPick(key: string, pool: readonly string[]): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  const i = Math.abs(h) % pool.length;
  return pool[i] ?? pool[0] ?? LEGACY_PLACEHOLDER_IMAGE;
}

function remoteFallbackForKey(cleanKey: string, fallback: string): string {
  if (PAGE_HERO_FALLBACK[cleanKey]) return PAGE_HERO_FALLBACK[cleanKey];
  if (EVENT_COVER_FALLBACK[cleanKey]) return EVENT_COVER_FALLBACK[cleanKey];
  if (REHBER_COVER_FALLBACK[cleanKey]) return REHBER_COVER_FALLBACK[cleanKey];
  if (GALLERY_FALLBACK[cleanKey]) return GALLERY_FALLBACK[cleanKey];
  if (cleanKey.startsWith("cdn/events/")) return hashPick(cleanKey, EVENT_FALLBACK_ROTATION);
  if (cleanKey.startsWith("cdn/blog/")) return hashPick(cleanKey, EVENT_FALLBACK_ROTATION);
  if (cleanKey.startsWith("cdn/news/")) return hashPick(cleanKey, EVENT_FALLBACK_ROTATION);
  return fallback;
}

function normalizePublicKey(src: string): string | null {
  const clean = src.replace(/^\/+/, "");
  if (!clean || clean.includes("..")) return null;
  return clean;
}

/**
 * Turbo/monorepo’da `cwd` repo kökü olabilir; bundle `import.meta.url` ise `.next` altında bitebilir.
 * `package.json` name === "web" olan paketin `public` dizinini yukarı yürüyerek bulur.
 */
function resolveWebPublicDir(): string | null {
  if (typeof window !== "undefined") return null;
  const starts: string[] = [process.cwd()];
  try {
    starts.push(path.dirname(fileURLToPath(import.meta.url)));
  } catch {
    /* ignore */
  }
  for (const start of starts) {
    let dir = start;
    for (let depth = 0; depth < 10; depth++) {
      const pkgPath = path.join(dir, "package.json");
      const pub = path.join(dir, "public");
      if (fs.existsSync(pkgPath) && fs.existsSync(pub)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8")) as { name?: string };
          if (pkg.name === "web") return pub;
        } catch {
          /* ignore */
        }
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

/** Sunucuda: `public/` altında dosya varsa site köküne göre yol döner. */
function tryPublicFileUrl(cleanKey: string): string | null {
  if (typeof window !== "undefined") return null;
  try {
    const webPublic = resolveWebPublicDir();
    let fromBundled: string | null = null;
    try {
      fromBundled = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", cleanKey);
    } catch {
      fromBundled = null;
    }
    const candidates = [
      ...(webPublic ? [path.join(webPublic, cleanKey)] : []),
      path.join(process.cwd(), "public", cleanKey),
      path.join(process.cwd(), "apps", "web", "public", cleanKey),
      ...(fromBundled ? [fromBundled] : []),
    ];
    for (const full of candidates) {
      if (fs.existsSync(full)) return `/${cleanKey.replace(/\\/g, "/")}`;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function getCdnBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_CDN_URL?.trim() ||
    process.env.R2_PUBLIC_DOMAIN?.trim() ||
    (process.env.NODE_ENV === "production" ? DEFAULT_PRODUCTION_CDN : "") ||
    "";
  return raw.replace(/\/+$/, "");
}

/** Mutlak URL ise aynen döner; değilse CDN kökü ile birleştirir. Köksüzse / ile başlayan yol döner. */
export function cdnUrl(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = getCdnBaseUrl();
  const p = path.replace(/^\/+/, "");
  if (base) return `${base}/${p}`;
  return `/${p}`;
}

/**
 * MDX / veritabanından gelen göreli CDN anahtarı veya tam URL → Next/Image `src`
 *
 * Sıra: (1) `public/` altında dosya varsa yerel yol (2) production’da CDN (3) yedek URL.
 * Geliştirmede CDN tanımlı olsa bile R2’de olmayan `cdn/...webp` anahtarları için yedek kullanılır;
 * CDN’i dev’de de zorunlu test etmek için: `NEXT_PUBLIC_DEV_USE_CDN=1`.
 */
export function resolveMediaUrl(
  src: string | undefined,
  fallback: string = LEGACY_PLACEHOLDER_IMAGE
): string {
  if (!src) return fallback;
  if (/^https?:\/\//i.test(src)) return src;
  const clean = normalizePublicKey(src);
  if (!clean) return fallback;

  const local = tryPublicFileUrl(clean);
  if (local) return local;

  const base = getCdnBaseUrl();
  const useCdnInDev = process.env.NEXT_PUBLIC_DEV_USE_CDN === "1";
  if (base && (process.env.NODE_ENV !== "development" || useCdnInDev)) {
    return `${base}/${clean}`;
  }

  return remoteFallbackForKey(clean, fallback);
}

/** Next/Image uzak SVG’de optimizasyon hatası verebilir; `unoptimized` için kullan. */
export function shouldUnoptimizeImageSrc(src: string): boolean {
  return /\.svg(\?|#|$)/i.test(src);
}

/**
 * Open Graph, JSON-LD ve paylaşım önizlemesi için mutlak URL.
 * Göreli yol + site kökü (CDN yoksa) veya tam CDN adresi.
 */
export function absoluteMediaUrl(
  src: string | undefined,
  fallback: string = LEGACY_PLACEHOLDER_IMAGE
): string {
  const resolved = resolveMediaUrl(src, fallback);
  if (/^https?:\/\//i.test(resolved)) return resolved;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://ugkted.org").replace(/\/+$/, "");
  return `${site}${resolved.startsWith("/") ? resolved : `/${resolved}`}`;
}
