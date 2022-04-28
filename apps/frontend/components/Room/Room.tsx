import { FC } from 'react'
import { Nft, Room } from '../../common/graphql/schema.d'
import Button from '../common/Button'
import { Playlist } from './Playlist'
import { RoomListElement } from './RoomListElement'

type RoomProps = {
  room: Room
}

export const RoomList: FC<RoomProps> = ({ room }) => {
  return (
    <div className="flex w-full">
      <Playlist
        playlistItems={room.playlistItems}
        currentTrack={room.currentTrack}
      />
      <div className="flex flex-col">
        <div>
          <Button text="Leave this soundverse" type="ghost" />
        </div>
        <div className="text-white font-bold text-xl">
          Soundverse #{room.id.substring(room.id.length - 4)}
        </div>
      </div>
    </div>
  )
}
