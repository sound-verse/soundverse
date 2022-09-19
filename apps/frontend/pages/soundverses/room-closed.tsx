import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import {useRouter} from 'next/router';

export default function RoomClosed() {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Soundverse Closed</title>
        <meta name="description" content="The Soudverse was closed." />
        <meta property="og:title" content="Soundverse Closed" />
        <meta property="og:description" content="The Soudverse was closed" />
        <meta property="og:url" content={`https://soundverse.io${router.asPath}`} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="flex justify-center items-center h-screen -m-36">
            <div className="text-white text-3xl text-bold">
              The Soudverse was closed.
            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}
