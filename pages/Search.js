import Head from 'next/head';
import React, { useState, useCallback } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import FlipMove from "react-flip-move";
import { API_KEY, API_URL } from '../utils/constants';

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const search = async (event) => {
        event.preventDefault();
        const searchReq = await fetch(`${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`).then((res) => res.json());
        setSearchResults(searchReq.results);
    };
    
    const autoFocus = useCallback(e => e ? e.focus() : null, []);

    return (
        <div>
            <Head><title>Peri</title></Head>
            <Header />
            <form onSubmit={search} className="flex items-center ml-12 md:ml-auto mx-auto max-w-sm mb-5">
                <input ref={autoFocus} autoFocus type="text" value={searchQuery} onChange={handleInputChange} className="h-14 w-96 rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center" placeholder="Search..."></input>
                <SearchIcon onClick={search} className='w-8 m-1 hover:cursor-pointer text-white hover:text-red-400 active:text-red-500 invisible md:visible' />
            </form>

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {searchResults.map((movie) => movie.backdrop_path && (
                    <>
                        <Thumbnail result={movie} />
                    </>
                    ))}
                </FlipMove>
            </div>
        </div>
  );
}

export default Search;