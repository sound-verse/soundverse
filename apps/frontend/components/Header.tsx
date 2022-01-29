import Link from 'next/link'
import { useEthers } from '@usedapp/core/'
import { useEffect, useState, Fragment } from 'react'
import toast from 'react-hot-toast'
import { useLogin } from '../hooks/useLogin'
import styles from './Header.module.scss'
import { CgMenuGridO } from 'react-icons/cg'
import Blockies from 'react-blockies'
import { generateShortEthAddress } from '../utils/common'
import Image from 'next/image'

const Header = () => {
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
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const auth = async () => {
      setAuthenticated(await authenticate(library, account))
    }
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
      auth()
    }
    if (!account) {
      setShowDropdown(false)
    }
  }, [active])

  return (
    <Fragment>
      <div className={styles.headerWrapper}>
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
                if (account) {
                  setShowDropdown(!showDropdown)
                } else {
                  setShowDropdown(false)
                  await activateBrowserWallet(onError)
                }
              }}
            >
              <div
                className={
                  account && authenticated ? styles.connectButtonLabel : 'block'
                }
              >
                {/*blockies and account details go here*/}
                {account && authenticated && (
                  <div>
                    <Blockies
                      seed={account}
                      size={12}
                      scale={3}
                      color="#dfe"
                      bgColor="#ffe"
                      spotColor="#abc"
                      className={styles.blockie}
                    />
                  </div>
                )}
                <div className={styles.connectButtonAddress}>
                  {account && authenticated
                    ? generateShortEthAddress(account)
                    : 'CONNECT'}
                </div>
                {account && authenticated && (
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
              <div className={styles.dropdownWrapper}>
                <div className={styles.dropdownRect}>
                  <div className={styles.dropdownText}>
                    {/*These links need dynamic path logic*/}
                    <Link href={`/profile/${account}`}>My profile</Link>
                  </div>
                  <div className={styles.dropdownText}>
                    <Link href={`/collection/${account}`}>My collection</Link>
                  </div>
                  <hr className={styles.ddhr}></hr>
                  <div className={styles.dropdownText}>
                    <button
                      onClick={async () => {
                        await deactivate()
                        logout()
                        setAuthenticated(false)
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
    </Fragment>
  )
}

export default Header
