import Thumbnail from "./Thumbnail";

function Results({ results }) {
    return (
        <div>
            <div className="px-5 my-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6">
                {results?.map((result) => result !== undefined && (
                    <Thumbnail key={result.id} result={result} />
                ))}
            </div>
        </div>
    );
}

export default Results;