/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    outputStandalone: true,
  },
  images: {
    unoptimized: true,
  },
  assetPrefix:
    process.env.NODE_ENV === 'production' ? '/{repository-name}' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/{repository-name}' : '',
};

export default nextConfig;
