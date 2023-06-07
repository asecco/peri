import Head from 'next/head';
import { db } from '@vercel/postgres';
import Header from '../../components/Header';
import Results from '../../components/Results';
import { ToastContainer, toast } from 'react-toastify';
import { alertParams } from '../../utils/notifications';

export default function Collection({ collection }) {
    const url = `peri.vercel.app/collections/${collection?.id}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        toast.success('Copied!', alertParams);
    };

    return (
        <div>
            <Head><title>{collection.title}</title></Head>
            <Header />
            <ToastContainer theme="dark"/>
            <div className="text-center mb-4">
                <button onClick={copyToClipboard} title="Click to Copy" className="bg-white text-black text-lg md:text-xl italic rounded-md border-b-2 border-red-400 hover:bg-red-400 hover:text-white shadow-md py-2 px-8 inline-flex items-center">
                    <span className="mr-2">{url}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentcolor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
            </div>
            <div>
                <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400 mx-12">{collection?.title}</h1>
                <p className='text-white text-center text-lg my-2'>{`Created on ${collection?.date}`}</p>
                <p className="text-white text-center text-base md:text-xl lg:text-2xl mx-12">{collection?.description}</p>
            </div>
            <Results results={collection.list} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const client = await db.connect();
    const id = context.params.id;
  
    const result = await client.query('SELECT * FROM collections WHERE id = $1', [id]);
    client.release();
    const collection = result.rows[0];

    if(!collection) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            collection
        },
    };
}