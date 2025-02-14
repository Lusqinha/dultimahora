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
    domains: ['startups-minio.x2vfeh.easypanel.host',
      'minio.dultimahora.online',
      'dultimahora-minio.flkkfw.easypanel.host'
    ],
  },
};

export default nextConfig;
