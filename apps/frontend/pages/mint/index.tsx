import React from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { CreateForm } from '../../components/create/CreateForm'
import { useAuthContext } from '../../context/AuthContext'
import {useRouter} from 'next/router';

export default function Mint() {
  const { authUser } = useAuthContext()
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://main.soundverse.io' : 'https://testflight.soundverse.io';

  return (
    <div>
      <Head>
        <title>Mint on Soundverse</title>
        <meta name="description" content="Use our protocol to get Master and License NFTs for every song you mint!" />
        <meta property="og:title" content="Mint on Soundverse" />
        <meta property="og:description" content="Use our protocol to get Master and License NFTs for every song you mint!" />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/img/metadata/mint.png`} />
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
