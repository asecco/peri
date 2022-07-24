import React, {useState, useEffect} from 'react';
import {
    HomeIcon,
    BookmarkIcon,
    CalendarIcon,
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
    ThumbUpIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from "../components/HeaderItem";
import Thumbnail from '../components/Thumbnail';
import FlipMove from 'react-flip-move';
import Image from "next/image";
import {useRouter} from "next/router";

function Upcoming() {
    const [upcoming, setUpcoming] = useState([]);
    const [page, setPage] = useState(1);
    if(page < 1) {
        setPage(1);
    }
    useEffect(() => {
        const searchReq = async () => {
            const upcomingReq = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`).then((res) => res.json());
            if(upcomingReq) {
                setUpcoming(upcomingReq.results);
            }
        }
        searchReq();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page]);

    const router = useRouter();
    const routePage = (page) => router.push(page);

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl mt-2 md:mt-0'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/Upcoming')}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></div>
                    <div onClick={() => routePage('/Favorites')}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></div>
                    <div onClick={() => routePage('/Recommended')}><HeaderItem title='RECOMMENDED' Icon={ThumbUpIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>

            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7'>Upcoming Movies</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {upcoming.map((up) => (
                    <>
                        <Thumbnail result={up} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
                <div onClick={() => setPage(page - 1)}><HeaderItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                <div onClick={() => setPage(page + 1)}><HeaderItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
        </div>
    );
}

export default Upcoming;