import Link from 'next/link'
import { useRef, useEffect, useState, Fragment } from 'react'
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
import cn from 'classnames'
import MetaMaskOnboarding from '@metamask/onboarding'
import { InjectedConnector } from '@pangolindex/web3-react-injected-connector'
import { POLYGON_TESTNET_PARAMS } from './constants'

declare var window: any

const abstractConnectorArgs = {
  supportedChainIds: [137, 80001],
}

const injected: InjectedConnector = new InjectedConnector(abstractConnectorArgs)

const Header = ({ className = '' }) => {
  const { loginUser, logout } = useLogin()
  const { authUser } = useAuthContext()
  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const onboarding = useRef<MetaMaskOnboarding>()
  const [flashMessage, setFlashMsg] = useState<string>('')

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  // check for if user has metamask extension already installed on their browser
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      onboarding.current?.stopOnboarding()
    }
  }, [])

  // Custom networks for Ethereum compatible chains can be added to Metamask
  async function addPolygonNetwork() {
    try {
      const provider = await injected.getProvider()
      // rpc request to switch chain to an ethereum compatible chain
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [POLYGON_TESTNET_PARAMS],
      })
    } catch (e) {
      setFlashMsg(
        'Failed to switch to Polygon chain, Please check your internet connect reconnect again'
      )
      console.log(e)
    }
  }

  const onboard = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        addPolygonNetwork()
      } catch (e) {
        console.log(e)
      }
    } else {
      // opens a new tab to the <chrome | firefox> store for user to install the MetaMask browser extension
      onboarding.current?.startOnboarding()
    }
  }

  useEffect(() => {
    if (!authUser) {
      setShowDropdown(false)
    }
  }, [authUser])

  return (
    <div className={cn(styles.headerWrapper, className)}>
      <Toaster position="top-right" />
      <div className={styles.headerWrapperToo}>
        <div className={styles.logo}>
          <Link href="/marketplace" passHref>
            <a>
              <img src="/logo.svg" alt="next" />
            </a>
          </Link>
        </div>
        <div className={styles.headerSpacer} />
        {/* <input
          type="text"
          placeholder="find unpublished music NFTs"
          className={styles.headerSearchbar}
        ></input> */}
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />
        <div className={styles.headerSpacer} />

        <Link href="/soundverses" passHref>
          <p className={styles.marketplaceLink}>Soundverses</p>
        </Link>

        <div className={styles.headerSpacer} />

        <Link href="/marketplace" passHref>
          <p className={styles.marketplaceLink}>Marketplace</p>
        </Link>

        <div className={styles.headerSpacer} />

        <Link href="/mint" passHref>
          <p className={styles.marketplaceLink}>Mint</p>
        </Link>

        <div className={styles.headerSpacer} />

        <Link href="/launch" passHref>
          <p className={styles.marketplaceLink}>Launch</p>
        </Link>

        <div className={styles.headerSpacer} />

        <div>
          <button
            className={styles.connectButton}
            onClick={() => {
              if (!authUser) {
                setShowDropdown(false)
                onboard()
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
