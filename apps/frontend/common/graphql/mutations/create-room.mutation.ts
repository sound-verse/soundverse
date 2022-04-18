import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const CREATE_ROOM = gql`
  ${ROOM_FRAGMENT}
  mutation createRoom($createRoomInput: CreateRoomInput!) {
    createRoom(createRoomInput: $createRoomInput) {
      ...RoomFragment
    }
  }
`
