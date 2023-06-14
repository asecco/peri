import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Results from '../components/Layout/Results';
import LocalStorageMessage from '../components/Layout/LocalStorageMesage';
import { API_KEY, API_URL } from '../utils/constants';

function Favorites() {
    const [favRes, setFavRes] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            if (favorites?.length < 1) {
                setIsLoaded(true);
                return;
            }
            const startIndex = (page - 1) * 10;
            const endIndex = startIndex + 10;
            const favSlice = favorites?.slice(startIndex, endIndex);

            if (startIndex >= favorites?.length) {
                setHasMore(false);
                return;
            }

            const favArr = favRes.slice();
            for (let i in favSlice) {
                const favReq = await fetch(`${API_URL}${favSlice[i].type}/${favSlice[i].id}?api_key=${API_KEY}&language=en-US`).then((res) => res.json());
                favReq.media_type = favSlice[i].type;
                favArr.push(favReq);
            }
            setFavRes(favArr);
            setIsLoaded(true);
        };
        fetchFavorites();
    }, [page]);

    const handleScroll = () => {
        const isAtBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
        if (isAtBottom) {
            if (hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    return (
        <div>
            <Head><title>{`Favorites`}</title></Head>
            <Header />
            {isLoaded && <LocalStorageMessage results={favRes} id={'favorites'} />}
            <Results results={favRes} />
        </div>
    );
}

export default Favorites;