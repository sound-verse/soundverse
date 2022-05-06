import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const REVIVE_ROOM = gql`
  ${ROOM_FRAGMENT}
  mutation reviveRoom {
    reviveRoom {
      ...RoomFragment
    }
  }
`
