import Head from 'next/head'
import Meetups from '../../components/Meetups';

export default function MeetupIndex() {
  return (
    <div>
      <Head>
        <title>WP Next Sample</title>
      </Head>
      <Meetups />
    </div>
  )
}
