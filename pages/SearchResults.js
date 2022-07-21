import React, {useState, useCallback} from 'react';
import {
    HomeIcon,
    BookmarkIcon,
    SearchIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import PeriLogo from '../public/peri.png';
import HeaderItem from '../components/HeaderItem';
import Thumbnail from '../components/Thumbnail';
import FlipMove from "react-flip-move";

function SearchResults() {
    const [searchResults, setSearchResults] = useState([]);

    const search = async (event) => {
        const searchQuery = event.target.value;
        if (searchQuery) {
            const searchReq = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`).then((res) => res.json());
            setSearchResults(searchReq.results);
        }
    }

    const autoFocus = useCallback(el => el ? el.focus() : null, []);

  return (
    <div>
        <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
            <div className='flex flex-grow max-w-2xl'>
                <HeaderItem title='HOME' Icon={HomeIcon} />
                <HeaderItem title='LIBRARY' Icon={BookmarkIcon} />
            </div>
            <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
        </header>

        <div className="flex items-center max-w-sm mx-auto mb-5">
            <input ref={autoFocus} autoFocus type="text" onChange={search} className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center" placeholder="Search..."></input>
            <SearchIcon onClick={search} className='w-8 m-1 hover:cursor-pointer hover:text-red-400 active:text-red-500' />
        </div>
        
        <div>
            <FlipMove className="px-5 my-10 sm:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
                {searchResults.map((movie) => (
                <>
                    <Thumbnail result={movie} />
                </>
                ))}
            </FlipMove>
        </div>
    </div>
  );
}

export default SearchResults;