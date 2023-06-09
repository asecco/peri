import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { alertParams } from "../utils/helper";

export const localStorageFavorites = (movie, mediaType) => {
    const [isFav, setIsFav] = useState(false);
    useEffect(() => {
        const localStorageFavorites = localStorage.getItem('favorites');
        if (localStorageFavorites) {
            const favorites = JSON.parse(localStorageFavorites);
            const isFavorite = favorites.some((fav) => fav.id === movie?.id && fav.type === mediaType);
            setIsFav(isFavorite);
        } else {
            setIsFav(false);
        }
    }, [movie, mediaType]);

    const checkFav = () => {
        const localStorageFavorites = localStorage.getItem('favorites');
        const favorites = localStorageFavorites ? JSON.parse(localStorageFavorites) : [];
        const index = favorites.findIndex((fav) => fav.id === movie?.id && fav.type === mediaType);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFav(false);
            toast.error('Removed from favorites', alertParams);
        } else {
            favorites.push({ id: movie?.id, type: mediaType });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFav(true);
            toast.success('Added to favorites', alertParams);
        }
    };
    return { isFav, checkFav };
};