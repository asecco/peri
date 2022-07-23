import React, {useState} from 'react';
import Image from "next/image";

function Cast({result}) {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const [hoverInfo, setHoverInfo] = useState({display: 'none'});

    return (
        <div className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50' onMouseEnter={e => { setHoverInfo({display: 'block'});}} onMouseLeave={e => { setHoverInfo({display: 'none'})}}>
            <Image className='group-hover:opacity-50' layout='responsive' src={`${BASE_URL}${result.still_path}`} alt='' height={1080} width={1920}/>
            <div style={hoverInfo} layout='responsive' className="absolute bottom-20 p-4 group-hover:font-bold text-base">
                <p className='line-clamp-9'>{result.overview || result.description}</p>
            </div>
            <p style={hoverInfo} layout='responsive' className="absolute bottom-12 p-3 group-hover:font-bold text-lg">{result.air_date || result.first_air_date}</p>

            <div className='p-2 text-center'>
                <h2 className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-red-400 truncate max-w-md'>{result.name}</h2>
            </div>
        </div>
    );
}

export default Cast;