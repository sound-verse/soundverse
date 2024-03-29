import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import styles from './Header.module.css'
import Image from 'next/image'
import cn from 'classnames'
import { SearchBar } from '../SearchBar/SearchBar'
import { useAuthContext } from '../../context/AuthContext'
import { ConnectButton } from '../ConnectButton/ConnectButton'

const Header = ({ className = '' }) => {
  const { authUser } = useAuthContext()
  return (
    <div className={cn(styles.headerWrapper, className)}>
      <Toaster position="top-left" />
      <div className={styles.headerWrapperToo}>
        <div className={styles.logo}>
          <Link href="/soundverses" passHref>
            <a>
              <div className="relative w-16 mr-5 md:w-24 xl:w-32 h-5 lg:h-12">
                <Image src="/logo-black.svg" alt="next" layout="fill" />
              </div>
            </a>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className={styles.linkWrapper}>
            <div className="flex items-center">
              <div className=" w-[20px] h-[20px] relative">
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

            <div className="flex items-center">
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
              <div className="flex items-center">
                <div className=" w-[20px]  h-[20px] relative">
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

            <div className="flex items-center">
              <div className="w-[25px]  h-[25px] relative">
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

            <div className="flex items-center">
              <div className="w-[25px]  h-[25px] relative">
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
          <div>
            <SearchBar />
          </div>
        </div>
        <div>
          <div className={styles.connectButtonWrapper}>
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
