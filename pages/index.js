import Head from 'next/head';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import HomeScreen from '../components/HomeScreen';
import requests from '../utils/requests';
import SearchBar from '../components/SearchBar';

export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>Peri</title>
        <meta name="description" content="Peri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SearchBar />
      <NavBar />
      <HomeScreen results={results} />
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