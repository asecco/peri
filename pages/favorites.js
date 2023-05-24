import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FlipMove from 'react-flip-move';
import Thumbnail from '../components/Thumbnail';
import { API_KEY, API_URL } from '../utils/constants';

function Favorites() {
    const [favRes, setFavRes] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const favArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            for(let i in favorites) {
                const favReq = await fetch(`${API_URL}${favorites[i].type}/${favorites[i].id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
                favReq.media_type = favorites[i].type;
                favArr.push(favReq);
            }
            setFavRes(favArr);
        }
        searchReq();
    }, []);
    
    return (
        <div>
            <Head><title>{`Favorites`}</title></Head>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-14 my-6 text-center md:text-left'>{favRes.length > 0 ? "You've Enjoyed" : ''}</p>
            <div className='my-10 font-bold text-center mx-6 text-white'>
                <p className='text-xl md:text-3xl lg:text-4xl'>{favRes.length > 0 ? '' : 'There are currently no favorites'}</p>
                <p className='text-md md:text-xl lg:text-2xl'>{favRes.length > 0 ? '': 'Give a film a ♡ and check back!'}</p>
            </div>            

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {favRes?.map((fav) => fav.poster_path && (
                    <>
                        <Thumbnail result={fav} />
                    </>
                    ))}
                </FlipMove>
            </div>
        </div>
    );
}

export default Favorites;