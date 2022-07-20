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
import { USER, User } from '../../hooks/useProfile'
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

  if (!user) {
    return <Custom404 />
  }

  const isMe =
    queryEthAddress.toLowerCase() === authUser?.ethAddress?.toLowerCase()

  const activeUser = isMe ? authUser : user

  return (
    <div>
      <Head>
        <title>Profile</title>
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
                    className="mt-10 !px-8"
                  />
                )}
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
