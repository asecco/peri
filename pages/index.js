import Head from 'next/head';
import { TrendingUpIcon  } from '@heroicons/react/outline';
import Header from '../components/Header';
import NowPlayingBanner from "../components/NowPlayingBanner";
import Results from "../components/Results";
import StreamingNow from '../components/StreamingNow';
import { API_KEY, API_URL } from '../utils/constants';

export default function Home({ results, nowPlaying, tv }) {
	return (
		<div>
			<Head>
				<title>Peri</title>
				<meta name="description" content="Movie/TV library for finding the perfect watch for the night" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<NowPlayingBanner nowPlaying={nowPlaying} />
			<StreamingNow tv={tv} />
			<div className="flex mt-8 items-center">
                <p className="font-bold text-white text-4xl lg:text-5xl mx-6 xl:mx-8 text-center md:text-left">Trending</p>
                <TrendingUpIcon className="h-12 w-12 lg:h-14 lg:w-14 -ml-6 text-green-400"/>
            </div>
            <Results results={results} />
		</div>
  	);
}

export async function getServerSideProps() {
	const requests = [
		fetch(`${API_URL}trending/movie/day?api_key=${API_KEY}`).then((res) => res.json()),
		fetch(`${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US`).then((res) => res.json()),
		fetch(`${API_URL}trending/tv/day?api_key=${API_KEY}&language=en-US`).then((res) => res.json())
	  ];

	  const [trending, nowPlaying, tv] = await Promise.all(requests);
	  const tvTrending = tv.results.filter((tvShow) => tvShow.original_language === 'en');

    const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
      	return array;
  	};

	return {
		props: {
			results: trending.results,
			nowPlaying: shuffleArray(nowPlaying.results),
			tv: tvTrending
		}
	};
} 