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

export const GET_NFT = gql`
  query getNft($filter: NftFilter!) {
    nft(filter: $filter) {
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
                    creatorEthAddress: nft.creator.ethAddress,
                    creatorName: nft.creator.name,
                    licences: nft.supply,
                    musicUrl: nft.fileUrl,
                    name: nft.metadata.name,
                    pictureUrl: nft.filePictureUrl,
                    contractAddress: nft.contractAddress,
                    tokenId: nft.tokenId,
                  }}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="flex flex-col m-16">
                <div className="flex flex-col p-10">
                  <div className="text-white font-extrabold text-2xl  font-AOCR ">
                    <ProfileName
                      ethAddress={nft.creator.ethAddress}
                      name={nft.creator.name}
                      className="inline-block"
                    />{' '}
                    - <span>{nft.metadata.name} </span>
                  </div>
                  <div className="flex justify-between items-baseline text-grey-light border-b border-grey-medium pb-5">
                    <div className="mt-12">
                      Owned by:{' '}
                      <ProfileName
                        ethAddress={nft.creator.ethAddress}
                        name={nft.creator.name}
                        className="inline-block font-bold"
                      />
                    </div>
                    <div>
                      Type: <span className="font-bold">Master</span>
                    </div>
                    <div className="">
                      Licences:{' '}
                      <span className="font-bold">
                        {nft.supply ? nft.supply : '#/#'}
                      </span>
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
  const { contractAddress, tokenId } = context.query
  const client = createApolloClient()
  const intTokenId =
    parseInt(tokenId) || tokenId === '0' ? parseInt(tokenId) : -1

  const nft = await client.apolloClient.query({
    query: GET_NFT,
    variables: { filter: { contractAddress, tokenId: intTokenId } },
  })

  return {
    props: {
      nft: nft.data.nft,
      query: {
        contractAddress,
        tokenId,
      },
    },
  }
}
