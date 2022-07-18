import {
    ArrowCircleRightIcon,
    ArrowCircleLeftIcon,
} from '@heroicons/react/outline';
import HeaderItem from './HeaderItem';

function Footer() { 
    return (
        <div className='flex flex-row sm:flex-row justify-between items-center h-auto'>
            <HeaderItem title='Previous' Icon={ArrowCircleLeftIcon} />
            <HeaderItem title='Next' Icon={ArrowCircleRightIcon} />
        </div>
    );
}

export default Footer;