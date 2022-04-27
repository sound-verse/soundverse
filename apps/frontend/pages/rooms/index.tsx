import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { GET_ROOMS } from '../../common/graphql/queries/get-rooms'
import { useQuery } from '@apollo/client'
import {
  GetRoomsQuery,
  GetRoomsQueryVariables,
} from '../../common/graphql/schema'

export default function Rooms() {
  const { data: roomsData } = useQuery<GetRoomsQuery, GetRoomsQueryVariables>(
    GET_ROOMS
  )

  console.log(roomsData)
  return (
    <div>
      <Head>
        <title>Soundverses</title>
      </Head>

      <Layout>Rooms</Layout>
    </div>
  )
}
