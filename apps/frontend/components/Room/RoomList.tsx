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
    <div className="flex justify-between relative">
      {!rooms.length ? (
        <div className="flex mt-40 justify-center items-center ml-72 text-white text-1xl">
          No rooms active yet, stay tuned!
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="text-white font-bold text-2xl">Soundverses</div>
          {rooms.map((room) => (
            <RoomListElement room={room} key={room.id} />
          ))}
          <div className="h-[800px]"></div>
        </div>
      )}
      {masterRoom?.room?.chat && (
        <div className="absolute right-[360px]">
          <Chat
            roomId={''}
            chat={masterRoom.room.chat}
            className="fixed -mt-9"
          />
        </div>
      )}
    </div>
  )
}
