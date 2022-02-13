import React, { useState } from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileName } from '../profile'
import { useAudioContext } from '../../context/AudioContext'
import { AudioPlayer } from '../AudioPlayer/AudioPlayer'

export type SoundCardI = {
  pictureUrl: string
  name: string
  licences: number
  musicUrl: string
  creatorName: string
  creatorEthAddress: string
  contractAddress: string
  tokenId: string
}

export type SoundCardProp = {
  soundCard: SoundCardI
}

function SoundCard({ soundCard }: SoundCardProp) {
  const useAudio = useAudioContext()
  const [play, setPlay] = useState<boolean>(false)

  const handleAudioClicked = () => {}

  if (!soundCard.pictureUrl) {
    return
  }

  const handlePlay = () => {
    setPlay(true)
  }

  const handlePause = () => {
    setPlay(false)
  }

  return (
    <div
      className={styles.soundCardWrapper}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      <Link href={`/${soundCard.contractAddress}/${soundCard.tokenId}`}>
        <a>
          <div className={styles.soundCardHeaderTop}>Master</div>
          <div className={styles.soundCardHeaderBottom}>
            <div className="font-semibold text-xl">{soundCard.name}</div>
            <div className={styles.creatorName}>
              <ProfileName
                ethAddress={soundCard.creatorEthAddress}
                name={soundCard.creatorName}
                short={true}
                className=""
              />
            </div>
          </div>
        </a>
      </Link>
      <div className={styles.mplaceImage}>
        <Image src={soundCard.pictureUrl} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.soundCardAudio}>
        <div>
          <AudioPlayer
            url={soundCard.musicUrl}
            className={styles.audioWaves}
            play={play}
          />
        </div>
      </div>
      <div className={styles.soundCardFooter}>
        <div></div>
      </div>
    </div>
  )
}

export default SoundCard
