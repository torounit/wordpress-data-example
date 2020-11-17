import { registerStore } from '@wordpress/data';
import { apiFetch as apiFetchAction, controls } from '@wordpress/data-controls';
import apiFetch from '@wordpress/api-fetch';

apiFetch.use( apiFetch.createRootURLMiddleware( 'https://torounit.com/wp-json/' ) );

const DEFAULT_STATE = {
  posts: [],
};

const reducer = ( state = DEFAULT_STATE, action ) => {
  switch ( action.type ) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.posts,
      };
    case 'APPEND_POSTS':
      return {
        ...state,
        posts: action.posts.reduce( ( posts, newPosts ) => {
          if ( posts.some( ( { id } ) => id === newPosts.id ) ) {
            return posts;
          }
          return [ ...posts, newPosts ];
        }, state.posts ),
      };
    default:
      return state;
  }
};

const actions = {

  setPosts( posts ) {
    return {
      type: 'SET_POSTS',
      posts,
    };
  },

  appendPosts( posts ) {
    return {
      type: 'APPEND_POSTS',
      posts,
    };
  },

  * fetchPosts() {

    const posts = yield {
      type: 'API_FETCH',
      request: {
        path: `/wp/v2/posts?per_page=-1`,
      }
    };

    // const posts = yield apiFetchAction( {
    // 	path: `/wp/v2/posts?per_page=-1`,
    // } );

    return actions.setPosts( posts );
  },

  * fetchPost( id ) {

    const post = yield {
      type: 'API_FETCH',
      request: {
        path: `/wp/v2/posts/${ id }`,
      }
    };

    // const post = yield apiFetchAction( {
    // 	path: `/wp/v2/posts/${id}`,
    // } );

    return actions.appendPosts( [ post ] );
  },

};

const selectors = {
  getPosts( state ) {
    return state.posts;
  },
  getPost( state, id ) {
    return state.posts.find( ( post ) => post.id === parseInt( id, 10 ) );
  }
};

const resolvers = {
  * getPosts() {
    yield actions.fetchPosts();
  },
  * getPost( id ) {
    yield actions.fetchPost( id );
  }
};

registerStore( 'my-store/posts', {
  reducer,
  actions,
  selectors,
  controls: {
    API_FETCH( { request } ) {
      return apiFetch( request );
    },
  },
  //controls, // from '@wordpress/data-controls'
  resolvers,
} );
