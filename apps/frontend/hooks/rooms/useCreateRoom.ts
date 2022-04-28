import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { CREATE_ROOM } from '../../common/graphql/mutations/create-room.mutation'
import {
  CreateRoomInput,
  CreateRoomMutation,
  CreateRoomMutationVariables,
} from '../../common/graphql/schema.d'

export const useCreateRoom = () => {
  const [createRoomMutation, { data: createRoomData }] = useMutation<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >(CREATE_ROOM)

  const createRoom = useCallback(async (createRoomInput: CreateRoomInput) => {
    await createRoomMutation({ variables: { createRoomInput } })
  }, [])

  return useMemo(
    () => ({
      createRoom,
    }),
    [createRoom]
  )
}
