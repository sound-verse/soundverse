import { gql } from '@apollo/client'

export const GET_NFT = gql`
  query getNft($filter: NftFilter!) {
    nft(filter: $filter) {
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
`
