import Image from 'next/image';
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
        slidesToScroll: 1
      };

    return (
        <div className='hidden md:block'>
            <Slider {...settings}>
                {nowPlaying.slice(0, 3).map((movie) => (
                    <div className='w-full relative h-96 overflow-hidden px-8 hover:cursor-pointer' key={movie.id}>
                        <a href={`/info?type=${'movie'}&id=${movie.id}`} rel="noopener noreferrer">
                            <div className="absolute w-full h-full opacity-50 top-0 left-0 z-10 bg-gradient-to-r from-primary via-primary"></div>
                            <div className="absolute z-20 flex flex-col items-left w-1/2 justify-center h-full px-10 lg:w-1/3">
                                <div className="text-red-400 font-bold text-4xl lg:text-5xl text-center">{movie.title || movie.original_title}</div>
                                <div className="text-white text-lg lg:text-xl mt-4 font-medium md:line-clamp-4 lg:line-clamp-6">{movie.overview}</div>
                            </div>
                            <Image className="object-center object-cover" layout="fill" objectFit="cover" src={`${BASE_URL}${movie.backdrop_path || movie.poster_path}`} alt='' />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NowPlayingBanner;