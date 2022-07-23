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
    CalendarIcon,
    ThumbUpIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from '../components/HeaderItem';
import Cast from "../components/Cast";
import Thumbnail from "../components/Thumbnail";
import Seasons from "../components/Seasons";
import FlipMove from "react-flip-move";

function MovieInfo() {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const router = useRouter();
    const movie = router.query;

    const [cast, setCast] = useState([]);
    const [movie2, setMovie2] = useState([]);
    const [trailerID, setTrailerId] = useState([]);
    const [similarMovie, setSimilarMovie] = useState([]);
    const searchReq = async () => {
        const mediaType = movie.media_type || 'movie';
        const castReq = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        const movie2Req = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        const similarReq = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
        if(movie2Req) {
            setMovie2(movie2Req);
        }
        if(castReq.cast) {
            setCast(castReq.cast.slice(0, 12));
        }
        if(similarReq.results) {
            setSimilarMovie(similarReq.results.slice(0, 12));
        }
        const trailerId = await movieTrailer(`${movie.title || movie.original_name}`, {id: true});
        setTrailerId(trailerId);
        checkRelease();
        checkSeasons();
    }

    const genres = '';
    for(let i in movie2.genres) {
        genres += movie2.genres[i].name + ', ';
    }

    const [releaseYear, setReleaseYear] = useState([]);
    const checkRelease = () => {
        if(movie.media_type === 'movie') {
            const sliced = movie.release_date.slice(0, -6)
            setReleaseYear(sliced);
        } else if(movie.media_type === 'tv') {
            const sliced = movie.first_air_date.slice(0, -6)
            setReleaseYear(sliced);
        } else {
            const currentYear = new Date().getFullYear();
            setReleaseYear(currentYear);
        }
    }

    const [seasons, setSeasons] = useState([]);
    const checkSeasons = () => {
        if(movie.media_type === 'tv') {
            setSeasons(movie2.seasons)
        }
    }

    useEffect(() => {searchReq()}, [movie]);

    const [isOpen, setOpen] = useState(false);

    const routePage = (page) => router.push(page);

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

            <div className="w-full">
                <div className="mx-auto px-20 flex-col flex gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                        <h1 className="font-bold md:text-5xl lg:text-7xl text-center text-red-400">{movie.title || movie.original_name}</h1>
                        <div className="flex items-center justify-center lg:space-x-20 font-bold lg:text-lg md:text-base md:space-x-6 text-center text-white">
                            <p>{movie2.status}</p>
                            <p>{releaseYear}</p>
                            <p className=" xl:truncate">{genres.slice(0, -2)}</p>
                            <p>{`${movie2.runtime || movie2.episode_run_time} mins`}</p>
                            <StarIcon className="h-6 mx-2" />{Math.round(movie.vote_average * 10) / 10}/10
                        </div>
                        <p className="lg:text-xl text-white text-center font-style: italic">{movie2.tagline}</p>
                        <p className="lg:text-2xl text-white line-clamp-14">{movie.description || movie.overview}</p>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailerID === null ? "dQw4w9WgXcQ" : trailerID} onClose={() => setOpen(false)} />

                        <div className="flex items-center justify-center space-x-4">
                            <button title="Play" className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded-2xl inline-flex items-center justify-center"><PlayIcon className="h-12" /></button>
                            <button title="Watch Trailer" onClick={()=> setOpen(true)} className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded-2xl inline-flex items-center justify-center"><FilmIcon className="h-12" /></button>
                            <button title="Favorite" className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded-2xl inline-flex items-center justify-center"><HeartIcon className="h-12" /></button>
                            <button title="Unfavorite" className="h-14 w-28 bg-red-400 hover:bg-red-500 text-white text-lg font-bold rounded-2xl inline-flex items-center justify-center"><TrashIcon className="h-12" /></button>
                        </div>
                    </div>
                    <div className="w-full lg:w-3/12 mx-14">
                        <Image layout="responsive" src={`${BASE_URL}${movie.poster_path}`} alt='' height={960} width={640}/>
                    </div>
                </div>
            </div>

            <div>
                <p className="font-bold text-white sm:text-xl md:text-2xl lg:text-3xl mx-7">{movie.media_type === 'movie' ? '' : 'Seasons:'}</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12">
                    {seasons?.map((season) => (
                    <>
                        <Seasons result={season} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div>
                <p className="font-bold text-white sm:text-xl md:text-2xl lg:text-3xl mx-7">Similar:</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10">
                    {similarMovie?.map((similar) => (
                    <>
                        <Thumbnail result={similar} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div>
                <p className="font-bold text-white sm:text-xl md:text-2xl lg:text-3xl mx-7">Cast:</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10">
                    {cast?.map((cast) => cast.profile_path && (
                    <>
                        <Cast member={cast} />
                    </>
                    ))}
                </FlipMove>
            </div>
    </div>
    );
}

export default MovieInfo;