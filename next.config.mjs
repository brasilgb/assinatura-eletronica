/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "/assinatura-eletronica",
  assetPrefix: "/assinatura-eletronica",
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
