import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = {
  images: {
    domains: ['startups-minio.x2vfeh.easypanel.host'],
  },
};

export default nextConfig;
