import { useRouter } from 'next/router'
import { FC } from 'react'
import { Nft, Room } from '../../common/graphql/schema.d'
import { useAuthContext } from '../../context/AuthContext'
import { useLeaveRoom } from '../../hooks/rooms/useLeaveRoom'
import Button from '../common/Button'
import { ProfileName } from '../profile'
import { HostControls } from './HostControls'
import { Playlist } from './Playlist'
import { RoomListElement } from './RoomListElement'
import { RoomUser } from './RoomUser'

type RoomProps = {
  room: Room
}

export const SoundverseRoom: FC<RoomProps> = ({ room }) => {
  const { leaveRoom } = useLeaveRoom()
  const router = useRouter()
  const { authUser } = useAuthContext()

  const isHost = room.creator.id === authUser.id

  const handleLeaveSoundverse = async () => {
    await leaveRoom({ roomId: room.id })
    router.push('/soundverses')
  }
  return (
    <div className="flex w-full">
      <Playlist
        playlistItems={room.playlistItems}
        currentTrack={room.currentTrack}
      />
      <div className="flex flex-col mr-10 w-full">
        <div className="mb-10">
          <Button
            text={`${isHost ? 'Close' : 'Leave'} this soundverse`}
            type="ghost"
            onClick={handleLeaveSoundverse}
          />
        </div>
        <div className="text-white font-bold text-xl">
          Soundverse #{room.id.substring(room.id.length - 4)}
        </div>
        <div className="rounded-3xl bg-grey-dark p-5 mt-10 flex flex-col">
          <div className="flex justify-between">
            <div className="text-grey-light flex">
              Hosted by
              {isHost ? (
                ' you'
              ) : (
                <ProfileName
                  ethAddress={room.creator.ethAddress}
                  name={room.creator.name}
                  short={true}
                  className="ml-2"
                />
              )}
            </div>
            <div className="text-white">{room.activeUsers.length}</div>
          </div>
          {isHost && <HostControls room={room} className="mt-2" />}
          <div className="flex items-start mt-16 border-b pb-5 border-grey-medium">
            <RoomUser user={room.creator} />
          </div>
          <div className="flex flex-wrap justify-start mt-10">
            {room.activeUsers &&
              room.activeUsers.map((user) => (
                <RoomUser key={user.id} user={user} className="mr-2" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
