import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const GET_ROOMS = gql`
  ${ROOM_FRAGMENT}
  query getRooms {
    rooms {
      rooms {
        ...RoomFragment
      }
    }
  }
`
