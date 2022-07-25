import Head from 'next/head';
import Header from '../components/Header';
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
      <HomeScreen results={results} />
    </div>
  );
}

const trending = `trending/all/week?api_key=${process.env.API_KEY}`;

export async function getServerSideProps() {
  const req = await fetch(`https://api.themoviedb.org/3/${trending}`).then((res) => res.json())

  return {
    props: {
      results: req.results,
    }
  };
} 