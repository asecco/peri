import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'

export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>Peri</title>
        <meta name="description" content="Peri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

const trending = `trending/all/week?api_key=${process.env.API_KEY}`;

export async function getServerSideProps(context) {
  const genre = context.query.genre
  const req = await fetch(`https://api.themoviedb.org/3/${requests[genre]?.url || trending}`).then((res) => res.json())

  return {
    props: {
      results: req.results,
    }
  };
} 