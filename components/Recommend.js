import Image from "next/image";
import {useRouter} from "next/router";

function Recommend({result}) {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const router = useRouter();
    const routeQuery = () => router.push({pathname: '/Info', query: result}, `/${result.id}`);

    return (
        <div onClick={routeQuery} className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
            <Image className='group-hover:opacity-50' layout='responsive' src={`${BASE_URL}${result.backdrop_path || result.poster_path}` || `${BASE_URL}${result.poster_path}`} alt='' height={1080} width={1920}/>
            <div className='p-2 text-center'>
                <h2 className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-red-400 truncate max-w-md'>{result.title || result.original_name}</h2>
            </div>
        </div>
    );
}

export default Recommend;