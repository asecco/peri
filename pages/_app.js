import '../styles/globals.css';
import '../styles/modal.css';
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    return (
        <>
            <Component {...pageProps} key={router.asPath} />
            <Analytics />
        </>
    );
}

export default MyApp
