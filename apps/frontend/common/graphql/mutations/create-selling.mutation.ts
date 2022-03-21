import { gql } from '@apollo/client'
import { SELLING_FRAGMENT } from '../fragments'

export const CREATE_SELLING = gql`
  ${SELLING_FRAGMENT}
  mutation createSelling($createSellingInput: CreateSellingInput!) {
    createSelling(createSellingInput: $createSellingInput) {
      ...SellingFragment
    }
  }
`
