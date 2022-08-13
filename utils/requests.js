import { API_KEY } from "./constants";

export default {
    Popular: {
        title: 'Popular',
        url: `movie/popular?api_key=${API_KEY}`,
    },
    TopRated: {
        title: 'Top Rated',
        url: `movie/top_rated?api_key=${API_KEY}`,
    },
    Action: {
        title: 'Action',
        url: `discover/movie?api_key=${API_KEY}&with_genres=28&sort_by=vote_count.desc&include_adult=false`,
    },
    Adventure: {
        title: 'Adventure',
        url: `discover/movie?api_key=${API_KEY}&with_genres=12&sort_by=vote_count.desc&include_adult=false`,
    },
    Animation: {
        title: 'Animation',
        url: `discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=vote_count.desc&include_adult=false`,
    },
    Comedy: {
        title: 'Comedy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=35&sort_by=vote_count.desc&include_adult=false`,
    },
    Crime: {
        title: 'Crime',
        url: `discover/movie?api_key=${API_KEY}&with_genres=80&sort_by=vote_count.desc&include_adult=false`,
    },
    Documentary: {
        title: 'Documentary',
        url: `discover/movie?api_key=${API_KEY}&with_genres=99&sort_by=vote_count.desc&include_adult=false`,
    },
    Drama: {
        title: 'Drama',
        url: `discover/movie?api_key=${API_KEY}&with_genres=18&sort_by=vote_count.desc&include_adult=false`,
    },
    Family: {
        title: 'Family',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10751&sort_by=vote_count.desc&include_adult=false`,
    },
    Fantasy: {
        title: 'Fantasy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=14&sort_by=vote_count.desc&include_adult=false`,
    },
    History: {
        title: 'History',
        url: `discover/movie?api_key=${API_KEY}&with_genres=36&sort_by=vote_count.desc&include_adult=false`,
    },
    Horror: {
        title: 'Horror',
        url: `discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=vote_count.desc&include_adult=false`,
    },
    Mystery: {
        title: 'Mystery',
        url: `discover/movie?api_key=${API_KEY}&with_genres=9648&sort_by=vote_count.desc&include_adult=false`,
    },
    Romance: {
        title: 'Romance',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10749&sort_by=vote_count.desc&include_adult=false`,
    },
    SciFi: {
        title: 'Sci-Fi',
        url: `discover/movie?api_key=${API_KEY}&with_genres=878&sort_by=vote_count.desc&include_adult=false`,
    },
    Thriller: {
        title: 'Thriller',
        url: `discover/movie?api_key=${API_KEY}&with_genres=53&sort_by=vote_count.desc&include_adult=false`,
    },
    War: {
        title: 'War',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10752&sort_by=vote_count.desc&include_adult=false`,
    },
    Western: {
        title: 'Western',
        url: `discover/movie?api_key=${API_KEY}&with_genres=37&sort_by=vote_count.desc&include_adult=false`,
    },
};