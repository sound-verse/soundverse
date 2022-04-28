import { FC } from 'react'
import { Nft, Room } from '../../common/graphql/schema.d'
import { ModuleBg } from '../common/ModuleBg'
import { RoomListElement } from './RoomListElement'

type RoomListProps = {
  rooms: Room[]
}

export const RoomList: FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="flex flex-col ">
      <div className="text-white font-bold text-2xl">Soundverses</div>
      {rooms.map((room) => (
        <RoomListElement room={room} key={room.id} />
      ))}
    </div>
  )
}
