import React, { useEffect, useState } from 'react'
import { createApolloClient } from '../../lib/createApolloClient'
import { User } from '../../hooks/useProfile'
import Custom404 from '../404'
import { GET_NFT } from '../../common/graphql/queries/get-nft.query'
import SingleNftPage from '../../components/SingleNftPage/SingleNftPage'
import { Nft, Selling } from '../../common/graphql/schema.d'
import { NftType } from '../../common/types/nft-type.enum'

type ProfileProps = {
  query: {
    contractAddress: string
    tokenId: string
  }
  nft: Nft
}

export default function MasterNft({ nft }: ProfileProps) {
  if (!nft) {
    return <Custom404 />
  }

  return <SingleNftPage nft={nft} nftType={NftType.Master} />
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
