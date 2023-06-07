import Image from "next/image";
import Link from 'next/link';
import { BASE_URL } from "../utils/constants";

function PopularCollections({ collections }) {
    return (
        <div className="w-3/4 mx-auto">
            {collections?.map((collection) => (
                <Link key={collection.id} href={`collections/${collection.id}`}>
                    <div className="m-4 bg-primary border-2 rounded-lg shadow-md transition duration-200 ease-in transform sm:hover:scale-105">
                        <div className="p-4">
                            <h2 className="text-red-400 text-2xl font-bold text-center mb-2">{collection.title}</h2>
                            <p className="text-white text-base text-center">{collection.date}</p>
                        </div>
                        <div className="px-4 pb-4">
                            <div className="flex flex-wrap justify-center">
                                {collection.list?.slice(0, 5).map((item, index) => (
                                    <Image key={index} className="rounded-lg m-2" src={`${BASE_URL}${item.poster_path || item.profile_path}`} alt='' width={112} height={168}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PopularCollections;