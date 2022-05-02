import React, { useEffect, useState } from 'react'
import { createApolloClient } from '../../lib/createApolloClient'
import { User } from '../../hooks/useProfile'
import Custom404 from '../404'
import SingleNftPage from '../../components/SingleNftPage/SingleNftPage'
import { GET_NFT } from '../../common/graphql/queries/get-nft.query'
import { Nft, Selling, NftType } from '../../common/graphql/schema.d'

type ProfileProps = {
  query: {
    contractAddress: string
    tokenId: string
  }
  //TODO: create NFT type from gql schema for frontend
  nft: Nft
  nftSellings: Selling[]
}

export default function LicenseNft({ nft }: ProfileProps) {
  if (!nft) {
    return <Custom404 />
  }

  return <SingleNftPage nft={nft} nftType={NftType.License} />
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
