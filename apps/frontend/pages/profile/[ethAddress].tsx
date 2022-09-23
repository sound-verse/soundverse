import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import {
  EditProfileForm,
  ProfileImage,
  ProfileName,
  ProfileNftTabs,
} from '../../components/profile'
import { createApolloClient } from '../../lib/createApolloClient'
import { useProfile, USER, User } from '../../hooks/useProfile'
import { generateShortEthAddress } from '../../utils/common'
import Button from '../../components/common/Button'
import { PorfileSocialBar } from '../../components/profile/ProfileSocialBar'
import { GET_NFTS } from '../../common/graphql/queries/get-nfts.query'
import { useAuthContext } from '../../context/AuthContext'
import Custom404 from '../404'
import {
  GetUserNftsQuery,
  GetUserNftsQueryVariables,
  Nft,
  UserNfts,
} from '../../common/graphql/schema.d'
import { GET_USER_NFTS } from '../../common/graphql/queries/get-user-nfts.query'
import styles from './Profile.module.css'
import {useRouter} from 'next/router';

type ProfileProps = {
  user: User
  queryEthAddress: String
  userNfts: UserNfts
}

export default function Profile({
  user,
  queryEthAddress,
  userNfts,
}: ProfileProps) {
  const { authUser } = useAuthContext()
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false)
  const { followUser, unfollowUser } = useProfile()
  const [loading, setLoading] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followers, setFollowers] = useState<number>()

  useEffect(() => {
    setIsFollowing(
      !!user.followers.find((follower) => follower.id === authUser?.id)
    )
    setFollowers(user.followers.length)
  }, [user.followers, authUser?.id])

  if (!user) {
    return <Custom404 />
  }

  const handleFollow = async (userId: string) => {
    setLoading(true)
    try {
      followUser({ userId })
      setIsFollowing(true)
      setFollowers(followers + 1)
    } catch {
      console.log('Could not follow user.')
    } finally {
      setLoading(false)
    }
  }

  const handleUnfollow = async (userId: string) => {
    setLoading(true)
    try {
      unfollowUser({ userId })
      setIsFollowing(false)
      setFollowers(followers - 1)
    } catch {
      console.log('Could not unfollow user.')
    } finally {
      setLoading(false)
    }
  }

  const isMe =
    queryEthAddress.toLowerCase() === authUser?.ethAddress?.toLowerCase()

  const activeUser = isMe ? authUser : user

  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT === 'main' ? 'https://main.soundverse.io' : 'https://testflight.soundverse.io';

  return (
    <div>
      <Head>
        <title>Soundverse Profile</title>
        <meta name="description" content="Build up your Soundverse profile and become a verified member to collect rewards!" />
        <meta property="og:title" content="Soundverse Profile" />
        <meta property="og:description" content="Build up your Soundverse profile and become a verified member to collect rewards!" />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={activeUser.profileImage ? activeUser.profileImage : `${baseUrl}/img/metadata/my_profile.png`} />
      </Head>

      <Layout>
        <main className="mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 xl:h-screen text-black">
            <div className="col-span-1">
              <div className="flex flex-col m-10 overflow-hidden items-center">
                <ProfileImage
                  ethAddress={activeUser.ethAddress}
                  imageUrl={activeUser.profileImage}
                  height={50}
                  width={50}
                />
                <ProfileName
                  ethAddress={activeUser.ethAddress}
                  name={activeUser.name}
                  short={activeUser.name ? false : true}
                  fullName={true}
                  className="font-bold text-lg mt-10 mb-3 text-center"
                />
                <div>{generateShortEthAddress(activeUser.ethAddress, 10)}</div>
                {isMe && (
                  <Button
                    type="normal"
                    text={`${showEditProfile ? 'Cancel' : 'Edit Profile'}`}
                    onClick={() => setShowEditProfile(!showEditProfile)}
                    className="mt-10 !px-8 w-36 bg-gradient-to-l from-[#1400FF] to-[#0089FF]"
                  />
                )}
                {!isMe && authUser && (
                  <>
                    {!isFollowing && (
                      <Button
                        type="normal"
                        text={'Follow'}
                        onClick={() => handleFollow(user.id)}
                        className="mt-10 !px-8 w-36 bg-gradient-to-l from-[#1400FF] to-[#0089FF]"
                      />
                    )}
                    {isFollowing && (
                      <Button
                        type="normal"
                        text={'Unfollow'}
                        onClick={() => handleUnfollow(user.id)}
                        className="mt-10 !px-8 w-36 bg-gradient-to-l from-[#1400FF] to-[#0089FF]"
                      />
                    )}
                  </>
                )}
                <div className="text-white bg-[#1400FF] rounded-full py-2 px-4 w-36 mt-3">
                  <div className="flex justify-between items-center">
                    <div>Followers</div>
                    <div className="font-bold text-xl">{followers}</div>
                  </div>
                </div>
                <div className="text-white bg-[#1400FF] rounded-full py-2 px-4 w-36 mt-3">
                  <div className="flex justify-between items-center">
                    <div>Following</div>
                    <div className="font-bold text-xl">
                      {user.following.length}
                    </div>
                  </div>
                </div>
                <PorfileSocialBar
                  twitter={activeUser.twitter}
                  instagram={activeUser.instagram}
                  soundcloud={activeUser.soundcloud}
                  discord={activeUser.discord}
                  spotify={activeUser.spotify}
                  className="mt-10"
                />
                <div className="text-black text-sm mt-5">
                  {activeUser.description}
                </div>
              </div>
            </div>
            <div className="col-span-3">
              {showEditProfile && isMe ? (
                <EditProfileForm
                  user={activeUser}
                  setShowEditProfile={setShowEditProfile}
                />
              ) : (
                <div className="flex flex-col m-16">
                  <div className="">
                    <ProfileNftTabs
                      createdNfts={userNfts.createdMasterNfts}
                      ownedMasterNfts={userNfts.ownedMasterNfts}
                      ownedLicenseNfts={userNfts.ownedLicenseNfts}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </Layout>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { ethAddress } = context.query
  const client = createApolloClient()
  const user = await client.apolloClient.query({
    query: USER,
    variables: { ethAddress },
  })

  const userNfts = await client.apolloClient.query<
    GetUserNftsQuery,
    GetUserNftsQueryVariables
  >({
    query: GET_USER_NFTS,
    variables: { ethAddress },
  })

  return {
    props: {
      user: user.data.user,
      userNfts: userNfts.data.userNfts,
      queryEthAddress: ethAddress,
    },
  }
}
