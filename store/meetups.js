import { registerStore } from '@wordpress/data';

const DEFAULT_STATE = {
  meetups: [],
};

const reducer = ( state = DEFAULT_STATE, action ) => {
  switch ( action.type ) {
    case 'APPEND_MEETUPS':
      return {
        ...state,
        meetups: action.meetups.reduce( ( meetups, newMeetup ) => {
          if ( meetups.some( ( { url } ) => url === newMeetup.uri ) ) {
            return meetups;
          }
          return [ ...meetups, newMeetup ]
        }, state.meetups ),
      };
    default:
      return state;
  }
};

const actions = {

  appendMeetups( meetups ) {
    return {
      type: 'APPEND_MEETUPS',
      meetups,
    };
  },

  * fetchMeetups( country ) {

    if ( ! country ) {
      return;
    }

    const meetups = yield {
      type: 'FETCH',
      request: {
        url: `https://api.wordpress.org/events/1.0/?country=${ country }&number=100`,
        options: {
          method: 'GET',
        }
      }
    };

    console.log(meetups);

    return actions.appendMeetups( meetups?.events );
  },

};

const selectors = {
  getMeetups( state, country ) {
    return state.meetups.filter(({ location }) => location?.country === country );
  }
};

const resolvers = {
  * getMeetups( country ) {
    yield actions.fetchMeetups( country );
  }
};

registerStore( 'my-store/meetups', {
  reducer,
  actions,
  selectors,
  controls: {
    async FETCH( { request } ) {
      const response = await fetch( request.url, request.options );
      const data = response.json()
      return data;
    },
  },
  resolvers,
} );
