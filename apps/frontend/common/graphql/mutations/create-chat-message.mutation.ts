import { gql } from '@apollo/client'
import { ROOM_FRAGMENT } from '../fragments/room.fragment'

export const CREATE_CHAT_MESSAGE = gql`
  ${ROOM_FRAGMENT}
  mutation createChatMessage($createChatMessageInput: CreateChatMessageInput!) {
    createChatMessage(createChatMessageInput: $createChatMessageInput) {
      ...RoomFragment
    }
  }
`
