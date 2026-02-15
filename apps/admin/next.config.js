/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  optimizePackageImports: ["lucide-react", "@tabler/icons-react"],
};

export default nextConfig;
