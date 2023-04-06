import React, { useState, useEffect } from 'react';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "../components/FooterItem";
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import FlipMove from 'react-flip-move';
import requests from '../utils/requests';
import { API_URL } from '../utils/constants';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState('Popular');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    if(page < 1) setPage(1);
    useEffect(() => {
        document.title = `Movies | ${genre}`;
        const searchReq = async () => {
            const req = await fetch(`${API_URL}${requests[genre].url}&page=${page}&with_original_language=en`).then((res) => res.json());
            const arr = req.results;
            arr.forEach(obj => {
                obj.media_type = 'movie';
            });
            setMovies(arr);
            setTotalPages(req.total_pages);
        }
        searchReq();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page, genre]);

    useEffect(() => {
        setPage(1);
    }, [genre]);

    const handleClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const pagesToShow = 5;
    const getPageNumbers = () => {
        const pageNumbers = [];
        // If there is only one page or no pages, return an empty array
        if (totalPages <= 1) {
            return pageNumbers;
        }
        // Calculate the first and last page numbers to show
        let firstPage = Math.max(1, page - Math.floor(pagesToShow / 2));
        let lastPage = Math.min(totalPages, firstPage + pagesToShow - 1);
        // Adjust the first and last page numbers if necessary to show exactly `pagesToShow` pages
        if (lastPage - firstPage + 1 < pagesToShow) {
            if (firstPage === 1) {
                lastPage = Math.min(totalPages, pagesToShow);
            } else {
                firstPage = Math.max(1, lastPage - pagesToShow + 1);
            }
        }
        // Add the page numbers to the array
        for (let i = firstPage; i <= lastPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    const pageNumbers = getPageNumbers();

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

            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7 my-6 text-center md:text-left'>{genre}</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.map((movie) => movie.poster_path && (
                    <>
                        <Thumbnail result={movie} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
                <div onClick={() => setPage(page - 1)}><FooterItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                    <div className="flex justify-center space-x-4 mb-6">
                        {pageNumbers.map((pageNumber) => (
                            <button key={pageNumber} onClick={() => handleClick(pageNumber)} className={`${pageNumber === page ? 'bg-red-500 text-white' : 'bg-white text-black hover:opacity-75'} text-xl px-4 py-2 rounded-full font-bold`}>{pageNumber}</button>
                        ))}
                    </div>
                <div onClick={() => setPage(page + 1)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
        </div>
    );
}

export default Movies;