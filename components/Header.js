import {
    HomeIcon,
    TrendingUpIcon,
    BookmarkIcon,
    SearchIcon,
    UserIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import PeriLogo from '../public/peri.png';
import HeaderItem from './HeaderItem';

function Header() {
    return (
        <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
            <div className='flex flex-grow justify-evenly max-w-2xl'>
                <HeaderItem title='HOME' Icon={HomeIcon} />
                <HeaderItem title='TRENDING' Icon={TrendingUpIcon} />
                <HeaderItem title='LIBRARY' Icon={BookmarkIcon} />
                <HeaderItem title='SEARCH' Icon={SearchIcon} />
                <HeaderItem title='ACCOUNT' Icon={UserIcon} />
            </div>
            <Image className='object-contain' src={PeriLogo} width={250} height={100} />
        </header>
    )
}

export default Header;