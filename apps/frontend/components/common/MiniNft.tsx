import cn from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'
import { ProfileName } from '../profile'
import Image from 'next/image'
import { Nft, NftType } from '../../common/graphql/schema.d'

interface MiniNftProps {
  className?: string
  nft: Nft
  nftType: NftType
}

export const MiniNft: FC<MiniNftProps> = ({ className, nft, nftType }) => {
  const classNames = cn(className)
  return (
    <div className={classNames}>
      <div className="flex items-center justify-start mr-2 w-[250px]">
        {nft.filePictureUrl && (
          <div className="w-[40px] flex">
            <Image
              src={nft.filePictureUrl}
              width={40}
              height={40}
              layout="fixed"
              className="rounded-xl mr-2"
            />
          </div>
        )}
        <div className="ml-4 flex-col text-left justify-start items-center">
          <div className="text-white font-bold text-sm whitespace-nowrap">
            {nft.metadata.name.length > 30
              ? `${nft.metadata.name.substring(0, 25)}...`
              : nft.metadata.name}
          </div>
          <div className="flex">
            <div className="text-grey-light text-sm mr-2"> [{nftType}] by</div>
            <div className="text-purple inline-block">
              <ProfileName
                ethAddress={nft.creator.ethAddress}
                name={nft.creator.name}
                short={true}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
