import Image from 'next/image';
import { useState, forwardRef } from 'react';
import { BASE_URL } from "../utils/constants";

const Thumbnail = forwardRef(({ result }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const getRatingColor = (rating) => {
        if (rating <= 5.9) {
            return 'bg-red-500';
        } else if (rating <= 7.9) {
            return 'bg-yellow-500';
        } else {
            return 'bg-green-500';
        }
    };

    const ratingColor = getRatingColor(result.vote_average);

    return (
        <div ref={ref} className='p-2 lg:mx-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-40 relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a href={`/info?type=${result.media_type}&id=${result.id}`} rel="noopener noreferrer">
                <Image priority={true} className='group-hover:opacity-50 rounded-lg' layout='responsive' src={`${BASE_URL}${result.poster_path}`} alt='' height={1440} width={960}/>
                <div className='p-2 text-center' title={result.title || result.original_name}>
                    <h2 className='mt-1 text-xl lg:text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-normal group-hover:text-red-400 line-clamp-2 max-w-md'>{result.title || result.original_name}</h2>
                </div>
                {isHovered && !!result.vote_average && (
                    <div className='absolute top-2 left-2'>
                        <div className='relative w-10 h-10'>
                            <div className={`absolute w-full h-full rounded-sm border-2 ${ratingColor}`}></div>
                            <div className='absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 text-white text-xl font-bold'>{Math.round(result.vote_average * 10) / 10}</div>
                        </div>
                    </div>
                )}
            </a>
        </div>
    );
});

Thumbnail.displayName = 'Thumbnail';
export default Thumbnail;