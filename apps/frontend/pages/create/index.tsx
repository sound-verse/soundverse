import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { CreateForm } from '../../components/create/CreateForm'
import { useLogin } from '../../hooks/useLogin'

export default function Create() {
  const { authenticated } = useLogin()

  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          {authenticated ? (
            <div className="rounded-3xl bg-grey-dark max-w-3xl p-20 mx-auto mt-36 mb-36">
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
