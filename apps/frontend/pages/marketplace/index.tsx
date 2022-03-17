import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import SoundCard from '../../components/marketplace/SoundCard'
import { gql, useQuery } from '@apollo/client'
import { NftType } from '../../common/types/nft-type.enum'
import { GET_SELLINGS } from '../../common/graphql/queries/get-sellings.query'
import { QuerySellingsArgs, SellingsQuery } from '../../common/graphql/schema'

export default function Landing() {
  const { loading, data } = useQuery<SellingsQuery>(GET_SELLINGS, {
    variables: { limit: 100, skip: 0 },
  })
  const [playingCardId, setPlayingCardId] = useState<string>('')

  const sellings = loading ? [] : data?.sellings ? data.sellings : []

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
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
              {sellings.map((selling, key) => {
                const nft = selling.nft
                if (!nft.filePictureUrl) {
                  return
                }

                return (
                  <div key={`soundcard-wrapper-${key}`}>
                    <div className="spacer">
                      <SoundCard
                        soundCard={{
                          pictureUrl: nft.filePictureUrl,
                          name: nft.metadata.name,
                          creatorName: nft.creator.name,
                          creatorEthAddress: nft.creator.ethAddress,
                          licenses: nft.supply,
                          musicUrl: nft.fileUrl,
                          tokenId: nft.tokenId,
                          id: nft.id,
                          nftType:
                            selling.nftType === 'MASTER'
                              ? NftType.MASTER
                              : NftType.LICENSE,
                        }}
                        key={key}
                        playingCardId={playingCardId}
                        onMusicClick={() => handleMusicClick(nft.id)}
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
