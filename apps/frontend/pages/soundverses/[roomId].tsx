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
import { useReviveRoom } from '../../hooks/rooms/useReviveRoom'
import { useAuthContext } from '../../context/AuthContext'
import { Track, useAudioContext } from '../../context/AudioContext'
import { useHostControls } from '../../hooks/rooms/useHostControls'
import Button from '../../components/common/Button'
import { useJoinRoom } from '../../hooks/rooms/useJoinRoom'

export default function Soundverse() {
  const router = useRouter()
  const [room, setRoom] = useState<Room>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { authUser } = useAuthContext()
  const [roomDataSub, setRoomDataSub] = useState<Room>(null)
  const { reviveRoom } = useReviveRoom()
  const { roomId } = router.query
  const {
    data: roomData,
    loading: roomDataLoading,
    called: roomQueryCalled,
    error: roomError,
    subscribeToMore,
  } = useQuery<GetRoomQuery, GetRoomQueryVariables>(GET_ROOM, {
    variables: { roomFilter: { id: roomId?.toString() ?? '' } },
  })

  const { setCurrentTrack } = useAudioContext()
  const { playNextSong, updateCurrentSong } = useHostControls()
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false)
  const { joinRoom } = useJoinRoom()

  const isHost = roomData?.room?.creator?.id === (authUser?.id ?? '')

  const playCurrentTrack = () => {
    if (room.currentTrack) {
      const nft = room.currentTrack?.nft
      const nftType = room.currentTrack?.nftType
      const contractAddress =
        nftType === NftType.Master
          ? nft.masterContractAddress
          : nft.licenseContractAddress

      setCurrentTrack({
        url: nft.fileUrl,
        trackName: nft.metadata.name,
        currentPosition: room.currentTrack?.currentPosition ?? 0,
        creatorName: nft.creator.name,
        trackPictureUrl: nft.filePictureUrl,
        creatorEthAddress: nft.creator.ethAddress,
        id: nft.id,
        contractAddress,
        play: true,
        nftType,
        onTrackFinish: isHost ? playNextSong : () => {},
        onTrackProgress: isHost ? updateCurrentSong : ({}) => {},
        isRoomPlayer: true,
      })
    }
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
        url: '',
        visible: false,
        isPlaying: false,
      })
    }
  }, [])

  useEffect(() => {
    if (!isHost) {
      return
    }
    const reviveInterval = setInterval(() => {
      reviveRoom()
    }, 30000)
    return () => {
      clearInterval(reviveInterval)
    }
  }, [isHost])

  useEffect(() => {
    if (!room) {
      return
    }
    if (!showWelcomeModal) {
      playCurrentTrack()
    }
  }, [room])

  useEffect(() => {
    if (!roomId) {
      return
    }
    setShowWelcomeModal(true)
    setLoading(true)
    subscribeToMore({
      document: ROOM_UPDATED,
      variables: { roomId: roomId.toString() },
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (subscriptionData.data.roomUpdated) {
          return { room: subscriptionData.data.roomUpdated }
        }
        return prev
      },
    })
  }, [roomId])

  useEffect(() => {
    if (!roomData?.room) {
      return
    }
    setRoom(roomData.room)
    setLoading(false)
  }, [roomData])

  useEffect(() => {
    if (loading === false && roomError) {
      router.push('/soundverses/room-closed')
    }
  }, [loading, roomError])

  Modal.setAppElement('#__next')

  if (!room && !roomDataLoading && roomId && roomQueryCalled) {
    return <Custom404 />
  }

  return (
    <div>
      <Head>
        <title>Soundverse </title>
      </Head>

      <Layout>
        <div className="w-full h-full">
          {room && <SoundverseRoom room={room} />}
        </div>
        <Modal
          isOpen={loading}
          className="flex justify-center items-center h-full backdrop-blur-sm"
        >
          <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
            <div className="h-full w-full justify-center items-center flex flex-col">
              <div className="text-white text-3xl font-bold mb-10">
                Loading soundverse...
              </div>
              <Bars color="#7A64FF" height={80} width={80} />
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={showWelcomeModal}
          className="flex justify-center items-center h-full"
        >
          <div className="w-1/2 h-1/2 rounded-3xl p-10 bg-grey-dark flex flex-col justify-between items-center">
            <div className="h-full w-full justify-center items-center flex flex-col">
              <div className="text-white text-xl font-bold mb-10">
                {!isHost
                  ? `Welcome to the room #${room?.id?.substring(
                      room?.id?.length - 4
                    )}`
                  : "Welcome back host. Don't forget that the channel will close, if your not active on it."}
              </div>
              <Button
                text={`${isHost ? 'Understood' : 'Click here to join'}`}
                type="purple"
                onClick={handleJoinRoom}
                className="!text-base !px-10 py-5"
              />
            </div>
          </div>
        </Modal>
      </Layout>
    </div>
  )
}
