import {
    HomeIcon,
    BookmarkIcon,
    CalendarIcon,
    ThumbUpIcon,
    VideoCameraIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from "../components/HeaderItem";
import Image from "next/image";
import {useRouter} from "next/router";
import React, {useState, useEffect} from 'react';
import FlipMove from 'react-flip-move';
import Thumbnail from '../components/Thumbnail';

function Recommended() { 
    const router = useRouter();
    const routePage = (page) => router.push(page);
    const [recRes, setRecRes] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const recArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            for(let i in favorites) {
                const recommendReq = await fetch(`https://api.themoviedb.org/3/${favorites[i].type}/${favorites[i].id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
                for(let i in recommendReq.results) {
                    if(recommendReq.results[i].original_language !== 'en') {
                        recommendReq.results.splice(i, 1);
                    }
                    if(!recArr.includes(recommendReq.results[i])) {
                        recArr.push(recommendReq.results[i]);
                    }
                }
            }
            recArr.sort(() => Math.random() - 0.5);
            setRecRes(recArr.splice(0, 20));
        }
        searchReq();
    }, []);

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl mt-2 md:mt-0'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/PopularSeries')}><HeaderItem title='SERIES' Icon={VideoCameraIcon} /></div>
                    <div onClick={() => routePage('/Upcoming')}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></div>
                    <div onClick={() => routePage('/Favorites')}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></div>
                    <div onClick={() => routePage('/Recommended')}><HeaderItem title='RECOMMENDED' Icon={ThumbUpIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7'>Chosen For You</p>
            <div className='my-10 font-bold text-center mx-6 text-white'>
                <p className='text-xl md:text-2xl lg:text-4xl 2xl:text-6xl'>{recRes.length > 0 ? '' : 'There are currently no recommendations'}</p>
                <p className='text-lg md:text-lg lg:text-2xl 2xl:text-4xl'>{recRes.length > 0 ? '': 'Give a film a ♡ and check back!'}</p>
            </div> 

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {recRes?.map((rec) => (
                    <>
                        <Thumbnail result={rec} />
                    </>
                    ))}
                </FlipMove>
            </div>
        </div>
    );
}

export default Recommended;