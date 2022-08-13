import Image from 'next/image';
import { forwardRef } from 'react';
import { useRouter } from "next/router";
import { BASE_URL } from "../utils/constants";

const Thumbnail = forwardRef(({result}, ref) => {
    const router = useRouter();
    const routeQuery = () => router.push({pathname: '/MovieInfo', query: result}, `/${result.id}`);

    return (
        <div onClick={routeQuery} ref={ref} className='p-2 mx-10 my-2 md:mx-4 lg:mx-8 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
            <Image className='group-hover:opacity-50' layout='responsive' src={`${BASE_URL}${result.poster_path}`} alt='' height={1440} width={960}/>
            <div className='p-2 text-center'>
                <h2 className='mt-1 text-xl lg:text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold group-hover:text-red-400 truncate max-w-md'>{result.title || result.original_name}</h2>
            </div>
        </div>
    )
})

Thumbnail.displayName = 'Thumbnail';
export default Thumbnail;