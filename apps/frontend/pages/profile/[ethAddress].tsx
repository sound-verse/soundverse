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
import { GET_NFTS } from '../marketplace'
import { useAuthContext } from '../../context/AuthContext'
import Custom404 from '../404'

type ProfileProps = {
  user: User
  queryEthAddress: String
  //TODO: create NFT type from gql schema for frontend
  createdNfts: any
}

export default function Profile({
  user,
  queryEthAddress,
  createdNfts,
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
          <div className="grid grid-cols-1 xl:grid-cols-4 xl:h-screen text-white">
            <div className="col-span-1 xl:border-r lg:border-grey-medium">
              <div className="flex flex-col m-10 overflow-hidden">
                <ProfileImage
                  ethAddress={activeUser.ethAddress}
                  imageUrl={activeUser.profileImage}
                  height={60}
                  width={60}
                />
                <ProfileName
                  ethAddress={activeUser.ethAddress}
                  name={activeUser.name}
                  short={activeUser.name ? false : true}
                  className="font-bold text-2xl mt-10 mb-3"
                />
                {generateShortEthAddress(activeUser.ethAddress, 10)}
              </div>
            </div>
            <div className="col-span-3">
              {showEditProfile && isMe ? (
                <div className="flex items-center justify-center">
                  <div className="bg-grey-dark rounded-3xl p-16">
                    <EditProfileForm
                      user={activeUser}
                      setShowEditProfile={setShowEditProfile}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col m-16">
                  <div className="grid grid-cols-4">
                    <div className="flex flex-col items-center justify-center col-span-3">
                      <PorfileSocialBar
                        twitter={activeUser.twitter}
                        instagram={activeUser.instagram}
                        soundcloud={activeUser.soundcloud}
                        discord={activeUser.discord}
                        spotify={activeUser.spotify}
                        className="mb-24"
                      />
                      <div>{activeUser.description}</div>
                    </div>
                    {isMe && (
                      <div className="flex flex-col items-center justify-center col-span-1">
                        <Button
                          text="Edit Profile"
                          onClick={() => setShowEditProfile(!showEditProfile)}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mt-20">
                    <ProfileNftTabs createdNfts={createdNfts} />
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

  const createdNfts = await client.apolloClient.query({
    query: GET_NFTS,
    variables: {
      filter: { creatorEthAddress: ethAddress },
      limit: 100,
      skip: 0,
    },
  })

  return {
    props: {
      user: user.data.user,
      createdNfts: createdNfts.data.nfts,
      queryEthAddress: ethAddress,
    },
  }
}
