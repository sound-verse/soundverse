import { useQuery } from '@apollo/client'
import { FC, useEffect } from 'react'
import { GET_ROOM } from '../../common/graphql/queries/get-room.query'
import {
  GetRoomQuery,
  GetRoomQueryVariables,
  Nft,
  Room,
} from '../../common/graphql/schema.d'
import { ROOM_UPDATED } from '../../common/graphql/subscriptions/room-updated.subscription'
import { ModuleBg } from '../common/ModuleBg'
import { Chat } from './Chat'
import { RoomListElement } from './RoomListElement'

type RoomListProps = {
  rooms: Room[]
}

export const RoomList: FC<RoomListProps> = ({ rooms }) => {
  const { data: masterRoom, subscribeToMore } = useQuery<
    GetRoomQuery,
    GetRoomQueryVariables
  >(GET_ROOM, { variables: { roomFilter: { isMasterRoom: true } } })

  useEffect(() => {
    if (!masterRoom?.room) {
      return
    }
    subscribeToMore({
      document: ROOM_UPDATED,
      variables: { roomId: masterRoom.room.id },
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (subscriptionData.data.roomUpdated) {
          return { room: subscriptionData.data.roomUpdated }
        }
        return prev
      },
    })
  }, [masterRoom])

  return (
    <div className="flex justify-between relative">
      {!rooms.length ? (
        <div className="flex mt-40 justify-center items-center ml-72 text-white text-1xl">
          No rooms active yet, stay tuned!
        </div>
      ) : (
        <div className="flex flex-col w-full mr-96">
          <div className="text-white font-bold text-2xl">Soundverses</div>
          {rooms.map((room) => (
            <RoomListElement room={room} key={room.id} />
          ))}
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
