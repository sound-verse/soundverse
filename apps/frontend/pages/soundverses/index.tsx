import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { GET_ROOMS } from '../../common/graphql/queries/get-rooms.query'
import { useQuery } from '@apollo/client'
import {
  GetRoomsQuery,
  GetRoomsQueryVariables,
} from '../../common/graphql/schema'
import { RoomList } from '../../components/Room/RoomList'

export default function Soudnverses() {
  const { data: roomsData } = useQuery<GetRoomsQuery, GetRoomsQueryVariables>(
    GET_ROOMS
  )

  const rooms = roomsData?.rooms?.rooms ?? []
  return (
    <div>
      <Head>
        <title>Soundverses</title>
      </Head>

      <Layout>
        {rooms.length ? (
          <RoomList rooms={rooms} />
        ) : (
          <div className="flex items-center justify-center h-screen -mt-24 text-white text-1xl">
            No rooms active yet, stay tuned !
          </div>
        )}
      </Layout>
    </div>
  )
}
