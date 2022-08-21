import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import SoundCard from '../../components/marketplace/SoundCard'
import { useLazyQuery } from '@apollo/client'
import {
  GetNftsQuery,
  GetNftsQueryVariables,
  Nft,
  NftType,
  SortOption,
} from '../../common/graphql/schema.d'
import { GET_NFTS } from '../../common/graphql/queries/get-nfts.query'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { Bars } from 'react-loader-spinner'
import Image from 'next/image'

const LIMIT = 10
const SKIP = 10

export default function Marketplace() {
  //TODO: load nfts with hasSellings filter!
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Newest)
  const [showSort, setShowSort] = useState(false)

  let sortByString = ''
  switch (sortBy) {
    case SortOption.Oldest: {
      sortByString = 'Oldest'
      break
    }
    case SortOption.Name: {
      sortByString = 'Name'
      break
    }
    default: {
      sortByString = 'Newest'
      break
    }
  }

  const [currentSkip, setCurrentSkip] = useState(0)
  const [getNFTs, { loading, data }] = useLazyQuery<
    GetNftsQuery,
    GetNftsQueryVariables
  >(GET_NFTS, {
    variables: { limit: LIMIT, skip: 0 },
  })

  const [playingCardId, setPlayingCardId] = useState<string>('')
  const [allNfts, setAllNfts] = useState<Nft[]>([])

  const handleMusicClick = (activeCardId: string) => {
    setPlayingCardId(activeCardId)
  }

  useEffect(() => {
    getNFTs({
      variables: {
        limit: LIMIT,
        skip: currentSkip,
        filter: { sortOption: sortBy },
      },
    })
  }, [currentSkip, sortBy])

  useEffect(() => {
    if (!data) {
      return
    }
    setAllNfts([...allNfts, ...data.nfts])
  }, [data])

  const handleSortClick = (sortOption: SortOption) => {
    if (sortBy === sortOption) {
      setShowSort(false)
      return
    }
    setSortBy(sortOption)
    setShowSort(false)
    setAllNfts([])
    setCurrentSkip(SKIP)
  }

  useBottomScrollListener(() => {
    setCurrentSkip(currentSkip + SKIP)
  })
  return (
    <div className="">
      <Head>
        <title>Soundverse App</title>
      </Head>

      <Layout>
        <div className="big-wrapper">
          <div className="marketplace-wrapper w-full">
            <div
              className="cursor-pointer mb-5 select-none text-sm flex flex-start w-full"
              onClick={() => setShowSort(!showSort)}
            >
              <div className="rounded-full border select-none border-grey-light bg-white p-2 w-40  flex justify-start ">
                <div className="mr-2 flex ">
                  <Image
                    src={'/img/sort.svg'}
                    height={20}
                    width={20}
                    alt="Sort symbol"
                  />
                  <div className="ml-2">Sort by:</div>
                </div>{' '}
                <div className="font-bold">{sortByString}</div>
              </div>
            </div>
            {showSort && (
              <div className="flex flex-col bg-white rounded-2xl border border-grey-light p-1 w-40 mb-5 -mt-2 absolute z-50">
                <div
                  className="hover:bg-grey-light cursor-pointer select-none rounded-xl p-1"
                  onClick={() => handleSortClick(SortOption.Newest)}
                >
                  Newest first
                </div>
                <div
                  className="hover:bg-grey-light cursor-pointer select-none rounded-xl p-1"
                  onClick={() => handleSortClick(SortOption.Oldest)}
                >
                  Oldest first
                </div>
                <div
                  className="hover:bg-grey-light cursor-pointer select-none rounded-xl p-1"
                  onClick={() => handleSortClick(SortOption.Name)}
                >
                  Name
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-10">
              {allNfts.map((nft) => {
                if (!nft.filePictureUrl) {
                  return
                }

                return (
                  <>
                    {nft.sellings.masterSelling && (
                      <SoundCard
                        nft={nft}
                        nftType={NftType.Master}
                        key={`master ${nft.id}`}
                        playingCardId={playingCardId}
                        onMusicClick={() => handleMusicClick(nft.id)}
                      />
                    )}
                    {nft.sellings.licenseSellings[0] && (
                      <SoundCard
                        nft={nft}
                        nftType={NftType.License}
                        key={`license ${nft.id}`}
                        playingCardId={playingCardId}
                        onMusicClick={() => handleMusicClick(nft.id)}
                      />
                    )}
                  </>
                )
              })}
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <Bars color="grey" />
          </div>
        )}
      </Layout>
    </div>
  )
}
