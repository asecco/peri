import { HomeIcon, BookmarkIcon, CalendarIcon, ThumbUpIcon, VideoCameraIcon, FilmIcon, SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import PeriLogo from '../public/peri.png';
import HeaderItem from './HeaderItem';
import About from '../components/About';

function Header() {
    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto mt-2">
                <div className='flex flex-grow max-w-2xl mt-2 md:mt-0'>
                    <Link href={`/`}><HeaderItem title='HOME' Icon={HomeIcon} /></Link>
                    <Link href={`/search`}><HeaderItem title='SEARCH' Icon={SearchIcon} /></Link>
                    <Link href={`/movies`}><HeaderItem title='MOVIES' Icon={FilmIcon} /></Link>
                    <Link href={`/tv`}><HeaderItem title='TV' Icon={VideoCameraIcon} /></Link>
                    <Link href={`/upcoming`}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></Link>
                    <Link href={`/favorites`}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></Link>
                    <Link href={`/recommended`}><HeaderItem title='RECOMMENDED' Icon={ThumbUpIcon} /></Link>
                </div>
                <Image priority={true} className='object-contain' src={PeriLogo} alt='Peri' width={200} height={80} />
            </header>
            <About />
        </div>
    );
}

export default Header;