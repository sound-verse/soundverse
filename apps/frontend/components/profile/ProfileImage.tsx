import React from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'
import cn from 'classnames'

export type ProfileImageProps = {
  className?: string
  ethAddress: string
  imageUrl: string
  width: number
  height: number
}

export const ProfileImage = ({
  imageUrl,
  width,
  height,
  ethAddress,
  className,
}: ProfileImageProps) => {
  return (
    <div className={cn('flex', className)}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={width * 3}
          height={height * 3}
          quality={100}
          className="rounded-full"     
          objectFit='cover'     
        />
      ) : (
        <Blockies
          seed={ethAddress}
          size={width}
          scale={3}
          className={'rounded-full'}
        />
      )}
    </div>
  )
}
