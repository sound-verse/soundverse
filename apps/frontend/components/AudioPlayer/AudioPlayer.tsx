import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import styles from './AudioPlayer.module.css'

export type AudioPlayerProps = {
  url: string
  play?: boolean
  className?: string
}

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: 'white',
  progressColor: '#8E65FF',
  cursorColor: '#8E65FF',
  responsive: true,
  height: 50,
  normalize: false,
  partialRender: true,
  pixelRatio: 1,
})

export const AudioPlayer = ({
  url,
  play = false,
  className = '',
}: AudioPlayerProps) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  useEffect(() => {
    create()

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (wavesurfer.current) {
      if (play) {
        wavesurfer.current.play()
      } else if (wavesurfer.current.isPlaying()) {
        wavesurfer.current.pause()
      }
    }
  }, [play])

  const create = async () => {
    const WaveSurfer = (await import('wavesurfer.js')).default

    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = WaveSurfer.create(options)

    wavesurfer.current.load(url)
  }

  return (
    <div className={className}>
      <div ref={waveformRef} />
    </div>
  )
}
