import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Monorepo kökü: Vercel / file tracing; Prisma workspace çözümlemesi */
const monorepoRoot = path.resolve(__dirname, "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: monorepoRoot,
  transpilePackages: ["@repo/ui", "@repo/database"],
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/client-runtime-utils",
    "prisma",
    "@prisma/adapter-pg",
    "pg",
  ],
  // Vercel React Best Practices: Avoid barrel imports (bundle-barrel-imports)
  // 200-800ms import cost reduction, 15-70% faster dev boot
  optimizePackageImports: ["lucide-react", "@tabler/icons-react"],
  images: {
    // Uzak SVG (CDN/R2) kapaklar: Image Optimization SVG’yi varsayılan olarak reddedebilir
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bioenerjist-books.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "deifkwefumgah.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "cdn.ugkted.com",
      },
    ],
  },

};

export default nextConfig;
