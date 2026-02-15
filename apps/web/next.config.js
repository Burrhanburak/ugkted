/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  // Vercel React Best Practices: Avoid barrel imports (bundle-barrel-imports)
  // 200-800ms import cost reduction, 15-70% faster dev boot
  optimizePackageImports: ["lucide-react", "@tabler/icons-react"],
  images: {
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
    ],
  },

};

export default nextConfig;
