import React, {useState, useEffect} from 'react';
import {ArrowCircleLeftIcon, ArrowCircleRightIcon} from '@heroicons/react/outline';
import HeaderItem from "../components/HeaderItem";
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import FlipMove from 'react-flip-move';
import requests from '../utils/requests';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState('Popular');
    const [page, setPage] = useState(1);
    if(page < 1) setPage(1);
    useEffect(() => {
        document.title = 'Movies';
        const searchReq = async () => {
            const req = await fetch(`https://api.themoviedb.org/3/${requests[genre].url}&page=${page}`).then((res) => res.json());
            const arr = req.results;
            arr.forEach(obj => {
                obj.media_type = 'movie';
            });
            setMovies(arr);
        }
        searchReq();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page, genre]);

    return (
        <div>
            <Header />
            <nav className="relative">
                <div className="flex px-10 p-2 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
                    {Object.entries(requests).map(([key, {title}]) => (
                        <h2 key={key} onClick={() => setGenre(key)} className="last:pr-10 cursor-pointer transition duration-100 transform hover:scale-125 text-white hover:text-red-400 active:text-red-500">{title}</h2>
                    ))}
                </div>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#202F3B] h-10 w-1/12" />
            </nav>

            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7 my-4'>{genre}</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {movies.map((movie) => (
                    <>
                        <Thumbnail result={movie} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
                <div onClick={() => setPage(page - 1)}><HeaderItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                <div onClick={() => setPage(page + 1)}><HeaderItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
        </div>
    );
}

export default Movies;