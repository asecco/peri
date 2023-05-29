import Head from 'next/head';
import Header from '../components/Header';
import NowPlayingBanner from "../components/NowPlayingBanner";
import Results from "../components/Results";
import { API_KEY, API_URL } from '../utils/constants';

export default function Home({ results, nowPlaying }) {
	return (
		<div>
			<Head>
				<title>Peri</title>
				<meta name="description" content="Movie/TV library for finding the perfect watch for the night" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<NowPlayingBanner nowPlaying={nowPlaying} />
            <p className='font-bold text-white text-4xl lg:text-5xl mx-8 xl:mx-10 mt-14 text-center md:text-left'>Trending</p>
            <Results results={results} />
		</div>
  	);
}

export async function getServerSideProps() {
	const trending = `trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
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