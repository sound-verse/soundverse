import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/layout'
import SidebarFilters from '../../components/marketplace/SidebarFilters'
import Drops from '../../components/marketplace/Drops'
import MarketplaceSearchBar from '../../components/marketplace/MarketplaceSearchBar'
import {
  latestDrops as dataLatestDrops,
  DropItem,
} from '../../model/data/testData'
import SoundCard from '../../components/marketplace/SoundCard'
import { gql, useQuery } from '@apollo/client'

const GET_NFTS = gql`
  query getNfts {
    nfts {
      tokenId
      contractAddress
      fileUrl
      filePictureUrl
      ipfsUrl
      transactionHash
      metadata {
        name
        description
      }
      creator {
        id
        name
        ethAddress
        profileImage
      }
      owners {
        ethAddress
        supply
      }
    }
  }
`

export default function Landing() {
  const [input, setInput] = useState('')
  const [dropListDefault, setDropListDefault] = useState<
    DropItem[] | undefined
  >()
  const [dropList, setDropList] = useState<DropItem[] | undefined>()
  const { loading, error, data } = useQuery(GET_NFTS)

  const [latestDrops, setLatestDrops] = useState([])

  const nfts = loading ? [] : data.nfts

  useEffect(() => {
    if (latestDrops.length === 0) {
      setDropListDefault(dataLatestDrops)
    }
    if (latestDrops.length === 0) {
      setDropList(dataLatestDrops)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const updateInput = async (input) => {
    const filtered = dropListDefault.filter((drop) => {
      return drop.name.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input)
    setDropList(filtered)
  }

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

  return (
    <div className="">
      <Head>
        <title>Soundverse App</title>
      </Head>

      <Layout>
        <div className="big-wrapper">
          <SidebarFilters />

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
              <MarketplaceSearchBar input={input} onChange={updateInput} />

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
              {nfts.map((data, key) => {
                if (!data.filePictureUrl) {
                  return
                }

                return (
                  <div
                    className="col-12-sm col-6-md col-4-lg col-3-xl"
                    key={`soundcard-wrapper-${key}`}
                  >
                    <div className="spacer">
                      <SoundCard
                        data={{
                          pic: data.filePictureUrl,
                          name: data.metadata.name,
                          rarity: 1,
                        }}
                        key={key}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 mb-8 flex justify-center">
              <MoreButton />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
