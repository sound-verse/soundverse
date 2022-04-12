import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { CreateForm } from '../../components/create/CreateForm'
import { useAuthContext } from '../../context/AuthContext'

export default function Create() {
  const { authUser } = useAuthContext()

  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          {authUser ? (
            <CreateForm />
          ) : (
            <div className="flex items-center justify-center h-screen -mt-24 text-white text-2xl">
              Please connect your wallet to create NFTs
            </div>
          )}
        </main>
      </Layout>
    </div>
  )
}
