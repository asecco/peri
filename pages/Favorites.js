import {
    HomeIcon,
    BookmarkIcon,
    CalendarIcon,
    ThumbUpIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from "../components/HeaderItem";
import Image from "next/image";
import {useRouter} from "next/router";
import React, {useState, useEffect} from 'react';
import FlipMove from 'react-flip-move';
import Thumbnail from '../components/Thumbnail';

function Favorites() { 
    const router = useRouter();
    const routePage = (page) => router.push(page);
    const [favRes, setFavRes] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const favArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            for(let i in favorites) {
                const favReq = await fetch(`https://api.themoviedb.org/3/movie/${favorites[i]}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
                favArr.push(favReq);
                setFavRes(favArr);
            }
        }
        searchReq();
    }, []);

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
            <p className='font-bold md:text-5xl lg:text-6xl text-left mx-6 text-white'>You've Enjoyed</p>

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {favRes?.map((fav) => (
                    <>
                        <Thumbnail result={fav} />
                    </>
                    ))}
                </FlipMove>
            </div>
        </div>
    );
}

export default Favorites;