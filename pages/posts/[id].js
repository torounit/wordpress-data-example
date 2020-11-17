import Head from 'next/head'
import Posts from '../../components/Posts';
import Post from '../../components/Post';
import { useRouter } from 'next/router';
export default function PostPage() {

  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>WP Next Sample</title>
      </Head>

      <Post id={id} />
    </div>
  )
}
