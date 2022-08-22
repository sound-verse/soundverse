import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout'
import { useAuthContext } from '../../context/AuthContext'
import {
  GetUserNftsQuery,
  GetUserNftsQueryVariables,
  Nft,
  NftType,
} from '../../common/graphql/schema.d'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_USER_NFTS } from '../../common/graphql/queries/get-user-nfts.query'
import { Heading } from '../../components/common/Heading'
import { ModuleBg } from '../../components/common/ModuleBg'
import { MiniNft } from '../../components/common/MiniNft'
import Button from '../../components/common/Button'
import { useCreateRoom } from '../../hooks/rooms/useCreateRoom'
import toast from 'react-hot-toast'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import { useRouter } from 'next/router'
import SoundCard from '../../components/marketplace/SoundCard'
import cn from 'classnames'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './Index.module.css'

export default function Launch() {
  const { authUser } = useAuthContext()
  const [userLicenseNfts, setLicenseNfts] = useState<Nft[]>([])
  const [userMasterNfts, setMasterNfts] = useState<Nft[]>([])
  const [selectedNfts, setSelectedNfts] = useState<
    { nft: Nft; nftType: NftType }[]
  >([])
  const { createRoom, newRoom } = useCreateRoom()
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const router = useRouter()
  const [selectedMasterSlider, setSelectedMasterSlider] = useState(true)

  const hasNfts = userLicenseNfts?.length > 0 || userMasterNfts?.length > 0

  useEffect(() => {
    if (!newRoom) {
      return
    }
    router.push(`soundverses/${newRoom.id}`)
  }, [newRoom])

  const deduplicateNfts = (nfts: Nft[]) => {
    const nftIds = []
    const uniqueUserNfts = nfts.filter((nft) => {
      const isDuplicate = nftIds.find((id) => id === nft.id)

      if (!isDuplicate) {
        nftIds.push(nft.id)
        return true
      }
    })

    return uniqueUserNfts
  }

  const handleClick = (nft: Nft, nftType: NftType) => {
    const foundNft = selectedNfts.find(
      (selectedNft) =>
        selectedNft.nft.id === nft.id && selectedNft.nftType === nftType
    )

    if (foundNft) {
      setSelectedNfts(
        selectedNfts.filter(
          (selectedNft) =>
            selectedNft.nft.id !== foundNft.nft.id ||
            selectedNft.nftType !== nftType
        )
      )
    } else {
      setSelectedNfts([...selectedNfts, { nft, nftType }])
    }
  }

  const handleCreateRoom = async (roomName) => {
    const playlistItems = selectedNfts.map((selectedNft) => ({
      nftId: selectedNft.nft.id,
      nftType: selectedNft.nftType,
    }))
    try {
      setModalLoading(true)
      await createRoom({ 
        playlistItems: playlistItems,
        name: roomName,
       })
      setModalLoading(false)
      setSelectedNfts([])
    } catch {
      toast.error('Could not create room')
      setModalLoading(false)
    }
  }

  const [getUserNfts, { data, loading: libraryLoading, error }] = useLazyQuery<
    GetUserNftsQuery,
    GetUserNftsQueryVariables
  >(GET_USER_NFTS)

  useEffect(() => {
    if (!authUser) {
      setLicenseNfts(null)
      setMasterNfts(null)
      return
    }
    getUserNfts()
  }, [authUser, getUserNfts])

  useEffect(() => {
    if (!data) {
      return
    }
    const userLicenseNfts = deduplicateNfts([...data.userNfts.ownedLicenseNfts])

    const userMasterNfts = deduplicateNfts([...data.userNfts.ownedMasterNfts])

    setLicenseNfts(userLicenseNfts)
    setMasterNfts(userMasterNfts)
  }, [data])

  const initialValues = {
    name: "Soundverse"
  }

  return (
    <div>
      <Head>
        <title>Launch your Soundverse</title>
      </Head>
      <Layout>
        {!authUser && !libraryLoading ? (
          <div className="flex items-center justify-center h-screen -mt-24 text-black text-1xl">
            Login with your wallet to see this page.
          </div>
        ) : !hasNfts ? (
          <div className="flex items-center justify-center h-screen -mt-24 text-black text-1xl">
            You have not collected any music NFTs.
          </div>
        ) : (
          <main className="mx-auto flex flex-wrap items-start justify-center  text-black">
            <div className="flex flex-col mr-10">

              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateRoom}
              >
                <Form>
                  <div className="text-black font-bold mt-10 text-sm">
                    Soundverse Name
                  </div>
                  <div className="mt-3">
                      <Field
                        id="name"
                        name="name"
                        placeholder="Soundverse"
                        className="outline-none bg-white text-black text-sm"
                      />
                      <div className="border-t-2 w-full mt-2 border-grey-medium opacity-50"></div>
                      <div className="text-grey-light mt-2 text-xs">
                        max. 30 characters
                      </div>
                      <div className={styles.error}>
                        <ErrorMessage name="name" />
                      </div>
                      <button
                        className="text-white cursor-pointer rounded-full bg-grey-medium px-24 py-3 ml-auto mt-10 font-bold text-sm"
                        type="submit"
                      >
                        Launch your room now
                      </button>
                      <Button
                        className="flex mx-auto"
                        text="Launch your room now"
                        type="normal"
                        onClick={handleCreateRoom}
                      />
                    </div>
                </Form>
              </Formik>
              
              <ModuleBg className="mt-10 mb-10">
                <div className="mb-12 text-black text-center text-xl font-bold">
                  Song Queue
                </div>
                <div className="rounded">
                  <div className="flex-col mt-6 cursor-pointer">
                    {selectedNfts &&
                      selectedNfts.map((nft, key) => {
                        return (
                          <div
                            key={key}
                            className="border-b pb-2 border-grey-medium mt-2"
                            onClick={() => handleClick(nft.nft, nft.nftType)}
                          >
                            <MiniNft nft={nft.nft} nftType={nft.nftType} />
                          </div>
                        )
                      })}
                  </div>
                  <div className="text-xs text-grey-medium text-center mt-12">
                    Click any song to add here
                  </div>
                </div>
              </ModuleBg>
            </div>
            <div className="">
              <div className="flex mb-10 select-none">
                <div
                  className={cn(
                    'bg-white rounded text-black px-8 py-1 shadow-lg cursor-pointer',
                    selectedMasterSlider ? ' !bg-grey-medium !text-white ' : ''
                  )}
                  onClick={() => setSelectedMasterSlider(!selectedMasterSlider)}
                >
                  Masters
                </div>

                <div
                  className={cn(
                    'bg-white rounded text-black px-8 py-1 shadow-lg cursor-pointer',
                    !selectedMasterSlider ? ' !bg-grey-medium !text-white ' : ''
                  )}
                  onClick={() => setSelectedMasterSlider(!selectedMasterSlider)}
                >
                  Licenses
                </div>
              </div>
              <div className="grid xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-10">
                {selectedMasterSlider &&
                  userMasterNfts &&
                  userMasterNfts.map((nft, key) => {
                    if (!nft.filePictureUrl) {
                      return
                    }

                    const isSelected = selectedNfts.find(
                      (selectedNft) =>
                        selectedNft.nft.id === nft.id &&
                        selectedNft.nftType === NftType.Master
                    )

                    return (
                      <div key={`soundcard-wrapper-${key}`}>
                        <div
                          className="spacer"
                          onClick={() => handleClick(nft, NftType.Master)}
                        >
                          <SoundCard
                            nft={nft}
                            nftType={NftType.Master}
                            key={key}
                            activeLinks={false}
                            className={
                              isSelected ? 'opacity-50' : 'opacity-100'
                            }
                          />
                        </div>
                      </div>
                    )
                  })}
                {!selectedMasterSlider &&
                  userLicenseNfts &&
                  userLicenseNfts.map((nft, key) => {
                    if (!nft.filePictureUrl) {
                      return
                    }

                    const isSelected = selectedNfts.find(
                      (selectedNft) =>
                        selectedNft.nft.id === nft.id &&
                        selectedNft.nftType === NftType.License
                    )

                    return (
                      <div key={`soundcard-wrapper-${key}`}>
                        <div
                          className="spacer"
                          onClick={() => handleClick(nft, NftType.License)}
                        >
                          <SoundCard
                            nft={nft}
                            nftType={NftType.License}
                            key={key}
                            activeLinks={false}
                            className={
                              isSelected ? 'opacity-50' : 'opacity-100'
                            }
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </main>
        )}
      </Layout>{' '}
      <Modal
        isOpen={modalLoading}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10">
              Creating your room...
            </div>
            <Bars color="#7A64FF" height={80} width={80} />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={libraryLoading}
        contentLabel="onRequestClose Example"
        className="flex justify-center items-center h-full"
      >
        <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
          <div className="h-full w-full justify-center items-center flex flex-col">
            <div className="text-white text-3xl font-bold mb-10">
              Loading your library
            </div>
            <Bars color="#7A64FF" height={80} width={80} />
          </div>
        </div>
      </Modal>
    </div>
  )
}
