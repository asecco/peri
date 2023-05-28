import Head from 'next/head';
import Header from '../components/Header';
import Results from '../components/Results';
import Footer from '../components/Footer';
import Genres from '../components/Genres';
import requestsTV from '../utils/requestsTV';
import { API_URL } from '../utils/constants';

function TV({ tv, genre, page, totalPages }) {
    return (
        <div>
            <Head><title>{`TV | ${requestsTV[genre].title}`}</title></Head>
            <Header />
            <Genres type={'tv'} genre={genre} />
            <Results results={tv} />
            <Footer type={'tv'} genre={genre} page={page} totalPages={totalPages} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const genre = query.genre || 'popular';
    const page = Number(query.page) || 1;

    const req = await fetch(`${API_URL}${requestsTV[genre].url}&page=${page}&with_original_language=en`);
    const { results, total_pages } = await req.json();
    const tv = results.map((tv) => {
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
            totalPages: total_pages,
        }
    }
}

export default TV;