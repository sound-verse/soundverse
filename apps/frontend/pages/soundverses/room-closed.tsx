import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import {useRouter} from 'next/router';

export default function RoomClosed() {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://app.soundverse.io' : 'https://testflight.soundverse.io';
  
  return (
    <div>
      <Head>
        <title>Soundverse Room Closed</title>
        <meta name="description" content="This Soudverse Room was closed." />
        <meta property="og:title" content="Soundverse Room Closed" />
        <meta property="og:description" content="This Soudverse Room was closed" />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
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
