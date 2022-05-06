import { useMutation } from '@apollo/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CREATE_ROOM } from '../../common/graphql/mutations/create-room.mutation'
import {
  CreateRoomInput,
  CreateRoomMutation,
  CreateRoomMutationVariables,
  Room,
} from '../../common/graphql/schema.d'

export const useCreateRoom = () => {
  const [createRoomMutation, { data: createRoomData }] = useMutation<
    CreateRoomMutation,
    CreateRoomMutationVariables
  >(CREATE_ROOM)

  const [newRoom, setNewRoom] = useState<Room>(undefined)

  useEffect(() => {
    if (!createRoomData) {
      return
    }
    setNewRoom(createRoomData.createRoom)
  }, [createRoomData])

  const createRoom = useCallback(async (createRoomInput: CreateRoomInput) => {
    await createRoomMutation({ variables: { createRoomInput } })
  }, [])

  return useMemo(
    () => ({
      createRoom,
      newRoom,
    }),
    [createRoom, newRoom]
  )
}
