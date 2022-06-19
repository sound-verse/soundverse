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
    saleVoucher {
      nftContractAddress
      price
      tokenUri
      isMaster
      signature
      supply
      currency
      validUntil
    }
    mintVoucher {
      price
      tokenUri
      isMaster
      signature
      supply
      maxSupply
      currency
      royaltyFeeMaster
      royaltyFeeLicense
      creatorOwnerSplit
      validUntil
    }
    nftType
    marketplaceContractAddress
    sellingStatus
    transactionHash
  }
`
