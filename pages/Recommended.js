import {
    HomeIcon,
    BookmarkIcon,
    CalendarIcon,
    ThumbUpIcon,
} from '@heroicons/react/outline';
import PeriLogo from '../public/peri.png';
import HeaderItem from "../components/HeaderItem";
import Image from "next/image";
import {useRouter} from "next/router";

function Recommended() { 
    const router = useRouter();
    const routePage = (page) => router.push(page);

    return (
        <div>
            <header className="flex flex-col sm:flex-row mb-5 justify-between items-center h-auto">
                <div className='flex flex-grow max-w-2xl'>
                    <div onClick={() => routePage('/')}><HeaderItem title='HOME' Icon={HomeIcon} /></div>
                    <div onClick={() => routePage('/Upcoming')}><HeaderItem title='UPCOMING' Icon={CalendarIcon} /></div>
                    <div onClick={() => routePage('/Favorites')}><HeaderItem title='FAVORITES' Icon={BookmarkIcon} /></div>
                    <div onClick={() => routePage('/Recommended')}><HeaderItem title='RECOMMENDED' Icon={ThumbUpIcon} /></div>
                </div>
                <Image className='object-contain' src={PeriLogo} alt='Peri' width={250} height={100} />
            </header>
            <p className='font-bold md:text-5xl lg:text-6xl text-left mx-6 text-red-white'>You May Like</p>
        </div>
    );
}

export default Recommended;