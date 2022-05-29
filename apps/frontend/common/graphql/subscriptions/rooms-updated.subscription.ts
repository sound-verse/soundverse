import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const ROOMS_UPDATED = gql`
  ${ROOM_FRAGMENT}
  subscription roomsUpdated {
    roomsUpdated {
      ...RoomFragment
    }
  }
`
