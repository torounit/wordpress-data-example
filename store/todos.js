import { registerStore } from '@wordpress/data';

function uuid() {
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16);
        break;
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        break;
    }
  }
  return chars.join("");
}

/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} content
 * @property {string} status
 */

/**
 * @param content
 * @returns {Todo}
 */
function createNewTodo( content ) {
  return         {
    id: uuid(),
    content,
    status: 'new',
  }
}

/**
 * @type {{todos: Todo[]}}
 */
const DEFAULT_STATE = {
  todos: [],
};

/**
 *
 * @param {{todos: Todo[]}} state
 * @param {Object} action
 * @returns {{todos: Todo[]}}
 */
const reducer = ( state = DEFAULT_STATE, action ) => {
  switch ( action.type ) {
    case 'SET':
      return {
        ...state,
        todos: action.todos,
      };
    case 'APPEND':
      return {
        ...state,
        todos: action.todos.reduce( ( todos, newTodos ) => {
          if ( todos.some( ( { id } ) => id === newTodos.id ) ) {
            return todos;
          }
          return [ ...todos, newTodos ];
        }, state.todos ),
      };
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter( ( todo ) => todo.id !== action.id )
      }
    case 'UPDATE':
      return {
        ...state,
        todos: state.todos.map( todo =>
          ( todo.id === action.todo.id ) ? { ...todo, ...action.todo } : todo
        )
      }
    default:
      return state;
  }
};

const actions = {
  setTodos( todos ) {
    return {
      type: 'SET',
      todos,
    };
  },
  appendTodos( todos ) {
    return {
      type: 'APPEND',
      todos,
    };
  },
  addTodo( content ) {
    return {
      type: 'APPEND',
      todos: [
        createNewTodo( content )
      ],
    };
  },
  deleteTodo( id ) {
    return {
      type: 'DELETE',
      id,
    };
  },
  updateTodo( todo ) {
    return {
      type: 'UPDATE',
      todo,
    };
  }
};

const selectors = {
  getTodos( state ) {
    return state.todos;
  },
  getTodo( state, id ) {
    return state.todos.find( ( todo ) => todo.id === id );
  }
};


registerStore( 'my-store/todos', {
  reducer,
  actions,
  selectors,
} );
