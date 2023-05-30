import Image from 'next/image';
import { forwardRef } from 'react';
import { BASE_URL } from "../utils/constants";

const Thumbnail = forwardRef(({ result }, ref) => {
    return (
        <div ref={ref} className='p-2 lg:mx-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-40'>
            <a href={`/info?type=${result.media_type}&id=${result.id}`} rel="noopener noreferrer">
                <Image priority={true} className='group-hover:opacity-50' layout='responsive' src={`${BASE_URL}${result.poster_path}`} alt='' height={1440} width={960}/>
                <div className='p-2 text-center' title={result.title || result.original_name}>
                    <h2 className='mt-1 text-xl lg:text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-medium group-hover:text-red-400 line-clamp-2 max-w-md'>{result.title || result.original_name}</h2>
                </div>
            </a>
        </div>
    )
})

Thumbnail.displayName = 'Thumbnail';
export default Thumbnail;