import { useSelect } from '@wordpress/data';
import PostLink from './PostLink';

function SimplifyPosts() {
  const posts = useSelect( ( select ) => {
    const { getPosts } = select( 'my-store/posts' );
    return getPosts();
  }, [] );

  return (
    <ul>
      { posts.map( ( { id, title } ) => (
          <li key={ id }>
            <PostLink title={ title } id={ id } />
          </li>
        )
      ) }
    </ul>
  );
}

export default SimplifyPosts;
