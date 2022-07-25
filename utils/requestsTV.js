const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default {
    Popular: {
        title: 'Popular',
        url: `tv/popular?api_key=${API_KEY}`,
    },
    Action: {
        title: 'Action',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10759`,
    },
    Animation: {
        title: 'Animation',
        url: `discover/tv?api_key=${API_KEY}&with_genres=16`,
    },
    Comedy: {
        title: 'Comedy',
        url: `discover/tv?api_key=${API_KEY}&with_genres=35`,
    },
    Crime: {
        title: 'Crime',
        url: `discover/tv?api_key=${API_KEY}&with_genres=80`,
    },
    Documentary: {
        title: 'Documentary',
        url: `discover/tv?api_key=${API_KEY}&with_genres=99`,
    },
    Drama: {
        title: 'Drama',
        url: `discover/tv?api_key=${API_KEY}&with_genres=18`,
    },
    Family: {
        title: 'Family',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10751`,
    },
    Kids: {
        title: 'Kids',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10762`,
    },
    Mystery: {
        title: 'Mystery',
        url: `discover/tv?api_key=${API_KEY}&with_genres=9648`,
    },
    Reality: {
        title: 'Reality',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10764`,
    },
    SciFi: {
        title: 'Sci-Fi',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10765`,
    },
    Talk: {
        title: 'Talk',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10767`,
    },
    War: {
        title: 'War',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10768`,
    },
    Western: {
        title: 'Western',
        url: `discover/tv?api_key=${API_KEY}&with_genres=37`,
    },
};