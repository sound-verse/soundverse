import { gql } from '@apollo/client'
import { NFT_FRAGMENT } from '../fragments'
import { USER_FRAGMENT } from '../fragments'

export const NFT_SEARCH = gql`
  ${NFT_FRAGMENT}
  ${USER_FRAGMENT}
  query search($searchInput: NftSearchInput!) {
    search(searchInput: $searchInput) {
      nfts {
        ...NftFragment
      }
      artists {
        ...UserFragment
      }
    }
  }
`
