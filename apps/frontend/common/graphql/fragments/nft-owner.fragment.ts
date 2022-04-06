import { gql } from '@apollo/client'
import { USER_FRAGMENT } from './user.fragment'

export const NFT_OWNER_FRAGMENT = gql`
  ${USER_FRAGMENT}
  fragment NftOwnerFragment on NftOwner {
    user {
      ...UserFragment
    }
    supply
  }
`
