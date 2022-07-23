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
    const router = useRouter();
    const seasons = router.query;
    const showId = router.query.showId;
    const seasonNum = router.query.season;
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