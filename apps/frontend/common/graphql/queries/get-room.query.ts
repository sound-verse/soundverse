import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const GET_ROOM = gql`
  ${ROOM_FRAGMENT}
  query getRoom($roomFilter: RoomFilter!) {
    room(roomFilter: $roomFilter) {
      ...RoomFragment
    }
  }
`
