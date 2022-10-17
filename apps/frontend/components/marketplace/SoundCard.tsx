import React, { useEffect, useState, useRef } from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileImage, ProfileName } from '../profile'
import cn from 'classnames'
import { Nft, NftType, Selling } from '../../common/graphql/schema.d'
import Web3 from 'web3'
import { useAudioContext } from '../../context/AudioContext'
import useWindowDimensions from '../../hooks/useWindowDimensions'

export type SoundCardProp = {
  nftType: NftType
  nft: Nft
  playingCardId?: string
  onMusicClick?(): void
  className?: string
  contractAddress?: string
  showAudioBar?: boolean
  activeLinks?: boolean
}

function SoundCard({
  nft,
  playingCardId = '',
  className,
  nftType,
  contractAddress,
  showAudioBar = true,
  activeLinks = true,
}: SoundCardProp) {
  const [playCard, setPlayCard] = useState<boolean>(false)
  const { setCurrentTrack, currentTrack } = useAudioContext()
  const [showPlayButton, setShowPlayButton] = useState<boolean>(false)
  const { isMobile } = useWindowDimensions()

  useEffect(() => {
    setPlayCard(playingCardId === nft.id ? true : false)
  }, [playingCardId])

  const isPlaying =
    currentTrack?.id === nft.id &&
    currentTrack?.isPlaying &&
    currentTrack?.nftType === nftType

  const handleMusicClick = () => {
    setCurrentTrack({
      url: nft.fileUrl,
      waveForm: nft.soundWave,
      trackName: nft.metadata.name,
      currentPosition: 0,
      creatorName: nft.creator.name,
      trackPictureUrl: nft.filePictureUrl,
      creatorEthAddress: nft.creator.ethAddress,
      id: nft.id,
      contractAddress,
      nftType,
      playOnLoad: true,
      restart: true,
      isRoomPlayer: false,
    })
  }

  const handlePauseMusicClick = () => {
    setCurrentTrack({
      url: '',
      visible: false,
      isPlaying: false,
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
    <div
      className={rootClassName}
      onMouseEnter={() => setShowPlayButton(true)}
      onMouseLeave={() => setShowPlayButton(false)}
    >
      {activeLinks ? (
        <Link
          href={`/${nftType === NftType.Master ? 'master' : 'license'}/${
            nft.id
          }`}
        >
          <a>
            <div className={styles.soundCardHeaderTop}>
              {nftType === NftType.Master ? 'Master' : 'License'}
            </div>
            <div className={styles.mplaceImage}>
              {showAudioBar && isPlaying && (
                <div className={styles.pauseButton}>
                  <div
                    className={styles.pauseButtonInner}
                    onClick={(event) => {
                      event.preventDefault()
                      handlePauseMusicClick()
                    }}
                  >
                    <Image
                      src="/img/pauseButtonBlue.svg"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              )}
              {showAudioBar && (showPlayButton || isMobile) && !isPlaying && (
                <div className={styles.playButton}>
                  <div
                    className={styles.playButtonInner}
                    onClick={(event) => {
                      event.preventDefault()
                      handleMusicClick()
                    }}
                  >
                    <Image
                      src="/img/playButtonBlue.svg"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              )}
              <Image
                src={nft.filePictureUrl}
                layout="fill"
                objectFit="cover"
                className={'rounded-tl-2xl'}
              />
            </div>
          </a>
        </Link>
      ) : (
        <>
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
        </>
      )}

      <div className={styles.soundCardBody}>
        <div className={styles.imageOverlay}></div>
        <div className={styles.blur}>
          <Image src={nft.filePictureUrl} layout="fill" objectFit="cover" />
        </div>

        <div className={styles.soundCardInnerBody}>
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
                    <span className="font-bold text-white flex items-center">
                      <div className="mr-2">
                        {parseFloat(
                          Web3.utils.fromWei(
                            nft.sellings.masterSelling.saleVoucher?.price ??
                              nft.sellings.masterSelling.mintVoucher?.price
                          )
                        ).toFixed(3)}
                      </div>
                      {/* {nft.sellings.masterSelling.saleVoucher?.currency ??
                        nft.sellings.masterSelling.mintVoucher.currency} */}
                      <div className="relative w-4 h-5">
                        <Image
                          src="/img/ethIconWhite.svg"
                          layout="fill"
                          alt="Ethereum Logo"
                        />
                      </div>
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
                <span className="font-bold text-white flex items-center">
                  <div className="mr-2">
                    {parseFloat(
                      Web3.utils.fromWei(
                        nft.sellings.licenseSellings[0]?.saleVoucher?.price ??
                          nft.sellings.licenseSellings[0]?.mintVoucher.price
                      )
                    ).toFixed(3)}
                  </div>
                  <div className="relative w-4 h-5">
                    <Image
                      src="/img/ethIconWhite.svg"
                      layout="fill"
                      alt="Ethereum Logo"
                    />
                  </div>
                  {/* {nft.sellings.licenseSellings[0]?.saleVoucher?.currency ??
                    nft.sellings.licenseSellings[0]?.mintVoucher.currency} */}
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
