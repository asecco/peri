import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Peri</title>
        <meta name="description" content="Peri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Nav />
    </div>
  )
}
