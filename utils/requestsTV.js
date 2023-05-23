import { API_KEY } from "./constants";

export default {
    popular: {
        title: 'Popular',
        url: `tv/popular?api_key=${API_KEY}`,
    },
    action: {
        title: 'Action',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10759&sort_by=vote_count.desc&include_adult=false`,
    },
    animation: {
        title: 'Animation',
        url: `discover/tv?api_key=${API_KEY}&with_genres=16&sort_by=vote_count.desc&include_adult=false`,
    },
    comedy: {
        title: 'Comedy',
        url: `discover/tv?api_key=${API_KEY}&with_genres=35&sort_by=vote_count.desc&include_adult=false`,
    },
    crime: {
        title: 'Crime',
        url: `discover/tv?api_key=${API_KEY}&with_genres=80&sort_by=vote_count.desc&include_adult=false`,
    },
    documentary: {
        title: 'Documentary',
        url: `discover/tv?api_key=${API_KEY}&with_genres=99&sort_by=vote_count.desc&include_adult=false`,
    },
    drama: {
        title: 'Drama',
        url: `discover/tv?api_key=${API_KEY}&with_genres=18&sort_by=vote_count.desc&include_adult=false`,
    },
    family: {
        title: 'Family',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10751&sort_by=vote_count.desc&include_adult=false`,
    },
    kids: {
        title: 'Kids',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10762&sort_by=vote_count.desc&include_adult=false`,
    },
    mystery: {
        title: 'Mystery',
        url: `discover/tv?api_key=${API_KEY}&with_genres=9648&sort_by=vote_count.desc&include_adult=false`,
    },
    reality: {
        title: 'Reality',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10764&sort_by=vote_count.desc&include_adult=false`,
    },
    scifi: {
        title: 'Sci-Fi',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10765&sort_by=vote_count.desc&include_adult=false`,
    },
    talk: {
        title: 'Talk Show',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10767&sort_by=vote_count.desc&include_adult=false`,
    },
    war: {
        title: 'War',
        url: `discover/tv?api_key=${API_KEY}&with_genres=10768&sort_by=vote_count.desc&include_adult=false`,
    },
    western: {
        title: 'Western',
        url: `discover/tv?api_key=${API_KEY}&with_genres=37&sort_by=vote_count.desc&include_adult=false`,
    },
};