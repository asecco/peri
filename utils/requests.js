import { API_KEY } from "./constants";

export default {
    popular: {
        title: 'Popular',
        url: `movie/popular?api_key=${API_KEY}`,
    },
    toprated: {
        title: 'Top Rated',
        url: `movie/top_rated?api_key=${API_KEY}`,
    },
    action: {
        title: 'Action',
        url: `discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=vote_count.desc&include_adult=false`,
    },
    adventure: {
        title: 'Adventure',
        url: `discover/movie?api_key=${API_KEY}&with_genres=12&sort_by=vote_count.desc&include_adult=false`,
    },
    animation: {
        title: 'Animation',
        url: `discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=vote_count.desc&include_adult=false`,
    },
    comedy: {
        title: 'Comedy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=35&sort_by=vote_count.desc&include_adult=false`,
    },
    crime: {
        title: 'Crime',
        url: `discover/movie?api_key=${API_KEY}&with_genres=80&sort_by=vote_count.desc&include_adult=false`,
    },
    documentary: {
        title: 'Documentary',
        url: `discover/movie?api_key=${API_KEY}&with_genres=99&sort_by=vote_count.desc&include_adult=false`,
    },
    drama: {
        title: 'Drama',
        url: `discover/movie?api_key=${API_KEY}&with_genres=18&sort_by=vote_count.desc&include_adult=false`,
    },
    family: {
        title: 'Family',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10751&sort_by=vote_count.desc&include_adult=false`,
    },
    fantasy: {
        title: 'Fantasy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=14&sort_by=vote_count.desc&include_adult=false`,
    },
    history: {
        title: 'History',
        url: `discover/movie?api_key=${API_KEY}&with_genres=36&sort_by=vote_count.desc&include_adult=false`,
    },
    horror: {
        title: 'Horror',
        url: `discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=vote_count.desc&include_adult=false`,
    },
    music: {
        title: 'Music',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10402&sort_by=vote_count.desc&include_adult=false`,
    },
    mystery: {
        title: 'Mystery',
        url: `discover/movie?api_key=${API_KEY}&with_genres=9648&sort_by=vote_count.desc&include_adult=false`,
    },
    romance: {
        title: 'Romance',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10749&sort_by=vote_count.desc&include_adult=false`,
    },
    scifi: {
        title: 'Sci-Fi',
        url: `discover/movie?api_key=${API_KEY}&with_genres=878&sort_by=vote_count.desc&include_adult=false`,
    },
    thriller: {
        title: 'Thriller',
        url: `discover/movie?api_key=${API_KEY}&with_genres=53&sort_by=vote_count.desc&include_adult=false`,
    },
    war: {
        title: 'War',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10752&sort_by=vote_count.desc&include_adult=false`,
    },
    western: {
        title: 'Western',
        url: `discover/movie?api_key=${API_KEY}&with_genres=37&sort_by=vote_count.desc&include_adult=false`,
    },
};