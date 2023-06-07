import Image from "next/image";
import { Modal } from 'react-responsive-modal';
import { BASE_URL } from "../utils/constants";

function CreateCollections({ modalOpen, onCloseModal, handleSubmit, searchInputRef, titleInputRef, descriptionInputRef, autoCompleteResults, handleInputChange, addMovie }) {
    return (
        <Modal open={modalOpen} onClose={onCloseModal} center showCloseIcon={false} styles={{ modal: {background: '#202F3B'}}}>
            <form className="flex items-center mx-auto max-w-xl mb-5 relative">
                <div className="relative w-full mb-96">
                    <input ref={searchInputRef} type="text" onChange={handleInputChange} className="h-16 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-2xl lg:text-3xl" placeholder="Search..."></input>
                    {autoCompleteResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 h-96 overflow-y-scroll">
                            {autoCompleteResults.map((result) => (
                                <div onClick={() => addMovie(result)} key={result.id} className="flex bg-gray-800 text-white text-xl md:text-3xl hover:text-red-400 rounded-md shadow-md p-1 mb-2 cursor-pointer">
                                    {result.poster_path || result.profile_path ? <Image priority={true} className="rounded-lg" src={`${BASE_URL}${result.poster_path || result.profile_path}`} alt='' width={80} height={120}/> : ''}
                                    <div className='flex flex-col ml-2'>
                                        <h2>{result.title || result.name}</h2>
                                        {(result.release_date || result.first_air_date) && (
                                            <>
                                            {result.release_date ? `(${result.release_date.substring(0, 4)})` : `(${result.first_air_date.substring(0, 4)})`}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </form>
            <div className='text-center'>
                <input ref={titleInputRef} type="text" className="h-12 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-2xl lg:text-3xl my-4" placeholder="Title"></input>
                <textarea ref={descriptionInputRef} type="text" className="h-28 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-xl lg:text-2xl mb-4" placeholder="Description"></textarea>
                <button onClick={handleSubmit} className="bg-white text-black text-2xl font-bold rounded-md border-b-2 border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-8 inline-flex items-center">
                    <span className="mr-2">Create</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                </button>
            </div>
        </Modal>
    );
}

export default CreateCollections;