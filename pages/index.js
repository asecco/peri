import Head from 'next/head';
import Header from '../components/Header';
import HomeScreen from '../components/HomeScreen';
import { API_KEY, API_URL } from '../utils/constants';

export default function Home({ results, nowPlaying }) {
	return (
		<div>
			<Head>
				<title>Peri</title>
				<meta name="description" content="Movie/TV library for finding the perfect watch" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<HomeScreen results={results} nowPlaying={nowPlaying}  />
		</div>
  	);
}

const trending = `trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

export async function getServerSideProps() {
	const req = await fetch(`https://api.themoviedb.org/3/${trending}`).then((res) => res.json())
	const nowPlaying = await fetch(`${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US`).then((res) => res.json());

    const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
      	return array;
  	};

	return {
		props: {
			results: req.results,
			nowPlaying: shuffleArray(nowPlaying.results),
		}
	};
} 