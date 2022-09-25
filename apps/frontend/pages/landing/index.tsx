import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import TopDropperItem from '../../components/landing/TopDropperItem'
import DropItem from '../../components/landing/DropItem'
import JoinDiscord from '../../components/landing/JoinDiscord'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import {useRouter} from 'next/router';

export default function Landing() {
  const [listDroppers, setListDroppers] = useState([])
  const [latestDrops, setLatestDrops] = useState([])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://app.soundverse.io' : 'https://testflight.soundverse.io';

  return (
    <div>
      <Head>
        <title>Linifty App</title>
        <meta name="description" content="Short description of this page" />
        <meta property="og:title" content="Linifty App" />
        <meta property="og:description" content="Short description of this page" />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        <main>
          <div className="mt-5 mb-4 w-1/2 h-60 m-auto bg-gray-500"></div>

          <h2 className="text-white dark:text-white text-lg font-bold mb-4 leading-tight">
            Top Droppers
          </h2>

          <div className="mb-4">
            <div className="flex items-center justify-center	">
              <AiOutlineLeft className="text-white" />
              {listDroppers.map((element, key) => (
                <div className="m-4" key={key}>
                  <TopDropperItem src="https://api.lorem.space/image/album?w=150&h=150&hash=2D297A22" />
                </div>
              ))}
              <AiOutlineRight className="text-white" />
            </div>
          </div>

          <h2 className="text-white dark:text-white text-lg font-bold mb-4 leading-tight">
            LATEST DROPS
          </h2>

          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {latestDrops.map((data, key) => (
                <DropItem data={data} key={key} />
              ))}
            </div>
          </div>

          <h2 className="text-white dark:text-white text-lg font-bold mb-4 leading-tight">
            JOIN LINIFTY COMMUNITY
          </h2>

          <div className="mb-4 h-64 bg-gray-500">
            <div className="absolute bottom-30 right-20">
              <JoinDiscord />
            </div>
          </div>
        </main>
      </Layout>

      <style jsx>{''}</style>
    </div>
  )
}
