import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { LEAVE_ROOM } from '../../common/graphql/mutations/leave-room.mutation'
import {
  LeaveRoomInput,
  LeaveRoomMutation,
  LeaveRoomMutationVariables,
} from '../../common/graphql/schema.d'
import { useAuthContext } from '../../context/AuthContext'

export const useLeaveRoom = () => {
  const [leaveRoomMutation, { data: leaveRoomData }] = useMutation<
    LeaveRoomMutation,
    LeaveRoomMutationVariables
  >(LEAVE_ROOM, { fetchPolicy: 'no-cache' })
  const { jwtToken } = useAuthContext()

  const leaveRoom = useCallback(async (leaveRoomInput: LeaveRoomInput) => {
    if (!jwtToken) {
      return
    }
    await leaveRoomMutation({ variables: { leaveRoomInput } })
  }, [])

  return useMemo(
    () => ({
      leaveRoom,
    }),
    [leaveRoom]
  )
}
