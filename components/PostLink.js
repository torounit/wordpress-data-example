import Link from 'next/link';

function PostLink( { id, title: { rendered } } ) {
  return (
    <Link href={ `/posts/${id}` }><a>{ rendered }</a></Link>
  )
}

export default PostLink;
