import Head from 'next/head';
import Image from "next/image";
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { db } from '@vercel/postgres';
import Header from '../components/Header';
import PopularCollections from '../components/PopularCollections';
import { API_KEY, API_URL, BASE_URL } from '../utils/constants';
import { Modal } from 'react-responsive-modal';
import { debounce } from "debounce";
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { alertParams } from '../utils/notifications';

function Collections({ collections }) {
    const router = useRouter();
    const [autoCompleteResults, setAutoCompleteResults] = useState([]);
    const [selectedMovies, setSelectedMovies] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const onOpenModal = () => setModalOpen(true);
    const onCloseModal = () => {
        setModalOpen(false);
        setSelectedMovies([]);
        setAutoCompleteResults([]);
    };

    useEffect(() => {
        document.addEventListener("click", (event) => {
            if (event.target !== searchInputRef.current) {
                setAutoCompleteResults([]);
            }
        });
    }, []);

    const searchInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const today = new Date();

    const unique_id = uuid();
    const small_id = unique_id.slice(0,8);

    const handleInputChange = (event) => {
        debounce(() => fetchAutoCompleteResults(event.target.value), 1200)();
    };

    const fetchAutoCompleteResults = async (query) => {
        if (query.trim() !== "") {
            const autocompleteReq = await fetch(`${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`).then((res) => res.json());
            const sortedResults = sortResults(autocompleteReq.results);
            setAutoCompleteResults(sortedResults);
        } else {
            setAutoCompleteResults([]);
        }
    };

    const addMovie = (result) => {
        if (selectedMovies.some(movie => movie.id === result.id)) {
            toast.error(`${result.title || result.name} is already in collection`, alertParams);
            return;
        }
        toast.success(`${result.title || result.name} added to collection`, alertParams);
        setSelectedMovies(prevSelectedMovies => [...prevSelectedMovies, result]);
        setAutoCompleteResults([]);
        searchInputRef.current.value = "";
        searchInputRef.current.focus();
    };

    const sortResults = (results) => {
        return results.sort((a, b) => {
            return b.vote_count - a.vote_count;
        });
    };

    const handleSubmit = async () => {
        if (titleInputRef.current.value.trim() === "" || selectedMovies.length === 0) {
            toast.error("Please enter a title and select at least one item", alertParams);
            return;
        }

        try {
            const response = await fetch('/api/db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: small_id,
                    title: titleInputRef.current.value,
                    description: descriptionInputRef.current.value,
                    date: today.toISOString().substring(0, 10),
                    list: selectedMovies
                })
            });

            if (response.ok) {
                toast.success('Collection saved!', alertParams);
                setSelectedMovies([]);
                titleInputRef.current.value = "";
                descriptionInputRef.current.value = "";
                setTimeout(() => {
                    router.push(`collections/${small_id}`);
                }, 1500);
            } else {
                toast.error('Error saving collection', alertParams);
            }
        } catch (error) {
            toast.error('Error saving collection', alertParams);
        }
    };

    return (
        <div>
            <Head><title>Collections</title></Head>
            <Header />
            <ToastContainer theme="dark"/>
            <div className="text-center">
                <button onClick={onOpenModal} className="bg-white text-black text-3xl font-bold rounded-md border-b-2 border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-8 inline-flex items-center">
                    <span className="mr-2">Create Collection</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                </button>
            </div>
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
            <PopularCollections collections={collections} />
        </div>
  );
}

export async function getServerSideProps() {
    const client = await db.connect();
    const result = await client.query('SELECT * FROM collections ORDER BY RANDOM() LIMIT 3');
    client.release();

    const collections = result.rows;

    return {
        props: {
            collections
        },
    };
}

export default Collections;