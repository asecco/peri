import Head from 'next/head';
import Image from "next/image";
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import Header from '../components/Header/Header';
import Results from '../components/Layout/Results';
import { API_KEY, API_URL, BASE_URL } from '../utils/constants';
import { debounce } from "debounce";
import { blurUrl } from '../utils/helper';

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [autoCompleteResults, setAutoCompleteResults] = useState([]);
    const searchInputRef = useRef(null);
    useEffect(() => {
        searchInputRef.current.focus();
        document.addEventListener("click", (event) => {
            if (event.target !== searchInputRef.current) {
                setAutoCompleteResults([]);
            }
        });
    }, []);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        debounce(() => fetchAutoCompleteResults(event.target.value), 1200)();
    };

    const fetchAutoCompleteResults = async (query) => {
        if (query.trim() !== "") {
            const autocompleteReq = await fetch(`${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`).then((res) => res.json());
            const sortedResults = sortResults(autocompleteReq.results);
            setAutoCompleteResults(sortedResults.slice(0, 3));
        } else {
            setAutoCompleteResults([]);
        }
    };

    const search = async (event) => {
        event.preventDefault();
        const searchReq = await fetch(`${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`).then((res) => res.json());
        const sortedResults = sortResults(searchReq.results);
        setSearchResults(sortedResults);
        setAutoCompleteResults([]);
        searchInputRef.current.blur();
    };

    const clearSearchResults = () => {
        setSearchResults([]);
        setAutoCompleteResults([]);
    };

    const sortResults = (results) => { //Sorts by vote count
        return results.sort((a, b) => {
            return b.vote_count - a.vote_count;
        });
    };

    return (
        <div>
            <Head><title>Peri</title></Head>
            <Header />
            <form onSubmit={search} className="flex items-center mx-auto max-w-xl mb-5 relative">
                <div className="relative w-full">
                    <input ref={(ref) => searchInputRef.current = ref} type="text" value={searchQuery} onChange={handleInputChange} onClick={clearSearchResults} className="h-16 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-2xl lg:text-3xl" placeholder="Search..."></input>
                    {autoCompleteResults.length > 0 && searchResults.length === 0 && (
                        <div className="absolute z-10 w-full mt-1">
                            {autoCompleteResults?.map((result) => (
                                <Link key={result?.id} href={result?.profile_path ? `/cast/${result.id}` : `/info/${result.media_type}/${result.id}`}>
                                    <div className="flex bg-gray-800 text-white text-xl md:text-3xl hover:text-red-400 rounded-md shadow-md p-1 mb-2 cursor-pointer">
                                        {result?.poster_path || result?.profile_path ? <Image placeholder='blur' blurDataURL={blurUrl} priority={true} className="rounded-lg" src={`${BASE_URL}${result?.poster_path || result?.profile_path}`} alt='' width={80} height={120}/> : ''}
                                        <div className='flex flex-col ml-2'>
                                            <h2>{result?.title || result?.name}</h2>
                                            {(result?.release_date || result?.first_air_date) && (
                                                <>
                                                {result?.release_date ? `(${result?.release_date.substring(0, 4)})` : `(${result?.first_air_date.substring(0, 4)})`}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <p className='text-white text-center text-lg md:text-xl bg-gray-800 hover:text-red-400 cursor-pointer rounded-md shadow-md p-2' onClick={search}>More Results</p>
                        </div>
                    )}
                </div>
                <SearchIcon onClick={search} className='absolute right-2 top-1/2 transform -translate-y-1/2 w-8 hover:cursor-pointer text-primary hover:text-red-400 active:text-red-500'/>
            </form>
            {searchResults.length > 0 && <Results results={searchResults} />}
        </div>
  );
}

export default Search;