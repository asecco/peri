import Image from 'next/image';
import {forwardRef} from 'react';
import React, {useState} from 'react';

const Thumbnail = forwardRef(({result}, ref) => {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const [hoverInfo, setHoverInfo] = useState({display: 'none'});

    return (
        <div ref={ref} className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50' onMouseEnter={e => { setHoverInfo({display: 'block'});}} onMouseLeave={e => { setHoverInfo({display: 'none'})}}>
            <Image className='group-hover:opacity-30' layout='responsive' src={`${BASE_URL}${result.backdrop_path || result.poster_path}` || `${BASE_URL}${result.poster_path}`} alt='' height={1080} width={1920}/>
            <p style={hoverInfo} layout='responsive' className="absolute bottom-20 p-4 group-hover:font-bold text-sm">{result.description || result.overview}</p>
            <p style={hoverInfo} layout='responsive' className="absolute bottom-12 p-4 group-hover:font-bold text-lg">{result.release_date || result.first_air_date}</p>
            <div className='p-2 text-center'>
                <h2 className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-red-400 truncate max-w-md'>{result.title || result.original_name}</h2>
            </div>
        </div>
    )
})

Thumbnail.displayName = 'Thumbnail';
export default Thumbnail;