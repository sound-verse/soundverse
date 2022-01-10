import Link from 'next/link'
import { UnsupportedChainIdError } from '@web3-react/core'
import { useEthers } from '@usedapp/core/'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Button from './common/Button'
import { formatDiagnosticsWithColorAndContext } from 'typescript'
import { useLogin } from '../hooks/useLogin'
import styles from './Header.module.scss'
import Image from 'next/image'
import { CgMenuGridO } from 'react-icons/cg'
// import {IoSearchSharp} from 'react-icons/io'

const WalletButton = () => {
  const {
    activateBrowserWallet,
    deactivate,
    account,
    library,
    active,
    chainId,
  } = useEthers()
  const onError = async (error: Error) => {
    toast(error.message)
  }

  const { authenticate, logout, isLoggedIn } = useLogin()
  useEffect(() => {
    if (active == true) {
      if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'testflight') {
        if (chainId != 80001) {
          library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                chainName: 'Mumbai testnet',
                nativeCurrency: {
                  name: 'matic',
                  symbol: 'matic',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                blockExplorerUrls: ['https://polygonscan.com/'],
              },
            ],
          })
        }
      }
      if (!isLoggedIn()) {
        authenticate(library, account)
      }
    }
  }, [active])

  return (
    <button
      className={styles.connectButton}
      onClick={async () => {
        if (!account) {
          await activateBrowserWallet(onError)
        } else {
          await deactivate()
          logout()
        }
      }}
    >
      {!account ? 'CONNECT' : 'DISCONNECT'}
    </button>
  )
}

const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerWrapperToo}>
        <Link href="/" passHref>
          <span className={styles.nineByNineIcon}>
            <CgMenuGridO size={70} />
          </span>
        </Link>
        <Link href="/landing" passHref>
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

        <div>
          <WalletButton />
        </div>
      </div>
    </div>
  )
}

export default Header
