import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { createApolloClient } from '../../lib/createApolloClient'
import { USER, User } from '../../hooks/useProfile'
import { useAuthContext } from '../../context/AuthContext'
import { gql } from '@apollo/client'
import Custom404 from '../404'
import SoundCard from '../../components/marketplace/SoundCard'
import { ProfileName } from '../../components/profile'
import Button from '../../components/common/Button'
import Link from 'next/link'

export const GET_NFT = gql`
  query getNft($filter: NftFilter!) {
    nft(filter: $filter) {
      id
      tokenId
      contractAddress
      fileUrl
      filePictureUrl
      ipfsUrl
      transactionHash
      supply
      masterOwner {
        user {
          name
          ethAddress
        }
      }
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
      licenseOwners {
        user {
          name
          ethAddress
        }
        supply
      }
    }
  }
`

type ProfileProps = {
  user: User
  query: {
    contractAddress: string
    tokenId: string
  }
  //TODO: create NFT type from gql schema for frontend
  nft: any
}

export default function Nft({ user, query, nft }: ProfileProps) {
  const { authUser } = useAuthContext()
  if (!nft) {
    return <Custom404 />
  }
  const isMe =
    nft.creator.ethAddress.toLowerCase() === authUser?.ethAddress?.toLowerCase()

  const activeUser = isMe ? authUser : user

  return (
    <div>
      <Head>
        <title>Nft</title>
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 xl:h-screen text-white">
            <div className="col-span-1">
              <div className="flex flex-col m-10">
                <SoundCard
                  soundCard={{
                    id: nft.id,
                    creatorEthAddress: nft.creator.ethAddress,
                    creatorName: nft.creator.name,
                    licenses: nft.supply,
                    musicUrl: nft.fileUrl,
                    name: nft.metadata.name,
                    pictureUrl: nft.filePictureUrl,
                    tokenId: nft.tokenId,
                    type: 'master',
                  }}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col m-16">
                <div className="flex flex-col p-10">
                  <div className="text-white font-extrabold text-2xl  font-AOCR ">
                    <Link href={`/profile/${nft.creator.ethAddress}`}>
                      <a>
                        <ProfileName
                          ethAddress={nft.creator.ethAddress}
                          name={nft.creator.name}
                          className="inline-block font-bold text-purple"
                        />
                      </a>
                    </Link>
                    {' - '}
                    {nft.metadata.name}
                  </div>
                  <div className="flex justify-between items-baseline text-white border-b border-grey-medium pb-5">
                    <div className="mt-12">
                      Owned by:{' '}
                      <Link
                        href={`/profile/${nft.masterOwner.user.ethAddress}`}
                      >
                        <a>
                          <ProfileName
                            ethAddress={nft.masterOwner.user.ethAddress}
                            name={nft.masterOwner.user.name}
                            className="inline-block font-bold text-purple"
                          />
                        </a>
                      </Link>
                    </div>
                    <div>
                      Type: <span className="font-bold">Master</span>
                    </div>
                  </div>
                  <div className="mt-10">
                    <Button
                      text="Not for sale"
                      type="disabled"
                      className="w-64"
                    />
                  </div>
                  <div className="mt-24">
                    <div className="flex flex-col">
                      <div className="font-extrabold text-2xl uppercase font-AOCR border-b border-grey-medium pb-5">
                        Details
                      </div>
                      <div className="text-white mt-5">
                        {nft.metadata.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const client = createApolloClient()

  const nft = await client.apolloClient.query({
    query: GET_NFT,
    variables: { filter: { id } },
  })

  return {
    props: {
      nft: nft.data.nft,
      query: {
        id,
      },
    },
  }
}
