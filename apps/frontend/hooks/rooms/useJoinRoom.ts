import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { JOIN_ROOM } from '../../common/graphql/mutations/join-room.mutation'
import {
  JoinRoomInput,
  JoinRoomMutation,
  JoinRoomMutationVariables,
} from '../../common/graphql/schema.d'

export const useJoinRoom = () => {
  const [joinRoomMutation, { data: joinRoomData }] = useMutation<
    JoinRoomMutation,
    JoinRoomMutationVariables
  >(JOIN_ROOM, {fetchPolicy: 'no-cache'})

  const joinRoom = useCallback(async (joinRoomInput: JoinRoomInput) => {
    await joinRoomMutation({ variables: { joinRoomInput } })
  }, [])

  return useMemo(
    () => ({
      joinRoom,
    }),
    [joinRoom]
  )
}
