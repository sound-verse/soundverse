import React, { useEffect, useState } from 'react'
import { createApolloClient } from '../../lib/createApolloClient'
import { User } from '../../hooks/useProfile'
import Custom404 from '../404'
import { GET_NFT } from '../../common/graphql/queries/get-nft.query'
import SingleNftPage from '../../components/SingleNftPage/SingleNftPage'
import { Nft, Selling } from '../../common/graphql/schema'
import { GET_SELLINGS } from '../../common/graphql/queries/get-sellings.query'
import { NftType } from '../../common/types/nft-type.enum'

type ProfileProps = {
  query: {
    contractAddress: string
    tokenId: string
  }
  nft: Nft
  nftSellings: Selling[]
}

export default function MasterNft({ nftSellings, nft }: ProfileProps) {
  if (!nft) {
    return <Custom404 />
  }

  return (
    <SingleNftPage
      nft={nft}
      nftType={NftType.MASTER}
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
      filter: { nftId: id, nftType: 'MASTER' },
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
