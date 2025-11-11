/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false, // Using pages directory for now
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/clickup/:path*',
        destination: 'https://api.clickup.com/api/v2/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

