function LocalStorageMessage({ results, id }) {
    return (
        <div>
            <p className='font-bold text-white text-4xl lg:text-5xl mx-6 xl:mx-8 my-6 text-center md:text-left'>
                {id === 'recommendations' && results.length > 0 ? 'Chosen For You' : id === 'favorites' && results.length > 0 ? "You've Enjoyed" : ''}
            </p>
            {!results.length > 0 && (
                <div className='my-10 font-bold text-center mx-6 text-white'>
                    <p className='text-2xl md:text-3xl lg:text-4xl mb-2'>{`There are currently no ${id}`}</p>
                    <p className='text-lg md:text-xl lg:text-2xl'>{'Give a film/show a ♡ and check back!'}</p>
                </div>
            )}
        </div>
    );
}

export default LocalStorageMessage;