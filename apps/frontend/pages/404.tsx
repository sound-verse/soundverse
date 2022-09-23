import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Custom404() {

  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://main.soundverse.io' : 'https://testflight.soundverse.io';

  return (
    <div>
      <Head>
        <title>404 Page</title>
        <meta name="description" content="Seems like you got lost in the space. Get back to the Soundverse planet here!" />
        <meta property="og:title" content="Page not found" />
        <meta property="og:description" content="Seems like you got lost in the space. Get back to the Soundverse planet here!" />
        <meta property="og:url" content={`${baseUrl}/404`} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="flex justify-center items-center h-screen -m-36">
            <div className="text-white text-3xl text-bold">
              Sorry, we couldn't find what you were looking for :/
            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}
