import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Prevents image optimization build failures on Cloudflare
  },
};

export default nextConfig;
