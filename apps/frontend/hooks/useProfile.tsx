import { useCallback, useEffect, useMemo, useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { print } from 'graphql'
import axios from 'axios'
import Cookies from 'js-cookie'
import { FOLLOW_USER } from '../common/graphql/mutations/follow-user.mutation'
import {
  FollowMutation,
  FollowMutationVariables,
  MutationUnfollowArgs,
  UnfollowMutation,
  UnfollowMutationVariables,
} from '../common/graphql/schema'
import { UNFOLLOW_USER } from '../common/graphql/mutations/unfollow-user.mutation'

export type User = {
  id: string
  name: string
  description: string
  ethAddress: string
  twitter: string
  instagram: string
  soundcloud: string
  discord: string
  spotify: string
  website: string
  profileImage: string
  verified: Boolean
  followers: [
    {
      id: string
      name: string
      profileImage: string
    }
  ]
  following: [
    {
      id: string
      name: string
      profileImage: string
    }
  ]
}

export type UpdateProfileInput = {
  name?: string
  description?: string
  twitter?: string
  instagram?: string
  soundcloud?: string
  discord?: string
  spotify?: string
  website?: string
  profileImage?: File
}

export const USER = gql`
  query user($ethAddress: String!) {
    user(ethAddress: $ethAddress) {
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
      followers {
        id
        ethAddress
        name
        profileImage
      }
      following {
        id
        ethAddress
        name
        profileImage
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
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
  }
`

export const UPDATE_USER_PROFILE_PICTURE = gql`
  mutation uploadProfilePicture($file: Upload!) {
    uploadProfilePicture(file: $file) {
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
  }
`

export const useProfile = () => {
  const [getUser, { data: user, loading: userLoading }] =
    useLazyQuery<User>(USER)
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER)
  const [followUserMutation] = useMutation<
    FollowMutation,
    FollowMutationVariables
  >(FOLLOW_USER)
  const [unfollowUserMutation] = useMutation<
    UnfollowMutation,
    UnfollowMutationVariables
  >(UNFOLLOW_USER)

  const getProfile = useCallback(
    async (ethAddress: String) => {
      getUser({ variables: { ethAddress } })
    },
    [getUser]
  )

  const followUser = useCallback(async (follow: UnfollowMutationVariables) => {
    return await followUserMutation({ variables: follow })
  }, [])

  const unfollowUser = useCallback(
    async (unfollowVariables: UnfollowMutationVariables) => {
      return await unfollowUserMutation({ variables: unfollowVariables })
    },
    []
  )

  const updateProfile = useCallback(
    async (updateProfileInput: UpdateProfileInput) => {
      await updateUser({
        variables: {
          data: {
            twitter: updateProfileInput.twitter ?? '',
            instagram: updateProfileInput.instagram ?? '',
            website: updateProfileInput.website ?? '',
            description: updateProfileInput.description ?? '',
            name: updateProfileInput.name ?? '',
            spotify: updateProfileInput.spotify ?? '',
            discord: updateProfileInput.discord ?? '',
            soundcloud: updateProfileInput.soundcloud ?? '',
          },
        },
      })

      if (updateProfileInput.profileImage?.name) {
        const formData = new FormData()
        formData.append(
          'operations',
          JSON.stringify({
            query: print(UPDATE_USER_PROFILE_PICTURE),
            variables: {
              file: null,
            },
          })
        )
        formData.append(
          'map',
          JSON.stringify({
            '0': ['variables.file'],
          })
        )
        formData.append('0', updateProfileInput.profileImage)

        await axios.request({
          method: 'POST',
          url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
          data: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get('JWT_TOKEN')}`,
          },
        })
      }
    },
    []
  )

  return useMemo(
    () => ({
      user,
      userLoading,
      getProfile,
      updateProfile,
      followUser,
      unfollowUser,
    }),
    [user, userLoading, getProfile, updateProfile, followUser, unfollowUser]
  )
}
