import React, {useState, useEffect} from 'react';
import Header from "../components/Header";
import FlipMove from 'react-flip-move';
import Thumbnail from '../components/Thumbnail';

function Recommended() {
    const [recRes, setRecRes] = useState([]);
    useEffect(() => {
        document.title = 'Recommended';
        const searchReq = async () => {
            const recArr = [];
            const favorites = JSON.parse(localStorage.getItem('favorites'));
            for(let i in favorites) {
                const recommendReq = await fetch(`https://api.themoviedb.org/3/${favorites[i].type}/${favorites[i].id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then((res) => res.json());
                for(let i in recommendReq.results) {
                    if(recommendReq.results[i].original_language !== 'en') {
                        recommendReq.results.splice(i, 1);
                    }
                    if(!recArr.includes(recommendReq.results[i])) {
                        recArr.push(recommendReq.results[i]);
                    }
                }
            }
            recArr.sort(() => Math.random() - 0.5);
            setRecRes(recArr.splice(0, 20));
        }
        searchReq();
    }, []);

    return (
        <div>
            <Header />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7'>{recRes.length > 0 ? 'Chosen For You' : ''}</p>
            <div className='my-10 font-bold text-center mx-6 text-white'>
                <p className='text-xl md:text-2xl lg:text-4xl 2xl:text-6xl'>{recRes.length > 0 ? '' : 'There are currently no recommendations'}</p>
                <p className='text-lg md:text-lg lg:text-2xl 2xl:text-4xl'>{recRes.length > 0 ? '': 'Give a film a ♡ and check back!'}</p>
            </div> 

            <div>
                <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {recRes?.map((rec) => rec !== undefined && rec.backdrop_path && (
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