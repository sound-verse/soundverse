import React from 'react'
import Image from 'next/image'
import Blockies from 'react-blockies'
import { generateShortEthAddress } from '../../utils/common'
import cn from 'classnames'

export type ProfileNameProps = {
  ethAddress: string
  name: string
  short?: boolean
  className?: string
  customEthLength?: number
  color?: string
}

export const ProfileName = ({
  ethAddress,
  name,
  short = false,
  className = '',
  customEthLength,
  color,
}: ProfileNameProps) => {
  return (
    <div className={cn(className)} style={{color}}>
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
