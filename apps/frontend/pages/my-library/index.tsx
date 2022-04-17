import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { useAuthContext } from '../../context/AuthContext'
import {
  GetUserNftsQuery,
  GetUserNftsQueryVariables,
  Nft,
} from '../../common/graphql/schema'
import { useQuery } from '@apollo/client'
import { GET_USER_NFTS } from '../../common/graphql/queries/get-user-nfts.query'
import { Heading } from '../../components/common/Heading'
import { ModuleBg } from '../../components/common/ModuleBg'
import { MiniNft } from '../../components/common/MiniNft'
import Button from '../../components/common/Button'

export default function MyLibrary() {
  const { authUser } = useAuthContext()
  const [showLibrary, setShowLibrary] = useState<boolean>(false)
  const [userNfts, setUserNfts] = useState<Nft[]>([])
  const [selectedNfts, setSelectedNfts] = useState<Nft[]>([])

  const handleClick = (nft: Nft) => {
    const foundNft = selectedNfts.find(
      (selectedNft) => selectedNft.id === nft.id
    )

    if (foundNft) {
      setSelectedNfts(
        selectedNfts.filter((selectedNft) => selectedNft.id !== foundNft.id)
      )
    } else {
      setSelectedNfts([...selectedNfts, nft])
    }
  }

  const { data, loading, error } = useQuery<
    GetUserNftsQuery,
    GetUserNftsQueryVariables
  >(GET_USER_NFTS)

  useEffect(() => {
    if (!data) {
      return
    }
    const userNfts = [
      ...data.userNfts.createdLicenseNfts,
      ...data.userNfts.createdMasterNfts,
      ...data.userNfts.ownedLicenseNfts,
      ...data.userNfts.ownedMasterNfts,
    ]

    const nftIds = []
    const uniqueUserNfts = userNfts.filter((nft) => {
      const isDuplicate = nftIds.find((id) => id === nft.id)

      if (!isDuplicate) {
        nftIds.push(nft.id)
        return true
      }
    })

    setUserNfts(uniqueUserNfts)
  }, [data])

  return (
    <div>
      <Head>
        <title>My Library</title>
      </Head>

      <Layout>
        {!authUser && !loading ? (
          <div className="text-white text-2xl font-bold flex h-screen justify-center self-center items-center -mt-36">
            Please login with your wallet to see this page.
          </div>
        ) : (
          <main className="mx-auto">
            <ModuleBg>
              <Heading className="mb-12">My Library</Heading>
              <div className="flex text-white">
                <div className="min-w-[300px] border border-grey-medium mr-8 p-4 rounded">
                  <Heading className="text-center">Selected for room</Heading>
                  <div className="flex-col mt-6 cursor-pointer">
                    {selectedNfts &&
                      selectedNfts.map((nft, key) => {
                        return (
                          <div
                            key={key}
                            className="border-b pb-2 border-grey-medium mr-4 mt-4"
                            onClick={() => handleClick(nft)}
                          >
                            <MiniNft nft={nft} />
                          </div>
                        )
                      })}
                  </div>
                  <div className="text-xs text-grey-medium text-center mt-12 mb-12">
                    Click any song to add here
                  </div>
                  <Button
                    className="flex mx-auto"
                    text="Launch your room now"
                    type="purple"
                  />
                </div>
                <div className="pt-4">
                  <Heading>My NFT's</Heading>
                  <div className="flex mt-6 flex-wrap cursor-pointer">
                    {userNfts &&
                      userNfts.map((nft, key) => {
                        const isSelected = selectedNfts.find(
                          (selectedNft) => selectedNft.id === nft.id
                        )
                        return (
                          <div
                            key={key}
                            className="border-b pb-2 border-grey-medium mr-4 mt-4"
                            onClick={() => handleClick(nft)}
                          >
                            <div className="flex items-center justify-center">
                              <div
                                className={`mr-4 w-4 h-4 border border-grey-medium rounded ${
                                  isSelected ? 'bg-purple' : ''
                                }`}
                              ></div>
                              <MiniNft nft={nft} />
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </ModuleBg>
          </main>
        )}
      </Layout>
    </div>
  )
}
