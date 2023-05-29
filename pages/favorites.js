import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Results from '../components/Results';
import LocalStorageMessage from '../components/LocalStorageMesage';
import { API_KEY, API_URL } from '../utils/constants';

function Favorites() {
    const [favRes, setFavRes] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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
            setIsLoaded(true);
        }
        searchReq();
    }, []);
    
    return (
        <div>
            <Head><title>{`Favorites`}</title></Head>
            <Header />
            {isLoaded &&<LocalStorageMessage results={favRes} id={'favorites'} />}
            <Results results={favRes} />
        </div>
    );
}

export default Favorites;