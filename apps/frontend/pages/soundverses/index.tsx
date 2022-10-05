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
  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://app.soundverse.io' : 'https://testflight.soundverse.io';

  return (
    <div>
      <Head>
        <title>Soundverse</title>
        <meta name="description" content="Customized NFT communities to discover WEB3.0 art, music, and culture!" />
        <meta property="og:title" content="Soundverse" />
        <meta property="og:description" content="Customized NFT communities to discover WEB3.0 art, music, and culture!" />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/img/metadata/home.png`} />
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
