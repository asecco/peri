import { HomeIcon, CalendarIcon, VideoCameraIcon, FilmIcon, SearchIcon, HeartIcon, ThumbUpIcon, CollectionIcon, MenuIcon } from '@heroicons/react/outline';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PeriLogo from '../../public/peri.png';
import HeaderItem from './HeaderItem';
import About from './About';

function Header() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        window.innerWidth <= 767 ? setIsMobile(true) : setIsMobile(false);
    }, []);

    return (
        <div>
            <About />
            {!isMobile ? (
                <header className="flex flex-col sm:flex-row mb-2 justify-between items-center h-auto mt-2">
                    <div className='flex flex-grow max-w-full mt-2 md:mt-0'>
                        <Link href={`/`}><HeaderItem title='HOME' Icon={HomeIcon} /></Link>
                        <Link href={`/search`}><HeaderItem title='SEARCH' Icon={SearchIcon} /></Link>
                        <Link href={`/movies`}><HeaderItem title='MOVIES' Icon={FilmIcon} /></Link>
                        <Link href={`/tv`}><HeaderItem title='TV' Icon={VideoCameraIcon} /></Link>
                        <Link href={`/upcoming`}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></Link>
                        <Link href={`/favorites`}><HeaderItem title='FAVORITES' Icon={HeartIcon} /></Link>
                        <Link href={`/recommended`}><HeaderItem title='RECOMMENDED' Icon={ThumbUpIcon} /></Link>
                        <Link href={`/collections`}><HeaderItem title='COLLECTIONS' Icon={CollectionIcon} /></Link>
                    </div>
                    <Image priority={true} src={PeriLogo} alt='Peri' width={200} height={80} />
                </header>
            ) : (
                <header> {/* Mobile Header */}
                    <div onClick={() => setMobileMenu(!mobileMenu)} className="flex items-center justify-center mb-8">
                        <MenuIcon className="h-10 text-red-400" />
                        <h2 className="text-4xl font-bold text-red-400 items-center">Peri</h2>
                    </div>
                    {mobileMenu && (
                        <div className='h-full w-full fixed overflow-scroll scroll-gutter z-50 bg-primary'>
                            <div className="flex flex-col text-3xl font-bold gap-y-8 mx-4 animate-dropdown">
                                <Link href={`/`}>
                                    <div onClick={() => setMobileMenu(!mobileMenu)} className="flex items-center">
                                        <HomeIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>HOME</p>
                                    </div>
                                </Link>
                                <Link href={`/search`}>
                                    <div className="flex items-center">
                                        <SearchIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>SEARCH</p>
                                    </div>
                                </Link>
                                <Link href={`/movies`}>
                                    <div className="flex items-center">
                                        <FilmIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>MOVIES</p>
                                    </div>
                                </Link>
                                <Link href={`/tv`}>
                                    <div className="flex items-center">
                                        <VideoCameraIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>TV</p>
                                    </div>
                                </Link>
                                <Link href={`/upcoming`}>
                                    <div className="flex items-center">
                                        <CalendarIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>UPCOMING</p>
                                    </div>
                                </Link>
                                <Link href={`/favorites`}>
                                    <div className="flex items-center">
                                        <HeartIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>FAVORITES</p>
                                    </div>
                                </Link>
                                <Link href={`/recommended`}>
                                    <div className="flex items-center">
                                        <ThumbUpIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>RECOMMENDED</p>
                                    </div>
                                </Link>
                                <Link href={`/collections`}>
                                    <div className="flex items-center">
                                        <CollectionIcon className='h-10' />
                                        <p className='hover:text-red-400 ml-2'>COLLECTIONS</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </header>
            )}
        </div>
    );
}

export default Header;