import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'

export default function RoomClosed() {
  return (
    <div>
      <Head>
        <title>Soundverse Closed</title>
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
