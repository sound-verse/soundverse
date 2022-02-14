import React, { useEffect, useState } from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileName } from '../profile'
import { AudioPlayer } from '../AudioPlayer/AudioPlayer'

export type SoundCardI = {
  id: string
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
  playingCardId?: string
  onMusicClick?(): void
}

function SoundCard({
  soundCard,
  playingCardId = '',
  onMusicClick = () => {},
}: SoundCardProp) {
  const [playCard, setPlayCard] = useState<boolean>(false)
  useEffect(() => {
    if (playingCardId !== soundCard.id) {
      setPlayCard(false)
    }
  }, [playingCardId])

  const handleMusicClick = () => {
    onMusicClick()
    setPlayCard(true)
  }

  if (!soundCard.pictureUrl) {
    return
  }
  return (
    <div className={styles.soundCardWrapper}>
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
      <div className={styles.soundCardAudio} onClick={handleMusicClick}>
        <AudioPlayer
          url={soundCard.musicUrl}
          className={styles.audioWaves}
          play={playCard}
        />
      </div>
      <div className={styles.soundCardFooter}>
        <div></div>
      </div>
    </div>
  )
}

export default SoundCard
