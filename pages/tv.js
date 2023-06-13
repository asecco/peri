import Head from 'next/head';
import Header from '../components/Header/Header';
import Results from '../components/Layout/Results';
import Footer from '../components/Footer/Footer';
import Genres from '../components/Layout/Genres';
import requestsTV from '../utils/requestsTV';
import { API_URL } from '../utils/constants';

function TV({ tv, genre, page, totalPages, voteAverage, minYear, maxYear, sortBy }) {
    return (
        <div>
            <Head><title>{`TV | ${requestsTV[genre].title}`}</title></Head>
            <Header />
            <Genres type={'tv'} genre={genre} />
            <Results results={tv} />
            <Footer type={'tv'} genre={genre} page={page} totalPages={totalPages} voteAverage={voteAverage} minYear={minYear} maxYear={maxYear} sortBy={sortBy} />
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
        req = `${API_URL}${requestsTV[genre]?.url}&page=${page}&with_original_language=en`;
    } else {
        req = `${API_URL}${requestsTV[genre]?.url}&page=${page}&with_original_language=en&vote_average.gte=${voteAverage}&first_air_date.gte=${minYear}&first_air_date.lte=${maxYear}&sort_by=${sortBy}`;
    }

    if (!requestsTV[genre]) {
        return {
            notFound: true,
        };
    }

    const res = await fetch(req).then((res) => res.json());
    const tv = res.results?.map((tv) => {
        return {
            ...tv,
            media_type: 'tv',
        };
    });

    return {
        props: {
            tv,
            genre,
            page,
            totalPages: res.total_pages,
            voteAverage,
            minYear,
            maxYear,
            sortBy,
        }
    }
}

export default TV;