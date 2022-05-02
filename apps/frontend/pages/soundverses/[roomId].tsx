import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'

export default function Room() {
  const router = useRouter()

  const { roomId } = router.query

  console.log(roomId)
  return (
    <div>
      <Head>
        <title>Soundverse </title>
      </Head>

      <Layout>Room</Layout>
    </div>
  )
}
