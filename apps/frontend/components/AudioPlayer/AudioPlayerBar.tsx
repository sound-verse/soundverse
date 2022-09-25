import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import styles from './AudioPlayer.module.css'
import cn from 'classnames'
import { useAudioContext } from '../../context/AudioContext'
import Image from 'next/image'
import { ProfileName } from '../profile'
import Link from 'next/link'
import { NftType } from '../../common/graphql/schema.d'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export type AudioPlayerBarProps = {}

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
})

export const AudioPlayerBar = ({}: AudioPlayerBarProps) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const WavesurferLibrary = useRef(null)
  const { setCurrentTrack, currentTrack } = useAudioContext()
  const [playerIsReady, setPlayerIsReady] = useState(false)
  const { isMobile } = useWindowDimensions()

  const gotoTrackPosition = (trackPosition: number) => {
    if (!wavesurfer.current || trackPosition === 0) {
      return
    }
    const totalDuration = wavesurfer.current.getDuration()
    const seekToValue = trackPosition / totalDuration
    wavesurfer.current.seekTo(seekToValue)
  }

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
    if (!currentTrack.url || currentTrack.url === '') {
      return
    }

    setCurrentTrack({ isLoading: true, isPlaying: false })
    create(currentTrack.url)
  }, [currentTrack.url, currentTrack.nftType])

  const create = async (url: string) => {
    if (!WavesurferLibrary.current) {
      WavesurferLibrary.current = await (await import('wavesurfer.js')).default
    }
    if (wavesurfer.current) {
      await wavesurfer.current.destroy()
    }
    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = await WavesurferLibrary.current.create({
      ...options,
      ...(currentTrack.isRoomPlayer && { interact: false }),
    })
    wavesurfer.current.load(url, currentTrack.waveForm)

    wavesurfer.current.on('ready', () => {
      if (currentTrack.play) {
        if (isMobile) {
          setCurrentTrack({
            isLoading: false,
            visible: true,
          })
        } else {
          setCurrentTrack({
            isLoading: false,
            isPlaying: true,
          })
          // wavesurfer.current.play()
        }
        setPlayerIsReady(true)
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
      <div
        className={cn(
          'grid lg:grid-cols-3 w-full relative text-center items-center align-center',
          !currentTrack.isRoomPlayer ? 'grid-cols-10' : 'grid-cols-2'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center lg:justify-end mr-2',
            !currentTrack.isRoomPlayer && 'col-span-5 lg:col-span-1'
          )}
        >
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
                    width={40}
                    height={40}
                    layout="fixed"
                    className="rounded-lg"
                    objectFit="cover"
                    quality={90}
                  />
                </a>
              </Link>
            )}
          </div>
          <div className="flex-col text-left justify-start">
            <div className="text-black font-bold text-xs lg:text-sm -mt-1">
              {currentTrack.trackName.length > 15
                ? `${currentTrack.trackName.substring(0, 15)}...`
                : currentTrack.trackName}
            </div>
            <div className="text-grey-medium text-xs lg:text-sm">
              by{' '}
              <span className="text-black inline-block">
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
        <div
          className={cn(
            'grid grid-cols-5 align-center items-center',
            !currentTrack.isRoomPlayer && 'col-span-3 lg:col-span-1'
          )}
        >
          {!currentTrack.isRoomPlayer || isMobile ? (
            <div
              className="col-span-2 lg:col-span-1 cursor-pointer text-right mr-3 -mb-1"
              onClick={() => {
                setCurrentTrack({
                  isPlaying: !currentTrack.isPlaying,
                })
                //Direkt calling play/pause for mobile
                if (isMobile) {
                  if (!wavesurfer.current) {
                    return
                  }
                  if (currentTrack.isPlaying) {
                    wavesurfer.current.pause()
                  } else {
                    wavesurfer.current.play()
                  }
                }
              }}
            >
              {currentTrack.isPlaying ? (
                <Image
                  src="/img/pauseButton.svg"
                  width={30}
                  height={30}
                  layout="fixed"
                />
              ) : (
                <Image
                  src="/img/playButton.svg"
                  width={30}
                  height={30}
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
        <div className="flex justify-center lg:justify-start col-span-2 lg:col-span-1">
          <div
            className="cursor-pointer hidden lg:flex items-center"
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
          <div className="hidden lg:flex items-center">
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
              className="cursor-pointer lg:ml-5 flex justify-around lg:justify-start items-center"
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
                width={30}
                height={30}
                layout="fixed"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
