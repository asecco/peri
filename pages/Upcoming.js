import React, {useState, useEffect} from 'react';
import {
    HomeIcon,
    BookmarkIcon,
    CalendarIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from "../components/HeaderItem";
import Thumbnail from '../components/Thumbnail';
import FlipMove from 'react-flip-move';
import Image from "next/image";
import {useRouter} from "next/router";

function Upcoming() {
    const [upcoming, setUpcoming] = useState([]);
    const searchReq = async () => {
        const upcomingReq = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        if(upcomingReq) {
            setUpcoming(upcomingReq.results);
        }
    }

    useEffect(() => {searchReq()}, []);
    const router = useRouter();
    const routePage = (page) => router.push(page);

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/Upcoming')}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></div>
                    <div onClick={() => routePage('/Favorites')}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {upcoming.map((up) => (
                    <>
                        <Thumbnail result={up} />
                    </>
                    ))}
                </FlipMove>
            </div>
        </div>
    );
}

export default Upcoming;