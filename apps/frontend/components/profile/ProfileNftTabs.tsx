import React, { useState } from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'
import { generateShortEthAddress } from '../../utils/common'
import SoundCard from '../marketplace/SoundCard'
import styles from './ProfileNftTabs.module.css'
import { connectContractToSigner } from '@usedapp/core'
import { NftType } from '../../common/types/nft-type.enum'
import { Nft } from '../../common/graphql/schema'

export type ProfileNftTabsProps = {
  createdNfts: Nft[]
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
          {createdNfts.map((nft, key) => {
            if (!nft.filePictureUrl) {
              return
            }

            return (
              <div key={`soundcard-wrapper-${key}`}>
                <div className="spacer">
                  <SoundCard nft={nft} nftType={NftType.MASTER} key={key} />
                </div>
              </div>
            )
          })}

          {createdNfts.map((nft, key) => {
            if (!nft.filePictureUrl) {
              return
            }

            return (
              <div key={`soundcard-wrapper-${key}`}>
                <div className="spacer">
                  <SoundCard nft={nft} nftType={NftType.LICENSE} key={key} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
