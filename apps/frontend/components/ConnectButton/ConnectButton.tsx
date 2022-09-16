import React, { FC, useRef, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './ConnectButton.module.css'
import MetaMaskOnboarding from '@metamask/onboarding'
import { InjectedConnector } from '@pangolindex/web3-react-injected-connector'
import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from '../../context/AuthContext'
import Link from 'next/link'
import Image from 'next/image'
import { ProfileImage, ProfileName } from '../profile'

interface ConnectButtonProps {
  className?: string
}

declare const window: any

const POLYGON_TESTNET_PARAMS = {
  chainId: '0x13881',
  chainName: 'Mumbai',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://matic-mumbai.chainstacklabs.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
}

export const ConnectButton: FC<ConnectButtonProps> = ({ className }) => {
  const abstractConnectorArgs = {
    supportedChainIds: [80001],
  }
  const injected: InjectedConnector = new InjectedConnector(
    abstractConnectorArgs
  )

  const { loginUser, logout } = useLogin()
  const { authUser, chainId } = useAuthContext()
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
  // Not needed for standard chains
  async function addEthereumNetwork() {
    try {
      const provider = await injected.getProvider()
      // rpc request to switch chain to an ethereum compatible chain
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [POLYGON_TESTNET_PARAMS],
      })
    } catch (e) {
      setFlashMsg(
        'Failed to switch to Polygon chain, please check your MetaMask and reconnect again'
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
        if (window) {
          // TODO: better wallet connect

          await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          if (chainId !== 80001) {
            addEthereumNetwork()
          }
        }
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
    <div className={cn(styles.root, className)}>
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
