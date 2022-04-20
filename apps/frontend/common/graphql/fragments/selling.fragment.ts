import { gql } from '@apollo/client'
import { USER_FRAGMENT } from './user.fragment'
import { NFT_OWNER_FRAGMENT } from './nft-owner.fragment'

export const SELLING_FRAGMENT = gql`
  ${USER_FRAGMENT}
  ${NFT_OWNER_FRAGMENT}
  fragment SellingFragment on Selling {
    id
    seller {
      ...UserFragment
    }
    buyers {
      ...NftOwnerFragment
    }
    sellingVoucher {
      nftContractAddress
      price
      tokenId
      tokenUri
      isMaster
      signature
      sellCount
      supply
      maxSupply
      currency
      royaltyFeeInBeeps
    }
    nftType
    marketplaceContractAddress
    sellingStatus
    transactionHash
  }
`
