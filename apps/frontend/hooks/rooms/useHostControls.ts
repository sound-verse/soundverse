import { useMutation } from '@apollo/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { NEXT_SONG } from '../../common/graphql/mutations/next-song.mutation'
import { PREV_SONG } from '../../common/graphql/mutations/prev-song.mutation'
import { UPDATE_CURRENT_SONG } from '../../common/graphql/mutations/update-current-song.mutation'
import {
  NextSongMutation,
  NextSongMutationVariables,
  PrevSongMutation,
  PrevSongMutationVariables,
  Room,
  UpdateCurrentSongInput,
  UpdateCurrentSongMutation,
  UpdateCurrentSongMutationVariables,
} from '../../common/graphql/schema.d'

export const useHostControls = () => {
  const [playNextSongMutation, { data: playNextSongData }] = useMutation<
    NextSongMutation,
    NextSongMutationVariables
  >(NEXT_SONG)
  const [playPrevSongMutation, { data: playPrevSongData }] = useMutation<
    PrevSongMutation,
    PrevSongMutationVariables
  >(PREV_SONG)
  const [updateCurrentSongMutation, { data: updateCurrentSongData }] =
    useMutation<UpdateCurrentSongMutation, UpdateCurrentSongMutationVariables>(
      UPDATE_CURRENT_SONG
    )

  const playNextSong = useCallback(() => {
    playNextSongMutation()
  }, [])

  const playPrevSong = useCallback(() => {
    playPrevSongMutation()
  }, [])

  const updateCurrentSong = useCallback(
    (updateCurrentSongInput: UpdateCurrentSongInput) => {
      updateCurrentSongMutation({
        variables: { updateCurrentSongInput },
        fetchPolicy: 'no-cache',
      })
    },
    []
  )

  return useMemo(
    () => ({ playNextSong, playPrevSong, updateCurrentSong }),
    [playNextSong, playPrevSong, updateCurrentSong]
  )
}
