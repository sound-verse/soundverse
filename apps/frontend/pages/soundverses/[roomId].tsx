import { useQuery } from '@apollo/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GET_ROOM } from '../../common/graphql/queries/get-room.query'
import {
  GetRoomQuery,
  GetRoomQueryVariables,
  NftType,
  Room,
} from '../../common/graphql/schema.d'
import Layout from '../../components/layout'
import { SoundverseRoom } from '../../components/Room/Room'
import Modal from 'react-modal'
import { Bars } from 'react-loader-spinner'
import Custom404 from '../404'
import { ROOM_UPDATED } from '../../common/graphql/subscriptions/room-updated.subscription'
import { useAuthContext } from '../../context/AuthContext'
import { Track, useAudioContext } from '../../context/AudioContext'
import Button from '../../components/common/Button'
import { useJoinRoom } from '../../hooks/rooms/useJoinRoom'
import { useLeaveRoom } from '../../hooks/rooms/useLeaveRoom'

export default function Soundverse() {
  const router = useRouter()
  const [room, setRoom] = useState<Room>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { authUser } = useAuthContext()
  const { roomId } = router.query
  const {
    data: roomData,
    loading: roomDataLoading,
    called: roomQueryCalled,
    error: roomError,
    subscribeToMore,
    fetchMore,
  } = useQuery<GetRoomQuery, GetRoomQueryVariables>(GET_ROOM, {
    variables: {
      roomFilter: { id: roomId?.toString() ?? '' },
    },
  })

  const { setCurrentTrack, play, pause, setAudio, currentTrack } =
    useAudioContext()
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false)
  const { joinRoom } = useJoinRoom()
  const { leaveRoom } = useLeaveRoom()

  const isHost = roomData?.room?.creator?.id === (authUser?.id ?? '')

  const playCurrentTrack = async () => {
    if (!room.currentTrack) {
      return
    }
    const nft = room.currentTrack?.nft
    const nftType = room.currentTrack?.nftType
    const contractAddress =
      nftType === NftType.Master
        ? nft.masterContractAddress
        : nft.licenseContractAddress
    setCurrentTrack({
      trackName: nft.metadata.name,
      currentPosition: room.currentTrack?.currentPosition ?? 0,
      creatorName: nft.creator.name,
      trackPictureUrl: nft.filePictureUrl,
      creatorEthAddress: nft.creator.ethAddress,
      id: nft.id,
      contractAddress,
      playOnLoad: true,
      nftType,
      isRoomPlayer: true,
      playTime: room.currentTrack?.nft.trackDuration,
    })
    await setAudio(nft.fileUrl, nft.soundWave)
    play()
  }

  const handleJoinRoom = () => {
    if (authUser?.id) {
      joinRoom({ roomId: room.id })
    }
    playCurrentTrack()
    setShowWelcomeModal(false)
  }

  useEffect(() => {
    return () => {
      setCurrentTrack({
        visible: false,
      })
      pause()
    }
  }, [])

  useEffect(() => {
    if (!room?.id || !authUser) {
      return
    }
    joinRoom({ roomId: room.id })
    return () => {
      leaveRoom({ roomId: room.id })
    }
  }, [authUser, room?.id])

  useEffect(() => {
    if (!room) {
      return
    }
    if (!showWelcomeModal) {
      if (
        room.currentTrack.nft.id !== currentTrack.id ||
        (room.currentTrack.nft.id === currentTrack.id &&
          currentTrack.nftType !== room.currentTrack.nftType)
      ) {
        playCurrentTrack()
      }
    }
  }, [room, showWelcomeModal])

  useEffect(() => {
    if (!roomId) {
      return
    }
    setShowWelcomeModal(true)
    setLoading(true)
    subscribeToMore({
      document: ROOM_UPDATED,
      variables: { roomId: roomId.toString(), userId: authUser?.id },
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (subscriptionData.data.roomUpdated) {
          return { room: subscriptionData.data.roomUpdated }
        } else {
          fetchMore({ variables: { roomFilter: { id: roomId.toString() } } })
        }
        return prev
      },
    })
  }, [roomId, authUser])

  useEffect(() => {
    if (!roomData?.room) {
      return
    }
    if (!roomData.room.active) {
      router.push('/soundverses/room-closed')
      return
    }
    setRoom(roomData.room)
    setLoading(false)
  }, [roomData, router])

  useEffect(() => {
    if (loading === false && roomError) {
      router.push('/soundverses/room-closed')
    }
  }, [loading, roomError, router])

  Modal.setAppElement('#__next')

  if (!room && !roomDataLoading && roomId && roomQueryCalled) {
    return <Custom404 />
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'main'
      ? 'https://app.soundverse.io'
      : 'https://testflight.soundverse.io'

  return (
    <div>
      <Head>
        <title>Soundverse Room</title>
        <meta
          name="description"
          content="Join rooms to socialize and discover the hottest music NFT collection!"
        />
        <meta property="og:title" content="Soundverse Room" />
        <meta
          property="og:description"
          content="Join rooms to socialize and discover the hottest music NFT collection!"
        />
        <meta property="og:url" content={`${baseUrl}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${baseUrl}/img/metadata/soundverse_room.png`}
        />
      </Head>

      <Layout>
        <div className="w-full h-full">
          {room && <SoundverseRoom room={room} />}
        </div>
        <Modal
          isOpen={loading}
          className="flex justify-center items-center h-full backdrop-blur-sm"
        >
          <div className="w-5/6 md:w-2/3 lg:w-1/2 h-1/2 rounded-3xl p-10 bg-white drop-shadow-2xl flex flex-col justify-between items-center">
            <div className="h-full w-full justify-center items-center flex flex-col">
              <div className="text-black text-3xl font-bold mb-10">
                Loading soundverse...
              </div>
              <Bars color="black" height={80} width={80} />
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={showWelcomeModal}
          className="flex justify-center items-center h-full"
        >
          <div className="w-5/6 md:w-2/3 lg:w-1/2 h-1/2 rounded-3xl p-10 bg-white drop-shadow-2xl flex flex-col justify-between items-center">
            <div className="h-full w-full justify-center items-center flex flex-col">
              <div className="text-black text-xl font-bold mb-10">
                {!isHost
                  ? `Welcome to the room ${
                      room?.name?.length > 0
                        ? room.name
                        : `#${room?.id?.substring(room?.id?.length - 4)}`
                    }`
                  : 'Welcome back host.'}
              </div>
              <Button
                text={'Join Channel'}
                onClick={handleJoinRoom}
                className="!text-base !px-10 py-5 bg-gradient-to-l from-[#1400FF] to-[#0089FF]"
              />
            </div>
          </div>
        </Modal>
      </Layout>
    </div>
  )
}
