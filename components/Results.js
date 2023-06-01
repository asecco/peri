import FlipMove from "react-flip-move";
import Thumbnail from "./Thumbnail";

function Results({ results }) {
    return (
        <div>
            <FlipMove className="px-5 my-10 ml-6 sm:ml-2 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6">
                {results?.map((result) => result !== undefined && result.poster_path && (
                    <Thumbnail key={result.id} result={result} />
                ))}
            </FlipMove>
        </div>
    );
}

export default Results;