import React, { useState, useEffect } from 'react';
import Seasons from './Seasons';
import Recommend from './Recommend';
import Cast from './Cast';

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
                    <p className="font-bold text-white text-3xl md:text-4xl 3xl:text-6xl mx-8 mt-10 md:mt-4 lg:mt-0 text-center md:text-left">Seasons</p>
                    <div className="grid grid-cols-2 px-5 my-10 ml-2 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
                    {seasons?.filter((season) => season.season_number > 0)?.map((season) => season.poster_path && (
                            <Seasons key={season.id} result={season} id={movie.id} />
                        ))}
                    </div>
                </div>
            )}

            <div hidden={recommendDiv}>
                <p className="font-bold text-white text-3xl md:text-4xl 3xl:text-6xl mx-8 mt-10 md:mt-4 lg:mt-0 text-center md:text-left">{recArr?.length > 0 ? 'You May Enjoy' : ''}</p>
                <div className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
                    {recArr?.map((rec) => rec.backdrop_path && (
                        <Recommend key={rec.id} result={rec} />
                    ))}
                </div>
            </div>
            
            {castArr?.filter(cast => cast.profile_path).length > 0 && (
                <div>
                    <p className="font-bold text-white text-3xl md:text-4xl 3xl:text-6xl mx-8 text-center md:text-left">Cast</p>
                    <div className="px-5 my-10 ml-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {castArr?.map((cast) => cast.profile_path && (
                            <Cast key={cast.id} member={cast} />
                        ))}
                    </div>
                </div>
            )}
       </div>
    );
}

export default Panels;