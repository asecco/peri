import {
    HomeIcon,
    BookmarkIcon,
    SearchIcon,
    CalendarIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import PeriLogo from '../public/peri.png';
import HeaderItem from './HeaderItem';
import {useRouter} from "next/router";

function Header() {
    const router = useRouter();
    const routePage = (page) => router.push(page);

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/Upcoming')}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></div>
                    <div onClick={() => routePage('/Favorites')}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>

            <div className="flex items-center max-w-sm mx-auto mb-5">
                <input type="text" onClick={() => routePage('/Search')} className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-1 focus:outline-red-400 text-black text-center" placeholder="Search..."></input>
                <SearchIcon onClick={() => routePage('/Search')} className='w-8 m-1 hover:cursor-pointer hover:text-red-400 active:text-red-500' />
            </div>
        </div>
    );
}

export default Header;