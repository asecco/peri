import { HomeIcon, MapIcon, CalendarIcon, VideoCameraIcon, FilmIcon, SearchIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PeriLogo from '../public/peri.png';
import HeaderItem from './HeaderItem';
import About from '../components/About';

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownOpen = () => setIsDropdownOpen(true);
    const handleDropdownClose = () => setIsDropdownOpen(false); 

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto mt-2">
                <div className='flex flex-grow max-w-2xl mt-2 md:mt-0'>
                    <Link href={`/`}><HeaderItem title='HOME' Icon={HomeIcon} /></Link>
                    <Link href={`/search`}><HeaderItem title='SEARCH' Icon={SearchIcon} /></Link>
                    <Link href={`/movies`}><HeaderItem title='MOVIES' Icon={FilmIcon} /></Link>
                    <Link href={`/tv`}><HeaderItem title='TV' Icon={VideoCameraIcon} /></Link>
                    <Link href={`/upcoming`}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></Link>
                    <div className='relative'>
                        <button onMouseEnter={handleDropdownOpen} onMouseLeave={handleDropdownClose} className="flex items-center focus:outline-none"><HeaderItem title='EXPLORE' Icon={MapIcon} /></button>
                        {isDropdownOpen && (
                            <div onMouseEnter={handleDropdownOpen} onMouseLeave={handleDropdownClose} className="absolute py-2 w-36 -mx-16 md:mx-0 bg-primary border-2 text-center rounded-lg shadow-lg z-50">
                                <Link href={`/favorites`}><p className="py-2 text-lg text-white hover:bg-red-400">Favorites</p></Link>
                                <Link href={`/recommended`}><p className="py-2 text-lg text-white hover:bg-red-400">Recommended</p></Link>
                                <Link href={`/collections`}><p className="py-2 text-lg text-white hover:bg-red-400">Collections</p></Link>
                            </div>
                        )}
                    </div>
                </div>
                <Image priority={true} className='object-contain' src={PeriLogo} alt='Peri' width={200} height={80} />
            </header>
            <About />
        </div>
    );
}

export default Header;