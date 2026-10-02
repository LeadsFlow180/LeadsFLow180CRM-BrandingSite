import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Walkthrough floor tour paused — send old URLs to the agent directory.
      { source: "/walkthrough", destination: "/agents", permanent: false },
      { source: "/walkthrough/", destination: "/agents", permanent: false },
      { source: "/office-tour", destination: "/agents", permanent: false },
      // Previous walkthrough hosting (commented — restore when floor tour returns):
      // { source: "/office-tour", destination: "/walkthrough", permanent: false },
    ];
  },
  // Previous: rewrite /walkthrough → public/walkthrough/index.html
  // async rewrites() {
  //   return [
  //     { source: "/walkthrough", destination: "/walkthrough/index.html" },
  //     { source: "/walkthrough/", destination: "/walkthrough/index.html" },
  //   ];
  // },
};

export default nextConfig;
