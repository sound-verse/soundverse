import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { REVIVE_ROOM } from '../../common/graphql/mutations/revive-room.mutation'
import {
  ReviveRoomMutation,
  ReviveRoomMutationVariables,
} from '../../common/graphql/schema'

export const useReviveRoom = () => {
  const [reviveRoomMutation, { data: reviveRoomData }] = useMutation<
    ReviveRoomMutation,
    ReviveRoomMutationVariables
  >(REVIVE_ROOM)

  const reviveRoom = useCallback(() => {
    reviveRoomMutation()
  }, [])

  return useMemo(
    () => ({
      reviveRoom,
    }),
    [reviveRoom]
  )
}
