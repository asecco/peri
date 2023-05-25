import Head from 'next/head';
import { useRouter } from "next/router";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "../components/FooterItem";
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import PaginationFooter from '../components/PaginationFooter';
import FlipMove from 'react-flip-move';
import requestsTV from '../utils/requestsTV';
import { API_URL } from '../utils/constants';

function TV({ tv, genre, page, totalPages }) {
    const router = useRouter();
    const genreRoute = (key) => {
        router.push(`/tv/${key}/1`);
    }

    const pageRoute = (pageNumber) => {
        const newPage = Math.max(pageNumber, 1);
        router.push(`/tv/${genre}/${newPage}`);
    }  

    return (
        <div>
            <Head><title>{`TV | ${requestsTV[genre].title}`}</title></Head>
            <Header />
            <nav className="relative">
                <div className="flex px-10 p-2 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
                    {Object.entries(requestsTV).map(([key, {title}]) => (
                        <h2 key={key} onClick={() => genreRoute(key)} className="last:pr-10 cursor-pointer transition duration-100 transform hover:scale-125 text-white hover:text-red-400 active:text-red-500">{title}</h2>
                    ))}
                </div>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#202F3B] h-10 w-1/12" />
            </nav>

            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-14 my-6 text-center md:text-left'>{requestsTV[genre].title}</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {tv.map((tv) => tv.poster_path && (
                    <>
                        <Thumbnail result={tv} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row justify-center gap-x-2 py-10 md:py-0 items-center h-auto'>
                <div onClick={() => pageRoute(page - 1)}><FooterItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                <PaginationFooter page={page} totalPages={totalPages} setPage={pageRoute} />
                <div onClick={() => pageRoute(page + 1)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
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