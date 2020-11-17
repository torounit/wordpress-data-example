import Head from 'next/head'
import Posts from '../../components/Posts';
export default function PostIndexPage() {
  return (
    <div>
      <Head>
        <title>WP Next Sample</title>
      </Head>
      <Posts />
    </div>
  )
}
