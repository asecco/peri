const API_KEY = process.env.API_KEY;

export default {
    fetchTrending: {
        title: 'Trending',
        url: `trending/all/week?api_key=${API_KEY}`,
    },
    fetchTopRated: {
        title: 'Top Rated',
        url: `movie/top_rated?api_key=${API_KEY}`,
    },
    fetchActionMovies: {
        title: 'Action',
        url: `discover/movie?api_key=${API_KEY}&with_genres=28`,
    },
    fetchAdventureMovies: {
        title: 'Adventure',
        url: `discover/movie?api_key=${API_KEY}&with_genres=12`,
    },
    fetchAnimationMovies: {
        title: 'Animation',
        url: `discover/movie?api_key=${API_KEY}&with_genres=16`,
    },
    fetchComedyMovies: {
        title: 'Comedy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=35`,
    },
    fetchCrimeMovies: {
        title: 'Crime',
        url: `discover/movie?api_key=${API_KEY}&with_genres=80`,
    },
    fetchDocumentaryMovies: {
        title: 'Documentary',
        url: `discover/movie?api_key=${API_KEY}&with_genres=99`,
    },
    fetchDramaMovies: {
        title: 'Drama',
        url: `discover/movie?api_key=${API_KEY}&with_genres=18`,
    },
    fetchFamilyMovies: {
        title: 'Family',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10751`,
    },
    fetchFantasyMovies: {
        title: 'Fantasy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=14`,
    },
    fetchHistoryMovies: {
        title: 'History',
        url: `discover/movie?api_key=${API_KEY}&with_genres=36`,
    },
    fetchHorrorMovies: {
        title: 'Horror',
        url: `discover/movie?api_key=${API_KEY}&with_genres=27`,
    },
    fetchMysteryMovies: {
        title: 'Mystery',
        url: `discover/movie?api_key=${API_KEY}&with_genres=9648`,
    },
    fetchRomanceMovies: {
        title: 'Romance',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
    },
    fetchSciFiMovies: {
        title: 'Sci-Fi',
        url: `discover/movie?api_key=${API_KEY}&with_genres=878`,
    },
    fetchThrillerMovies: {
        title: 'Thriller',
        url: `discover/movie?api_key=${API_KEY}&with_genres=53`,
    },
    fetchWarMovies: {
        title: 'War',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10752`,
    },
    fetchWesternMovies: {
        title: 'Western',
        url: `discover/movie?api_key=${API_KEY}&with_genres=37`,
    },
};