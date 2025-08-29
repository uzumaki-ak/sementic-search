/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ❌ Ignore ESLint errors during production build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
