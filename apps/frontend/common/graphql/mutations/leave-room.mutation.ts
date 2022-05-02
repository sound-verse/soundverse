import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const LEAVE_ROOM = gql`
  ${ROOM_FRAGMENT}
  mutation leaveRoom($leaveRoomInput: LeaveRoomInput!) {
    leaveRoom(leaveRoomInput: $leaveRoomInput) {
      ...RoomFragment
    }
  }
`
