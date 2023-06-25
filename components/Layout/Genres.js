import { useRouter } from "next/router";
import React, { useState } from 'react';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import Filters from "./Filters";
import requests from '../../utils/requests';
import requestsTV from '../../utils/requestsTV';
import { useHorizontalScroll } from '../../utils/useHorizontalScroll';

function Genres({ type, genre }) {
    const router = useRouter();
    const scrollRef = useHorizontalScroll();
    const [activeGenre, setActiveGenre] = useState(genre);
    const requestObject = type === 'movies' ? requests : requestsTV;
    const genreRoute = (key) => {
        setActiveGenre(key);
        router.push(`${type}/${key}/1`);
    }

    const arrowScroll = (direction) => {
        if (direction === 'left') {
            scrollRef.current.scrollBy({
                left: -250,
                behavior: 'smooth'
            });
        } else {
            scrollRef.current.scrollBy({
                left: 250,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            <nav className="relative">
                <div ref={scrollRef} className="flex mx-16 p-2 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
                    {Object.entries(requestObject).map(([key, {title}]) => (
                        <h2 key={key} onClick={() => genreRoute(key)} className={`last:pr-10 cursor-pointer transition duration-100 transform sm:hover:scale-125 text-white active:text-red-500 ${activeGenre === key ? 'text-red-500' : 'sm:hover:text-red-400'}`}>{title}</h2>
                    ))}
                </div>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#202F3B] h-10 w-1/12" />
                <ArrowCircleLeftIcon onClick={() => arrowScroll('left')} className="absolute top-0 left-4 md:left-6 w-10 h-full hover:text-red-400 hover:cursor-pointer" />
                <ArrowCircleRightIcon onClick={() => arrowScroll('right')} className="absolute top-0 right-4 md:right-6 w-10 h-full hover:text-red-400 hover:cursor-pointer" />
            </nav>
            <p className='font-bold text-white text-4xl lg:text-5xl mx-8 my-6 text-center md:text-left'>{requestObject[genre].title}</p>
            <Filters type={type} genre={genre} />
        </div>
    );
}

export default Genres;