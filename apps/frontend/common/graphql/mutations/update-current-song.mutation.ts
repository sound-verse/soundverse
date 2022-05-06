import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const UPDATE_CURRENT_SONG = gql`
  ${ROOM_FRAGMENT}
  mutation updateCurrentSong($updateCurrentSongInput: UpdateCurrentSongInput!) {
    updateCurrentSong(updateCurrentSongInput: $updateCurrentSongInput) {
      ...RoomFragment
    }
  }
`
