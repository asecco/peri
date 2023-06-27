import Image from "next/image";
import Link from 'next/link';
import { BASE_URL } from "../../utils/constants";
import { blurUrl } from '../../utils/helper';

function PopularCollections({ collections }) {
    return (
        <div className="flex flex-wrap justify-center">
            {collections?.map((collection) => (
                <Link key={collection?.id} href={`collections/${collection?.id}`}>
                    <div className="flex m-4 rounded-lg shadow-md transition duration-200 ease-in transform sm:hover:scale-105 overflow-hidden">
                        <div className="absolute h-full w-full bg-red-400 bg-opacity-40"></div>
                        <h2 className="absolute text-white text-center text-xl md:text-2xl font-bold p-4 bg-black bg-opacity-80 truncate" title={collection?.title}>{collection?.title}</h2>
                        {collection.list?.slice(0, 3).map((item, index) => (
                            <Image placeholder='blur' blurDataURL={blurUrl} key={index} src={`${BASE_URL}${item?.poster_path || item?.profile_path}`} alt='' width={158} height={237}/>
                        ))}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PopularCollections;