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
        {
            source: '/info',
            destination: '/Info',
        },
        {
            source: '/cast',
            destination: '/CastInfo',
        },
        {
            source: '/movies/:genre/:page',
            destination: '/movies',
        },
        {
            source: '/series/:genre/:page',
            destination: '/series',
        },
        ];
    },
};

module.exports = nextConfig;