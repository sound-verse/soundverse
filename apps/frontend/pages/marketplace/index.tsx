import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import SoundCard from '../../components/marketplace/SoundCard'
import { useLazyQuery } from '@apollo/client'
import { GetNftsQuery, Nft, NftType } from '../../common/graphql/schema.d'
import { GET_NFTS } from '../../common/graphql/queries/get-nfts.query'
import { createApolloClient } from '../../lib/createApolloClient'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

type ProfileProps = {
  initialNfts: Nft[]
}

let _limit = 100
let _skip = 100
var moreButtonClicked = false

export default function Marketplace({ initialNfts }: ProfileProps) {
  //TODO: load nfts with hasSellings filter!

  const [getNFTs, { loading, data }] = useLazyQuery<GetNftsQuery>(GET_NFTS, {
    variables: { limit: _limit, skip: _limit },
    fetchPolicy: 'cache-first',
    onCompleted: async (data) => {
      setNewNfts(data.nfts)
    },
  })

  const [playingCardId, setPlayingCardId] = useState<string>('')
  const [newNfts, setNewNfts] = useState([])

  useEffect(() => {
    if (newNfts.length > 0) {
      setVisible(false)
    }
  })

  const [visible, setVisible] = useState(true)

  const handleMusicClick = (activeCardId: string) => {
    setPlayingCardId(activeCardId)
  }

  const MoreButton = () => {
    return (
      <button
        className="hover:bg-purple-700 w-32 h-8 text-black text-xs font-bold border border-black rounded-xl"
        onClick={() => {
          getNFTs({ variables: { limit: _limit, skip: _skip } })
          moreButtonClicked = true
        }}
      >
        Load More
      </button>
    )
  }

  const handleOnDocumentBottom = useCallback(async () => {
    if (moreButtonClicked) {
      _limit = _limit + _skip
      getNFTs({ variables: { limit: _limit, skip: _skip } })
    }
  }, [])

  useBottomScrollListener(handleOnDocumentBottom)
  return (
    <div className="">
      <Head>
        <title>Soundverse App</title>
      </Head>

      <Layout>
        {!initialNfts.length ? (
          <div className="text-white text-2xl font-bold flex h-screen justify-center self-center items-center -mt-36">
            No Marketplace items here yet, stay tuned!
          </div>
        ) : (
          <div className="big-wrapper">
            <div className="marketplace-wrapper">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-10">
                {initialNfts.map((nft, key) => {
                  if (!nft.filePictureUrl) {
                    return
                  }

                  return (
                    <>
                      {nft.sellings.masterSelling && (
                        <SoundCard
                          nft={nft}
                          nftType={NftType.Master}
                          key={key}
                          playingCardId={playingCardId}
                          onMusicClick={() => handleMusicClick(nft.id)}
                        />
                      )}
                      {nft.sellings.licenseSellings[0] && (
                        <SoundCard
                          nft={nft}
                          nftType={NftType.License}
                          key={key}
                          playingCardId={playingCardId}
                          onMusicClick={() => handleMusicClick(nft.id)}
                        />
                      )}
                    </>
                  )
                })}
                {newNfts.map((nft, key) => {
                  if (!nft.filePictureUrl) {
                    return
                  }

                  return (
                    <>
                      {nft.sellings.masterSelling && (
                        <SoundCard
                          nft={nft}
                          nftType={NftType.Master}
                          key={key}
                          playingCardId={playingCardId}
                          onMusicClick={() => handleMusicClick(nft.id)}
                        />
                      )}
                      {nft.sellings.licenseSellings[0] && (
                        <SoundCard
                          nft={nft}
                          nftType={NftType.License}
                          key={key}
                          playingCardId={playingCardId}
                          onMusicClick={() => handleMusicClick(nft.id)}
                        />
                      )}
                    </>
                  )
                })}
              </div>
              {visible && (
                <div className="mt-10 mb-8 flex justify-center">
                  <MoreButton />
                </div>
              )}
            </div>
          </div>
        )}
      </Layout>
    </div>
  )
}

export async function getServerSideProps() {
  const client = createApolloClient()
  const nfts = await client.apolloClient.query({
    query: GET_NFTS,
    variables: { limit: 100, skip: 0 },
  })

  return {
    props: {
      initialNfts: nfts.data.nfts,
    },
  }
}
