import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useState } from 'react';
import { BASE_URL } from "../../utils/constants";
import { blurUrl } from '../../utils/helper';
import { localStorageFavorites } from '../../utils/localStorage';
import fallbackImage from '../../public/fallback.png';

function Thumbnail({ result }) {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const { isFav, checkFav } = localStorageFavorites(result, result.media_type);

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

    const poster = result?.poster_path || result?.profile_path ? `${BASE_URL}${result.poster_path || result.profile_path}` : fallbackImage;

    return (
        <div className='p-2 lg:mx-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-40 relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link href={result.poster_path || (poster === fallbackImage && result.media_type !== 'person') ? `/info/${result.media_type}/${result.id}` : `/cast/${result.id}`}>
                <Image placeholder='blur' blurDataURL={blurUrl} className='group-hover:opacity-50 rounded-lg' src={poster} alt='' height={1920} width={1280}/>
                <div className='p-2 text-center' title={result.title || result.original_name || result.name}>
                    <h2 className='mt-1 text-xl lg:text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-normal group-hover:text-red-400 line-clamp-2 max-w-md'>{result.title || result.original_name || result.name}</h2>
                </div>
            </Link>
            {isHovered && !!result.vote_average && (
                <div>
                    <div className='absolute top-2 left-2 w-10 h-10'>
                        <div className={`absolute w-full h-full rounded-sm border-2 ${ratingColor}`}></div>
                        <div className='absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 text-white text-xl font-bold'>{Math.round(result.vote_average * 10) / 10}</div>
                    </div>
                    <div onClick={checkFav} className='absolute top-2 right-2 w-10' title="Favorite">
                        <HeartIcon className={isFav ? 'text-red-400 fill-red-400 hover:opacity-75' : 'hover:text-red-400 hover:fill-red-400'}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Thumbnail;