import Image from "next/image";

function Cast({member}) {
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    return (
        <div>
            <div className="text-center px-3 py-16 mx-auto max-w-full">
                <div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div>
                        <Image className="rounded-full" layout='responsive' src={`${BASE_URL}${member.profile_path}`} alt='' height={1080} width={1920}/>
                    </div>
                    <p className="text-2xl font-bold text-red-400">{member.name}</p>
                    <p className="text-lg font-bold">{member.character}</p>
                </div>
            </div>
        </div>
    );
}

export default Cast;