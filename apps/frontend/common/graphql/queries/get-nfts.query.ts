import { gql } from '@apollo/client'
import { NFT_FRAGMENT } from '../fragments'

export const GET_NFTS = gql`
  ${NFT_FRAGMENT}
  query getNfts($filter: NftsFilter, $limit: Int!, $skip: Int!) {
    nfts(filter: $filter, limit: $limit, skip: $skip) {
      ...NftFragment
    }
  }
`
