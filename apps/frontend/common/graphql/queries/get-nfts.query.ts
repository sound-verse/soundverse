import { gql } from '@apollo/client'

export const GET_NFTS = gql`
  query getNfts($filter: NftsFilter, $limit: Int!, $skip: Int!) {
    nfts(filter: $filter, limit: $limit, skip: $skip) {
      id
      tokenId
      contractAddress
      fileUrl
      filePictureUrl
      ipfsUrl
      transactionHash
      masterOwner {
        user {
          name
          ethAddress
        }
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
          name
          ethAddress
        }
        supply
      }
    }
  }
`
