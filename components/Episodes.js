import Image from "next/image";
import { BASE_URL } from '../utils/constants';
import { StarIcon } from '@heroicons/react/outline';

function Episodes({result}) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full p-2 hover:bg-gray-800 hover:rounded-lg">
            <Image priority={true} src={`${BASE_URL}${result.still_path}`} alt='' height={1080} width={1920}/>
            <div className="px-0 md:px-6">
                <div className="text-red-400 font-bold text-xl lg:text-2xl mt-2 lg:mt-0">{`${result.episode_number}. ${result.name}`}</div>
                <div className="flex items-center text-center space-x-2 md:space-x-4 lg:space-x-10 m-2 text-base md:text-lg text-white">
                    <p>{`${result.runtime} mins`}</p>
                    <p>{result.air_date}</p>
                    <StarIcon className="h-4 my-4 md:h-5 lg:h-6 lg:mx-2 lg:my-0 text-yellow-400 fill-yellow-400" />{Math.round(result.vote_average * 10) / 10}/10
                </div>
                <p className="text-white md:text-xl line-clamp-8 md:line-clamp-6 lg:line-clamp-8">{result.overview}</p>
            </div>
        </div>
    );
}

export default Episodes;