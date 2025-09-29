import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/articles",
        destination: "/:locale/category/all",
        permanent: false,
      },
      {
        source: "/:locale/category",
        destination: "/:locale/category/all",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
