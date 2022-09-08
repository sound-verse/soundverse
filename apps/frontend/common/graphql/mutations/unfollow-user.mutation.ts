import { gql } from '@apollo/client'
import { USER_FRAGMENT } from '../fragments'

export const UNFOLLOW_USER = gql`
  ${USER_FRAGMENT}
  mutation unfollow($userId: String!) {
    unfollow(userId: $userId) {
      ...UserFragment
    }
  }
`
