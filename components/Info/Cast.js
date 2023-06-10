import Image from "next/image";
import Link from 'next/link';
import { BASE_URL } from "../../utils/constants";
import { blurUrl } from '../../utils/helper';

function Cast({ member }) {
    return (
        <div>
            <Link href={`/cast?id=${member.id}`}>
                <div className="group text-center px-2 md:px-0 py-4 mx-auto transition duration-200 ease-in transform sm:hover:scale-105 hover:z-40 cursor-pointer">
                    <div className="mb-2 sm:px-14 md:px-10 lg:px-2">
                        <Image placeholder='blur' blurDataURL={blurUrl} className="rounded-lg group-hover:opacity-50" src={`${BASE_URL}${member.profile_path}`} title={member.name} alt='' height={1400} width={2100}/>
                    </div>
                    <p className="text-xl md:text-2xl font-bold transition-all duration-100 ease-in-out text-white group-hover:text-red-400 md:line-clamp-2">{member.name}</p>
                    <p className="my-2 text-base md:text-lg font-bold transition-all duration-100 ease-in-out text-white md:line-clamp-2">{member.character}</p>
                </div>
            </Link>
        </div>
    );
}

export default Cast;