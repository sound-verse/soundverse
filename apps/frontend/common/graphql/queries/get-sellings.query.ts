import { gql } from '@apollo/client'

export const GET_SELLINGS = gql`
  query sellings($filter: SellingsFilter, $skip: Int!, $limit: Int!) {
    sellings(filter: $filter, skip: $skip, limit: $limit) {
      id
      seller {
        ethAddress
        name
      }
      buyers {
        user {
          ethAddress
          name
        }
        supply
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
      }
      nftType
      marketplaceContractAddress
      sellingStatus
      transactionHash
      nft {
        id
        tokenId
        contractAddress
        fileUrl
        filePictureUrl
        ipfsUrl
        transactionHash
        supply
        masterOwner {
          user {
            id
            name
            ethAddress
          }
          supply
        }
        metadata {
          name
          description
        }
        creator {
          id
          name
          ethAddress
          profileImage
        }
        licenseOwners {
          user {
            id
            name
            ethAddress
          }
          supply
        }
      }
    }
  }
`
