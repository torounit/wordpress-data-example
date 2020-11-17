import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import PostLink from './PostLink';

function Posts() {

  const { setPosts } = useDispatch( 'my-store/posts' );

  const fetchPosts = async () => {
    const response = await apiFetch( { path: '/wp/v2/posts?per_page=-1' } );
    setPosts( response );
  };

  useEffect( () => {
    fetchPosts();
  }, [] );

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

export default Posts;
