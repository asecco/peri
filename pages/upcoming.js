import Head from 'next/head';
import { useRouter } from "next/router";
import { ArrowCircleLeftIcon,ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "../components/FooterItem";
import Header from '../components/Header';
import PaginationFooter from '../components/PaginationFooter';
import Results from '../components/Results';
import { API_KEY, API_URL } from '../utils/constants';

function Upcoming({ upcoming, page, totalPages }) {
    const router = useRouter();
    return (
        <div>
            <Head><title>{`Upcoming`}</title></Head>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-14 my-6 text-center md:text-left'>Upcoming Movies</p>
            <Results results={upcoming} />
            <div className='flex flex-row justify-center gap-x-2 py-10 md:py-0 items-center h-auto'>
                <div onClick={() => router.push(`/upcoming/${page - 1}`)}><FooterItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                <PaginationFooter page={page} totalPages={totalPages} setPage={(pageNum) => router.push(`/upcoming/${pageNum}`)} />
                <div onClick={() => router.push(`/upcoming/${page + 1}`)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
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