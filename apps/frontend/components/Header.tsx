import Link from 'next/link'
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
import { useAuthContext } from '../context/AuthContext'

const Header = () => {
  const { loginUser, logout } = useLogin()
  const { authUser } = useAuthContext()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  useEffect(() => {
    if (!authUser) {
      setShowDropdown(false)
    }
  }, [authUser])

  return (
    <div className={styles.headerWrapper}>
      <Toaster position="top-right" />
      <div className={styles.headerWrapperToo}>
        <Link href="#" passHref>
          <span className={styles.nineByNineIcon}>
            <CgMenuGridO size={50} />
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
            onClick={() => {
              if (!authUser) {
                setShowDropdown(false)
                loginUser()
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
                <div>
                  <ProfileImage
                    ethAddress={authUser?.ethAddress}
                    width={13}
                    height={13}
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
                ) : (
                  'CONNECT'
                )}
              </div>
              {authUser && (
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
                  <Link href={`/profile/${authUser?.ethAddress}`}>
                    My profile
                  </Link>
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
      </div>
    </div>
  )
}

export default Header
