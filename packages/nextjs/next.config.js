// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

// @ts-check

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

// @ts-ignore
module.exports = withPWA({
  nextConfig
})