import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const NEXT_SONG = gql`
  ${ROOM_FRAGMENT}
  mutation nextSong {
    nextSong {
      ...RoomFragment
    }
  }
`
