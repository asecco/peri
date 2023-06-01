import Image from 'next/image';
import { BASE_URL } from "../utils/constants";
import { CalendarIcon  } from '@heroicons/react/outline';

function StreamingToday({ tv }) {
    return (
        <div>
            <div className="flex mt-8">
                <p className="font-bold text-white text-4xl lg:text-5xl mx-8 xl:mx-10 text-center md:text-left">Streaming Today</p>
                <CalendarIcon className="h-12 w-12 lg:h-14 lg:w-14 -ml-6 text-red-400"/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-2 gap-6 my-10">
                {tv.slice(0, 8)?.map((show, index) => (
                    <a key={show.id} href={`/info?type=${'tv'}&id=${show.id}`} rel="noopener noreferrer">
                        <div className="w-full grid grid-cols-2 md:flex group items-center">
                            <p className="text-white mx-auto md:mx-0 text-6xl md:text-7xl">{index + 1}</p>
                            <div className='flex-shrink-0'>
                                <Image priority={true} className="group-hover:opacity-50 rounded-lg" src={`${BASE_URL}${show.poster_path}`} alt='' width={120} height={180}/>
                            </div>
                            <p className="text-white text-center sm:text-left text-xl md:text-3xl mx-auto md:mx-2 flex items-center group-hover:text-red-400 line-clamp-3">{show.name || show.original_name}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default StreamingToday;