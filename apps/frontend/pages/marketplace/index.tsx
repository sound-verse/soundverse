import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/layout'
import SidebarFilters from '../../components/marketplace/SidebarFilters'
import MarketplaceSearchBar from '../../components/marketplace/MarketplaceSearchBar'
import {
  latestDrops as dataLatestDrops,
  DropItem,
} from '../../model/data/testData'
import SoundCard from '../../components/marketplace/SoundCard'
import { gql, useQuery } from '@apollo/client'

export const GET_NFTS = gql`
  query getNfts($filter: NftsFilter) {
    nfts(filter: $filter) {
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

  const nfts = loading ? [] : data?.nfts ? data.nfts : []

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
          <div className="marketplace-wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
              {nfts.map((data, key) => {
                if (!data.filePictureUrl) {
                  return
                }

                return (
                  <div key={`soundcard-wrapper-${key}`}>
                    <div className="spacer">
                      <SoundCard
                        soundCard={{
                          pictureUrl: data.filePictureUrl,
                          name: data.metadata.name,
                          creatorName: data.creator.name,
                          creatorEthAddress: data.creator.ethAddress,
                          licences: data.supply,
                          musicUrl: data.fileUrl,
                          contractAddress: data.contractAddress,
                          tokenId: data.tokenId,
                        }}
                        key={key}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-10 mb-8 flex justify-center">
              <MoreButton />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}
