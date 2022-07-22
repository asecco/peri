import Image from "next/image";

function Cast({member}) {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    return (
        <div>
            <div className="text-center px-3 py-16 mx-auto">
                    <div className="mb-2">
                        <Image className="rounded-full" layout='responsive' src={`${BASE_URL}${member.profile_path}`} title={member.name} alt='' height={192} width={176}/>
                    </div>
                    <p className="text-2xl font-bold text-red-400 truncate">{member.name}</p>
                    <p className="text-lg font-bold">{member.character}</p>
            </div>
        </div>
    );
}

export default Cast;