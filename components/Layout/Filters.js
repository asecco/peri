import React, { useState } from 'react';
import { useRouter } from "next/router";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function Filters({ type, genre }) {
    const router = useRouter();
    const currentYear = new Date().getFullYear();
    const [voteAverage, setVoteAverage] = useState(0);
    const [releaseDate, setReleaseDate] = useState([1900, currentYear]);
    const [sortBy, setSortBy] = useState('vote_count.desc');

    const handleRangeChange = (newRange) => setReleaseDate(newRange);
    const handleRatingChange = (event) => setVoteAverage(event);

    const updateFilters = (event) => {
        event.preventDefault();
        router.replace({ pathname: `${type}/${genre}/1`, query: { voteAverage: voteAverage, minYear: releaseDate[0], maxYear: releaseDate[1], sortBy: sortBy}});
    };

    return (
        <div>
            {genre !== 'popular' ? (
                <div className='mx-8 pb-4'>
                    <details className='overflow-hidden rounded-md absolute w-10/12 md:w-1/5 xl:w-2/12 z-50'>
                        <summary className="flex cursor-pointer items-center justify-center bg-white text-black p-2">
                            <span className="text-xl font-bold mr-2">Filters</span>
                            <span className="text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/></svg>
                            </span>
                        </summary>

                        <div className="border-t border-gray-300 bg-white">
                            <header className="p-2 text-center">
                                <span className="text-base font-medium text-black">Rating</span>
                                <Slider onChange={handleRatingChange} defaultValue={voteAverage} keyboard min={0} max={10} step={0.5} railStyle={{height: 12}} handleStyle={{height: 22, width: 22}}/>
                                <p className="text-base text-black pt-2">{`Greater than ${voteAverage}/10`}</p>
                            </header>

                            <header className="space-y-1 border-t border-gray-300 p-2 text-center">
                                <span className="text-base font-medium text-black">Release Date</span>
                                <Slider range onChange={handleRangeChange} defaultValue={releaseDate} keyboard min={1900} max={currentYear} step={1} railStyle={{height: 12}} handleStyle={{height: 22, width: 22}} />
                                <p className="text-base text-black pt-2">{`${releaseDate[0]} - ${releaseDate[1]}`}</p>
                            </header>

                            <header className="space-y-1 border-t border-gray-300 p-2 text-center">
                                <span className="text-base font-medium text-black">Sort By</span>
                                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="w-full text-black text-center">
                                    <option value="vote_count.desc">Rating Count(default)</option>
                                    <option value="popularity.desc">Popularity</option>
                                    <option value="vote_average.desc">Rating</option>
                                    <option value="primary_release_date.desc">Release Date</option>
                                    <option value="revenue.desc">Revenue</option>
                                </select>
                            </header>

                            <div className='text-center border-t border-gray-300'>
                                <button onClick={updateFilters} className="bg-red-400 text-white text-lg font-bold rounded-md hover:bg-red-500 shadow-md py-2 px-4 my-2">Update</button>
                            </div>
                        </div>
                    </details>
                </div>
            ) : (
                null
            )}
        </div>
    );
}

export default Filters;