import {useRouter} from "next/router";
import React, {useState, useEffect} from 'react';
import ModalVideo from 'react-modal-video';
import movieTrailer from 'movie-trailer';
import Image from "next/image";
import {
    HomeIcon,
    BookmarkIcon,
    StarIcon,
    PlayIcon,
    HeartIcon,
    TrashIcon,
    FilmIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from '../components/HeaderItem';
import Cast from "../components/Cast";
import FlipMove from "react-flip-move";

function MovieInfo() {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const router = useRouter();
    const movie = router.query;

    const [cast, setCast] = useState([]);
    const [movie2, setMovie2] = useState([]);
    const [trailerID, setTrailerId] = useState([]);
    const searchReq = async () => {
        const mediaType = movie.media_type || 'movie';
        const castReq = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        const movie2Req = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        if(movie2Req) {
            setMovie2(movie2Req);
        }
        if(castReq.cast) {
            setCast(castReq.cast.slice(0, 16));
        }
        const trailerId = await movieTrailer(movie.title || movie.original_name, {id: true});
        setTrailerId(trailerId);
    }

    const genres = '';
    for(let i in movie2.genres) {
        genres += movie2.genres[i].name + ', ';
    }

    useEffect(() => {searchReq()}, [movie]);

    const [isOpen, setOpen] = useState(false)

    const routePage = (page) => router.push(page);

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/Favorites')}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>

            <div className="w-full">
                <div className="mx-auto px-20 flex-col flex gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 lg:w-8/12 xl:w-3/5">
                        <h1 className="font-bold text-7xl text-center text-red-400">{movie.title || movie.original_name}</h1>
                        <div className="flex items-center justify-center space-x-40 font-bold text-xl text-center text-white">
                            <p>{movie.release_date === undefined ? movie.first_air_date.slice(0, -6) : movie.release_date.slice(0, -6)}</p>                            
                            <p>{genres.slice(0, -2)}</p>
                            <p>{`${movie2.runtime || 'N/A'} mins`}</p>
                            <StarIcon className="h-6 mx-2" />{Math.round(movie.vote_average * 10) / 10}/10
                        </div>
                        <p className="text-xl text-white text-center font-style: italic">{movie2.tagline}</p>
                        <p className="text-2xl text-white line-clamp-16">{movie.description || movie.overview}</p>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailerID} onClose={() => setOpen(false)} />

                        <div className="flex items-center justify-center space-x-4">
                            <button className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded inline-flex items-center justify-center"><PlayIcon className="h-12" />Play</button>
                            <button onClick={()=> setOpen(true)} className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded inline-flex items-center justify-center"><FilmIcon className="h-12" />Trailer</button>
                            <button className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded inline-flex items-center justify-center"><HeartIcon className="h-12" /></button>
                            <button className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded inline-flex items-center justify-center"><TrashIcon className="h-12" /></button>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/12 mx-14">
                        <Image src={`${BASE_URL}${movie.poster_path}`} alt='' height={960} width={640}/>
                    </div>
                </div>
            </div>
            <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12">
                {cast?.map((cast) => cast.profile_path && (
                <>
                    <Cast member={cast} />
                </>
                ))}
            </FlipMove>
    </div>
    );
}

export default MovieInfo;