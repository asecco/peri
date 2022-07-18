import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";
import Footer from "./Footer";

function Results({results}) {
  return (
    <div>
        <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8">
        {results.map((result) => (
            <Thumbnail key={result.id} result={result} />
        ))}
        </FlipMove>
        
        <Footer />
    </div>
  );
}

export default Results;