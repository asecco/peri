import Head from 'next/head';
import { useRouter } from "next/router";
import { API_KEY, WATCHMODE_API_KEY, BASE_URL, API_URL } from '../utils/constants';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import ModalVideo from 'react-modal-video';
import movieTrailer from 'movie-trailer';
import Image from "next/image";
import { StarIcon, PlayIcon, HeartIcon, FilmIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Cast from "../components/Cast";
import Recommend from "../components/Recommend";
import Seasons from "../components/Seasons";
import FlipMove from "react-flip-move";
import { ToastContainer, toast } from 'react-toastify';
import { toastNotify, alertParams } from "../utils/notifications";

function MovieInfo() {
    const router = useRouter();
    const movie = router.query;
    const [cast, setCast] = useState([]);
    const [movie2, setMovie2] = useState([]);
    const [trailerID, setTrailerId] = useState([]);
    const [recommendMovie, setRecommendMovie] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const mediaType = movie.media_type || 'movie';
    useEffect(() => {
        const searchReq = async () => {
            const castReq = await fetch(`${API_URL}${mediaType}/${movie.id}/credits?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
            const movie2Req = await fetch(`${API_URL}${mediaType}/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`).then((res) => res.json());
            const recommendReq = await fetch(`${API_URL}${mediaType}/${movie.id}/recommendations?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
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

    const checkTrailer = () => {
        if(trailerID === null) {
            toast.error('No trailer available', alertParams);
        } else {
            setOpen(true);
        }
    }

    const genres = '';
    for(let i in movie2.genres) {
        movie2.genres.length = 3;
        genres += movie2.genres[i].name + ', ';
    }

    const [certification, setCertification] = useState([]);
    useEffect(() => {
        if(movie2.release_dates) {
            if(movie2.release_dates.results.length > 0) {
                const rating = movie2.release_dates.results.find(obj => obj.iso_3166_1 === 'US');
                if(rating) {
                    const cert = rating.release_dates.find(obj => obj.certification !== '');
                    if(cert) {
                        setCertification(cert.certification);
                    } else {
                        setCertification('N/A');
                    }
                } else {
                    setCertification('N/A');
                }
            }
        }
    }, [movie2.release_dates]);

    const [releaseYear, setReleaseYear] = useState([]);
    const [recommendDiv, setRecommendDiv] = useState(false);
    const checkRelease = () => {
        if(mediaType === 'movie') {
            const sliced = movie.release_date.slice(0, -6)
            setReleaseYear(sliced);
        } else if(mediaType === 'tv') {
            const sliced = movie.first_air_date.slice(0, -6)
            setReleaseYear(sliced);
            setRecommendDiv(true);
        } else {
            setReleaseYear(movie.release_date);
        }
    }

    const [isFav, setIsFav] = useState(false);
    useEffect(() => {
        const localStorageParams = localStorage.getItem('favorites');
        if(localStorageParams) {
            const localStorageParamsObj = JSON.parse(localStorageParams);
            const localStorageParamsObjIds = localStorageParamsObj.map(obj => obj.id);
            if(localStorageParamsObjIds.includes(movie.id)) {
                setIsFav(true);
            } else {
                setIsFav(false);
            }
        } else {
            setIsFav(false);
        }
    }, [isFav]);

    const params = {
        id: movie.id,
        type : mediaType,
    }

    const checkFav = () => {
        const localStorageParams = localStorage.getItem('favorites');
        const localStorageParamsObj = localStorageParams ? JSON.parse(localStorageParams) : [];
        const localStorageParamsObjIds = localStorageParamsObj.map(obj => obj.id);
        
        if (localStorageParamsObjIds.includes(movie.id)) {
            const index = localStorageParamsObjIds.indexOf(movie.id);
            localStorageParamsObj.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(localStorageParamsObj));
            toastNotify('remove');
            setIsFav(false);
        } else {
            localStorageParamsObj.push(params);
            localStorage.setItem('favorites', JSON.stringify(localStorageParamsObj));
            toastNotify('add');
            setIsFav(true);
        }
      }

    const [runtime, setRunTime] = useState([]);
    useEffect(() => {
        if(mediaType === 'movie') {
            const minutes = movie2.runtime % 60;
            const hours = Math.floor(movie2.runtime / 60);
            setRunTime(`${hours}h ${minutes}min`);
        } else {
            if(movie2.episode_run_time === undefined || movie2.episode_run_time.length === 0) {
                setRunTime(`N/A mins`);
            } else {
                setRunTime(`${movie2.episode_run_time[0]} mins`);
            }
        }
    }, [movie2.runtime, movie2.episode_run_time]);

    const [watchModeSources, setWatchModeSources] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const onOpenModal = () => setModalOpen(true);
    const onCloseModal = () => setModalOpen(false);
    const streamAvailability = async () => {
        const watchMode = await fetch(`https://api.watchmode.com/v1/title/${mediaType}-${movie.id}/sources/?apiKey=${WATCHMODE_API_KEY}`).then((res) => res.json());
        if(watchMode.length > 0) {
            setWatchModeSources(watchMode.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i));
            onOpenModal();
        } else {
            toast.error('Not available to stream', alertParams);
        }

    }

    return (
        <div>
            <Head><title>{movie.title || movie.original_name}</title></Head>
            <ToastContainer theme="dark"/>
            <Header />
            <Modal open={modalOpen} onClose={onCloseModal} center styles={{ modal: {background: '#202F3B'}}}>
                <div className="text-white">
                    <h2 className="text-center text-2xl mb-2">Where to Watch</h2>
                    {watchModeSources.map((source, index) => {
                        return (
                            <a key={index} href={source.web_url} target="_blank" rel="noreferrer"><div className="grid grid-cols-2 p-2 pt-2 rounded-full hover:pt-1 hover:border-2 hover:border-red-400">
                                <h3>{source.name}</h3>
                                <p className="pl-24">{source.price ? `$${source.price}` : 'Sub'}</p>
                            </div></a>
                        )})}
                </div>
            </Modal>
            <div className="w-full">
                <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                        <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{movie.title || movie.original_name}</h1>
                        <div className="flex items-center justify-center space-x-5 lg:space-x-20 font-bold lg:text-lg text-sm md:text-base text-center text-white">
                            <p className="border-2 border-white px-1">{mediaType !== 'tv' ? certification : movie2.status}</p>
                            <p>{releaseYear}</p>
                            <p className="xl:truncate">{genres.slice(0, -2)}</p>
                            <p>{runtime}</p>
                            <StarIcon className="h-4 my-4 md:h-8 lg:h-6 lg:mx-2 lg:my-0 text-yellow-400 fill-yellow-400" />{Math.round(movie.vote_average * 10) / 10}/10
                        </div>
                        <p className="md:text-lg lg:text-xl text-white text-center font-style: italic">{movie2.tagline}</p>
                        <p className="text-center text-base md:text-left md:text-xl lg:text-2xl text-white line-clamp-14">{movie.description || movie.overview}</p>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailerID} onClose={() => setOpen(false)} />

                        <div className="flex items-center justify-center space-x-4 my-2">
                            <button onClick={streamAvailability} title="Play" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><PlayIcon className="h-12" /></button>
                            <button onClick={checkTrailer} title="Watch Trailer" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><FilmIcon className="h-12" /></button>
                            <button onClick={checkFav} title="Favorite" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><HeartIcon className={isFav ? 'h-12 text-red-400 fill-red-400' : 'h-12'} /></button>
                        </div>
                    </div>
                    <div className="w-8/12 md:w-4/12 lg:w-3/12 mx-10 md:mx-28 lg:mx-14">
                        <Image priority={true} layout="responsive" src={`${BASE_URL}${movie.poster_path}`} alt='' height={960} width={640}/>
                    </div>
                </div>
            </div>

            <div>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7 mt-10 md:mt-4 lg:mt-0">{mediaType != 'tv' ? '' : 'Seasons:'}</p>
                <FlipMove className="grid grid-cols-2 px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 3xl:grid-cols-12">
                    {seasons?.map((season) => season.poster_path && (
                    <>
                        <Seasons result={season} id={movie2.id} title={movie.title || movie.original_name} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div hidden={recommendDiv}>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7">{recommendMovie.length > 0 ? 'More Like This:' : ''}</p>
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
                <FlipMove className="grid grid-cols-2 px-10 md:px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10">
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