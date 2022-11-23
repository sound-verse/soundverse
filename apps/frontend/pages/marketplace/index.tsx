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
import useComponentVisible from '../../hooks/useComponentVisible'
import { useRouter } from 'next/router'
import cn from 'classnames'

const LIMIT = 100
const SKIP = 100

export default function Marketplace() {
  //TODO: load nfts with hasSellings filter!
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Newest)
  const [allLoaded, setAllLoaded] = useState(false)
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)

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
    case SortOption.Master: {
      sortByString = 'Master'
      break
    }
    case SortOption.License: {
      sortByString = 'License'
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
    fetchPolicy: 'network-only',
  })

  const [playingCardId, setPlayingCardId] = useState<string>('')
  const [allNfts, setAllNfts] = useState<Nft[]>([])

  const handleMusicClick = (activeCardId: string) => {
    setPlayingCardId(activeCardId)
  }

  const [userLicenseNfts, setLicenseNfts] = useState<Nft[]>([])
  const [userMasterNfts, setMasterNfts] = useState<Nft[]>([])
  const [selectedMasterSlider, setSelectedMasterSlider] = useState(true)
  const [selectedNfts, setSelectedNfts] = useState<
    { nft: Nft; nftType: NftType }[]
  >([])
  const hasNfts = userLicenseNfts?.length > 0 || userMasterNfts?.length > 0

  const handleClick = (nft: Nft, nftType: NftType) => {
    const foundNft = selectedNfts.find(
      (selectedNft) =>
        selectedNft.nft.id === nft.id && selectedNft.nftType === nftType
    )

    if (foundNft) {
      setSelectedNfts(
        selectedNfts.filter(
          (selectedNft) =>
            selectedNft.nft.id !== foundNft.nft.id ||
            selectedNft.nftType !== nftType
        )
      )
    } else {
      setSelectedNfts([...selectedNfts, { nft, nftType }])
    }
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
    if (data.nfts.length === 0) {
      setAllLoaded(true)
    }
    setAllNfts([...allNfts, ...data.nfts])
  }, [data])

  const handleSortClick = (sortOption: SortOption) => {
    if (sortBy === sortOption) {
      setIsComponentVisible(false)
      return
    }
    setSortBy(sortOption)
    setIsComponentVisible(false)
    setAllNfts([])
    setCurrentSkip(0)
  }

  useBottomScrollListener(() => {
    if (allLoaded) {
      return
    }
    setCurrentSkip(currentSkip + SKIP)
  })

  const isMasterFilterSet = sortByString === 'Master' ? true : false

  const isLicenseFilterSet = sortByString === 'License' ? true : false

  const isOtherFilterSet =
    sortByString !== 'Master' && sortByString !== 'License' ? true : false

  const router = useRouter()
  const baseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'main'
      ? 'https://app.soundverse.io'
      : 'https://testflight.soundverse.io'

  return (
    <div className="">
      <Head>
        <title>Soundverse Marketplace</title>
        <meta
          name="description"
          content="Discover, play, and collect the hottest music License or Master NFTs!"
        />
        <meta property="og:title" content="Soundverse Marketplace" />
        <meta
          property="og:description"
          content="Discover, play, and collect the hottest music License or Master NFTs!"
        />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${baseUrl}/img/metadata/marketplace.png`}
        />
      </Head>

      <Layout>
        <div className="big-wrapper">
          <div className="marketplace-wrapper w-full">
            <div className=" mb-5 select-none text-sm flex flex-start w-full">
              <div
                className="rounded-full border select-none cursor-pointer border-grey-light bg-white p-2 w-40  flex justify-start "
                onClick={() => setIsComponentVisible(!isComponentVisible)}
              >
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
            <div className="flex mb-10 select-none">
            <div
                className={cn(
                  'bg-white rounded text-black px-8 py-1 shadow-lg cursor-pointer',
                  selectedMasterSlider
                    ? ' !bg-gradient-to-l from-[#1400FF] to-[#0089FF] !text-white '
                    : ''
                )}
                onClick={() => {setSelectedMasterSlider(!selectedMasterSlider); handleSortClick(SortOption.Master);}}
              >
                Masters
              </div>

              <div
                className={cn(
                  'bg-white rounded text-black px-8 py-1 shadow-lg cursor-pointer',
                  !selectedMasterSlider
                    ? ' !bg-gradient-to-l from-[#1400FF] to-[#0089FF] !text-white '
                    : ''
                )}
                onClick={() => {setSelectedMasterSlider(!selectedMasterSlider); handleSortClick(SortOption.License);}}
              >
                Licenses
              </div>
            </div>

            <div ref={ref}>
              {isComponentVisible && (
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
                  <div
                    className="hover:bg-grey-light cursor-pointer select-none rounded-xl p-1"
                    onClick={() => handleSortClick(SortOption.Master)}
                  >
                    Master
                  </div>
                  <div
                    className="hover:bg-grey-light cursor-pointer select-none rounded-xl p-1"
                    onClick={() => handleSortClick(SortOption.License)}
                  >
                    License
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-10">
              {allNfts.map((nft) => {
                if (!nft.filePictureUrl) {
                  return
                }

                return (
                  <>
                    {nft.sellings.masterSelling &&
                      (isOtherFilterSet || isMasterFilterSet) && (
                        <SoundCard
                          nft={nft}
                          nftType={NftType.Master}
                          key={`master ${nft.id}`}
                          playingCardId={playingCardId}
                          onMusicClick={() => handleMusicClick(nft.id)}
                        />
                      )}
                    {nft.sellings.licenseSellings[0] &&
                      (isOtherFilterSet || isLicenseFilterSet) && (
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
