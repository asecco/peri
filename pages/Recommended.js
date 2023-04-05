import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import FlipMove from 'react-flip-move';
import Thumbnail from '../components/Thumbnail';
import { API_KEY, API_URL } from '../utils/constants';

function Recommended() {
    const [recRes, setRecRes] = useState([]);
    useEffect(() => {
        document.title = 'Recommended';
        const searchReq = async () => {
            const recArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            for(let i in favorites) {
                const recommendReq = await fetch(`${API_URL}${favorites[i].type}/${favorites[i].id}/recommendations?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
                for(let i in recommendReq.results) {
                    recArr.push(recommendReq.results[i]);
                }
            }
            recArr.map((item, index) => {
                for(let i = index + 1; i < recArr.length; i++) {
                    if(item.id === recArr[i].id) {
                        recArr.splice(i, 1);
                    }
                }
            });
            recArr.sort(() => Math.random() - 0.5);
            setRecRes(recArr.splice(0, 20));
        }
        searchReq();
    }, []);

    return (
        <div>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7 my-6 text-center md:text-left'>{recRes.length > 0 ? 'Chosen For You' : ''}</p>
            <div className='my-10 font-bold text-center mx-6 text-white'>
                <p className='text-xl md:text-3xl lg:text-4xl'>{recRes.length > 0 ? '' : 'There are currently no recommendations'}</p>
                <p className='text-md md:text-xl lg:text-2xl'>{recRes.length > 0 ? '': 'Give a film a ♡ and check back!'}</p>
            </div> 

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                    {recRes?.map((rec) => rec !== undefined && rec.poster_path && (
                    <>
                        <Thumbnail result={rec} />
                    </>
                    ))}
                </FlipMove>
            </div>
        </div>
    );
}

export default Recommended;