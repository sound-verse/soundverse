import React, { useState } from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'
import { generateShortEthAddress } from '../../utils/common'
import SoundCard, { SoundCardI } from '../marketplace/SoundCard'
import styles from './ProfileNftTabs.module.css'

export type ProfileNftTabsProps = {
  createdNfts: any[]
  className?: string
}

enum PROFILE_TAB {
  COLECTED = 'collected',
  CREATED = 'created',
  FOR_SALE = 'for-sale',
}

export const ProfileNftTabs = ({
  createdNfts,
  className = '',
}: ProfileNftTabsProps) => {
  const [activeTab, setActiveTab] = useState<PROFILE_TAB>(PROFILE_TAB.CREATED)

  return (
    <div className={className}>
      <div className="uppercase text-white font-extrabold text-3xl">
        <span
          className={`${activeTab === PROFILE_TAB.CREATED && styles.active}`}
        >
          Created
        </span>
      </div>
      {activeTab === PROFILE_TAB.CREATED && (
        <div className="grid xl:grid-cols-2 2xl:grid-cols-3 mt-16 gap-10">
          {createdNfts.map((createdNft, key) => (
            <SoundCard
              key={key}
              soundCard={{
                creatorEthAddress: createdNft.creator.ethAddress,
                creatorName: createdNft.creator.name,
                licences: createdNft.supply,
                musicUrl: createdNft.fileUrl,
                name: createdNft.metadata.name,
                pictureUrl: createdNft.filePictureUrl,
                contractAddress: createdNft.contractAddress,
                tokenId: createdNft.tokenId,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
