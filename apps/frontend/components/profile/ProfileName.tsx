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
  fullName?: boolean
}

export const ProfileName = ({
  ethAddress,
  name,
  short = false,
  className = '',
  customEthLength,
  color,
  fullName = false,
}: ProfileNameProps) => {
  let displayName

  if (name) {
    displayName = fullName
      ? name
      : short
      ? `${name.substring(0, 10)}${name.length > 10 ? '...' : ''}`
      : name
  } else {
    displayName = short
      ? generateShortEthAddress(ethAddress, customEthLength)
      : ethAddress
  }
  return (
    <div className={cn(className)} style={{ color }}>
      {displayName}
    </div>
  )
}
