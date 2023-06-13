import Head from 'next/head';
import Header from '../components/Header/Header';
import Results from '../components/Layout/Results';
import Footer from '../components/Footer/Footer';
import Genres from '../components/Layout/Genres';
import requests from '../utils/requests';
import { API_URL } from '../utils/constants';

function Movies({ movies, genre, page, totalPages, voteAverage, minYear, maxYear, sortBy }) {
    return (
        <div>
            <Head><title>{`Movies | ${requests[genre].title}`}</title></Head>
            <Header />
            <Genres type={'movies'} genre={genre} />
            <Results results={movies} />
            <Footer type={'movies'} genre={genre} page={page} totalPages={totalPages} voteAverage={voteAverage} minYear={minYear} maxYear={maxYear} sortBy={sortBy} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const genre = query.genre || 'popular';
    const page = Number(query.page) || 1;

    const currentYear = new Date().getFullYear();
    const voteAverage = query.voteAverage || 0;
    const minYear = query.minYear || 1900;
    const maxYear = query.maxYear || currentYear;
    const sortBy = query.sortBy || 'vote_count.desc';

    let req;
    if (genre === 'popular') {
        req = `${API_URL}${requests[genre].url}&page=${page}&with_original_language=en`;
    } else {
        req = `${API_URL}${requests[genre].url}&page=${page}&with_original_language=en&vote_average.gte=${voteAverage}&primary_release_date.gte=${minYear}&primary_release_date.lte=${maxYear}&sort_by=${sortBy}`;
    }

    const res = await fetch(req).then((res) => res.json());
    const movies = res.results?.map((movie) => {
        return {
            ...movie,
            media_type: 'movie',
        };
    });

    return {
        props: {
            movies,
            genre,
            page,
            totalPages: res.total_pages,
            voteAverage,
            minYear,
            maxYear,
            sortBy,
        },
    }
}

export default Movies;