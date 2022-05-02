import { useLazyQuery, useSubscription } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GET_ROOM } from '../../common/graphql/queries/get-room.query'
import {
  GetRoomQuery,
  GetRoomQueryVariables,
  Room,
  RoomUpdatedSubscription,
  RoomUpdatedSubscriptionVariables,
} from '../../common/graphql/schema.d'
import Layout from '../../components/layout'
import { SoundverseRoom } from '../../components/Room/Room'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import Custom404 from '../404'
import { ROOM_UPDATED } from '../../common/graphql/subscriptions/room-updated.subscription'

export default function Soundverse() {
  const router = useRouter()
  const [room, setRoom] = useState<Room>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [
    getRoomQuery,
    { data: roomData, loading: roomDataLoading, called: roomQueryCalled },
  ] = useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(GET_ROOM)
  const { roomId } = router.query

  const {
    data: roomUpdatedData,
    error,
    variables,
    loading: rloading,
  } = useSubscription<
    RoomUpdatedSubscription,
    RoomUpdatedSubscriptionVariables
  >(ROOM_UPDATED, { variables: { roomId: roomId?.toString() ?? '' } })

  console.log(roomUpdatedData, error, variables, rloading)

  useEffect(() => {
    if (!roomId) {
      return
    }
    setLoading(true)
    getRoomQuery({ variables: { roomFilter: { id: roomId.toString() } } })
  }, [roomId])

  useEffect(() => {
    if (!roomData) {
      return
    }
    setRoom(roomData.room)
    setLoading(false)
  }, [roomData])

  Modal.setAppElement('#__next')

  if (!room && !roomDataLoading && roomId && roomQueryCalled) {
    return <Custom404 />
  }

  return (
    <div>
      <Head>
        <title>Soundverse </title>
      </Head>

      <Layout>{room && <SoundverseRoom room={room} />}</Layout>
      <Modal
        isOpen={loading}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10">
              Loading soundverse...
            </div>
            <Bars color="#7A64FF" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
