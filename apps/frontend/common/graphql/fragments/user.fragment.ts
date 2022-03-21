import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    name
    description
    ethAddress
    twitter
    instagram
    soundcloud
    discord
    spotify
    website
    profileImage
    verified
  }
`
