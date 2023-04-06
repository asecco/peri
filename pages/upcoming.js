import Head from 'next/head';
import { useRouter } from "next/router";
import { ArrowCircleLeftIcon,ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "../components/FooterItem";
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import PaginationFooter from '../components/PaginationFooter';
import FlipMove from 'react-flip-move';
import { API_KEY, API_URL } from '../utils/constants';

function Upcoming({ upcoming, page, totalPages }) {
    const router = useRouter();
    return (
        <div>
            <Head><title>{`Upcoming`}</title></Head>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7 my-6 text-center md:text-left'>Upcoming Movies</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {upcoming.map((up) => up.poster_path && (
                    <>
                        <Thumbnail result={up} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
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