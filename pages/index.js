import Head from 'next/head'
import Posts from '../components/Posts';
import Meetups from '../components/Meetups';
import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <Head>
        <title>WP Next Sample</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/meetups">Meetups</Link>
    </div>
  )
}
