import Image from 'next/image';
import Link from 'next/link';
import { BASE_URL } from "../utils/constants";
import Slider from "react-slick";

function NowPlayingBanner({ nowPlaying }) {
    const settings = {
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
      };

    return (
        <div className='hidden md:block'>
            <Slider {...settings}>
                {nowPlaying.slice(0, 3).map((movie) => (
                    <div className='w-full relative h-[30rem] overflow-hidden hover:cursor-pointer' key={movie.id}>
                        <Link href={`/info?type=movie&id=${movie.id}`}>
                            <div className="absolute w-full h-full opacity-50 top-0 left-0 z-10 bg-gradient-to-r from-primary via-primary"></div>
                            <div className="absolute z-20 flex flex-col items-left w-1/2 justify-center h-full px-10 lg:w-1/3 drop-shadow-[0_3.2px_3.2px_rgba(0,0,0,0.9)]">
                                <div className="text-red-400 font-bold text-4xl lg:text-5xl text-center">{movie.title || movie.original_title}</div>
                                <div className="text-white text-lg lg:text-xl mt-4 font-medium md:line-clamp-4 lg:line-clamp-6">{movie.overview}</div>
                            </div>
                            <Image priority={true} className="object-center object-cover" src={`${BASE_URL}${movie.backdrop_path || movie.poster_path}`} alt='' height={1080} width={1920} />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NowPlayingBanner;