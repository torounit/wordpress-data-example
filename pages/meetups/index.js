import Head from 'next/head'
import Meetups from '../../components/Meetups/Meetups';

export default function MeetupIndex() {
  return (
    <div>
      <Head>
        <title>WP Meetups</title>
      </Head>
      <Meetups />
    </div>
  )
}
