import Image from "next/image";
import { BASE_URL } from '../utils/requests';
import { StarIcon } from '@heroicons/react/outline';

function Episodes({result}) {
    return (
        <div className="grid grid-cols-2 w-full p-2 hover:bg-gray-600">
            <Image layout="responsive" src={`${BASE_URL}${result.still_path}`} alt='' height={1080} width={1920}/>
            <div className="p-6">
                <div className="text-red-400 font-bold text-xl mb-2">{`${result.episode_number}. ${result.name}`}</div>
                <div className="flex items-center space-x-10 m-2 text-sm md:text-base text-white">
                    <p>{`${result.runtime} mins`}</p>
                    <p>{result.air_date}</p>
                    <StarIcon className="h-4 my-4 md:h-6 lg:mx-2 lg:my-0 text-yellow-400 fill-yellow-400" />{Math.round(result.vote_average * 10) / 10}/10
                </div>
                <p className="text-white text-lg line-clamp-8">{result.overview}</p>
            </div>
        </div>
    );
}

export default Episodes;