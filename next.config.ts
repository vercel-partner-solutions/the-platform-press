import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  // Explicitly keep Partial Prefetching off to preserve pre-16.4 behavior.
  // Set to `true` to opt in (it becomes the default in Next.js 17).
  partialPrefetching: false,
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
