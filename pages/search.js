import Head from 'next/head';
import React, { useState, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import Header from '../components/Header';
import Results from '../components/Results';
import { API_KEY, API_URL } from '../utils/constants';

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [autoCompleteResults, setAutoCompleteResults] = useState([]);
    const searchInputRef = useRef(null);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value.length >= 5) {
            fetchAutoCompleteResults(event.target.value);
        } else {
            setAutoCompleteResults([]);
        }
    };

    const fetchAutoCompleteResults = async (query) => {
        if (query.trim() !== "") {
            const autocompleteReq = await fetch(`${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`).then((res) => res.json());
            const sortedResults = sortResults(autocompleteReq.results);
            setAutoCompleteResults(sortedResults.slice(0, 5));
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
        searchInputRef.current.blur(); //Removes focus from search bar
    };

    const clearSearchResults = () => {
        setSearchResults([]);
        setAutoCompleteResults([]);
        setSearchQuery("");
        searchInputRef.current.focus(); // Set focus back to search input
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
                            {autoCompleteResults.map((result) => (
                                <a href={`/info?type=${result.media_type}&id=${result.id}`} rel="noopener noreferrer">
                                    <div key={result.id} className="text-white bg-gray-800 text-center hover:text-red-400 rounded-md shadow-md p-2 mb-2 cursor-pointer">{result.title || result.name} • {result.media_type} • {result.release_date ? result.release_date.substring(0, 4) : (result.first_air_date ? result.first_air_date.substring(0, 4) : '')}</div>
                                </a>
                            ))}
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