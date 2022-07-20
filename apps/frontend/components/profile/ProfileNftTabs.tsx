import React, { useState } from 'react'
import SoundCard from '../marketplace/SoundCard'
import { Nft, NftType } from '../../common/graphql/schema.d'
import cn from 'classnames'

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
  const [ownedActive, setOwnedActive] = useState(true)

  const collectedMasterNfts = ownedMasterNfts.filter(
    (ownedMasterNft) =>
      !createdNfts.find((cratedNft) => cratedNft.id === ownedMasterNft.id)
  )
  const collectedLicenseNfts = ownedLicenseNfts.filter(
    (ownedLicenseNft) =>
      !createdNfts.find((cratedNft) => cratedNft.id === ownedLicenseNft.id)
  )

  return (
    <div className={className}>
      <div className="flex mb-10 select-none">
        <div
          className={cn(
            'bg-white rounded text-black px-8 py-1 shadow-lg cursor-pointer',
            ownedActive ? ' !bg-grey-medium !text-white ' : ''
          )}
          onClick={() => setOwnedActive(!ownedActive)}
        >
          Minted
        </div>

        <div
          className={cn(
            'bg-white rounded text-black px-8 py-1 shadow-lg cursor-pointer',
            !ownedActive ? ' !bg-grey-medium !text-white ' : ''
          )}
          onClick={() => setOwnedActive(!ownedActive)}
        >
          Owned
        </div>
      </div>
      {ownedActive && (
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
      {!ownedActive && (
        <div className="grid xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 mt-16 gap-10">
          {collectedMasterNfts &&
            collectedMasterNfts.map((nft, key) => {
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

          {collectedLicenseNfts &&
            collectedLicenseNfts.map((nft, key) => {
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
