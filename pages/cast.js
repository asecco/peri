import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Header from '../components/Header/Header';
import Recommend from '../components/Info/Recommend';
import FlipMove from 'react-flip-move';
import { BASE_URL, API_KEY, API_URL } from "../utils/constants";
import { blurUrl } from '../utils/helper';

function Cast({ castInfo, known }) {
    known?.sort((a, b) => {
        return b.vote_count - a.vote_count;
    });
    const knownFor = known.slice(0, 8);
    const [age, setAge] = useState([]);

    useEffect(() => {
        const today = new Date();
        const birthDate = new Date(castInfo.birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setAge(age);
    }, [castInfo.birthday]);

    return (
        <div>
            <Head><title>{castInfo.name}</title></Head>
            <Header />
            <div className="mx-auto px-10 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                <div className="flex flex-col gap-4 md:w-6/12 lg:w-8/12 xl:w-9/12 2xl:w-10/12">
                    <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl 3xl:text-9xl text-center text-red-400">{castInfo.name}</h1>
                    <p className="font-bold lg:text-xl 3xl:text-3xl text-white text-center">{`Born: ${castInfo.birthday || ''}(age ${age}), ${castInfo.place_of_birth || ''}`}</p>
                    <p className="text-center md:text-left text-base md:text-lg lg:text-2xl 3xl:text-4xl text-white line-clamp-8 md:line-clamp-10 lg:line-clamp-14 mb-6 md:mb-0">{castInfo.biography}</p>
                </div>

                <div className="w-9/12 md:w-4/12 lg:w-3/12 2xl:w-4/12 mx-10 md:mx-14">
                    {castInfo.profile_path ? <Image placeholder='blur' blurDataURL={blurUrl} priority={true} src={`${BASE_URL}${castInfo.profile_path}`} alt='' height={1920} width={1280}/> : ''}
                </div>
            </div>

            {knownFor?.filter(movie => movie.backdrop_path).length > 0 && (
                <div>
                    <p className="font-bold text-white text-2xl md:text-4xl mx-9">Known For</p>
                    <FlipMove className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
                        {knownFor?.map((movie) => movie.backdrop_path && (
                            <Recommend key={movie.id} result={movie} />
                        ))}
                    </FlipMove>
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = context.query.id;
    if (!id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const cast = await fetch(`${API_URL}person/${id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
    const knownFor = await fetch(`${API_URL}person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
    
    return {
        props: {
            castInfo: cast,
            known: knownFor.cast,
        },
    }
}

export default Cast;