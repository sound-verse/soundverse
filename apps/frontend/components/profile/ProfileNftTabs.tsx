import React, { useState } from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'
import { generateShortEthAddress } from '../../utils/common'
import SoundCard from '../marketplace/SoundCard'
import styles from './ProfileNftTabs.module.css'
import { connectContractToSigner } from '@usedapp/core'
import { Nft, NftType } from '../../common/graphql/schema.d'

export type ProfileNftTabsProps = {
  createdNfts: Nft[]
  ownedMasterNfts: Nft[]
  ownedLicenseNfts: Nft[]
  className?: string
}

enum PROFILE_TAB {
  COLECTED = 'collected',
  CREATED = 'created',
  FOR_SALE = 'for-sale',
}

export const ProfileNftTabs = ({
  createdNfts,
  ownedMasterNfts,
  ownedLicenseNfts,
  className = '',
}: ProfileNftTabsProps) => {
  const [activeTab, setActiveTab] = useState<PROFILE_TAB>(PROFILE_TAB.CREATED)

  return (
    <div className={className}>
      <div className="flex">
        <div
          className="uppercase text-white font-extrabold text-2xl cursor-pointer mr-10"
          onClick={() => setActiveTab(PROFILE_TAB.CREATED)}
        >
          <span
            className={`${activeTab === PROFILE_TAB.CREATED && styles.active}`}
          >
            Created
          </span>
        </div>
        <div
          className="uppercase text-white font-extrabold text-2xl cursor-pointer mr-10"
          onClick={() => setActiveTab(PROFILE_TAB.COLECTED)}
        >
          <span
            className={`${activeTab === PROFILE_TAB.COLECTED && styles.active}`}
          >
            Collected
          </span>
        </div>
        {/* <div
          className="uppercase text-white font-extrabold text-3xl cursor-pointer mr-10"
          onClick={() => setActiveTab(PROFILE_TAB.FOR_SALE)}
        >
          <span
            className={`${activeTab === PROFILE_TAB.FOR_SALE && styles.active}`}
          >
            On-Sale
          </span>
        </div> */}
      </div>
      {activeTab === PROFILE_TAB.CREATED && (
        <div className="grid xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 mt-16 gap-10">
          {createdNfts &&
            createdNfts.map((nft, key) => {
              if (!nft.filePictureUrl) {
                return
              }

              return (
                <div key={`soundcard-wrapper-${key}`}>
                  <div className="spacer">
                    <SoundCard nft={nft} nftType={NftType.Master} key={key} />
                  </div>
                </div>
              )
            })}

          {createdNfts &&
            createdNfts.map((nft, key) => {
              if (!nft.filePictureUrl) {
                return
              }

              return (
                <div key={`soundcard-wrapper-${key}`}>
                  <div className="spacer">
                    <SoundCard nft={nft} nftType={NftType.License} key={key} />
                  </div>
                </div>
              )
            })}
        </div>
      )}
      {activeTab === PROFILE_TAB.COLECTED && (
        <div className="grid xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 mt-16 gap-10">
          {ownedMasterNfts &&
            ownedMasterNfts.map((nft, key) => {
              if (!nft.filePictureUrl) {
                return
              }

              return (
                <div key={`soundcard-wrapper-${key}`}>
                  <div className="spacer">
                    <SoundCard nft={nft} nftType={NftType.Master} key={key} />
                  </div>
                </div>
              )
            })}

          {ownedLicenseNfts &&
            ownedLicenseNfts.map((nft, key) => {
              if (!nft.filePictureUrl) {
                return
              }

              return (
                <div key={`soundcard-wrapper-${key}`}>
                  <div className="spacer">
                    <SoundCard nft={nft} nftType={NftType.License} key={key} />
                  </div>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
