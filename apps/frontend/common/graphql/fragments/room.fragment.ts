import { gql } from '@apollo/client'
import { USER_FRAGMENT } from './user.fragment'
import { NFT_FRAGMENT } from './nft.fragment'

export const ROOM_FRAGMENT = gql`
  ${USER_FRAGMENT}
  ${NFT_FRAGMENT}
  fragment RoomFragment on Room {
    id
    creator {
      ...UserFragment
    }
    playlist {
      ...NftFragment
    }
    currentTrack {
      nft {
        ...NftFragment
      }
      currentPosition
    }
    activeUsers {
      ...UserFragment
    }
    active
  }
`
