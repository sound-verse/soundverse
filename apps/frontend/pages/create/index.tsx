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
            <div className="rounded-2xl bg-grey-dark max-w-2xl p-16 mx-auto mt-28 mb-28">
              <CreateForm />
            </div>
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
