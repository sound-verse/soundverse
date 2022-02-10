import React, { useState } from 'react'
import Image from 'next/image'
import styles from './ProfileSocialBar.module.css'
import cn from 'classnames'

export type PorfileSocialBarProps = {
  twitter?: string
  instagram?: string
  soundcloud?: string
  website?: string
  discord?: string
  spotify?: string
  className?: string
}

export const PorfileSocialBar = ({
  twitter,
  instagram,
  soundcloud,
  spotify,
  discord,
  className,
}: PorfileSocialBarProps) => {
  const iconSize = 25
  const iconClass = 'px-5 py-2 flex border-r border-grey-medium'
  return (
    <div className={className}>
      <div
        className={cn(
          'flex justify-between items-center border rounded-full border-grey-medium'
        )}
      >
        {twitter && (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            className={cn(iconClass, styles.lastNoBorder)}
          >
            <Image
              src="/img/twitter.svg"
              width={iconSize}
              height={iconSize}
              layout="fixed"
            />
          </a>
        )}
        {instagram && (
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            className={cn(iconClass, styles.lastNoBorder)}
          >
            <Image
              src="/img/instagram.svg"
              width={iconSize}
              height={iconSize}
              layout="fixed"
            />
          </a>
        )}
        {soundcloud && (
          <a
            href={`https://soundcloud.com/${soundcloud}`}
            target="_blank"
            className={cn(iconClass, styles.lastNoBorder)}
          >
            <Image
              src="/img/soundcloud.svg"
              width={iconSize}
              height={iconSize}
              layout="fixed"
            />
          </a>
        )}
        {spotify && (
          <a
            href={`https://open.spotify.com/artist/${spotify}`}
            target="_blank"
            className={cn(iconClass, styles.lastNoBorder)}
          >
            <Image
              src="/img/spotify.svg"
              width={iconSize}
              height={iconSize}
              layout="fixed"
            />
          </a>
        )}
        {discord && (
          <a
            href={`https://discord.com/users/${discord}`}
            target="_blank"
            className={cn(iconClass, styles.lastNoBorder)}
          >
            <Image
              src="/img/discord.svg"
              width={iconSize}
              height={iconSize}
              layout="fixed"
            />
          </a>
        )}
      </div>
    </div>
  )
}
