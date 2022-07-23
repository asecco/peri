import React, {useState} from 'react';
import {
    HomeIcon,
    BookmarkIcon,
    CalendarIcon,
    ThumbUpIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from "../components/HeaderItem";
import Image from "next/image";
import Episodes from '../components/Episodes';
import FlipMove from 'react-flip-move';
import {useRouter} from "next/router";

function EpisodeList() {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const router = useRouter();
    const showId = router.query.showId;
    const seasonNum = router.query.season;
    const overview = router.query.overview;
    const poster_path = router.query.poster;
    const routePage = (page) => router.push(page);

    const [episodes, setEpisodes] = useState([]);
    const searchReq = async () => {
        const episodeReq = await fetch(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonNum}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        if(episodeReq) {
            setEpisodes(episodeReq.episodes);
        }
    }
    searchReq();

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/Upcoming')}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></div>
                    <div onClick={() => routePage('/Favorites')}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></div>
                    <div onClick={() => routePage('/Recommended')}><HeaderItem title='RECOMMENDED' Icon={ThumbUpIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>

            <div className="mx-auto px-20 flex-col flex gap-10 object-bottom md:flex-row">
                <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                    <h1 className="font-bold md:text-5xl lg:text-7xl text-center text-red-400">{`Season ${seasonNum}`}</h1>
                    <p className="lg:text-2xl text-white line-clamp-14">{overview}</p>
                </div>

                <div className="w-full lg:w-3/12 mx-14">
                    <Image layout="responsive" src={`${BASE_URL}${poster_path}`} alt='' height={960} width={640}/>
                </div>
            </div>

            <div>
                <FlipMove className="px-5 my-10 md:grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
                    {episodes?.map((episode) => (
                    <>
                        <Episodes result={episode} />
                    </>
                    ))}
                </FlipMove>
            </div>
        </div>
    );
}

export default EpisodeList;;