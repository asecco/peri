import Head from 'next/head';
import Header from '../components/Header';
import HomeScreen from '../components/HomeScreen';

export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>Peri</title>
        <meta name="description" content="Movie/Series library for finding the perfect watch" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HomeScreen results={results} />
    </div>
  );
}

const trending = `trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

export async function getServerSideProps() {
  const req = await fetch(`https://api.themoviedb.org/3/${trending}`).then((res) => res.json())

  return {
    props: {
      results: req.results,
    }
  };
} 