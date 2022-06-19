import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import styles from './AudioPlayer.module.css'
import cn from 'classnames'
import { useAudioContext } from '../../context/AudioContext'
import { Bars } from 'react-loader-spinner'
import Image from 'next/image'
import { ProfileName } from '../profile'
import Link from 'next/link'
import { NftType } from '../../common/graphql/schema.d'

export type AudioPlayerBarProps = {}

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: 'white',
  progressColor: '#8E65FF',
  cursorColor: '#8E65FF',
  // responsive: true,
  height: 50,
  pixelRatio: 1,
  normalize: true,
  barWidth: 1,
  barGap: 1,
  backend: 'MediaElement',
})

export const AudioPlayerBar = ({}: AudioPlayerBarProps) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const WavesurferLibrary = useRef(null)
  const { setCurrentTrack, currentTrack } = useAudioContext()
  const [playerIsReady, setPlayerIsReady] = useState(false)

  const gotoTrackPosition = (trackPosition: number) => {
    if (!wavesurfer.current || trackPosition === 0) {
      return
    }
    const totalDuration = wavesurfer.current.getDuration()
    const seekToValue = trackPosition / totalDuration
    wavesurfer.current.seekTo(seekToValue)
  }

  useEffect(() => {
    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
      }
    }
  }, [])

  // useEffect(() => {
  //   if (!wavesurfer.current) {
  //     return
  //   }
  //   gotoTrackPosition(currentTrack.currentPosition)
  // }, [currentTrack.currentPosition])

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

  useEffect(() => {
    if (!wavesurfer.current) {
      return
    }
    if (currentTrack.isPlaying) {
      wavesurfer.current.play()
      wavesurfer.current.setMute(currentTrack.mute)
      wavesurfer.current.setVolume(currentTrack.volume)
      gotoTrackPosition(currentTrack.currentPosition)
      setCurrentTrack({ visible: true })
    } else {
      wavesurfer.current.pause()
    }
    if (playerIsReady) {
      setPlayerIsReady(false)
    }
  }, [playerIsReady, currentTrack.isPlaying])

  useEffect(() => {
    if (!currentTrack.url) {
      return
    }
    if (wavesurfer.current) {
      wavesurfer.current.destroy()
    }
    setCurrentTrack({ isLoading: true })
    create(currentTrack.url)
  }, [currentTrack.url])

  const create = async (url: string) => {
    if (!WavesurferLibrary.current) {
      WavesurferLibrary.current = await (await import('wavesurfer.js')).default
    }
    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = await WavesurferLibrary.current.create({
      ...options,
      ...(currentTrack.isRoomPlayer && { interact: false }),
    })
    wavesurfer.current.load(url)

    wavesurfer.current.on('ready', () => {
      if (currentTrack.play) {
        setCurrentTrack({
          isPlaying: true,
        })
        setPlayerIsReady(true)
        wavesurfer.current.play()
      }
    })

    wavesurfer.current.on('waveform-ready', () => {
      setCurrentTrack({
        isLoading: false,
      })
    })

    wavesurfer.current.on('finish', () => {
      setCurrentTrack({ isPlaying: false })
      currentTrack.onTrackFinish()
    })

    wavesurfer.current.on('audioprocess', (progress) => {
      const position = progress.toFixed(2)
      if (position % 3 == 0 && position > 0) {
        currentTrack.onTrackProgress({
          currentPosition: parseFloat(position),
        })
      }
    })
  }

  return (
    <div
      className={cn(
        styles.playbar,
        currentTrack.visible || currentTrack.isLoading ? 'visible' : 'invisible'
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full relative text-center items-center align-center">
        <div className="hidden lg:flex items-center justify-end mr-2">
          <div className="mr-2">
            {currentTrack.trackPictureUrl && (
              <Link
                href={`/${
                  currentTrack.nftType === NftType.Master ? 'master' : 'license'
                }/${currentTrack.id}`}
              >
                <a>
                  <Image
                    src={currentTrack.trackPictureUrl}
                    width={60}
                    height={60}
                    layout="fixed"
                    className="rounded-2xl"
                  />
                </a>
              </Link>
            )}
          </div>
          <div className="flex-col text-left justify-start">
            <div className="text-white font-bold text-md">
              {currentTrack.trackName.length > 30
                ? `${currentTrack.trackName.substring(0, 25)}...`
                : currentTrack.trackName}
            </div>
            <div className="text-grey-light">
              by{' '}
              <span className="text-purple inline-block">
                <Link href={`/profile/${currentTrack.creatorEthAddress}`}>
                  <a>
                    <ProfileName
                      ethAddress={currentTrack.creatorEthAddress}
                      name={currentTrack.creatorName}
                      short={true}
                      className=""
                    />
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 algin-center items-center">
          {!currentTrack.isRoomPlayer ? (
            <div
              className="col-span-1 cursor-pointer text-right mr-3"
              onClick={() => {
                setCurrentTrack({
                  isPlaying: !wavesurfer.current?.isPlaying(),
                })
              }}
            >
              {currentTrack.isPlaying ? (
                <Image
                  src="/img/pauseButton.svg"
                  width={40}
                  height={40}
                  layout="fixed"
                />
              ) : (
                <Image
                  src="/img/playButton.svg"
                  width={40}
                  height={40}
                  layout="fixed"
                />
              )}
            </div>
          ) : (
            <div className="col-span-1"></div>
          )}
          <div className={cn('col-span-3', styles.noOverflow)}>
            <div ref={waveformRef} />
          </div>
        </div>
        <div className="hidden lg:flex justify-start">
          <div
            className="cursor-pointer flex items-center"
            onClick={() => setCurrentTrack({ mute: !currentTrack.mute })}
          >
            {!currentTrack.mute ? (
              <Image
                src="/img/volume.svg"
                width={30}
                height={30}
                layout="fixed"
              />
            ) : (
              <Image
                src="/img/volume.svg"
                width={30}
                height={30}
                layout="fixed"
              />
            )}
          </div>
          <div className="flex items-center">
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={currentTrack.mute ? 0 : currentTrack.volume}
              onChange={(event) => {
                setCurrentTrack({
                  volume: event.target.valueAsNumber,
                  mute: false,
                })
              }}
              className={styles.volume}
            />
          </div>
          {!currentTrack.isRoomPlayer && (
            <div
              className="cursor-pointer ml-5 flex items-center"
              onClick={() => {
                setCurrentTrack({
                  url: '',
                  isPlaying: false,
                  visible: false,
                })
              }}
            >
              <Image
                src="/img/close.svg"
                width={40}
                height={40}
                layout="fixed"
              />
            </div>
          )}
        </div>
      </div>
      {currentTrack.isLoading && (
        <div
          className={cn(
            styles.playbar,
            'flex self-center items-center justify-center !bg-transparent text-white'
          )}
        >
          <Bars color="#7A64FF" height={30} width={30} />{' '}
          <span className="ml-2">Loading wave form</span>
        </div>
      )}
    </div>
  )
}
