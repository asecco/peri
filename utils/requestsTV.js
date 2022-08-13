import { API_KEY } from "./constants";

export default {
    Popular: {
        title: 'Popular',
        url: `tv/popular?api_key=${API_KEY}`,
    },
    Action: {
        title: 'Action',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10759&sort_by=vote_count.desc&include_adult=false`,
    },
    Animation: {
        title: 'Animation',
        url: `discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=vote_count.desc&include_adult=false`,
    },
    Comedy: {
        title: 'Comedy',
        url: `discover/tv?api_key=${API_KEY}&with_genres=35&sort_by=vote_count.desc&include_adult=false`,
    },
    Crime: {
        title: 'Crime',
        url: `discover/tv?api_key=${API_KEY}&with_genres=80&sort_by=vote_count.desc&include_adult=false`,
    },
    Documentary: {
        title: 'Documentary',
        url: `discover/tv?api_key=${API_KEY}&with_genres=99&sort_by=vote_count.desc&include_adult=false`,
    },
    Drama: {
        title: 'Drama',
        url: `discover/tv?api_key=${API_KEY}&with_genres=18&sort_by=vote_count.desc&include_adult=false`,
    },
    Family: {
        title: 'Family',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10751&sort_by=vote_count.desc&include_adult=false`,
    },
    Kids: {
        title: 'Kids',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10762&sort_by=vote_count.desc&include_adult=false`,
    },
    Mystery: {
        title: 'Mystery',
        url: `discover/tv?api_key=${API_KEY}&with_genres=9648&sort_by=vote_count.desc&include_adult=false`,
    },
    Reality: {
        title: 'Reality',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10764&sort_by=vote_count.desc&include_adult=false`,
    },
    SciFi: {
        title: 'Sci-Fi',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10765&sort_by=vote_count.desc&include_adult=false`,
    },
    Talk: {
        title: 'Talk Show',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10767&sort_by=vote_count.desc&include_adult=false`,
    },
    War: {
        title: 'War',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10768&sort_by=vote_count.desc&include_adult=false`,
    },
    Western: {
        title: 'Western',
        url: `discover/tv?api_key=${API_KEY}&with_genres=37&sort_by=vote_count.desc&include_adult=false`,
    },
};