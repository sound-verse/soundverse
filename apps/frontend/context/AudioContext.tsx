import React, {
  FC,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  createContext,
  useRef,
  useEffect,
} from 'react'
import { NftType } from '../common/graphql/schema.d'
import useWindowDimensions from '../hooks/useWindowDimensions'

export enum PLAYER_STATUS {
  PLAYING = 'playing',
  PAUSED = 'paused',
}

export type Track = {
  id?: string
  contractAddress?: string
  trackName?: string
  url?: string
  waveForm?: number[]
  currentPosition?: number
  creatorName?: string
  trackPictureUrl?: string
  creatorEthAddress?: string
  visible?: boolean
  mute?: boolean
  volume?: number
  play?: boolean
  isLoading?: boolean
  playTime?: number
  isPlaying?: boolean
  nftType?: NftType
  restart?: boolean
  isRoomPlayer?: boolean
  waveDiv?: any
}

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: 'grey',
  progressColor: 'black',
  cursorColor: 'black',
  height: 50,
  pixelRatio: 1,
  normalize: true,
  barWidth: 1,
  barGap: 1,
  backend: 'MediaElement',
  responsive: true,
})

export type State = {
  currentTrack: Track
}

type AudioContextType = State & {
  setCurrentTrack: (track: Track) => void
  setAudio: (audioUrl: string) => void
  play: () => void
}

type Action =
  | {
      type: 'SET_CURRENT_TRACK'
      track: Track
    }
  | { type: 'SET_VOLUME'; volume: number }
  | {
      type: 'SET_AUDIO'
      audioUrl: string
    }
  | {
      type: 'PLAY'
    }

const initialState: State = {
  currentTrack: {
    id: '',
    contractAddress: '',
    trackName: '',
    url: '',
    waveForm: [
      0.06668534874916077, -0.05741075426340103, 0.05851012468338013,
      -0.09296835213899612, 0.07477575540542603, -0.08782101422548294,
      0.11066360026597977, -0.0477738082408905, 0.11248180270195007,
      -0.06280726194381714, 0.05673525854945183, -0.16519753634929657,
      0.024955160915851593, -0.04258160665631294, 0.056970562785863876,
      -0.11238270998001099, 0.09637515246868134, -0.04308032989501953,
      0.03724837675690651, -0.05804464593529701,
    ],
    currentPosition: 0,
    creatorEthAddress: '',
    creatorName: '',
    mute: false,
    volume: 0.5,
    play: false,
    playTime: 0,
    visible: false,
    isLoading: false,
    isPlaying: false,
    restart: false,
    nftType: NftType.Master,
    isRoomPlayer: false,
  } as Track,
}

export const AudioContext = createContext<State | any>(initialState)

AudioContext.displayName = 'AudioContext'

const audioReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CURRENT_TRACK':
      return {
        currentTrack: {
          ...state.currentTrack,
          ...action.track,
        },
      }
    default:
      return state
  }
}

export const AudioProvider: FC = (props) => {
  const [state, dispatch] = useReducer(audioReducer, initialState)
  const {isMobile} = useWindowDimensions()
  const wavesurferRef = useRef(null)
  const wavesurferLibrary = useRef(null)
  const wavesurfer = useRef(null)

  useEffect(() => {
    setAudio('/dummy/dummy.mp3')
  }, [])

  const setCurrentTrack = useCallback(
    (track: Track) => dispatch({ type: 'SET_CURRENT_TRACK', track }),
    [dispatch]
  )

  const setAudio = useCallback(
    async (audioUrl: string) => {
      if (!wavesurferLibrary.current) {
        wavesurferLibrary.current = await (
          await import('wavesurfer.js')
        ).default
      }

      if (wavesurfer.current) {
        await wavesurfer.current.destroy()
      }

      const options = formWaveSurferOptions(wavesurferRef.current)

      wavesurfer.current = await new wavesurferLibrary.current.create({
        ...options,
        ...(currentTrack.isRoomPlayer && { interact: false }),
      })

      await wavesurfer.current.load(audioUrl, currentTrack.waveForm)

      await new Promise((resolve) => {
        wavesurfer.current.on('ready', () => {
          resolve(true)
        })
      })
    },
    [state]
  )

  const play = useCallback(() => {
    if (!wavesurfer.current) {
      return
    }

    wavesurfer.current.play()
  }, [state])

  const pause = useCallback(() => {
    if (!wavesurfer.current) {
      return
    }

    wavesurfer.current.pause()
  }, [state])

  const currentTrack = useMemo(() => state.currentTrack, [state.currentTrack])

  const value = useMemo(
    () => ({
      currentTrack,
      setCurrentTrack,
      play,
      pause,
      setAudio,
    }),
    [currentTrack, pause, play, setCurrentTrack, setAudio]
  )

  return (
    <AudioContext.Provider value={value}>
      <div {...props} />
      <div ref={wavesurferRef} className="hidden" />
    </AudioContext.Provider>
  )
}

export const useAudioContext = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext<AudioContextType>(AudioContext)
  if (context === undefined) {
    throw new Error('useAudioContext must be used within a AudioProvider')
  }
  return context
}
