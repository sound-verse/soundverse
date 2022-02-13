import React, {
  FC,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  createContext,
} from 'react'

export enum PLAYER_STATUS {
  PLAYING = 'playing',
  PAUSED = 'paused',
}

export type Track = {
  trackName: string
  url: string
}

export type State = {
  currentTrack: Track
}

type CheckoutContextType = State & {
  setCurrentTrack: (track: Track) => void
}

type Action =
  | {
      type: 'SET_CURRENT_TRACK'
      track: Track
    }
  | { type: 'SET_VOLUME'; volume: number }

const initialState: State = {
  currentTrack: {} as Track,
}

export const AudioContext = createContext<State | any>(initialState)

AudioContext.displayName = 'AudioContext'

const audioReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return {
        ...state,
        currentTrack: action.track,
      }
    default:
      return state
  }
}

export const AudioProvider: FC = (props) => {
  const [state, dispatch] = useReducer(audioReducer, initialState)

  const setCurrentTrack = useCallback(
    (track: Track) => dispatch({ type: 'SET_CURRENT_TRACK', track }),
    [dispatch]
  )

  const currentTrack = useMemo(() => state.currentTrack, [state.currentTrack])

  const value = useMemo(
    () => ({
      currentTrack,
      setCurrentTrack,
    }),
    [currentTrack, setCurrentTrack]
  )

  return <AudioContext.Provider value={value} {...props} />
}

export const useAudioContext = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext<CheckoutContextType>(AudioContext)
  if (context === undefined) {
    throw new Error('useAudioContext must be used within a AudioProvider')
  }
  return context
}
