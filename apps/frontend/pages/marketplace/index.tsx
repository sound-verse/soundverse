import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/layout'
import {
  listDroppers as dataListDroppers,
  latestDrops as dataLatestDrops,
} from '../../model/data/testData'
import SoundCard from '../../components/marketplace/SoundCard'

export default function Landing() {
  const [listDroppers, setListDroppers] = useState([])
  const [latestDrops, setLatestDrops] = useState([])

  const MoreButton = () => {
    return (
      <button
        className="hover:bg-purple-700 w-32 h-8 text-white text-xs font-bold border border-white rounded-xl"
        onClick={async () => {}}
      >
        Load More
      </button>
    )
  }

  useEffect(() => {
    if (listDroppers.length === 0) {
      setListDroppers(dataListDroppers)
    }
    if (latestDrops.length === 0) {
      setLatestDrops(dataLatestDrops)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="">
      <Head>
        <title>Linifty App</title>
      </Head>

      <Layout>
        <div className="marketplace-wrapper">
          <div className="sale-button-wrapper">
            <nav className="flex space-x-1">
              <a href="#" className="sale-buttons">
                FOR SALE
              </a>
              <a href="#" className="sale-buttons">
                LATEST SALES
              </a>
              <a href="#" className="sale-buttons">
                TOP SALES
              </a>
            </nav>
          </div>

          <div className="topbar-wrapper">
            {/*SEARCHBAR WITH DROPDOWN COMPONENT WILL GO HERE*/}
            <input
              type="text"
              placeholder="Search by DJ, Event, Genre"
              className="marketplace-searchbar"
            />

            <div className="marketplace-spacer"></div>
            <div className="marketplace-spacer"></div>
            <span className="marketplace-icons-wrapper">
              <span className="marketplace-icon">
                <Image
                  src="/img/marketplace/dollarIcon.svg"
                  width={50}
                  height={50}
                  layout="fixed"
                />
              </span>
              <div className="marketplace-spacer"></div>
              <span className="marketplace-icon">
                <Image
                  src="/img/marketplace/ethIcon.svg"
                  width={50}
                  height={50}
                  layout="fixed"
                />
              </span>
              <div className="marketplace-spacer"></div>
              <span className="marketplace-icon">
                <Image
                  src="/img/marketplace/svjIcon.svg"
                  width={50}
                  height={50}
                  layout="fixed"
                />
              </span>
            </span>
          </div>

          <div className="row">
            {latestDrops.map((data, key) => (
              <div className="col-12-sm col-6-md col-4-lg col-3-xl">
                <div className="spacer">
                  <SoundCard data={data} key={key} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 mb-8 flex justify-center">
            <MoreButton />
          </div>
        </div>
      </Layout>
    </div>
  )
}
