/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['image.tmdb.org'],
        unoptimized: true,
    },
    async rewrites() {
        return [
        {
            source: '/tv/season',
            destination: '/episodes',
        },
        {
            source: '/info',
            destination: '/info',
        },
        {
            source: '/cast',
            destination: '/cast',
        },
        {
            source: '/movies/:genre/:page',
            destination: '/movies',
        },
        {
            source: '/tv/:genre/:page',
            destination: '/tv',
        },
        {
            source: '/upcoming/:page',
            destination: '/upcoming',
        },
        {
            source: '/collections/:id',
            destination: '/collections/:id',
        },
        ];
    },
};

module.exports = nextConfig;