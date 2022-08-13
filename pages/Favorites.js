import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FlipMove from 'react-flip-move';
import Thumbnail from '../components/Thumbnail';
import { API_KEY } from '../utils/constants';

function Favorites() {
    const [favRes, setFavRes] = useState([]);
    useEffect(() => {
        document.title = 'Favorites';
        const searchReq = async () => {
            const favArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            for(let i in favorites) {
                const favReq = await fetch(`https://api.themoviedb.org/3/${favorites[i].type}/${favorites[i].id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
                favReq.media_type = favorites[i].type;
                favArr.push(favReq);
            }
            setFavRes(favArr);
        }
        searchReq();
    }, []);
    
    return (
        <div>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7'>{favRes.length > 0 ? "You've Enjoyed" : ''}</p>
            <div className='my-10 font-bold text-center mx-6 text-white'>
                <p className='text-xl md:text-2xl lg:text-4xl 2xl:text-6xl'>{favRes.length > 0 ? '' : 'There are currently no favorites'}</p>
                <p className='text-lg md:text-lg lg:text-2xl 2xl:text-4xl'>{favRes.length > 0 ? '': 'Give a film a ♡ and check back!'}</p>
            </div>            

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7">
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