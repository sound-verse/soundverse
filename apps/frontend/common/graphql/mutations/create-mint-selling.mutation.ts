import { gql } from '@apollo/client'
import { SELLING_FRAGMENT } from '../fragments'

export const CREATE_MINT_SELLING = gql`
  ${SELLING_FRAGMENT}
  mutation createMintSelling($createMintSellingInput: CreateMintSellingInput!) {
    createMintSelling(createMintSellingInput: $createMintSellingInput) {
      ...SellingFragment
    }
  }
`
