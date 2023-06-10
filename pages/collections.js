import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useRef, useEffect } from 'react';
import { db } from '@vercel/postgres';
import Header from '../components/Header/Header';
import PopularCollections from '../components/Collections/PopularCollections';
import CreateCollections from '../components/Collections/CreateCollections';
import { API_KEY, API_URL } from '../utils/constants';
import { debounce } from "debounce";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { alertParams } from '../utils/helper';

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

        if (selectedMovies.length > 40) {
            toast.error("Please select no more than 40 items", alertParams);
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

    const handleReorder = (index, direction, movieId) => {
        const updatedMovies = [...selectedMovies];

        if (direction === 'up' && index > 0) {
            const temp = updatedMovies[index];
            updatedMovies[index] = updatedMovies[index - 1];
            updatedMovies[index - 1] = temp;
        } else if (direction === 'down' && index < selectedMovies.length - 1) {
            const temp = updatedMovies[index];
            updatedMovies[index] = updatedMovies[index + 1];
            updatedMovies[index + 1] = temp;
        } else if (direction === 'delete') {
            const filteredMovies = updatedMovies.filter((movie) => movie.id !== movieId);
            setSelectedMovies(filteredMovies);
            return;
        }
        setSelectedMovies(updatedMovies);
    };

    return (
        <div>
            <Head><title>Collections</title></Head>
            <Header />
            <div className="text-center">
                <button onClick={onOpenModal} className="bg-white text-black text-3xl font-bold rounded-md border-b-2 border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-8 inline-flex items-center">
                    <span className="mr-2">Create Collection</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                </button>
            </div>
            <CreateCollections modalOpen={modalOpen} onCloseModal={onCloseModal} handleSubmit={handleSubmit} searchInputRef={searchInputRef} titleInputRef={titleInputRef} descriptionInputRef={descriptionInputRef} autoCompleteResults={autoCompleteResults} handleInputChange={handleInputChange} addMovie={addMovie} selectedMovies={selectedMovies} handleReorder={handleReorder} />
            <PopularCollections collections={collections} />
        </div>
  );
}

export async function getServerSideProps() {
    let retries = 0;

    while (retries < 3) {
        try {
            const client = await db.connect();
            const result = await client.query('SELECT * FROM collections ORDER BY RANDOM() LIMIT 6');
            client.release();

            const collections = result.rows;

            return {
                props: {
                    collections
                },
            };
        } catch (error) {
            retries++;
            console.log(`Failed to connect to the database. Retrying... (Attempt ${retries})`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    };
}

export default Collections;