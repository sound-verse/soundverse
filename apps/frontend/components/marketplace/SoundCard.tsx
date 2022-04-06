import React, { useEffect, useState } from 'react'
import styles from './SoundCard.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileName } from '../profile'
import { AudioPlayer } from '../AudioPlayer/AudioPlayer'
import cn from 'classnames'
import { NftType } from '../../common/types/nft-type.enum'
import { Nft, Selling } from '../../common/graphql/schema'
import Web3 from 'web3'

export type SoundCardProp = {
  nftType: NftType
  nft: Nft
  playingCardId?: string
  onMusicClick?(): void
  className?: string
}

function SoundCard({
  nft,
  playingCardId = '',
  className,
  nftType,
  onMusicClick = () => {},
}: SoundCardProp) {
  const [playCard, setPlayCard] = useState<boolean>(false)

  useEffect(() => {
    setPlayCard(playingCardId === nft.id ? true : false)
  }, [playingCardId])

  const handleMusicClick = () => {
    onMusicClick()
  }

  const rootClassName = cn(
    styles.soundCardWrapper,
    {
      [styles.master]: nftType === NftType.MASTER,
      [styles.license]: nftType === NftType.LICENSE,
    },
    className
  )

  if (!nft.filePictureUrl) {
    return
  }
  return (
    <div className={rootClassName}>
      <Link
        href={`/${nftType === NftType.MASTER ? 'master' : 'license'}/${nft.id}`}
      >
        <a>
          <div className={styles.soundCardHeaderTop}>
            {nftType === NftType.MASTER ? 'Master' : 'License'}
          </div>
          <div className={styles.soundCardHeaderBottom}>
            <div className="font-semibold text-md">
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
      <div className={styles.mplaceImage}>
        <div className={styles.blur}>
          <Image src={nft.filePictureUrl} layout="fill" objectFit="cover" />
        </div>
        <Image src={nft.filePictureUrl} layout="fill" objectFit="contain" />
      </div>
      <div className={styles.soundCardAudio} onClick={handleMusicClick}>
        <AudioPlayer
          url={nft.fileUrl}
          className={styles.audioWaves}
          play={playCard}
          name={nft.metadata.name}
          creatorName={nft.creator.name}
          creatorEthAddress={nft.creator.ethAddress}
          trackPictureUrl={nft.filePictureUrl}
          id={nft.id}
          nftType={nftType}
        />
      </div>
      <div className={styles.soundCardFooter}>
        {nftType === NftType.MASTER ? (
          nft.sellings.masterSelling ? (
            <div className="flex flex-col w-full h-full ml-5 justify-center text-sm">
              <div className="text-grey-light">
                Price:
                <span className="font-bold ml-2 text-white">
                  {parseFloat(
                    Web3.utils.fromWei(
                      nft.sellings.masterSelling.sellingVoucher.price
                    )
                  ).toFixed(2)}{' '}
                  {nft.sellings.masterSelling.sellingVoucher.currency}
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
                    nft.sellings.licenseSellings[0]?.sellingVoucher.price
                  )
                ).toFixed(2)}{' '}
                {nft.sellings.licenseSellings[0]?.sellingVoucher.currency}
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
