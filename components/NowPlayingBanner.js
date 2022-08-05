import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Image from 'next/image';
import { BASE_URL } from "../utils/requests";
import Slider from "react-slick";

function NowPlayingBanner() {
    const router = useRouter();
    const routeQuery = (movie) => router.push({pathname: '/MovieInfo', query: movie}, `/${movie.id}`);

    const [nowPlaying, setNowPlaying] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const nowReq = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            setNowPlaying(shuffleArray(nowReq.results));
        }
        searchReq();
    }, []);

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
                    <div className='w-full relative h-96 overflow-hidden px-8' key={movie.id}>
                        <div className="absolute w-full h-full opacity-50 top-0 left-0 z-10 bg-gradient-to-r from-primary via-primary"></div>
                        <div className="absolute z-20 flex flex-col items-left w-1/2 justify-center h-full px-10">
                            <div className="text-red-400 font-bold text-4xl lg:text-5xl text-center">{movie.title || movie.original_title}</div>
                            <div className="text-white text-lg lg:text-xl mt-4 font-medium md:line-clamp-4 lg:line-clamp-6">{movie.overview}</div>
                            <div className='text-center'>
                                <button onClick={() => routeQuery(movie)} title="More Info" className="transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50 h-12 w-20 md:h-16 md:w-20 lg:w-24 bg-primary hover:bg-white text-white hover:text-primary text-lg font-bold rounded-lg inline-flex items-center justify-center my-4">More Info</button>
                            </div>
                        </div>
                        <Image src={`${BASE_URL}${movie.backdrop_path || movie.poster_path}`}  alt='' height={1080} width={1920}  />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default NowPlayingBanner;