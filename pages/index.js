import Head from 'next/head'
import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <Head>
        <title>WP Next Example</title>
      </Head>

      <h1>Examples</h1>
      <ul>
        <li><Link href="/todos"><a>Todos</a></Link></li>
        <li><Link href="/posts"><a>Posts</a></Link></li>
        <li><Link href="/meetups"><a>Meetups</a></Link></li>
      </ul>

    </div>
  )
}
