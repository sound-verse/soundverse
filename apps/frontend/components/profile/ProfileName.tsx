import React from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'
import { generateShortEthAddress } from '../../utils/common'

export type ProfileNameProps = {
  ethAddress: string
  name: string
  short?: boolean
  className?: string
  customEthLength?: number
}

export const ProfileName = ({
  ethAddress,
  name,
  short = false,
  className = '',
  customEthLength,
}: ProfileNameProps) => {
  return (
    <div className={className}>
      {name
        ? short
          ? `${name.substring(0, 10)}${name.length > 10 ? '...' : ''}`
          : name
        : short
        ? generateShortEthAddress(ethAddress, customEthLength)
        : ethAddress}
    </div>
  )
}
