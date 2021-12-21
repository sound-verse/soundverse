import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import gql from 'graphql-tag'
import {
  listDroppers as dataListDrops,
  latestDrops as dataLatestDrops,
} from '../../model/data/testData'
import TopDropperItem from '../../components/landing/TopDropperItem'
import SquarePic from '../../components/common/squarepic'
import HexImage from '../../components/collection/HexImage'

export default function PostCreate() {
  const [listDrop, setListDrop] = useState<{ pic: string; name: string }>()
  const [latestDrops, setLatestDrops] = useState([])

  // const GET_NFT = gql`
  // query nft($name:name) {
  //   nfts() {
  //     tokenId
  //     ipfsUrl
  //     fileUrl
  //   }
  // }
  // `

  useEffect(() => {
    if (listDrop) {
      setListDrop(dataListDrops[1])
    }
    if (latestDrops.length === 0) {
      setLatestDrops(dataLatestDrops.slice(0, 3))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <Head>
        <title>Create Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto ">
          <div className="flex flex-col-3 my-20  justify-between ">
            <div className="border-white   p-0 flex-1 flex-col  inline-block">
              {latestDrops.map((data, key) => (
                <SquarePic data={data} key={key} />
              ))}
            </div>
            <div className="border-white m-4 pr-32 flex-1  w-full h-full">
              <HexImage src="https://api.lorem.space/image/album?w=150&h=150&hash=A89D0DE6" />
            </div>
            <div className="flex-1 flex-col border-white ">
              <div className="border-white border-b-2 ">
                <h3>Dixon</h3>
                <h2>Date</h2>
                <h1>Dropper</h1>
                <h1>1/10</h1>
              </div>
              <div className="flex flex-col justify-between mb-12 pb-4 mt-2 h-4/6">
                <h2>
                  Low Ask Price <sup> USD </sup>
                </h2>
                <h1>Lowest Ask</h1>

                <h2>
                  Top Price <sup> USD </sup>
                </h2>
                <h1>Top Price</h1>
                <div>
                  <button className=" border rounded-full bg-purple-900 w-full">
                    {' '}
                    Share
                  </button>
                </div>
                <div>
                  <button className=" border rounded-full bg-gray-500 w-full">
                    {' '}
                    Place for Sale
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-10">
            <div className="bottomButton">COLLECTABLE DETAILS</div>
            <div className="bottomButton">TRACK STATS</div>
            <div className="bottomButton">ARTISTS STATS</div>
            <div className="bottomButton">RECENT SALES HISTORY </div>
          </div>
        </main>
      </Layout>

      <style jsx>{`
        div {
          color: #fff;
        }

        h3 {
          color: #ede7f6;
        }

        .chooseBtn {
          background: #6200ea;
        }
        .createBtn {
          background: #6200ea;
        }
        .bottomButton {
          height: 2.5rem;
          width: 75%;
          --tw-bg-opacity: 1;
          background-color: rgba(107, 114, 128, var(--tw-bg-opacity));
          border-radius: 4rem;
          text-align: center;
          margin: 0.4rem;
        }
      `}</style>
    </div>
  )
}
