import Image from "next/image";
import Header from '../components/Header';
import Episodes from '../components/Episodes';
import Head from 'next/head';
import { BASE_URL, API_KEY, API_URL } from '../utils/constants';

function EpisodeList({ seasonNum, season, episodes, title }) {
    const targetSeason = season.find((s) => s.season_number === seasonNum);
    const overview = targetSeason?.overview;
    const poster = targetSeason?.poster_path;

    return (
        <div>
            <Head><title>{`${title} | Season ${seasonNum}`}</title></Head>
            <Header />
            <div className="mx-auto px-20 flex flex-col-reverse gap-10 object-bottom md:flex-row mb-8">
                <div className="flex flex-col gap-4 md:w-5/12 lg:w-6/12 xl:w-8/12 2xl:w-10/12">
                    <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400">{title}</h1>
                    <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl text-center text-white">{`Season ${seasonNum}`}</h2>
                    <p className="text-center md:text-left text-base md:text-xl lg:text-2xl text-white line-clamp-14 mb-6 md:mb-0">{overview}</p>
                    {episodes?.map((episode) => episode.still_path && (
                    <>
                        <Episodes result={episode} />
                    </>
                    ))}
                </div>
                <div className="w-8/12 md:w-5/12 lg:w-4/12 mx-10 md:mx-14">
                    <Image priority={true} layout="responsive" src={`${BASE_URL}${poster}`} alt='' height={960} width={640}/>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { num, id } = context.query;
    if (!id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    const show = await fetch(`${API_URL}tv/${id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
    const episode = await fetch(`${API_URL}tv/${id}/season/${num}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());

    return {
        props: {
            seasonNum: parseInt(num),
            season: show.seasons,
            episodes: episode.episodes,
            title: show.original_name,
        },
    }
}

export default EpisodeList;