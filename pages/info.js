import Head from 'next/head';
import { useRouter } from "next/router";
import { API_KEY, API_URL } from '../utils/constants';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Description from "../components/Info/Description";
import Panels from "../components/Info/Panels";
import Comment from "../components/Info/Comment";
import { ToastContainer } from 'react-toastify';

function MovieInfo({ movie, cast, recommend }) {
    const router = useRouter();
    const [mediaType, setMediaType] = useState(null);
    const [releaseYear, setReleaseYear] = useState([]);
    const [certification, setCertification] = useState([]);
    const [runtime, setRunTime] = useState([]);

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
        } else {
            setReleaseYear(movie?.release_date);
        }
    }, [mediaType, router.query.type, releaseYear, movie?.release_date, movie?.first_air_date]);

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

    return (
        <div>
            <Head><title>{movie?.title || movie?.original_name}</title></Head>
            <ToastContainer theme="dark"/>
            <Header />
            <Description movie={movie} mediaType={mediaType} releaseYear={releaseYear} runtime={runtime} certification={certification} />
            <Panels mediaType={mediaType} seasons={seasons} movie={movie} recArr={recArr} castArr={castArr} />
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