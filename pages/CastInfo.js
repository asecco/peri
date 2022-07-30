import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Header from '../components/Header';
import Recommend from '../components/Recommend';
import FlipMove from 'react-flip-move';
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/requests";

function CastInfo() {
    const router = useRouter();
    const castId = Object.keys(router.query);
    const [castInfo, setCastInfo] = useState([]);
    const [knownFor, setKnownFor] = useState([]);
    const [age, setAge] = useState([]);
    useEffect(() => {
        document.title = castInfo.name;
        const searchReq = async () => {
            const castReq = await fetch(`https://api.themoviedb.org/3/person/${castId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            const knownForReq = await fetch(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            for(let i in knownForReq.cast) {
                knownForReq.cast[i].media_type = 'movie';
            }
            setCastInfo(castReq);
            setKnownFor(knownForReq.cast.slice(0, 8));
        }
        searchReq();
    }, [age]); 

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
            <Header />
            <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row">
                <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                    <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{castInfo.name}</h1>
                    <p className="font-bold lg:text-xl 2xl:text-2xl text-white text-center">{`Born: ${castInfo.birthday}(age ${age}), ${castInfo.place_of_birth || ''}`}</p>
                    <p className="text-center md:text-left text-base md:text-lg lg:text-2xl text-white line-clamp-8 md:line-clamp-10 lg:line-clamp-14 mb-6 md:mb-0">{castInfo.biography}</p>
                </div>

                <div className="w-8/12 md:w-4/12 lg:w-3/12 mx-10 md:mx-20 lg:mx-14">
                    <Image layout="responsive" src={`${BASE_URL}${castInfo.profile_path}`} alt='' height={960} width={640}/>
                </div>
            </div>

            <div>
                <p className="font-bold text-white text-2xl lg:text-3xl mx-7">Known For:</p>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
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

export default CastInfo;