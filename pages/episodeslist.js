import React, {useState, useEffect} from 'react';
import Image from "next/image";
import Header from '../components/Header';
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
    const air_date = router.query.air_date;
    const [episodes, setEpisodes] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const episodeReq = await fetch(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonNum}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            setEpisodes(episodeReq.episodes);
        }
        searchReq();
    }, []);

    return (
        <div>
            <Header />
            <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                    <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{`Season ${seasonNum}`}</h1>
                    <p className="font-bold lg:text-2xl 2xl:text-3xl text-white text-center">{`${air_date}`}</p>
                    <p className="text-center md:text-left text-base md:text-lg lg:text-2xl text-white line-clamp-14 mb-6 md:mb-0">{overview}</p>
                </div>

                <div className="w-8/12 md:w-4/12 lg:w-3/12 mx-10 md:mx-20 lg:mx-14">
                    <Image layout="responsive" src={`${BASE_URL}${poster_path}`} alt='' height={960} width={640}/>
                </div>
            </div>

            <div>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7">Episodes:</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
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

export default EpisodeList;