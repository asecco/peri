import Head from 'next/head';
import Header from '../components/Header/Header';
import Results from '../components/Layout/Results';
import Footer from '../components/Footer/Footer';
import { API_KEY, API_URL } from '../utils/constants';

function Upcoming({ upcoming, page, totalPages }) {
    return (
        <div>
            <Head><title>{`Upcoming`}</title></Head>
            <Header />
            <p className='font-bold text-white text-4xl md:text-5xl mx-8 my-6 text-center md:text-left'>Upcoming</p>
            <Results results={upcoming} />
            <Footer type={'upcoming'} page={page} totalPages={totalPages} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const page = context.query.page || 1;
    if (page < 1) {
        return {
            redirect: {
                destination: '/upcoming/1',
                permanent: false,
            },
        };
    }

    const res = await fetch(`${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`).then((res) => res.json());
    const upcoming = res.results.map((up) => ({
        ...up,
        media_type: 'movie',
    }));
    const totalPages = res.total_pages;

    return {
        props: {
            upcoming,
            page: parseInt(page),
            totalPages: parseInt(totalPages)
        }
    }
}

export default Upcoming;