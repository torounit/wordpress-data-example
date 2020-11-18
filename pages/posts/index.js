import Head from 'next/head'
import Posts from '../../components/Posts/Posts';
export default function PostIndexPage() {
  return (
    <div>
      <Head>
        <title>Posts Example</title>
      </Head>
      <Posts />
    </div>
  )
}
