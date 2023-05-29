function LocalStorageMessage({ results, id }) {
    return (
        <div>
            <p className='font-bold text-white text-4xl lg:text-5xl mx-8 xl:mx-10 my-6 text-center md:text-left'>
                {id === 'recommendations' && results.length > 0 ? 'Chosen For You' : id === 'favorites' && results.length > 0 ? "You've Enjoyed" : ''}
            </p>
            <div className='my-10 font-bold text-center mx-6 text-white'>
                <p className='text-2xl md:text-3xl lg:text-4xl mb-2'>{results.length > 0 ? '' : `There are currently no ${id}`}</p>
                <p className='text-lg md:text-xl lg:text-2xl'>{results.length > 0 ? '': 'Give a film/show a ♡ and check back!'}</p>
            </div>
        </div>
    );
}

export default LocalStorageMessage;