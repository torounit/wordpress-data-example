import { useSelect } from '@wordpress/data';

function Post( { id } ) {

  const post = useSelect( ( select ) => {
    const { getPost } = select( 'my-store/posts' );
    if ( id ) {
      return getPost( id );
    }

    return null;

  }, [ id ] );

  return (
    <article>
      <h1>{ post?.title.rendered }</h1>
      <div
        dangerouslySetInnerHTML={
          { __html: post?.content.rendered }
        }
      />
    </article>
  );
}

export default Post;
