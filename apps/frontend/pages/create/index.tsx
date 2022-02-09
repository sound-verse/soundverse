import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { CreateForm } from '../../components/create/CreateForm'

export default function Create() {
  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="rounded-3xl bg-grey-dark max-w-3xl p-20 mx-auto mt-36 mb-36">
            <CreateForm />
          </div>
        </main>
      </Layout>
    </div>
  )
}
