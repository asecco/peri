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
    async rewrites() {
        return [
        {
            source: '/tv/season',
            destination: '/EpisodeList',
        },
        ];
    },
};

module.exports = nextConfig;