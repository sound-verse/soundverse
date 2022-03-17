import React, { useEffect, useState } from 'react'
import { createApolloClient } from '../../lib/createApolloClient'
import { User } from '../../hooks/useProfile'
import Custom404 from '../404'
import SingleNftPage from '../../components/SingleNftPage/SingleNftPage'
import { GET_NFT } from '../../common/graphql/queries/get-nft.query'
import { Nft, Selling } from '../../common/graphql/schema'
import { GET_SELLINGS } from '../../common/graphql/queries/get-sellings.query'
import { NftType } from '../../common/types/nft-type.enum'

type ProfileProps = {
  query: {
    contractAddress: string
    tokenId: string
  }
  //TODO: create NFT type from gql schema for frontend
  nft: Nft
  nftSellings: Selling[]
}

export default function LicenseNft({ nft, nftSellings }: ProfileProps) {
  if (!nft) {
    return <Custom404 />
  }

  return (
    <SingleNftPage
      nft={nft}
      nftType={NftType.LICENSE}
      nftSellings={nftSellings}
    />
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query
  const client = createApolloClient()

  const nft = await client.apolloClient.query({
    query: GET_NFT,
    variables: { filter: { id } },
  })
  const nftSellings = await client.apolloClient.query({
    query: GET_SELLINGS,
    variables: {
      filter: { nftId: id, nftType: 'LISENCE' },
      limit: 1000,
      skip: 0,
    },
  })

  return {
    props: {
      nft: nft.data.nft,
      nftSellings: nftSellings.data.sellings,
      query: {
        id,
      },
    },
  }
}
