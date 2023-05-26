import Head from 'next/head';
import React, { useState, useCallback } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Results from '../components/Results';
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
            <form onSubmit={search} className="flex items-center mx-auto max-w-xl mb-5 relative">
                <input ref={autoFocus} type="text" value={searchQuery} onChange={handleInputChange} className="h-16 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-2xl lg:text-3xl" placeholder="Search..."></input>
                <SearchIcon onClick={search} className='absolute right-1 w-8 hover:cursor-pointer text-primary hover:text-red-400 active:text-red-500'/>
            </form>
            <Results results={searchResults} />
        </div>
  );
}

export default Search;