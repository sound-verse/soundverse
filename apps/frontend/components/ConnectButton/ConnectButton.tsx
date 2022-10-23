import React, { FC, useRef, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './ConnectButton.module.css'
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { ProfileImage, ProfileName } from '../profile'
import { useConnectModal } from '@web3modal/react'

interface ConnectButtonProps {
  className?: string
}

declare const window: any

export const ConnectButton: FC<ConnectButtonProps> = ({ className }) => {
  const { logout } = useLogin()
  const { open, isOpen, close } = useConnectModal()
  const { authUser } = useAuthContext()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => {
    if (!authUser) {
      setShowDropdown(false)
    }
  }, [authUser])

  return (
    <div className={cn(styles.root, className)}>
      <button
        className={styles.connectButton}
        onClick={() => {
          if (!authUser) {
            setShowDropdown(false)
            open()
          }
        }}
        onMouseEnter={() => {
          if (authUser) {
            setShowDropdown(true)
          }
        }}
      >
        <div className={authUser ? styles.connectButtonLabel : 'block'}>
          {/*blockies and account details go here*/}
          {authUser && (
            <div className={styles.profileButtonUserImage}>
              <ProfileImage
                ethAddress={authUser?.ethAddress}
                width={8}
                height={8}
                imageUrl={authUser?.profileImage}
              />
            </div>
          )}
          <div className={styles.connectButtonAddress}>
            {authUser ? (
              <ProfileName
                ethAddress={authUser?.ethAddress}
                name={authUser?.name}
                short={true}
              />
            ) : isOpen ? (
              'CONNECTING...'
            ) : (
              'CONNECT'
            )}
          </div>
          {authUser && (
            <div className={styles.chevronDown}>
              <Image
                src="/img/chevronDown.svg"
                width={18}
                height={18}
                layout="fixed"
                alt="Account Links"
              />
            </div>
          )}
        </div>
      </button>
      {showDropdown && (
        <div
          className={styles.dropdownWrapper}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className={styles.dropdownRect}>
            <div className={styles.dropdownText}>
              {/*These links need dynamic path logic*/}
              <Link href={`/profile/${authUser?.ethAddress}`}>My profile</Link>
            </div>
            <div className={styles.ddhr}></div>
            <div className={styles.dropdownText}>
              <button
                onClick={async () => {
                  await logout()
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
