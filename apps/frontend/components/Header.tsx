import Link from 'next/link'
import { useEthers } from '@usedapp/core/'
import { useEffect, useState, Fragment } from 'react'
import toast from 'react-hot-toast'
import { useLogin } from '../hooks/useLogin'
import styles from './Header.module.scss'
import { CgMenuGridO } from 'react-icons/cg'
import blockies from 'ethereum-blockies'

const Header = () => {
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
    const [showDropdown, setShowDropdown] = useState(false)
    const WalletDropDown = ({ open }) => {
      console.log(open.open)
      return open ? (
        <div className={styles.dropdownWrapper}>
          <div className={styles.dropdownRect}>
            <div className={styles.dropdownText}>
              <Link href={'/profile'}>My profile</Link>
            </div>
            <div className={styles.dropdownText}>
              <Link href={'/collection'}>My collection</Link>
            </div>
            <hr className={styles.ddhr}></hr>
            <div className={styles.dropdownText}>
              <button
                onClick={async () => {
                  await deactivate()
                  logout()
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      ) : null
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
      <Fragment>
        <button
          className={styles.connectButton}
          onClick={async () => {
            if (!account) {
              // await activateBrowserWallet(onError)
              setShowDropdown(!showDropdown)
              console.log(showDropdown)
            } else {
              //currently we're showing the dropdown when account is not connected
              //this is because Coltrane cannot run the monorepo

              //when refactoring this logic just switch the conditional above and uncomment the await call
              await deactivate()
              logout()
            }
          }}
        >
          {/*blockies and account details go here*/}
          {!account ? 'CONNECT' : account}
        </button>
        <WalletDropDown open={showDropdown} />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className={styles.headerWrapper}>
        <div className={styles.headerWrapperToo}>
          <Link href="/" passHref>
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
          <div>
            <WalletButton />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Header
