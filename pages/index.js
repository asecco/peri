import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Peri</title>
        <meta name="description" content="Peri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
    </div>
  )
}
