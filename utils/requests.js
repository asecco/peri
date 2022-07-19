const API_KEY = process.env.API_KEY;

export default {
    TopRated: {
        title: 'Top Rated',
        url: `movie/top_rated?api_key=${API_KEY}`,
    },
    ActionMovies: {
        title: 'Action',
        url: `discover/movie?api_key=${API_KEY}&with_genres=28`,
    },
    AdventureMovies: {
        title: 'Adventure',
        url: `discover/movie?api_key=${API_KEY}&with_genres=12`,
    },
    AnimationMovies: {
        title: 'Animation',
        url: `discover/movie?api_key=${API_KEY}&with_genres=16`,
    },
    ComedyMovies: {
        title: 'Comedy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=35`,
    },
    CrimeMovies: {
        title: 'Crime',
        url: `discover/movie?api_key=${API_KEY}&with_genres=80`,
    },
    DocumentaryMovies: {
        title: 'Documentary',
        url: `discover/movie?api_key=${API_KEY}&with_genres=99`,
    },
    DramaMovies: {
        title: 'Drama',
        url: `discover/movie?api_key=${API_KEY}&with_genres=18`,
    },
    FamilyMovies: {
        title: 'Family',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10751`,
    },
    FantasyMovies: {
        title: 'Fantasy',
        url: `discover/movie?api_key=${API_KEY}&with_genres=14`,
    },
    HistoryMovies: {
        title: 'History',
        url: `discover/movie?api_key=${API_KEY}&with_genres=36`,
    },
    HorrorMovies: {
        title: 'Horror',
        url: `discover/movie?api_key=${API_KEY}&with_genres=27`,
    },
    MysteryMovies: {
        title: 'Mystery',
        url: `discover/movie?api_key=${API_KEY}&with_genres=9648`,
    },
    RomanceMovies: {
        title: 'Romance',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10749`,
    },
    SciFiMovies: {
        title: 'Sci-Fi',
        url: `discover/movie?api_key=${API_KEY}&with_genres=878`,
    },
    ThrillerMovies: {
        title: 'Thriller',
        url: `discover/movie?api_key=${API_KEY}&with_genres=53`,
    },
    WarMovies: {
        title: 'War',
        url: `discover/movie?api_key=${API_KEY}&with_genres=10752`,
    },
    WesternMovies: {
        title: 'Western',
        url: `discover/movie?api_key=${API_KEY}&with_genres=37`,
    },
};