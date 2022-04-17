import { gql } from '@apollo/client'
import { NFT_FRAGMENT } from '../fragments'

export const GET_USER_NFTS = gql`
  ${NFT_FRAGMENT}
  query getUserNfts($ethAddress: String) {
    userNfts(ethAddress: $ethAddress) {
      createdMasterNfts {
        ...NftFragment
      }
      createdLicenseNfts {
        ...NftFragment
      }
      ownedMasterNfts {
        ...NftFragment
      }
      ownedLicenseNfts {
        ...NftFragment
      }
    }
  }
`
