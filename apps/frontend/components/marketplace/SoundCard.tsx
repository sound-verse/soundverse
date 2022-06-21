import React, { useEffect, useState, useRef } from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileImage, ProfileName } from '../profile'
import { AudioPlayer } from '../AudioPlayer/AudioPlayer'
import cn from 'classnames'
import { Nft, NftType, Selling } from '../../common/graphql/schema.d'
import Web3 from 'web3'
import { useAudioContext } from '../../context/AudioContext'

export type SoundCardProp = {
  nftType: NftType
  nft: Nft
  playingCardId?: string
  onMusicClick?(): void
  className?: string
  contractAddress?: string
  showAudioBar?: boolean
}

function SoundCard({
  nft,
  playingCardId = '',
  className,
  nftType,
  contractAddress,
  showAudioBar = true,
  onMusicClick = () => {},
}: SoundCardProp) {
  const [playCard, setPlayCard] = useState<boolean>(false)
  const { setCurrentTrack, currentTrack } = useAudioContext()

  useEffect(() => {
    setPlayCard(playingCardId === nft.id ? true : false)
  }, [playingCardId])

  const handleMusicClick = () => {
    setCurrentTrack({
      url: nft.fileUrl,
      trackName: nft.metadata.name,
      currentPosition: 0,
      creatorName: nft.creator.name,
      trackPictureUrl: nft.filePictureUrl,
      creatorEthAddress: nft.creator.ethAddress,
      id: nft.id,
      contractAddress,
      play: true,
      nftType,
      restart: true,
      onTrackFinish: () => {},
      onTrackProgress: () => {},
      isRoomPlayer: false,
    })
  }

  const rootClassName = cn(
    styles.soundCardWrapper,
    {
      [styles.master]: nftType === NftType.Master,
      [styles.license]: nftType === NftType.License,
    },
    className
  )

  if (!nft.filePictureUrl) {
    return
  }
  return (
    <div className={rootClassName}>
      <Link
        href={`/${nftType === NftType.Master ? 'master' : 'license'}/${nft.id}`}
      >
        <a>
          <div className={styles.soundCardHeaderTop}>
            {nftType === NftType.Master ? 'Master' : 'License'}
          </div>
          <div className={styles.mplaceImage}>
            <Image
              src={nft.filePictureUrl}
              layout="fill"
              objectFit="cover"
              className={'rounded-tl-2xl'}
            />
          </div>
        </a>
      </Link>
      <div className={styles.soundCardBody}>
        <div className={styles.imageOverlay}></div>
        <div className={styles.blur}>
          <Image src={nft.filePictureUrl} layout="fill" objectFit="cover" />
        </div>

        <div className={styles.soundCardInnerBody}>
          {showAudioBar && (
            <div className={styles.soundCardAudio} onClick={handleMusicClick}>
              <Image
                src="/img/soundwave.svg"
                objectFit="contain"
                layout="fill"
              />
            </div>
          )}

          <div className={styles.soundCardText}>
            <div className={cn(styles.textOverflow, 'font-semibold text-xs')}>
              {nft.metadata.name.length > 45
                ? `${nft.metadata.name.substring(0, 45)}...`
                : nft.metadata.name}
            </div>
            <div className={styles.creatorName}>
              <ProfileImage
                height={5}
                width={5}
                ethAddress={nft.creator.ethAddress}
                imageUrl={nft.creator.profileImage}
                className="mr-1"
              />
              <ProfileName
                ethAddress={nft.creator.ethAddress}
                name={nft.creator.name}
                short={true}
                className="text-[0.65rem]"
                fullName={true}
              />
            </div>
          </div>
          <div className={styles.soundCardBodyFooter}>
            {nftType === NftType.Master ? (
              nft.sellings.masterSelling ? (
                <div className="flex justify-between items-baseline text-xs">
                  <div className="text-grey-light">
                    <span className="font-bold text-white">
                      {parseFloat(
                        Web3.utils.fromWei(
                          nft.sellings.masterSelling.saleVoucher?.price ??
                            nft.sellings.masterSelling.mintVoucher?.price
                        )
                      ).toFixed(2)}{' '}
                      {nft.sellings.masterSelling.saleVoucher?.currency ??
                        nft.sellings.masterSelling.mintVoucher.currency}
                    </span>
                  </div>
                  <div className="rounded px-2 py-[2px] text-black bg-[#FFEA2F]">
                    #1 of 1
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-baseline text-xs">
                  <div className="text-grey-light">Nft not listed</div>
                  <div className="rounded px-2 py-[2px] text-black bg-[#FFEA2F]">
                    #1 of 1
                  </div>
                </div>
              )
            ) : nft.sellings.licenseSellings[0] ? (
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-bold text-white">
                  {parseFloat(
                    Web3.utils.fromWei(
                      nft.sellings.licenseSellings[0]?.saleVoucher?.price ??
                        nft.sellings.licenseSellings[0]?.mintVoucher.price
                    )
                  ).toFixed(2)}{' '}
                  {nft.sellings.licenseSellings[0]?.saleVoucher?.currency ??
                    nft.sellings.licenseSellings[0]?.mintVoucher.currency}
                </span>
                <div className="bg-white rounded px-2 py-[2px] text-black">
                  # of {nft.supply}
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-baseline text-xs">
                <div className="text-grey-light">Nft not listed</div>
                <div className="bg-white rounded px-2 py-[2px] text-black">
                  # of {nft.supply}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SoundCard
