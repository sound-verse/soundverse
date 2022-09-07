import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { CreateForm } from '../../components/create/CreateForm'
import { useAuthContext } from '../../context/AuthContext'

export default function Mint() {
  const { authUser } = useAuthContext()

  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          {(process.env.NEXT_PUBLIC_ENVIRONMENT !== 'main' && authUser) ||
          authUser?.verified ? (
            <CreateForm />
          ) : (
            <div className="flex items-center justify-center h-screen -mt-24 text-black text-1xl">
              {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'main'
                ? 'Connect your wallet to mint a NFT.'
                : 'Only verified users can mint on this page.'}
            </div>
          )}
        </main>
      </Layout>
    </div>
  )
}
