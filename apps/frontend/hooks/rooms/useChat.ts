import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { CREATE_CHAT_MESSAGE } from '../../common/graphql/mutations/create-chat-message.mutation'
import {
  CreateChatMessageInput,
  CreateChatMessageMutation,
  CreateChatMessageMutationVariables,
} from '../../common/graphql/schema'

export const useChat = () => {
  const [createChatMessageMutation] = useMutation<
    CreateChatMessageMutation,
    CreateChatMessageMutationVariables
  >(CREATE_CHAT_MESSAGE)

  const createChatMessage = useCallback(
    async (createChatMessageInput: CreateChatMessageInput) => {
      await createChatMessageMutation({ variables: { createChatMessageInput } })
    },
    []
  )

  return useMemo(
    () => ({
      createChatMessage,
    }),
    [createChatMessage]
  )
}
