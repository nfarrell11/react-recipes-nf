import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Never ignore build errors!!!
  },
  reactStrictMode: true,
};

export default nextConfig;
