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
import { useLeaveRoom } from '../hooks/rooms/useLeaveRoom'

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
    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'local') {
      return
    }
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
          <Link href="/soundverses" passHref>
            <a>
              <img src="/logo-black.svg" alt="next" />
            </a>
          </Link>
        </div>
        <div className="flex justify-start">
        <div className={styles.linkWrapper}>

          <div class="flex items-center">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"/></svg>
          <Link href="/soundverses" passHref>
            <p className={styles.marketplaceLink}>Home</p>
          </Link>
          </div>


          <div class="flex items-center ">
            <svg fill="#1A1A1A" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path d="M 25 7 C 15.0625 7 7 15.0625 7 25 C 7 34.9375 15.0625 43 25 43 C 34.9375 43 43 34.9375 43 25 C 43 15.0625 34.9375 7 25 7 Z M 25 9 C 33.859375 9 41 16.140625 41 25 C 41 33.859375 33.859375 41 25 41 C 16.140625 41 9 33.859375 9 25 C 9 16.140625 16.140625 9 25 9 Z M 24 14 L 24 16.1875 C 22.398438 16.386719 19.5 17.789063 19.5 21.1875 C 19.5 27.585938 28.8125 24.292969 28.8125 29.09375 C 28.8125 30.695313 28.101563 32.1875 25 32.1875 C 21.898438 32.1875 21 29.800781 21 28.5 L 19 28.5 C 19.300781 32.800781 22.300781 33.792969 24 34.09375 L 24 36 L 26 36 L 26 34.09375 C 27.5 33.992188 31 32.90625 31 28.90625 C 31 25.605469 28.289063 24.695313 25.6875 24.09375 C 23.585938 23.59375 21.6875 23.101563 21.6875 21 C 21.6875 20.101563 22.09375 18.09375 25.09375 18.09375 C 27.195313 18.09375 28.199219 19.398438 28.5 21 L 30.5 21 C 29.898438 18.800781 28.898438 16.8125 26 16.3125 L 26 14 Z"/></svg>
            <Link href="/marketplace" passHref>
              <p className={styles.marketplaceLink}>Market</p>
            </Link>
          </div>





<div class="flex items-center ">
  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="20px" height="20px"><path d="M 12.949219 1.0019531 A 1.0001 1.0001 0 0 0 12.050781 1.6835938 L 9.4589844 9.4589844 L 1.6835938 12.050781 A 1.0001 1.0001 0 0 0 1.6835938 13.949219 L 9.4589844 16.541016 L 12.050781 24.316406 A 1.0001 1.0001 0 0 0 13.949219 24.316406 L 16.541016 16.541016 L 24.316406 13.949219 A 1.0001 1.0001 0 0 0 24.316406 12.050781 L 16.541016 9.4589844 L 13.949219 1.6835938 A 1.0001 1.0001 0 0 0 12.949219 1.0019531 z M 13 5.1640625 L 14.800781 10.566406 A 1.0001 1.0001 0 0 0 15.433594 11.199219 L 20.835938 13 L 15.433594 14.800781 A 1.0001 1.0001 0 0 0 14.800781 15.433594 L 13 20.835938 L 11.199219 15.433594 A 1.0001 1.0001 0 0 0 10.566406 14.800781 L 5.1640625 13 L 10.566406 11.199219 A 1.0001 1.0001 0 0 0 11.199219 10.566406 L 13 5.1640625 z M 33.458984 11.001953 A 1.0001 1.0001 0 0 0 32.548828 11.693359 L 28.935547 22.935547 L 17.693359 26.548828 A 1.0001 1.0001 0 0 0 17.693359 28.451172 L 28.935547 32.064453 L 32.548828 43.306641 A 1.0001 1.0001 0 0 0 34.451172 43.306641 L 38.064453 32.064453 L 49.306641 28.451172 A 1.0001 1.0001 0 0 0 49.306641 26.548828 L 38.064453 22.935547 L 34.451172 11.693359 A 1.0001 1.0001 0 0 0 33.458984 11.001953 z M 33.5 15.265625 L 36.318359 24.035156 A 1.0001 1.0001 0 0 0 36.964844 24.681641 L 45.734375 27.5 L 36.964844 30.318359 A 1.0001 1.0001 0 0 0 36.318359 30.964844 L 33.5 39.734375 L 30.681641 30.964844 A 1.0001 1.0001 0 0 0 30.035156 30.318359 L 21.265625 27.5 L 30.035156 24.681641 A 1.0001 1.0001 0 0 0 30.681641 24.035156 L 33.5 15.265625 z M 8.9492188 31.001953 A 1.0001 1.0001 0 0 0 8.0507812 31.683594 L 6.2089844 37.208984 L 0.68554688 39.048828 A 1.0001 1.0001 0 0 0 0.68554688 40.947266 L 6.2089844 42.789062 L 8.0507812 48.3125 A 1.0001 1.0001 0 0 0 9.9492188 48.3125 L 11.791016 42.789062 L 17.316406 40.947266 A 1.0001 1.0001 0 0 0 17.316406 39.048828 L 11.791016 37.208984 L 9.9492188 31.683594 A 1.0001 1.0001 0 0 0 8.9492188 31.001953 z M 9 35.164062 L 10.050781 38.314453 A 1.0001 1.0001 0 0 0 10.683594 38.947266 L 13.835938 39.998047 L 10.683594 41.048828 A 1.0001 1.0001 0 0 0 10.050781 41.681641 L 9 44.832031 L 7.9492188 41.681641 A 1.0001 1.0001 0 0 0 7.3164062 41.048828 L 4.1640625 39.998047 L 7.3164062 38.947266 A 1.0001 1.0001 0 0 0 7.9492188 38.314453 L 9 35.164062 z"/></svg>
  <Link href="/mint" passHref>
    <p className={styles.marketplaceLink}>Mint</p>
  </Link>
