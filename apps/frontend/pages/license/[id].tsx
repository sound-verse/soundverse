import React, { useEffect, useState } from 'react'
import { createApolloClient } from '../../lib/createApolloClient'
import { User } from '../../hooks/useProfile'
import Custom404 from '../404'
import SingleNftPage from '../../components/SingleNftPage/SingleNftPage'
import { GET_NFT } from '../../common/graphql/queries/get-nft.mutation'
import { Nft } from '../../common/graphql/schema'

type ProfileProps = {
  user: User
  query: {
    contractAddress: string
    tokenId: string
  }
  //TODO: create NFT type from gql schema for frontend
  nft: Nft
}

export default function LicenseNft({ user, nft }: ProfileProps) {
  if (!nft) {
    return <Custom404 />
  }

  return <SingleNftPage user={user} nft={nft} type={'license'} />
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
