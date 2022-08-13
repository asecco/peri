import React, { useState, useCallback } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import FlipMove from "react-flip-move";
import { API_KEY, API_URL } from '../utils/constants';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const search = async (event) => {
        const searchQuery = event.target.value;
        if (searchQuery) {
            const searchReq = await fetch(`${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`).then((res) => res.json());
            setSearchResults(searchReq.results);
        }
    }
    const autoFocus = useCallback(el => el ? el.focus() : null, []);

    if (typeof window !== 'undefined') {
        document.title = 'Peri';
    }

    return (
        <div>
            <Header />
            <div className="flex items-center ml-12 md:ml-auto mx-auto max-w-sm mb-5">
                <input ref={autoFocus} autoFocus type="text" onChange={search} className="h-14 w-96 rounded-full focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center" placeholder="Search..."></input>
                <SearchIcon onClick={search} className='w-8 m-1 hover:cursor-pointer text-white hover:text-red-400 active:text-red-500 invisible md:visible' />
            </div>

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
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