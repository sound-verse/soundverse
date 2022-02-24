import React, { useEffect, useState } from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileName } from '../profile'
import { AudioPlayer } from '../AudioPlayer/AudioPlayer'
import cn from 'classnames'

export type SoundCardI = {
  id: string
  pictureUrl: string
  name: string
  licenses: number
  musicUrl: string
  creatorName: string
  creatorEthAddress: string
  tokenId: string
  type: 'master' | 'license'
}

export type SoundCardProp = {
  soundCard: SoundCardI
  playingCardId?: string
  onMusicClick?(): void
  className?: string
}

function SoundCard({
  soundCard,
  playingCardId = '',
  className,
  onMusicClick = () => {},
}: SoundCardProp) {
  const [playCard, setPlayCard] = useState<boolean>(false)

  useEffect(() => {
    setPlayCard(playingCardId === soundCard.id ? true : false)
  }, [playingCardId])

  const handleMusicClick = () => {
    onMusicClick()
  }

  const rootClassName = cn(
    styles.soundCardWrapper,
    {
      [styles.master]: soundCard.type === 'master',
      [styles.license]: soundCard.type === 'license',
    },
    className
  )

  if (!soundCard.pictureUrl) {
    return
  }
  return (
    <div className={rootClassName}>
      <Link href={`/${soundCard.type}/${soundCard.id}`}>
        <a>
          <div className={styles.soundCardHeaderTop}>
            {soundCard.type === 'master' ? 'Master' : 'License'}
          </div>
          <div className={styles.soundCardHeaderBottom}>
            <div className="font-semibold text-xl">
              {soundCard.name.length > 45
                ? `${soundCard.name.substring(0, 45)}...`
                : soundCard.name}
            </div>
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
          name={soundCard.name}
          creatorName={soundCard.creatorName}
          creatorEthAddress={soundCard.creatorEthAddress}
          trackPictureUrl={soundCard.pictureUrl}
          id={soundCard.id}
        />
      </div>
      <div className={styles.soundCardFooter}>
        <div></div>
      </div>
    </div>
  )
}

export default SoundCard
