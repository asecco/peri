import {SearchIcon} from '@heroicons/react/outline';
import {useRouter} from "next/router";

function SearchBar() {
    const router = useRouter();
    const routePage = (page) => router.push(page);

    return (
        <div className="flex items-center max-w-sm mx-auto mb-5">
            <input type="text" onClick={() => routePage('/search')} className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center ml-10 md:ml-0" placeholder="Search..."></input>
            <SearchIcon onClick={() => routePage('/search')} className='w-8 m-1 hover:cursor-pointer text-white hover:text-red-400 active:text-red-500 invisible md:visible' />
        </div>
    );
}

export default SearchBar;