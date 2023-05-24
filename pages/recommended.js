import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import FlipMove from 'react-flip-move';
import Thumbnail from '../components/Thumbnail';
import { API_KEY, API_URL } from '../utils/constants';

function Recommended() {
    const [recRes, setRecRes] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const recArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            const favoriteIds = favorites.map((favorite) => favorite.id);
            for(let i in favorites) {
                const recommendReq = await fetch(`${API_URL}${favorites[i].type}/${favorites[i].id}/recommendations?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
                for(let i in recommendReq.results) {
                    recArr.push(recommendReq.results[i]);
                }
            }

            recArr.map((item, index) => { //Removes the same movie from appearing twice
                for(let i = index + 1; i < recArr.length; i++) {
                    if(item.id === recArr[i].id) {
                        recArr.splice(i, 1);
                    }
                }
            });
            
            recArr.sort(() => Math.random() - 0.5);
            const filteredArr = recArr.filter((obj) => { //Removes movies that are already in favorites
                return !favoriteIds.includes(obj.id);
            });
            const splicedArr = filteredArr.splice(0, 20);
            splicedArr.sort((a, b) => { //Sorts by vote count
                return b.vote_count - a.vote_count;
            });
            setRecRes(splicedArr);
        }
        searchReq();
    }, []);

    return (
        <div>
            <Head><title>{`Recommended`}</title></Head>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-14 my-6 text-center md:text-left'>{recRes.length > 0 ? 'Chosen For You' : ''}</p>
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