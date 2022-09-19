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
import { Bars } from 'react-loader-spinner'
import {useRouter} from 'next/router';

export default function Soudnverses() {
  const {
    data: roomsData,
    subscribeToMore,
    loading,
  } = useQuery<GetRoomsQuery, GetRoomsQueryVariables>(GET_ROOMS, {
    fetchPolicy: 'network-only',
  })

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
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Soundverses</title>
        <meta name="description" content="Short description of this page" />
        <meta property="og:title" content="Soundverses" />
        <meta property="og:description" content="Short description of this page" />
        <meta property="og:url" content={`https://soundverse.io${router.asPath}`} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        {loading ? (
          <div className="flex justify-center items-center">
            <Bars color="grey" />
          </div>
        ) : (
          <RoomList rooms={rooms} />
        )}
      </Layout>
    </div>
  )
}
