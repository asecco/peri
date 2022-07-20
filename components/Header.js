import {
    HomeIcon,
    BookmarkIcon,
    FilmIcon,
    VideoCameraIcon,
    SearchIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import PeriLogo from '../public/peri.png';
import HeaderItem from './HeaderItem';

function Header() {
    const searchPage = () => {
        window.location.href = '/SearchResults';
    }
    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl'>
                    <a href='/'><HeaderItem title='HOME' Icon={HomeIcon} /></a>
                    <a href='/'><HeaderItem title='FILMS' Icon={FilmIcon} /></a>
                    <a href='/'><HeaderItem title='SERIES' Icon={VideoCameraIcon} /></a>
                    <a href='/'><HeaderItem title='LIBRARY' Icon={BookmarkIcon} /></a>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>

            <div className="flex items-center max-w-sm mx-auto mb-5">
                <input type="text" onClick={searchPage} className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center" placeholder="Search..."></input>
                <SearchIcon onClick={searchPage} className='w-8 m-1 hover:cursor-pointer hover:text-red-400 active:text-red-500' />
            </div>
        </div>
    );
}

export default Header;