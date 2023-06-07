import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';
import { Modal } from 'react-responsive-modal';
import { BASE_URL } from "../utils/constants";

function CreateCollections({ modalOpen, onCloseModal, handleSubmit, searchInputRef, titleInputRef, descriptionInputRef, autoCompleteResults, handleInputChange, addMovie, selectedMovies, handleReorder }) {
    const [showForm, setShowForm] = useState(true);
    const toggleForm = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        if (selectedMovies.length < 1) {
            setShowForm(true);
        }
    }, [selectedMovies]);

    return (
        <Modal open={modalOpen} onClose={onCloseModal} center showCloseIcon={false} styles={{ modal: {background: '#202F3B'}}}>
            <div>
                {showForm ? (
                    <form className="flex items-center mx-auto mb-5 relative w-[40rem]">
                        <div className="relative w-full">
                            <input ref={searchInputRef} type="text" onChange={handleInputChange} className="h-16 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-2xl lg:text-3xl" placeholder="Search..."></input>
                            {autoCompleteResults.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 h-72 overflow-y-scroll">
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
                ) : (
                    <div className="text-center">
                        {selectedMovies.length > 0 && (
                            <ul className="flex flex-col items-center mb-4 w-[40rem] h-72 overflow-y-scroll">
                                <p className="text-white">{`${selectedMovies.length} items`}</p>
                                {selectedMovies?.map((movie, index) => (
                                    <li key={movie.id} className="flex items-center justify-between w-full text-white text-xl md:text-3xl rounded-md shadow-md p-2">
                                        <div className="flex items-center space-x-2">
                                            <button onClick={() => handleReorder(index, 'up', undefined)} disabled={index === 0} className="text-white hover:text-red-400 focus:outline-none cursor-pointer"><FaArrowUp /></button>
                                            <button onClick={() => handleReorder(index, 'down', undefined)} disabled={index === selectedMovies.length - 1} className="text-white hover:text-red-400 focus:outline-none cursor-pointer"><FaArrowDown /></button>
                                            <span className="mr-2 truncate">{movie.title || movie.name}</span>
                                        </div>
                                        <button onClick={() => handleReorder(undefined, 'delete', movie.id)} className="text-white hover:text-red-400 focus:outline-none cursor-pointer"><FaTrash /></button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                <div className={showForm ? 'mt-72': 'mt-0'}>
                    <input ref={titleInputRef} type="text" className="h-12 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-2xl lg:text-3xl my-4" placeholder="Title"></input>
                    <textarea ref={descriptionInputRef} type="text" className="h-28 w-full rounded-md focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center text-xl lg:text-2xl" placeholder="Description"></textarea>
                </div>
                <div className="text-center">
                    <button onClick={handleSubmit} className="bg-white text-black text-2xl font-bold rounded-md border-b-2 border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-8 inline-flex items-center">Create</button>
                    <button onClick={toggleForm} className="bg-white text-black text-2xl font-bold rounded-md border-b-2 border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-8 inline-flex items-center mx-2">{showForm ? 'Reorder' : 'Add More'}</button>
                </div>
            </div>
        </Modal>
    );
}

export default CreateCollections;