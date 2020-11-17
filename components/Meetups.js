import { useSelect } from '@wordpress/data';
import { useState } from 'react';

function Meetups() {

  const [ country, setCountry ] = useState(null);

  const meetups = useSelect( ( select ) => {
    const { getMeetups } = select( 'my-store/meetups' );
    return getMeetups( country ) || [];
  }, [ country ] );


  return (
    <>
      <button onClick={ () => setCountry('JP') }>JP</button>
      <button onClick={ () => setCountry('US') }>US</button>
      <ul>
        { meetups.map( ( {  title }, i ) => (
            <li key={ i }>{ title }</li>
          )
        ) }
      </ul>
    </>
  );
}
export default Meetups;
