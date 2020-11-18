import Head from 'next/head';
import { useSelect, useDispatch } from '@wordpress/data';
import { useRef, useState } from 'react';

function StatusControl( { value, onChange, none = false } ) {
  return (
    <select value={ value } onChange={ ( event ) => {
      onChange( event.target.value );
    } }>
      { none ? <option value="">{ none }</option> : null }
      <option value="new">New</option>
      <option value="completed">Completed</option>
    </select>
  );
}

function AddTodo() {
  const { addTodo } = useDispatch( 'my-store/todos' );
  const inputRef = useRef( null );
  return (
    <div>
      <form onSubmit={ e => {
        e.preventDefault();
        if ( !inputRef.current.value.trim() ) {
          return;
        }
        addTodo( inputRef.current.value );
        inputRef.current.value = '';
      } }>
        <input ref={ inputRef } />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
}

function TodoList({ todos }) {
  const { updateTodo } = useDispatch( 'my-store/todos' );

  return (
    <ul>
      { todos.map( ( { id, content, status } ) => (
          <li key={ id }>
            <div style={{
              margin: '5px 0',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              { content }
              <StatusControl
                value={ status }
                onChange={ ( value ) => {
                  updateTodo( {
                    id,
                    status: value
                  } );
                }
                } />
            </div>

          </li>
        )
      ) }
    </ul>
  )
}

function Todos() {
  /**
   * @type {Todo[]}
   */
  const todos = useSelect( ( select ) => {
    const { getTodos } = select( 'my-store/todos' );
    return getTodos() || [];
  }, [] );

  const [ filter, setFilter ] = useState('');

  const filtered = todos.filter( (todo) => ! filter || filter === todo.status )

  return (
    <div>
      Filter: <StatusControl value={ filter } onChange={ setFilter } none="Show All" />
      <TodoList todos={filtered} />
    </div>
);

}

export default function TodosPage() {

  return (
    <div>
      <Head>
        <title>WP Next Sample</title>
      </Head>
      <AddTodo />
      <Todos />
    </div>
  );
}
