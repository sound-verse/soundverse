import React, { useEffect, useState, useRef } from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileName } from '../profile'
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
          <div className={styles.soundCardHeaderBottom}>
            <div className={cn(styles.textOverflow, 'font-semibold text-md')}>
              {nft.metadata.name.length > 45
                ? `${nft.metadata.name.substring(0, 45)}...`
                : nft.metadata.name}
            </div>
            <div className={styles.creatorName}>
              <ProfileName
                ethAddress={nft.creator.ethAddress}
                name={nft.creator.name}
                short={true}
                className="text-sm"
              />
            </div>
          </div>
        </a>
      </Link>
      <Link
        href={`/${nftType === NftType.Master ? 'master' : 'license'}/${nft.id}`}
      >
        <div className={styles.mplaceImage}>
          <div className={styles.blur}>
            <Image src={nft.filePictureUrl} layout="fill" objectFit="cover" />
          </div>
          <Image src={nft.filePictureUrl} layout="fill" objectFit="contain" />
        </div>
      </Link>
      {showAudioBar && (
        <div className={styles.soundCardAudio} onClick={handleMusicClick}>
          <Image src="/img/soundwave.svg" objectFit="contain" layout="fill" />
        </div>
      )}
      <div className={styles.soundCardFooter}>
        {nftType === NftType.Master ? (
          nft.sellings.masterSelling ? (
            <div className="flex flex-col w-full h-full ml-5 justify-center text-sm">
              <div className="text-grey-light">
                Price:
                <span className="font-bold ml-2 text-white">
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
            </div>
          ) : (
            <div className="flex flex-col w-full h-full ml-5 justify-center">
              <div className="text-grey-light">Nft not listed</div>
            </div>
          )
        ) : nft.sellings.licenseSellings[0] ? (
          <div className="flex flex-col w-full h-full ml-5 justify-center text-sm">
            <div className="font-bold">
              {nft.sellings.licenseSellings.length} listings
            </div>
            <div className=" text-white">
              Lowest ask{' '}
              <span className="font-bold ml-2 text-white">
                {parseFloat(
                  Web3.utils.fromWei(
                    nft.sellings.licenseSellings[0]?.saleVoucher?.price ??
                      nft.sellings.licenseSellings[0]?.mintVoucher.price
                  )
                ).toFixed(2)}{' '}
                {nft.sellings.licenseSellings[0]?.saleVoucher?.currency ??
                  nft.sellings.licenseSellings[0]?.mintVoucher.currency}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full ml-5 justify-center">
            <div className="text-grey-light">Nft not listed</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SoundCard
