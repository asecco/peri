import Image from 'next/image';
import Slider from "react-slick";
import { BASE_URL } from "../utils/constants";

function FeaturedMovie({ featured, reviews }) {
    const settings = {
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        pauseOnHover: true,
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <p className="font-bold text-white text-4xl lg:text-5xl mx-8 xl:mx-10 mt-14 text-center md:text-left">Featured Movie:</p>
                <div className="px-4 ml-5 sm:ml-0  mb-8 py-10 sm:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center border-4 shadow-md rounded-lg relative h-[30rem]">
                        <a href={`/info?type=${'movie'}&id=${featured.id}`} rel="noopener noreferrer" className="flex flex-col">
                            <Image priority={true} className="object-center object-cover" layout="fill" objectFit="cover" src={`${BASE_URL}${featured.backdrop_path || movie.poster_path}`} alt='' />
                            <div className="text-center z-50">
                                <h2 className="text-red-400 text-5xl font-bold sm:text-6xl">{featured.title || featured.original_title}</h2>
                            </div>
                        </a>

                        <Slider {...settings} className="mx-8 md:col-span-2 lg:col-span-2 lg:mx-8 bg-primary rounded-lg">
                            {reviews.slice(0, 3).map((review, index) => (
                                <div key={index} className="justify-between p-8">
                                    <div className="mt-4 line-clamp-8">
                                        <p className="text-2xl font-bold text-red-400 sm:text-3xl">{review.author_details.rating ? `${review.author_details.rating}/10`  : ''}</p>
                                        <p className="text-white mt-4">{review.content}</p>
                                    </div>
                                    <a href={`${review.url}`} rel="noopener noreferrer" target="_blank">
                                        <p className="text-white text-base mt-8 underline">{`- ${review.author} (${review.created_at.substring(0, 10)})`}</p>
                                    </a>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
        </div>
    );
}

export default FeaturedMovie;