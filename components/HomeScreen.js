import NowPlayingBanner from "./NowPlayingBanner";
import Results from "./Results";

function HomeScreen({ results, nowPlaying }) {
    return (
        <div>
            <NowPlayingBanner nowPlaying={nowPlaying} />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-10 lg:mx-14 mt-14 text-center md:text-left'>Trending</p>
            <Results results={results} />
        </div>
    );
}

export default HomeScreen;