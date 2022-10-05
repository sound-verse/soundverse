import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import styles from './MobileHeader.module.css'
import Image from 'next/image'
import cn from 'classnames'
import { ConnectButton } from '../ConnectButton/ConnectButton'
import { useState } from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import { useAuthContext } from '../../context/AuthContext'

const Header = ({ className = '' }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { authUser } = useAuthContext()

  return (
    <>
      <div className={cn(styles.headerWrapper, className)}>
        <Toaster position="top-right" />
        <div className={styles.logo}>
          <Link href="/soundverses" passHref>
            <a>
              <div className="relative w-20 lg:w-40 h-5 lg:h-12">
                <Image src="/logo-black.svg" alt="Logo" layout="fill" />
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.searchBar}>
          <SearchBar />
        </div>
        <div
          className={styles.menu}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {!showMobileMenu ? (
            <Image src="/img/vertical-dots.svg" alt="Show Menu" layout="fill" />
          ) : (
            <Image src="/img/close.svg" alt="Close Menu" layout="fill" />
          )}
        </div>
      </div>
      <div
        className={cn(styles.mobileMenuWrapper, !showMobileMenu && 'hidden')}
      >
        <div className={styles.mobileMenu}>
          <div className={styles.linkWrapper}>
            <div className={styles.link}>
              <div className=" w-[30px] h-[20px] relative">
                <Image
                  className=""
                  src="/img/home.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <Link href="/soundverses" passHref>
                <p className={styles.marketplaceLink}>Home</p>
              </Link>
            </div>

            <div className={styles.link}>
              <div className=" w-[30px]  h-[30px] relative">
                <Image
                  className=""
                  src="/img/dollar.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <Link href="/marketplace" passHref>
                <p className={styles.marketplaceLink}>Market</p>
              </Link>
            </div>

            {(process.env.NEXT_PUBLIC_ENVIRONMENT !== 'main' ||
              authUser?.verified) && (
              <div className={styles.link}>
                <div className=" w-[30px]  h-[20px] relative">
                  <Image
                    className=""
                    src="/img/sparkling.svg"
                    alt="next"
                    layout="fill"
                  />
                </div>
                <Link href="/mint" passHref>
                  <p className={styles.marketplaceLink}>Mint</p>
                </Link>
              </div>
            )}

            <div className={styles.link}>
              <div className="w-[30px]  h-[25px] relative">
                <Image
                  className=""
                  src="/img/launch.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <Link href="/launch" passHref>
                <p className={styles.marketplaceLink}>Launch</p>
              </Link>
            </div>

            <div className={styles.link}>
              <div className="w-[30px]  h-[25px] relative">
                <Image
                  className=""
                  src="/img/book.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <a
                href="https://soundverse.gitbook.io/welcome-to-soundverse/"
                target={'_blank'}
                rel="noreferrer"
              >
                <p className={styles.marketplaceLink}>Wiki</p>
              </a>
            </div>
          </div>
          <div className={styles.connectButtonWrapper}>
            <ConnectButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
