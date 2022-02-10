import Link from 'next/link'
import { useEthers } from '@usedapp/core/'
import { useEffect, useState, Fragment } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useLogin } from '../hooks/useLogin'
import styles from './Header.module.css'
import { CgMenuGridO } from 'react-icons/cg'
import Blockies from 'react-blockies'
import { generateShortEthAddress } from '../utils/common'
import Image from 'next/image'
import { ProfileImage } from './profile'
import { ProfileName } from './profile/ProfileName'

const Header = () => {
  const {
    activateBrowserWallet,
    deactivate,
    account,
    library,
    active,
    chainId,
  } = useEthers()

  const { authenticate, logout, loggedInUser, loading } = useLogin()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const correctChainId =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 31337 : 80001

  const correctNetwork =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
      ? 'Localhost'
      : 'Polygon Mumbai'

  useEffect(() => {
    if (account && correctChainId !== chainId) {
      // toast.remove()
      toast.error(`Wrong network! Please change to ${correctNetwork}`)
      void deactivate()
      void logout()
      return
    }
    if (!loggedInUser || !account) {
      setShowDropdown(false)
    }
    if (account && !loggedInUser) {
      void authenticate(library, account)
    }
  }, [account, loggedInUser])

  useEffect(() => {
    if (
      loggedInUser?.ethAddress &&
      account &&
      account !== loggedInUser.ethAddress
    ) {
      void deactivate()
      void logout()
    }
  }, [account])

  useEffect(() => {
    if (loggedInUser && !account) {
      void activateBrowserWallet()
    }
  }, [])

  return (
    <div className={styles.headerWrapper}>
      <Toaster position="top-right" />
      <div className={styles.headerWrapperToo}>
        <Link href="#" passHref>
          <span className={styles.nineByNineIcon}>
            <CgMenuGridO size={70} />
          </span>
        </Link>
        <Link href="/marketplace" passHref>
          <p className={styles.soundverseText}>Soundverse</p>
        </Link>
        <div className={styles.headerSpacer} />
        <input
          type="text"
          placeholder="find unpublished music NFTs"
          className={styles.headerSearchbar}
        ></input>
        <div className={styles.headerSpacer} />
        <Link href="/marketplace" passHref>
          <p className={styles.marketplaceLink}>Marketplace</p>
        </Link>
        <div className={styles.headerSpacer} />
        <Link href="/create" passHref>
          <p className={styles.marketplaceLink}>Create</p>
        </Link>
        <div className={styles.headerSpacer} />
        <div>
          <button
            className={styles.connectButton}
            onClick={async () => {
              if (!account || !loggedInUser) {
                setShowDropdown(false)
                activateBrowserWallet()
              }
            }}
            onMouseEnter={() => {
              if (account && loggedInUser) {
                setShowDropdown(true)
              }
            }}
          >
            <div
              className={
                account && loggedInUser ? styles.connectButtonLabel : 'block'
              }
            >
              {/*blockies and account details go here*/}
              {account && loggedInUser && (
                <div>
                  <ProfileImage
                    ethAddress={loggedInUser?.ethAddress}
                    width={13}
                    height={13}
                    imageUrl={loggedInUser?.profileImage}
                  />
                </div>
              )}
              <div className={styles.connectButtonAddress}>
                {account && loggedInUser ? (
                  <ProfileName
                    ethAddress={loggedInUser?.ethAddress}
                    name={loggedInUser?.name}
                    short={true}
                  />
                ) : (
                  'CONNECT'
                )}
              </div>
              {account && loggedInUser && (
                <div className={styles.chevronDown}>
                  <Image
                    src="/img/chevronDown.svg"
                    width={25}
                    height={25}
                    layout="fixed"
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
                  <Link href={`/profile/${account}`}>My profile</Link>
                </div>
                <div className={styles.ddhr}></div>
                <div className={styles.dropdownText}>
                  <button
                    onClick={async () => {
                      deactivate()
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
      </div>
    </div>
  )
}

export default Header
