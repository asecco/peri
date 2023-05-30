import { useState, useEffect } from 'react';
import { toastNotify } from "../utils/notifications";

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
            toastNotify(false);
        } else {
            favorites.push({ id: movie?.id, type: mediaType });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFav(true);
            toastNotify(true);
        }
    };
    return { isFav, checkFav };
};