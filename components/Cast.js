import Image from "next/image";

function Cast({member}) {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    return (
        <div>
            <div className="group text-center px-20 md:px-6 xl:px-14 2xl:px-12 py-6 mx-auto transition duration-200 ease-in transform cursor-pointer">
                    <div className="mb-2 sm:px-14 md:px-10 lg:px-2">
                        <Image className="rounded-3xl group-hover:opacity-50" layout='responsive' src={`${BASE_URL}${member.profile_path}`} title={member.name} alt='' height={240} width={160}/>
                    </div>
                    <p className="text-2xl font-bold transition-all duration-100 ease-in-out text-white group-hover:text-red-400 truncate">{member.name}</p>
                    <p className="text-md font-bold transition-all duration-100 ease-in-out text-white truncate">{member.character}</p>
            </div>
        </div>
    );
}

export default Cast;