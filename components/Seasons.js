import Image from "next/image";
import { BASE_URL } from "../utils/constants";

function Seasons({ result, id }) {
    return (
        <div className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
            <a href={`/tv/season?num=${result.season_number}&id=${id}`} rel="noopener noreferrer">
                <Image className='group-hover:opacity-50' layout='responsive' src={`${BASE_URL}${result.poster_path}`} alt='' height={1440} width={960}/>
                <div className='p-2 text-center'>
                    <h2 className='mt-1 text-2xl text-white font-bold transition-all duration-100 ease-in-out group-hover:text-red-400 md:truncate max-w-md'>{`Season ${result.season_number}`}</h2>
                    <h2 className='mt-1 text-md text-white font-bold transition-all duration-100 ease-in-out truncate max-w-md'>{`${result.episode_count} Episodes`}</h2>
                </div>
            </a>
        </div>
    );
}

export default Seasons;