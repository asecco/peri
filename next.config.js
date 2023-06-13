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
            source: '/tv/:id/season/:num',
            destination: '/episodes',
        },
        {
            source: '/:type/:id',
            destination: '/info',
        },
        {
            source: '/cast/:id',
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