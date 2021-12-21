import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import {
  listDroppers as dataListDroppers,
  latestDrops as dataLatestDrops,
} from '../../model/data/testData'
import DropItem from '../../components/landing/DropItem'
import SelectOption from '../../components/common/SelectOption'

export default function Landing() {
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
          <h2 className="text-white dark:text-white text-3xl font-bold mt-8 mb-4 leading-tight">
            MARKETPLACE
          </h2>

          <div className="hidden sm:flex items-center">
            <nav className="flex space-x-1">
              <a
                href="#"
                className="underline text-blue-700 px-3 py-1 font-bold text-sm rounded-full"
              >
                FOR SALE
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-darkGray-400 hover:text-gray-700 dark:hover:text-darkGray-300 px-3 py-1 text-sm rounded-full"
              >
                LATEST SALES
              </a>
              <a
                href="#"
                className="text-gray-500 dark:text-darkGray-400 hover:text-gray-700 dark:hover:text-darkGray-300 px-3 py-1 text-sm rounded-full"
              >
                TOP SALES
              </a>
            </nav>
          </div>

          <div className="mb-4 flex justify-between">
            <div>
              <input
                type="text"
                placeholder="Search by DJ, Event, Genre"
                className="w-72 appearance-none bg-gray-50 dark:bg-darkGray-800 block border border-gray-300 dark:border-darkGray-600 focus:ring-blue-500 focus:border-blue-500 rounded-md mt-2 px-2 py-2 focus:outline-none text-sm text-gray-700 dark:text-darkGray-100 focus:bg-white dark:focus:bg-darkGray-900 placeholder-gray-300 dark:placeholder-darkGray-600"
              />
            </div>

            <div className="flex">
              <SelectOption title="Filter" options={filters} />

              <div className="text-white leading-10 ml-3 mr-3">Sort By</div>

              <SelectOption title="Sorting" options={sorting} />
            </div>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {latestDrops.map((data, key) => (
                <DropItem data={data} key={key} />
              ))}
            </div>
          </div>

          <div className="mt-4 mb-8 flex justify-center">
            <MoreButton />
          </div>
        </main>
      </Layout>

      <style jsx>{``}</style>
    </div>
  )
}
