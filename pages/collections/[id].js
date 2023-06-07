import Head from 'next/head';
import { db } from '@vercel/postgres';
import Header from '../../components/Header';
import Results from '../../components/Results';

export default function Collection({ collection }) {
    return (
        <div>
            <Head><title>{collection.title}</title></Head>
            <Header />
            <div>
                <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl text-center text-red-400 mx-12">{collection.title}</h1>
                <p className='text-white text-center text-lg'>{`Created on ${collection.date}`}</p>
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