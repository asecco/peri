import requests from "../utils/requests";
import {useRouter} from "next/router";

function NavBar() { 
    const router = useRouter();

    return (
        <nav className="relative">
            <div className="flex px-10 p-2 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide">
                {Object.entries(requests).map(([key, {title}]) => (
                    <h2 key={key} onClick={() => router.push(`/?genre=${key}`)} className="last:pr-10 cursor-pointer transition duration-100 transform hover:scale-125 text-white hover:text-red-400 active:text-red-500">{title}</h2>
                ))}
            </div>
            <div className="absolute top-0 right-0 bg-gradient-to-l from-[#202F3B] h-10 w-1/12" />
        </nav>
    );
}

export default NavBar;