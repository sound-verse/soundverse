import React from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Rarity } from '../../model/data/testData'
import { generateShortEthAddress } from '../../utils/common'
import Link from 'next/link'
import { ProfileName } from '../profile'

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
  if (!soundCard.pictureUrl) {
    return
  }
  return (
    <Link href={`/${soundCard.contractAddress}/${soundCard.tokenId}`}>
      <a>
        <div className={styles.soundCardWrapper}>
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
          <div className={styles.mplaceImage}>
            <Image src={soundCard.pictureUrl} layout="fill" objectFit="cover" />
          </div>
          <div className={styles.soundCardFooter}>
            <div></div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default SoundCard
