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
            <div className="grid grid-cols-2 -ml-8 md:ml-2 md:grid-cols-3 lg:grid-cols-6 gap-6 my-10">
                {tv.slice(0, 6)?.map((show, index) => (
                    <div key={show.id} className="grid grid-cols-2 md:flex items-center">
                        <p className="text-white font-black mx-auto md:mx-0 text-5xl md:text-6xl lg:text-7xl">{index + 1}</p>
                        <div className='flex-shrink-0 hover:opacity-50 transition duration-200 ease-in transform sm:hover:scale-105'>
                            <a href={`/info?type=${'tv'}&id=${show.id}`} rel="noopener noreferrer">
                                <Image priority={true} className="rounded-lg" src={`${BASE_URL}${show.poster_path}`} alt='' width={160} height={240}/>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StreamingToday;