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
          <div className="text-white text-2xl font-bold flex h-screen justify-center self-center items-center -mt-36">
            No rooms active yet, stay tuned!
          </div>
        )}
      </Layout>
    </div>
  )
}
