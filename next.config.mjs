/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "/assinatura",
  assetPrefix: "/assinatura",
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
