import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Nft, Room } from '../../common/graphql/schema.d'
import { useAuthContext } from '../../context/AuthContext'
import { useLeaveRoom } from '../../hooks/rooms/useLeaveRoom'
import Button from '../common/Button'
import { Chat } from './Chat'
import { Playlist } from './Playlist'
import { RoomUser } from './RoomUser'
import styles from './Room.module.css'
import cn from 'classnames'
import Image from 'next/image'
import { AnonUser } from './AnonUser'

type RoomProps = {
  room: Room
}

export const SoundverseRoom: FC<RoomProps> = ({ room }) => {
  const { leaveRoom } = useLeaveRoom()
  const router = useRouter()
  const { authUser } = useAuthContext()
  const [anonArray, setAnonArry] = useState([])

  const isHost = room.creator.id === authUser?.id

  const handleLeaveSoundverse = async () => {
    if (authUser?.id) {
      await leaveRoom({ roomId: room.id })
    }
    router.push('/soundverses')
  }

  useEffect(() => {
    const newAnonArray = new Array(room?.currentAnonymousUsers)
    newAnonArray.fill('')
    setAnonArry(newAnonArray)
  }, [room?.currentAnonymousUsers])


  return (
    <div className="flex justify-center relative overflow-hidden h-[85vh] flex-wrap lg:flex-nowrap">
      <div className="flex flex-col items-center justify-start">
        <div className="mb-5">
          <Button
            className={styles.closeButton}
            text={`${isHost ? '✌️ Close' : 'Leave'} this Soundverse ✌️`}
            type="ghost"
            onClick={handleLeaveSoundverse}
          />
        </div>
        <Playlist
          playlistItems={room.playlistItems}
          currentTrack={room.currentTrack}
          className="mt-5 hidden lg:block"
        />
      </div>
      <div className="flex flex-col ml-10 w-full xl:mr-[360px] text-sm h-screen">
        <div
          className={cn(
            'flex justify-center items-start w-full h-full mb-[205px] pb-[10px] overflow-hidden'
          )}
        >
          <div
            className={cn(
              'rounded-3xl bg-white p-8 flex flex-col w-full h-full overflow-x-auto',
              styles.boxShadow,
              styles.scrollbar
            )}
          >
            <div className="flex justify-between w-full">
              <div className="flex justify-between w-full">
                <div className="text-black text-xl font-semibold flex">
                  {room.name.length > 0
                    ? room.name
                    : `Soundverse #${room.id.substring(room.id.length - 4)}`}
                </div>
                <div className="flex justify-center items-center">
                  <div className="mr-2 text-base">
                    {room.activeUsers.length + room?.currentAnonymousUsers ?? 0}
                  </div>
                  <Image
                    src={'/img/speaker.svg'}
                    height={20}
                    width={20}
                    alt="Speaker symbol"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-start mt-10 pb-10">
              <RoomUser user={room.creator} />
            </div>
            <div className="text-xl">Listeners</div>
            <div className="flex flex-wrap justify-start mt-10">
              <>
                {room.activeUsers &&
                  room.activeUsers.map((user) => (
                    <RoomUser key={user.id} user={user} className="mr-2 mb-2" />
                  ))}
                {room?.currentAnonymousUsers &&
                  anonArray.map((array, key) => (
                    <AnonUser key={`anon-user-${key}`} className="mr-2 mb-2" />
                  ))}
              </>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[310px]">
        <Chat roomId={room.id} chat={room.chat} className="fixed -mt-6" />
      </div>
    </div>
  )
}
