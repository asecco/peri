import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Results from '../components/Results';
import { API_KEY, API_URL } from '../utils/constants';

function Recommended() {
    const [recRes, setRecRes] = useState([]);
    useEffect(() => {
        const searchReq = async () => {
            const recArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            const favoriteIds = favorites.map((favorite) => favorite.id);
            const shuffledIds = favoriteIds.sort(() => 0.5 - Math.random());
            const selectedIds = shuffledIds.slice(0, 10); //Selects 10 random movies from favorites to get recommendations from

            for (let i = 0; i < selectedIds.length; i++) {
                const favorite = favorites.find((fav) => fav.id === selectedIds[i]);
                const recommendReq = await fetch(`${API_URL}${favorite.type}/${favorite.id}/recommendations?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
                for (let j in recommendReq.results) {
                    recArr.push(recommendReq.results[j]);
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

            const filteredAndSortedArr = filteredArr.filter((obj) => { //Removes movies with low vote count, < 100
                return obj.vote_count >= 100;
            });

            const splicedArr = filteredAndSortedArr.splice(0, 20);
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
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-8 my-6 text-center md:text-left'>{recRes.length > 0 ? 'Chosen For You' : ''}</p>
            <div className='my-10 font-bold text-center mx-6 text-white'>
                <p className='text-2xl md:text-3xl lg:text-4xl mb-2'>{recRes.length > 0 ? '' : 'There are currently no recommendations'}</p>
                <p className='text-lg md:text-xl lg:text-2xl'>{recRes.length > 0 ? '': 'Give a film/show a ♡ and check back!'}</p>
            </div>
            <Results results={recRes} />
        </div>
    );
}

export default Recommended;