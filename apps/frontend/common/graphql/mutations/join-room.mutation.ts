import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const JOIN_ROOM = gql`
  ${ROOM_FRAGMENT}
  mutation joinRoom($joinRoomInput: JoinRoomInput!) {
    joinRoom(joinRoomInput: $joinRoomInput) {
      ...RoomFragment
    }
  }
`
