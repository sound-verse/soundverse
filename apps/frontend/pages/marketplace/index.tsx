import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import SoundCard from '../../components/marketplace/SoundCard'
import { gql, useQuery } from '@apollo/client'
import { NftType } from '../../common/types/nft-type.enum'
import { GetNftsQuery } from '../../common/graphql/schema'
import { GET_NFTS } from '../../common/graphql/queries/get-nfts.query'

export default function Landing() {
  //TODO: load nfts with hasSellings filter!
  const { loading, data } = useQuery<GetNftsQuery>(GET_NFTS, {
    variables: { limit: 100, skip: 0 },
  })
  const [playingCardId, setPlayingCardId] = useState<string>('')

  const nfts = loading ? [] : data?.nfts ? data.nfts : []

  const handleMusicClick = (activeCardId: string) => {
    setPlayingCardId(activeCardId)
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
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
              {nfts.map((nft, key) => {
                if (!nft.filePictureUrl) {
                  return
                }

                return (
                  <>
                    {nft.sellings.masterSelling && (
                      <SoundCard
                        nft={nft}
                        nftType={NftType.MASTER}
                        key={key}
                        playingCardId={playingCardId}
                        onMusicClick={() => handleMusicClick(nft.id)}
                      />
                    )}
                    {nft.sellings.licenseSellings[0] && (
                      <SoundCard
                        nft={nft}
                        nftType={NftType.LICENSE}
                        key={key}
                        playingCardId={playingCardId}
                        onMusicClick={() => handleMusicClick(nft.id)}
                      />
                    )}
                  </>
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
