import Head from 'next/head';
import Header from '../components/Header';
import Results from '../components/Results';
import Footer from '../components/Footer';
import Genres from '../components/Genres';
import requests from '../utils/requests';
import { API_URL } from '../utils/constants';

function Movies({ movies, genre, page, totalPages }) {
    return (
        <div>
            <Head><title>{`Movies | ${requests[genre].title}`}</title></Head>
            <Header />
            <Genres type={'movies'} genre={genre} />
            <Results results={movies} />
            <Footer type={'movies'} genre={genre} page={page} totalPages={totalPages} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const genre = query.genre || 'popular';
    const page = Number(query.page) || 1;

    const res = await fetch(`${API_URL}${requests[genre].url}&page=${page}&with_original_language=en`).then((res) => res.json());
    const movies = res.results.map((movie) => {
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
        },
    }
}

export default Movies;