import { gql } from '@apollo/client'

export const CREATE_SELLING = gql`
  mutation createSelling($createSellingInput: CreateSellingInput!) {
    createSelling(createSellingInput: $createSellingInput) {
      id
      seller {
        id
        name
        ethAddress
      }
      nftType
      sellingStatus
    }
  }
`
