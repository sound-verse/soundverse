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
  currentPosition?: number
  creatorName?: string
  trackPictureUrl?: string
  creatorEthAddress?: string
  visible?: boolean
  mute?: boolean
  volume?: number
  isLoading?: boolean
  playTime?: number
  isPlaying?: boolean
  nftType?: NftType
  restart?: boolean
  isRoomPlayer?: boolean
  waveDiv?: any
  wavesurferRef?: any
  playOnLoad?: boolean
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
  setAudio: (audioUrl: string, waveForm: number[]) => void
  play: () => void
  pause: () => void
  gotoTrackPosition: (trackPosition: number) => void
}

type Action = {
  type: 'SET_CURRENT_TRACK'
  track: Track
}

const initialState: State = {
  currentTrack: {
    id: '',
    contractAddress: '',
    trackName: '',
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
    playOnLoad: false,
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
  const { isMobile } = useWindowDimensions()
  const wavesurferRef = useRef(null)
  const wavesurferLibrary = useRef(null)
  const wavesurfer = useRef(null)

  const currentTrack = useMemo(() => state.currentTrack, [state.currentTrack])

  useEffect(() => {
    if (isMobile) {
      setAudio('/dummy/dummy.mp3', [])
    }
  }, [])

  useEffect(() => {
    if (!wavesurfer.current) {
      return
    }
    wavesurfer.current.setMute(currentTrack.mute)
  }, [currentTrack.mute])

  useEffect(() => {
    if (!wavesurfer.current) {
      return
    }
    wavesurfer.current.setVolume(currentTrack.volume)
  }, [currentTrack.volume])

  const setCurrentTrack = useCallback(
    (track: Track) => dispatch({ type: 'SET_CURRENT_TRACK', track }),
    [dispatch]
  )

  const gotoTrackPosition = useCallback(
    (trackPosition: number) => {
      let seekToValue = trackPosition / currentTrack.playTime

      if (seekToValue > 1 || seekToValue < 0 || isNaN(seekToValue)) {
        seekToValue = 0
      }

      wavesurfer.current.seekTo(seekToValue)
    },
    [currentTrack.playTime]
  )

  const setAudio = useCallback(
    async (audioUrl: string, waveForm: number[]) => {
      if (!wavesurferLibrary.current) {
        wavesurferLibrary.current = await (
          await import('wavesurfer.js')
        ).default
      }

      if (wavesurfer.current) {
        await wavesurfer.current.destroy()
        setCurrentTrack({ isPlaying: false })
      }

      const options = formWaveSurferOptions(
        currentTrack?.wavesurferRef ?? wavesurferRef.current
      )

      wavesurfer.current = await new wavesurferLibrary.current.create({
        ...options,
        ...(currentTrack.isRoomPlayer && { interact: false }),
      })

      await wavesurfer.current.load(audioUrl, waveForm)

      await new Promise((resolve) => {
        wavesurfer.current.on('ready', () => {
          setCurrentTrack({ isLoading: false })
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

    wavesurfer.current.setMute(currentTrack.mute)
    wavesurfer.current.setVolume(currentTrack.volume)

    wavesurfer.current.play()
    setCurrentTrack({ isPlaying: true, visible: true })
  }, [state])

  const pause = useCallback(() => {
    if (!wavesurfer.current) {
      return
    }
    wavesurfer.current.pause()
    setCurrentTrack({ isPlaying: false })
  }, [state])

  const value = useMemo(
    () => ({
      currentTrack,
      setCurrentTrack,
      play,
      pause,
      setAudio,
      gotoTrackPosition,
    }),
    [currentTrack, pause, play, setCurrentTrack, setAudio, gotoTrackPosition]
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
