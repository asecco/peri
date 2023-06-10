import Image from "next/image";
import Link from 'next/link';
import { BASE_URL } from "../../utils/constants";
import { blurUrl } from '../../utils/helper';

function Recommend({ result }) {
    return (
        <div className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-40'>
            <Link href={`/info?type=${result.media_type || 'movie'}&id=${result.id}`}>
                <Image placeholder='blur' blurDataURL={blurUrl} className='group-hover:opacity-50 rounded-lg' src={`${BASE_URL}${result.backdrop_path || result.poster_path}` || `${BASE_URL}${result.poster_path}`} alt='' height={1080} width={1920}/>
                <div className='p-2 text-center' title={result.title || result.original_name}>
                    <h2 className='mt-1 text-xl lg:text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-red-400 line-clamp-2 max-w-md'>{result.title || result.original_name}</h2>
                </div>
            </Link>
        </div>
    );
}

export default Recommend;