import UploadFile from './UploadFile';

function LocalStorageMessage({ results, id, searchReq, type }) {
    const movieBtnStyles = 'bg-white border-b-2 rounded-l-md border-red-500 hover:opacity-75 shadow-md py-2 px-4';
    const tvBtnStyles = 'bg-white border-b-2 border-l-2 rounded-r-md border-red-500 hover:opacity-75 shadow-md py-2 px-8';
    
    return (
        <div>
            <div className='font-bold text-white text-4xl md:text-5xl mx-8 my-6 text-center md:text-left'>
                {id === 'recommendations' && results.length > 0 ?
                <div>
                    <h2>{type === 'movie' ? 'Movies' : 'TV'} Chosen For You</h2>
                    <div className='text-center text-2xl md:text-3xl 3xl:text-5xl font-bold mt-8 md:mt-4'>
                        <button onClick={() => searchReq('movie')} className={type === 'movie' ? `${movieBtnStyles} bg-red-400` : `${movieBtnStyles} text-red-400`}>Movies</button>
                        <button onClick={() => searchReq('tv')} className={type === 'tv' ? `${tvBtnStyles} bg-red-400` : `${tvBtnStyles} text-red-400`}>TV</button>
                    </div>
                </div>
                :
                id === 'favorites' && results.length > 0 ?
                <div className="flex justify-center md:justify-start items-center">
                    <p>You've Enjoyed</p>
                    <UploadFile />
                </div>
                :
                null}
            </div>
            {results.length < 1 && (
                <div className='my-10 font-bold text-center mx-6 text-white'>
                    <p className='text-2xl md:text-3xl lg:text-4xl mb-2'>{`There are currently no ${id}`}</p>
                    <p className='text-lg md:text-xl lg:text-2xl'>{'Give a film/show a ❤️ and check back!'}</p>
                </div>
            )}
        </div>
    );
}

export default LocalStorageMessage;