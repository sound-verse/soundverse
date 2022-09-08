import { gql } from '@apollo/client'
import { USER_FRAGMENT } from '../fragments'

export const FOLLOW_USER = gql`
  ${USER_FRAGMENT}
  mutation follow($userId: String!) {
    follow(userId: $userId) {
      ...UserFragment
    }
  }
`
