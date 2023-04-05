import React, { useState, useEffect } from 'react';
import { ArrowCircleLeftIcon,ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "../components/FooterItem";
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';
import FlipMove from 'react-flip-move';
import { API_KEY, API_URL } from '../utils/constants';

function Upcoming() {
    const [upcoming, setUpcoming] = useState([]);
    const [page, setPage] = useState(1);
    if(page < 1) setPage(1);
    useEffect(() => {
        document.title = 'Upcoming';
        const searchReq = async () => {
            const upcomingReq = await fetch(`${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`).then((res) => res.json());
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
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7 my-6 text-center md:text-left'>Upcoming Movies</p>
            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {upcoming.map((up) => up.poster_path && (
                    <>
                        <Thumbnail result={up} />
                    </>
                    ))}
                </FlipMove>
            </div>

            <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
                <div onClick={() => setPage(page - 1)}><FooterItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                <div onClick={() => setPage(page + 1)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
            </div>
        </div>
    );
}

export default Upcoming;