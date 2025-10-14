import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    cacheComponents: true,
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
