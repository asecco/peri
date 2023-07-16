import UploadFile from './UploadFile';

function LocalStorageMessage({ results, id, searchReq, type }) {
    const movieBtnStyles = 'bg-white text-black border-b-2 rounded-l-md border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-4';
    const tvBtnStyles = 'bg-white text-black border-b-2 border-l-2 rounded-r-md border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-8';
    
    return (
        <div>
            <div className='font-bold text-white text-4xl md:text-5xl mx-8 my-6 text-center md:text-left'>
                {id === 'recommendations' && results.length > 0 ?
                <div>
                    <p>Chosen For You</p>
                    <div className='text-center text-2xl md:text-3xl 3xl:text-5xl font-bold mt-8 md:mt-4'>
                        <button onClick={() => searchReq('movie')} className={type === 'movie' ? `${movieBtnStyles} bg-red-500` : `${movieBtnStyles}`}>Movies</button>
                        <button onClick={() => searchReq('tv')} className={type === 'tv' ? `${tvBtnStyles} bg-red-500` : `${tvBtnStyles}`}>TV</button>
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
                    <p className='text-lg md:text-xl lg:text-2xl'>{'Give a film/show a ♡ and check back!'}</p>
                </div>
            )}
        </div>
    );
}

export default LocalStorageMessage;