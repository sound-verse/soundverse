import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { GET_ROOM } from '../../common/graphql/queries/get-room.query'
import {
  GetRoomQuery,
  GetRoomQueryVariables,
  Nft,
  Room,
} from '../../common/graphql/schema.d'
import { ModuleBg } from '../common/ModuleBg'
import { Chat } from './Chat'
import { RoomListElement } from './RoomListElement'

type RoomListProps = {
  rooms: Room[]
}

export const RoomList: FC<RoomListProps> = ({ rooms }) => {
  const { data: masterRoom } = useQuery<GetRoomQuery, GetRoomQueryVariables>(
    GET_ROOM,
    {
      pollInterval: 1000,
      variables: { roomFilter: { isMasterRoom: true } },
    }
  )

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="text-white font-bold text-2xl">Soundverses</div>
        {rooms.map((room) => (
          <RoomListElement room={room} key={room.id} />
        ))}
      </div>
      {masterRoom?.room && (
        <Chat roomId={''} chat={masterRoom.room.chat} className="mt-12 ml-10" />
      )}
    </div>
  )
}
