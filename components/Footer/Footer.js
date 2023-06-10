import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/outline';
import FooterItem from "./FooterItem";
import PaginationFooter from './PaginationFooter';
import { useRouter } from "next/router";

function Footer({ type, genre, page, totalPages}) {
    const router = useRouter();
    const pageRoute = (pageNumber) => {
        const newPage = Math.max(pageNumber, 1);
        router.push(`/${type}/${genre}/${newPage}`);
    }

    return (
        <div className='flex flex-row justify-center gap-x-2 py-10 md:py-0 items-center h-auto'>
            {type === 'upcoming' ? (
                <>
                    <div onClick={() => router.push(`/upcoming/${page - 1}`)}><FooterItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                    <PaginationFooter page={page} totalPages={totalPages} setPage={(pageNum) => router.push(`/upcoming/${pageNum}`)} />
                    <div onClick={() => router.push(`/upcoming/${page + 1}`)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
                </>
            ) : (
                <>
                    <div onClick={() => pageRoute(page - 1)}><FooterItem title='Previous' Icon={ArrowCircleLeftIcon} /></div>
                    <PaginationFooter page={page} totalPages={totalPages} setPage={pageRoute} />
                    <div onClick={() => pageRoute(page + 1)}><FooterItem title='Next' Icon={ArrowCircleRightIcon} /></div>
                </>
            )}
        </div>
    );
}

export default Footer;