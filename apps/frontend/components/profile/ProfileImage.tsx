import React from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'

export type ProfileImageProps = {
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
}: ProfileImageProps) => {
  return (
    <div className="flex">
      {imageUrl ? (
        <Image
          src={imageUrl}
          layout="fixed"
          width={width * 3}
          height={height * 3}
          quality={100}
          className="rounded-full"
        />
      ) : (
        <Blockies
          seed={ethAddress}
          size={width}
          scale={3}
          color="#dfe"
          bgColor="#ffe"
          spotColor="#abc"
          className={'rounded-full'}
        />
      )}
    </div>
  )
}
