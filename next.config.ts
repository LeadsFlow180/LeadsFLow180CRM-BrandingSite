import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/office-tour", destination: "/walkthrough", permanent: false }];
  },
  async rewrites() {
    // Reason: Next doesn't auto-serve public/walkthrough/index.html at /walkthrough.
    return [
      { source: "/walkthrough", destination: "/walkthrough/index.html" },
      { source: "/walkthrough/", destination: "/walkthrough/index.html" },
    ];
  },
};

export default nextConfig;
