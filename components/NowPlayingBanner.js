import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { BASE_URL } from "../utils/requests";

function NowPlayingBanner() {
    const router = useRouter();
    const routeQuery = () => router.push({pathname: '/MovieInfo', query: nowPlaying}, `/${nowPlaying.id}`);

    const [nowPlaying, setNowPlaying] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const nowReq = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            const ranNowReq = Math.floor(Math.random() * nowReq.results.length);
            setNowPlaying(nowReq.results[ranNowReq]);
        }
        searchReq();
    }, []);

    return (
        <div className="w-full relative h-96 overflow-hidden px-8 hidden md:block">
            <div class="absolute w-full h-full opacity-50 top-0 left-0 z-10 bg-gradient-to-r from-primary via-primary"></div>
                <div class="absolute z-20 flex flex-col items-left w-1/2 justify-center h-full px-10">
                    <div class="text-red-400 font-bold text-5xl text-center">{nowPlaying.title || nowPlaying.original_title}</div>
                    <div class="text-white text-xl mt-4 font-medium md:line-clamp-5 lg:line-clamp-6">{nowPlaying.overview}</div>
                    <div className='text-center'>
                        <button onClick={routeQuery} title="More Info" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-primary hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center my-4">More Info</button>
                    </div>
                </div>
            <Image src={`${BASE_URL}${nowPlaying.backdrop_path || nowPlaying.poster_path}`} alt='' height={1080} width={1920}/>
        </div>
    );
}

export default NowPlayingBanner;