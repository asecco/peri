/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
}

module.exports = nextConfig
