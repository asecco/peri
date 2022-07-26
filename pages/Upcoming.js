import React, {useState, useEffect} from 'react';
import {ArrowCircleLeftIcon,ArrowCircleRightIcon} from '@heroicons/react/outline';
import HeaderItem from "../components/HeaderItem";
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import FlipMove from 'react-flip-move';

function Upcoming() {
    const [upcoming, setUpcoming] = useState([]);
    const [page, setPage] = useState(1);
    if(page < 1) setPage(1);
    useEffect(() => {
        const searchReq = async () => {
            const upcomingReq = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`).then((res) => res.json());
            for(let i in upcomingReq.results) {
                upcomingReq.results[i].media_type = 'movie';
            }
            setUpcoming(upcomingReq.results);
        }
        searchReq();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [page]);

    return (
        <div>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7'>Upcoming Movies</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {upcoming.map((up) => (
                    <>
                        <Thumbnail result={up} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
                <div onClick={() => setPage(page - 1)}><HeaderItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                <div onClick={() => setPage(page + 1)}><HeaderItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
        </div>
    );
}

export default Upcoming;