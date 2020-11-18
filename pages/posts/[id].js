import Head from 'next/head'
import Article from '../../components/Posts/Article';
import { useRouter } from 'next/router';
import { useSelect } from '@wordpress/data';
export default function PostPage() {

  const router = useRouter()
  const { id } = router.query;

  const post = useSelect( ( select ) => {
    const { getPost } = select( 'my-store/posts' );
    if ( id ) {
      return getPost( id );
    }

    return null;

  }, [ id ] );

  return (
    <div>
      <Head>
        <title>{post?.title.rendered} Post Example</title>
      </Head>

      <Article id={id} />
    </div>
  )
}
