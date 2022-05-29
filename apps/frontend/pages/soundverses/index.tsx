import React, { useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { GET_ROOMS } from '../../common/graphql/queries/get-rooms.query'
import { useQuery } from '@apollo/client'
import {
  GetRoomsQuery,
  GetRoomsQueryVariables,
  RoomsUpdatedSubscription,
  RoomsUpdatedSubscriptionVariables,
} from '../../common/graphql/schema'
import { RoomList } from '../../components/Room/RoomList'
import { ROOMS_UPDATED } from '../../common/graphql/subscriptions/rooms-updated.subscription'

export default function Soudnverses() {
  const { data: roomsData, subscribeToMore } = useQuery<
    GetRoomsQuery,
    GetRoomsQueryVariables
  >(GET_ROOMS, { fetchPolicy: 'network-only' })

  useEffect(() => {
    subscribeToMore({
      document: ROOMS_UPDATED,
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (subscriptionData.data.roomsUpdated) {
          return { rooms: { rooms: subscriptionData.data.roomsUpdated } }
        }
        return prev
      },
    })
  }, [])

  const rooms = roomsData?.rooms?.rooms ?? []
  return (
    <div>
      <Head>
        <title>Soundverses</title>
      </Head>

      <Layout>
        <RoomList rooms={rooms} />
      </Layout>
    </div>
  )
}
