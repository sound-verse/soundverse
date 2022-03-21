import { gql } from '@apollo/client'
import { NFT_FRAGMENT } from '../fragments'

export const GET_NFT = gql`
  ${NFT_FRAGMENT}
  query getNft($filter: NftFilter!) {
    nft(filter: $filter) {
      ...NftFragment
    }
  }
`
