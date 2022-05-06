import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const ROOM_UPDATED = gql`
  ${ROOM_FRAGMENT}
  subscription roomUpdated($roomId: String!) {
    roomUpdated(roomId: $roomId) {
      ...RoomFragment
    }
  }
`
