import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>Page not found</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="flex justify-center items-center h-screen -m-36">
            <div className="text-white text-3xl text-bold">
              Sorry, we couldnt find, what you were looking for :/
            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}