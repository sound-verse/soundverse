import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import {
  listDroppers as dataListDroppers,
  latestDrops as dataLatestDrops,
} from '../../model/data/testData'
import DropItem from '../../components/landing/DropItem'
import HexImage from '../../components/collection/HexImage'

export default function Profile() {
  const [listDroppers, setListDroppers] = useState([])
  const [latestDrops, setLatestDrops] = useState([])

  const [filters, setFilters] = useState(['filter1', 'filter2'])
  const [sorting, setSorting] = useState([
    'Listing Date (newest)',
    'Price (highest)',
  ])

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
    <div className="container">
      <Head>
        <title>Linifty App</title>
      </Head>

      <Layout>
        <main>
          <div className="flex flex-col m-4  ">
            <div className="flex flex-row">
              <div className=" inline-grid gap-3 grid-cols-2 grid-rows-2 w-2/4 justify-center border-2 border-white">
                <HexImage
                  type1="sm1"
                  type="sm"
                  src="https://api.lorem.space/image/album?w=150&h=150&hash=500B67FB"
                ></HexImage>
                <div></div>
                <div>
                  <button className="h-1/6 border-2 border-gray-300 bg-gray-700 rounded-lg">
                    address
                  </button>
                  <h4 className="text-white text-xs mx-12"> dec 9, 2018</h4>

                  <h4
                    className="text-white text-xs bold mx-12
                "
                  >
                    {' '}
                    profile status
                  </h4>
                </div>
              </div>
              <div className=" w-3/4 inline-grid gap-4 grid-cols-3 grid-rows-3">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                  <button className=" h-2/6 w-full text-white border-2 border-purple-300 bg-white-700 rounded-xl">
                    Edit profile
                  </button>
                  <button className="text-white text-xs underline italic">
                    Do you want a dj profile?
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap flex-row border-t-2 border-gray-700">
              <h1 className="text-purple-500 text-2xl mx-12 my-6">
                Collections{' '}
              </h1>
              <div className="w-full"></div>
              <div className="p-2">
                <HexImage
                  type1="sm1"
                  type="sm"
                  src="https://api.lorem.space/image/album?w=150&h=150&hash=500B67FB"
                ></HexImage>
                <span className="text-white text-xs"> stuff stuff</span>
              </div>
              <div className="p-2 ">
                <HexImage
                  type1="sm1"
                  type="sm"
                  src="https://api.lorem.space/image/album?w=150&h=150&hash=500B67FB"
                ></HexImage>
                <span className="text-white text-right text-xs">
                  {' '}
                  stuff stuff
                </span>
              </div>
              <div className="p-2">
                <HexImage
                  type1="sm1"
                  type="sm"
                  src="https://api.lorem.space/image/album?w=150&h=150&hash=500B67FB"
                ></HexImage>
                <span className="text-white text-xs"> stuff stuff</span>
              </div>
            </div>
          </div>
        </main>
      </Layout>

      <style jsx>{``}</style>
    </div>
  )
}
