import React, { useState, useEffect } from 'react';
import Seasons from '../Seasons';
import Recommend from '../Recommend';
import Cast from '../Cast';
import FlipMove from 'react-flip-move';

function Panels({ mediaType, seasons, movie, recArr, castArr }) {
    const [recommendDiv, setRecommendDiv] = useState(false);
    useEffect(() => {
        if (mediaType === 'tv') {
            setRecommendDiv(true);
        }
    }, [mediaType]);

    return (
        <div>
            {mediaType === 'tv' && (
                <div>
                    <p className="font-bold text-white text-2xl md:text-4xl mx-8 mt-10 md:mt-4 lg:mt-0">Seasons:</p>
                    <FlipMove className="grid grid-cols-2 px-5 my-10 ml-2 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 3xl:grid-cols-10">
                        {seasons?.map((season) => season.poster_path && (
                            <Seasons key={season.id} result={season} id={movie.id} />
                        ))}
                    </FlipMove>
                </div>
            )}

            <div hidden={recommendDiv}>
                <p className="font-bold text-white text-2xl md:text-4xl mx-8">{recArr?.length > 0 ? 'You May Enjoy:' : ''}</p>
                <FlipMove className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-8">
                    {recArr?.map((rec) => rec.backdrop_path && (
                        <Recommend key={rec.id} result={rec} />
                    ))}
                </FlipMove>
            </div>

            <div>
                <p className="font-bold text-white text-2xl md:text-4xl mx-8">Cast:</p>
                <FlipMove className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 3xl:grid-cols-8">
                    {castArr?.map((cast) => cast.profile_path && (
                        <Cast key={cast.id} member={cast} />
                    ))}
                </FlipMove>
            </div>
        </div>
    );
}

export default Panels;