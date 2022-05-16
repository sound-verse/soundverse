import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import toast from 'react-hot-toast'
import { Room } from '../../common/graphql/schema'
import { useAuthContext } from '../../context/AuthContext'
import { useJoinRoom } from '../../hooks/rooms/useJoinRoom'
import Button from '../common/Button'
import SoundCard from '../marketplace/SoundCard'
import { ProfileImage, ProfileName } from '../profile'
import styles from './RoomListElement.module.css'

type RoomListElementProps = {
  room: Room
}

export const RoomListElement: FC<RoomListElementProps> = ({ room }) => {
  const { joinRoom } = useJoinRoom()
  const router = useRouter()
  const { authUser } = useAuthContext()

  const handleEnterSoundverse = async () => {
    try {
      await joinRoom({ roomId: room.id })
    } catch {
      toast.error('The room seems to be offline, try another one!')
      return
    }

    router.push({
      pathname: `/soundverses/${room.id}`,
    })
  }
  return (
    <div className={styles.roomWrapper}>
      <div className="grid grid-cols-12 h-full w-full">
        <div className="col-span-2 ml-2 mt-2">
          <SoundCard
            nft={room.currentTrack?.nft ?? room.playlistItems[0].nft}
            nftType={
              room.currentTrack?.nftType ?? room.playlistItems[0].nftType
            }
            className="scale-[70%] -mt-10 -ml-6 -mb-20"
          ></SoundCard>
        </div>
        <div className="col-span-6">
          <div className="flex flex-col mt-10">
            <div className="flex">
              <div className="font-bold text-sm text-white">
                Soundverse #{room.id.substring(room.id.length - 4)}
              </div>
              <div className="flex text-sm text-grey-light ml-2 mb-5">
                <div className="mr-2">hosted by</div>
                <ProfileName
                  ethAddress={room.creator.ethAddress}
                  name={room.creator.name}
                  short={true}
                />
              </div>
            </div>
            <div className="flex">
              {room.activeUsers.map((user) => (
                <ProfileImage
                  ethAddress={user.ethAddress}
                  imageUrl={user.profileImage}
                  height={20}
                  width={20}
                  key={user.id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col h-full">
            <Button
              text={`${
                authUser?.id
                  ? 'Enter the Soundverse'
                  : 'Login to enter the Soundverse'
              }`}
              type={`${authUser?.id ? 'purple' : 'disabled'}`}
              className={styles.enterButton}
              onClick={handleEnterSoundverse}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
