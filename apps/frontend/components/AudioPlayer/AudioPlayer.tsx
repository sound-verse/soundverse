import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import styles from './AudioPlayer.module.css'
import cn from 'classnames'
import { useAudioContext } from '../../context/AudioContext'
import { Bars } from 'react-loader-spinner'
import Image from 'next/image'
import { ProfileName } from '../profile'
import Link from 'next/link'

export type AudioPlayerProps = {
  url?: string
  play?: boolean
  name?: string
  className?: string
  creatorName?: string
  trackPictureUrl?: string
  creatorEthAddress?: string
  id?: string
  contractAddress?: string
}

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: 'white',
  progressColor: '#8E65FF',
  cursorColor: '#8E65FF',
  responsive: true,
  height: 50,
  pixelRatio: 1,
  partialRender: true,
  normalize: true,
  barWidth: 1,
  barGap: 1,
})

export const AudioPlayer = ({
  url,
  play = false,
  name,
  className = '',
  creatorName,
  trackPictureUrl,
  creatorEthAddress,
  id,
  contractAddress,
}: AudioPlayerProps) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const WavesurferLibrary = useRef(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setCurrentTrack, currentTrack } = useAudioContext()

  useEffect(() => {
    if (!url) {
      return
    }
    create(url)
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (!wavesurfer.current) {
      return
    }
    if (wavesurfer.current.isReady) {
      if (play) {
        wavesurfer.current.setMute(true)
        wavesurfer.current.play()
      } else if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.pause()
      }
    }
  }, [play, wavesurfer.current])

  const create = async (url: string) => {
    if (!WavesurferLibrary.current) {
      WavesurferLibrary.current = await (await import('wavesurfer.js')).default
    }
    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = WavesurferLibrary.current.create(options)
    wavesurfer.current.load(url)

    wavesurfer.current.on('loading', function (progress) {
      if (progress < 100 && !isLoading) {
        setIsLoading(true)
      } else if (progress === 100) {
        setIsLoading(false)
      }
    })
    wavesurfer.current.on('seek', function (seek) {
      setCurrentTrack({
        url,
        trackName: name,
        currentPosition: seek,
        creatorName,
        trackPictureUrl,
        creatorEthAddress,
        id,
        contractAddress,
        isPlaying: true,
        play: true,
      })
    })
  }

  return (
    <div className={cn(className)}>
      <div className={isLoading ? 'hidden' : 'block'} ref={waveformRef} />
      {isLoading && (
        <div className={cn('flex self-center items-center justify-center p-3')}>
          <Bars color="#7A64FF" height={25} width={25} />
        </div>
      )}
    </div>
  )
}
