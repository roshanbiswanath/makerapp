import withTM from 'next-transpile-modules';

const withTranspileModules = withTM({
  transpileModules: ['mongodb'],
});

/** @type {import('next').NextConfig} */
const nextConfig = withTranspileModules({
  reactStrictMode: true,
  output: 'standalone',
});

export default nextConfig;
