import { HomeIcon, BookmarkIcon, CalendarIcon, ThumbUpIcon, VideoCameraIcon, FilmIcon, SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import PeriLogo from '../public/peri.png';
import HeaderItem from './HeaderItem';
import About from '../components/About';

function Header() {
    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto mt-2">
                <div className='flex flex-grow max-w-2xl mt-2 md:mt-0'>
                    <a href={`/`} rel="noopener noreferrer"><HeaderItem title='HOME' Icon={HomeIcon} /></a>
                    <a href={`/search`} rel="noopener noreferrer"><HeaderItem title='SEARCH' Icon={SearchIcon} /></a>
                    <a href={`/movies`} rel="noopener noreferrer"><HeaderItem title='MOVIES' Icon={FilmIcon} /></a>
                    <a href={`/tv`} rel="noopener noreferrer"><HeaderItem title='TV' Icon={VideoCameraIcon} /></a>
                    <a href={`/upcoming`} rel="noopener noreferrer"><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></a>
                    <a href={`/favorites`} rel="noopener noreferrer"><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></a>
                    <a href={`/recommended`} rel="noopener noreferrer"><HeaderItem title='RECOMMENDED' Icon={ThumbUpIcon} /></a>
                </div>
                <Image priority={true} className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>
            <About />
        </div>
    );
}

export default Header;