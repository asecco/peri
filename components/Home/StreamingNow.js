import Image from 'next/image';
import Link from 'next/link';
import { BASE_URL } from "../../utils/constants";
import { CalendarIcon  } from '@heroicons/react/outline';

function StreamingNow({ tv }) {
    return (
        <div>
            <div className="flex justify-center md:justify-start md:mt-8 items-center">
                <p className="font-bold text-white text-4xl lg:text-5xl mx-6">Streaming Now</p>
                <CalendarIcon className="h-12 w-12 lg:h-14 lg:w-14 -ml-6 text-red-400"/>
            </div>
            <div className="grid grid-cols-2 ml-2 md:ml-4 md:grid-cols-3 lg:grid-cols-6 gap-6 my-10">
                {tv?.slice(0, 6)?.map((show, index) => (
                    <div key={show?.id} className="grid grid-cols-2 md:flex items-center ml-10 md:ml-6">
                        <div className='flex-shrink-0 hover:opacity-50 transition duration-200 ease-in transform sm:hover:scale-105'>
                            <Link href={`/info/tv/${show?.id}`}>
                                <Image className="rounded-lg" src={`${BASE_URL}${show?.poster_path}`} alt='' width={160} height={240}/>
                            </Link>
                        </div>
                        <p className="text-white font-black mx-4 md:mx-2 text-5xl md:text-6xl lg:text-7xl 3xl:text-9xl">{index + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StreamingNow;