import React from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Rarity } from '../../model/data/testData'
import { generateShortEthAddress } from '../../utils/common'
import Link from 'next/link'

export type SoundCardI = {
  pictureUrl: string
  name: string
  licences: number
  musicUrl: string
  creatorName: string
  creatorEthAddress: string
}

export type SoundCardProp = {
  soundCard: SoundCardI
}

function SoundCard({ soundCard }: SoundCardProp) {
  return (
    <div className={styles.soundcardWrapper}>
      <div className={styles.cardExterior}>
        <div className={styles.addButton}>
          <IoIosAddCircleOutline color="white" opacity={'80%'} />
        </div>
        <div className={styles.addButtonBg}></div>
        <div
          className={
            soundCard.licences === 0
              ? styles.cardInteriorLeftWhite
              : styles.cardInteriorLeftPurple
          }
        ></div>
        <div
          className={
            soundCard.licences === 0
              ? styles.cardInteriorBaseWhite
              : styles.cardInteriorBasePurple
          }
        >
          <p className={styles.nameText}>{soundCard.name}</p>
          <Link href={`/profile/${soundCard.creatorEthAddress}`}>
            <a className={styles.creatorName}>
              {soundCard.creatorName
                ? soundCard.creatorName
                : generateShortEthAddress(soundCard.creatorEthAddress)}
            </a>
          </Link>
        </div>
        <div className={styles.mplaceImage}>
          <Image
            src={soundCard.pictureUrl}
            layout="fixed"
            width={270}
            height={270}
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

export default SoundCard
