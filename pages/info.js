import Head from 'next/head';
import { useRouter } from "next/router";
import { API_KEY, WATCHMODE_API_KEY, BASE_URL, API_URL, YOUTUBE_API_KEY, YOUTUBE_API_URL } from '../utils/constants';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import ModalVideo from 'react-modal-video';
import Image from "next/image";
import { StarIcon, PlayIcon, HeartIcon, FilmIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Cast from "../components/Cast";
import Recommend from "../components/Recommend";
import Seasons from "../components/Seasons";
import Comment from "../components/Comment";
import FlipMove from "react-flip-move";
import { ToastContainer, toast } from 'react-toastify';
import { toastNotify, alertParams } from "../utils/notifications";

function MovieInfo({ movie, cast, recommend }) {
    const router = useRouter();
    const [trailerID, setTrailerId] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [mediaType, setMediaType] = useState(null);
    const [releaseYear, setReleaseYear] = useState([]);
    const [recommendDiv, setRecommendDiv] = useState(false);

    const castArr = cast.cast?.slice(0, 12);
    recommend.results?.sort((a, b) => {
        return b.vote_count - a.vote_count;
    });
    const recArr = recommend.results?.slice(0, 12);
    const seasons = movie.seasons;

    useEffect(() => {
        if(router.query.type === 'tv') {
            setMediaType('tv');
        } else {
            setMediaType('movie');
        }

        if(mediaType === 'movie') {
            const sliced = movie.release_date?.slice(0, -6)
            setReleaseYear(sliced);
        } else if(mediaType === 'tv') {
            const sliced = movie.first_air_date?.slice(0, -6)
            setReleaseYear(sliced);
            setRecommendDiv(true);
        } else {
            setReleaseYear(movie?.release_date);
        }
    }, [mediaType, router.query.type, releaseYear, movie?.release_date, movie?.first_air_date]);

    const checkTrailer = async () => {
        const trailer = await fetch(`${YOUTUBE_API_URL}${movie?.title || movie?.original_name}+${mediaType}+trailer&part=snippet&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`);
        if(!trailer.ok) { //If api request fails/exceeds daily quota
            toast.error('No trailer available', alertParams);
        } else {
            const trailerData = await trailer.json();
            const trailerId = trailerData.items[0].id.videoId;
            setTrailerId(trailerId);
            setOpen(true);
        }
    }

    const genres = movie.genres?.map((genre) => genre.name).slice(0, 3).join(', ');

    const [certification, setCertification] = useState([]);
    useEffect(() => {
        if(movie.release_dates) {
            if(movie.release_dates.results.length > 0) {
                const rating = movie.release_dates.results.find(obj => obj.iso_3166_1 === 'US');
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
    }, [movie.release_dates, certification,]);
      
    const [isFav, setIsFav] = useState(false);
    useEffect(() => {
        const localStorageFavorites = localStorage.getItem('favorites');
        if (localStorageFavorites) {
            const favorites = JSON.parse(localStorageFavorites);
            const isFavorite = favorites.some((fav) => fav.id === movie?.id && fav.type === mediaType);
            setIsFav(isFavorite);
        } else {
            setIsFav(false);
        }
    }, [movie, mediaType]);

    const checkFav = () => {
        const localStorageFavorites = localStorage.getItem('favorites');
        const favorites = localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
        const index = favorites.findIndex((fav) => fav.id === movie?.id && fav.type === mediaType);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFav(false);
            toastNotify('remove');
        } else {
            favorites.push({ id: movie?.id, type: mediaType });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFav(true);
            toastNotify('add');
        }
    };

    const [runtime, setRunTime] = useState([]);
    useEffect(() => {
        if(mediaType === 'movie') {
            const minutes = movie.runtime % 60;
            const hours = Math.floor(movie.runtime / 60);
            setRunTime(`${hours}h ${minutes}min`);
        } else {
            if(movie.episode_run_time === undefined || movie.episode_run_time.length === 0) {
                setRunTime(`N/A mins`);
            } else {
                setRunTime(`${movie.episode_run_time[0]} mins`);
            }
        }
    }, [movie.runtime, movie.episode_run_time, runtime, mediaType]);

    const [watchModeSources, setWatchModeSources] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const onOpenModal = () => setModalOpen(true);
    const onCloseModal = () => setModalOpen(false);
    const streamAvailability = async () => {
        const watchMode = await fetch(`https://api.watchmode.com/v1/title/${mediaType}-${movie?.id}/sources/?apiKey=${WATCHMODE_API_KEY}`).then((res) => res.json());
        if(watchMode.length > 0) {
            setWatchModeSources(watchMode.filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i));
            onOpenModal();
        } else {
            toast.error('Not available to stream', alertParams);
        }
    }

    return (
        <div>
            <Head><title>{movie?.title || movie?.original_name}</title></Head>
            <ToastContainer theme="dark"/>
            <Header />
            <Modal open={modalOpen} onClose={onCloseModal} center showCloseIcon={false} styles={{ modal: {background: '#202F3B'}}}>
                <div className="shadow-2xl rounded-lg">
                    <div className="relative rounded-md bg-red-400 px-4 py-4 xl:px-8 text-white text-center text-xl md:text-3xl xl:text-4xl font-bold">
                        <p>Where to Watch</p>
                    </div>
                    <div className="h-full w-full px-4 pb-4 pt-4 xl:px-8">
                        <div className="flex flex-col text-white text-xl md:text-3xl xl:text-4xl">
                            {watchModeSources.map((source, index) => (
                                <a key={index} href={source.web_url} target="_blank" rel="noreferrer" className="flex items-center justify-between py-1 rounded-md hover:text-red-400">
                                    <h3>{source.name}</h3>
                                    <p className="pl-24">{source.price ? `$${source.price}` : 'Sub'}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="w-full">
                <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                    <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                        <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{movie?.title || movie?.original_name}</h1>
                        <div className="flex items-center justify-center space-x-5 lg:space-x-20 font-bold lg:text-lg text-sm md:text-base text-center text-white">
                            <p className="border-2 border-white px-1">{mediaType !== 'tv' ? certification : movie?.status}</p>
                            <p>{releaseYear}</p>
                            <p className="xl:truncate">{genres}</p>
                            <p>{runtime}</p>
                            <StarIcon className="h-4 my-4 md:h-8 lg:h-6 lg:mx-2 lg:my-0 text-yellow-400 fill-yellow-400" />{Math.round(movie?.vote_average * 10) / 10}/10
                        </div>
                        <p className="md:text-lg lg:text-xl text-white text-center font-style: italic">{movie?.tagline}</p>
                        <p className="text-center text-base md:text-left md:text-xl lg:text-2xl text-white line-clamp-14">{movie?.description || movie?.overview}</p>
                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={trailerID} onClose={() => setOpen(false)} />

                        <div className="flex items-center justify-center space-x-4 my-2">
                            <button onClick={streamAvailability} title="Play" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><PlayIcon className="h-12" /></button>
                            <button onClick={checkTrailer} title="Watch Trailer" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><FilmIcon className="h-12" /></button>
                            <button onClick={checkFav} title="Favorite" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-14 md:w-20 lg:h-16 lg:w-24 bg-gray-600 hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center"><HeartIcon className={isFav ? 'h-12 text-red-400 fill-red-400' : 'h-12'} /></button>
                        </div>
                    </div>
                    <div className="w-8/12 md:w-5/12 lg:w-3/12 mx-10 md:mx-14">
                        <Image priority={true} layout="responsive" src={`${BASE_URL}${movie?.poster_path}`} alt='' height={960} width={640}/>
                    </div>
                </div>
            </div>

            <div>
                <p className="font-bold text-white text-2xl md:text-4xl mx-8 mt-10 md:mt-4 lg:mt-0">{mediaType != 'tv' ? '' : 'Seasons:'}</p>
                <FlipMove className="grid grid-cols-2 px-5 my-10 ml-2 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 3xl:grid-cols-10">
                    {seasons?.map((season) => season.poster_path && (
                    <>
                        <Seasons result={season} id={movie.id} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div hidden={recommendDiv}>
                <p className="font-bold text-white text-2xl md:text-4xl mx-8">{recArr?.length > 0 ? 'You May Enjoy:' : ''}</p>
                <FlipMove className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-8">
                    {recArr?.map((rec) => rec.backdrop_path && (
                    <>
                        <Recommend result={rec} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div>
                <p className="font-bold text-white text-2xl md:text-4xl mx-8">Cast:</p>
                <FlipMove className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-8">
                    {castArr?.map((cast) => cast.profile_path && (
                    <>
                        <Cast member={cast} />
                    </>
                    ))}
                </FlipMove>
            </div>
            <Comment title={movie.title || movie.original_name}type={mediaType} id={movie.id}/>
    </div>
    );
}

export async function getServerSideProps(context) {
    const { id, type } = context.query;
    if (!id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const res = await fetch(`${API_URL}${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`);
    const movie = await res.json();
    let recommend = [];

    const castRes = await fetch(`${API_URL}${type}/${id}/credits?api_key=${API_KEY}&language=en-US`)
    const cast = await castRes.json();

    if(type === 'movie') {
        const recommendRes = await fetch(`${API_URL}${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US`)
        recommend = await recommendRes.json();
    }

    return {
        props: {
            movie,
            cast,
            recommend,
        },
    }
}

export default MovieInfo;