</div>



          <div class="flex items-center">

            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="25px" height="25px"><path d="M 42.132812 1.6230469 A 19.4452 19.4452 0 0 0 26.644531 8.421875 L 20.253906 15.90625 L 19.294922 15.496094 A 8.9468 8.9468 0 0 0 9.3828125 17.404297 L 3.3144531 23.470703 A 1.0006 1.0006 0 0 0 3.6289062 25.097656 L 10.056641 27.853516 L 8.9179688 29.185547 A 1 1 0 0 0 8.9726562 30.542969 L 17.457031 39.027344 A 1 1 0 0 0 18.814453 39.082031 L 20.146484 37.943359 L 22.902344 44.371094 A 1 1 0 0 0 24.527344 44.685547 L 30.595703 38.617188 A 8.9467 8.9467 0 0 0 32.503906 28.707031 L 32.09375 27.746094 L 39.578125 21.355469 A 19.4452 19.4452 0 0 0 46.015625 2.7695312 A 1.0009 1.0009 0 0 0 45.230469 1.984375 A 19.4452 19.4452 0 0 0 42.132812 1.6230469 z M 40.697266 3.625 A 17.4426 17.4426 0 0 1 44.173828 3.8261719 A 17.4426 17.4426 0 0 1 38.279297 19.833984 L 21.269531 34.355469 L 13.644531 26.728516 L 28.166016 9.7207031 A 17.4426 17.4426 0 0 1 40.697266 3.625 z M 35.353516 7.8691406 A 5 5 0 0 0 31.599609 16.400391 A 5.0061 5.0061 0 0 0 38.669922 16.400391 A 5 5 0 0 0 35.353516 7.8691406 z M 35.091797 9.8652344 A 3 3 0 0 1 37.255859 10.744141 A 3.0032 3.0032 0 0 1 37.255859 14.986328 A 3 3 0 1 1 35.091797 9.8652344 z M 15.808594 16.759766 A 6.9568 6.9568 0 0 1 18.505859 17.333984 L 18.894531 17.5 L 11.416016 26.259766 L 5.7734375 23.841797 L 10.796875 18.818359 A 6.9568 6.9568 0 0 1 15.808594 16.759766 z M 26.601562 17.525391 A 1 1 0 0 0 25.943359 19.228516 L 28.771484 22.056641 A 1 1 0 0 0 30.185547 20.642578 L 27.357422 17.814453 A 1 1 0 0 0 26.601562 17.525391 z M 12.341797 28.253906 L 19.744141 35.658203 L 18.21875 36.960938 L 11.039062 29.78125 L 12.341797 28.253906 z M 30.5 29.107422 L 30.666016 29.496094 A 6.9568 6.9568 0 0 1 29.181641 37.203125 L 24.158203 42.226562 L 21.740234 36.583984 L 30.5 29.107422 z M 8.34375 34.751953 A 5 5 0 0 0 4.7285156 36.199219 C 2.4255156 38.502119 1.6911344 44.59415 1.6152344 45.28125 A 0.9988 0.9988 0 0 0 1.9003906 46.099609 A 0.9988 0.9988 0 0 0 2.71875 46.384766 C 3.40585 46.308866 9.4978812 45.574484 11.800781 43.271484 A 5 5 0 0 0 8.34375 34.751953 z M 8.21875 36.736328 A 3.0032 3.0032 0 0 1 10.386719 37.613281 A 3.0032 3.0032 0 0 1 10.386719 41.855469 C 9.1545188 43.087769 5.8892562 43.859991 3.7851562 44.212891 C 4.1373562 42.110291 4.9098312 38.847881 6.1445312 37.613281 A 3.0032 3.0032 0 0 1 8.21875 36.736328 z"/></svg>

            <Link href="/launch" passHref>
              <p className={styles.marketplaceLink}>Launch</p>
            </Link>


          </div>
        </div>




          <div className={styles.connectButtonWrapper}>
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
    </div>
  )
}

export default Header
