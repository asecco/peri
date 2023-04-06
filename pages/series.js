import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "../components/FooterItem";
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import PaginationFooter from '../components/PaginationFooter';
import FlipMove from 'react-flip-move';
import requestsTV from '../utils/requestsTV';
import { API_URL } from '../utils/constants';

function Series() {
    const router = useRouter();
    const [series, setSeries] = useState([]);
    const [genre, setGenre] = useState('Popular');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        document.title = `Series | ${genre}`;
        const searchReq = async () => {
            const req = await fetch(`${API_URL}${requestsTV[genre].url}&page=${page}&with_original_language=en`).then((res) => res.json());
            const arr = req.results;
            arr.forEach(obj => {
                obj.media_type = 'tv';
            });
            setSeries(arr);
            setTotalPages(req.total_pages);
        }
        searchReq();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page, genre]);

    useEffect(() => {
        const { query } = router;
        const { genre: urlGenre, page: urlPage } = query;
        setGenre(urlGenre || 'Popular');
        setPage(Number(urlPage) || 1);
      }, [router]);

    const genreRoute = (key) => {
        router.push(`/series/${key}/1`);
        setGenre(key);
        setPage(1);
    }

    const pageRoute = (pageNumber) => {
        const newPage = Math.max(pageNumber, 1);
        router.push(`/series/${genre}/${newPage}`);
        setPage(newPage);
    }  

    return (
        <div>
            <Header />
            <nav className="relative">
                <div className="flex px-10 p-2 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
                    {Object.entries(requestsTV).map(([key, {title}]) => (
                        <h2 key={key} onClick={() => genreRoute(key)} className="last:pr-10 cursor-pointer transition duration-100 transform hover:scale-125 text-white hover:text-red-400 active:text-red-500">{title}</h2>
                    ))}
                </div>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#202F3B] h-10 w-1/12" />
            </nav>

            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7 my-6 text-center md:text-left'>{genre}</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {series.map((tv) => tv.poster_path && (
                    <>
                        <Thumbnail result={tv} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
                <div onClick={() => pageRoute(page - 1)}><FooterItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                <PaginationFooter page={page} totalPages={totalPages} setPage={pageRoute} />
                <div onClick={() => pageRoute(page + 1)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
        </div>
    );
}

export default Series;