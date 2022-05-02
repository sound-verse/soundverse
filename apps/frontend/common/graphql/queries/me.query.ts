import { gql } from '@apollo/client'
import { USER_FRAGMENT } from '../fragments'

export const ME = gql`
  ${USER_FRAGMENT}
  query me {
    me {
      ...UserFragment
    }
  }
`
