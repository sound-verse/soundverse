import { gql } from '@apollo/client'
import { NFT_OWNER_FRAGMENT } from './nft-owner.fragment'
import { USER_FRAGMENT } from './user.fragment'
import { SELLING_FRAGMENT } from './selling.fragment'

export const NFT_FRAGMENT = gql`
  ${NFT_OWNER_FRAGMENT}
  ${USER_FRAGMENT}
  ${SELLING_FRAGMENT}
  fragment NftFragment on Nft {
    id
    tokenId
    masterContractAddress
    licenseContractAddress
    fileUrl
    filePictureUrl
    ipfsUrl
    transactionHash
    supply
    chainId
    royaltyFeeInBeeps
    masterOwner {
      ...NftOwnerFragment
    }
    metadata {
      name
      description
    }
    creator {
      ...UserFragment
    }
    licenseOwners {
      ...NftOwnerFragment
    }
    sellings {
      masterSelling {
        ...SellingFragment
      }
      licenseSellings {
        ...SellingFragment
      }
    }
  }
`
