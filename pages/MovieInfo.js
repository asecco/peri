import {useRouter} from "next/router";
import React, {useState, useEffect} from 'react';
import ModalVideo from 'react-modal-video';
import movieTrailer from 'movie-trailer';
import Image from "next/image";
import {
    StarIcon,
    PlayIcon,
    HeartIcon,
    TrashIcon,
    FilmIcon,
} from '@heroicons/react/outline';
import Header from '../components/Header';
import Cast from "../components/Cast";
import Recommend from "../components/Recommend";
import Seasons from "../components/Seasons";
import FlipMove from "react-flip-move";
import {ToastContainer, toast} from 'react-toastify';

function MovieInfo() {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const router = useRouter();
    const movie = router.query;
    const [cast, setCast] = useState([]);
    const [movie2, setMovie2] = useState([]);
    const [trailerID, setTrailerId] = useState([]);
    const [recommendMovie, setRecommendMovie] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {
        const searchReq = async () => {
            const mediaType = movie.media_type || 'movie';
            const castReq = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            const movie2Req = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            const recommendReq = await fetch(`https://api.themoviedb.org/3/${mediaType}/${movie.id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            setMovie2(movie2Req);
            setSeasons(movie2Req.seasons);
            setCast(castReq.cast.slice(0, 12));
            setRecommendMovie(recommendReq.results.slice(0, 12));
            const trailerId = await movieTrailer(`${movie.title || movie.original_name}`, {id: true});
            setTrailerId(trailerId);
            checkRelease();
        }
        searchReq();
    }, [movie.id]);

    const genres = '';
    for(let i in movie2.genres) {
        genres += movie2.genres[i].name + ', ';
    }

    const [releaseYear, setReleaseYear] = useState([]);
    const [recommendDiv, setRecommendDiv] = useState(false);
    const checkRelease = () => {
        if(movie.media_type === 'movie') {
            const sliced = movie.release_date.slice(0, -6)
            setReleaseYear(sliced);
        } else if(movie.media_type === 'tv') {
            const sliced = movie.first_air_date.slice(0, -6)
            setReleaseYear(sliced);
            setRecommendDiv(true);
        } else {
            setReleaseYear(movie.release_date);
        }
    }

    const params = {
        id: movie.id,
        type : movie.media_type,
    }

    const addToFav = () => {
        const localStorageParams = localStorage.getItem('favorites');
        if(localStorageParams) {
            const localStorageParamsObj = JSON.parse(localStorageParams);
            const localStorageParamsObjIds = localStorageParamsObj.map(obj => obj.id);
            if(!localStorageParamsObjIds.includes(movie.id)) {
                localStorageParamsObj.push(params);
                localStorage.setItem('favorites', JSON.stringify(localStorageParamsObj));
                toastNotify('add');
            }
        } else {
            localStorage.setItem('favorites', JSON.stringify([params]));
        }
    }

    const removeFromFav = () => {
        const localStorageParams = localStorage.getItem('favorites');
        if(localStorageParams) {
            const localStorageParamsObj = JSON.parse(localStorageParams);
            const localStorageParamsObjIds = localStorageParamsObj.map(obj => obj.id);
            if(localStorageParamsObjIds.includes(movie.id)) {
                const localStorageParamsObjIds = localStorageParamsObj.map(obj => obj.id);
                const index = localStorageParamsObjIds.indexOf(movie.id);
                localStorageParamsObj.splice(index, 1);
                localStorage.setItem('favorites', JSON.stringify(localStorageParamsObj));
                toastNotify('remove');
            }
        }
    }

    const [runtime, setRunTime] = useState([]);
    useEffect(() => {
        if(movie.media_type === 'movie') {
            const minutes = movie2.runtime % 60;
            const hours = Math.floor(movie2.runtime / 60);
            setRunTime(`${hours}h ${minutes}min`);
        } else {
            setRunTime(`${movie2.episode_run_time} mins`);
        }
    }, [movie2.runtime, movie2.episode_run_time]);

    const toastNotify = (status) => {
        if(status === 'add') {
            toast.success('Added to favorites', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                pauseOnFocusLoss: false,
            });
        } else {
            toast.info('Removed from favorites', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                pauseOnFocusLoss: false,
                    
            });
        }
    }

    return (
        <div>
            <ToastContainer theme="dark"/>
            <Header />
            <div className="w-full">
                <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                        <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{movie.title || movie.original_name}</h1>
                        <div className="flex items-center justify-center space-x-5 lg:space-x-20 font-bold lg:text-lg text-sm text-center text-white">
                            <p>{movie2.status}</p>
                            <p>{releaseYear}</p>
                            <p className="xl:truncate">{genres.slice(0, -2)}</p>
                            <p>{runtime}</p>
                            <StarIcon className="h-10 my-4 lg:h-6 lg:mx-2 lg:my-0" />{Math.round(movie.vote_average * 10) / 10}/10
                        </div>
                        <p className="lg:text-xl text-white text-center font-style: italic">{movie2.tagline}</p>
                        <p className="text-center text-base md:text-left lg:text-2xl text-white line-clamp-14">{movie.description || movie.overview}</p>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailerID === null ? "dQw4w9WgXcQ" : trailerID} onClose={() => setOpen(false)} />

                        <div className="flex items-center justify-center space-x-4 my-2">
                            <button title="Play" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><PlayIcon className="h-12" /></button>
                            <button title="Watch Trailer" onClick={()=> setOpen(true)} className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><FilmIcon className="h-12" /></button>
                            <button onClick={addToFav} title="Favorite" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><HeartIcon className="h-12" /></button>
                            <button onClick={removeFromFav} title="Unfavorite" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><TrashIcon className="h-12" /></button>
                        </div>
                    </div>
                    <div className="w-8/12 md:w-4/12 lg:w-3/12 mx-10 md:mx-20 lg:mx-14">
                        <Image layout="responsive" src={`${BASE_URL}${movie.poster_path}`} alt='' height={960} width={640}/>
                    </div>
                </div>
            </div>

            <div>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7 mt-10 md:mt-4 lg:mt-0">{movie.media_type != 'tv' ? '' : 'Seasons:'}</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12">
                    {seasons?.map((season) => season.poster_path && (
                    <>
                        <Seasons result={season} id={movie2.id} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div hidden={recommendDiv}>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7">More Like This:</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10">
                    {recommendMovie?.map((rec) => rec.backdrop_path && (
                    <>
                        <Recommend result={rec} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7">Cast:</p>
                <FlipMove className="px-10 md:px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10">
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