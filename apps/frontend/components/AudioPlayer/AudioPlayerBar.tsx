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
  responsive: true,
  height: 50,
  pixelRatio: 1,
  partialRender: false,
  normalize: true,
  barWidth: 1,
  barGap: 1,
})

export const AudioPlayerBar = ({}: AudioPlayerBarProps) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const WavesurferLibrary = useRef(null)
  const { setCurrentTrack, currentTrack } = useAudioContext()
  const [revalidate, setRevalidate] = useState<boolean>(false)

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

  useEffect(() => {
    if (!wavesurfer.current) {
      setCurrentTrack({ restart: false })
      return
    }
    gotoTrackPosition(currentTrack.currentPosition)
    if (currentTrack.play) {
      wavesurfer.current.play()
    }
    setCurrentTrack({ restart: false })
  }, [currentTrack.restart])

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
    if (currentTrack.play) {
      wavesurfer.current.play()
      setCurrentTrack({ isPlaying: true, visible: true, mute: false })
    } else {
      wavesurfer.current.pause()
      setCurrentTrack({ isPlaying: false })
    }
  }, [currentTrack.play])

  useEffect(() => {
    if (!wavesurfer.current) {
      return
    }
    if (revalidate) {
      gotoTrackPosition(currentTrack.currentPosition)
      wavesurfer.current.setMute(currentTrack.mute)
      wavesurfer.current.setVolume(currentTrack.volume)
      if (currentTrack.play) {
        wavesurfer.current.play()
      }
      setRevalidate(false)
    }
  }, [revalidate])

  useEffect(() => {
    if (!currentTrack.url) {
      return
    }
    setCurrentTrack({ isLoading: true })
    if (!wavesurfer.current) {
      create(currentTrack.url)
    } else {
      wavesurfer.current.load(currentTrack.url)
    }
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
      setCurrentTrack({
        visible: true,
        isLoading: false,
        play: true,
        isPlaying: true,
        mute: false,
      })
      setRevalidate(true)
    })
    wavesurfer.current.on('finish', () => {
      setCurrentTrack({ isPlaying: false, play: false })
      currentTrack.onTrackFinish()
    })

    wavesurfer.current.on('audioprocess', (progress) => {
      if (progress % 10 == 0) {
        currentTrack.onTrackProgress({ currentPosition: progress })
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
                  play: !wavesurfer.current?.isPlaying(),
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
                  visible: false,
                  mute: true,
                  play: false,
                  restart: true,
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
            'flex self-center items-center justify-center p-5 m-4 border-none',
            styles.playbar
          )}
        >
          <Bars color="#7A64FF" height={30} width={30} />
        </div>
      )}
    </div>
  )
}
