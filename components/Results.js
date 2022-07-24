import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";

function Results({results}) {
  return (
    <div>
        <FlipMove className="px-5 my-10 sm:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
        {results.map((result) => (
            <Thumbnail key={result.id} result={result} />
        ))}
        </FlipMove>
    </div>
  );
}

export default Results;