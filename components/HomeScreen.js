import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";
import NowPlayingBanner from "./NowPlayingBanner";

function HomeScreen({results}) {
    return (
        <div>
            <NowPlayingBanner />
            <p className='font-bold text-white text-3xl md:text-4xl lg:text-5xl mx-7 mt-14'>Trending</p>
            <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                {results.map((result) => result.backdrop_path && (
                    <Thumbnail key={result.id} result={result} />
                ))}
            </FlipMove>
        </div>
    );
}

export default HomeScreen;