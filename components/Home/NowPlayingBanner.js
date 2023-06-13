import Image from 'next/image';
import Link from 'next/link';
import Slider from "react-slick";
import { blurUrl } from '../../utils/helper';

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
                {nowPlaying?.slice(0, 3)?.map((movie) => (
                    <div className='w-full relative h-[35rem] overflow-hidden hover:cursor-pointer' key={movie?.id}>
                        <Link href={`/info/movie/${movie?.id}`}>
                            <div className="absolute z-20 flex flex-col justify-center h-full w-full drop-shadow-[0_3.2px_3.2px_rgba(0,0,0,0.9)]">
                                <div className="text-red-400 font-black text-5xl lg:text-7xl 3xl:text-8xl text-center">{movie?.title || movie?.original_title}</div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent"></div>
                            <Image placeholder='blur' blurDataURL={blurUrl} priority={true} className="object-cover object-center w-full h-full" src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`} alt='' height={1080} width={1920} />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NowPlayingBanner;