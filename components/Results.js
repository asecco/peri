import FlipMove from "react-flip-move";
import Thumbnail from "./Thumbnail";

function Results({ results }) {
    return (
        <div>
            <FlipMove className="px-5 my-10 sm:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
                {results?.map((result) => result !== undefined && result.poster_path && (
                <>
                    <Thumbnail result={result} />
                </>
                ))}
            </FlipMove>
        </div>
    );
}

export default Results;