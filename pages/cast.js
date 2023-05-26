import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Header from '../components/Header';
import Recommend from '../components/Recommend';
import FlipMove from 'react-flip-move';
import { BASE_URL, API_KEY, API_URL } from "../utils/constants";

function CastInfo({ castInfo, known }) {
    const knownFor = known.slice(0, 8);
    knownFor?.sort((a, b) => {
        return b.vote_count - a.vote_count;
    });
    const [age, setAge] = useState([]);

    useEffect(() => {
        const today = new Date();
        const birthDate = new Date(castInfo.birthday);
        const age = today.getFullYear() - birthDate.getFullYear();
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
            <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                    <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{castInfo.name}</h1>
                    <p className="font-bold lg:text-xl 2xl:text-2xl text-white text-center">{`Born: ${castInfo.birthday}(age ${age}), ${castInfo.place_of_birth || ''}`}</p>
                    <p className="text-center md:text-left text-base md:text-lg lg:text-2xl text-white line-clamp-8 md:line-clamp-10 lg:line-clamp-14 mb-6 md:mb-0">{castInfo.biography}</p>
                </div>

                <div className="w-8/12 md:w-5/12 lg:w-3/12 mx-10 md:mx-14">
                    <Image layout="responsive" src={`${BASE_URL}${castInfo.profile_path}`} alt='' height={960} width={640}/>
                </div>
            </div>

            <div>
                <p className="font-bold text-white text-2xl md:text-4xl lg:text-3xl mx-9">Known For:</p>
                <FlipMove className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
                    {knownFor?.map((movie) => movie.backdrop_path && (
                    <>
                        <Recommend result={movie} />
                    </>
                    ))}
                </FlipMove>
            </div>
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

export default CastInfo;