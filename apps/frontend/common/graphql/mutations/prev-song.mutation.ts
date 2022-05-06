import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const PREV_SONG = gql`
  ${ROOM_FRAGMENT}
  mutation prevSong {
    prevSong {
      ...RoomFragment
    }
  }
`
